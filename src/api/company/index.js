import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

export const queryCompanyDetail = (params) => request({
  url: `http://192.168.0.230:9091/${projectConfig.URL_company_detail}`,
  method: 'post',
  data: params,
});

export const queryCompanyCustomers = (params) => request({
  url: `http://192.168.0.230:9091/${projectConfig.URL_company_customers}`,
  method: 'post',
  data: params,
});

export const queryCompanySuppliers = (params) => request({
  url: `http://192.168.0.230:9091/${projectConfig.URL_company_suppliers}`,
  method: 'post',
  data: params,
});

export const queryCompanyUsers = (params) => request({
  url: `http://192.168.0.230:9091/${projectConfig.URL_company_users}`,
  method: 'post',
  data: params,
});

export const editComapany = (params) => request({
  url: `http://192.168.0.230:9091/${projectConfig.URL_company_edit}`,
  method: 'post',
  data: params,
});

export const queryAllRegisterPhone = (params) => request({
  url: `http://192.168.0.230:9091/${projectConfig.URL_company_registerPhone}`,
  method: 'post',
  data: params,
});

export const addCompany = (params) => request({
  url: `http://192.168.0.230:9091/${projectConfig.URL_company_add}`,
  method: 'post',
  data: params,
});
