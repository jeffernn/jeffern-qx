// QuantumultX配置转换为mihomo配置

// 策略组定义
const proxyGroups = [
    {
        name: "光环",
        type: "select",
        icon: "https://raw.githubusercontent.com/Aoyt520/jiumeiquanX/master/quanX/DHF.png",
        proxies: ["✨", "手动选择", "直连"]
    },
    {
        name: "✨",
        type: "url-test",
        icon: "https://raw.githubusercontent.com/Aoyt520/jiumeiquanX/master/quanX/Pgxw.png",
        url: "https://cp.cloudflare.com/generate_204",
        interval: 300,
        tolerance: 0,
        "alive-checking": false,
        "include-all": true,
        filter: "自建|机场"
    },
    {
        name: "🚫 广告拦截",
        type: "select",
        icon: "https://raw.githubusercontent.com/Aoyt520/jiumeiquanX/master/quanX/Advertising.png",
        proxies: ["REJECT", "REJECT-DROP", "🌐 国内直连"]
    },
    {
        name: "🌐 国内直连",
        type: "select",
        icon: "https://raw.githubusercontent.com/Aoyt520/jiumeiquanX/master/quanX/Hulu.png",
        proxies: ["DIRECT"]
    },
    {
        name: "🎬️ Netflix",
        type: "select",
        icon: "https://raw.githubusercontent.com/Aoyt520/jiumeiquanX/master/quanX/Netflix.png",
        proxies: ["光环"]
    },
    {
        name: "🐭 Disney+",
        type: "select",
        icon: "https://raw.githubusercontent.com/Aoyt520/jiumeiquanX/master/quanX/HWDS.png",
        proxies: ["光环"]
    },
    {
        name: "🎵 TikTok",
        type: "select",
        icon: "https://raw.githubusercontent.com/Aoyt520/jiumeiquanX/master/quanX/Tiktok.png",
        proxies: ["光环"]
    },
    {
        name: "🤖 AI Platforms",
        type: "select",
        icon: "https://raw.githubusercontent.com/Aoyt520/jiumeiquanX/master/quanX/Hijacking.png",
        proxies: ["光环", "DIRECT"]
    },
    {
        name: "🐟 Final",
        type: "select",
        icon: "https://raw.githubusercontent.com/Aoyt520/jiumeiquanX/master/quanX/Final.png",
        proxies: ["光环", "DIRECT"]
    }
];

// 规则提供者定义
const ruleProviders = {
    "广告杀手1️⃣": {
        type: "http",
        behavior: "domain",
        format: "text",
        interval: 172800,
        url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Advertising/Advertising.list",
        path: "./ruleset/Advertising1.list"
    },
    "广告杀手2️⃣": {
        type: "http",
        behavior: "domain",
        format: "text",
        interval: 172800,
        url: "https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E5%88%86%E6%B5%81/ADDONE.list",
        path: "./ruleset/Advertising2.list"
    },
    "广告杀手3️⃣": {
        type: "http",
        behavior: "domain",
        format: "text",
        interval: 172800,
        url: "https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-QuantumultX.list",
        path: "./ruleset/Advertising3.list"
    },
    "毒奶特供(去网页广告计划)": {
        type: "http",
        behavior: "domain",
        format: "text",
        interval: 172800,
        url: "https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E5%88%86%E6%B5%81/ADwebdone.list",
        path: "./ruleset/ADwebdone.list"
    },
    "机场专线": {
        type: "http",
        behavior: "domain",
        format: "text",
        interval: 172800,
        url: "https://raw.githubusercontent.com/limbopro/Profiles4limbo/main/airports.list",
        path: "./ruleset/Airports.list"
    },
    "国内直连1️⃣": {
        type: "http",
        behavior: "domain",
        format: "text",
        interval: 172800,
        url: "https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E5%88%86%E6%B5%81/Direct1.list",
        path: "./ruleset/Direct1.list"
    },
    "国内直连2️⃣": {
        type: "http",
        behavior: "domain",
        format: "text",
        interval: 172800,
        url: "https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E5%88%86%E6%B5%81/Direct2.list",
        path: "./ruleset/Direct2.list"
    },
    "国内直连3️⃣": {
        type: "http",
        behavior: "domain",
        format: "text",
        interval: 172800,
        url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Direct/Direct.list",
        path: "./ruleset/Direct3.list"
    },
    "国内直连4️⃣": {
        type: "http",
        behavior: "domain",
        format: "text",
        interval: 172800,
        url: "https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E5%88%86%E6%B5%81/Direct.list",
        path: "./ruleset/Direct4.list"
    },
    "🎬️ Netflix": {
        type: "http",
        behavior: "domain",
        format: "text",
        interval: 172800,
        url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Netflix/Netflix.list",
        path: "./ruleset/Netflix.list"
    },
    "🐭 Disney+": {
        type: "http",
        behavior: "domain",
        format: "text",
        interval: 172800,
        url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Disney/Disney.list",
        path: "./ruleset/Disney.list"
    },
    "🎵 TikTok": {
        type: "http",
        behavior: "domain",
        format: "text",
        interval: 172800,
        url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/TikTok/TikTok.list",
        path: "./ruleset/TikTok.list"
    },
    "🍎 苹果服务": {
        type: "http",
        behavior: "domain",
        format: "text",
        interval: 172800,
        url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Apple/Apple.list",
        path: "./ruleset/Apple.list"
    },
    "🤖 AI Platforms": {
        type: "http",
        behavior: "domain",
        format: "text",
        interval: 172800,
        url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/OpenAI/OpenAI.list",
        path: "./ruleset/OpenAI.list"
    },
    "🤖 AI Platforms2": {
        type: "http",
        behavior: "domain",
        format: "text",
        interval: 172800,
        url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/BardAI/BardAI.list",
        path: "./ruleset/BardAI.list"
    },
    "🤖 AI Platforms3": {
        type: "http",
        behavior: "domain",
        format: "text",
        interval: 172800,
        url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Claude/Claude.list",
        path: "./ruleset/Claude.list"
    },
    "🤖 AI Platforms4": {
        type: "http",
        behavior: "domain",
        format: "text",
        interval: 172800,
        url: "https://raw.githubusercontent.com/limbopro/Profiles4limbo/main/AI_Platforms_qx.list",
        path: "./ruleset/AIPlatforms.list"
    }
};

// 规则定义
const rules = [
    "RULE-SET,广告杀手1️⃣,🚫 广告拦截",
    "RULE-SET,广告杀手2️⃣,🚫 广告拦截",
    "RULE-SET,广告杀手3️⃣,🚫 广告拦截",
    "RULE-SET,毒奶特供(去网页广告计划),🚫 广告拦截",
    "RULE-SET,机场专线,光环",
    "RULE-SET,国内直连1️⃣,🌐 国内直连",
    "RULE-SET,国内直连2️⃣,🌐 国内直连",
    "RULE-SET,国内直连3️⃣,🌐 国内直连",
    "RULE-SET,国内直连4️⃣,🌐 国内直连",
    "RULE-SET,🎬️ Netflix,🎬️ Netflix",
    "RULE-SET,🐭 Disney+,🐭 Disney+",
    "RULE-SET,🎵 TikTok,🎵 TikTok",
    "RULE-SET,🍎 苹果服务,🌐 国内直连",
    "RULE-SET,🤖 AI Platforms,🤖 AI Platforms",
    "RULE-SET,🤖 AI Platforms2,🤖 AI Platforms",
    "RULE-SET,🤖 AI Platforms3,🤖 AI Platforms",
    "RULE-SET,🤖 AI Platforms4,🤖 AI Platforms",
    "MATCH,🐟 Final"
];

// DNS配置
const dns = {
    enable: true,
    "use-system-hosts": false,  // 对应 no-system
    "enhanced-mode": "redir-host",
    "default-nameserver": ["119.29.29.29", "223.5.5.5"],
    nameserver: [
        "223.5.5.5",
        "119.29.29.29", 
        "8.8.8.8",
        "1.1.1.1",
        "[2400:3200::1]",
        "[2400:3200:baba::1]", 
        "[2402:4e00::]",
        "[2001:4860:4860::8888]",
        "[2606:4700:4700::1111]"
    ],
    "nameserver-policy": {
        "/*.icloud.com/": "119.29.29.29",
        "/*.icloud.com.cn/": "119.29.29.29",
        "/*.tencent.com/": "119.29.29.29",
        "/*.weixin.com/": "119.29.29.29"
    }
};

// 主函数
function main(config) {
    return {
        ...config,
        "proxy-groups": proxyGroups,
        "rule-providers": ruleProviders,
        rules: rules,
        dns: dns,
        mode: "rule",
        "log-level": "info"
    };
}

// 输出配置
$done(main({}));
