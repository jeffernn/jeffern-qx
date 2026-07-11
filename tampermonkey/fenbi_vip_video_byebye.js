// ==UserScript==
// @name        粉笔记忆页自动移除解析视频
// @namespace   fenbi-hide-video-section
// @match       *://spa.fenbi.com/ti/memorize/*
// @grant       none
// @version     1.0
// @author      -
// @description 页面动态加载完成后自动移除【解析视频】区块，无需快捷键
// ==/UserScript==
(function () {
    const selector = 'section[id^="section-video-"]';

    function removeVideoSection() {
        document.querySelectorAll(selector).forEach(el => {
            el.remove();
        });
    }

    // 监听DOM变化，题目切换自动清除视频模块
    const observer = new MutationObserver(removeVideoSection);
    observer.observe(document.body, { childList: true, subtree: true });

    // 初始执行一次
    setTimeout(removeVideoSection, 300);
})();
