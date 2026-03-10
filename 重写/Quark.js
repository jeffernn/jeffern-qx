try {
    let obj = JSON.parse($response.body);

    if (obj.data) {
        obj.data.member_type = "SUPER_VIP";
        obj.data.super_vip_exp_at = 4102444800000;
        obj.data.total_capacity = 6597069766656;
    }

    $done({ body: JSON.stringify(obj) });

} catch (e) {
    $done({ body: $response.body });
}
