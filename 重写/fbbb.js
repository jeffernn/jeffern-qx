/**
 * @fileoverview Quantumult X 脚本
 *
[rewrite_local]
# 修改 AI 教师会员信息
^https:\/\/keapi\.fenbi\.com\/ai\/ipad\/entry url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fbbbb.js
# 修改用户余额为
^https:\/\/ke\.fenbi\.com\/ipad\/v3\/users\/balance url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fbbbb.js
# 修改课程价格

^https:\/\/ke\.fenbi\.com\/ipad\/(jdwz|sydw)\/v3\/orders\/uni url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fbbbb.js
^https:\/\/ke\.fenbi\.com\/ipad\/sydw\/v3\/orders\/pre_best url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fbbbb.js
^https:\/\/ke\.fenbi\.com\/ipad\/jdwz\/v3\/lectures\/\d+\/detail_for_sale_v2 url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fbbbb.js

# 修改会员显示
^https:\/\/ke\.fenbi\.com\/ipad\/v3\/members\/member_static_config url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fbbbb.js
^https:\/\/ke\.fenbi\.com\/ipad\/v3\/user_member\/home url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fbbbb.js

# 修改课程配置
^https:\/\/ke\.fenbi\.com\/ipad\/v3\/user_member\/course_configs url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fbbbb.js
^https:\/\/ke\.fenbi\.com\/ipad\/v3\/members\/member_static_config url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fbbbb.js
^https:\/\/keapi\.fenbi\.com\/im\/ipad\/signatures\/signature url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fbbbb.js
^https:\/\/ke\.fenbi\.com\/ipad\/jdwz\/v3\/my\/lectures\/visible url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/fenbi1.js
^https:\/\/ke\.fenbi\.com\/ipad\/v3\/members\/details url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fbbbb.js

# 检查试听权限
^https:\/\/ke\.fenbi\.com\/ipad\/sydw\/v3\/orders\/unpaid_order url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fbbbb.js
^https:\/\/ke\.fenbi\.com\/ipad\/v3\/member_lectures url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fbbbb.js
^https:\/\/ke\.fenbi\.com\/ipad\/sydw\/v3\/episodes\/\d+ url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fbbbb.js
^https:\/\/ke\.fenbi\.com\/ipad\/jdwz\/v3\/lectures\/\d+\/episode_nodes url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fbbbb.js

#我的课程
//^https:\/\/ke\.fenbi\.com\/ipad\/jdwz\/v3\/my\/lectures\/\d+\/episodes url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fbbbb.js
^https:\/\/ke\.fenbi\.com\/ipad\/jdwz\/v3\/my\/lectures\/\d+\/summary url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fbbbb.js
^https:\/\/keapi\.fenbi\.com\/school\/ipad\/offline_classes\/config\/get_by_biz url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fbbbb.js
^https:\/\/live\.fenbi\.com\/ipad\/jdwz\/v3\/livereplay\/replay\/lectures\/0\/episodes url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fbbbb.js

#电子书
^https:\/\/ke\.fenbi\.com\/ipad\/v3\/ebook\/list_by_cat url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fbbbb.js
^https:\/\/ke\.fenbi\.com\/ipad\/v3\/ebook\/detail url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fbbbb.js
^https:\/\/ke\.fenbi\.com\/ipad\/v3\/ebook\/update\/user_books url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fbbbb.js

#订单处理
^https:\/\/ke\.fenbi\.com\/ipad\/v3\/red_packet_share\/activities\/detail\/by_order url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fbbbb.js
#教室权限
^https:\/\/live\.fenbi\.com\/ipad\/sydw\/v3\/livereplay\/replay\/lectures url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fbbbb.js
^https:\/\/keapi\.fenbi\.com\/primelecture\/ipad\/user_prime_lectures\/is_user_prime_lecture url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fbbbb.js
#异常处理
^https:\/\/ke\.fenbi\.com\/ipad\/jdwz\/v3\/my\/lectures\/(\d+)\/episode_sets url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fbbbb.js
^https:\/\/ke\.fenbi\.com\/ipad\/sydw\/v3\/user_content_forms\/is_filled url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fbbbb.js
^https:\/\/ke\.fenbi\.com\/ipad\/jdwz\/v3\/ticket url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fbbbb.js
^https:\/\/live\.fenbi\.com\/dispatcher\/ipad\/jdwz\/config\/server\/list url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fbbbb.js
^https:\/\/ke\.fenbi\.com\/ipad\/jdwz\/v3\/episodes\/\d+\/mediafile\/meta url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fbbbb.js
^https:\/\/ke\.fenbi\.com\/ipad\/sydw\/v3\/episodes\/\d+\/mediafile\/meta url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fbbbb.js
^https:\/\/ke\.fenbi\.com\/ipad\/v3\/user_study\/entry url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fbbbb.js
#续费处理
^https:\/\/ke\.fenbi\.com\/ipad\/v3\/(member_centers\/sale_center|user_member\/configs) url script-response-body https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E9%87%8D%E5%86%99/fbbbb.js



#> 粉笔
# 开屏广告
^https:\/\/tiku\.fenbi\.com\/activity\/app\/launcher url reject
# 首页 - 弹窗
^https:\/\/keapi\.fenbi\.com\/app\/ipad\/\w+\/popup url reject
# 首页 - 新用户注册送好礼全屏弹窗
^https:\/\/market-api\.fenbi\.com\/ipad\/v1\/assistant\/info url reject
# 首页 - 悬浮窗 - 笔面常备资料
^https:\/\/market-api\.fenbi\.com\/ipad\/v1\/assistant\/entrance\/show url reject
# 滑块删除
^https:\/\/tiku\.fenbi\.com\/ipad\/xingce\/banners\/v2 url reject
^https:\/\/keapi\.fenbi\.com\/app\/ipad\/xingce\/small_banner url reject
# 粉笔首页配置项去除
^https:\/\/tiku\.fenbi\.com\/ipad\/xingce\/course\/module\/config\/v2 url script-response-body https://raw.githubusercontent.com/Zhao242/ShanYangProxyApps/main/Js/fenbi.js

*
[mitm]
hostname = keapi.fenbi.com, ke.fenbi.com, live.fenbi.com
*/

const url = $request.url;
const body = $response.body;
let obj = JSON.parse(body);
let currentTime = Date.now();


// 修改 AI 教师会员信息
if (url.includes('/ai/ipad/entry')) {
    if (obj.data && obj.data.userMember) {
        obj.data.userMember.member = true;
        obj.data.aiteacherDisplayed = true;
        obj.data.aiteacherActivated = true;
        obj.data.userMember.memberClass = 1;    //[1, 2, 4, 5, 7, 8, 9, 10, 11, 13, 14, 16, 17, 18, 20, 40, 52]
        obj.data.userMember.memberType = 20;  // 设置会员配置的类型为指定数组;
        obj.data.svipMemberType = 20;
        obj.data.userMember.expireTime = 4102359799000;  // 2099-12-31
        obj.data.userMember.hasBeenMember = true;
        obj.data.userMember.memberStatus = 2;
        obj.data.userMember.createdTime = 1551873177267;
    }
}

// 修改用户余额为 999999 并设置 updatedTime 为当前时间
if (url.includes('/ipad/v3/users/balance')) {
    if (obj.data && obj.data.balance !== undefined) {
        obj.data.balance = 999999;
        obj.data.updatedTime = currentTime;
    }
}

/*
// 课程价格修改
if (url.includes('/ipad/v3/member_centers/sale_center')) {
    for (let item of obj.data) {
        if (item.memberContents) {
            for (let content of item.memberContents) {
                content.payPrice = 0;
                content.price = 0;
            }
        }
        if (item.contents) {
            for (let content of item.contents) {
                content.payPrice = 0;
                content.price = 0;
            }
        }
    }
}
*/

// 判断 URL 是否包含特定地址
if (url.includes('/ipad/v3/user_member/home')) {
    // 修改 userMember 部分
    if (obj.data && obj.data.userMember) {
        obj.data.userMember.member = true; // 开通会员
        obj.data.userMember.memberClass = 2; // 设置会员级别[1, 2, 4, 5, 7, 8, 9, 10, 11, 13, 14, 16, 17, 18, 20, 40, 52]
        obj.data.userMember.memberType = 20; // 设置会员类型为指定数组
        obj.data.userMember.expireTime = 4102359799000; // 设置过期时间
        obj.data.userMember.hasBeenMember = true; // 已经是会员
        obj.data.userMember.memberStatus = 2; // 会员状态设为已开通
        obj.data.userMember.createdTime = 1651873177267; // 设置创建时间
        obj.data.memberConfig.memberSaleCenterId = 51;
    }

    // 修改 memberConfig 部分
  if (obj.data && obj.data.memberConfig) {
        obj.data.memberConfig.memberType = 20;
    // 遍历 memberBenefits 数组，将每个元素的 svip 属性设置为 true
     if (obj.data && obj.data.memberConfig && Array.isArray(obj.data.memberConfig.memberBenefits)) {
       obj.data.memberConfig.memberBenefits.forEach(item => {
              item.svip = true;
         });
     }

        if (Array.isArray(obj.data.memberConfig.memberBenefits)) {
            obj.data.memberConfig.memberBenefits.forEach(benefit => {
                if (benefit.title === "经典课程" || benefit.title === "精选电子书") {
                    benefit.native = true;
                }
            });
        }
    }

// 将所有电子书//课程设为已购买
 if (obj.data && obj.data.modules) {
        obj.data.modules.forEach(module => {
            if (module.content && module.content.episodes && Array.isArray(module.content.episodes)) {
                module.content.episodes.forEach(episode => {
                    if (episode.episodeDetail && episode.episodeDetail.mediaSizes) {
                        episode.episodeDetail.mediaSizes = {
                            "1": 17141434,
                            "2": 24253938,
                            "3": 44905243
                        };
                    }
                });
            }

            if (module.content && module.content.userMorningReading) {
                module.content.userMorningReading.trial = false;
            }
        });

        for (let module of obj.data.modules) {
            if (module.content.eBooks) {
                for (let ebook of module.content.eBooks) {
                    ebook.requireMemberTypes = [ 1, 2, 4, 5, 7, 8, 9, 10, 11, 13, 14, 16, 17, 18, 20 ];
                    ebook.paid = true;
                    ebook.free = true;
                }
            }
            if (module.content.lectures) {
                for (let lecture of module.content.lectures) {
                    lecture.hasAudition = true;
                }
            }
            if (module.content.userMorningReading) {
                module.content.userMorningReading.trial = false;
                module.content.userMorningReading.memberUserSummaryRet.readMemberArticle = true;
            }
        }
    }

// 将所有已购买
    obj.data.modules.forEach(module => {
        if (module.content) {
            if (module.content.eBooks) {
                module.content.eBooks.forEach(eBook => {
                    eBook.paid = true;
                    eBook.free = true;
                });
            }
            if (module.content.lectures) {
                module.content.lectures.forEach(lecture => {
                    lecture.paid = true;
                    lecture.free = true;
                });
            }
        }
    });
}


if (url.includes("/ipad/v3/user_member/course_configs")) {
    // 记录每个 memberType 的对应值
    var memberTypeDict = {
        2: 2,  // 行测
        1: 1,  // 申论
        5: 5,  // 面试
        7: 7,  // 资格笔试
        8: 8,  // 招聘笔试
        17: 17, // 招聘面试
        16: 16, // 资格面试
        4: 4,  // 公基
        11: 11, // 职测
        13: 13, // 综应
        14: 14, // 公安招警
        15: 15, // 医疗笔试
        18: 18, // 医疗面试
        6: 6,  // 办公
        20: 20 // 军队文职
    };

    // 遍历 datas 数组中的每个 course
    if (obj.datas && Array.isArray(obj.datas)) {
        obj.datas.forEach(course => {
            if (course.memberConfigs && Array.isArray(course.memberConfigs)) {
                course.memberConfigs.forEach(config => {
                    if (config.memberType !== undefined) {
                        // 更新 svipMemberType 和 svipTitle
                        if (memberTypeDict[config.memberType] !== undefined) {
                            config.svipMemberType = memberTypeDict[config.memberType];
                            config.svipTitle = config.title + "SVIP"; // 设置 svipTitle
                        }
                    }
                });
            }
        });
    }
}






 if (url.includes("/members/member_static_config")) {
  obj.data.forEach(item => {
  item.svipMemberType = item.memberType;
});

 }

if (url.includes("/ipad/jdwz/v3/lectures")) {
    if (url.includes("/summary")) {
        if (obj.datas && Array.isArray(obj.datas)) {
            obj.datas.forEach(item => {
                if (item.payload) {
                    item.payload.hasAudition = true;
                }
            });
        }
    }
}


    if (url.includes("/ipad/sydw/v3/orders/unpaid_order")) {
       obj.data.orderId = 999999999;
       obj.code = 1;
   }

    if (url.includes("/ipad/jdwz/v3/orders/uni") || url.includes("/ipad/sydw/v3/orders/uni")) {
       obj.code = 1;
       obj.msg = "购买成功";
   }

    if (url.includes("/ipad/sydw/v3/orders/pre_best")) {
      if (obj.data) {
    obj.data.payFee = 0; 
    obj.data.couponFee = obj.data.totalFee; 
    obj.data.discountFee = obj.data.totalFee;
    obj.data.cutFee = obj.data.totalFee; 
         }
   }

if (url.includes("/jdwz/v3/lectures/") && url.includes("/detail_for_sale_v2")) {
    if (obj.data) {
        // 确保 obj.data 和其属性存在
        obj.data.hasRedirectInstructorAfterPaid = false;
        obj.data.promotionPrice = 0;
        obj.data.distributionId = 1;
        obj.data.price = 0;
        obj.data.topPrice = 0;
        obj.data.floorPrice = 0;
        
        // 确保 bestDiscount 存在
        if (obj.data.bestDiscount) {
            obj.data.bestDiscount.discountedPrice = 0;
        }        
        obj.data.payPrice = 0;
    }
}


//电子书
    if (url.includes("/ipad/v3/ebook/list_by_cat")) {
     if (Array.isArray(obj.datas)) {
        obj.datas.forEach(item => {
            if (item) { // 确保 item 存在
                item.paid = true; 
                item.free = true; 
                item.requiredMemberTypes = [1, 2, 4, 5, 7, 8, 9, 10, 11, 13, 14, 16, 17, 18, 20, 40, 52];
            }
        });
    }
}

    if (url.includes("/ipad/v3/ebook/detail")) {
    obj.data.paid = true;
    obj.data.requiredMemberTypes = [1, 2, 4, 5, 7, 8, 9, 10, 11, 13, 14, 16, 17, 18, 20, 40, 52];
    obj.data.free = true;
    obj.data.payPrice = 0;
    obj.data.price = 0;
}

    if (url.includes("/ipad/v3/member_lectures")) {
    obj.datas.forEach(item => {
      item.hasAudition = true;
      item.episodeDetail.hasAudition = true;
      item.episodeDetail.status = 1;
      item.privilegePopInfo = "永久会员";
    });
}


// 我的课程
if (url.includes("/jdwz/v3/my/lectures/")) { // 检查 URL 是否匹配
    // 判断是否是期望的课程ID的URL
    if (url.includes("/summary")) {
        // 针对summary的处理
        if (obj.data && obj.data.title) {
            obj.data.hasUserFormAfterOrder = false;
            obj.data.enrollStatus = 0;
            obj.data.hasWatchStatPanel = false;
            obj.data.hasUserContentInfo = false;
            obj.data.needAgreement = false;
            obj.data.hasRedirectInstructorAfterPaid = false;
            //obj.data.code = "1327454000"; //?
            obj.data.groupType = 0;
        } else if (obj.msg && obj.code) {
            obj.code = 1;
            obj.msg = "";
        }
    }
}

// 确保 URL 符合目标模式
if (url.match(/\/ipad\/jdwz\/v3\/lectures\/\d+\/episode_nodes/)) {
    // 确保 obj.datas 存在且是一个数组
    if (obj.datas && Array.isArray(obj.datas)) {
        obj.datas.forEach(item => {
            if (item.payload) {
                item.payload.hasAudition = true;  
                item.payload.playStatus = 3;
                item.payload.status = 3;
                item.payload.liveConfig.hasStrokeKeynote =true;
                item.bizType = 200;
            }
        });
    }
}


// 处理 "/im/ipad/signatures/signature" 的响应
if (url.includes("/im/ipad/signatures/signature")) {
    obj.code = 1;
}

if (url.includes("/v3/red_packet_share/activities/detail/by_order") || url.includes("/dispatcher/ipad/jdwz/config/server/list")) {
    obj.code = 1;
    obj.msg = "";
}

if (url.includes("/sydw/v3/livereplay/replay/lectures") || url.includes("/ipad/jdwz/v3/ticket")) {
    obj.code = 1;
    obj.msg = "";
}
if (url.includes("/user_prime_lectures/is_user_prime_lecture") || url.includes("/v3/ebook/update/user_books")) {
    obj.data = true;
}
/*
if (url.includes("^https:\/\/ke\.fenbi\.com\/ipad\/sydw\/v3\/episodes\/\d+")) {
     if (obj.data.hasVideo && obj.data.hasAudition) {
    obj.data.playStatus = 3;
    obj.data.bizType = 8;
    obj.data.hasAudition = false;
    obj.data.supportLive = true;
    obj.data.supportReplay = true;
    obj.data.hasVideo = true;
    obj.data.videoDisplayType = true;
    obj.data.liveConfig.hasStrokeKeynote =true;
    obj.data.playStatus = 3;
    //obj.data.enterRoomTimeInterval = 0;
    obj.data.recordingType = 1;
    obj.data.status = 3;
       }
}
*/

// 检查是否匹配指定的 URL
if (url.includes("/ipad/v3/members/details")) {
    // 确保响应体中存在 data
    if (obj.data) {
        // 获取 obj.data 中键为 "1" 的值
        var referenceValue = obj.data["1"] ? obj.data["1"].memberClass : null;
        
        // 如果 referenceValue 存在，则更新每个成员的 memberType
        if (referenceValue !== null) {
            for (var key in obj.data) {
                if (obj.data.hasOwnProperty(key)) {
                    var memberData = obj.data[key];
                    if (memberData) {
                        memberData.memberType = referenceValue;
                    }
                }
            }
        }
    }
}



if (url.includes("/school/ipad/offline_classes/config/get_by_biz")) {
    obj.data.seatConfig.enable = true;
    obj.data.seatConfig.seatStatus = 1;
    obj.data.seatConfig.openTime = 1;
    obj.data.seatConfig.supportSelectSet = 1;
    obj.data.leaveConfig.enable = true;
}

if (url.includes("/jdwz/v3/my/lectures/") && url.includes("/episode_sets")) {
    if (obj.msg) {
      obj.msg = "";
      obj.code = 1;
     }
}

if (url.includes("/sydw/v3/user_content_forms/is_filled")) {
    obj.data = true;
}

if (url.includes("/livereplay/replay/lectures/0/episodes")) {
    obj.code = 1;
    obj.msg = "";
}

if (url.includes("/user_member/configs")) {
    if (obj.datas && Array.isArray(obj.datas)) {
    obj.datas.forEach(item => {
        if (item.memberType !== undefined) {
            item.svipMemberType = 52; // 将 svipMemberType 设置为 item.memberType 的值
            }
      });
   }
}

// 匹配两个不同的 URL 模式
if (url.match(/^https:\/\/ke\.fenbi\.com\/ipad\/(jdwz|sydw|v3\/user_study\/entry|v3\/episodes\/\d+\/mediafile\/meta)/)) {
    if (obj.msg) {
        obj.msg = "";
        obj.code = 1;
    }
}

if (url.includes("/v3/member_centers/sale_center")) {
  function modifyEndTime(data) {
    data.forEach(item => {
        if (item.memberContents) {
            item.memberContents.forEach(content => {
                content.endTime = 4102415999000; 
            });
        }
        if (item.contents) {
            item.contents.forEach(content => {
                content.endTime = 4102415999000;
            });
        }
      });
     }
  if (obj.data) {
    modifyEndTime(obj.data);
    }
}



$done({body: JSON.stringify(obj)});
