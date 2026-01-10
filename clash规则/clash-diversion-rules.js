// 功能标志解析函数
function parseBool(e) {
  return typeof e === "boolean" ? e : (typeof e === "string" && (e.toLowerCase() === "true" || e === "1"));
}

function parseNumber(e, t = 0) {
  if (e == null) return t;
  const num = parseInt(e, 10);
  return isNaN(num) ? t : num;
}

// 构建功能标志
function buildFeatureFlags(e) {
  const flags = Object.entries({
    loadbalance: "loadBalance",
    landing: "landing",
    ipv6: "ipv6Enabled",
    full: "fullConfig",
    keepalive: "keepAliveEnabled",
    fakeip: "fakeIPEnabled",
    quic: "quicEnabled"
  }).reduce((acc, [key, mappedKey]) => {
    acc[mappedKey] = parseBool(e[key]) || false;
    return acc;
  }, {});
  flags.countryThreshold = parseNumber(e.threshold, 0); // 这个现在没用，但保留以防万一
  return flags;
}

// 获取参数
const rawArgs = typeof $arguments !== "undefined" ? $arguments : {};
const {
  loadBalance,
  landing,
  ipv6Enabled,
  fullConfig,
  keepAliveEnabled,
  fakeIPEnabled,
  quicEnabled,
  countryThreshold // 这个现在没用，但保留以防万一
} = buildFeatureFlags(rawArgs);

// 定义代理组名称
const PROXY_GROUPS = {
  SELECT: "全局设置",
  AUTO_SELECT: "自动优选",
  ADS_BLOCK: "广告拦截",
  DIRECT_CN: "国内直连",
  NETFLIX: "Netflix",
  DISNEY: "Disney+",
  TIKTOK: "TikTok",
  AI_PLATFORMS: "AI Platforms",
  FINAL: "Final"
};

// 构建列表辅助函数
const buildList = (...args) => args.flat().filter(Boolean);

// 构建基础代理列表
function buildBaseLists() {
  // 默认情况下，全局设置包含所有可选代理
  const defaultProxies = buildList(
    PROXY_GROUPS.SELECT,
    PROXY_GROUPS.AUTO_SELECT,
    PROXY_GROUPS.TIKTOK,
    PROXY_GROUPS.NETFLIX,
    PROXY_GROUPS.DISNEY,
    PROXY_GROUPS.AI_PLATFORMS,
    PROXY_GROUPS.DIRECT_CN,
    "REJECT"
  );

  // 直连优先的列表
  const defaultProxiesDirect = buildList(
    PROXY_GROUPS.DIRECT_CN,
    PROXY_GROUPS.SELECT,
    PROXY_GROUPS.AUTO_SELECT,
    PROXY_GROUPS.TIKTOK,
    PROXY_GROUPS.NETFLIX,
    PROXY_GROUPS.DISNEY,
    PROXY_GROUPS.AI_PLATFORMS,
    "REJECT"
  );

  // 最终选择列表（通常用于兜底）
  const defaultFinal = buildList(
    PROXY_GROUPS.SELECT,
    PROXY_GROUPS.AUTO_SELECT,
    PROXY_GROUPS.TIKTOK,
    PROXY_GROUPS.NETFLIX,
    PROXY_GROUPS.DISNEY,
    PROXY_GROUPS.AI_PLATFORMS,
    PROXY_GROUPS.DIRECT_CN,
    "REJECT"
  );

  return {
    defaultProxies,
    defaultProxiesDirect,
    defaultFinal
  };
}

// 规则提供者配置
const ruleProviders = {
  Advertising1: {
    type: "http",
    behavior: "classical",
    format: "text",
    interval: 86400,
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Advertising/Advertising.list",
    path: "./ruleset/Advertising1.list"
  },
  Advertising2: {
    type: "http",
    behavior: "classical",
    format: "text",
    interval: 86400,
    url: "https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E5%88%86%E6%B5%81/ADDONE.list",
    path: "./ruleset/Advertising2.list"
  },
  Advertising3: {
    type: "http",
    behavior: "classical",
    format: "text",
    interval: 86400,
    url: "https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-QuantumultX.list",
    path: "./ruleset/Advertising3.list"
  },
  Advertising4: {
    type: "http",
    behavior: "classical",
    format: "text",
    interval: 86400,
    url: "https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E5%88%86%E6%B5%81/ADwebdone.list",
    path: "./ruleset/Advertising4.list"
  },
  AutoSelect: {
    type: "http",
    behavior: "classical",
    format: "text",
    interval: 86400,
    url: "https://raw.githubusercontent.com/limbopro/Profiles4limbo/main/airports.list",
    path: "./ruleset/AutoSelect.list"
  },
  Direct1: {
    type: "http",
    behavior: "classical",
    format: "text",
    interval: 86400,
    url: "https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E5%88%86%E6%B5%81/Direct1.list",
    path: "./ruleset/Direct1.list"
  },
  Direct2: {
    type: "http",
    behavior: "classical",
    format: "text",
    interval: 86400,
    url: "https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E5%88%86%E6%B5%81/Direct2.list",
    path: "./ruleset/Direct2.list"
  },
  Direct3: {
    type: "http",
    behavior: "classical",
    format: "text",
    interval: 86400,
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Direct/Direct.list",
    path: "./ruleset/Direct3.list"
  },
  Direct4: {
    type: "http",
    behavior: "classical",
    format: "text",
    interval: 86400,
    url: "https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E5%88%86%E6%B5%81/Direct.list",
    path: "./ruleset/Direct4.list"
  },
  Netflix: {
    type: "http",
    behavior: "classical",
    format: "text",
    interval: 86400,
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Netflix/Netflix.list",
    path: "./ruleset/Netflix.list"
  },
  Disney: {
    type: "http",
    behavior: "classical",
    format: "text",
    interval: 86400,
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Disney/Disney.list",
    path: "./ruleset/Disney.list"
  },
  Apple: {
    type: "http",
    behavior: "classical",
    format: "text",
    interval: 86400,
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Apple/Apple.list",
    path: "./ruleset/Apple.list"
  },
  OpenAI: {
    type: "http",
    behavior: "classical",
    format: "text",
    interval: 86400,
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/OpenAI/OpenAI.list",
    path: "./ruleset/OpenAI.list"
  },
  BardAI: {
    type: "http",
    behavior: "classical",
    format: "text",
    interval: 86400,
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/BardAI/BardAI.list",
    path: "./ruleset/BardAI.list"
  },
  Claude: {
    type: "http",
    behavior: "classical",
    format: "text",
    interval: 86400,
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Claude/Claude.list",
    path: "./ruleset/Claude.list"
  },
  AIPlatforms: {
    type: "http",
    behavior: "classical",
    format: "text",
    interval: 86400,
    url: "https://raw.githubusercontent.com/limbopro/Profiles4limbo/main/AI_Platforms_qx.list",
    path: "./ruleset/AIPlatforms.list"
  }
};

// 基础规则列表
const baseRules = [
  // 广告拦截规则
  "RULE-SET,Advertising1,广告拦截",
  "RULE-SET,Advertising2,广告拦截",
  "RULE-SET,Advertising3,广告拦截",
  "RULE-SET,Advertising4,广告拦截",
  // 自动优选规则
  "RULE-SET,AutoSelect,自动优选",
  // 国内直连规则
  "RULE-SET,Direct1,国内直连",
  "RULE-SET,Direct2,国内直连",
  "RULE-SET,Direct3,国内直连",
  "RULE-SET,Direct4,国内直连",
  "RULE-SET,Apple,国内直连",
  // 流媒体规则
  "RULE-SET,Netflix,Netflix",
  "RULE-SET,Disney,Disney+",
  "RULE-SET,TikTok,TikTok", // 假设有一个 TikTok 规则集，这里没有提供 URL，可以添加或移除
  // AI 平台规则
  "RULE-SET,OpenAI,AI Platforms",
  "RULE-SET,BardAI,AI Platforms",
  "RULE-SET,Claude,AI Platforms",
  "RULE-SET,AIPlatforms,AI Platforms",
  // 兜底规则
  `MATCH,${PROXY_GROUPS.FINAL}`
];

// 构建最终规则列表
function buildRules({ quicEnabled }) {
  const rules = [...baseRules];
  if (!quicEnabled) {
    // 如果未启用 QUIC，则阻止 UDP 上的 443 端口流量
    rules.unshift("AND,((DST-PORT,443),(NETWORK,UDP)),REJECT");
  }
  return rules;
}

// Sniffer 配置
const snifferConfig = {
  sniff: {
    TLS: { ports: [443, 8443] },
    HTTP: { ports: [80, 8080, 8880] },
    QUIC: { ports: [443, 8443] } // QUIC 嗅探也需要配置
  },
  "override-destination": false,
  enable: true,
  "force-dns-mapping": true,
  "skip-domain": [
    "Mijia Cloud",
    "dlg.io.mi.com",
    "+.push.apple.com"
  ]
};

// 构建 DNS 配置
function buildDnsConfig({ mode = "redir-host", fakeIpFilter }) {
  const config = {
    enable: true,
    ipv6: ipv6Enabled,
    "prefer-h3": true,
    "enhanced-mode": mode,
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
    fallback: [], // 可以根据需要添加备用 DNS
    "proxy-server-nameserver": ["https://dns.alidns.com/dns-query", "tls://dot.pub"]
  };

  // 添加自定义服务器规则
  config["nameserver-policy"] = {
    "/*.icloud.com": "119.29.29.29",
    "/*.icloud.com.cn": "119.29.29.29",
    "/*.tencent.com": "119.29.29.29",
    "/*.weixin.com": "119.29.29.29"
  };

  if (fakeIpFilter) {
    config["fake-ip-filter"] = fakeIpFilter;
  }
  return config;
}

// DNS 配置实例
const dnsConfig = buildDnsConfig({ mode: "redir-host" });
const dnsConfigFakeIp = buildDnsConfig({
  mode: "fake-ip",
  fakeIpFilter: [
    "geosite:private",
    "geosite:connectivity-check",
    "geosite:cn",
    "Mijia Cloud",
    "dig.io.mi.com",
    "localhost.ptlogin2.qq.com",
    "*.icloud.com",
    "*.stun.*.*",
    "*.stun.*.*.*"
  ]
});

// Geo 数据 URL
const geoxURL = {
  geoip: "https://gcore.jsdelivr.net/gh/Loyalsoldier/v2ray-rules-dat@release/geoip.dat",
  geosite: "https://gcore.jsdelivr.net/gh/Loyalsoldier/v2ray-rules-dat@release/geosite.dat",
  mmdb: "https://gcore.jsdelivr.net/gh/Loyalsoldier/geoip@release/Country.mmdb",
  asn: "https://gcore.jsdelivr.net/gh/Loyalsoldier/geoip@release/GeoLite2-ASN.mmdb"
};

// 构建代理组
function buildProxyGroups({ defaultProxies, defaultProxiesDirect, defaultFinal }) {
  // 定义一个基础的选择列表，不包含可能形成循环的组
  // 例如，只包含 "DIRECT", "REJECT", 和一个基础的 "全局设置" 选择器
  const baseProxiesForServices = buildList(
    PROXY_GROUPS.SELECT, // 指向全局设置，全局设置里可以有其他选项
    "DIRECT",
    "REJECT"
  );

  const groups = [
    // 全局设置 - 选择主要代理策略，可以包含所有其他组
    {
      name: PROXY_GROUPS.SELECT,
      icon: "https://gcore.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Proxy.png",
      type: "select",
      proxies: defaultProxies // 这个列表已经构建好，应该避免直接循环
    },
    // 自动优选 - 使用 URL 测试选择最快节点
    // 注意：type 为 url-test 时，proxies 通常是具体的节点，而不是其他组。
    // 如果你想让它测试规则集里的节点，可能需要配置 "use" 字段，但这取决于 Clash 实现。
    // 这里假设它需要一个节点列表或另一个 url-test 组。
    // 如果 AutoSelect 规则集是用来筛选节点的，它本身不是一个节点组。
    // 为了简单起见，我们暂时让它指向全局设置或其他 url-test 组。
    // 如果确实需要基于规则集动态选择节点，可能需要更高级的配置或脚本。
    {
      name: PROXY_GROUPS.AUTO_SELECT,
      icon: "https://gcore.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Speedtest.png",
      type: "url-test",
      url: "https://cp.cloudflare.com/generate_204",
      interval: 300,
      tolerance: 50,
      lazy: true,
      // proxies: [] // 如果是 url-test，proxies 通常是具体节点列表
      // 或者，如果规则集 AutoSelect 是用来筛选节点的，可能需要这样配置（取决于 Clash 版本）：
      // "use": ["AutoSelect"] // 这会使用 AutoSelect 规则集中的节点进行测试
      // 但更常见的是，你需要一个包含实际代理节点的列表。
      // 假设我们让它可以选择全局设置或其他 url-test 组
      proxies: [PROXY_GROUPS.SELECT] // 或者指向一个包含实际节点的列表
    },
    // 广告拦截 - 拒绝连接
    {
      name: PROXY_GROUPS.ADS_BLOCK,
      icon: "https://gcore.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/AdBlack.png",
      type: "select",
      proxies: ["REJECT", "REJECT-DROP", PROXY_GROUPS.DIRECT_CN]
    },
    // 国内直连 - 本地网络
    {
      name: PROXY_GROUPS.DIRECT_CN,
      icon: "https://gcore.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Direct.png",
      type: "select",
      proxies: ["DIRECT", PROXY_GROUPS.SELECT] // 指向全局设置，而不是其他服务组
    },
    // Netflix - 选择适合的代理
    {
      name: PROXY_GROUPS.NETFLIX,
      icon: "https://gcore.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Netflix.png",
      type: "select",
      // proxies: defaultProxies // 这可能导致循环，因为它包含了 Netflix 自己
      proxies: baseProxiesForServices // 使用基础列表，避免循环
    },
    // Disney+ - 选择适合的代理
    {
      name: PROXY_GROUPS.DISNEY,
      icon: "https://gcore.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Disney.png",
      type: "select",
      // proxies: defaultProxies // 这可能导致循环
      proxies: baseProxiesForServices // 使用基础列表，避免循环
    },
    // TikTok - 选择适合的代理
    {
      name: PROXY_GROUPS.TIKTOK,
      icon: "https://gcore.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/TikTok.png",
      type: "select",
      // proxies: defaultProxies // 这可能导致循环
      proxies: baseProxiesForServices // 使用基础列表，避免循环
    },
    // AI Platforms - 选择适合的代理
    {
      name: PROXY_GROUPS.AI_PLATFORMS,
      icon: "https://gcore.jsdelivr.net/gh/powerfullz/override-rules@master/icons/chatgpt.png",
      type: "select",
      // proxies: defaultProxies // 这可能导致循环
      proxies: baseProxiesForServices // 使用基础列表，避免循环
    },
    // Final - 最终兜底策略
    {
      name: PROXY_GROUPS.FINAL,
      icon: "https://gcore.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Global.png",
      type: "select",
      proxies: defaultFinal // 这个列表也应该避免循环
    }
  ];

  return groups;
}

// 主函数
function main(e) {
  const config = {
    proxies: e.proxies
  };

  const { defaultProxies, defaultProxiesDirect, defaultFinal } = buildBaseLists();
  const proxyGroups = buildProxyGroups({ defaultProxies, defaultProxiesDirect, defaultFinal });
  const rules = buildRules({ quicEnabled });

  // 应用完整配置（如果启用）
  if (fullConfig) {
    Object.assign(config, {
      "mixed-port": 7890,
      "redir-port": 7892,
      "tproxy-port": 7893,
      "routing-mark": 7894,
      "allow-lan": true,
      ipv6: ipv6Enabled,
      mode: "rule",
      "unified-delay": true,
      "tcp-concurrent": true,
      "find-process-mode": "off",
      "log-level": "info",
      "geodata-loader": "standard",
      "external-controller": ":9999",
      "disable-keep-alive": !keepAliveEnabled,
      profile: { "store-selected": true }
    });
  }

  // 应用核心配置
  Object.assign(config, {
    "proxy-groups": proxyGroups,
    "rule-providers": ruleProviders,
    rules,
    sniffer: snifferConfig,
    dns: fakeIPEnabled ? dnsConfigFakeIp : dnsConfig,
    "geodata-mode": true,
    "geox-url": geoxURL
  });

  return config;
}
