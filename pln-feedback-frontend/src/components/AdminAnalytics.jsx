import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Download } from 'lucide-react';
import api from '../api/axios';

const AdminAnalytics = () => {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await api.get('/analytics');
      setAnalytics(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading analytics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-red-600 mb-4">Error Loading Analytics</div>
          <div className="text-gray-600">{error}</div>
          <button 
            onClick={fetchAnalytics}
            className="mt-4 px-6 py-2 bg-[#1CB5C4] text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">No analytics data available</div>
      </div>
    );
  }

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyData = monthNames.map((name, index) => {
    const found = analytics?.monthly_responses?.find(m => parseInt(m.month) === index + 1);
    return {
      name,
      value: found ? parseInt(found.count) : 0
    };
  });

  const pieData = [
    { name: 'Kepuasan', value: parseInt(analytics?.kepuasan_vs_ketidakpuasan?.kepuasan) || 0 },
    { name: 'Ketidakpuasan', value: parseInt(analytics?.kepuasan_vs_ketidakpuasan?.ketidakpuasan) || 0 }
  ];

  const COLORS = ['#1CB5C4', '#FCD34D'];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar - Fixed Width */}
      <aside className="w-64 bg-white border-r flex-shrink-0 flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-[#1CB5C4] rounded-full flex items-center justify-center flex-shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M12 3L2 9v12h8v-8h4v8h8V9L12 3z"/>
              </svg>
            </div>
            <span className="text-lg font-bold text-[#1CB5C4]">PLN Feedback</span>
          </div>
          
          <nav className="space-y-2">
            <button
              onClick={() => navigate('/admin/responses')}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
            >
              <span className="text-xl">💬</span>
              <span>Feedback Response</span>
            </button>
            
            <button
              className="w-full flex items-center gap-3 px-4 py-3 bg-[#1CB5C4] text-white rounded-lg font-medium"
            >
              <TrendingUp size={20} />
              <span>Analysis</span>
            </button>
          </nav>
        </div>

        {/* Logout at bottom */}
        <div className="mt-auto p-6 border-t">
          <button
            onClick={() => {
              localStorage.removeItem('isAdminLoggedIn');
              localStorage.removeItem('adminUsername');
              navigate('/admin/login');
            }}
            className="w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content - Scrollable */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Fixed */}
        <header className="bg-white border-b px-8 py-4 flex-shrink-0">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-[#1CB5C4] text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors">
                <Download size={18} />
                Download Data
              </button>
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm font-semibold">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-auto">
          <div className="p-8 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="text-3xl font-bold text-gray-900 mb-2">{analytics?.total_responses || 0}</div>
                <div className="text-sm text-gray-600 font-medium">Total Responses</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="text-3xl font-bold text-green-600 mb-2">{analytics?.kepuasan_percentage || 0}%</div>
                <div className="text-sm text-gray-600 font-medium">Rata-rata Kepuasan</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="text-3xl font-bold text-red-600 mb-2">{analytics?.ketidakpuasan_percentage || 0}%</div>
                <div className="text-sm text-gray-600 font-medium">Rata-rata Ketidakpuasan</div>
              </div>
            </div>

            {/* Bar Chart - Full Width */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Monthly Responses</h2>
                <p className="text-sm text-gray-600">Feedback per bulan (tahun ini)</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#1CB5C4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart & Rating - Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pie Chart */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Kepuasan vs Ketidakpuasan</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#1CB5C4] rounded-full"></div>
                    <span className="text-sm text-gray-600">Kepuasan ({pieData[0].value})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-300 rounded-full"></div>
                    <span className="text-sm text-gray-600">Ketidakpuasan ({pieData[1].value})</span>
                  </div>
                </div>
              </div>

              {/* Rating Per Inovasi */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Rating Per Inovasi</h2>
                <div className="space-y-4">
                  {analytics?.rating_per_inovasi?.slice(0, 5).map((item, index) => {
                    const rating = parseFloat(item.avg_rating) || 0;
                    return (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700 font-medium">{item.name || 'Inovasi'}</span>
                          <span className="text-gray-900 font-semibold">{rating.toFixed(1)}/10</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-[#1CB5C4] h-2.5 rounded-full transition-all"
                            style={{ width: `${(rating / 10) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                  {(!analytics?.rating_per_inovasi || analytics.rating_per_inovasi.length === 0) && (
                    <div className="text-center text-gray-500 py-4">No data available</div>
                  )}
                </div>
              </div>
            </div>

            {/* Tables - Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Kepuasan Per Inovasi */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Kepuasan Per Inovasi</h2>
                <div className="space-y-2">
                  {analytics?.kepuasan_per_inovasi?.slice(0, 5).map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                      <span className="text-sm text-gray-700">{item.name}</span>
                      <span className="text-sm font-semibold text-gray-900">{item.count} feedback</span>
                    </div>
                  ))}
                  {(!analytics?.kepuasan_per_inovasi || analytics.kepuasan_per_inovasi.length === 0) && (
                    <div className="text-center text-gray-500 py-4">No data available</div>
                  )}
                </div>
              </div>

              {/* Kepuasan Per Unit */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Kepuasan Per Unit</h2>
                <div className="space-y-2">
                  {analytics?.kepuasan_per_unit?.slice(0, 5).map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                      <span className="text-sm text-gray-700">{item.name}</span>
                      <span className="text-sm font-semibold text-gray-900">{item.count} feedback</span>
                    </div>
                  ))}
                  {(!analytics?.kepuasan_per_unit || analytics.kepuasan_per_unit.length === 0) && (
                    <div className="text-center text-gray-500 py-4">No data available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminAnalytics;