/*
[rewrite_local]
^https:\/\/api\.revenuecat\.com\/v1\/ url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/cookie_moneyppp.js
^https:\/\/api\.revenuecat\.com\/v1\/ url script-request-header https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/cookie_moneyppp.js

[MITM]
hostname = api.revenuecat.com
*/

// ===== 请求头阶段 =====
if (typeof $response === "undefined") {
  delete $request.headers["x-revenuecat-etag"];
  delete $request.headers["X-RevenueCat-ETag"];
  $done({ headers: $request.headers });
  return;    // ← 提前 return,防止后面的响应体代码再跑
}

// ===== 响应体阶段:无条件替换 =====
const now = new Date().toISOString();

const data = {
  expires_date:           "6666-06-06T06:06:06Z",
  original_purchase_date: "2023-02-23T02:33:33Z",
  purchase_date:          "2023-02-23T02:33:33Z",
  ownership_type:         "PURCHASED",
  store:                  "app_store"
};

// 尝试从原响应捞字段
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
} catch (e) { /* 忽略 */ }

// 构造伪造的"已订阅"结构
const body = {
  request_date:          requestDate,
  request_date_ms:       Date.now(),
  original_app_user_id:  appUserId,
  last_seen_app_user_id: appUserId,
  subscriber: {
    original_app_user_id:    appUserId,
    original_purchase_date:  data.original_purchase_date,
    first_seen:              data.original_purchase_date,
    last_seen:               now,
    management_url:          null,
    original_application_version: "1.0",
    entitlements: {
      allaccess: {
        ...data,
        product_identifier: "app.ft.Bookkeeping.lifetime"
      }
    },
    subscriptions: {
      "app.ft.Bookkeeping.lifetime": { ...data }
    },
    other_purchases:   {},
    non_subscriptions: {}
  }
};

// ★ 关键:直接用 $done 返回字符串,不用对象挂载
$done({ body: JSON.stringify(body) });
