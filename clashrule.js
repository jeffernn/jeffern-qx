// =============================================
// 核心常量 - 完全跟随 Quantumult X policy 结构
// =============================================
const PROXY_GROUPS = {
  PROXY: "🔆",             // 主代理选择（自建/机场）
  AD_BLOCK: "🚫 广告拦截",
  DIRECT: "🌐 国内直连",
  NETFLIX: "🎬️ Netflix",
  DISNEY: "🐭 Disney+",
  TIKTOK: "🎵 TikTok",
  AI: "🤖 AI Platforms",
  FINAL: "🐟 Final"
};

const ICONS = {
  PROXY: "https://raw.githubusercontent.com/Aoyt520/jiumeiquanX/master/quanX/DHF.png",
  AD: "https://raw.githubusercontent.com/Aoyt520/jiumeiquanX/master/quanX/Advertising.png",
  DIRECT: "https://raw.githubusercontent.com/Aoyt520/jiumeiquanX/master/quanX/Hulu.png",
  NETFLIX: "https://raw.githubusercontent.com/Aoyt520/jiumeiquanX/master/quanX/Netflix.png",
  DISNEY: "https://raw.githubusercontent.com/Aoyt520/jiumeiquanX/master/quanX/HWDS.png",
  TIKTOK: "https://raw.githubusercontent.com/Aoyt520/jiumeiquanX/master/quanX/Tiktok.png",
  AI: "https://raw.githubusercontent.com/Aoyt520/jiumeiquanX/master/quanX/Hijacking.png",
  FINAL: "https://raw.githubusercontent.com/Aoyt520/jiumeiquanX/master/quanX/Final.png"
};

// =============================================
// 规则提供者 - 直接对应 QX [filter_remote]
// =============================================
const ruleProviders = {
  "广告杀手1": {
    type: "http",
    behavior: "classical",
    format: "text",
    interval: 172800,
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Advertising/Advertising.list",
    path: "./ruleset/广告杀手1.list"
  },
  "广告杀手2": {
    type: "http",
    behavior: "classical",
    format: "text",
    interval: 172800,
    url: "https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E5%88%86%E6%B5%81/ADDONE.list",
    path: "./ruleset/广告杀手2.list"
  },
  "广告杀手3": {
    type: "http",
    behavior: "classical",
    format: "text",
    interval: 172800,
    url: "https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-QuantumultX.list",
    path: "./ruleset/广告杀手3.list"
  },
  "毒奶网页广告": {
    type: "http",
    behavior: "classical",
    format: "text",
    interval: 172800,
    url: "https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E5%88%86%E6%B5%81/ADwebdone.list",
    path: "./ruleset/毒奶网页广告.list"
  },
  "机场专线": {
    type: "http",
    behavior: "classical",
    format: "text",
    interval: 172800,
    url: "https://raw.githubusercontent.com/limbopro/Profiles4limbo/main/airports.list",
    path: "./ruleset/机场专线.list"
  },
  "国内直连1": {
    type: "http",
    behavior: "classical",
    format: "text",
    interval: 172800,
    url: "https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E5%88%86%E6%B5%81/Direct1.list",
    path: "./ruleset/国内直连1.list"
  },
  "国内直连2": {
    type: "http",
    behavior: "classical",
    format: "text",
    interval: 172800,
    url: "https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E5%88%86%E6%B5%81/Direct2.list",
    path: "./ruleset/国内直连2.list"
  },
  "国内直连3": {
    type: "http",
    behavior: "classical",
    format: "text",
    interval: 172800,
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Direct/Direct.list",
    path: "./ruleset/国内直连3.list"
  },
  "国内直连4": {
    type: "http",
    behavior: "classical",
    format: "text",
    interval: 172800,
    url: "https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E5%88%86%E6%B5%81/Direct.list",
    path: "./ruleset/国内直连4.list"
  },
  Netflix: {
    type: "http",
    behavior: "classical",
    format: "text",
    interval: 172800,
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Netflix/Netflix.list",
    path: "./ruleset/Netflix.list"
  },
  Disney: {
    type: "http",
    behavior: "classical",
    format: "text",
    interval: 172800,
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Disney/Disney.list",
    path: "./ruleset/Disney.list"
  },
  TikTok: {
    type: "http",
    behavior: "classical",
    format: "text",
    interval: 172800,
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/TikTok/TikTok.list",
    path: "./ruleset/TikTok.list"
  },
  Apple: {
    type: "http",
    behavior: "classical",
    format: "text",
    interval: 172800,
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Apple/Apple.list",
    path: "./ruleset/Apple.list"
  },
  AI_OpenAI: {
    type: "http",
    behavior: "classical",
    format: "text",
    interval: 172800,
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/OpenAI/OpenAI.list",
    path: "./ruleset/OpenAI.list"
  },
  AI_Bard: {
    type: "http",
    behavior: "classical",
    format: "text",
    interval: 172800,
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/BardAI/BardAI.list",
    path: "./ruleset/BardAI.list"
  },
  AI_Claude: {
    type: "http",
    behavior: "classical",
    format: "text",
    interval: 172800,
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Claude/Claude.list",
    path: "./ruleset/Claude.list"
  },
  AI_Other: {
    type: "http",
    behavior: "classical",
    format: "text",
    interval: 172800,
    url: "https://raw.githubusercontent.com/limbopro/Profiles4limbo/main/AI_Platforms_qx.list",
    path: "./ruleset/AI_Platforms.list"
  }
};

// =============================================
// 基础规则 - 对应 QX 的 force-policy 逻辑
// =============================================
const baseRules = [
  // 广告拦截（多源合并）
  "RULE-SET,广告杀手1,🚫 广告拦截",
  "RULE-SET,广告杀手2,🚫 广告拦截",
  "RULE-SET,广告杀手3,🚫 广告拦截",
  "RULE-SET,毒奶网页广告,🚫 广告拦截",

  // 机场专线 → 走代理
  "RULE-SET,机场专线,🔆",

  // 国内直连（四源合并）
  "RULE-SET,国内直连1,🌐 国内直连",
  "RULE-SET,国内直连2,🌐 国内直连",
  "RULE-SET,国内直连3,🌐 国内直连",
  "RULE-SET,国内直连4,🌐 国内直连",

  // 流媒体 & 特殊服务
  "RULE-SET,Netflix,🎬️ Netflix",
  "RULE-SET,Disney,🐭 Disney+",
  "RULE-SET,TikTok,🎵 TikTok",
  "RULE-SET,Apple,🌐 国内直连",

  // AI 平台统一走代理（或根据需求可改 direct）
  "RULE-SET,AI_OpenAI,🤖 AI Platforms",
  "RULE-SET,AI_Bard,🤖 AI Platforms",
  "RULE-SET,AI_Claude,🤖 AI Platforms",
  "RULE-SET,AI_Other,🤖 AI Platforms",

  // 最终兜底
  "MATCH,🐟 Final"
];

// =============================================
// 策略组定义 - 严格跟随 QX [policy]
// =============================================
function buildProxyGroups(proxies) {
  return [
    {
      name: PROXY_GROUPS.PROXY,
      type: "select",
      proxies: ["✨", ...proxies.map(p => p.name)],  // ✨ 代表 url-test 或 load-balance 节点
      icon: ICONS.PROXY
    },
    {
      name: PROXY_GROUPS.AD_BLOCK,
      type: "select",
      proxies: ["REJECT", "DIRECT"],
      icon: ICONS.AD
    },
    {
      name: PROXY_GROUPS.DIRECT,
      type: "select",
      proxies: ["DIRECT", PROXY_GROUPS.PROXY],
      icon: ICONS.DIRECT
    },
    {
      name: PROXY_GROUPS.NETFLIX,
      type: "select",
      proxies: [PROXY_GROUPS.PROXY, "DIRECT"],
      icon: ICONS.NETFLIX
    },
    {
      name: PROXY_GROUPS.DISNEY,
      type: "select",
      proxies: [PROXY_GROUPS.PROXY, "DIRECT"],
      icon: ICONS.DISNEY
    },
    {
      name: PROXY_GROUPS.TIKTOK,
      type: "select",
      proxies: [PROXY_GROUPS.PROXY, "DIRECT"],
      icon: ICONS.TIKTOK
    },
    {
      name: PROXY_GROUPS.AI,
      type: "select",
      proxies: [PROXY_GROUPS.PROXY, "DIRECT"],
      icon: ICONS.AI
    },
    {
      name: PROXY_GROUPS.FINAL,
      type: "select",
      proxies: [PROXY_GROUPS.PROXY, "DIRECT"],
      icon: ICONS.FINAL
    }
  ];
}

// =============================================
// 主函数 - 生成 Clash 配置
// =============================================
function main(input) {
  const config = {
    proxies: input.proxies || [],
    "proxy-groups": buildProxyGroups(input.proxies || []),
    "rule-providers": ruleProviders,
    rules: [...baseRules],
    dns: {
      enable: true,
      ipv6: true,
      "enhanced-mode": "redir-host",
      nameserver: ["223.5.5.5", "119.29.29.29", "8.8.8.8", "1.1.1.1"]
    },
    sniffer: {
      enable: true,
      sniff: ["http", "tls"]
    }
  };

  // 可选：添加更多通用设置（根据需要开启）
  // config.port = 7890;
  // config["allow-lan"] = true;
  // config.mode = "rule";

  return config;
}

module.exports.main = main;
