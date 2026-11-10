/*
[rewrite_local]
^https:\/\/api\.(revenuecat|rc-backup)\.com\/v1\/ url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/cookie_money1.js
^https:\/\/api\.(revenuecat|rc-backup)\.com\/v1\/ url script-request-header https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/cookie_money1.js

[MITM]
hostname = api.revenuecat.com, api.rc-backup.com
*/

const DEFAULT_APP_USER_ID = "_9eb8b5aa4f4d27e7d049e5c0bee5616b";
const PRODUCT_ID          = "app.ft.Bookkeeping.lifetime";
const ENTITLEMENT_NAME    = "allaccess";

// ★ 关键修复 1:expires_date 从 6666 改 2099,避免 SDK 日期解析失败
const EXPIRES_DATE = "2099-06-06T06:06:06Z";

// ================= 请求头阶段 =================
if (typeof $response === "undefined" || Object.keys($response).length === 0) {
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

// ================= 响应体阶段 =================
const url = ($request.url || "").split("?")[0];
console.log("[RC][RESP] url =", url);

const nowMs  = Date.now();
const nowIso = new Date(nowMs).toISOString();

const data = {
  expires_date:           EXPIRES_DATE,
  original_purchase_date: "2023-02-23T02:33:33Z",
  purchase_date:          "2023-02-23T02:33:33Z",
  ownership_type:         "PURCHASED",
  store:                  "app_store"
};

// -------- /offerings 分支 --------
if (/\/offerings$/.test(url)) {
  const offerBody = {
    request_date:    nowIso,
    request_date_ms: nowMs,
    offerings: [
      {
        description:  "已解锁",
        identifier:   "IAP_1_0_0",
        metadata:     null,
        packages: [
          { identifier: "$rc_monthly",  platform_product_identifier: "app.ft.Bookkeeping.month" },
          { identifier: "$rc_annual",   platform_product_identifier: "app.ft.Bookkeeping.year" },
          { identifier: "$rc_lifetime", platform_product_identifier: "app.ft.Bookkeeping.lifetime" }
        ]
      }
    ],
    current_offering_id: "IAP_1_0_0",
    placements: { fallback_offering_id: "IAP_1_0_0" }
  };
  console.log("[RC][RESP] offerings 分支");
  $done({
    status:  200,
    body:    JSON.stringify(offerBody),
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
  });
  return;
}

// -------- /v1/me 分支 --------
if (/\/v1\/me$/.test(url)) {
  console.log("[RC][RESP] me 分支");
  $done({
    status:  200,
    body:    JSON.stringify({
      request_date:    nowIso,
      request_date_ms: nowMs
    }),
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
  });
  return;
}

// -------- /subscribers 分支:伪造已订阅 --------
let appUserId = DEFAULT_APP_USER_ID;   // ★ 强制使用真实 id

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
      [ENTITLEMENT_NAME]: {
        store:                  data.store,
        purchase_date:          data.purchase_date,
        ownership_type:         data.ownership_type,
        original_purchase_date: data.original_purchase_date,
        product_identifier:     PRODUCT_ID,
        expires_date:           data.expires_date
      }
    },
    subscriptions: {
      [PRODUCT_ID]: {
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
console.log("[RC][RESP] subscriber 分支");
$done({
  status:  200,
  body:    JSON.stringify(fake),
  headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
});
