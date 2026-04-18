/*************************************
name：mlfk
author:jeffern
time:2026.4.18
declare:别乱搞，自用，不可传播，不可商用，官方通知将立刻下线，仅用于个人学习，手下留情
**************************************

[rewrite_local]
# 没啥用的假装会员
^https?:\/\/ke\.fenbi\.com\/(iphone|ipad)\/v3\/user_member\/home.* url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fb_ads/fb_ads.js
^https?:\/\/ke\.fenbi\.com\/(iphone|ipad)\/v3\/members\/detail(\?.*)?$ url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fb_ads/fb_ads.js
^https?:\/\/ke\.fenbi\.com\/(iphone|ipad)\/v3\/members\/my.* url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fb_ads/fb_ads.js
# 允许用户使用特殊题库
^https?:\/\/ke\.fenbi\.com\/(iphone|ipad)\/v3\/privilege_tags\/is_special_tiku_user\?.* url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fb_ads/fb_ads.js
# 自定义首页的横幅
^https:\/\/keapi\.fenbi\.com\/app\/(iphone|ipad)\/position_resource\/get_home_banners\? url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fb_ads/fb_banner_img.js
# 屏蔽底部状态栏图片，公开课
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
# 屏蔽探索页常量配置（活动入口）
^https?://hera-webapp\.fenbi\.com/(iphone|ipad)/explore/consts\? url reject-dict
# 屏蔽公告页热门搜索
^https?://hera-webapp\.fenbi\.com/(iphone|ipad)/announcement/hotquery/list\? url reject-dict
# 屏蔽会员中心入口推广
^https?://ke\.fenbi\.com/(iphone|ipad)/v3/user_member/entry\? url reject-dict
# 屏蔽“我的页面”中的助手入口
^https?://market-api\.fenbi\.com/(iphone|ipad)/v1/assistant/my\? url reject-dict
# 屏蔽试卷分析页的Ai教学班广告
^https?:\/\/keapi\.fenbi\.com\/app\/(iphone|ipad)\/position_resource\/get_tiku_banners.* url reject-dict
# 屏蔽试卷整体分析视频
^https?:\/\/ke\.fenbi\.com\/(iphone|ipad)\/\w+\/v3\/episodes\/paper_episodes.* url reject-dict
# 屏蔽试卷题目视频解析
^https?:\/\/ke\.fenbi\.com\/(iphone|ipad)\/\w+\/v3\/episodes\/question_episodes_with_multi_type.* url reject-dict
# 屏蔽试卷考点模块显示
^https:\/\/tiku\.fenbi\.com\/combine\/static\/solution.* url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fb_ads/fb_ads.js
# 移除主页中会员才可用的小功能入口
^https:\/\/tiku\.fenbi\.com\/(iphone|ipad)\/(syzc|xingce|shenlun|sydw)\/course\/module\/config\/v2.* url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fb_ads/fb_ads.js
# 屏蔽试卷 AI 错题数据接口
^https:\/\/tiku\.fenbi\.com\/combine\/ai\/wrong\/question\/data.* url reject-dict
# 移除试卷解析中的“笔记”功能
^https:\/\/tiku\.fenbi\.com\/combine\/exercise\/getSolution.* url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fb_ads/fb_ads.js
[mitm]
hostname = keapi.fenbi.com, market-api.fenbi.com, ke.fenbi.com, hera-webapp.fenbi.com, tiku.fenbi.com

*************************************/

var body = $response.body;
var url = $request.url;

// ===== 没啥用接口 =====
if (url.indexOf("/user_member/home") != -1) {
    var jeffern = JSON.parse(body);

    if (jeffern.data && jeffern.data.userMember) {

        if (url.indexOf("member_type=11") != -1) {
            jeffern.data.userMember.member = true;
            jeffern.data.userMember.memberClass = 1;
            jeffern.data.userMember.memberType = 11;
            jeffern.data.userMember.expireTime = 4079347199000;
            jeffern.data.userMember.hasBeenMember = true;
            jeffern.data.userMember.memberStatus = 2;
            jeffern.data.userMember.createdTime = 1775399545291;
        }

        if (url.indexOf("member_type=1") != -1) {
            jeffern.data.userMember.member = true;
            jeffern.data.userMember.memberClass = 1;
            jeffern.data.userMember.memberType = 1;
            jeffern.data.userMember.expireTime = 4079347199000;
            jeffern.data.userMember.hasBeenMember = true;
            jeffern.data.userMember.memberStatus = 2;
            jeffern.data.userMember.createdTime = 1775399545291;
        }

        if (url.indexOf("member_type=2") != -1) {
            jeffern.data.userMember.member = true;
            jeffern.data.userMember.memberClass = 1;
            jeffern.data.userMember.memberType = 2;
            jeffern.data.userMember.expireTime = 4079347199000;
            jeffern.data.userMember.hasBeenMember = true;
            jeffern.data.userMember.createdTime = 1775399545291;
        }

        if (url.indexOf("member_type=4") != -1) {
            jeffern.data.userMember.member = true;
            jeffern.data.userMember.memberClass = 1;
            jeffern.data.userMember.memberType = 4;
            jeffern.data.userMember.expireTime = 4079347199000;
            jeffern.data.userMember.hasBeenMember = true;
            jeffern.data.userMember.createdTime = 1775399545291;
        }
    }

    $done({ body: JSON.stringify(jeffern) });
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
                    "memberClass": 1,
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
                    "memberClass": 1,
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
                    "memberClass": 1,
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

    // 职测
    if (url.indexOf("tiku_prefix=syzc") != -1) {
        $done({
            body: JSON.stringify({
                "msg": "",
                "data": {
                    "member": true,
                    "memberClass": 1,
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

// ===== 没啥用接口 =====
if (url.indexOf("/members/my") != -1) {

    var myMember = {
        "msg": "",
        "data": [11, 1, 2, 4],
        "code": 1
    };

    $done({ body: JSON.stringify(myMember) });
    return;
}
// ===== 解锁特殊题库 =====
if (url.indexOf("/privilege_tags/is_special_tiku_user") != -1) {

    var obj = JSON.parse(body);

    if (obj && obj.data === false) {
        obj.data = true;
    }

    $done({ body: JSON.stringify(obj) });
    return;
}

// ===== 移除试卷解析中考点模块 =====
if (url.includes("/combine/static/solution")) {

    let bodyStr = body;

    bodyStr = bodyStr.replace(
        /"?keypoints"?\s*:\s*\[[\s\S]*?\]\s*,?/g,
        ""
    );

    $done({ body: bodyStr });
    return;
}
// ===== 移除主页中会员才可用的小功能入口 =====
if (url.includes("/course/module/config")) {

    let obj = JSON.parse(body);

    if (Array.isArray(obj.users)) {
        obj.users = obj.users.filter(item =>
            item.type !== "week" &&
            item.type !== "u_one_by_one" &&
            item.type !== "u_note" &&
            item.type !== "u_one_by_one_system"
        );
    }

    const removeTypes = [
        "jixian_exercise",
        "free_information",
        "vip",
        "high_quality_class",
        "high_quality_server",
        "daily",
        "basictraining",
        "one_by_one",
        "offline_study_room",
        "vip_perfect",
        "standardword",
        "ai_writing_coach",
        "manual_rule",
        "class_group"
    ];

    if (Array.isArray(obj.cover)) {
        obj.cover = obj.cover.filter(item => !removeTypes.includes(item.type));
    }

    $done({ body: JSON.stringify(obj) });
    return;
}
// ===== 移除“试卷解析添加笔记”模块 =====
if (url.includes("/combine/exercise/getSolution")) {

    let obj = JSON.parse(body);

    try {
        let flags = obj?.data?.switchVO?.flags;

        if (Array.isArray(flags)) {
            obj.data.switchVO.flags = flags.filter(f => f !== "note");
        }
    } catch (e) {}

    $done({ body: JSON.stringify(obj) });
    return;
}
