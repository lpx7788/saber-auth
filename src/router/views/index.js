// 逻辑页面路由
import Layout from '@/page/index/'

export default [{
  path: '/wel',
  component: Layout,
  redirect: '/wel/index',
  children: [{
    path: 'index',
    name: '首页',
    meta: {
      i18n: 'dashboard',
    },
    component: () => import(/* webpackChunkName: "views" */'@/views/wel/index'),
  }, {
    path: 'dashboard',
    name: '控制台',
    meta: {
      i18n: 'dashboard',
      menu: false,
    },
    component: () => import(/* webpackChunkName: "views" */'@/views/wel/dashboard'),
  }],
}, {
  path: '/dict-horizontal',
  component: Layout,
  redirect: '/dict-horizontal/index',
  children: [{
    path: 'index',
    name: '字典管理',
    meta: {
      i18n: 'dict',
    },
    component: () => import(/* webpackChunkName: "views" */'@/views/util/demo/dict-horizontal'),
  }],
}, {
  path: '/dict-vertical',
  component: Layout,
  redirect: '/dict-vertical/index',
  children: [{
    path: 'index',
    name: '字典管理',
    meta: {
      i18n: 'dict',
    },
    component: () => import(/* webpackChunkName: "views" */'@/views/util/demo/dict-vertical'),
  }],
}, {
  path: '/info',
  component: Layout,
  redirect: '/info/index',
  children: [{
    path: 'index',
    name: '个人信息',
    meta: {
      i18n: 'info',
    },
    component: () =>
      import(/* webpackChunkName: "views" */'@/views/system/userinfo'),
  }],
}, {
  path: '/work/process/leave',
  component: Layout,
  redirect: '/work/process/leave/form',
  children: [{
    path: 'form/:processDefinitionId',
    name: '请假流程',
    meta: {
      i18n: 'work',
    },
    component: () =>
      import(/* webpackChunkName: "views" */'@/views/work/process/leave/form'),
  }, {
    path: 'handle/:taskId/:processInstanceId/:businessId',
    name: '处理请假流程',
    meta: {
      i18n: 'work',
    },
    component: () =>
      import(/* webpackChunkName: "views" */'@/views/work/process/leave/handle'),
  }, {
    path: 'detail/:processInstanceId/:businessId',
    name: '请假流程详情',
    meta: {
      i18n: 'work',
    },
    component: () =>
      import(/* webpackChunkName: "views" */'@/views/work/process/leave/detail'),
  }],
}, {
  path: '/company',
  component: Layout,
  children: [{
    path: '/company/detail',
    name: '企业详情',
    meta: {
      i18n: 'company',
    },
    component: () =>
      import(/* webpackChunkName: "views" */'@/views/company/detail'),
  }],
}, {
  path: '/company',
  component: Layout,
  children: [{
    path: '/company/userDetail',
    name: '企业用户详情',
    meta: {
      i18n: 'company',
    },
    component: () =>
      import(/* webpackChunkName: "views" */'@/views/company/userDetail'),
  }],
}, {
  path: '/order',
  component: Layout,
  children: [{
    path: '/order/detail',
    name: '订单详情',
    meta: {
      menu: false,
    },
    component: () =>
      import(/* webpackChunkName: "views" */'@/views/order/detail'),
  }],
},
{
  path: '/information',
  component: Layout,
  children: [{
    path: '/information/edit',
    name: '资讯编辑',
    meta: {
      menu: false,
    },
    component: () =>
      import(/* webpackChunkName: "views" */'@/views/information/edit'),
  }],
},
]
