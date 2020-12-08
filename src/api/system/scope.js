import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

export const getListDataScope = (current, size, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_dataScope_list}`,
    method: 'get',
    params: {
      ...params,
      current,
      size,
    },
  })
}

export const removeDataScope = (ids) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_dataScope_remove}`,
    method: 'post',
    params: {
      ids,
    },
  })
}

export const addDataScope = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_dataScope_submit}`,
    method: 'post',
    data: row,
  })
}

export const updateDataScope = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_dataScope_submit}`,
    method: 'post',
    data: row,
  })
}

export const getMenuDataScope = (id) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_dataScope_detail}`,
    method: 'get',
    params: {
      id,
    },
  })
}

export const getListApiScope = (current, size, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_apiScope_list}`,
    method: 'get',
    params: {
      ...params,
      current,
      size,
    },
  })
}

export const removeApiScope = (ids) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_apiScope_remove}`,
    method: 'post',
    params: {
      ids,
    },
  })
}

export const addApiScope = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_apiScope_submit}`,
    method: 'post',
    data: row,
  })
}

export const updateApiScope = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_apiScope_submit}`,
    method: 'post',
    data: row,
  })
}

export const getMenuApiScope = (id) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_apiScope_detail}`,
    method: 'get',
    params: {
      id,
    },
  })
}
