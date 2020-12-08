import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

// 获取积分订单
export const queryIntegralOrder = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_integral_order_query}`,
    method: 'post',
    data: params,
  })
}

// 订单确认、发货
export const updateIntegralOrder = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_integral_order_update}`,
    method: 'post',
    data: params,
  })
}

// 订单拒绝
export const refuseIntegralOrder = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_integral_order_refuse}`,
    method: 'post',
    data: params,
  })
}
