// 匹配目标接口URL
const targetUrl = "https://shop.sxxe.net/gacha/spin";

// 判断当前请求是否是目标接口
if ($request.url.includes(targetUrl)) {
    // 自定义要返回的响应体
    const customResponse = {
        "success": true,
        "delivery_status": "success",
        "prize": {
            "probability": 0.10000000000000001,
            "id": "300GB",
            "bytes": 10737418240,
            "icon": "server",
            "name": "300 GB",
            "color": "text-purple-500"
        },
        "new_balance": 20
    };

    // 返回自定义响应（覆盖原服务器响应）
    $done({
        body: JSON.stringify(customResponse, null, 2), // 转JSON字符串
        headers: {
            "Content-Type": "application/json; charset=utf-8", // 标识响应类型
            "Access-Control-Allow-Origin": "*"
        },
        statusCode: 200 // 强制成功状态码
    });
} else {
    // 不是目标接口，不修改直接放行
    $done({});
}
