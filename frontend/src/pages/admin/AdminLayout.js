// components/AdminLayout.js
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileQuestion,
  LogOut,
  ChevronDown,
  Home
} from 'lucide-react';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  // 获取用户名首字母的函数
  const getInitial = (username) => {
    return username ? username[0].toUpperCase() : 'U';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/admin/users', icon: <Users size={20} />, label: 'User Management' },
    { path: '/admin/questions', icon: <FileQuestion size={20} />, label: 'Question Management' },
    { path: '/', icon: <Home size={20} />, label: 'Main Page' },

  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="bg-white shadow-md">
        <div className="flex justify-between items-center px-4 py-3">
        <div className="flex items-center space-x-3">
            <svg className="h-8 w-8" viewBox="0 0 40 40">
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#22c55e', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#16a34a', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <rect width="40" height="40" rx="10" fill="url(#grad)" />
              <text
                x="50%" 
                y="50%" 
                dominantBaseline="middle" 
                textAnchor="middle" 
                fill="white" 
                fontSize="22" 
                fontWeight="bold"
                fontFamily="Arial"
                style={{ letterSpacing: '1px' }}
              >
                R
              </text>
            </svg>
            <span className="text-xl font-semibold text-gray-800">CompTIA Admin</span>
          </div>
          {/* 修改头像部分 */}
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                {/* 替换原来的 img 标签为新的 SVG 头像 */}
                <svg className="h-8 w-8" viewBox="0 0 40 40">
                  <defs>
                    <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#4f46e5', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <circle cx="20" cy="20" r="20" fill="url(#avatarGrad)" />
                  <text
                    x="50%" 
                    y="50%" 
                    dominantBaseline="middle" 
                    textAnchor="middle" 
                    fill="white" 
                    fontSize="18" 
                    fontWeight="bold"
                    fontFamily="Arial"
                  >
                    {getInitial(user?.username)}
                  </text>
                </svg>
                <span>{user?.username}</span>
                <ChevronDown size={16} />
              </button>
              <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl hidden group-hover:block">
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 w-full"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md min-h-screen">
          <nav className="mt-5">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 ${
                  location.pathname === item.path ? 'bg-gray-100 border-l-4 border-green-500' : ''
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;