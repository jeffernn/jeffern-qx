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
  REJECT: "拒绝",
  DIRECT: "直连"
};

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
  }
};

// 基础规则列表
const baseRules = [
  // 广告拦截规则 -> 拒绝
  "RULE-SET,Advertising1,拒绝",
  "RULE-SET,Advertising2,拒绝",
  "RULE-SET,Advertising3,拒绝",
  "RULE-SET,Advertising4,拒绝",
  // 自动优选规则 -> 代理
  "RULE-SET,AutoSelect,自动优选",
  // 国内直连规则 -> 直连
  "RULE-SET,Direct1,直连",
  "RULE-SET,Direct2,直连",
  "RULE-SET,Direct3,直连",
  "RULE-SET,Direct4,直连",
  // 兜底规则 -> 全局设置
  `MATCH,${PROXY_GROUPS.SELECT}`
];

// 构建最终规则列表
function buildRules({ quicEnabled }) {
  const rules = [...baseRules];
  if (!quicEnabled) {
    // 如果未启用 QUIC，则阻止 UDP 上的 443 端口流量
    rules.unshift("AND,((DST-PORT,443),(NETWORK,UDP)),拒绝");
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
function buildProxyGroups() {
  const groups = [
    // 全局设置 - 选择主要代理策略
    {
      name: PROXY_GROUPS.SELECT,
      icon: "https://gcore.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Proxy.png",
      type: "select",
      proxies: [
        PROXY_GROUPS.AUTO_SELECT,
        "DIRECT", // 也可以包含 DIRECT 作为备选
        "REJECT"  // 也可以包含 REJECT 作为备选
      ]
    },
    // 自动优选 - 使用 URL 测试选择延迟最低的节点
    {
      name: PROXY_GROUPS.AUTO_SELECT,
      icon: "https://gcore.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Speedtest.png",
      type: "url-test", // 使用 url-test 类型
      url: "https://cp.cloudflare.com/generate_204", // 测试 URL
      interval: 300, // 测试间隔 (秒)
      tolerance: 50, // 容差 (毫秒)
      lazy: true,    // 懒惰模式
      // proxies: [] // url-test 的 proxies 通常是具体的节点列表
      // 如果你想让它测试规则集 AutoSelect 中的节点，可能需要 "use" 字段
      // 但更常见的是，你需要提供一个包含实际代理节点的列表。
      // 这里我们让它可以选择全局设置，或者你可以提供一个包含节点的列表。
      // 假设我们让它可以测试全局设置下的节点（这取决于 Clash 实现）
      // 或者，如果 AutoSelect 规则集是用于筛选节点，可能需要这样配置（取决于实现）：
      "use": ["AutoSelect"] // 这会使用 AutoSelect 规则集中的节点进行测试
      // 注意：如果 "use" 不起作用，你需要一个包含实际代理节点名称的数组。
      // 例如: proxies: [/* 你的代理节点名称列表 */]
    },
    // 拒绝 - 拒绝连接
    {
      name: PROXY_GROUPS.REJECT,
      icon: "https://gcore.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/AdBlack.png",
      type: "select",
      proxies: ["REJECT", "REJECT-DROP"]
    },
    // 直连 - 本地网络
    {
      name: PROXY_GROUPS.DIRECT,
      icon: "https://gcore.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Direct.png",
      type: "select",
      proxies: ["DIRECT"]
    }
  ];

  return groups;
}

// 主函数
function main(e) {
  const config = {
    proxies: e.proxies
  };

  const proxyGroups = buildProxyGroups();
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
