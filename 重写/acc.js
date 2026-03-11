if ($response.body) {
  let body = $response.body;
  
  // 1. member_right: svip → normal
  body = body.replace(/"member_right"\s*:\s*"svip"/g, '"member_right":"normal"');
  
  // 2. right: svip → normal
  body = body.replace(/"right"\s*:\s*"svip"/g, '"right":"normal"');
  
  // 3. accessable: false → true
  body = body.replace(/"accessable"\s*:\s*false/g, '"accessable":true');

  $done({ body });
} else {
  $done({});
}
