import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

// 订单管理列表
export const getOrderList = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_order_query}`,
    method: 'post',
    data: params,
  })
}

// 获取公司列表
export const getCompanyList = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_company_getCompanyList}`,
    method: 'post',
    data: params,
  })
}

// 获取订单详情
export const getOrderDetail = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_order_detail}`,
    method: 'post',
    data: params,
  })
}
