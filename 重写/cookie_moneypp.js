/*
[rewrite_local]
^https:\/\/api\.revenuecat\.com\/v1\/ url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/cookie_moneypp.js
^https:\/\/api\.revenuecat\.com\/v1\/ url script-request-header https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/cookie_moneypp.js

[MITM]
hostname = api.revenuecat.com
*/

const guding = {};
const now = new Date().toISOString();

// ===== 请求头阶段 =====
if (typeof $response === "undefined") {
  delete $request.headers["x-revenuecat-etag"];
  delete $request.headers["X-RevenueCat-ETag"];
  guding.headers = $request.headers;
  $done(guding);
  return;
}

// ===== 响应体阶段:无条件替换,不看原响应 =====
const data = {
  expires_date:           "6666-06-06T06:06:06Z",
  original_purchase_date: "2023-02-23T02:33:33Z",
  purchase_date:          "2023-02-23T02:33:33Z",
  ownership_type:         "PURCHASED",
  store:                  "app_store"
};

// 尝试从原响应里捞外层字段(能捞就捞,捞不到就用默认值)
let appUserId = "fake";
let requestDate = now;
try {
  const origin = JSON.parse($response.body || "null");
  if (origin && typeof origin === "object") {
    requestDate = origin.request_date || now;
    appUserId   = origin.original_app_user_id ||
                  origin.last_seen_app_user_id ||
                  "fake";
  }
} catch (e) {
  // 原响应非 JSON(比如 404 文本),忽略,继续用默认值
}

// ★ 无论是 200 还是 404,统一返回这个"已订阅"结构
const guding6 = {
  request_date: requestDate,
  request_date_ms: Date.now(),
  original_app_user_id: appUserId,
  last_seen_app_user_id: appUserId,
  subscriber: {
    original_app_user_id:    appUserId,
    original_purchase_date:  data.original_purchase_date,
    first_seen:              data.original_purchase_date,
    last_seen:               now,
    management_url:          null,
    original_application_version: "1.0",
    entitlements: {
      // allaccess entitlement
      allaccess: {
        ...data,
        product_identifier: "app.ft.Bookkeeping.lifetime"
      }
    },
    subscriptions: {
      // 产品 id
      "app.ft.Bookkeeping.lifetime": { ...data }
    },
    other_purchases:   {},
    non_subscriptions: {}
  }
};

guding.body = JSON.stringify(guding6);
$done(guding);
