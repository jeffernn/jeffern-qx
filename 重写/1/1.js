

var url = $request.url;

const myStatus = "HTTP/1.1 200 OK";
const myHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Method": "*",
    "Access-Control-Allow-Credentials": "true"
};

var obj = {};

if (url.indexOf('/user/money') != -1) {
    obj = {
        "money": "200.00",
        "ret": 1
    };
}

myData = JSON.stringify(obj);

const myResponse = {
    status: myStatus,
    headers: myHeaders,
    body: myData
};

var $util = util();
$util.notify('ikuuu 余额已修改为 200.00');
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
