/*
[rewrite_local]
^https:\/\/api\.revenuecat\.com\/v1\/subscribers(\/.*)?$ url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/cookie_moneyyyy.js
^https:\/\/api\.revenuecat\.com\/v1\/subscribers(\/.*)?$ url script-request-header https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/cookie_moneyyyy.js

[MITM]
hostname = api.revenuecat.com
*/

// ========== 请求头阶段 ==========
if (typeof $response === "undefined") {
  delete $request.headers["x-revenuecat-etag"];
  delete $request.headers["X-RevenueCat-ETag"];

  for (const key in $request.headers) {
    const lower = key.toLowerCase();
    if (lower !== key) {
      $request.headers[lower] = $request.headers[key];
      delete $request.headers[key];
    }
  }

  $done({ headers: $request.headers });
  return;
}

// ========== 响应体阶段:无条件伪造 ==========
const FAKE_DATA = {
  expires_date:           "6666-06-06T06:06:06Z",
  original_purchase_date: "2023-02-23T02:33:33Z",
  purchase_date:          "2023-02-23T02:33:33Z",
  ownership_type:         "PURCHASED",
  store:                  "app_store"
};

const body = {};

// 尝试继承原响应外层字段,让结构更真实
try {
  const origin = JSON.parse($response.body || "null");
  if (origin && typeof origin === "object") {
    body.request_date          = origin.request_date || new Date().toISOString();
    body.original_app_user_id  = origin.original_app_user_id || "fake";
    body.last_seen_app_user_id = origin.last_seen_app_user_id || body.original_app_user_id;
  } else {
    body.request_date          = new Date().toISOString();
    body.original_app_user_id  = "fake";
    body.last_seen_app_user_id = "fake";
  }
} catch (e) {
  body.request_date          = new Date().toISOString();
  body.original_app_user_id  = "fake";
  body.last_seen_app_user_id = "fake";
}

// 直接沿用原脚本写死的键名:allaccess + app.ft.Bookkeeping.lifetime
body.subscriber = {
  entitlements: {
    allaccess: {
      ...FAKE_DATA,
      product_identifier: "app.ft.Bookkeeping.lifetime"
    }
  },
  subscriptions: {
    "app.ft.Bookkeeping.lifetime": { ...FAKE_DATA }
  },
  original_purchase_date: FAKE_DATA.original_purchase_date,
  other_purchases:        {},
  non_subscriptions:      {},
  management_url:         null,
  first_seen:             FAKE_DATA.original_purchase_date,
  last_seen:              new Date().toISOString()
};

$done({ body: JSON.stringify(body) });
