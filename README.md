# Clash 与 Quantumult X 规则配置指南
## 🌟 Clash 规则说明

### 分流规则 (分流规则.yaml)
```yaml
# 基于域名/IP的分流策略
rules:
  - DOMAIN-SUFFIX,google.com,PROXY
  - DOMAIN-KEYWORD,facebook,PROXY
  - IP-CIDR,8.8.8.8/32,PROXY
  - GEOIP,CN,DIRECT
```

### 重写规则 (重写规则.yaml)
```yaml
# HTTP请求/响应修改规则
script:
  - type: http-request
    pattern: ^https?://(www\.)?example\.com
    script: |
      (req) => {
        req.headers['X-Modified'] = 'true'
      }
```

## ⚡ Quantumult X 规则说明

### 分流规则 (分流规则.list)
```
# 基于域名的分流策略
host-suffix, google.com, proxy
host-keyword, facebook, proxy
ip-cidr, 8.8.8.8/32, proxy
geoip, cn, direct
```

### 重写规则 (重写规则.conf)
```
# 请求重定向和修改
^https?://(www\.)?example\.com url request-header (\r\n)User-Agent:.+(\r\n) request-header $1User-Agent: Custom-UA$2
```

## 🔄 规则转换对照表

| 功能          | Clash 语法                  | Quantumult X 语法            |
|---------------|----------------------------|------------------------------|
| 域名后缀匹配  | DOMAIN-SUFFIX              | host-suffix                  |
| 域名关键词匹配| DOMAIN-KEYWORD             | host-keyword                 |
| IP段匹配      | IP-CIDR                    | ip-cidr                      |
| 地理IP匹配    | GEOIP                      | geoip                        |
| 脚本修改      | script 类型规则            | url + request-header 等指令  |

## 🛠️ 使用建议

1. **分流规则优先级**：
   - 具体规则在前，通用规则在后
   - 相同类型规则按从上到下顺序匹配

2. **性能优化**：
   - 合并相似规则减少条目数
   - 使用 GEOIP 减少域名规则数量

3. **维护技巧**：
   - 添加注释说明规则用途
   - 定期更新 GEOIP 数据库
   - 使用版本控制管理规则变更

## 💡 高级功能

**Clash 特有功能**：
- 支持 JavaScript 脚本引擎
- 可配置多级策略组
- 流量统计与分析

**Quantumult X 特有功能**：
- 支持本地文件重写
- 更灵活的策略组合
- 低功耗模式优化

## 📌 注意事项

1. 规则语法严格区分大小写
2. 特殊字符需正确转义
3. 测试环境验证后再部署
4. 不同客户端版本可能存在兼容差异

> 提示：建议使用规则转换工具将 Clash 规则自动转换为 Quantumult X 格式，确保兼容性
