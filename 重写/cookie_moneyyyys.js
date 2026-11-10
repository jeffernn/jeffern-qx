/*
[rewrite_local]
^https:\/\/api\.revenuecat\.com\/v1\/subscribers(\/.*)?$ url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/cookie_moneyyyys.js
^https:\/\/api\.revenuecat\.com\/v1\/subscribers(\/.*)?$ url script-request-header https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/cookie_moneyyyys.js

[MITM]
hostname = api.revenuecat.com
*/

// 兜底 id:当 URL 里没有 app_user_id 时,用它补到 /v1/subscribers/ 后面
const DEFAULT_APP_USER_ID = "_9eb8b5aa4f4d27e7d049e5c0bee5616b";

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

  // ★ 关键:URL 里没有 app_user_id 时,强制补上
  let url = ($request.url || "").split("?")[0];
  const idMatch = url.match(/\/v1\/subscribers\/([^\/]+)/);
  if (!idMatch && /\/v1\/subscribers\/?$/.test(url)) {
    $request.url = url.replace(
      /\/v1\/subscribers\/?$/,
      `/v1/subscribers/${DEFAULT_APP_USER_ID}`
    );
    console.log("[RC] 请求头阶段已补 id:", $request.url);
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

// 解析原响应,继承外层字段,同时把 app_user_id 尽量捞出来
let appUserId = DEFAULT_APP_USER_ID;
try {
  const origin = JSON.parse($response.body || "null");
  if (origin && typeof origin === "object") {
    body.request_date          = origin.request_date || new Date().toISOString();
    body.original_app_user_id  = origin.original_app_user_id || appUserId;
    body.last_seen_app_user_id = origin.last_seen_app_user_id || body.original_app_user_id;
    appUserId = origin.original_app_user_id || appUserId;
  } else {
    body.request_date          = new Date().toISOString();
    body.original_app_user_id  = appUserId;
    body.last_seen_app_user_id = appUserId;
  }
} catch (e) {
  body.request_date          = new Date().toISOString();
  body.original_app_user_id  = appUserId;
  body.last_seen_app_user_id = appUserId;
}

// ★ 关键:响应阶段也从 URL 补 id(有的 App 后续逻辑会读请求 URL)
let respUrl = ($request.url || "").split("?")[0];
const idMatch2 = respUrl.match(/\/v1\/subscribers\/([^\/]+)/);
if (idMatch2 && idMatch2[1]) appUserId = idMatch2[1];
else if (/\/v1\/subscribers\/?$/.test(respUrl)) {
  $request.url = respUrl.replace(
    /\/v1\/subscribers\/?$/,
    `/v1/subscribers/${appUserId}`
  );
  console.log("[RC] 响应体阶段已补 id:", $request.url);
}

// 沿用原脚本写死的键名:allaccess + app.ft.Bookkeeping.lifetime
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
