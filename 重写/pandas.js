/******************************

name:pandas

*******************************

[rewrite_local]

^https:\/\/pan\.baidu\.com\/api\/loginStatus url script-response-body https://github.com/jeffernn/jeffern-qx/new/main/%E9%87%8D%E5%86%99/pandas.js
;^https:\/\/pan\.baidu\.com\/user\/info url script-response-body https://github.com/jeffernn/jeffern-qx/new/main/%E9%87%8D%E5%86%99/pandas.js
;^https:\/\/pan\.baidu\.com\/membership\/user url script-response-body https://github.com/jeffernn/jeffern-qx/new/main/%E9%87%8D%E5%86%99/pandas.js
;^https:\/\/pan\.baidu\.com\/msg\/streaming url script-response-body https://github.com/jeffernn/jeffern-qx/new/main/%E9%87%8D%E5%86%99/pandas.js
;^https:\/\/pan\.baidu\.com\/api\/streaming url script-request-header https://github.com/jeffernn/jeffern-qx/new/main/%E9%87%8D%E5%86%99/pandas.js

[mitm]

hostname = pan.baidu.com

**************************/


const url = $request.url;

if (url.includes("/api/loginStatus")) {

  let obj = JSON.parse($response.body);

  obj.login_info.vip_type = "21";
  obj.login_info.vip_identity = "21";
  obj.login_info.vip_level = 8;
  obj.login_info.vip_point = 99999;
  obj.login_info.username = "GwenCrackヾ(-_-;)";

  $done({ body: JSON.stringify(obj) });

}

else if (url.includes("/user/info")) {

  let obj = JSON.parse($response.body);

  obj.user_info.is_vip = 1;
  obj.user_info.is_svip = 1;
  obj.user_info.is_plus_buy = 1;

  $done({ body: JSON.stringify(obj) });

}

else if (url.includes("/membership/user")) {

  let obj = JSON.parse($response.body);

  obj.reminder = {
    svip: {
      leftseconds: 9999999999,
      nextState: "normal"
    }
  };

  obj.level_info = {
    current_value: 12090,
    current_level: 10,
    history_value: 11830,
    history_level: 10,
    v10_id: "666666",
    last_manual_collection_time: 0
  };

  obj.product_infos = [{
    product_id: "",
    start_time: 1685635199,
    end_time: 1888227199,
    cluster: "vip",
    detail_cluster: "svip",
    product_name: "svip2_nd",
    cur_svip_type: "month"
  }];

  obj.current_product = {
    cluster: "vip",
    detail_cluster: "svip",
    product_type: "vip2_1m_auto",
    product_id: "12187135090581539740"
  };

  obj.current_product_v2 = obj.current_product;

  $done({ body: JSON.stringify(obj) });

}


else if (url.includes("/msg/streaming")) {

  let obj = JSON.parse($response.body);

  obj.ltime = 0.000001;
  obj。adTime = 0.000001;

  $done({ body: JSON.stringify(obj) });

}


else if (url.includes("/api/streaming")) {

  let newUrl = url
    .replace("vip=2", "vip=0")
    .replace("_1080&", "_720&");

  $done({
    url: newUrl
  });

}

else {

  $done({});

}
