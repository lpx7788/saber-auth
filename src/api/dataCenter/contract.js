// 期货合同 api
import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

// 获取期货合同列表
export const getList = (current, size, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallDataCenter_futuresContract_list}`,
    method: 'POST',
    params: {
      ...params,
      current,
      size,
    },
  })
}
// 期货合同
export const getDetail = (codes) => {
  return request({
    url: `/api/${projectConfig.URL_mallDataCenter_contract_detail}`,
    method: 'get',
    params: {
      code: codes,
    },
  })
}

export const remove = (ids) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_post_remove}`,
    method: 'post',
    params: {
      ids,
    },
  })
}

export const add = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_post_submit}`,
    method: 'post',
    data: row,
  })
}

export const update = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_post_submit}`,
    method: 'post',
    data: row,
  })
}
