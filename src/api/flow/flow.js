import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

export const modelList = (current, size, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallFlow_model_list}`,
    method: 'get',
    params: {
      ...params,
      current,
      size,
    },
  })
}

export const managerList = (current, size, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallFlow_manager_list}`,
    method: 'get',
    params: {
      ...params,
      current,
      size,
    },
  })
}

export const followList = (current, size, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallFlow_follow_list}`,
    method: 'get',
    params: {
      ...params,
      current,
      size,
    },
  })
}


export const removeModel = (ids) => {
  return request({
    url: `/api/${projectConfig.URL_mallFlow_model_remove}`,
    method: 'post',
    params: {
      ids,
    },
  })
}

export const deployModel = (params) => {
  return request({
    url: `/api/${projectConfig.URL_mallFlow_model_deploy}`,
    method: 'post',
    params,
  })
}

export const changeState = (params) => {
  return request({
    url: `/api/${projectConfig.URL_mallFlow_manager_changeState}`,
    method: 'post',
    params,
  })
}

export const deployUpload = (category, tenantIds, files) => {
  const formData = new FormData();
  formData.append('category', category);
  formData.append('tenantIds', tenantIds);
  files.forEach(file => {
    formData.append('files', file);
  });
  return request({
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: `/api/${projectConfig.URL_mallFlow_manager_deployUpload}`,
    method: 'post',
    data: formData,
  })
}

export const deleteDeployment = (deploymentIds) => {
  return request({
    url: `/api/${projectConfig.URL_mallFlow_manager_deleteDeployment}`,
    method: 'post',
    params: {
      deploymentIds,
    },
  })
}

export const deleteProcessInstance = (params) => {
  return request({
    url: `/api/${projectConfig.URL_mallFlow_follow_deleteProcessInstance}`,
    method: 'post',
    params,
  })
}
