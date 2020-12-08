/**
 * 全局配置文件
 */
export default {
  title: 'omp',
  logo: 'ZK',
  key: 'omp', // 配置主键,目前用于存储
  indexTitle: '众咖管理平台',
  clientId: 'omp', // 客户端id
  clientSecret: 'omp_secret', // 客户端密钥
  tenantMode: true, // 是否开启租户模式
  tenantId: '000000', // 管理组租户编号
  captchaMode: false, // 是否开启验证码模式
  lockPage: '/lock',
  tokenTime: 3000,
  tokenHeader: 'mall-auth',
  // http的status默认放行列表
  statusWhiteList: [],
  // 配置首页不可关闭
  isFirstPage: false,
  fistPage: {
    label: '平台首页',
    value: '/wel/index',
    params: {},
    query: {},
    meta: {
      i18n: 'dashboard',
    },
    group: [],
    close: false,
  },
  // 配置菜单的属性
  menu: {
    iconDefault: 'iconfont icon-caidan1',
    props: {
      label: 'name',
      path: 'path',
      icon: 'source',
      children: 'children',
    },
  },
  // 第三方系统授权地址
  authUrl: 'http://localhost/mall-auth/oauth/render',
  // 流程设计器地址
  flowDesignUrl: 'http://localhost:9999',
  // 报表设计器地址(cloud端口为8108,boot端口为80)
  reportUrl: 'http://localhost:8108/ureport',
}
