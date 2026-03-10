// Quantumult X 重写脚本：修改 Quark 云盘成员信息响应
let body = $response.body;

// 直接替换响应体为指定的 JSON
body = '{"status":200,"code":0,"data":{"member_type":"SUPER_VIP","super_vip_exp_at":253392455349000,"total_capacity":6597069766656}}';

$done({body});
