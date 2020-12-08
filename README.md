
    众咖管理平台(mall)

### 项目说明

　　这是一个用vuejs和element-ui,Avue,vuex,es6等相关技术搭建的后台管理界面。 


### 相关技术

	1. vuejs：一套构建用户界面的渐进式框架，易用、灵活、高效。
	2. element-ui：一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的组件库。
    3. Avue：是基于现有的element-ui库进行的二次封装，简化一些繁琐的操作，核心理念为数据驱动视图,主要的 组件库针对table表格和form表单场景，同时衍生出更多企业常用的组件，达到高复用，容易维护和扩展的框 架，同时内置了丰富了数据展示组件，让开发变得更加容易。
    4. ES6：ECMAScript 6.0（以下简称 ES6）是 JavaScript 语言的下一代标准，已经在 2015 年 6 月正式发布了。它的目 标，是使得 JavaScript 语言可以用来编写复杂的大型应用程序，成为企业级开发语言。
    5. vuex：Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。


### 相关技术文档地址

	1. vuejs: https://cn.vuejs.org/
	2. element-ui: http://element.eleme.io/#/zh-CN/component/quickstart
    3. Avue：https://avuejs.com/doc/installation
	4. es6: http://es6.ruanyifeng.com/
    5. vuex: https://vuex.vuejs.org/zh/guide/

    vue 开源项目插件库汇总
    https://segmentfault.com/p/1210000008583242/read?from=timeline



### 目录结构

    ├── dist                       // 打包文件  
    ├── public                     // 公共文件
    ├── src                        // 源代码
    │   ├── api                    // 所有请求
    │   │    ├──projectConfig.js   // 项目api接口地址
    │   │   
    │   ├── components             // 全局公用组件
    │   │    ├──error-page         // 错误页面
    │   │    │   ├──403.vue
    │   │    │   ├──404.vue  
    │   │    │   ├──500.vue  
    │   │    │   ├──style.scss
    │   │    │ 
    │   │    ├──basic-container     
    │   │    │   ├──main.vue          // 页面最外层container
    │   │    │ 
    │   │    ├──basic-block          
    │   │    │   ├──main.vue       
    │   │    │ 
    │   │    ├──date-picker           // 日期组件
    │   │    │   ├──main.vue       
    │   │    │          
    │   │    ├──button-group          // 按钮组组件
    │   │    │   ├──main.vue     
    │   │    │ 
    │   │    ├──iframe                
    │   │    │   ├──main.vue          // 页面嵌套组件
    │   │    │ 
    │   │    ├──search                
    │   │    │   ├──index.vue          // 搜索组件
    │   │    │ 
    │   │    ├──category-cascade                    
    │   │    │   ├──index.vue          // 品种选择组件
    │   │    │ 
    │   │    ├──tinymce                
    │   │    │   ├──main.vue          // 富文本编辑器组件
    │   │    │   ├──components.vue     
    │   │    │       ├──editorImage   // 编辑图片组件
    │   │    │ 
    │   │    ├──upload                // 图片上传组件
    │   │    │   ├──main.vue     
    │   │    │ 
    │   ├── config                    // 项目全局变量配置文件
    │   │    ├──env.js                // 阿里巴巴图标库地址,项目api基础路径管理
    │   │    ├──iconList.js           // 阿里巴巴图标库管理
    │   │    ├──website.js            // 全局配置文件
    │   │   
    │   ├── mock                      // mock数据
    │   ├── page                      // 基础页面（主要存放底层的框架组件，如标签栏，左侧菜单栏，登录等）
    │   │   ├──index             
    │   │   │  ├──sidebar           
    │   │   │  │   ├──config.js        // 菜单配置   
    │   │   │  │   ├──index.vue        // 左侧菜单  
    │   │   │  │   ├──sidebarItem.vue  // 左侧菜单组件          
    │   │   │  ├──index.vue            // 主页核心组件         
    │   │   │  ├──layout.vue           // layout组件         
    │   │   │  ├──logo.vue             // logo组件        
    │   │   │  ├──search.vue           // 搜索组件        
    │   │   │  ├──tag.vue              // tag标签组件        
    │   │   ├──lock              
    │   │   │  ├──index.vue          // 锁屏页             
    │   │   ├──login                 // 登录                            
    │   │   │   ├──authredirect.vue                                               
    │   │   │   ├──codelogin.vue                                              
    │   │   │   ├──index.vue                                              
    │   │   │   ├──thirdlogin.vue.vue                                              
    │   │   │   ├──userlogin.vue                                             
    │   │   │                                                 
    │   │   ├──logs                 // 系统日志         
    │   │       ├──index                               
    │   ├── mixins                      
    │   ├── const                    
    │   ├── lang                   // 国际化语言              
    │   ├── docker                    
    │   ├── router                 // 路由
    │   │   ├──page                
    │   │   │   ├──index.js        // 基础路由（/src/router/page/index.js） 
    │   │   ├──view 
    │   │   │   ├──index.js        // 业务路由（/src/router/views/) 
    │   │   ├──avue-router.js      // 动态路由核心源码
    │   │   ├──axios.js	           // ajax拦截器配置	
    │   │   ├──router.js           // 路由配置文件
    │   ├── store                  // 全局store管理
    │   ├── styles                 // 全局样式文件存放	
    │   │    ├──animate	           // 全局动画
    │   │    ├── vue-transition.scss	 // 过度动画	
    │   │    ├──theme	            // 主题配置
    │   │    │    ├──bule.scss	    // 蓝色主题												
    │   │    │    ├──cool.scss	    // 冷色主题												
    │   │    │    ├──d2.scss	    // d2主题									
    │   │    │    ├──hey.scss	    // hey主题											
    │   │    │    ├──index.scss	    // 默认主题
    │   │    │    ├──iview.scss	    // iview主题
    │   │    │    ├──lte.scss	    // lte主题
    │   │    │    ├──star.scss	    // 炫彩主题
    │   │    │    ├──vip.scss	    // vip主题
    │   │    │    ├──white.scss	    // 白色主题
    │   │    ├──base.scss		    // 基础样式
    │   │    ├──common.scss		    // 样式集合
    │   │    ├──media.scss	        // 多终端适配       
    │   │    ├──element-ui.scss		//覆盖ele的样     
    │   │    ├──login.scss		    // 登录 
    │   │    ├──mixin.scss		    // 工具类包(滚动条等)       
    │   │    ├──normalize.scss		         
    │   │    ├──sidebar.scss	    // 侧边菜单      
    │   │    ├──tags.scss		    // 选项标签       
    │   │    ├──top.scss			//顶部      
    │   │    ├──variables.scss		//全局scss变量    
    │   │        
    │   ├── util                    // 全局公用方法
    │   │     ├──admin.js           // 屏幕大小获取
    │   │     ├──auth.js            // token本地存取
    │   │     ├──date.js            // 日期格式化
    │   │     ├──flow.js            // 工作流统一分类格式
    │   │     ├──func.js            // 通用工具类
    │   │     ├──store.js           // localStorage统一处理文件
    │   │     ├──util.js            // 公共方法存放文件
    │   │     ├──validate.js        // 验证方法存放文件
    │   │                                      
    │   ├── views                   // 业务页面（主要存放业务页面和项目页面）
    │   │   ├──wel
    │   │   │   ├──index.vue        // 平台首页
    │   │   │          
    │   │   ├──order
    │   │   │   ├──index.vue        // 订单管理页
    │   │   │   ├──detail.vue       // 订单详情页
    │   │   │          
    │   │   ├──company              // 企业管理
    │   │   │   ├──join.vue         // 企业入驻
    │   │   │   ├──index.vue        // 企业列表
    │   │   │   ├──user.vue         // 用户列表
    │   │   │          
    │   │   ├──proposal
    │   │   │   ├──index.vue       // 意见反馈
    │   │   │          
    │   │   ├──information         // 资讯管理
    │   │   │   ├──index.vue       // 全部资讯
    │   │   │   ├──edit.vue        // 编辑资讯
    │   │   │   ├──release.vue     // 发布资讯
    │   │   │          
    │   │   ├──launchPageAds       // 启动页广告图管理
    │   │   │   ├──index.vue       
    │   │   │          
    │   │   ├──hedging             // 套保管理
    │   │   │   ├──account.vue     // 套保账户  
    │   │   │   ├──front.vue       // 前置地址       
    │   │   │          
    │   │   ├──integral            // 积分管理
    │   │   │   ├──add.vue         // 积分添加 
    │   │   │   ├──collect.vue     // 积分汇总
    │   │   │   ├──detail.vue      // 积分明细
    │   │   │   ├──exchange.vue    // 积分兑换设置
    │   │   │   ├──guidePrice.vue  // 指导价设置
    │   │   │   ├──order.vue       // 积分订单
    │   │   │   |       
    │   │   │   ├──monitor\log      // 日志管理
    │   │   │   │   ├──usual.vue    // 通用日志
    │   │   │   │   ├──api.vue      // 接口日志
    │   │   │   │   ├──error.vue    // 错误日志
    │   │   │   |       
    │   │   │   ├──tool                 // 研发工具
    │   │   │   │   ├──code.vue         // 代码生成
    │   │   │   │   ├──datasource.vue   // 数据源管理
    │   │   │   |       
    │   │   │   ├──authority            // 权限管理
    │   │   │   │   ├──role.vue         // 角色管理
    │   │   │   │   ├──datascope.vue    // 数据权限
    │   │   │   │   ├──apiscope.vue     // 接口权限
    │   │   │   |       
    │   │   │   ├──resource             // 资源管理
    │   │   │   │   ├──oss.vue          // 对象存储
    │   │   │   │   ├──sms.vue          // 短信配置
    │   │   │   |       
    │   │   │   ├──system               // 系统管理
    │   │   │   │   ├──user.vue         // 用户管理
    │   │   │   │   ├──dept.vue         // 机构管理
    │   │   │   │   ├──dict.vue         // 系统字典
    │   │   │   │   ├──dictbiz.vue      // 业务字典
    │   │   │   │   ├──menu.vue         // 菜单管理
    │   │   │   │   ├──param.vue        // 参数管理
    │   │   │   │   ├──tenant.vue       // 租户管理
    │   │   │   │   ├──client.vue       // 应用管理           
    │   │   │   │            
    │   │   │   ├──dataCenter           // 数据管理
    │   │   │   │   ├──attribute.vue    // 商品属性
    │   │   │   │   ├──category.vue     // 商品品种
    │   │   │   │   ├──contract.vue     // 期货合约
    │   │   │   │   ├──warehouse.vue    // 商城仓库
    │   │   │   │   ├──template.vue     // 模板管理
    │   │   │              
    │   │   │          
    │   │   ├──authority            // 权限
    │   │   ├──desk                 
    │   │   ├──login                // 登录vue目录
    │   ├── App.vue                 // 入口页面
    │   └── main.js                 // 入口 加载组件 初始化等
    ├── .browserslistrc             
    ├── .editorconfig             
    ├── .eslintrc.js              
    ├── .postcssrc.js             
    ├── babel.config.js             
    ├── build.sh                     
    ├── .gitignore                  // git上传过滤文件
    ├── README.md                   // 项目说明文件
    ├── package.json                // 依赖配置文件package.json
    ├── vue.config.js               // 配置文件vue.config.js



### 工程相关  

    工程导入     
        仓库地址：https://codeup.aliyun.com/5f1e7ff3df9df74e36afb7b9/zk-front-end/ZKMA 

    工程安装
        1. 安装yarn并配置淘宝源
            >   npm install -g yarn --registry=https://registry.npm.taobao.org
            >   yarn config set registry https://registry.npm.taobao.org -g
              
        2. 进入工程根目录进行安装
            >   cd project_name
            >   yarn install  

    工程运行
            >   cd project_name
            >   yarn run dev  开发环境
            >   yarn run test 测试环境
            >   yarn run prod 生产环境

    工程构建
            >   cd project_name  
            >   yarn run build 打包生产环境
            >   yarn run build:test 打包测试环境

    相关资料
        1. 代码下载工具（二者任选其一）：
            >   命令行版 Git    下载地址：https://git-scm.com/downloads
            >   桌面版 TortoiseGit  下载地址：https://tortoisegit.org/download/

        2. 开发工具（二者任选其一）：
            >   webStorm    下载地址：https://www.jetbrains.com/webstorm
            >   vscode  下载地址：https://code.visualstudio.com/Download

        3. 在线文档：http://47.107.114.122:3000/
        4. 在线体验地址：https://saber.bladex.vip/
        
### 版本升级

| 版本号  | id  | 更新日期 |
| :-----: | :-----: |:-----:   |
| 2.5.1.release| 5b5b5523bc76a14434fceb53035b662190e551cc| 2020-06-9 23:43:30|
| 2.6.1.release| 803efe07080a648303fe6f2a481993a97344e1aa| 2020-10-23 23:04:28| 
| 2.7.0.release| f1e28cd893b75f7543d2222a2077abc42a8ca13b| 2020-10-31 21:37:40| 
            
