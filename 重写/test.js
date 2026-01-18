// 脚本名称：Shop Notify 拦截器
// 类型：script-response-body
// 匹配规则：^https:\/\/shop\.sxxe\.net\/notify

const url = $request.url;

// 检查是否为目标URL
if (url.indexOf("shop.sxxe.net/notify") !== -1) {
    console.log("拦截到 notify 请求: " + url);
    console.log("请求方法: " + $request.method);
    
    // 直接返回 success 和 200 状态码
    $done({
        status: 200,
        headers: {
            'Content-Type': 'text/plain; charset=utf-8'
        },
        body: 'success'
    });
} else {
    // 其他请求不处理
    $done({});
}
