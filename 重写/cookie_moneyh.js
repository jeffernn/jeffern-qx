/*
[rewrite_local]
[rewrite_local]
^https:\/\/api\.(revenuecat|rc-backup)\.com\/v1\/ url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/cookie_moneyh.js
^https:\/\/api\.(revenuecat|rc-backup)\.com\/v1\/ url script-request-header https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/cookie_moneyh.js

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

// 时间: 秒对齐 + 无毫秒后缀
const nowMs  = Math.floor(Date.now() / 1000) * 1000;
const nowIso = new Date(nowMs).toISOString().replace(/\.\d{3}Z$/, "Z");

// 从 URL 提取 id;若为 /subscribers/ 则用 DEFAULT
let appUserId = DEFAULT_APP_USER_ID;
try {
  const m = url.match(/\/v1\/subscribers\/([^\/?]+)(?=\/|$)/);
  if (m && m[1] && m[1] !== "") appUserId = m[1];
} catch (e) {}

// -------- /receipts 分支:直接返回 200 空(不伪造会员,避免 query)------
if (/\/receipts$/.test(url)) {
  console.log("[RC][RESP] receipts 分支");
  $done({
    status:  200,
    body:    JSON.stringify({ status: "ok" }),
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
  });
  return;
}

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

// -------- /subscribers 分支(200 或 404 都返回伪造订阅)--------
let originObj = null;
try { originObj = JSON.parse($response.body || "null"); } catch (e) { originObj = null; }

const baseFake = Array.isArray(originObj) ? {} : (originObj || {});

// 保证 request_date / request_date_ms 一致
// 若原响应里有合法时间(200 情况),继承它们;否则用 nowIso/nowMs
const reqDate       = (typeof baseFake.request_date === "string" && baseFake.request_date) || nowIso;
const reqDateMs     = (baseFake.request_date_ms && Number(baseFake.request_date_ms)) || nowMs;
const lastSeen      = (typeof baseFake.last_seen_app_user_id === "string" && baseFake.request_date) || reqDate;

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

console.log("[RC][RESP] subscriber 分支,伪造);
$done({
  status:  200,
  body:    JSON.stringify(fake),
  headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
});
