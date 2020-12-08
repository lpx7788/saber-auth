import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';
import website from '@/config/website';

export const loginByUsername = (tenantId, username, password, type, key, code) => request({
  url: `/api/${projectConfig.URL_mallAuth_oauth_token}`,
  method: 'post',
  headers: {
    'Tenant-Id': tenantId,
    'Captcha-Key': key,
    'Captcha-Code': code,
    'User-Category': 'omp',
  },
  params: {
    tenantId,
    username,
    password,
    grant_type: (website.captchaMode ? 'captcha' : 'password'),
    scope: 'all',
    type,
  },
});

export const loginBySocial = (tenantId, source, code, state) => request({
  url: `/api/${projectConfig.URL_mallAuth_oauth_token}`,
  method: 'post',
  headers: {
    'Tenant-Id': tenantId,
    'User-Category': 'omp',
  },
  params: {
    tenantId,
    source,
    code,
    state,
    grant_type: 'social',
    scope: 'all',
  },
})

export const refreshToken = (refresh_token, tenantId) => request({
  url: `/api/${projectConfig.URL_mallAuth_oauth_token}`,
  method: 'post',
  headers: {
    'Tenant-Id': tenantId,
    'User-Category': 'omp',
  },
  params: {
    tenantId,
    refresh_token,
    grant_type: 'refresh_token',
    scope: 'all',
  },
});

export const registerGuest = (form, oauthId) => request({
  url: `/api/${projectConfig.URL_mallUser_register_guest}`,
  method: 'post',
  params: {
    tenantId: form.tenantId,
    name: form.name,
    account: form.account,
    password: form.password,
    oauthId,
  },
});

export const getButtons = () => request({
  url: `/api/${projectConfig.URL_mallSystem_menu_buttons}`,
  method: 'get',
});

export const getCaptcha = () => request({
  url: `/api/${projectConfig.URL_mallAuth_oauth_captcha}`,
  method: 'get',
});

export const logout = () => request({
  url: `/api/${projectConfig.URL_mallAuth_oauth_logout}`,
  method: 'get',
});

export const getUserInfo = () => request({
  url: `/api/${projectConfig.URL_mallAuth_oauth_userInfo}`,
  method: 'get',
});

export const sendLogs = (list) => request({
  url: `/api/${projectConfig.URL_mallAuth_oauth_logout}`,
  method: 'post',
  data: list,
});

export const clearCache = () => request({
  url: `/api/${projectConfig.URL_mallAuth_oauth_clearCache}`,
  method: 'get',
});
