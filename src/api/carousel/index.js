import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

// 获取web轮播图或者mobile轮播图列表
export const getAdvertisementList = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_advertisement_query}`,
    method: 'post',
    data: params,
  })
}

// 删除轮播图
export const deleteAdvertisement = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_advertisement_delete}`,
    method: 'post',
    data: params,
  })
}
// 移动（上移/下移）轮播图
export const moveAdvertisement = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_advertisement_move}`,
    method: 'post',
    data: params,
  })
}
// 添加轮播图
export const addAdvertisement = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_advertisement_add}`,
    method: 'post',
    data: params,
  })
}
// 编辑轮播图
export const editAdvertisement = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_advertisement_edit}`,
    method: 'post',
    data: params,
  })
}
