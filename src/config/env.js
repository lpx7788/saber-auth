// 配置编译环境和线上环境之间的切换
let baseUrl = '';
// 阿里巴巴图标（//at.alicdn.com/t/font_$key.css）$key的编码
// ['菜单图标-->zkma-menu-icon','通用图标-->zkma-common-icon']
const iconfontVersion = ['2131366_tqpustzig1', '2133153_xeujn68ktbq'];
// icon的基本路径
const iconfontUrl = '//at.alicdn.com/t/font_$key.css';
const codeUrl = `${baseUrl}/code`
const envObj = process.env

if (envObj.NODE_ENV === 'development') {
  // 开发环境地址
  baseUrl = {
    // apiHostName:'http://192.168.0.185'
    apiHostName: 'http://api.manytrader.com',
  }
} else if (envObj.NODE_ENV === 'production') {
  // 生产环境地址
  baseUrl = {

  }
} else if (envObj.NODE_ENV === 'test') {
  // 测试环境地址
  baseUrl = {

  }
}

// 导出表格地址
const baseExportDataUrl = `${baseUrl.apiHostName}/`;

module.exports = {
  baseUrl,
  iconfontUrl,
  iconfontVersion,
  codeUrl,
  envObj,
  baseExportDataUrl,
}
