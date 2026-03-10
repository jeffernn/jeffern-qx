let body = $response.body;
let json = JSON.parse(body);
if (json.data && json.data.video_list) {
    // 遍历画质列表，解锁所有SVIP画质
    json.data.video_list.forEach(item => {
        item.accessable = true;
    });
    // 将默认分辨率从low改为high（高清）
    json.data.origin_default_resolution = "high";
}
$done({ body: JSON.stringify(json) });
