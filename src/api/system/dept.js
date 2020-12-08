import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

export const getList = (current, size, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_dept_list}`,
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
    url: `/api/${projectConfig.URL_mallSystem_dept_lazyList}`,
    method: 'get',
    params: {
      ...params,
      parentId,
    },
  })
}

export const remove = (ids) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_dept_remove}`,
    method: 'post',
    params: {
      ids,
    },
  })
}

export const add = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_dept_submit}`,
    method: 'post',
    data: row,
  })
}

export const update = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_dept_submit}`,
    method: 'post',
    data: row,
  })
}

export const getDept = (id) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_dept_detail}`,
    method: 'get',
    params: {
      id,
    },
  })
}

export const getDeptTree = (tenantId) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_dept_tree}`,
    method: 'get',
    params: {
      tenantId,
    },
  })
}

export const getDeptLazyTree = (parentId) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_dept_lazyTree}`,
    method: 'get',
    params: {
      parentId,
    },
  })
}

// 获取租户列表
export const getTenantTree = (parentId) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_tenant_select}`,
    method: 'get',
    params: {
      parentId,
    },
  })
}
