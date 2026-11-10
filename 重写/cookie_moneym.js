/*
[rewrite_local]
^https:\/\/api\.(revenuecat|rc-backup)\.com\/v1\/ url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/cookie_moneym.js
^https:\/\/api\.(revenuecat|rc-backup)\.com\/v1\/ url script-request-header https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/cookie_moneym.js

[MITM]
hostname = api.revenuecat.com, api.rc-backup.com
*/

const UA = ($request.headers && $request.headers["user-agent"]) || "";

// ========== 请求头阶段 ==========
if (typeof $response === "undefined") {
  delete $request.headers["x-revenuecat-etag"];
  delete $request.headers["X-RevenueCat-ETag"];
  $done({ headers: $request.headers });
}

// ========== 响应体阶段 ==========
else {
  const nowMs  = Date.now();
  const nowIso = new Date(nowMs).toISOString();

  // 从 URL 提取 app_user_id
  let appUserId = "fake";
  const m = ($request.url || "").match(/\/v1\/subscribers\/([^\/?]+)/);
  if (m && m[1]) appUserId = m[1];

  // 尝试从原响应捞 app_user_id / request_date(解析失败没关系,继续伪造)
  let requestDate = nowIso;
  try {
    const o = JSON.parse($response.body || "null");
    if (o && typeof o === "object") {
      requestDate = o.request_date || nowIso;
      if (o.original_app_user_id) appUserId = o.original_app_user_id;
    }
  } catch (e) {}

  const data = {
    expires_date:           "6666-06-06T06:06:06Z",
    original_purchase_date: "2023-02-23T02:33:33Z",
    purchase_date:          "2023-02-23T02:33:33Z",
    ownership_type:         "PURCHASED",
    store:                  "app_store"
  };

  // 无论原响应是什么(200 / 404 / 空 / HTML),都无条件返回同一份已订阅结构
  const fake = {
    request_date:          requestDate,
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
}
