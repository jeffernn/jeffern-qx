/*
[rewrite_local]
^https:\/\/api\.(revenuecat|rc-backup)\.com\/v1\/ url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/cookie_moneya.js
^https:\/\/api\.(revenuecat|rc-backup)\.com\/v1\/ url script-request-header https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/cookie_moneya.js

[MITM]
hostname = api.revenuecat.com, api.rc-backup.com
*/

const DEFAULT_APP_USER_ID = "_9eb8b5aa4f4d27e7d049e5c0bee5616b";
const PRODUCT_ID          = "app.ft.Bookkeeping.lifetime";
const ENTITLEMENT_NAME    = "allaccess";

const PURCHASE_DATE      = "2023-02-23T02:33:33Z";
const FIRST_SEEN         = "2023-02-23T02:33:35Z";
const EXPIRES_DATE       = "6666-06-06T06:06:06Z";

// ================= 请求头阶段 =================
if (typeof $response === "undefined") {
  delete $request.headers["x-revenuecat-etag"];
  delete $request.headers["X-RevenueCat-ETag"];

  const u = $request.url || "";
  const [base, qs] = u.split("?");
  // 请求头阶段不修改 URL,避免 QX 重建连接失败
  console.log("[RC][REQ] url =", u);
  $done({ headers: $request.headers });
  return;
}

// ================= 响应体阶段 =================
const url = ($request.url || "").split("?")[0];
console.log("[RC][RESP] url =", url);

// ★ 修复 1:request_date_ms 用"秒级整数,避免 int32 越界"
const nowSec  = Math.floor(Date.now() / 1000);        // 秒级整数,不会越界
const nowMs   = nowSec * 1000;
const nowIso  = new Date(nowMs).toISOString().replace(/\.\d{3}Z$/, "Z");

let appUserId = DEFAULT_APP_USER_ID;
try {
  const m = url.match(/\/v1\/subscribers\/([^\/?]+)(?=\/|$)/);
  if (m && m[1] && m[1] !== "") appUserId = m[1];
} catch (e) {}

// -------- /receipts --------
if (/\/receipts$/.test(url)) {
  console.log("[RC][RESP] receipts 分支");
  $done({
    status:  200,
    body:    JSON.stringify({ status: "ok" }),
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
  });
  return;
}

// -------- /offerings --------
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

// -------- /v1/me --------
if (/\/v1\/me$/.test(url)) {
  console.log("[RC][RESP] me 分支");
  $done({
    status:  200,
    body:    JSON.stringify({
      request_date:    nowIso,
      request_date_ms: nowMs,
      original_app_user_id: appUserId
    }),
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
  });
  return;
}

// -------- /subscribers --------
let originObj = null;
try { originObj = JSON.parse($response.body || "null"); } catch (e) { originObj = null; }

const baseFake = (originObj && typeof originObj === "object" && !Array.isArray(originObj)) ? originObj : {};

const reqDate   = (typeof baseFake.request_date === "string" && baseFake.request_date) || nowIso;
const reqDateMs = (typeof baseFake.request_date_ms === "number" && baseFake.request_date_ms) || nowMs;

const fake = {
  request_date:          reqDate,
  request_date_ms:       reqDateMs,
  original_app_user_id:  appUserId,
  last_seen_app_user_id: appUserId,
  subscriber: {
    original_app_user_id:     appUserId,
    original_purchase_date:   PURCHASE_DATE,
    first_seen:               FIRST_SEEN,
    last_seen:                reqDate,
    management_url:           "https://apps.apple.com/account/subscriptions",
    original_application_version: "1.0",
    entitlements: {
      [ENTITLEMENT_NAME]: {
        store:                  "app_store",
        purchase_date:          PURCHASE_DATE,
        ownership_type:         "PURCHASED",
        original_purchase_date: PURCHASE_DATE,
        product_identifier:     PRODUCT_ID,
        expires_date:           EXPIRES_DATE
      }
    },
    subscriptions: {
      [PRODUCT_ID]: {
        store:                  "app_store",
        purchase_date:          PURCHASE_DATE,
        ownership_type:         "PURCHASED",
        original_purchase_date: PURCHASE_DATE,
        expires_date:           EXPIRES_DATE
      }
    },
    other_purchases:   {},
    non_subscriptions: {}
  }
};

// ★ 修复 2:此 console.log 之前有一个缺引号的 bug
console.log("[RC][RESP] subscriber 分支,伪造");
$done({
  status:  200,
  body:    JSON.stringify(fake),
  headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
});
