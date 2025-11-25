import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Search, X } from 'lucide-react';
import api from '../api/axios';

const AdminResponses = () => {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await api.get('/feedbacks');
      setFeedbacks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus feedback ini?')) {
      try {
        await api.delete(`/feedbacks/${id}`);
        fetchFeedbacks();
      } catch (error) {
        console.error('Error deleting feedback:', error);
      }
    }
  };

  const exportToCSV = () => {
    const headers = ['Nama', 'NIP', 'Unit', 'Inovasi', 'Lama Inovasi', 'Kepuasan', 'Ketidakpuasan'];
    const csvData = feedbacks.map(f => [
      f.nama, f.nip, f.unit?.name || '', f.inovasi?.name || '',
      f.lama_inovasi, f.kepuasan_rating, f.ketidakpuasan_rating
    ]);
    const csv = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'feedbacks.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredFeedbacks = feedbacks.filter(f =>
    f.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.nip.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#F5F5F5', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div style={{ position: 'relative', zIndex: 10 }}>
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#1CB5C4">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
            </div>
            <div className="sidebar-logo-text">PLN<br/>Feedback</div>
          </div>
          
          <nav className="sidebar-nav">
            <button className="sidebar-nav-item active">
              <span style={{ fontSize: '1.25rem' }}>💬</span>
              <span>Feedback Response</span>
            </button>
            
            <button 
              onClick={() => navigate('/admin/analytics')}
              className="sidebar-nav-item"
            >
              <TrendingUp size={20} />
              <span>Analysis</span>
            </button>
          </nav>
        </div>

        <div className="sidebar-logout">
          <button
            onClick={() => {
              localStorage.removeItem('isAdminLoggedIn');
              localStorage.removeItem('adminUsername');
              navigate('/admin/login');
            }}
            className="sidebar-logout-btn"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', margin: 0 }}>
            Feedback Responses
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={exportToCSV}
              className="btn btn-secondary"
            >
              Export CSV
            </button>
            <div style={{ 
              width: '2.5rem', 
              height: '2.5rem', 
              background: '#E5E7EB', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <span style={{ color: '#6B7280', fontWeight: '600', fontSize: '0.875rem' }}>A</span>
            </div>
          </div>
        </header>

        {/* Search Bar */}
        <div style={{ 
          background: 'white', 
          borderBottom: '1px solid #E5E7EB', 
          padding: '1rem 2.5rem' 
        }}>
          <div style={{ position: 'relative', maxWidth: '28rem' }}>
            <Search 
              style={{ 
                position: 'absolute', 
                left: '1rem', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: '#9CA3AF' 
              }} 
              size={20} 
            />
            <input
              type="text"
              placeholder="Search by name or NIP..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '3rem' }}
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="admin-content">
          <div className="table-container">
            <table className="table">
              <thead className="table-header">
                <tr>
                  <th>NAMA</th>
                  <th>NIP</th>
                  <th>UNIT</th>
                  <th>INOVASI</th>
                  <th>DURASI</th>
                  <th className="text-center">KEPUASAN</th>
                  <th className="text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {filteredFeedbacks.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ 
                      padding: '3rem', 
                      textAlign: 'center', 
                      color: '#9CA3AF' 
                    }}>
                      Tidak ada data feedback
                    </td>
                  </tr>
                ) : (
                  filteredFeedbacks.map((feedback) => (
                    <tr key={feedback.id} className="table-row">
                      <td className="table-cell font-medium">{feedback.nama}</td>
                      <td className="table-cell text-gray-600">{feedback.nip}</td>
                      <td className="table-cell text-gray-600">
                        {feedback.unit?.name || '-'}
                      </td>
                      <td className="table-cell text-gray-600">
                        {feedback.inovasi?.name || '-'}
                      </td>
                      <td className="table-cell text-gray-600">{feedback.lama_inovasi}</td>
                      <td className="table-cell text-center">
                        <span className="badge badge-success">
                          {feedback.kepuasan_rating}/10
                        </span>
                      </td>
                      <td className="table-cell text-center">
                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                          <button
                            onClick={() => setSelectedFeedback(feedback)}
                            className="text-primary hover:underline"
                            style={{ 
                              background: 'none', 
                              border: 'none', 
                              cursor: 'pointer', 
                              fontWeight: '500',
                              fontSize: '0.875rem'
                            }}
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDelete(feedback.id)}
                            className="text-red-600 hover:underline"
                            style={{ 
                              background: 'none', 
                              border: 'none', 
                              cursor: 'pointer', 
                              fontWeight: '500',
                              fontSize: '0.875rem'
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {filteredFeedbacks.length > 0 && (
            <div style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: '#6B7280' }}>
              Showing {filteredFeedbacks.length} of {feedbacks.length} feedbacks
            </div>
          )}
        </div>
      </main>

      {/* Detail Modal */}
      {selectedFeedback && (
        <div className="modal-overlay" onClick={() => setSelectedFeedback(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Detail Feedback</h2>
              <button 
                onClick={() => setSelectedFeedback(null)} 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  color: '#9CA3AF',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                <div>
                  <label className="form-label">Nama</label>
                  <p style={{ color: '#111827', margin: 0 }}>{selectedFeedback.nama}</p>
                </div>
                <div>
                  <label className="form-label">NIP</label>
                  <p style={{ color: '#111827', margin: 0 }}>{selectedFeedback.nip}</p>
                </div>
                <div>
                  <label className="form-label">Unit</label>
                  <p style={{ color: '#111827', margin: 0 }}>{selectedFeedback.unit?.name || '-'}</p>
                </div>
                <div>
                  <label className="form-label">Inovasi</label>
                  <p style={{ color: '#111827', margin: 0 }}>{selectedFeedback.inovasi?.name || '-'}</p>
                </div>
                <div>
                  <label className="form-label">Lama Inovasi</label>
                  <p style={{ color: '#111827', margin: 0 }}>{selectedFeedback.lama_inovasi}</p>
                </div>
                <div>
                  <label className="form-label">Rating Kepuasan</label>
                  <span className="badge badge-success">{selectedFeedback.kepuasan_rating}/10</span>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <label className="form-label">Manfaat</label>
                <p style={{ 
                  color: '#111827', 
                  background: '#F9FAFB', 
                  padding: '0.875rem', 
                  borderRadius: '0.5rem',
                  margin: 0
                }}>
                  {selectedFeedback.manfaat || '-'}
                </p>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <label className="form-label">Rating Ketidakpuasan</label>
                <span className="badge badge-danger">{selectedFeedback.ketidakpuasan_rating}/10</span>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <label className="form-label">Kekurangan</label>
                <p style={{ 
                  color: '#111827', 
                  background: '#F9FAFB', 
                  padding: '0.875rem', 
                  borderRadius: '0.5rem',
                  margin: 0
                }}>
                  {selectedFeedback.kekurangan || '-'}
                </p>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <label className="form-label">Masukan</label>
                <p style={{ 
                  color: '#111827', 
                  background: '#F9FAFB', 
                  padding: '0.875rem', 
                  borderRadius: '0.5rem',
                  margin: 0
                }}>
                  {selectedFeedback.masukan || '-'}
                </p>
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setSelectedFeedback(null)} className="btn btn-ghost">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminResponses;