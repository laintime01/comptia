import React from 'react';
import Layout from '../components/Layout';
import { FaBook, FaLaptopCode, FaChartLine, FaHeadset, FaClock } from 'react-icons/fa';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">About CompTIA Exam Prep</h1>
        
        {/* Hero Section */}
        <div className="bg-green-600 text-white py-16 px-8 rounded-lg shadow-lg mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Empowering IT Professionals</h2>
            <p className="text-xl">
              CompTIA Exam Prep is your trusted partner in mastering CompTIA certifications. Our platform offers comprehensive study materials, practice exams, and performance tracking to ensure your success in the ever-evolving IT landscape.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-white shadow-md rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Mission</h2>
          <p className="text-lg text-gray-600 mb-4">
            Our mission is to empower IT professionals and aspiring technologists to achieve their career goals through high-quality, accessible certification preparation resources. We strive to bridge the gap between theoretical knowledge and practical application, ensuring our users are well-prepared for both their exams and real-world challenges.
          </p>
          <img src="/api/placeholder/600/300" alt="IT professionals collaborating" className="rounded-lg shadow-md w-full" />
        </div>

        {/* Team Section */}
        <div className="bg-gray-100 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Our Expert Team</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img src="/api/placeholder/150/150" alt="Expert Instructor" className="rounded-full w-24 h-24 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-center">John Doe</h3>
              <p className="text-gray-600 text-center">Lead Instructor with 15+ years of IT industry experience</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img src="/api/placeholder/150/150" alt="Content Creator" className="rounded-full w-24 h-24 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-center">Jane Smith</h3>
              <p className="text-gray-600 text-center">Senior Content Creator specializing in CompTIA certifications</p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start">
              <FaBook className="text-4xl text-green-500 mr-4" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Comprehensive Materials</h3>
                <p className="text-gray-600">Study resources aligned with current CompTIA exam objectives</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaLaptopCode className="text-4xl text-green-500 mr-4" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Interactive Practice</h3>
                <p className="text-gray-600">Exams that simulate the real testing environment</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaChartLine className="text-4xl text-green-500 mr-4" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Performance Tracking</h3>
                <p className="text-gray-600">Analytics to identify areas for improvement</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaHeadset className="text-4xl text-green-500 mr-4" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Expert Support</h3>
                <p className="text-gray-600">Guidance from certified IT professionals</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaClock className="text-4xl text-green-500 mr-4" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Flexible Learning</h3>
                <p className="text-gray-600">Options to fit your busy schedule</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;