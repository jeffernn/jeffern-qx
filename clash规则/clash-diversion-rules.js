const NODE_SUFFIX="节点";
function parseBool(e){
    return"boolean"==typeof e?e:"string"==typeof e&&("true"===e.toLowerCase()||"1"===e)
}
function parseNumber(e,t=0){
    if(null==e)return t;
    const o=parseInt(e,10);
    return isNaN(o)?t:o
}
function buildFeatureFlags(e){
    const t=Object.entries({
        loadbalance:"loadBalance",
        landing:"landing",
        ipv6:"ipv6Enabled",
        full:"fullConfig",
        keepalive:"keepAliveEnabled",
        fakeip:"fakeIPEnabled",
        quic:"quicEnabled"
    }).reduce((t,[o,r])=>(t[r]=parseBool(e[o])||!1,t),{});
    return t.countryThreshold=parseNumber(e.threshold,0),t
}
const rawArgs="undefined"!=typeof $arguments?$arguments:{},
{loadBalance:loadBalance,landing:landing,ipv6Enabled:ipv6Enabled,fullConfig:fullConfig,keepAliveEnabled:keepAliveEnabled,fakeIPEnabled:fakeIPEnabled,quicEnabled:quicEnabled,countryThreshold:countryThreshold}=buildFeatureFlags(rawArgs);

function getCountryGroupNames(e,t){
    return e.filter(e=>e.count>=t).map(e=>e.country+"节点")
}
function stripNodeSuffix(e){
    const t=new RegExp("节点$");
    return e.map(e=>e.replace(t,""))
}
const PROXY_GROUPS={
    SELECT:"选择代理",
    MANUAL:"手动选择",
    FALLBACK:"故障转移",
    DIRECT:"直连",
    LANDING:"落地节点",
    LOW_COST:"低倍率节点"
},
buildList=(...e)=>e.flat().filter(Boolean);

function buildBaseLists({landing:e,lowCost:t,countryGroupNames:o}){
    const r=buildList(PROXY_GROUPS.FALLBACK,e&&PROXY_GROUPS.LANDING,o,t&&PROXY_GROUPS.LOW_COST,PROXY_GROUPS.MANUAL,"DIRECT");
    return{
        defaultProxies:buildList(PROXY_GROUPS.SELECT,o,t&&PROXY_GROUPS.LOW_COST,PROXY_GROUPS.MANUAL,PROXY_GROUPS.DIRECT),
        defaultProxiesDirect:buildList(PROXY_GROUPS.DIRECT,o,t&&PROXY_GROUPS.LOW_COST,PROXY_GROUPS.SELECT,PROXY_GROUPS.MANUAL),
        defaultSelector:r,
        defaultFallback:buildList(e&&PROXY_GROUPS.LANDING,o,t&&PROXY_GROUPS.LOW_COST,PROXY_GROUPS.MANUAL,"DIRECT")
    }
}

// 替换规则提供者为QuantumultX配置
const ruleProviders={
    "广告杀手1️⃣":{
        type:"http",
        behavior:"domain",
        format:"text",
        interval:172800,
        url:"https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Advertising/Advertising.list",
        path:"./ruleset/Advertising1.list"
    },
    "广告杀手2️⃣":{
        type:"http",
        behavior:"domain",
        format:"text",
        interval:172800,
        url:"https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E5%88%86%E6%B5%81/ADDONE.list",
        path:"./ruleset/Advertising2.list"
    },
    "广告杀手3️⃣":{
        type:"http",
        behavior:"domain",
        format:"text",
        interval:172800,
        url:"https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-QuantumultX.list",
        path:"./ruleset/Advertising3.list"
    },
    "毒奶特供(去网页广告计划)":{
        type:"http",
        behavior:"domain",
        format:"text",
        interval:172800,
        url:"https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E5%88%86%E6%B5%81/ADwebdone.list",
        path:"./ruleset/ADwebdone.list"
    },
    "机场专线":{
        type:"http",
        behavior:"domain",
        format:"text",
        interval:172800,
        url:"https://raw.githubusercontent.com/limbopro/Profiles4limbo/main/airports.list",
        path:"./ruleset/Airports.list"
    },
    "国内直连1️⃣":{
        type:"http",
        behavior:"domain",
        format:"text",
        interval:172800,
        url:"https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E5%88%86%E6%B5%81/Direct1.list",
        path:"./ruleset/Direct1.list"
    },
    "国内直连2️⃣":{
        type:"http",
        behavior:"domain",
        format:"text",
        interval:172800,
        url:"https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E5%88%86%E6%B5%81/Direct2.list",
        path:"./ruleset/Direct2.list"
    },
    "国内直连3️⃣":{
        type:"http",
        behavior:"domain",
        format:"text",
        interval:172800,
        url:"https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Direct/Direct.list",
        path:"./ruleset/Direct3.list"
    },
    "国内直连4️⃣":{
        type:"http",
        behavior:"domain",
        format:"text",
        interval:172800,
        url:"https://raw.githubusercontent.com/jeffernn/jeffern-qx/refs/heads/main/%E5%88%86%E6%B5%81/Direct.list",
        path:"./ruleset/Direct4.list"
    },
    "🎬️ Netflix":{
        type:"http",
        behavior:"domain",
        format:"text",
        interval:172800,
        url:"https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Netflix/Netflix.list",
        path:"./ruleset/Netflix.list"
    },
    "🐭 Disney+":{
        type:"http",
        behavior:"domain",
        format:"text",
        interval:172800,
        url:"https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Disney/Disney.list",
        path:"./ruleset/Disney.list"
    },
    "🎵 TikTok":{
        type:"http",
        behavior:"domain",
        format:"text",
        interval:172800,
        url:"https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/TikTok/TikTok.list",
        path:"./ruleset/TikTok.list"
    },
    "🍎 苹果服务":{
        type:"http",
        behavior:"domain",
        format:"text",
        interval:172800,
        url:"https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Apple/Apple.list",
        path:"./ruleset/Apple.list"
    },
    "🤖 AI Platforms":{
        type:"http",
        behavior:"domain",
        format:"text",
        interval:172800,
        url:"https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/OpenAI/OpenAI.list",
        path:"./ruleset/OpenAI.list"
    },
    "🤖 AI Platforms2":{
        type:"http",
        behavior:"domain",
        format:"text",
        interval:172800,
        url:"https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/BardAI/BardAI.list",
        path:"./ruleset/BardAI.list"
    },
    "🤖 AI Platforms3":{
        type:"http",
        behavior:"domain",
        format:"text",
        interval:172800,
        url:"https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Claude/Claude.list",
        path:"./ruleset/Claude.list"
    },
    "🤖 AI Platforms4":{
        type:"http",
        behavior:"domain",
        format:"text",
        interval:172800,
        url:"https://raw.githubusercontent.com/limbopro/Profiles4limbo/main/AI_Platforms_qx.list",
        path:"./ruleset/AIPlatforms.list"
    }
};

// 替换基础规则为QuantumultX配置的规则
const baseRules=[
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

function buildRules({quicEnabled:e}){
    const t=[...baseRules];
    return e||t.unshift("AND,((DST-PORT,443),(NETWORK,UDP)),REJECT"),t
}

const snifferConfig={
    sniff:{
        TLS:{ports:[443,8443]},
        HTTP:{ports:[80,8080,8880]},
        QUIC:{ports:[443,8443]}
    },
    "override-destination":!1,
    enable:!0,
    "force-dns-mapping":!0,
    "skip-domain":["Mijia Cloud","dlg.io.mi.com","+.push.apple.com"]
};

function buildDnsConfig({mode:e,fakeIpFilter:t}){
    const o={
        enable:!0,
        ipv6:ipv6Enabled,
        "prefer-h3":!0,
        "enhanced-mode":e,
        "default-nameserver":["119.29.29.29","223.5.5.5"],
        nameserver:[
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
        },
        "use-system-hosts": false  // 对应 no-system
    };
    return t&&(o["fake-ip-filter"]=t),o
}

const dnsConfig=buildDnsConfig({mode:"redir-host"}),
    dnsConfigFakeIp=buildDnsConfig({
        mode:"fake-ip",
        fakeIpFilter:["geosite:private","geosite:connectivity-check","geosite:cn","Mijia Cloud","dig.io.mi.com","localhost.ptlogin2.qq.com","*.icloud.com","*.stun.*.*","*.stun.*.*.*"]
    }),
    geoxURL={
        geoip:"https://gcore.jsdelivr.net/gh/Loyalsoldier/v2ray-rules-dat@release/geoip.dat",
        geosite:"https://gcore.jsdelivr.net/gh/Loyalsoldier/v2ray-rules-dat@release/geosite.dat",
        mmdb:"https://gcore.jsdelivr.net/gh/Loyalsoldier/geoip@release/Country.mmdb",
        asn:"https://gcore.jsdelivr.net/gh/Loyalsoldier/geoip@release/GeoLite2-ASN.mmdb"
    },
    countriesMeta={
        "香港":{pattern:"香港|港|HK|hk|Hong Kong|HongKong|hongkong|🇭🇰",icon:"https://gcore.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Hong_Kong.png"},
        "澳门":{pattern:"澳门|MO|Macau|🇲🇴",icon:"https://gcore.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Macao.png"},
        "台湾":{pattern:"台|新北|彰化|TW|Taiwan|🇹🇼",icon:"https://gcore.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Taiwan.png"},
        "新加坡":{pattern:"新加坡|坡|狮城|SG|Singapore|🇸🇬",icon:"https://gcore.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Singapore.png"},
        "日本":{pattern:"日本|川日|东京|大阪|泉日|埼玉|沪日|深日|JP|Japan|🇯🇵",icon:"https://gcore.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Japan.png"},
        "韩国":{pattern:"KR|Korea|KOR|首尔|韩|韓|🇰🇷",icon:"https://gcore.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Korea.png"},
        "美国":{pattern:"美国|美|US|United States|🇺🇸",icon:"https://gcore.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/United_States.png"},
        "加拿大":{pattern:"加拿大|Canada|CA|🇨🇦",icon:"https://gcore.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Canada.png"},
        "英国":{pattern:"英国|United Kingdom|UK|伦敦|London|🇬🇧",icon:"https://gcore.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/United_Kingdom.png"},
        "澳大利亚":{pattern:"澳洲|澳大利亚|AU|Australia|🇦🇺",icon:"https://gcore.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Australia.png"},
        "德国":{pattern:"德国|德|DE|Germany|🇩🇪",icon:"https://gcore.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Germany.png"},
        "法国":{pattern:"法国|法|FR|France|🇫🇷",icon:"https://gcore.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/France.png"},
        "俄罗斯":{pattern:"俄罗斯|俄|RU|Russia|🇷🇺",icon:"https://gcore.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Russia.png"},
        "泰国":{pattern:"泰国|泰|TH|Thailand|🇹🇭",icon:"https://gcore.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Thailand.png"},
        "印度":{pattern:"印度|IN|India|🇮🇳",icon:"https://gcore.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/India.png"},
        "马来西亚":{pattern:"马来西亚|马来|MY|Malaysia|🇲🇾",icon:"https://gcore.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Malaysia.png"}
    };

function hasLowCost(e){
    const t=/0\.[0-5]|低倍率|省流|大流量|实验性/i;
    return(e.proxies||[]).some(e=>t.test(e.name))
}

function parseCountries(e){
    const t=e.proxies||[],
        o=/家宽|家庭|家庭宽带|商宽|商业宽带|星链|Starlink|落地/i,
        r=Object.create(null),
        n={};
    for(const[e,t]of Object.entries(countriesMeta))n[e]=new RegExp(t.pattern.replace(/^\(\?i\)/,""));
    for(const e of t){
        const t=e.name||"";
        if(!o.test(t))for(const[e,o]of Object.entries(n))if(o.test(t)){
            r[e]=(r[e]||0)+1;
            break
        }
    }
    const s=[];
    for(const[e,t]of Object.entries(r))s.push({country:e,count:t});
    return s
}

function buildCountryProxyGroups({countries:e,landing:t,loadBalance:o}){
    const r=[],
        n="0\\.[0-5]|低倍率|省流|大流量|实验性",
        s=o?"load-balance":"url-test";
    for(const l of e){
        const e=countriesMeta[l];
        if(!e)continue;
        const i={
            name:`${l}节点`,
            icon:e.icon,
            "include-all":!0,
            filter:e.pattern,
            "exclude-filter":t?`(?i)家宽|家庭|家庭宽带|商宽|商业宽带|星链|Starlink|落地|${n}`:n,
            type:s
        };
        o||Object.assign(i,{url:"https://cp.cloudflare.com/generate_204",interval:60,tolerance:20,lazy:!1}),r.push(i)
    }
    return r
}

// 替换策略组为QuantumultX配置的策略组
function buildProxyGroups({landing:e,countries:t,countryProxyGroups:o,lowCost:r,defaultProxies:n,defaultProxiesDirect:s,defaultSelector:l,defaultFallback:i}){
    const a=t.includes("台湾"),
        c=t.includes("香港"),
        p=t.includes("美国"),
        u=e?l.filter(e=>e!==PROXY_GROUPS.LANDING&&e!==PROXY_GROUPS.FALLBACK):[];
        
    // 使用QuantumultX配置的策略组
    return[
        {
            name:"光环",
            type:"select",
            icon:"https://raw.githubusercontent.com/Aoyt520/jiumeiquanX/master/quanX/DHF.png",
            proxies:["✨","手动选择","直连"]
        },
        {
            name:"✨",
            type:"url-test",
            icon:"https://raw.githubusercontent.com/Aoyt520/jiumeiquanX/master/quanX/Pgxw.png",
            url:"https://cp.cloudflare.com/generate_204",
            interval:300,
            tolerance:0,
            "alive-checking":false,
            "include-all":true,
            filter:"自建|机场"
        },
        {
            name:"🚫 广告拦截",
            type:"select",
            icon:"https://raw.githubusercontent.com/Aoyt520/jiumeiquanX/master/quanX/Advertising.png",
            proxies:["REJECT","REJECT-DROP","🌐 国内直连"]
        },
        {
            name:"🌐 国内直连",
            type:"select",
            icon:"https://raw.githubusercontent.com/Aoyt520/jiumeiquanX/master/quanX/Hulu.png",
            proxies:["DIRECT"]
        },
        {
            name:"🎬️ Netflix",
            type:"select",
            icon:"https://raw.githubusercontent.com/Aoyt520/jiumeiquanX/master/quanX/Netflix.png",
            proxies:["光环"]
        },
        {
            name:"🐭 Disney+",
            type:"select",
            icon:"https://raw.githubusercontent.com/Aoyt520/jiumeiquanX/master/quanX/HWDS.png",
            proxies:["光环"]
        },
        {
            name:"🎵 TikTok",
            type:"select",
            icon:"https://raw.githubusercontent.com/Aoyt520/jiumeiquanX/master/quanX/Tiktok.png",
            proxies:["光环"]
        },
        {
            name:"🤖 AI Platforms",
            type:"select",
            icon:"https://raw.githubusercontent.com/Aoyt520/jiumeiquanX/master/quanX/Hijacking.png",
            proxies:["光环","DIRECT"]
        },
        {
            name:"🐟 Final",
            type:"select",
            icon:"https://raw.githubusercontent.com/Aoyt520/jiumeiquanX/master/quanX/Final.png",
            proxies:["光环","DIRECT"]
        },
        ...o
    ].filter(Boolean)
}

function main(e){
    const t={proxies:e.proxies},
        o=parseCountries(t),
        r=hasLowCost(t),
        n=getCountryGroupNames(o,countryThreshold),
        s=stripNodeSuffix(n),
        {defaultProxies:l,defaultProxiesDirect:i,defaultSelector:a,defaultFallback:c}=buildBaseLists({landing:landing,lowCost:r,countryGroupNames:n}),
        p=buildCountryProxyGroups({countries:s,landing:landing,loadBalance:loadBalance}),
        u=buildProxyGroups({landing:landing,countries:s,countryProxyGroups:p,lowCost:r,defaultProxies:l,defaultProxiesDirect:i,defaultSelector:a,defaultFallback:c}),
        d=u.map(e=>e.name);
    u.push({
        name:"GLOBAL",
        icon:"https://gcore.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Global.png",
        "include-all":!0,
        type:"select",
        proxies:d
    });
    const g=buildRules({quicEnabled:quicEnabled});
    return fullConfig&&Object.assign(t,{
        "mixed-port":7890,
        "redir-port":7892,
        "tproxy-port":7893,
        "routing-mark":7894,
        "allow-lan":!0,
        ipv6:ipv6Enabled,
        mode:"rule",
        "unified-delay":!0,
        "tcp-concurrent":!0,
        "find-process-mode":"off",
        "log-level":"info",
        "geodata-loader":"standard",
        "external-controller":":9999",
        "disable-keep-alive":!keepAliveEnabled,
        profile:{"store-selected":!0}
    }),
    Object.assign(t,{
        "proxy-groups":u,
        "rule-providers":ruleProviders,
        rules:g,
        sniffer:snifferConfig,
        dns:fakeIPEnabled?dnsConfigFakeIp:dnsConfig,
        "geodata-mode":!0,
        "geox-url":geoxURL
    }),
    t
}
