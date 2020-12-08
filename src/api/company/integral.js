import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

export const queryCompanyIntegral = (params) => request({
  url: `http://192.168.0.230:9091/${projectConfig.URL_company_integral}`,
  method: 'post',
  data: params,
});

export const queryCompanyIntegralCategory = (params) => request({
  url: `http://192.168.0.230:8080/${projectConfig.URL_company_integral_category}`,
  method: 'post',
  data: params,
});

export const queryCompanyAddIntegral = (params) => request({
  url: `http://192.168.0.230:9091/${projectConfig.URL_company_add_intrgral}`,
  method: 'post',
  data: params,
});

export const queryCompanyDelIntegral = (params) => request({
  url: `http://192.168.0.230:9091/${projectConfig.URL_company_del_intrgral}`,
  method: 'post',
  data: params,
});
