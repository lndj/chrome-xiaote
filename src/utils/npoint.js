import axios from 'axios';
import Config from '../config';
import { Notify } from 'vant';

// 创建axios实例
const service = axios.create({
  baseURL: Config.JSON_API,
  timeout: Config.timeout,
});

// response 拦截器
service.interceptors.response.use(
  response => {
    const code = response.status;
    if (code < 200 || code > 300) {
      return Promise.reject('error');
    } else {
      return response.data;
    }
  },
  error => {
    let code = 0;
    try {
      code = error.response.data.status;
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
    if (code === 401) {
      alert('登陆过期了，需要重新登陆');
    }
    return Promise.reject(error);
  }
);
export default service;
