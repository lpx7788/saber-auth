import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

export const getList = (current, size, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_param_list}`,
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
    url: `/api/${projectConfig.URL_mallSystem_param_remove}`,
    method: 'post',
    params: {
      ids,
    },
  })
}

export const add = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_param_submit}`,
    method: 'post',
    data: row,
  })
}

export const update = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_param_submit}`,
    method: 'post',
    data: row,
  })
}
