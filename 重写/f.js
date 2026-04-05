/*************************************
name：fenbi_member
**************************************

[rewrite_local]
^https?:\/\/ke\.fenbi\.com\/ipad\/v3\/user_member\/home.* url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/重写/f.js

[mitm]
hostname = ke.fenbi.com

*************************************/
var body = $response.body;
var chxm1023 = JSON.parse(body);

if (chxm1023.data && chxm1023.data.userMember) {

  let url = $request.url;

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
