import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

export const getList = (current, size, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_role_list}`,
    method: 'get',
    params: {
      ...params,
      current,
      size,
    },
  })
}

export const grantTree = () => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_menu_grantTree}`,
    method: 'get',
  })
}

export const grant = (roleIds, menuIds, dataScopeIds, apiScopeIds) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_role_grant}`,
    method: 'post',
    data: {
      roleIds,
      menuIds,
      dataScopeIds,
      apiScopeIds,
    },
  })
}

export const remove = (ids) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_role_remove}`,
    method: 'post',
    params: {
      ids,
    },
  })
}

export const add = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_role_submit}`,
    method: 'post',
    data: row,
  })
}

export const update = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_role_submit}`,
    method: 'post',
    data: row,
  })
}


export const getRole = (roleIds) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_menu_roleTreeKeys}`,
    method: 'get',
    params: {
      roleIds,
    },
  })
}

export const getRoleTree = (tenantId) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_role_tree}`,
    method: 'get',
    params: {
      tenantId,
    },
  })
}
