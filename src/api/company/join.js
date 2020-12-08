import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

export const queryJoinList = (params) => request({
  url: `http://192.168.0.230:9091/${projectConfig.URL_company_query}`,
  method: 'post',
  data: params,
});

export const joinExamine = (params) => request({
  url: `http://192.168.0.230:8080/${projectConfig.URL_company_examine_admin}`,
  method: 'post',
  data: params,
});
