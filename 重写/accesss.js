if ($response.body) {
  let body = $response.body;
  // 解锁权限
  body = body.replace(/"accessable"\s*:\s*false/g, '"accessable":true');
  // 默认画质改为高清
  body = body.replace(/"origin_default_resolution"\s*:\s*"low"/g, '"origin_default_resolution":"high"');
  $done({ body });
} else {
  $done({});
}
