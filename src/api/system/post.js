import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

export const getList = (current, size, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_post_list}`,
    method: 'get',
    params: {
      ...params,
      current,
      size,
    },
  })
}

export const getPostList = (tenantId) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_post_select}`,
    method: 'get',
    params: {
      tenantId,
    },
  })
}

export const getDetail = (id) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_post_detail}`,
    method: 'get',
    params: {
      id,
    },
  })
}

export const remove = (ids) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_post_remove}`,
    method: 'post',
    params: {
      ids,
    },
  })
}

export const add = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_post_submit}`,
    method: 'post',
    data: row,
  })
}

export const update = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_post_submit}`,
    method: 'post',
    data: row,
  })
}
