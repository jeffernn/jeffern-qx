try {
    let obj = JSON.parse($response.body);

    if (obj.data && obj.data.video_list) {
        obj.data.video_list.forEach(v => {
            v.accessable = true; // 只改这个
        });
        // 只把默认清晰度从 low 改成 high
        obj.data.origin_default_resolution = "high";
    }

    $done({ body: JSON.stringify(obj) });
} catch (e) {
    $done({ body: $response.body });
}
