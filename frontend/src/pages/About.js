import React from 'react';
import Layout from '../components/Layout';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">About CompTIA Exam Prep</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="mb-4">
            CompTIA Exam Prep is your go-to platform for mastering CompTIA certifications. We provide comprehensive study materials, practice exams, and performance tracking to ensure you're fully prepared for your certification journey.
          </p>
          <p className="mb-4">
            Our team of expert instructors and content creators are dedicated to keeping our materials up-to-date with the latest CompTIA exam objectives. We understand the challenges of IT certification and are committed to helping you succeed.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Our Mission</h2>
          <p className="mb-4">
            Our mission is to empower IT professionals and aspiring technologists to achieve their career goals through high-quality, accessible certification preparation resources.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Why Choose Us?</h2>
          <ul className="list-disc list-inside mb-4">
            <li>Comprehensive study materials aligned with current CompTIA exam objectives</li>
            <li>Interactive practice exams that simulate the real testing environment</li>
            <li>Performance tracking and analytics to identify areas for improvement</li>
            <li>Expert support from certified professionals</li>
            <li>Flexible learning options to fit your schedule</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default About;