import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

const queryProvinceCityList = () => {
  return request({
    url: `/api/${projectConfig.URL_mallDataCenter_area_tree}`,
    method: 'get',
    params: {},
  })
}
export default queryProvinceCityList
