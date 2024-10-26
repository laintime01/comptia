import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Home = () => {
  return (
    <Layout>
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
        <div className="max-w-3xl mx-auto">
          <h4 className="text-3xl text-gray-800 font-bold mb-3">Globally Recognized Certifications</h4>
          <p className="text-gray-600 mb-8">CompTIA (Computing Technology Industry Association) is a leading voice and advocate for the $5 trillion global information technology ecosystem. They are the world's premier provider of vendor-neutral IT certifications, validating the skills of IT professionals in areas ranging from networking to cybersecurity and beyond.</p>
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
    </Layout>
  );
};

export default Home;