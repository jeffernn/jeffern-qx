
var url = $request.url;

const myStatus = "HTTP/1.1 200 OK";
const myHeaders = {
    "Server": "nginx",
    "Date": "2025 15:01:25 GMT"
    "Content-Type": "text/html; charset=UTF-8",
    "Transfer-Encoding:": "chunked",
    "Connection:": "keep-alive"
    "Accept": "application/json, text/javascript, */*; q=0.01"
    "Vary": "Accept-Encoding"
    "Strict-Transport-Security": "max-age=31536000"
    "Strict-Transport-Security": "max-age=31536000"
    "Content-Encoding": "gzip"
};


if (url.indexOf('/user/money') != -1) {
    obj = {
        "money": "200.00",
        "ret": "1",
    };
};
myData = JSON.stringify(obj);

const myResponse = {
    status: myStatus,
    headers: myHeaders, // Optional.
    body: myData // Optional.
};
var $util = util();
$util.notify('Emby Premiere 已激活');
$util.done(myResponse);

