import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

// 获取资讯来源
export const getCategoryArr = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_industryInformation_categoryArr}`,
    method: 'post',
    data: params,
  })
}
// 获取编辑者
export const getEditorArr = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_industryInformation_editorArr}`,
    method: 'post',
    data: params,
  })
}
// 获取资讯列表
export const getInformationList = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_industryInformation_query}`,
    method: 'post',
    data: params,
  })
}
// 获取资讯列表
export const deleteInformation = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_industryInformation_delete}`,
    method: 'post',
    data: params,
  })
}
// 顶置资讯/取消顶置
export const toppedInformation = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_industryInformation_topped}`,
    method: 'post',
    data: params,
  })
}

// 显示资讯/隐藏资讯
export const displayInformation = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_industryInformation_display}`,
    method: 'post',
    data: params,
  })
}
// 显示资讯/隐藏资讯
export const batchRemoveInformation = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_industryInformation_batch_delete}`,
    method: 'post',
    data: params,
  })
}
