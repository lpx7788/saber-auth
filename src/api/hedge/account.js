import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

// 获取套保账号列表
export const getHedgeAccountList = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_company_autoHedge_query}`,
    method: 'post',
    data: params,
  })
}

// 获取套保账号编辑状态
export const getAccountEditStatus = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_company_autoHedge_editStatus}`,
    method: 'post',
    data: params,
  })
}

// 套保账号编辑密码
export const accountEditPassword = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_company_autoHedge_editPassword}`,
    method: 'post',
    data: params,
  })
}

