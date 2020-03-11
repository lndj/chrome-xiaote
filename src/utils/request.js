import axios from 'axios';
import { getToken } from './auth';
import Config from '../config';

// 创建axios实例
const service = axios.create({
  baseURL: Config.BASE_API, // api 的 base_url
  timeout: Config.timeout, // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['X-LC-Session'] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

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
        Notification.error({
          title: '网络请求错误',
          duration: 2500,
        });
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
