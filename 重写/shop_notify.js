/*
************************
QuantumultX :
shop.sxxe.net/notify重写
************************
*/

var url = $request.url;

const myStatus = "HTTP/1.1 200 OK";
const myHeaders = {
    "Content-Type": "text/plain; charset=utf-8"
};

myData = "success";

const myResponse = {
    status: myStatus,
    headers: myHeaders,
    body: myData
};

var $util = util();
$util.notify('shop.sxxe.net/notify', '已重写为200 success');
$util.done(myResponse);

function util() {
    const isRequest = typeof $request != "undefined"
    const isSurge = typeof $httpClient != "undefined"
    const isQuanX = typeof $task != "undefined"
    const notify = (title, subtitle = '', message = '') => {
        if (isQuanX) $notify(title, subtitle, message)
        if (isSurge) $notification.post(title, subtitle, message)
    }
    const done = (value = {}) => {
        if (isQuanX) return $done(value)
        if (isSurge) isRequest ? $done(value) : $done()
    }
    return {
        isRequest,
        notify,
        done
    }
}
