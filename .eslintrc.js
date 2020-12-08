module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',

  ],
  // rules: {
  //   'no-console': 2,
  //   // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  //   'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  // },

  // "off"或0 -关闭规则
  // "warn" 或1 - 开启规则, 使用警告 程序不会退出
  // "error"或2 - 开启规则, 使用错误 程序退出
  rules: {
    "no-console": 2, // 禁止使用console
    "no-trailing-spaces": 1, // 一行结束后面不要有空格
    "comma-dangle": [2, "always-multiline"], // 对象字面量项尾不能有逗号
    "key-spacing": [0, {
      "beforeColon": false,
      "afterColon": true
    }], // 对象字面量中冒号的前后空格
    "max-len": [0, 80, 4], // 字符串最大长度
    "quotes": [1, "single"], // 引号类型 `` "" '
    "comma-spacing": 0, // 逗号前后的空格
    "spaced-comment": 0, // 注释风格要不要有空格什么的

  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
