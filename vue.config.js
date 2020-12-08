const urlEnv = require('./src/config/env')

module.exports = {
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // webpack配置
  configureWebpack: {
    // 关闭 webpack 的性能提示
    performance: {
      hints: false,
    },
  },
  css: {
    // 打包时禁用顺序检查 warning [mini-css-extract-plugin]
    extract: process.env.NODE_ENV === 'production' ? {
      ignoreOrder: true,
    } : false,
  },
  // 路径前缀
  publicPath: '/',
  lintOnSave: true,
  chainWebpack: (config) => {
    // 忽略的打包文件
    config.externals({
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios',
      'element-ui': 'ELEMENT',
    });
    const entry = config.entry('app');
    entry.add('babel-polyfill').end();
    entry.add('classlist-polyfill').end();
    entry.add('@/mock').end();
  },
  // 开发模式反向代理配置，生产模式请使用Nginx部署并配置反向代理
  devServer: {
    port: 1888,
    proxy: {
      '/api': {
        target: urlEnv.baseUrl.apiHostName,
        ws: true,
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
  },
};
