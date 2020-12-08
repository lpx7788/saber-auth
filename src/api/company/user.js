import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

export const queryCompanyUserList = (params) => request({
  url: `http://192.168.0.230:9091/${projectConfig.URL_company_user_query}`,
  method: 'post',
  data: params,
});

export const queryCompanyUserDetail = (params) => request({
  url: `http://192.168.0.230:9091/${projectConfig.URL_company_userDetail_query}`,
  method: 'post',
  data: params,
});

export const queryCompanyUserEdit = (params) => request({
  url: `http://192.168.0.230:9091/${projectConfig.URL_company_user_edit}`,
  method: 'post',
  data: params,
});
