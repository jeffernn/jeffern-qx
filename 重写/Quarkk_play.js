try {
    let obj = JSON.parse($response.body);

    if (obj.data && obj.data.video_list) {
        obj.data.video_list.forEach(v => {
            // 开放权限
            v.accessable = true;
            v.member_right = "normal";
            v.right = "normal";

            // 关键：把未转码改成已转码
            v.trans_status = "success";
        });

        // 强制塞入多清晰度，让客户端显示可切换
        obj.data.resolutions = "low,normal,high,super,origin";
    }

    $done({ body: JSON.stringify(obj) });
} catch (e) {
    $done({ body: $response.body });
}
