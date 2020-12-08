import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

// 发布资讯
export const releaseInformation = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_industryInformation_release}`,
    method: 'post',
    data: params,
  })
}
// 获取资讯详情
export const getInformationDetail = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_industryInformation_detail}`,
    method: 'post',
    data: params,
  })
}
// 编辑修改资讯
export const editInformation = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_industryInformation_edit}`,
    method: 'post',
    data: params,
  })
}
// 删除资讯附件
export const deleteAttachmentFile = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_Information_delete_attachmentFile}`,
    method: 'post',
    data: params,
  })
}
