/*
量子ult X 重写脚本
夸克云盘视频播放 解锁 accessable: true
*/

if ($response.body) {
    let body = $response.body;
    body = body.replace(/"accessable"\s*:\s*false/g, '"accessable":true');
    $done({ body });
} else {
    $done({});
}
