/*************************************
name：fenbi_member
**************************************

[rewrite_local]
^https?:\/\/ke\.fenbi\.com\/ipad\/v3\/user_member\/home.* url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/重写/fff.js
^https?:\/\/ke\.fenbi\.com\/ipad\/v3/members/detail.* url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/重写/fff.js

[mitm]
hostname = ke.fenbi.com

*************************************/

var body = $response.body;
var url = $request.url;

// 如果是 /user_member/home 请求
if (url.indexOf("/user_member/home") != -1) {
    var chxm1023 = JSON.parse(body);

    if (chxm1023.data && chxm1023.data.userMember) {

        // member_type=11
        if (url.indexOf("member_type=11") != -1) {
            chxm1023.data.userMember.member = true;
            chxm1023.data.userMember.memberClass = 2;
            chxm1023.data.userMember.memberType = 11;
            chxm1023.data.userMember.expireTime = 4079347199000;
            chxm1023.data.userMember.hasBeenMember = true;
            chxm1023.data.userMember.memberStatus = 2;
            chxm1023.data.userMember.createdTime = 1775399545291;
        }

        // member_type=1
        if (url.indexOf("member_type=1") != -1) {
            chxm1023.data.userMember.member = true;
            chxm1023.data.userMember.memberClass = 2;
            chxm1023.data.userMember.memberType = 1;
            chxm1023.data.userMember.expireTime = 4079347199000;
            chxm1023.data.userMember.hasBeenMember = true;
            chxm1023.data.userMember.memberStatus = 2;
            chxm1023.data.userMember.createdTime = 1775399545291;
        }

        // member_type=2
        if (url.indexOf("member_type=2") != -1) {
            chxm1023.data.userMember.member = true;
            chxm1023.data.userMember.memberClass = 2;
            chxm1023.data.userMember.memberType = 2;
            chxm1023.data.userMember.expireTime = 4079347199000;
            chxm1023.data.userMember.hasBeenMember = true;
            chxm1023.data.userMember.createdTime = 1775399545291;
        }

        // member_type=4
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

// 如果是 /members/detail 请求，整体替换返回体
var memberTemplate = {
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
};

// 根据 tiku_prefix 替换 memberType
if (url.indexOf("tiku_prefix=syzc") != -1) {
    memberTemplate.data.memberType = 11;
} else if (url.indexOf("tiku_prefix=xingce") != -1) {
    memberTemplate.data.memberType = 2;
} else if (url.indexOf("tiku_prefix=sysl") != -1) {
    memberTemplate.data.memberType = 1;
} else if (url.indexOf("tiku_prefix=sygj") != -1) {
    memberTemplate.data.memberType = 4;
}

$done({ body: JSON.stringify(memberTemplate) });
