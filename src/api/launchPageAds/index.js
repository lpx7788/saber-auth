import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

// 获取广告图列表
export const getLaunchPageAdsList = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_advertising_query}`,
    method: 'post',
    data: params,
  })
}
export const addLaunchPageAds = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_advertising_add}`,
    method: 'post',
    data: params,
  })
}
export const deleteLaunchPageAds = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_advertising_delete}`,
    method: 'post',
    data: params,
  })
}
