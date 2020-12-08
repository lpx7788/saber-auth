// 商品属性 api
import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

export const getList = (current, size, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallDataCenter_product_attribute_list}`,
    method: 'POST',
    params: {
      ...params,
      current,
      size,
    },
  })
}
// 获取商品属性类型数据(下拉)
export const getTypeList = (current, size, Id) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_dict_childList}`,
    method: 'get',
    params: {
      current,
      size,
      parentId: Id,
    },
  })
}

export const getDetail = (id) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_post_detail}`,
    method: 'get',
    params: {
      id,
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
