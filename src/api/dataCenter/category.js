// 商品品种 api
import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

export const getList = (current, size, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_dictbiz_list}`,
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
    url: `/api/${projectConfig.URL_mallDataCenter_product_category_parentList}`,
    method: 'post',
    data: {
      ...params,
      current,
      size,
    },
  })
}

export const getChildList = (current, size, Id, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallDataCenter_product_category_childList}`,
    method: 'post',
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
    url: `/api/${projectConfig.URL_mallSystem_dictbiz_remove}`,
    method: 'post',
    params: {
      ids,
    },
  })
}

export const add = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_dictbiz_submit}`,
    method: 'post',
    data: row,
  })
}

export const update = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_dictbiz_submit}`,
    method: 'post',
    data: row,
  })
}

export const getCategory = (id) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_dictbiz_detail}`,
    method: 'get',
    params: {
      id,
    },
  })
}
export const getCategoryTree = () => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_dictbiz_tree}`,
    method: 'get',
  })
}
