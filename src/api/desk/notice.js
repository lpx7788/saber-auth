import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

export const getList = (current, size, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallDesk_notice_list}`,
    method: 'get',
    params: {
      ...params,
      current,
      size,
    },
  })
}

export const remove = (ids) => {
  return request({
    url: `/api/${projectConfig.URL_mallDesk_notice_remove}`,
    method: 'post',
    params: {
      ids,
    },
  })
}

export const add = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallDesk_notice_submit}`,
    method: 'post',
    data: row,
  })
}

export const update = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallDesk_notice_submit}`,
    method: 'post',
    data: row,
  })
}

export const getNotice = (id) => {
  return request({
    url: `/api/${projectConfig.URL_mallDesk_notice_detail}`,
    method: 'get',
    params: {
      id,
    },
  })
}
