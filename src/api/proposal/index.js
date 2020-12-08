import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';


// 获取意见反馈列表
const getFeedbackList = (params) => {
  return request({
    url: `http://192.168.0.230:9091/${projectConfig.URL_proposal_query}`,
    method: 'post',
    data: params,
  })
}

export default getFeedbackList
