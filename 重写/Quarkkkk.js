try {
    let obj = JSON.parse($response.body);

    if (obj.data) {
        obj.data.member_type = "SUPER_VIP";
        obj.data.super_vip_exp_at = 253392455349000;
    }

    $done({ body: JSON.stringify(obj) });
} catch (e) {
    $done({ body: $response.body });
}
