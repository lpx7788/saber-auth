import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

export const getList = (current, size, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_tenant_list}`,
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
    url: `/api/${projectConfig.URL_mallSystem_tenant_detail}`,
    method: 'get',
    params: {
      id,
    },
  })
}

export const remove = (ids) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_tenant_remove}`,
    method: 'post',
    params: {
      ids,
    },
  })
}

export const add = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_tenant_submit}`,
    method: 'post',
    data: row,
  })
}

export const update = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_tenant_submit}`,
    method: 'post',
    data: row,
  })
}

export const setting = (ids, form) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_tenant_setting}`,
    method: 'post',
    params: {
      ...form,
      ids,
    },
  })
}

export const datasource = (tenantId, datasourceId) => {
  return request({
    url: `/api/${projectConfig.URL_mallsystem_tenant_datasource}`,
    method: 'post',
    params: {
      tenantId,
      datasourceId,
    },
  })
}

export const info = (domain) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_tenant_info}`,
    method: 'get',
    params: {
      domain,
    },
  })
}
