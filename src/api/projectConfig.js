
/**
 * 请求api地址文件
 */
class projectConfig {
  static URL_app_count = 'v1.0/app/count' // 获取首页数据

  static URL_company_query = 'v1.0/company/query' // 获取公司列表

  static URL_company_list_export = 'v1.0/company/exportData' // 导出公司列表

  static URL_company_registerPhone = '/v1.0/company/registerPhone' // 获取所有注册手机号

  static URL_company_add = 'v1.0/company/join' // 添加企业

  static URL_company_user_query = 'v1.0/user/company/query' // 获取用户列表

  static URL_company_userList_export = 'v1.0/user/company/exportData' // 导出用户列表

  static URL_company_userDetail_query = 'v1.0/user/company/detail' // 获取公司用户

  static URL_company_user_edit = 'v1.0/user/company/editUser' // 编辑企业用户信息

  static URL_company_examine_admin = 'company/examine/admin' // 审核通过

  static URL_company_detail = 'v1.0/company/detail' // 获取公司详情

  static URL_company_edit = 'v1.0/company/edit' // 编辑企业信息

  static URL_company_customers = 'v1.1/company/customers' // 公司客户

  static URL_company_suppliers = 'v1.1/company/suppliers' // 公司供应商

  static URL_company_users = 'v1.0/user/company/queryUserCompany' // 公司员工

  static URL_company_integral = 'v1.1/company/queryIntegralList' // 公司积分设置

  static URL_company_integral_category = 'businessFollowUp/queryIntegralCategory' // 公司可设置积分的品种

  static URL_company_add_intrgral = 'v1.1/company/addRewardIntegral' // 添加、编辑积分设置

  static URL_company_del_intrgral = 'v1.1/company/deleteIntegral' // 删除积分设置

  static URL_category_tree = 'category/tree' // 获取所有品种

  static URL_province_city_list = 'company/provinceCityList' // 获取省市

  static URL_order_query = 'v1.0/order/query' // 订单管理列表

  static URL_company_getCompanyList = 'v1.0/company/getCompanyList' // 公司列表

  static URL_order_detail = 'v1.0/order/detail' // 订单详情

  static URL_order_query = 'v1.0/order/query' // 订单管理列表

  static URL_order_detail = 'v1.0/order/detail' // 订单详情

  static URL_order_exportData = 'v1.0/order/exportData' // 订单列表导出

  static URL_preAddress_queryPreAddressList = 'v1.2/PreAddressManagement/queryPreAddressList' // 套保前置地址

  static URL_autoHedge_futuresCompanyList = 'autoHedge/futuresCompanyList' // 期货公司列表

  static URL_preAddress_deletePreAddress = 'v1.2/PreAddressManagement/deletePreAddress' // 删除前置地址

  static URL_preAddress_savePreAddress = 'v1.2/PreAddressManagement/savePreAddress' // 添加前置地址

  static URL_company_autoHedge_query = 'v1.1/company/autoHedge/query'; // 套保账号查询

  static URL_company_autoHedge_editStatus = 'v1.1/company/autoHedge/editStatus'; // 修改状态

  static URL_company_autoHedge_editPassword = 'v1.1/company/autoHedge/editPassword'; // 修改密码

  static URL_advertisement_query = 'v1.1/advertisement/query'; // 轮播图管理列表

  static URL_advertisement_delete = 'v1.1/advertisement/delete'; // 删除轮播图

  static URL_advertisement_move = 'v1.1/advertisement/move'; // 移动轮播图

  static URL_advertisement_add = 'v1.1/advertisement/add'; // 新增轮播图

  static URL_advertisement_edit = 'v1.1/advertisement/edit'; // 编辑轮播图

  static URL_advertising_query = 'v1.1/advertising/queryAdvertisingList' // 获取启动页列表

  static URL_advertising_add = 'v1.1/advertising/add' // 启动页添加

  static URL_advertising_delete = 'v1.1/advertising/deleteAdvertising' // 删除启动页

  static URL_proposal_query = 'v1.1/proposal/query'; // 获取意见反馈列表

  static URL_proposal_exportData = 'v1.1/proposal/exportData'; // 意见反馈数据导出

  static URL_integral_order_query = 'v1.1/integralorder/queryIntegralOrderList' // 获取积分订单

  static URL_integral_order_update = 'v1.1/integralorder/updateIntegralOrder' // 订单确认、发货

  static URL_integral_order_refuse = 'v1.1/integralorder/refuseIntegralOrder' // 拒绝订单

  static URL_integral_order_exportData = '/v1.1/integralorder/exportData' // 积分订单导出

  static URL_integral_cashingCommodity_query = 'v1.1/cashingcommodity/queryCashingCommodityList' // 积分兑换设置列表

  static URL_integral_cashingCommodity_join = 'v1.1/cashingcommodity/join' // 新增、编辑积分兑换设置

  static URL_integral_cashingCommodity_del = 'v1.1/cashingcommodity/deleteCashingCommodity' // 删除积分兑换设置

  static URL_integral_guidePriceList_query = 'v1.1/guideprice/queryGuidePriceList' // 获取指导价设置列表

  static URL_integral_guidePrice_add = 'v1.1/guideprice/addGuidePrice' // 新增、编辑指导价

  static URL_integral_guidePrice_stop = 'v1.1/guideprice/stopGuidePriceList?' // 启用、停用指导价

  static URL_integral_detail_query = 'v1.1/integraldetail/queryIntegralDetailList' // 获取积分明细列表

  static URL_integral_detail_export = 'v1.1/integraldetail/exportData' // 导出积分明细

  static URL_integral_add_recordList = 'v1.1/integra/record/queryIntegraRecordList' // 积分添加记录列表

  static URL_integral_userData = 'v1.1/integra/record/queryUserIntegral' // 用户积分信息

  static URL_integral_user_add = 'v1.1/integra/record/addUserIntegral' // 添加积分

  static URL_integral_user_List = 'v1.1/user/queryUserList' // 积分汇总列表

  static URL_industryInformation_categoryArr = 'v1.0/industryInformation/categoryArr' // 获取资讯来源

  static URL_industryInformation_editorArr = 'v1.0/industryInformation/editorArr'; // 资讯编辑者

  static URL_industryInformation_query = 'v1.0/industryInformation/query'; // 获取资讯列表

  static URL_industryInformation_delete = 'v1.0/industryInformation/delete'; // 删除资讯

  static URL_industryInformation_topped = 'v1.0/industryInformation/topped'; // 顶置资讯/取消顶置 

  static URL_industryInformation_display = 'v1.0/industryInformation/display'; // 隐藏资讯/显示资讯 

  static URL_industryInformation_batch_delete = '/v1.0/industryInformation/batch/delete'; // 批量删除资讯

  static URL_industryInformation_categoryArr = 'v1.0/industryInformation/categoryArr' // 获取资讯来源

  static URL_industryInformation_editorArr = 'v1.0/industryInformation/editorArr'; // 资讯编辑者

  static URL_industryInformation_query = 'v1.0/industryInformation/query'; // 获取资讯列表

  static URL_industryInformation_delete = 'v1.0/industryInformation/delete'; // 删除资讯

  static URL_industryInformation_topped = 'v1.0/industryInformation/topped'; // 顶置资讯/取消顶置 

  static URL_industryInformation_display = 'v1.0/industryInformation/display'; // 隐藏资讯/显示资讯 

  static URL_industryInformation_batch_delete = 'v1.0/industryInformation/batch/delete'; // 批量删除资讯

  static URL_industryInformation_release = 'v1.0/industryInformation/release'; // 发布资讯

  static URL_industryInformation_detail = 'v1.0/industryInformation/detail'; // 资讯详情

  static URL_industryInformation_edit = 'v1.0/industryInformation/edit'; // 编辑资讯

  static URL_Information_delete_attachmentFile = '/v1.0/industryInformation/deleteAttachmentFile'; // 删除资讯附件

  static URL_V12_ca_queryCaList = '/v1.2/ca/queryCaLogList' // E签宝日志

  static URL_mallDesk_notice_list = 'mall-desk/notice/list'

  static URL_mallDesk_notice_remove = 'mall-desk/notice/remove'

  static URL_mallDesk_notice_submit = 'mall-desk/notice/submit'

  static URL_mallDesk_notice_detail = 'mall-desk/notice/detail'

  static URL_mallFlow_model_list = 'mall-flow/model/list'

  static URL_mallFlow_manager_list = 'mall-flow/manager/list'

  static URL_mallFlow_follow_list = 'mall-flow/follow/list'

  static URL_mallFlow_model_remove = 'mall-flow/model/remove'

  static URL_mallFlow_model_deploy = 'mall-flow/model/deploy'

  static URL_mallFlow_manager_changeState = 'mall-flow/manager/change-state'

  static URL_mallFlow_manager_deployUpload = 'mall-flow/manager/deploy-upload'

  static URL_mallFlow_manager_deleteDeployment = 'mall-flow/manager/delete-deployment'

  static URL_mallFlow_follow_deleteProcessInstance = 'mall-flow/follow/delete-process-instance'

  static URL_mallResource_oss_list = 'mall-resource/oss/list'

  static URL_mallResource_oss_detail = 'mall-resource/oss/detail'

  static URL_mallResource_oss_remove = 'mall-resource/oss/remove'

  static URL_mallResource_oss_submit = 'mall-resource/oss/submit'

  static URL_mallResource_oss_enable = 'mall-resource/oss/enable'

  static URL_mallResource_sms_list = 'mall-resource/sms/list'

  static URL_mallResource_sms_detail = 'mall-resource/sms/detail'

  static URL_mallResource_sms_remove = 'mall-resource/sms/remove'

  static URL_mallResource_sms_submit = 'mall-resource/sms/submit'

  static URL_mallResource_sms_enable = 'mall-resource/sms/enable'

  static URL_mallResource_sms_sendMessage = 'mall-resource/sms/endpoint/send-message'

  static URL_mallSystem_client_list = 'mall-system/client/list'

  static URL_mallSystem_client_detail = 'mall-system/client/detail'

  static URL_mallSystem_client_remove = 'mall-system/client/remove'

  static URL_mallSystem_client_submit = 'mall-system/client/submit'

  static URL_mallSystem_dept_list = 'mall-system/dept/list'

  static URL_mallSystem_dept_lazyList = 'mall-system/dept/lazy-list'

  static URL_mallSystem_dept_remove = 'mall-system/dept/remove'

  static URL_mallSystem_dept_submit = 'mall-system/dept/submit'

  static URL_mallSystem_dept_detail = 'mall-system/dept/detail'

  static URL_mallSystem_dept_tree = 'mall-system/dept/tree'

  static URL_mallSystem_dept_lazyTree = 'mall-system/dept/lazy-tree'

  static URL_mallSystem_dict_list = 'mall-system/dict/list'

  static URL_mallSystem_dict_parentList = 'mall-system/dict/parent-list'

  static URL_mallSystem_dict_childList = 'mall-system/dict/child-list' // 获取商品属性列表

  static URL_mallSystem_dict_remove = 'mall-system/dict/remove'

  static URL_mallSystem_dict_submit = 'mall-system/dict/submit'

  static URL_mallSystem_dict_detail = 'mall-system/dict/detail'

  static URL_mallSystem_dict_tree = 'mall-system/dict/tree?code=DICT'

  static URL_mallSystem_dict_dictionary = 'mall-system/dict/dictionary'

  static URL_mallSystem_dictbiz_list = 'mall-system/dict-biz/list'

  static URL_mallSystem_dictbiz_parentList = 'mall-system/dict-biz/parent-list'

  static URL_mallSystem_dictbiz_childList = 'mall-system/dict-biz/child-list'

  static URL_mallSystem_dictbiz_remove = 'mall-system/dict-biz/remove'

  static URL_mallSystem_dictbiz_submit = 'mall-system/dict-biz/submit'

  static URL_mallSystem_dictbiz_detail = 'mall-system/dict-biz/detail'

  static URL_mallSystem_dictbiz_tree = 'mall-system/dict-biz/tree?code=DICT'

  static URL_mallSystem_dictbiz_dictionary = 'mall-system/dict-biz/dictionary'

  static URL_mallDataCenter_product_category_parentList = 'mall-dataCenter/product-category/parent-list' // 商品品种父列表

  static URL_mallDataCenter_product_category_childList = 'mall-dataCenter/product-category/child-list' // 商品品种子列表

  static URL_mallDataCenter_product_attribute_list = 'mall-dataCenter/product-attribute/list' // 商品属性列表

  static URL_mallDataCenter_futuresContract_list = 'mall-dataCenter/futuresContract/list' // 合约月列表

  static URL_mallDataCenter_contract_detail = 'mall-dataCenter/contract/detail' // 合约月列表

  static URL_mallDataCenter_warehouse_list = 'mall-dataCenter/warehouse/list' // 商城仓库列表

  static URL_mallDataCenter_area_tree = 'mall-dataCenter/area/tree' // 商城省市列表

  static URL_mallContract_template_list = 'mall-contract/template/list' // 合同模板列表

  static URL_mallContract_template_add = 'mall-contract/template/add' // 新增合同模板

  static URL_mallContract_template_update = 'mall-contract/template/update' // 修改合同模板

  static URL_mallContract_template_delete = 'mall-contract/template/delete' // 删除合同模板

  static URL_mallSystem_menu_list = 'mall-system/menu/list'

  static URL_mallSystem_menu_lazyList = 'mall-system/menu/lazy-list'

  static URL_mallSystem_menu_lazyMenuList = 'mall-system/menu/lazy-menu-list'

  static URL_mallSystem_menu_menuList = 'mall-system/menu/menu-list'

  static URL_mallSystem_menu_menuTree = 'mall-system/menu/tree'

  static URL_mallSystem_menu_remove = 'mall-system/menu/remove'

  static URL_mallSystem_menu_submit = 'mall-system/menu/submit'

  static URL_mallSystem_menu_detail = 'mall-system/menu/detail'

  static URL_mallSystem_menu_topTenu = 'mall-system/menu/top-menu'

  static URL_mallSystem_menu_routes = 'mall-system/menu/routes'

  static URL_mallSystem_param_list = 'mall-system/param/list'

  static URL_mallSystem_param_remove = 'mall-system/param/remove'

  static URL_mallSystem_param_submit = 'mall-system/param/submit'

  static URL_mallSystem_role_list = 'mall-system/role/list'

  static URL_mallSystem_menu_grantTree = 'mall-system/menu/grant-tree'

  static URL_mallSystem_role_grant = 'mall-system/role/grant'

  static URL_mallSystem_role_remove = 'mall-system/role/remove'

  static URL_mallSystem_role_submit = 'mall-system/role/submit'

  static URL_mallSystem_menu_roleTreeKeys = 'mall-system/menu/role-tree-keys'

  static URL_mallSystem_role_tree = 'mall-system/role/tree'

  static URL_mallSystem_dataScope_list = 'mall-system/data-scope/list'

  static URL_mallSystem_dataScope_remove = 'mall-system/data-scope/remove'

  static URL_mallSystem_dataScope_submit = 'mall-system/data-scope/submit'

  static URL_mallSystem_dataScope_detail = 'mall-system/data-scope/detail'

  static URL_mallSystem_apiScope_list = 'mall-system/api-scope/list'

  static URL_mallSystem_apiScope_remove = 'mall-system/api-scope/remove'

  static URL_mallSystem_apiScope_submit = 'mall-system/api-scope/submit'

  static URL_mallSystem_apiScope_detail = 'mall-system/api-scope/detail'

  static URL_mallSystem_tenant_list = 'mall-system/tenant/list'

  static URL_mallSystem_tenant_detail = 'mall-system/tenant/detail'

  static URL_mallSystem_tenant_remove = 'mall-system/tenant/remove'

  static URL_mallSystem_tenant_submit = 'mall-system/tenant/submit'

  static URL_mallSystem_tenant_setting = 'mall-system/tenant/setting'

  static URL_mallSystem_tenant_info = 'mall-system/tenant/info'

  static URL_mallSystem_topmenu_list = 'mall-system/topmenu/list'

  static URL_mallSystem_topmenu_detail = 'mall-system/topmenu/detail'

  static URL_mallSystem_topmenu_remove = 'mall-system/topmenu/remove'

  static URL_mallSystem_topmenu_submit = 'mall-system/topmenu/submit'

  static URL_mallSystem_menu_grantTopTree = 'mall-system/menu/grant-top-tree'

  static URL_mallSystem_menu_topTreeKeys = 'mall-system/menu/top-tree-keys'

  static URL_mallSystem_topmenu_grant = 'mall-system/topmenu/grant'

  static URL_mallSystem_post_list = 'mall-system/post/list'

  static URL_mallSystem_post_select = 'mall-system/post/select'

  static URL_mallSystem_post_detail = 'mall-system/post/detail'

  static URL_mallSystem_post_remove = 'mall-system/post/remove'

  static URL_mallSystem_post_submit = 'mall-system/post/submit'

  static URL_mallUser_page = 'mall-user/page'

  static URL_mallUser_remove = 'mall-user/remove'

  static URL_mallUser_submit = 'mall-user/submit'

  static URL_mallUser_update = 'mall-user/update'

  static URL_mallUser_detail = 'mall-user/detail'

  static URL_mallUser_info = 'mall-user/info'

  static URL_mallUser_resetPassword = 'mall-user/reset-password'

  static URL_mallUser_updatePassword = 'mall-user/update-password'

  static URL_mallUser_updateInfo = 'mall-user/update-info'

  static URL_mallUser_grant = 'mall-user/grant'

  static URL_mallDevelop_code_list = 'mall-develop/code/list'

  static URL_mallDevelop_code_genCode = 'mall-develop/code/gen-code'

  static URL_mallDevelop_code_remove = 'mall-develop/code/remove'

  static URL_mallDevelop_code_submit = 'mall-develop/code/submit'

  static URL_mallDevelop_code_copy = 'mall-develop/code/copy'

  static URL_mallDevelop_code_detail = 'mall-develop/code/detail'

  static URL_mallDevelop_datasource_list = 'mall-develop/datasource/list'

  static URL_mallDevelop_datasource_detail = 'mall-develop/datasource/detail'

  static URL_mallDevelop_datasource_remove = 'mall-develop/datasource/remove'

  static URL_mallDevelop_datasource_submit = 'mall-develop/datasource/submit'

  static URL_userLogin = 'userLogin'

  static URL_getSideMenu = 'getSideMenu'

  static URL_mallAuth_oauth_token = 'mall-auth/oauth/token' // 获取token

  static URL_mallAuth_oauth_captcha = 'mall-auth/oauth/captcha' // 获取验证码

  static URL_mallSystem_menu_buttons = 'mall-system/menu/buttons' // 左侧menu菜单

  static URL_mallAuth_oauth_logout = 'mall-auth/oauth/logout' // 退出登录

  static URL_mallAuth_oauth_userInfo = 'mall-auth/oauth/user-info' // 使用token获取用户信息

  static URL_mallAuth_oauth_clearCache = 'mall-auth/oauth/clear-cache' // 清除缓存

  static URL_mallLog_usual_list = 'mall-log/usual/list'

  static URL_mallLog_api_list = 'mall-log/api/list'

  static URL_mallLog_error_list = 'mall-log/error/list'

  static URL_mallLog_usual_detail = 'mall-log/usual/detail'

  static URL_mallLog_api_detail = 'mall-log/api/detail'

  static URL_mallLog_error_detail = 'mall-log/error/detail'

  static URL_mallFlow_work_startList = 'mall-flow/work/start-list'

  static URL_mallFlow_work_claimList = 'mall-flow/work/claim-list'

  static URL_mallFlow_work_todoList = 'mall-flow/work/todo-list'

  static URL_mallFlow_work_sendList = 'mall-flow/work/send-list'

  static URL_mallFlow_work_doneList = 'mall-flow/work/done-list'

  static URL_mallFlow_work_claimTask = 'mall-flow/work/claim-task'

  static URL_mallFlow_work_completeTask = 'mall-flow/work/complete-task'

  static URL_mallFlow_process_historyFlowList = 'mall-flow/process/history-flow-list'

  static URL_mallDesk_process_leave_startProcess = 'mall-desk/process/leave/start-process'

  static URL_mallDesk_process_leave_detail = 'mall-desk/process/leave/detail'

  static URL_mallSystem_menu_tree = 'mall-system/menu/tree'

  static URL_mallSystem_tenant_select = 'mall-system/tenant/select'

  static URL_mallDevelop_datasource_select = 'mall-develop/datasource/select'

  static URL_mallUser_user_list = 'mall-user/user-list'

  static URL_mallResource_oss_endpoint_putFile = 'mall-resource/oss/endpoint/put-file'

  static URL_mallFlow_manager_checkUpload = 'mall-flow/manager/check-upload'

  static URL_mallFlow_process_diagramView = 'mall-flow/process/diagram-view'

  static URL_mallFlow_process_resourceView = 'mall-flow/process/resource-view'

  static URL_mallUser_import_user = 'mall-user/import-user' // 用户导入

  static URL_mallUser_export_user = 'mall-user/export-user' // 用户导出

  static URL_mallUser_export_template = 'mall-user/export-template' // 导出模板

  static URL_mallSystem_region_import_region = 'mall-system/region/import-region'

  static URL_mallSystem_region_export_region = 'mall-system/region/export-region'

  static URL_mallSystem_region_export_template = 'mall-system/region/export-template'

  static URL_mallSystem_region_select = 'mall-system/region/select'

  static URL_mallSystem_region_list = 'mall-system/region/list'

  static URL_mallSystem_region_lazy_tree = 'mall-system/region/lazy-tree'

  static URL_mallSystem_region_detail = 'mall-system/region/detail'

  static URL_mallSystem_region_remove = 'mall-system/region/remove'

  static URL_mallSystem_region_submit = 'mall-system/region/submit'

  static URL_mallUser_register_guest = 'mall-user/register-guest'

  static URL_mallUser_platform_detail = 'mall-user/platform-detail'

  static URL_mallUser_update_platform = 'mall-user/update-platform'

  static URL_mallReport_report_rest_list = 'mall-report/report/rest/list'

  static URL_mallReport_report_rest_remove = 'mall-report/report/rest/remove'

  static URL_mallResource_attach_list = 'mall-resource/attach/list'

  static URL_mallResource_attach_detail = 'mall-resource/attach/detail'

  static URL_mallResource_attach_remove = 'mall-resource/attach/remove'

  static URL_mallResource_attach_submit = 'mall-resource/attach/submit'

  static URL_mallResource_oss_putFileAttach = 'mall-resource/oss/endpoint/put-file-attach'
}

export default projectConfig