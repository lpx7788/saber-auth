// 模板管理 api
import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

// 获取模板管理列表
export const getList = (current, size, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallContract_template_list}`,
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
    url: `/api/${projectConfig.URL_mallContract_template_delete}/${ids}`,
    method: 'post',
  })
}

export const add = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallContract_template_add}`,
    method: 'post',
    data: row,
  })
}

export const update = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallContract_template_update}`,
    method: 'post',
    data: row,
  })
}
