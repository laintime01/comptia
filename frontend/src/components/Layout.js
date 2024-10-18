import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              <div>
                <Link to="/" className="flex items-center py-4 px-2">
                  <img src="/api/placeholder/50/50" alt="Logo" className="h-8 w-8 mr-2" />
                  <span className="font-semibold text-gray-500 text-lg">CompTIA Exam Prep</span>
                </Link>
              </div>
              <div className="hidden md:flex items-center space-x-1">
                <Link to="/" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Home</Link>
                <Link to="/about" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">About</Link>
                <Link to="/exams" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Exams</Link>
                <Link to="/contact" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Contact</Link>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-3">
              <Link to="/login" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300">Log In</Link>
              <Link to="/register" className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">Sign Up</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-6 pt-10 pb-6">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/4 text-center md:text-left">
              <h5 className="uppercase mb-6 font-bold">Links</h5>
              <ul className="mb-4">
                <li className="mt-2">
                  <Link to="/faq" className="hover:underline text-gray-400 hover:text-white">FAQ</Link>
                </li>
                <li className="mt-2">
                  <Link to="/help" className="hover:underline text-gray-400 hover:text-white">Help</Link>
                </li>
                <li className="mt-2">
                  <Link to="/support" className="hover:underline text-gray-400 hover:text-white">Support</Link>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 text-center md:text-left">
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
            <div className="w-full md:w-1/4 text-center md:text-left">
              <h5 className="uppercase mb-6 font-bold">Social</h5>
              <ul className="mb-4">
                <li className="mt-2">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-400 hover:text-white">Facebook</a>
                </li>
                <li className="mt-2">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-400 hover:text-white">Linkedin</a>
                </li>
                <li className="mt-2">
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-400 hover:text-white">Twitter</a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 text-center md:text-left">
              <h5 className="uppercase mb-6 font-bold">Company</h5>
              <ul className="mb-4">
                <li className="mt-2">
                  <Link to="/about" className="hover:underline text-gray-400 hover:text-white">About Us</Link>
                </li>
                <li className="mt-2">
                  <Link to="/contact" className="hover:underline text-gray-400 hover:text-white">Contact</Link>
                </li>
                <li className="mt-2">
                  <Link to="/jobs" className="hover:underline text-gray-400 hover:text-white">Jobs</Link>
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