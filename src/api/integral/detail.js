import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

// 获取积分订单
const queryIntegralDetailList = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_integral_detail_query}`,
    method: 'post',
    data: params,
  })
}

export default queryIntegralDetailList
