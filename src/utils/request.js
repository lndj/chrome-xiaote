import axios from 'axios';
import { getToken } from './auth';
import Config from '../config';
import { Notify } from 'vant';

// 创建axios实例
const service = axios.create({
  baseURL: Config.BASE_API,
  timeout: Config.timeout,
});

// request拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['X-LC-Session'] = getToken();
    }
    config.headers['Content-Type'] = 'application/json';
    config.headers['x-lc-id'] = '4Paj7MSbcOPWbUj4qLbPdm4B-gzGzoHsz';
    config.headers['x-lc-key'] = 'cTBgegHXVcwPhAl4CTcMcMwm';
    config.headers['app-platform'] = 'ios';
    config.headers['app-version'] = '1.7.3';
    return config;
  },
  error => {
    console.log(error);
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  response => {
    const code = response.status;
    if (code < 200 || code > 300) {
      return Promise.reject(response.data);
    } else {
      return response.data;
    }
  },
  error => {
    let code = 0;
    let data = {};
    try {
      code = error.response.status;
      data = error.response.data;
    } catch (e) {
      if (error.toString().indexOf('Error: timeout') !== -1) {
        alert('网络请求超时');
        return Promise.reject(error);
      }
      if (error.toString().indexOf('Error: Network Error') !== -1) {
        Notify({ type: 'danger', message: '网络请求错误', duration: 2500 });
        return Promise.reject(error);
      }
    }
    if (code === 500) {
      Notify({ type: 'danger', message: data.error || '请求出错了', duration: 2500 });
    }
    if (code === 401) {
      alert('登陆过期了，需要重新登陆');
    }
    return Promise.reject(error);
  }
);
export default service;
