var body = $response.body;
var obj = JSON.parse(body);

obj.status = 200;
obj.code = 0;
obj.data = {
    "member_type": "SUPER_VIP",
    "super_vip_exp_at": 253392455349000,
    "total_capacity": 6597069766656
};

$done({ body: JSON.stringify(obj) });
