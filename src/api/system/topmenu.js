import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

export const getList = (current, size, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_topmenu_list}`,
    method: 'get',
    params: {
      ...params,
      current,
      size,
    },
  })
}

export const getDetail = (id) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_topmenu_detail}`,
    method: 'get',
    params: {
      id,
    },
  })
}

export const remove = (ids) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_topmenu_remove}`,
    method: 'post',
    params: {
      ids,
    },
  })
}

export const add = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_topmenu_submit}`,
    method: 'post',
    data: row,
  })
}

export const update = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_topmenu_submit}`,
    method: 'post',
    data: row,
  })
}

export const grantTree = () => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_menu_grantTopTree}`,
    method: 'get',
  })
}

export const getTopTree = (topMenuIds) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_menu_topTreeKeys}`,
    method: 'get',
    params: {
      topMenuIds,
    },
  })
}

export const grant = (topMenuIds, menuIds) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_topmenu_grant}`,
    method: 'post',
    data: {
      topMenuIds,
      menuIds,
    },
  })
}
