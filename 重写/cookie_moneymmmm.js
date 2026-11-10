/*
[rewrite_local]
^https:\/\/api\.(revenuecat|rc-backup)\.com\/v1\/ url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/cookie_moneymmmm.js
^https:\/\/api\.(revenuecat|rc-backup)\.com\/v1\/ url script-request-header https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/cookie_moneymmmm.js

[MITM]
hostname = api.revenuecat.com, api.rc-backup.com
*/

// ===== 请求头阶段 =====
if (typeof $response === "undefined" || Object.keys($response).length === 0) {
  delete $request.headers["x-revenuecat-etag"];
  delete $request.headers["X-RevenueCat-ETag"];

  // 只在 /subscribers/ (无 id) 时补 id,其它路径不动
  const u = $request.url || "";
  const [base, qs] = u.split("?");
  if (/\/v1\/subscribers\/?$/.test(base)) {
    $request.url = base.replace(/\/v1\/subscribers\/?$/, `/v1/subscribers/_9eb8b5aa4f4d27e7d049e5c0bee5616b`) + (qs ? "?" + qs : "");
    console.log("[RC][REQ] 补 id →", $request.url);
  }
  $done({ headers: $request.headers, url: $request.url });
  return;
}

// ===== 响应体阶段 =====
const url = ($request.url || "").split("?")[0];
console.log("[RC][RESP] url =", url, "origin =", $response.body);

const nowMs  = Date.now();
const nowIso = new Date(nowMs).toISOString();

const data = {
  expires_date:           "6666-06-06T06:06:06Z",
  original_purchase_date: "2023-02-23T02:33:33Z",
  purchase_date:          "2023-02-23T02:33:33Z",
  ownership_type:         "PURCHASED",
  store:                  "app_store"
};

// 优先从 URL 取 id
let appUserId = "";
try {
  const m = url.match(/\/v1\/subscribers\/([^\/?]+)/);
  if (m && m[1]) appUserId = m[1];
} catch (e) {}
// 其次从原响应取
if (!appUserId) {
  try {
    const o = JSON.parse($response.body || "null");
    if (o && typeof o === "object") {
      appUserId = o.original_app_user_id || o.last_seen_app_user_id || "";
    }
  } catch (e) {}
}
if (!appUserId) appUserId = "_9eb8b5aa4f4d27e7d049e5c0bee5616b";

// ---------- 分支 A:offerings 端点 ----------
if (/\/offerings$/.test(url)) {
  const offerBody = {
    request_date:    nowIso,
    request_date_ms: nowMs,
    offerings: {
      all: {
        identifier: "IAP_1_0_0",
        description: "已解锁",
        packages: [
          { identifier: "$rc_lifetime", package_type: "LIFETIME",  platform_product_identifier: "app.ft.Bookkeeping.lifetime", product: {
              identifier: "app.ft.Bookkeeping.lifetime",
              description: "Lifetime",
              title: "Lifetime",
              price: 0, price_string: "¥0", currency_code: "CNY",
              intro_price: null,
              product_category: "NON_SUBSCRIPTION",
              product_type: "NON_CONSUMABLE"
          }},
          { identifier: "$rc_monthly", package_type: "MONTHLY", platform_product_identifier: "app.ft.Bookkeeping.month", product: {
              identifier: "app.ft.Bookkeeping.month",
              description: "Monthly",
              title: "Monthly",
              price: 0, price_string: "¥0", currency_code: "CNY",
              product_category: "SUBSCRIPTION",
              product_type: "AUTO_RENEWABLE_SUBSCRIPTION"
          }},
          { identifier: "$rc_annual", package_type: "ANNUAL", platform_product_identifier: "app.ft.Bookkeeping.year", product: {
              identifier: "app.ft.Bookkeeping.year",
              description: "Annual",
              title: "Annual",
              price: 0, price_string: "¥0", currency_code: "CNY",
              product_category: "SUBSCRIPTION",
              product_type: "AUTO_RENEWABLE_SUBSCRIPTION"
          }}
        ]
      },
      current: { identifier: "IAP_1_0_0" }
    },
    current_offering_id: "IAP_1_0_0",
    placements: { fallback_offering_id: "IAP_1_0_0" }
  };
  console.log("[RC][RESP] offerings 分支");
  $done({
    status: 200,
    body:   JSON.stringify(offerBody),
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
  });
  return;
}

// ---------- 分支 B:/v1/me ----------
if (/\/v1\/me$/.test(url)) {
  const me = { request_date: nowIso, request_date_ms: nowMs };
  console.log("[RC][RESP] me 分支");
  $done({
    status: 200,
    body:   JSON.stringify(me),
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
  });
  return;
}

// ---------- 分支 C:/v1/subscribers/... ----------
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
        store:                  data.store,
        purchase_date:          data.purchase_date,
        ownership_type:         data.ownership_type,
        original_purchase_date: data.original_purchase_date,
        product_identifier:     "app.ft.Bookkeeping.lifetime",
        expires_date:           data.expires_date
      }
    },
    subscriptions: {
      "app.ft.Bookkeeping.lifetime": {
        store:                  data.store,
        purchase_date:          data.purchase_date,
        ownership_type:         data.ownership_type,
        original_purchase_date: data.original_purchase_date,
        expires_date:           data.expires_date
      }
    },
    other_purchases:   {},
    non_subscriptions: {}
  }
};
console.log("[RC][RESP] subscriber 分支,appUserId=", appUserId);
$done({
  status: 200,
  body:   JSON.stringify(fake),
  headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
});
