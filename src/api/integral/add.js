import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

// 获取积分订单
export const queryIntegralAddRecordList = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_integral_add_recordList}`,
    method: 'post',
    data: params,
  })
}

// 获取积分订单
export const queryIntegralUserData = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_integral_userData}`,
    method: 'post',
    data: params,
  })
}

// 获取积分订单
export const queryIntegralUserAdd = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_integral_user_add}`,
    method: 'post',
    data: params,
  })
}
