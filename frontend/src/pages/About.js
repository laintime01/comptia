import React from 'react';
import Layout from '../components/Layout';
import { FaBook, FaLaptopCode, FaChartLine, FaClock, FaSync } from 'react-icons/fa';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">About CompTIA Practice Tests</h1>
        
        {/* Hero Section */}
        <div className="bg-green-600 text-white py-16 px-8 rounded-lg shadow-lg mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Practice Makes Perfect</h2>
            <p className="text-xl">
              We provide a comprehensive collection of CompTIA certification practice questions to help you prepare for your exams. With our regularly updated question bank and detailed explanations, you can practice effectively and boost your confidence.
            </p>
          </div>
        </div>

        {/* Platform Introduction */}
        <div className="bg-white shadow-md rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Platform</h2>
          <p className="text-lg text-gray-600 mb-4">
            Our platform is dedicated to helping IT professionals prepare for CompTIA certifications through extensive practice. We maintain a large database of practice questions that align with the latest exam objectives. By practicing with our questions, you'll become familiar with the exam format and improve your understanding of key concepts.
          </p>
          <img src="/api/placeholder/600/300" alt="Online practice system interface" className="rounded-lg shadow-md w-full" />
        </div>

        {/* Features Section */}
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start">
              <FaBook className="text-4xl text-green-500 mr-4" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Extensive Question Bank</h3>
                <p className="text-gray-600">Large collection of practice questions covering all exam objectives</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaLaptopCode className="text-4xl text-green-500 mr-4" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Detailed Explanations</h3>
                <p className="text-gray-600">Comprehensive explanations for each question</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaChartLine className="text-4xl text-green-500 mr-4" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Progress Tracking</h3>
                <p className="text-gray-600">Monitor your performance and identify weak areas</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaSync className="text-4xl text-green-500 mr-4" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Regular Updates</h3>
                <p className="text-gray-600">Questions updated to match latest exam objectives</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaClock className="text-4xl text-green-500 mr-4" />
              <div>
                <h3 className="text-lg font-semibold mb-2">24/7 Access</h3>
                <p className="text-gray-600">Practice anytime, anywhere with our online system</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;