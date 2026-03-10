try {
    let obj = JSON.parse($response.body);
    // 精准匹配该接口的返回结构，修改accessable
    if (obj.data && obj.data.video_list && obj.data.video_list.length > 0) {
        obj.data.video_list.forEach(item => {
            item.accessable = true; // 核心修改：改为可访问
        });
    }
    $done({ body: JSON.stringify(obj) });
} catch (e) {
    // 解析失败时原样返回，避免请求报错
    $done({ body: $response.body });
}
