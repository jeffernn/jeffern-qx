const body = $response.body;

try {
    let obj = JSON.parse(body);

    if (obj && obj.data) {
        obj.data.status = 1;
    }

    $done({
        body: JSON.stringify(obj)
    });

} catch (e) {
    console.log("JSON解析失败: " + e);
    $done({
        body: body
    });
}
