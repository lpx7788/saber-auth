import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

export const getSideMenu = () => request({
  url: `/api/${projectConfig.URL_getSideMenu}`,
  method: 'post',
});

export default getSideMenu
