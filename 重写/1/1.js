
var url = $request.url;

const myStatus = "HTTP/1.1 200 OK";
const myHeaders = {
    "Host": "ikuuu.ch",
    "Connection": "keep-alive",
    "sec-ch-ua-platform": "macOS",
    "X-Requested-With": "XMLHttpRequest",
    "User-Agent:": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"
    "Accept": "application/json, text/javascript, */*; q=0.01"
    "sec-ch-ua": ""Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138""
    "sec-ch-ua-mobile": "?0"
    "Sec-Fetch-Site": "same-origin"
    "Sec-Fetch-Mode": "cors"
    "Sec-Fetch-Dest": "empty"
    "Referer": "https://ikuuu.ch/user/shop"
    "Accept-Encoding": "gzip, deflate, br, zstd"
    "Accept-Language": "zh-CN,zh;q=0.9"
    "Cookie": "lang=zh-cn; uid=3798409; email=jeffern1030%40gmail.com; key=316740d3332b984d344bd30659366dd160d0398889c57; ip=0f0f7b1c56670a7848fd177d1acf10a8; expire_in=1754232642"
};


if (url.indexOf('/user/money') != -1) {
    obj = {
        "money": "200.00",
        "ret": "1",
    };

