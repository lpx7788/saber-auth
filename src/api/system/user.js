import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

export const getList = (current, size, params, deptId) => {
  return request({
    url: `/api/${projectConfig.URL_mallUser_page}`,
    method: 'get',
    params: {
      ...params,
      current,
      size,
      deptId,
    },
  })
}

export const remove = (ids) => {
  return request({
    url: `/api/${projectConfig.URL_mallUser_remove}`,
    method: 'post',
    params: {
      ids,
    },
  })
}

export const add = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallUser_submit}`,
    method: 'post',
    data: row,
  })
}

export const update = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallUser_update}`,
    method: 'post',
    data: row,
  })
}

export const updatePlatform = (userId, userType, userExt) => {
  return request({
    url: `/api/${projectConfig.URL_mallUser_update_platform}`,
    method: 'post',
    params: {
      userId,
      userType,
      userExt,
    },
  })
}

export const getUser = (id) => {
  return request({
    url: `/api/${projectConfig.URL_mallUser_detail}`,
    method: 'get',
    params: {
      id,
    },
  })
}

export const getUserPlatform = (id) => {
  return request({
    url: `/api/${projectConfig.URL_mallUser_platform_detail}`,
    method: 'get',
    params: {
      id,
    },
  })
}

export const getUserInfo = () => {
  return request({
    url: `/api/${projectConfig.URL_mallUser_info}`,
    method: 'get',
  })
}

export const resetPassword = (userIds) => {
  return request({
    url: `/api/${projectConfig.URL_mallUser_resetPassword}`,
    method: 'post',
    params: {
      userIds,
    },
  })
}

export const updatePassword = (oldPassword, newPassword, newPassword1) => {
  return request({
    url: `/api/${projectConfig.URL_mallUser_updatePassword}`,
    method: 'post',
    params: {
      oldPassword,
      newPassword,
      newPassword1,
    },
  })
}

export const updateInfo = (row) => {
  return request({
    url: `/api/${projectConfig.URL_mallUser_updateInfo}`,
    method: 'post',
    data: row,
  })
}

export const grant = (userIds, roleIds) => {
  return request({
    url: `/api/${projectConfig.URL_mallUser_grant}`,
    method: 'post',
    params: {
      userIds,
      roleIds,
    },
  })
}
