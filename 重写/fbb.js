var body = $response.body;
var chxm1023 = JSON.parse(body);

function updateMember(type) {
    if (!chxm1023.userMember) return;

    chxm1023.userMember.member = true;
    chxm1023.userMember.memberClass = 2;
    chxm1023.userMember.memberType = type;
    chxm1023.userMember.expireTime = 4079347199000;
    chxm1023.userMember.hasBeenMember = true;
    chxm1023.userMember.memberStatus = 2;
    chxm1023.userMember.createdTime = 1775399545291;
}

if ($request.url.indexOf('member_type=11') != -1){
    updateMember(11);
}

if ($request.url.indexOf('member_type=1') != -1){
    updateMember(1);
}

if ($request.url.indexOf('member_type=2') != -1){
    updateMember(2);
}

if ($request.url.indexOf('member_type=4') != -1){
    updateMember(4);
}

$done({ body: JSON.stringify(chxm1023) });
