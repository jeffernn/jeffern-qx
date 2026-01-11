const fs = require('fs');
const readline = require('readline');

async function main(config) {
  // 创建一个readline接口来逐行读取大文件
  const fileStream = fs.createReadStream('rules.txt');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  // 遍历文件的每一行
  for await (const line of rl) {
    // 跳过空行
    if (line.trim() !== '') {
      // 将每一行作为规则添加到config.rules数组中
      config.rules.push(line.trim());
    }
  }

  return config;
}

// 示例用法
const config = {
  rules: []
};

// 执行主函数
main(config)
  .then(result => {
    // 输出结果到新文件
    fs.writeFileSync('processed_rules.js', 
      'const processedConfig = ' + JSON.stringify(result, null, 2) + ';\nmodule.exports = processedConfig;');
    console.log(`成功处理了 ${result.rules.length} 条规则`);
  })
  .catch(err => {
    console.error('处理过程中出现错误:', err);
  });