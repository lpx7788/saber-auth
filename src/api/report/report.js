import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

export const getList = (current, size, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallReport_report_rest_list}`,
    method: 'get',
    params: {
      ...params,
      current,
      size,
    },
  })
}
export const remove = (ids) => {
  return request({
    url: `/api/${projectConfig.URL_mallReport_report_rest_remove}`,
    method: 'post',
    params: {
      ids,
    },
  })
}
