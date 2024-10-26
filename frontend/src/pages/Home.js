import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              <div>
                <a href="/" className="flex items-center py-4 px-2">
                  <img src="/api/placeholder/50/50" alt="Logo" className="h-8 w-8 mr-2" />
                  <span className="font-semibold text-gray-500 text-lg">CompTIA Exam Prep</span>
                </a>
              </div>
              <div className="hidden md:flex items-center space-x-1">
                <a href="/" className="py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold">Home</a>
                <a href="/about" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">About</a>
                <a href="/exams" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Exams</a>
                <a href="/contact" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Contact</a>
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

      {/* Hero Section */}
      <div className="bg-green-600 text-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-2">Welcome to CompTIA Exam Prep</h2>
          <h3 className="text-2xl mb-8">Master your IT skills and ace your certification exams</h3>
          <button className="bg-white font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider text-green-600 hover:bg-gray-200 transition duration-300">
            Get Started
          </button>
        </div>
      </div>

      {/* CompTIA Introduction */}
      <section className="container mx-auto px-6 p-10">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          What is CompTIA?
        </h2>
        <div className="flex items-center flex-wrap mb-20">
          <div className="w-full md:w-1/2">
            <h4 className="text-3xl text-gray-800 font-bold mb-3">Globally Recognized Certifications</h4>
            <p className="text-gray-600 mb-8">CompTIA (Computing Technology Industry Association) is a leading voice and advocate for the $5 trillion global information technology ecosystem. They are the world's premier provider of vendor-neutral IT certifications, validating the skills of IT professionals in areas ranging from networking to cybersecurity and beyond.</p>
          </div>
          <div className="w-full md:w-1/2">
            <img src="/api/placeholder/400/300" alt="CompTIA Certifications" className="rounded-lg shadow-lg" />
          </div>
        </div>
      </section>

      {/* Website Introduction */}
      <section className="bg-gray-100">
        <div className="container mx-auto px-6 py-20">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Why Choose Our Platform?
          </h2>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold mb-4">Targeted Practice</h3>
                <p className="text-gray-600">Our exam simulations are designed to mimic the real CompTIA exams, helping you prepare effectively.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="text-2xl font-bold mb-4">Performance Tracking</h3>
                <p className="text-gray-600">Monitor your progress with detailed analytics and identify areas for improvement.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-3xl mb-4">🔄</div>
                <h3 className="text-2xl font-bold mb-4">Regular Updates</h3>
                <p className="text-gray-600">Our question bank is constantly updated to reflect the latest CompTIA exam objectives.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-green-600 text-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-2 text-center">
            Ready to Start Your CompTIA Journey?
          </h2>
          <h3 className="text-2xl mb-8 text-center">
            Join thousands of IT professionals who have used our platform to advance their careers.
          </h3>
          <Link 
            to="/signup"
            className="bg-white font-bold rounded-full mt-6 py-4 px-8 shadow-lg uppercase tracking-wider text-green-600 hover:bg-gray-200 transition duration-300 mx-auto inline-block">
            Sign Up Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-6 pt-10 pb-6">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/4 text-center md:text-left">
              <h5 className="uppercase mb-6 font-bold">Links</h5>
              <ul className="mb-4">
                <li className="mt-2">
                  <a href="/faq" className="hover:underline text-gray-400 hover:text-white">FAQ</a>
                </li>
                <li className="mt-2">
                  <a href="/help" className="hover:underline text-gray-400 hover:text-white">Help</a>
                </li>
                <li className="mt-2">
                  <a href="/support" className="hover:underline text-gray-400 hover:text-white">Support</a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 text-center md:text-left">
              <h5 className="uppercase mb-6 font-bold">Legal</h5>
              <ul className="mb-4">
                <li className="mt-2">
                  <a href="/terms" className="hover:underline text-gray-400 hover:text-white">Terms</a>
                </li>
                <li className="mt-2">
                  <a href="/privacy" className="hover:underline text-gray-400 hover:text-white">Privacy</a>
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
                  <a href="/about" className="hover:underline text-gray-400 hover:text-white">About Us</a>
                </li>
                <li className="mt-2">
                  <a href="/contact" className="hover:underline text-gray-400 hover:text-white">Contact</a>
                </li>
                <li className="mt-2">
                  <a href="/jobs" className="hover:underline text-gray-400 hover:text-white">Jobs</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;