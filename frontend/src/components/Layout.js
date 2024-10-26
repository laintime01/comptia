// components/Layout.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  };

  // 导航链接配置
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/exams', label: 'Exams' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              <div>
                <Link to="/" className="flex items-center py-4 px-2">
                  <svg className="h-8 w-8 mr-2" viewBox="0 0 40 40">
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
                  <span className="font-semibold text-gray-500 text-lg">CompTIA Exam Prep</span>
                </Link>
              </div>
              <div className="hidden md:flex items-center space-x-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`py-4 px-2 font-semibold transition duration-300 ${
                      location.pathname === link.path
                        ? 'text-green-500 border-b-4 border-green-500'
                        : 'text-gray-500 hover:text-green-500'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-3">
              {!user ? (
                <>
                  <Link to="/login" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300">
                    Log In
                  </Link>
                  <Link to="/signup" className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">
                    Sign Up
                  </Link>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Welcome, {user.username}</span>
                  {user.role === 'admin' && (
                    <Link to="/admin/dashboard" className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
                      Dashboard
                    </Link>
                  )}
                  <button onClick={handleLogout} className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-6 pt-10 pb-6">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/3 text-center md:text-left">
              <h5 className="uppercase mb-6 font-bold">Links</h5>
              <ul className="mb-4">
                <li className="mt-2">
                  <Link to="/faq" className="hover:underline text-gray-400 hover:text-white">FAQ</Link>
                </li>
                <li className="mt-2">
                  <Link to="/help" className="hover:underline text-gray-400 hover:text-white">Help</Link>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3 text-center md:text-left">
              <h5 className="uppercase mb-6 font-bold">Legal</h5>
              <ul className="mb-4">
                <li className="mt-2">
                  <Link to="/terms" className="hover:underline text-gray-400 hover:text-white">Terms</Link>
                </li>
                <li className="mt-2">
                  <Link to="/privacy" className="hover:underline text-gray-400 hover:text-white">Privacy</Link>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3 text-center md:text-left">
              <h5 className="uppercase mb-6 font-bold">Social</h5>
              <ul className="mb-4">
                <li className="mt-2">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-400 hover:text-white">Facebook</a>
                </li>
                <li className="mt-2">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-400 hover:text-white">LinkedIn</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;