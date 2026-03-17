// ==UserScript==
// @name        pandas
// @match       https://pan.baidu.com/
// @match       https://pan.baidu.com/*
// @grant       unsafeWindow
// @run-at      document-start
// @author      Jeffern
// ==/UserScript==

(function() {
  'use strict';

  var store = {
    path: null,
    adToken: null,
    bdstoken: null,
    resolutionPattern: /M3U8_AUTO_([0-9]+?)&/,
  }
  store.path = new URLSearchParams(new URL(location.href).search).get('path');

  function hookRequest() {
      var originOpen = XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open = function (method, url) {
        if (url.indexOf('/api/loginStatus') != -1) {
          this.addEventListener('readystatechange', function() {
            if (this.readyState == 4) {
              let res = JSON.parse(this.responseText)
              res.login_info.vip_type = '21'
              res.login_info.vip_identity = '21'
              res.login_info.vip_level =  8
              res.login_info.vip_point = 99999
              res.login_info.username = 'GwenCrackヾ(-_-;)'
              store.bdstoken = res.login_info.bdstoken
              Object.defineProperty(this, "responseText", {
                  writable: true,
              });
              this.responseText = JSON.stringify(res)
            }
          })
          originOpen.apply(this, arguments);
        } else if (url.indexOf('/user/info') != -1) {
          this.addEventListener('readystatechange', function() {
            if (this.readyState == 4) {
              let res = JSON.parse(this.responseText)
              res.user_info.is_vip = 1
              res.user_info.is_svip = 1
              res.user_info.is_plus_buy =        1
              Object.defineProperty(this, "responseText", {
                  writable: true,
              });
              this.responseText = JSON.stringify(res)
            }
          })
          originOpen.apply(this, arguments);
        } else if (url.indexOf('/membership/user') != -1) {
          this.addEventListener('readystatechange', function() {
            if (this.readyState == 4) {
              let res = JSON.parse(this.responseText)
              res.reminder = {
                "svip": {
                  "leftseconds": 9999999999,
                  "nextState": "normal"
                }
              }
              res.level_info = {
                "current_value": 12090,
                "current_level": 10,
                "history_value": 11830,
                "history_level": 10,
                "v10_id": "666666",
                "last_manual_collection_time": 0
              }
              res.product_infos = [{
                "product_id": "",
                "start_time": 1685635199,
                "end_time": 1888227199,
                "buy_time": 0,
                "cluster": "vip",
                "detail_cluster": "svip",
                "auto_upgrade_to_svip": 0,
                "product_name": "svip2_nd",
                "status": 0,
                "function_num": 0,
                "buy_description": "",
                "product_description": "",
                "cur_svip_type": "month"
              }]
              res.current_product = {
                "cluster": "vip",
                "detail_cluster": "svip",
                "product_type": "vip2_1m_auto",
                "product_id": "12187135090581539740"
              }
              res.current_product_v2 = {
                "cluster": "vip",
                "detail_cluster": "svip",
                "product_type": "vip2_1m_auto",
                "product_id": "12187135090581539740"
              }
              Object.defineProperty(this, "responseText", {
                  writable: true,
              });
              this.responseText = JSON.stringify(res)
            }
          })
          originOpen.apply(this, arguments);
        } else if (url.indexOf('/api/streaming') != -1 && url.indexOf('M3U8_SUBTITLE_SRT') == -1) { //获取视频m3u8接口
          let modifiedUrl = url.replace(/vip=2/, 'vip=0')
                  .replace(/_1080&/, '_720&')
          if (store.adToken) {
            modifiedUrl += ('&adToken=' + encodeURIComponent(store.adToken))
            this.adToken = store.adToken
            store.adToken = null
            originOpen.call(this, method, modifiedUrl, false);
            return
          }
          originOpen.call(this, method, modifiedUrl);
          this.addEventListener('readystatechange', function() {
            if (this.readyState == 4) {
              if (this.responseText[0] == '{') {
                let res = JSON.parse(this.responseText)
                store.adToken = res.adToken
                let manualRequest = new XMLHttpRequest();
                // let manualUrl = `https://pan.baidu.com/api/streaming?app_id=250528&clienttype=0&channel=chunlei&web=1&isplayer=1&check_blue=1&type=M3U8_AUTO_${store.resolutionPattern.exec(url)[1]}&trans=&vip=0` +
                //           `&bdstoken=${store.bdstoken||unsafeWindow.locals.bdstoken}&path=${store.path}&jsToken=${unsafeWindow.jsToken}`
                let manualUrl = modifiedUrl
                console.log(manualUrl)
                manualRequest.open(method, manualUrl, false);
                manualRequest.send();
                Object.defineProperty(this, "status", {
                  writable: true,
                });
                this.status = manualRequest.status;
                Object.defineProperty(this, "responseText", {
                  writable: true,
                });
                this.responseText = manualRequest.responseText;
              }
            }
          })
        } else if (url.indexOf('/msg/streaming') != -1) {
          this.addEventListener('readystatechange', function() {
            if (this.readyState == 4) {
              if (this.responseText[0] != '{')
                return
              let res = JSON.parse(this.responseText)
              res.ltime = 0.000001
              res.adTime = 0.000001
              console.log(res)
              Object.defineProperty(this, 'responseText', {
                writable: true,
              })
              this.responseText = JSON.stringify(res)
            }
          })
          originOpen.apply(this, arguments);
        }
        else {
          originOpen.apply(this, arguments);
        }
      }
    }

  hookRequest()
    // 设置背景颜色
    const bgStyle = document.createElement("style");
    bgStyle.textContent = `
    body, html, #app, .main-container {
    background-color: #F7F7F7 !important;
     }
   `;
document.head.appendChild(bgStyle);

    //移除SVIP无效图标及其字幕功能
    const style=document.createElement("style");
    style.textContent=`
    .vjs-menu-item-badge{display:none!important}

    /* 只隐藏字幕菜单 */
    .vjs-subtitle-wrapper{
    display:none!important;
    }

    /* 隐藏字幕文字 */
    .vjs-subtitle-wrapper .vjs-full-menu-text{
    display:none!important;
    }
    /* 隐藏音量菜单 */
    .vjs-volume-wrapper { display: none !important; }
    .vjs-volume-wrapper .vjs-full-menu-text { display: none !important; }

    /* 隐藏整个音量面板 */
    .vjs-volume-panel { display: none !important; }

    /* 隐藏下拉列表顶部文字提示 */
    .vjs-menu-footnote-text { display: none !important; }
    .vjs-full-menu-icon { display: none !important; }
    .vjs-menu-title { display: none !important; }
    `;
    document.head.appendChild(style);

    //移除无关元素
    (function removeVideoButtons() {
      const selectors = [
        // 视频右侧相关
        "a.video-title-right-open-text",            // 手机提示文字
        "i.video-title-right-open-icon.icon-sjck", // 手机提示图标
        "a.g-button[node-type='share']",            // 分享按钮
        "a.g-button[node-type='download']",         // 下载按钮
        "a.g-button[node-type='appeal']",           // 申诉按钮
        "a.g-button[node-type='notes']",            // 记笔记按钮
        "div.video-functions-tips",                 // 播放器右上角提示面板
        // 顶部会员信息及按钮
        "span[node-type='app-user-vip-center']",   // 会员中心
        "a.app-download",                           // 客户端下载
        "a.icon-feedback",                          // 意见反馈
        "a.icon.app-notice",                        // 系统通知
        "span[node-type='app-user-info']",          // 用户头像、昵称、VIP图标
        "dl[node-type='header-apps']",              // 顶部应用栏
        "dd[node-type='header-link']",              // 顶部导航链接
        "a.icon.icon-theme.app-theme.app-icon",     // 皮肤中心按钮
        "div[node-type='module-header-wrapper']",    // 顶部 header 容器
        // 底部页脚
        "div.dis-footer",
        //其他视频字样
        "div.video-other-title",
        "div.video-list-time"
      ];

     // 定时扫描页面并移除这些元素
     setInterval(() => {
       selectors.forEach(sel => {
         document.querySelectorAll(sel).forEach(el => el.remove());
       });
     }, 500); // 每 500ms 扫描一次
   })();

    // 让视频组件整体下移
    const moveVideoDown = document.createElement("style");
    moveVideoDown.textContent = `
    .module-video.global-clearfix {
    margin-top: 100px !important; /* 可根据需求调整数值 */
    }
    `;
    document.head.appendChild(moveVideoDown);

    // 等待播放器实例加载完成，设置默认音量为 100%
    function setDefaultVolume() {
    const video = document.querySelector('video');
        if(video){
            video.volume = 1; // 音量 0~1, 1 表示 100%
            video.muted = false; // 取消静音
        } else {
    // 如果视频还没加载，延迟重试
            setTimeout(setDefaultVolume, 100);
        }
     }
     setDefaultVolume();


  let localsTimer = setInterval(() => {
    if (!unsafeWindow.locals) return
    clearInterval(localsTimer)
    console.log('设置window.locas', unsafeWindow.locals)
    let originalSet = unsafeWindow.locals.set
    unsafeWindow.locals.set = function(n, t) {
      console.log('%c[hook]' + n + ': ' + t, 'color:blue;')
      if (['is_vip', 'is_svip'].indexOf(n) != -1) {
        t = 1
      } else if (n == 'vip_level') {
        t = 10
      } else if (n == 'v10_id') {
        t = '666666'
      }
      console.log(arguments)
      originalSet.apply(this, [n, t])
    }
    if (unsafeWindow.locals.userInfo) {
      unsafeWindow.locals.userInfo.vip_level = 8
      unsafeWindow.locals.userInfo.vip_identity = 21
      unsafeWindow.locals.userInfo.username = "GwenCrackヾ(-_-;)"
    } else if(unsafeWindow.locals.mset) {
      unsafeWindow.locals.mset({
        'is_vip': 1,
        'is_svip': 1,
        'vip_level': 8,
        'show_vip_ad': 0
      })
    } else {
      unsafeWindow.locals.vip_level = 8
      unsafeWindow.locals.is_vip = 1
      unsafeWindow.locals.is_svip = 1
      unsafeWindow.locals.is_evip = 0
      unsafeWindow.locals.show_vip_ad = 0
    }
  }, 10)

})()
