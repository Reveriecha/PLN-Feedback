import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simple authentication (HANYA UNTUK DEMO!)
    // Username: admin
    // Password: admin123
    
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        // Set token ke localStorage
        localStorage.setItem('isAdminLoggedIn', 'true');
        localStorage.setItem('adminUsername', username);
        
        // Redirect ke dashboard
        navigate('/admin/responses');
      } else {
        setError('Username atau password salah!');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#1A5D6D] flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        {/* Logo PLN */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-yellow-400 flex items-center justify-center relative">
            <svg width="60" height="40" viewBox="0 0 60 40">
              <path d="M 7 20 Q 16 11, 27 20 T 53 20" stroke="#1CB5C4" strokeWidth="5" fill="none"/>
              <path d="M 7 27 Q 16 18, 27 27 T 53 27" stroke="#1CB5C4" strokeWidth="5" fill="none"/>
              <path d="M 7 34 Q 16 25, 27 34 T 53 34" stroke="#1CB5C4" strokeWidth="5" fill="none"/>
            </svg>
            <svg className="absolute" width="27" height="54" viewBox="0 0 27 54">
              <path d="M 16 0 L 7 23 L 13 23 L 11 54 L 24 17 L 16 17 Z" fill="#EF4444"/>
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-2">Admin Login</h2>
        <p className="text-gray-600 text-center mb-6">PLN Feedback System</p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1CB5C4]"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1CB5C4]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1CB5C4] text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors disabled:bg-gray-400"
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/feedback')}
            className="text-[#1CB5C4] hover:underline text-sm"
          >
            ← Kembali ke Form Feedback
          </button>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-gray-100 rounded text-sm">
          <p className="font-semibold mb-1">Demo Credentials:</p>
          <p>Username: <code className="bg-white px-2 py-1 rounded">admin</code></p>
          <p>Password: <code className="bg-white px-2 py-1 rounded">admin123</code></p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;