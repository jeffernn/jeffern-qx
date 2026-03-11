let body = $response.body;
if (!body) $done({});

let obj = JSON.parse(body);
let d = obj.data;

// ==============================================
// 只修改【两个JSON有差异的字段】
// ==============================================

// 1. 外层
obj.timestamp = 1773234550;
obj.metadata.range_size = 20485760;
obj.metadata.server_cur_time = 1773234550837;

// 2. data 基础
d.member_type = "SUPER_VIP";
d.total_capacity = 6597090738176;
d.secret_total_capacity = 6597090738176;
d.use_capacity = 128784273002;
d.secret_use_capacity = 128784273002;
d.created_at = 1622760342000;

// 3. 扩容构成
d.extend_capacity_composition = {
  sign_reward: 20971520
};

// 4. member_info
d.member_info.file_save_to_remains = -1;
d.member_info.video_save_to_remains = -1;
d.member_info.offline_download_remains = -1;

// 5. 新增字段（老账号才有）
d.exp_at = 1775836800000;
d.super_vip_exp_at = 253392455349000;

// 6. 删除新账号独有的多余字段（避免结构错误）
if (d.trial_status_map) delete d.trial_status_map;

// ==============================================
// 【绝对不动】
// is_new_user 保持原样
// 其他所有没差异的字段全部保留原返回
// ==============================================

$done({ body: JSON.stringify(obj) });
