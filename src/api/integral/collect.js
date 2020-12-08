import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

// 获取积分订单
const queryIntegralUserList = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_integral_user_List}`,
    method: 'post',
    data: params,
  })
}

export default queryIntegralUserList
