import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

export const getUsualList = (current, size) => {
  return request({
    url: `/api/${projectConfig.URL_mallLog_usual_list}`,
    method: 'get',
    params: {
      current,
      size,
    },
  })
}

export const getApiList = (current, size) => {
  return request({
    url: `/api/${projectConfig.URL_mallLog_api_list}`,
    method: 'get',
    params: {
      current,
      size,
    },
  })
}

export const getErrorList = (current, size) => {
  return request({
    url: `/api/${projectConfig.URL_mallLog_error_list}`,
    method: 'get',
    params: {
      current,
      size,
    },
  })
}
export const getUsualLogs = (id) => {
  return request({
    url: `/api/${projectConfig.URL_mallLog_usual_detail}`,
    method: 'get',
    params: {
      id,
    },
  })
}
export const getApiLogs = (id) => {
  return request({
    url: `/api/${projectConfig.URL_mallLog_api_detail}`,
    method: 'get',
    params: {
      id,
    },
  })
}
export const getErrorLogs = (id) => {
  return request({
    url: `/api/${projectConfig.URL_mallLog_error_detail}`,
    method: 'get',
    params: {
      id,
    },
  })
}
