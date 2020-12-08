import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

const queryPutFile = (params) => request({
  url: `/api/${projectConfig.URL_mallResource_oss_endpoint_putFile}`,
  method: 'post',
  data: params,
});

export default queryPutFile
