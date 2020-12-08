import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

export const getList = (current, size, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_menu_list}`,
    method: 'get',
    params: {
      ...params,
      current,
      size,
    },
  })
}

export const getLazyList = (parentId, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_menu_lazyList}`,
    method: 'get',
    params: {
      ...params,
      parentId,
    },
  })
}

export const getLazyMenuList = (parentId, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_menu_lazyMenuList}`,
    method: 'get',
    params: {
      ...params,
      parentId,
    },
  })
}

export const getMenuList = (current, size, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_menu_menuList}`,
    method: 'get',
    params: {
      ...params,
      current,
      size,
    },
  })
}

export const getMenuTree = (tenantId) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_menu_menuTree}`,
    method: 'get',
    params: {
      tenantId,
    },
  })
}

export const remove = (ids) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_menu_remove}`,
    method: 'post',
    params: {
      ids,
    },
  })
}

export const add = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_menu_submit}`,
    method: 'post',
    data: row,
  })
}

export const update = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_menu_submit}`,
    method: 'post',
    data: row,
  })
}

export const getMenu = (id) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_menu_detail}`,
    method: 'get',
    params: {
      id,
    },
  })
}

export const getTopMenu = () => request({
  url: `/api/${projectConfig.URL_mallSystem_menu_topTenu}`,
  method: 'get',
});

export const getRoutes = (topMenuId) => request({
  url: `/api/${projectConfig.URL_mallSystem_menu_routes}`,
  method: 'get',
  params: {
    topMenuId,
  },
});
