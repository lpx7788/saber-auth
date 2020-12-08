import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

export const getList = (current, size, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_dict_list}`,
    method: 'get',
    params: {
      ...params,
      current,
      size,
    },
  })
}

export const getParentList = (current, size, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_dict_parentList}`,
    method: 'get',
    params: {
      ...params,
      current,
      size,
    },
  })
}

export const getChildList = (current, size, Id, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_dict_childList}`,
    method: 'get',
    params: {
      ...params,
      current,
      size,
      parentId: Id,
    },
  })
}

export const remove = (ids) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_dict_remove}`,
    method: 'post',
    params: {
      ids,
    },
  })
}

export const add = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_dict_submit}`,
    method: 'post',
    data: row,
  })
}

export const update = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_dict_submit}`,
    method: 'post',
    data: row,
  })
}


export const getDict = (id) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_dict_detail}`,
    method: 'get',
    params: {
      id,
    },
  })
}
export const getDictTree = () => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_dict_tree}`,
    method: 'get',
  })
}

export const getDictionary = (params) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_dict_dictionary}`,
    method: 'get',
    params,
  })
}
