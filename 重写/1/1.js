
var url = $request.url;

const myStatus = "HTTP/1.1 200 OK";
const myHeaders = {
    "Crack": "KS",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Method": "*",
    "Access-Control-Allow-Credentials": "true"
};


if (url.indexOf('/user/money') != -1) {
    obj = {
        "money": "200.00",
        "ret": "1",
    };

