/*
 *
 *
name：pandas
*******************************
[rewrite_local]
^https?:\/\/pan\.baidu\.com.+(rest\/.+\/membership\/user|api\/user\/getinfo)\? url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/pandass.js
;^https?:\/\/.+(pcs\.baidu\.com|baidu\.com)\/rest\/2\.0\/pcs\/file\?.*\bfid= url script-request-header https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/pandass.js

[mitm] 
hostname = pan.baidu.com, *.pcs.baidu.com, *.baidu.com

*
*
*/
// 只伪造百度网盘会员信息
if ($request.url.includes("/membership/user")) {
    // 构造伪造的会员信息
    const fakeMemberData = {
        currenttime: Math.floor(Date.now() / 1000), // 当前时间戳
        request_id: Date.now(),                     // 请求 ID
        product_infos: [
            {
                product_id: "1",
                product_name: "svip2_nd",
                product_description: "超级会员",
                function_num: 0,
                start_time: 1553702399,
                buy_description: "",
                buy_time: 1417260485,
                auto_upgrade_to_svip: 0,
                end_time: 32493834549, // 很大的时间戳，几乎永不过期
                cluster: "vip",
                detail_cluster: "svip",
                status: 0
            }
        ],
        reminder: {
            reminderWithContent: [],
            advertiseContent: []
        }
    };

    $done({ body: JSON.stringify(fakeMemberData) });
} else {
    $done({}); // 其他请求不处理
}
