import request from '@/router/axios';
import projectConfig from '@/api/projectConfig';

// =====================参数===========================
export const historyFlowList = (processInstanceId) => {
  return request({
    url: `/api/${projectConfig.URL_mallFlow_process_historyFlowList}`,
    method: 'get',
    params: {
      processInstanceId,
    },
  })
}

// =====================请假流程===========================
export const leaveProcess = (data) => {
  return request({
    url: `/api/${projectConfig.URL_mallDesk_process_leave_startProcess}`,
    method: 'post',
    data,
  })
}

export const leaveDetail = (businessId) => {
  return request({
    url: `/api/${projectConfig.URL_mallDesk_process_leave_detail}`,
    method: 'get',
    params: {
      businessId,
    },
  })
}
