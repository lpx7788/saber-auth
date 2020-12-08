import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

// 获取积分订单
export const queryCashingCommodityList = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_integral_cashingCommodity_query}`,
    method: 'post',
    data: params,
  })
}

// 新增、编辑积分兑换设置
export const joinCashingCommodity = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_integral_cashingCommodity_join}`,
    method: 'post',
    data: params,
  })
}

// 新增、编辑积分兑换设置
export const delCashingCommodity = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_integral_cashingCommodity_del}`,
    method: 'post',
    data: params,
  })
}
