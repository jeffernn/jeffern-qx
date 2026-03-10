let body = $response.body;
let obj = JSON.parse(body);

// 强制修改返回字段
obj.status = 200;
obj.code = 0;
obj.data = {
    "member_type": "SUPER_VIP",
    "super_vip_exp_at": 253392455349000,
    "total_capacity": 6597069766656
};

$done({ body: JSON.stringify(obj) });
