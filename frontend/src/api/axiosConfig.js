// api/axiosConfig.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5001';
const isDevelopment = process.env.NODE_ENV === 'development';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  // 设置超时时间
  timeout: 10000
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 开发环境下可以打印请求信息
    if (isDevelopment) {
      console.log('API Request:', {
        url: config.url,
        method: config.method,
        data: config.data
      });
    }

    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = token;
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
    // 开发环境下可以打印响应信息
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
        case 401:
          // 未授权或 token 过期
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          // 避免在登录页面重复跳转
          if (!window.location.pathname.includes('/login')) {
            window.location.href = '/login';
          }
          break;
        
        case 403:
          // 权限不足
          console.error('Permission denied');
          break;

        case 404:
          // 资源不存在
          console.error('Resource not found');
          break;

        case 500:
          // 服务器错误
          console.error('Server error');
          break;

        default:
          // 其他错误
          console.error('An error occurred');
      }

      return Promise.reject({
        status: error.response.status,
        message: error.response.data.message || 'An error occurred',
        errors: error.response.data.errors
      });
    }

    // 网络错误或请求被取消
    return Promise.reject({
      message: error.message || 'Network error'
    });
  }
);

export default axiosInstance;