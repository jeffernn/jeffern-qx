/*************************************
name：fenbi_member
desc：粉笔会员字段修改（仅在 userMember 存在时覆盖）
**************************************

[rewrite_local]
^https?:\/\/ke\.fenbi\.com\/ipad\/v3\/user_member\/home url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fbbb.js

[mitm]
hostname = ke.fenbi.com

*************************************/

// ================== 脚本主体 ==================

var body = $response.body;
var chxm1023 = JSON.parse(body);

function updateMember(type) {
    // 只在存在 userMember 时修改
    if (!chxm1023.userMember) return;

    chxm1023.userMember.member = true;
    chxm1023.userMember.memberClass = 2;
    chxm1023.userMember.memberType = type;
    chxm1023.userMember.expireTime = 4079347199000;
    chxm1023.userMember.hasBeenMember = true;
    chxm1023.userMember.memberStatus = 2;
    chxm1023.userMember.createdTime = 1775399545291;
}

// 判断 URL 参数
if ($request.url.includes('member_type=11')){
    updateMember(11);
}

if ($request.url.includes('member_type=1')){
    updateMember(1);
}

if ($request.url.includes('member_type=2')){
    updateMember(2);
}

if ($request.url.includes('member_type=4')){
    updateMember(4);
}

$done({ body: JSON.stringify(chxm1023) });
