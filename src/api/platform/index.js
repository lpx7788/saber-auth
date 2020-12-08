import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

// 获取首页数据
const getList = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_app_count}`,
    method: 'post',
    data: params,
  })
}

export default getList
