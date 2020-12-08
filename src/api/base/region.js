import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

export const getList = (current, size, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_region_list}`,
    method: 'get',
    params: {
      ...params,
      current,
      size,
    },
  })
}

export const getLazyTree = (parentCode, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_region_lazy_tree}`,
    method: 'get',
    params: {
      ...params,
      parentCode,
    },
  })
}

export const getDetail = (code) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_region_detail}`,
    method: 'get',
    params: {
      code,
    },
  })
}

export const remove = (id) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_region_remove}`,
    method: 'post',
    params: {
      id,
    },
  })
}

export const submit = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_region_submit}`,
    method: 'post',
    data: row,
  })
}
