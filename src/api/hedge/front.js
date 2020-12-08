import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

// 获取套保前置地址
export const getHedgeFrontList = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_preAddress_queryPreAddressList}`,
    method: 'post',
    data: params,
  })
}
// 获取期货公司列表
export const getFuturesCompanyList = (params) => {
  return request({
    url: `http://192.168.0.230:8080/${projectConfig.URL_autoHedge_futuresCompanyList}`,
    method: 'post',
    data: params,
  })
}
// 删除前置地址
export const deletePreAddress = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_preAddress_deletePreAddress}`,
    method: 'post',
    data: params,
  })
}
// 保存前置地址
export const savePreAddress = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_preAddress_savePreAddress}`,
    method: 'post',
    data: params,
  })
}
