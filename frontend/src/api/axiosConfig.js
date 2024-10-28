// api/axiosConfig.js
import axios from 'axios';

// 根据环境设置基础URL
const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://comptia-exam-site-production.up.railway.app'
  : 'http://localhost:5001';

const isDevelopment = process.env.NODE_ENV === 'development';

// 调试用：打印当前环境和API URL
console.log('Current Environment:', process.env.NODE_ENV);
console.log('API Base URL:', BASE_URL);

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000,
  withCredentials: false
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    if (isDevelopment) {
      console.log('API Request:', {
        url: config.url,
        method: config.method,
        data: config.data,
        baseURL: config.baseURL
      });
    }

    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: new Date().getTime()
      };
    }

    return config;
  },
  (error) => {
    if (isDevelopment) {
      console.error('Request Error:', error);
    }
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    if (isDevelopment) {
      console.log('API Response:', {
        url: response.config.url,
        status: response.status,
        data: response.data
      });
    }
    return response.data;
  },
  (error) => {
    if (isDevelopment) {
      console.error('Response Error:', {
        url: error.config?.url,
        status: error.response?.status,
        message: error.response?.data?.message || error.message
      });
    }

    if (error.response) {
      switch (error.response.status) {
        case 401: {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          if (!window.location.pathname.includes('/login')) {
            localStorage.setItem('redirectPath', window.location.pathname);
            window.location.href = '/login';
          }
          break;
        }
        case 403:
          console.error('Permission denied');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error('An error occurred');
      }

      return Promise.reject({
        status: error.response.status,
        message: error.response.data.message || 'An error occurred',
        errors: error.response.data.errors
      });
    }

    if (error.code === 'ECONNABORTED') {
      return Promise.reject({
        message: 'Request timeout',
        status: 408
      });
    }

    return Promise.reject({
      message: error.message || 'Network error'
    });
  }
);

export default axiosInstance;