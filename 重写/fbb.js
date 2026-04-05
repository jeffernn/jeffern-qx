/*************************************
name：fenbi_member
**************************************

[rewrite_local]
^https?:\/\/ke\.fenbi\.com\/ipad\/v3\/user_member\/home url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fbb.js

[mitm]
hostname = ke.fenbi.com

*************************************/

var body = $response.body;
var chxm1023 = JSON.parse(body);

const memberType11 = 'member_type=11';
const memberType1  = 'member_type=1';
const memberType2  = 'member_type=2';
const memberType4  = 'member_type=4';

if ($request.url.indexOf(memberType11) != -1){
    chxm1023.userMember = {
        "member" : true,
        "memberClass" : 2,
        "memberType" : 11,
        "expireTime" : 4079347199000,
        "hasBeenMember" : true,
        "memberStatus" : 2,
        "createdTime" : 1775399545291
    };
}

if ($request.url.indexOf(memberType1) != -1){
    chxm1023.userMember = {
        "member" : true,
        "memberClass" : 2,
        "memberType" : 1,
        "expireTime" : 4079347199000,
        "hasBeenMember" : true,
        "memberStatus" : 2,
        "createdTime" : 1775399545291
    };
}

if ($request.url.indexOf(memberType2) != -1){
    chxm1023.userMember = {
        "member" : true,
        "memberClass" : 2,
        "memberType" : 2,
        "expireTime" : 4079347199000,
        "hasBeenMember" : true,
        "memberStatus" : 2,
        "createdTime" : 1775399545291
    };
}

if ($request.url.indexOf(memberType4) != -1){
    chxm1023.userMember = {
        "member" : true,
        "memberClass" : 2,
        "memberType" : 4,
        "expireTime" : 4079347199000,
        "hasBeenMember" : true,
        "memberStatus" : 2,
        "createdTime" : 1775399545291
    };
}

$done({body : JSON.stringify(chxm1023)});
