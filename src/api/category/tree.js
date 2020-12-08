import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

const queryCategoryTree = (params) => request({
  url: `http://192.168.0.230:8080/${projectConfig.URL_category_tree}`,
  method: 'post',
  data: params,
});

export default queryCategoryTree
