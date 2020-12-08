import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

// 获取首页数据
const getCaList = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_V12_ca_queryCaList}`,
    method: 'post',
    data: params,
  })
}

export default getCaList
