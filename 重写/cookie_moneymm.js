/*
[rewrite_local]
^https:\/\/api\.(revenuecat|rc-backup)\.com\/v1\/ url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/cookie_moneymm.js
^https:\/\/api\.(revenuecat|rc-backup)\.com\/v1\/ url script-request-header https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/cookie_moneymm.js

[MITM]
hostname = api.revenuecat.com, api.rc-backup.com
*/

// ===== 请求头阶段(清理 ETag,不修改 URL)======
if (typeof $response === "undefined" || Object.keys($response).length === 0) {
  delete $request.headers["x-revenuecat-etag"];
  delete $request.headers["X-RevenueCat-ETag"];
  $done({ headers: $request.headers });
  return;
}

// ===== 响应体阶段:无条件伪造 =====
const nowMs  = Date.now();
const nowIso = new Date(nowMs).toISOString();

const data = {
  expires_date:           "6666-06-06T06:06:06Z",
  original_purchase_date: "2023-02-23T02:33:33Z",
  purchase_date:          "2023-02-23T02:33:33Z",
  ownership_type:         "PURCHASED",
  store:                  "app_store"
};

// 尽力从 URL 提取 app_user_id,取不到就用 fake
let appUserId = "fake";
try {
  const m = ($request.url || "").match(/\/v1\/subscribers\/([^\/?]+)/);
  if (m && m[1]) appUserId = m[1];
} catch (e) {}

// 尽量从原响应继承真实 id
try {
  const o = JSON.parse($response.body || "null");
  if (o && typeof o === "object" && o.original_app_user_id) {
    appUserId = o.original_app_user_id;
  }
} catch (e) {}

const fake = {
  request_date:          nowIso,
  request_date_ms:       nowMs,
  original_app_user_id:  appUserId,
  last_seen_app_user_id: appUserId,
  subscriber: {
    original_app_user_id:     appUserId,
    original_purchase_date:   data.original_purchase_date,
    first_seen:               data.original_purchase_date,
    last_seen:                nowIso,
    management_url:           null,
    original_application_version: "1.0",
    entitlements: {
      allaccess: {
        expires_date:           data.expires_date,
        original_purchase_date: data.original_purchase_date,
        purchase_date:          data.purchase_date,
        ownership_type:         data.ownership_type,
        store:                  data.store,
        product_identifier:     "app.ft.Bookkeeping.lifetime"
      }
    },
    subscriptions: {
      "app.ft.Bookkeeping.lifetime": {
        expires_date:           data.expires_date,
        original_purchase_date: data.original_purchase_date,
        purchase_date:          data.purchase_date,
        ownership_type:         data.ownership_type,
        store:                  data.store
      }
    },
    other_purchases:   {},
    non_subscriptions: {}
  }
};

$done({ body: JSON.stringify(fake) });
