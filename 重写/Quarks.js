let body = {
  "status" : 200,
  "code" : 0,
  "message" : "",
  "timestamp" : 1773172196,
  "data" : {
    "member_info" : {
      "file_save_to_remains" : 200,
      "video_save_to_remains" : 0,
      "video_save_to_uses" : 9,
      "offline_download_remains" : 0,
      "member_type_map" : {
        "MINI_VIP" : {
          "video_save_to_total" : 10
        }
      }
    },
    "subscribe_status_map" : {

    },
    "identity" : [

    ],
    // 只改这里 ↓
    "member_type" : "SUPER_VIP",
    "super_vip_exp_at" : 253392455349000,
    "total_capacity" : 6597069766656,
    "secret_use_capacity" : 128784273002,
    "is_new_user" : false,
    "created_at" : 1622760342000,
    "trial_status_map" : {

    },
    "use_capacity" : 128784273002,
    "deep_recycle_stat" : {
      "recycle_normal_serve_days" : 10,
      "recycle_zvip_serve_days" : 90,
      "recycle_vip_serve_days" : 10,
      "recycle_pay_serve_days" : 30,
      "deep_recycle_serve_days" : 180,
      "recycle_svip_serve_days" : 30
    },
    "fr_subscribe_status_map" : {

    },
    "video_backup" : 1,
    "image_backup" : 1,
    "secret_total_capacity" : 10737418240,
    "subscribe_pay_channel_map" : {

    },
    "member_status" : {
      "VIP" : "UNPAID",
      "Z_VIP" : "UNPAID",
      "MINI_VIP" : "UNPAID",
      // 只改这里 ↓
      "SUPER_VIP" : "PAID"
    },
    "extend_capacity_composition" : {

    },
    "acc_status" : 0
  },
  "metadata" : {
    "range_size" : 512000,
    "server_cur_time" : 1773172196534
  }
};

$done({ body: JSON.stringify(body) });
