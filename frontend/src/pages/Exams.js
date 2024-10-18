import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const exams = [
  { id: 'a-plus', name: 'CompTIA A+', description: 'Foundation-level credential for IT professionals' },
  { id: 'network-plus', name: 'CompTIA Network+', description: 'Certification for mid-level network technicians' },
  { id: 'security-plus', name: 'CompTIA Security+', description: 'Global certification for cybersecurity professionals' },
  { id: 'cloud-plus', name: 'CompTIA Cloud+', description: 'Certification for cloud computing professionals' },
];

const Exams = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">CompTIA Exam Preparation</h1>
        <div className="grid md:grid-cols-2 gap-6">
          {exams.map((exam) => (
            <div key={exam.id} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-2">{exam.name}</h2>
              <p className="text-gray-600 mb-4">{exam.description}</p>
              <Link
                to={`/practice/${exam.id}`}
                className="inline-block bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition duration-300"
              >
                Start Practice
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Exams;