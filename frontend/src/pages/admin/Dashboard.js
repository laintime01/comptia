// pages/admin/Dashboard.js
import React from 'react';
import AdminLayout from './AdminLayout';
import { 
  Users,
  FileQuestion,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center">
      <div className={`p-3 rounded-full ${color} text-white mr-4`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm uppercase">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  // 这些数据应该从API获取
  const stats = {
    totalUsers: 1234,
    totalQuestions: 567,
    activeExams: 89,
    reportedQuestions: 12
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Users size={24} />}
            title="Total Users"
            value={stats.totalUsers}
            color="bg-blue-500"
          />
          <StatCard
            icon={<FileQuestion size={24} />}
            title="Total Questions"
            value={stats.totalQuestions}
            color="bg-green-500"
          />
          <StatCard
            icon={<CheckCircle size={24} />}
            title="Active Exams"
            value={stats.activeExams}
            color="bg-purple-500"
          />
          <StatCard
            icon={<AlertTriangle size={24} />}
            title="Reported Questions"
            value={stats.reportedQuestions}
            color="bg-red-500"
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {/* 这些数据也应该从API获取 */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                  <div>
                    <p className="font-medium">User Activity {i}</p>
                    <p className="text-sm text-gray-500">Action description goes here</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;