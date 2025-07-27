
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
$util。notify('Emby Premiere 已激活');
$util。done(myResponse);
function util() {
    const isRequest = typeof $request != "undefined"
    const isSurge = typeof $httpClient != "undefined"
    const isQuanX = typeof $task != "undefined"
    const notify = (title, subtitle = '', message = '') => {
        if (isQuanX) $notify(title, subtitle, message)
        if (isSurge) $notification.post(title, subtitle, message)
    }
    const write = (value, key) => {
        if (isQuanX) return $prefs.setValueForKey(value, key)
        if (isSurge) return $persistentStore.write(value, key)
    }
    const read = (key) => {
        if (isQuanX) return $prefs.valueForKey(key)
        if (isSurge) return $persistentStore.read(key)
    }
    const adapterStatus = (response) => {
        if (response) {
            if (response.status) {
                response["statusCode"] = response.status
            } else if (response.statusCode) {
                response["status"] = response.statusCode
            }
        }
        return response
    }
    const get = (options, callback) => {
        if (isQuanX) {
            if (typeof options == "string") options = {
                url: options,
                method: "GET"
            }
            $task.fetch(options).then(response => {
                callback(null, adapterStatus(response), response.body)
            }, reason => callback(reason.error, null, null))
        }
        if (isSurge) $httpClient.get(options, (error, response, body) => {
            callback(error, adapterStatus(response), body)
        })
    }
    const post = (options, callback) => {
        if (isQuanX) {
            if (typeof options == "string") options = {
                url: options,
                method: "POST"
            }
            $task.fetch(options).then(response => {
                callback(null, adapterStatus(response), response.body)
            }, reason => callback(reason.error, null, null))
        }
        if (isSurge) {
            $httpClient.post(options, (error, response, body) => {
                callback(error, adapterStatus(response), body)
            })
        }
    }
    const done = (value = {}) => {
        if (isQuanX) return $done(value)
        if (isSurge) isRequest ? $done(value) : $done()
    }
    return {
        isRequest,
        notify,
        write,
        read,
        get,
        post,
        done
    }
};
