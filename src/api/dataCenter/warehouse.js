// 商城仓库 api
import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

// 获取商城仓库列表
export const getList = (current, size, params) => {
  return request({
    url: `/api/${projectConfig.URL_mallDataCenter_warehouse_list}`,
    method: 'POST',
    data: {
      ...params,
    },
    params: {
      current,
      size,
    },
  })
}
// 获取地区列表
export const getAreaList = (current, size, id) => {
  return request({
    url: `/api/${projectConfig.URL_mallSystem_dict_childList}`,
    method: 'get',
    params: {
      current,
      size,
      parentId: id,
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
