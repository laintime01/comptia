// api/questionApi.js
import api from './axiosConfig.js';

const questionApi = {
  getAllQuestions: async (params) => {
    try {
      return await api.get('/questions', { params });
    } catch (error) {
      throw error;
    }
  },

  getRandomQuestions: async (params) => {
    try {
      return await api.get('/questions/random', { params });
    } catch (error) {
      throw error;
    }
  },

  createQuestion: async (questionData) => {
    try {
      return await api.post('/questions', questionData);
    } catch (error) {
      throw error;
    }
  },

  updateQuestion: async (id, questionData) => {
    try {
      return await api.put(`/questions/${id}`, questionData);
    } catch (error) {
      throw error;
    }
  },

  deleteQuestion: async (id) => {
    try {
      return await api.delete(`/questions/${id}`);
    } catch (error) {
      throw error;
    }
  },

  verifyAnswer: async (id, answer) => {
    try {
      return await api.post(`/questions/${id}/verify`, { answer });
    } catch (error) {
      throw error;
    }
  },

  startExam: async (params) => {
    try {
      return await api.post('/questions/exam/start', params);
    } catch (error) {
      throw error;
    }
  },

  submitExam: async (examId, answers) => {
    try {
      return await api.post(`/questions/exam/${examId}/submit`, { answers });
    } catch (error) {
      throw error;
    }
  },

  getExamHistory: async (examId) => {
    try {
      return await api.get(`/questions/exam/${examId}`);
    } catch (error) {
      throw error;
    }
  },

  getStatistics: async () => {
    try {
      return await api.get('/questions/statistics/personal');
    } catch (error) {
      throw error;
    }
  }
};

export default questionApi;