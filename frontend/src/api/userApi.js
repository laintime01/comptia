// api/userApi.js
import api from './axiosConfig.js';

const userApi = {
  getAllUsers: async (params) => {
    try {
      return await api.get('/users', { params });
    } catch (error) {
      throw error;
    }
  },

  getUserById: async (id) => {
    try {
      return await api.get(`/users/${id}`);
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (id, userData) => {
    try {
      return await api.put(`/users/${id}`, userData);
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      return await api.delete(`/users/${id}`);
    } catch (error) {
      throw error;
    }
  },

  getCurrentUser: async () => {
    try {
      return await api.get('/users/me');
    } catch (error) {
      throw error;
    }
  },

  updateProfile: async (userData) => {
    try {
      return await api.put('/users/me/profile', userData);
    } catch (error) {
      throw error;
    }
  }
};

export default userApi;