if ($response.body) {
  let body = $response.body;

  // 1. 权限解锁（你要的3处）
  body = body.replace(/"member_right"\s*:\s*"svip"/g, '"member_right":"normal"');
  body = body.replace(/"right"\s*:\s*"svip"/g, '"right":"normal"');
  body = body.replace(/"accessable"\s*:\s*false/g, '"accessable":true');

  // 2. 关键：补全高清格式与转码状态（让播放器识别有高清流）
  body = body.replace(/"supports_format"\s*:\s*"[^"]*"/g, '"supports_format":"p_qv;QuickTime / MOV;raw;mp4;hls;fhd;hd"');
  body = body.replace(/"trans_status"\s*:\s*"raw"/g, '"trans_status":"success"');
  body = body.replace(/"resolution"\s*:\s*"high"/g, '"resolution":"fhd,hd,high,low"');

  // 3. 默认画质改高清（可选，建议保留）
  body = body.replace(/"origin_default_resolution"\s*:\s*"low"/g, '"origin_default_resolution":"high"');

  $done({ body });
} else {
  $done({});
}
