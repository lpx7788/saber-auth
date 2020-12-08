import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

export const getList = (current, size, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallResource_sms_list}`,
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
    url: `/api/${projectConfig.URL_mallResource_sms_detail}`,
    method: 'get',
    params: {
      id,
    },
  })
}

export const remove = (ids) => {
  return request({
    url: `/api/${projectConfig.URL_mallResource_sms_remove}`,
    method: 'post',
    params: {
      ids,
    },
  })
}

export const add = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallResource_sms_submit}`,
    method: 'post',
    data: row,
  })
}

export const update = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallResource_sms_submit}`,
    method: 'post',
    data: row,
  })
}

export const enable = (id) => {
  return request({
    url: `/api/${projectConfig.URL_mallResource_sms_enable}`,
    method: 'post',
    params: {
      id,
    },
  })
}

export const send = (code, phones, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallResource_sms_sendMessage}`,
    method: 'post',
    params: {
      code,
      phones,
      params,
    },
  })
}
