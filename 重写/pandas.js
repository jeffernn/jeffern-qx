/*
 *
 *
name：pandas
*******************************
[rewrite_local]
^https?:\/\/pan\.baidu\.com.+(rest\/.+\/membership\/user|api\/user\/getinfo)\? url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/pandas.js
;^https?:\/\/.+(pcs\.baidu\.com|baidu\.com)\/rest\/2\.0\/pcs\/file\?.*\bfid= url script-request-header https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/pandas.js

[mitm] 
hostname = pan.baidu.com, *.pcs.baidu.com, *.baidu.com

*
*
*/
// 定时调用函数（但 f2 未定义）
setInterval(function () {
  f2();
}, 4000);

// 固定的 Cookie（BDUSS）
const COOKIE = "bduss=khmSlF3YVhOWjFzR1Q1bmpxd3paVks1NlA5LWlwdFVzTURDV34xQ2dtb3JlT1pvSVFBQUFBJCQAAAAAAQAAAAEAAAAddbqcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACvrvmgr675oY";

// 如果是请求阶段
if (typeof $response === "undefined" || Object.keys($response).length === 0) {

  // 拦截百度网盘下载接口
  if ($request.url.includes("/rest/2.0/pcs/file") &&
      $request.url.includes("method=locatedownload")) {

    let headers = $request.headers;

    if (headers) {
      // 注入 Cookie
      headers.Cookie = COOKIE;

      $done({
        headers: headers
      });
    } else {
      $done({});
    }

  } else {
    $done({});
  }

// 如果是响应阶段
} else if ($request.url.includes("/membership/user")) {

  // 伪造会员信息（SVIP）
  $done({
    body: JSON.stringify({
      currenttime: 1573473597,
      request_id: 7501873289383875000,
      product_infos: [
        {
          product_id: "5310897792128633390",
          end_time: 32493834549,
          buy_time: "1417260485",
          cluster: "offlinedl",
          start_time: 1417260485,
          detail_cluster: "offlinedl",
          product_name: "gz_telecom_exp"
        },
        {
          product_name: "svip2_nd",
          product_description: "超级会员",
          function_num: 0,
          start_time: 1553702399,
          buy_description: "",
          buy_time: 1417260485,
          product_id: "1",
          auto_upgrade_to_svip: 0,
          end_time: 32493834549,
          cluster: "vip",
          detail_cluster: "svip",
          status: 0
        }
      ],
      reminder: {
        reminderWithContent: [],
        advertiseContent: []
      }
    })
  });

// 修改用户信息
} else if ($request.url.includes("/user/getinfo")) {

  let data = JSON.parse($response.body);

  data.records[0].nick_name = "Jeffern";
  data.records[0].priority_name = "Jeffern";
  data.records[0].avatar_url = "https://i.111666.best/image/kOZOdAsS4U34jQG3zFXmN7.jpeg";

  $done({
    body: JSON.stringify(data)
  });

} else {
  $done({});
}
