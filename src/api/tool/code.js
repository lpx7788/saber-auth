import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

export const getList = (current, size, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallDevelop_code_list}`,
    method: 'get',
    params: {
      ...params,
      current,
      size,
    },
  })
}

export const build = (ids) => {
  return request({
    url: `/api/${projectConfig.URL_mallDevelop_code_genCode}`,
    method: 'post',
    params: {
      ids,
      system: 'omp',
    },
  })
}

export const remove = (ids) => {
  return request({
    url: `/api/${projectConfig.URL_mallDevelop_code_remove}`,
    method: 'post',
    params: {
      ids,
    },
  })
}

export const add = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallDevelop_code_submit}`,
    method: 'post',
    data: row,
  })
}

export const update = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallDevelop_code_submit}`,
    method: 'post',
    data: row,
  })
}

export const copy = (id) => {
  return request({
    url: `/api/${projectConfig.URL_mallDevelop_code_copy}`,
    method: 'post',
    params: {
      id,
    },
  })
}

export const getCode = (id) => {
  return request({
    url: `/api/${projectConfig.URL_mallDevelop_code_detail}`,
    method: 'get',
    params: {
      id,
    },
  })
}
