import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ExamSelection from './pages/ExamSelection';
import ExamPractice from './pages/ExamPractice';
import UserProfile from './pages/UserProfile';
import AdminDashboard from './pages/admin/Dashboard';
import AdminUserManagement from './pages/admin/UserManagement';
import AdminExamManagement from './pages/admin/ExamManagement';
import AdminQuestionManagement from './pages/admin/QuestionManagement';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/exams" element={<ExamSelection />} />
      <Route path="/practice/:examId" element={<ExamPractice />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<AdminUserManagement />} />
      <Route path="/admin/exams" element={<AdminExamManagement />} />
      <Route path="/admin/questions" element={<AdminQuestionManagement />} />
    </Routes>
  </BrowserRouter>
);

export default Router;