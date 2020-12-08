import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

// 获取积分订单
export const queryGuidePriceList = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_integral_guidePriceList_query}`,
    method: 'post',
    data: params,
  })
}
// 新增、编辑指导价
export const addGuidePrice = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_integral_guidePrice_add}`,
    method: 'post',
    data: params,
  })
}
// 启用、停用指导价
export const openStopGuidePrice = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_integral_guidePrice_stop}`,
    method: 'post',
    data: params,
  })
}
