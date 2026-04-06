/*************************************
name：fenbi_member
**************************************

[rewrite_local]
^https?:\/\/ke\.fenbi\.com\/ipad\/v3\/user_member\/home.* url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/重写/fb_ads.js
^https?:\/\/ke\.fenbi\.com\/ipad\/v3\/members\/detail(\?.*)?$ url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/重写/fb_ads.js
^https?:\/\/ke\.fenbi\.com\/ipad\/v3\/members\/my.* url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/重写/fb_ads.js
#屏蔽底部状态栏图片，公开课
^https:\/\/hera-webapp\.fenbi\.com\/(iphone|ipad)\/recommend\/info\? url jsonjq-response-body 'delpaths([["data","rollingBanner"]])'
^https:\/\/ke\.fenbi\.com\/(iphone|ipad)\/v3\/apps\/config\? url jsonjq-response-body 'delpaths([["data","bottomIconInfos","position","iconDefaultUrl"],["data","bottomIconInfos","position","iconSelectedUrl"],["data","bottomIconInfos","position","nightModeIconDefaultUrl"],["data","bottomIconInfos","position","nightModeIconSelectedUrl"]])'
# 屏蔽首页顶部/信息流 Banner 广告
^https?://keapi\.fenbi\.com/app/(iphone|ipad)/position_resource/get_banners.* url reject-dict
# 屏蔽“学习助手 / AI 助手”入口信息
^https?://market-api\.fenbi\.com/(iphone|ipad)/v1/assistant/info\? url reject-dict
# 屏蔽首页 Banner（类型 2，一般为推荐广告）
^https?://keapi\.fenbi\.com/app/(iphone|ipad)/position_resource/get_home_banners\?.*position_resource_type=2 url reject-dict
# 屏蔽红点提示（消息 / 活动小红点）
^https?://keapi\.fenbi\.com/app/(iphone|ipad)/\w+/reddot\? url reject-dict
# 屏蔽“今日课程 / 公共课推荐”
^https?://ke\.fenbi\.com/(iphone|ipad)/v3/timetable/today_with_public_episodes\? url reject-dict
# 屏蔽首页热门搜索词
^https?://hera-webapp\.fenbi\.com/(iphone|ipad)/topic/hotquery/list\? url reject-dict
# 屏蔽探索页常量配置（常用于活动入口）
^https?://hera-webapp\.fenbi\.com/(iphone|ipad)/explore/consts\? url reject-dict
# 屏蔽公告页热门搜索
^https?://hera-webapp\.fenbi\.com/(iphone|ipad)/announcement/hotquery/list\? url reject-dict
# 屏蔽会员中心入口推广
^https?://ke\.fenbi\.com/(iphone|ipad)/v3/user_member/entry\? url reject-dict
# 屏蔽“我的页面”中的助手入口
^https?://market-api\.fenbi\.com/(iphone|ipad)/v1/assistant/my\? url reject-dict
[mitm]
hostname = keapi.fenbi.com, market-api.fenbi.com, ke.fenbi.com, hera-webapp.fenbi.com

*************************************/

var body = $response.body;
var url = $request.url;

// ===== /user_member/home =====
if (url.indexOf("/user_member/home") != -1) {
    var chxm1023 = JSON.parse(body);

    if (chxm1023.data && chxm1023.data.userMember) {

        if (url.indexOf("member_type=11") != -1) {
            chxm1023.data.userMember.member = true;
            chxm1023.data.userMember.memberClass = 2;
            chxm1023.data.userMember.memberType = 11;
            chxm1023.data.userMember.expireTime = 4079347199000;
            chxm1023.data.userMember.hasBeenMember = true;
            chxm1023.data.userMember.memberStatus = 2;
            chxm1023.data.userMember.createdTime = 1775399545291;
        }

        if (url.indexOf("member_type=1") != -1) {
            chxm1023.data.userMember.member = true;
            chxm1023.data.userMember.memberClass = 2;
            chxm1023.data.userMember.memberType = 1;
            chxm1023.data.userMember.expireTime = 4079347199000;
            chxm1023.data.userMember.hasBeenMember = true;
            chxm1023.data.userMember.memberStatus = 2;
            chxm1023.data.userMember.createdTime = 1775399545291;
        }

        if (url.indexOf("member_type=2") != -1) {
            chxm1023.data.userMember.member = true;
            chxm1023.data.userMember.memberClass = 2;
            chxm1023.data.userMember.memberType = 2;
            chxm1023.data.userMember.expireTime = 4079347199000;
            chxm1023.data.userMember.hasBeenMember = true;
            chxm1023.data.userMember.createdTime = 1775399545291;
        }

        if (url.indexOf("member_type=4") != -1) {
            chxm1023.data.userMember.member = true;
            chxm1023.data.userMember.memberClass = 2;
            chxm1023.data.userMember.memberType = 4;
            chxm1023.data.userMember.expireTime = 4079347199000;
            chxm1023.data.userMember.hasBeenMember = true;
            chxm1023.data.userMember.createdTime = 1775399545291;
        }
    }

    $done({ body: JSON.stringify(chxm1023) });
    return;
}

if (url.indexOf("/members/detail") != -1) {
    // 行测
    if (url.indexOf("tiku_prefix=xingce") != -1) {
        $done({
            body: JSON.stringify({
                "msg": "",
                "data": {
                    "member": true,
                    "memberClass": 2,
                    "memberType": 2,
                    "expireTime": 4079347199000,
                    "hasBeenMember": true,
                    "memberStatus": 2,
                    "createdTime": 1775399545291
                },
                "code": 1
            })
        });
        return;
    }

    // 申论
    if (url.indexOf("tiku_prefix=shenlun") != -1) {
        $done({
            body: JSON.stringify({
                "msg": "",
                "data": {
                    "member": true,
                    "memberClass": 2,
                    "memberType": 1,
                    "expireTime": 4079347199000,
                    "hasBeenMember": true,
                    "memberStatus": 2,
                    "createdTime": 1775399545291
                },
                "code": 1
            })
        });
        return;
    }

    // 事业单位
    if (url.indexOf("tiku_prefix=sydw") != -1) {
        $done({
            body: JSON.stringify({
                "msg": "",
                "data": {
                    "member": true,
                    "memberClass": 2,
                    "memberType": 4,
                    "expireTime": 4079347199000,
                    "hasBeenMember": true,
                    "memberStatus": 2,
                    "createdTime": 1775399545291
                },
                "code": 1
            })
        });
        return;
    }

    // syzc（默认）
    if (url.indexOf("tiku_prefix=syzc") != -1) {
        $done({
            body: JSON.stringify({
                "msg": "",
                "data": {
                    "member": true,
                    "memberClass": 2,
                    "memberType": 11,
                    "expireTime": 4079347199000,
                    "hasBeenMember": true,
                    "memberStatus": 2,
                    "createdTime": 1775399545291
                },
                "code": 1
            })
        });
        return;
    }
}

// ===== 新增 /members/my =====
if (url.indexOf("/members/my") != -1) {

    var myMember = {
        "msg": "",
        "data": [11, 1, 2, 4],
        "code": 1
    };

    $done({ body: JSON.stringify(myMember) });
    return;
}
