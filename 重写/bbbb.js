/*************************************
name：fenbi_member
**************************************

[rewrite_local]
^https?:\/\/ke\.fenbi\.com\/ipad\/v3\/user_member\/home.* url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/重写/bbbb.js
^https?:\/\/ke\.fenbi\.com\/ipad\/v3\/members\/detail(\?.*)?$ url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/重写/bbbb.js
^https?:\/\/ke\.fenbi\.com\/ipad\/v3\/members\/my.* url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/重写/bbbb.js
[mitm]
hostname = ke.fenbi.com

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
