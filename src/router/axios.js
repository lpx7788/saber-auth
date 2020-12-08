/**
 * 全站http配置
 *
 * axios参数说明
 * isSerialize是否开启form表单提交
 * isToken是否需要token
 */
import axios from 'axios';
import store from '@/store/';
import router from '@/router/router';
import {
  serialize,
} from '@/util/util';
import {
  getToken,
} from '@/util/auth';
import {
  Message,
} from 'element-ui';
import website from '@/config/website';
import {
  Base64,
} from 'js-base64';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 默认超时时间
axios.defaults.timeout = 10000;
// 返回其他状态码
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500;
};
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true;
// NProgress 配置
NProgress.configure({
  showSpinner: false,
});
// http request拦截
axios.interceptors.request.use(config => {
  const configData = config
  // 开启 progress bar
  NProgress.start();
  const meta = (configData.meta || {});
  const isToken = meta.isToken === false;
  configData.headers.Authorization = `Basic ${Base64.encode(`${website.clientId}:${website.clientSecret}`)}`;
  // 模拟运营后台的access_token
  configData.headers.access_token = 'e9b68b96ef3648adb99c1a8a9a3b12c3_f3914e67123e47b8acb46e557e9243dc';

  // 让每个请求携带token
  if (getToken() && !isToken) {
    configData.headers[website.tokenHeader] = `bearer ${getToken()}`;
    configData.headers.Authorization = `bearer ${getToken()}`;
  }
  // headers中配置text请求
  if (configData.text === true) {
    configData.headers['Content-Type'] = 'text/plain';
  }
  // headers中配置serialize为true开启序列化
  if (configData.method === 'post' && meta.isSerialize === true) {
    configData.data = serialize(configData.data);
  }
  return configData
}, error => {
  return Promise.reject(error)
});
// http response 拦截
axios.interceptors.response.use(res => {
  let resData = res
  // 关闭 progress bar
  NProgress.done();
  // 获取状态码
  const status = resData.data.code || resData.status;
  const errCode = resData.data.errorCode;
  const statusWhiteList = website.statusWhiteList || [];
  const msg = resData.data.msg || resData.data.error_description || '未知错误';
  // 如果在白名单里则自行catch逻辑处理
  if (statusWhiteList.includes(status)) return Promise.reject(res);
  // 如果是401则跳转到登录页面
  if (status === 401) {
    store.dispatch('FedLogOut').then(() => router.push({
      path: '/login',
    }));
  }
  // 如果请求为非200否者默认统一处理
  if (status !== 200) {
    if (errCode === '9998' || errCode === '2000') {
      Message({
        message: '未登录',
        type: 'error',
      });
    } else {
      Message({
        message: msg,
        type: 'error',
      });
    }

    return Promise.reject(new Error(msg))
  }
  return resData;
}, error => {
  NProgress.done();
  return Promise.reject(new Error(error));
});

export default axios;
