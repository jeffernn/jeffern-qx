/*
[rewrite_local]
^https:\/\/api\.(revenuecat|rc-backup)\.com\/v1\/ url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/cookie_moneymmm.js
^https:\/\/api\.(revenuecat|rc-backup)\.com\/v1\/ url script-request-header https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/cookie_moneymmm.js

[MITM]
hostname = api.revenuecat.com, api.rc-backup.com
*/

const DEFAULT_APP_USER_ID = "_9eb8b5aa4f4d27e7d049e5c0bee5616b";

// ===================== 请求头阶段 =====================
if (typeof $response === "undefined" || Object.keys($response).length === 0) {
  delete $request.headers["x-revenuecat-etag"];
  delete $request.headers["X-RevenueCat-ETag"];

  let url = $request.url || "";
  const [base, qs] = url.split("?");

  // 匹配 .../v1/subscribers(或 /v1/subscribers/)且后面没有 id → 补默认 id
  if (/\/v1\/subscribers\/?$/.test(base)) {
    $request.url = base.replace(/\/v1\/subscribers\/?$/, `/v1/subscribers/${DEFAULT_APP_USER_ID}`)
                   + (qs ? "?" + qs : "");
    console.log("[RC][REQ] 补 id →", $request.url);
  } else {
    console.log("[RC][REQ] URL 本身已带 id →", url);
  }

  $done({ headers: $request.headers, url: $request.url });
  return;
}

// ===================== 响应体阶段 =====================
console.log("[RC][RESP] 原 URL =", $request.url);
console.log("[RC][RESP] 原响应 =", $response.body);

const nowMs  = Date.now();
const nowIso = new Date(nowMs).toISOString();

const data = {
  expires_date:           "6666-06-06T06:06:06Z",
  original_purchase_date: "2023-02-23T02:33:33Z",
  purchase_date:          "2023-02-23T02:33:33Z",
  ownership_type:         "PURCHASED",
  store:                  "app_store"
};

// 优先从 URL 取 app_user_id
let appUserId = "";
try {
  const m = ($request.url || "").match(/\/v1\/subscribers\/([^\/?]+)/);
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

// 兜底
if (!appUserId) appUserId = DEFAULT_APP_USER_ID;

// 构造伪造的"已订阅"结构
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

// 关键:显式 200 + 防缓存;避免 QX 沿用原 404 状态
$done({
  status: 200,
  body:   JSON.stringify(fake),
  headers: {
    "Content-Type":  "application/json; charset=utf-8",
    "Cache-Control": "no-store, no-cache, must-revalidate",
    "Pragma":        "no-cache",
    "Expires":       "0"
  }
});
