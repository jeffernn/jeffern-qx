// 匹配：会员信息 + 视频播放鉴权
let url = $request.url;
if (
  /drive(-m|-pc|-h)?\.quark\.cn\/1\/clouddrive\/member/.test(url) ||
  /drive(-m|-pc|-h)?\.quark\.cn\/1\/clouddrive\/file\/play/.test(url) ||
  /drive(-m|-pc|-h)?\.quark\.cn\/1\/clouddrive\/stream/.test(url)
) {
  try {
    let body = JSON.parse($response.body);

    // 1. 强制会员等级
    if (body.data) {
      body.data.member_type = "SUPER_VIP";
      if (body.data.member_status) {
        body.data.member_status.SUPER_VIP = "PAID";
      }
      // 加过期时间，避免客户端判断过期
      body.data.super_vip_exp_at = 4800000000000;
    }

    // 2. 播放接口：强制解锁所有清晰度
    if (body.data?.play_info) {
      body.data.play_info.forEach(p => {
        p.can_play = 1;
        p.quality = "4K"; // 强制4K
      });
    }

    $done({ body: JSON.stringify(body) });
  } catch (e) {
    $done({});
  }
} else {
  $done({});
}
