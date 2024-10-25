import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api';
import toast, { Toaster } from 'react-hot-toast';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'username' ? value.trim() : value
    }));
  };

  const validateForm = () => {
    const { username, password } = formData;
    
    if (!username) {
      toast.error('Please enter your username');
      return false;
    }

    if (username.length < 3) {
      toast.error('Username must be at least 3 characters long');
      return false;
    }

    if (!password) {
      toast.error('Please enter your password');
      return false;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const loginToast = toast.loading('Signing in...', {
      position: 'top-center'
    });

    try {
      setLoading(true);

      // 打印发送前的数据
      console.log('Attempting login with username:', formData.username);
      
      const response = await authApi.login({
        username: formData.username,
        password: formData.password
      });
      
      // 打印响应
      console.log('Login successful:', response);

      if (response?.token) {
        toast.success('Login successful!', {
          id: loginToast,
          duration: 2000
        });

        if (onLogin) {
          onLogin(response.user);
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

        if (response.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      console.error('Login failed:', error);
      
      let errorMessage = 'Login failed';
      
      if (error.message === 'Invalid credentials') {
        errorMessage = 'Incorrect username or password';
      } else if (error.message === 'Network Error') {
        errorMessage = 'Unable to connect to server';
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage, {
        id: loginToast,
        duration: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  // JSX 部分保持不变...
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <Link
              to="/signup"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-green-600 bg-white hover:bg-gray-50"
            >
              Create new account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;