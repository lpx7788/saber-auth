import request from '@/router/axios';
import projectConfig from '@/api/projectConfig'

export const startList = (current, size, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallFlow_work_startList}`,
    method: 'get',
    params: {
      ...params,
      current,
      size,
    },
  })
}

export const claimList = (current, size, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallFlow_work_claimList}`,
    method: 'get',
    params: {
      ...params,
      current,
      size,
    },
  })
}

export const todoList = (current, size, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallFlow_work_todoList}`,
    method: 'get',
    params: {
      ...params,
      current,
      size,
    },
  })
}

export const sendList = (current, size, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallFlow_work_sendList}`,
    method: 'get',
    params: {
      ...params,
      current,
      size,
    },
  })
}

export const doneList = (current, size, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallFlow_work_doneListt}`,
    method: 'get',
    params: {
      ...params,
      current,
      size,
    },
  })
}

export const claimTask = (taskId) => {
  return request({
    url: `/api/${projectConfig.URL_mallFlow_work_claimTask}`,
    method: 'post',
    params: {
      taskId,
    },
  })
}

export const completeTask = (data) => {
  return request({
    url: `/api/${projectConfig.URL_mallFlow_work_completeTask}`,
    method: 'post',
    data,
  })
}
