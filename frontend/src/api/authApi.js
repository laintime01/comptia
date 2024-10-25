import api from './axiosConfig.js';

const authApi = {
  // 登录
  login: async (credentials) => {
    try {
      // 打印发送的数据
      console.log('Sending login request with:', {
        ...credentials,
        password: '***'
      });

      const response = await api.post('/api/auth/login', credentials);
      
      console.log('Login response:', response);

      if (response?.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      return response;
    } catch (error) {
      console.error('Login error details:', {
        status: error.status,
        message: error.message,
        response: error.response,
        data: error.response?.data
      });
      
      // 抛出更详细的错误
      throw {
        status: error.status || error.response?.status,
        message: error.response?.data?.message || error.message,
        errors: error.response?.data?.errors
      };
    }
  },

  // 注册
  register: async (userData) => {
    try {
      const response = await api.post('/api/auth/register', userData);
      // 因为axios拦截器已经处理了data的解构，所以response就是服务器返回的数据
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      return response;
    } catch (error) {
      // 处理错误响应
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message || 'Registration failed');
      }
      throw new Error('Network error or server not responding');
    }
  },

  // 注销
  logout: async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await api.post('/api/auth/logout', {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      // 即使请求失败也清除本地存储
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw error;
    }
  },

  // 验证 token
  verifyToken: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      
      const { data } = await api.get('/api/auth/verify-token', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return data;
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw error;
    }
  },

  // 忘记密码
  forgotPassword: async (email) => {
    try {
      const { data } = await api.post('/api/auth/forgot-password', { email });
      return data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Failed to send reset email');
      }
      throw error;
    }
  },

  // 重置密码
  resetPassword: async (resetToken, newPassword) => {
    try {
      const { data } = await api.post('/api/auth/reset-password', {
        resetToken,
        newPassword
      });
      return data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Failed to reset password');
      }
      throw error;
    }
  },

  // 修改密码（已登录用户）
  changePassword: async (currentPassword, newPassword) => {
    try {
      const { data } = await api.post('/api/auth/change-password', {
        currentPassword,
        newPassword
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Failed to change password');
      }
      throw error;
    }
  }
};

export default authApi;