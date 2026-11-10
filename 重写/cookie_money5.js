/*
[rewrite_local]
^https:\/\/api\.revenuecat\.com\/v1\/(subscribers\/[^\/]+$|receipts$|subscribers\/?$)/ url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/cookie_money5.js
^https:\/\/api\.revenuecat\.com\/v1\/(subscribers\/[^\/]+$|receipts$|subscribers\/?$)/ url script-request-header https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/cookie_money5.js

[MITM]
hostname = api.revenuecat.com, api.rc-backup.com
*/

const DEFAULT_APP_USER_ID = "_9eb8b5aa4f4d27e7d049e5c0bee5616b";
const PRODUCT_ID          = "app.ft.Bookkeeping.lifetime";
const ENTITLEMENT_NAME    = "allaccess";

// ================= 请求头阶段 =================
if (typeof $response === "undefined") {
  delete $request.headers["x-revenuecat-etag"];
  delete $request.headers["X-RevenueCat-ETag"];

  const u = $request.url || "";
  const [base, qs] = u.split("?");
  if (/\/v1\/subscribers\/?$/.test(base)) {
    $request.url = base.replace(/\/v1\/subscribers\/?$/, `/v1/subscribers/${DEFAULT_APP_USER_ID}`) + (qs ? "?" + qs : "");
    console.log("[RC][REQ] 补 id →", $request.url);
  }
  $done({ headers: $request.headers, url: $request.url });
  return;
}

// ================= 响应体阶段(原版 → 只改权益,继承真实时间)=================
const guding = {};
const guding6 = JSON.parse(typeof $response != "undefined" && $response.body || null);

if (guding6 && guding6.subscriber) {
  // 继承原响应里服务器真实时间 / 真实 id —— 不修改!
  // 只替换 subscriptions / entitlements
  guding6.subscriber.subscriptions = {};
  guding6.subscriber.entitlements  = {};

  const data = {
    "expires_date":           "6666-06-06T06:06:06Z",   // 按照原版即 6666(get 验证)
    "original_purchase_date": "2023-02-23T02:33:33Z",
    "purchase_date":          "2023-02-23T02:33:33Z",
    "ownership_type":         "PURCHASED",
    "store":                  "app_store"
  };

  guding6.subscriber.subscriptions[PRODUCT_ID] = data;

  guding6.subscriber.entitlements[ENTITLEMENT_NAME] = JSON.parse(JSON.stringify(data));
  guding6.subscriber.entitlements[ENTITLEMENT_NAME].product_identifier = PRODUCT_ID;

  guding.body = JSON.stringify(guding6);
  console.log("[RC][RESP] 改写权益成功");
} else {
  // 原响应没 subscriber(比如 404),不改;避免"假时间 + 假 id"触发 SDK 异常
  guding.body = $response.body;
  console.log("[RC][RESP] 原响应无 subscriber,跳过");
}

$done(guding);
