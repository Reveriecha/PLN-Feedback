import React, { useState, useEffect } from 'react';
import { User, Briefcase, Lightbulb, Clock, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';
import api from '../api/axios';

const FeedbackForm = () => {
  const [units, setUnits] = useState([]);
  const [inovasis, setInovasis] = useState([]);
  const [formData, setFormData] = useState({
    nip: '',
    nama: '',
    unit_id: '',
    inovasi_id: '',
    lama_inovasi: '',
    kepuasan_rating: 0,
    manfaat: '',
    ketidakpuasan_rating: 0,
    kekurangan: '',
    masukan: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUnits();
    fetchInovasis();
  }, []);

  const fetchUnits = async () => {
    try {
      const response = await api.get('/units');
      setUnits(response.data);
    } catch (error) {
      console.error('Error fetching units:', error);
    }
  };

  const fetchInovasis = async () => {
    try {
      const response = await api.get('/inovasis');
      setInovasis(response.data);
    } catch (error) {
      console.error('Error fetching inovasis:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRatingClick = (field, rating) => {
    setFormData({
      ...formData,
      [field]: rating
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.kepuasan_rating === 0 || formData.ketidakpuasan_rating === 0) {
      setMessage('error:Mohon pilih rating kepuasan dan ketidakpuasan');
      return;
    }
    
    setLoading(true);
    setMessage('');

    try {
      await api.post('/feedbacks', formData);
      setMessage('success:Feedback berhasil dikirim! Terima kasih atas partisipasi Anda.');
      
      setFormData({
        nip: '',
        nama: '',
        unit_id: '',
        inovasi_id: '',
        lama_inovasi: '',
        kepuasan_rating: 0,
        manfaat: '',
        ketidakpuasan_rating: 0,
        kekurangan: '',
        masukan: ''
      });
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setMessage('error:' + (error.response?.data?.message || 'Gagal mengirim feedback'));
    } finally {
      setLoading(false);
    }
  };

  const RatingButtons = ({ rating, onRatingClick, label, icon: Icon }) => {
    return (
      <div className="rating-container">
        <label className="form-label">
          <Icon size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />
          {label}
          <span className="required-indicator">*</span>
        </label>
        <div className="rating-buttons">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => onRatingClick(num)}
              className={`rating-button ${num <= rating ? 'active' : ''}`}
            >
              {num}
            </button>
          ))}
        </div>
        <div className="rating-labels">
          <span>Sangat Tidak Puas</span>
          <span>Sangat Puas</span>
        </div>
      </div>
    );
  };

  return (
    <div className="feedback-page-container">
      <div className="content-layer">
        <div className="form-container">
          {/* Header */}
          <div className="form-header">
            <div className="logo-box">
              <svg width="70" height="50" viewBox="0 0 70 50" fill="none">
                {/* Logo PLN dengan petir merah */}
                <rect x="10" y="8" width="50" height="34" rx="4" fill="#1CB5C4"/>
                <path d="M 12 15 Q 20 10, 30 15 T 58 15" stroke="white" strokeWidth="3" fill="none"/>
                <path d="M 12 20 Q 20 15, 30 20 T 58 20" stroke="white" strokeWidth="3" fill="none"/>
                <path d="M 12 25 Q 20 20, 30 25 T 58 25" stroke="white" strokeWidth="3" fill="none"/>
                <path d="M 30 5 L 24 18 L 29 18 L 27 35 L 38 15 L 32 15 Z" fill="#EF4444"/>
              </svg>
            </div>
            <h1 className="form-title">PLN Feedback System</h1>
            <p className="form-subtitle">Berikan masukan Anda untuk perbaikan berkelanjutan</p>
          </div>

          {/* Messages */}
          {message && (
            <div className={message.startsWith('error:') ? 'error-message' : 'success-message'}>
              {message.replace('error:', '').replace('success:', '')}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Section 1: Informasi Pribadi */}
            <div className="form-section">
              <div className="section-header">
                <User className="section-icon" size={20} />
                <h3>Informasi Pribadi</h3>
              </div>

              <div className="form-group">
                <label className="form-label">
                  NIP<span className="required">*</span>
                </label>
                <div className="input-wrapper">
                  <User className="input-icon" size={18} />
                  <input
                    type="text"
                    name="nip"
                    value={formData.nip}
                    onChange={handleInputChange}
                    placeholder="Masukkan NIP Anda"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Nama Lengkap<span className="required">*</span>
                </label>
                <div className="input-wrapper">
                  <User className="input-icon" size={18} />
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama lengkap"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Unit Kerja<span className="required">*</span>
                </label>
                <div className="input-wrapper">
                  <Briefcase className="input-icon" size={18} />
                  <select
                    name="unit_id"
                    value={formData.unit_id}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    <option value="">Pilih Unit Kerja</option>
                    {units.map((unit) => (
                      <option key={unit.id} value={unit.id}>{unit.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Informasi Inovasi */}
            <div className="form-section">
              <div className="section-header">
                <Lightbulb className="section-icon" size={20} />
                <h3>Informasi Inovasi</h3>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Nama Inovasi<span className="required">*</span>
                </label>
                <div className="input-wrapper">
                  <Lightbulb className="input-icon" size={18} />
                  <select
                    name="inovasi_id"
                    value={formData.inovasi_id}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    <option value="">Pilih Inovasi</option>
                    {inovasis.map((inovasi) => (
                      <option key={inovasi.id} value={inovasi.id}>{inovasi.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Lama Implementasi<span className="required">*</span>
                </label>
                <div className="input-wrapper">
                  <Clock className="input-icon" size={18} />
                  <input
                    type="text"
                    name="lama_inovasi"
                    value={formData.lama_inovasi}
                    onChange={handleInputChange}
                    placeholder="Contoh: 6 bulan"
                    className="form-input"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Evaluasi Kepuasan */}
            <div className="form-section">
              <div className="section-header">
                <ThumbsUp className="section-icon" size={20} />
                <h3>Evaluasi Kepuasan</h3>
              </div>

              <RatingButtons
                rating={formData.kepuasan_rating}
                onRatingClick={(rating) => handleRatingClick('kepuasan_rating', rating)}
                label="Tingkat Kepuasan"
                icon={ThumbsUp}
              />

              <div className="form-group">
                <label className="form-label">
                  <MessageSquare size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Manfaat yang Dirasakan
                </label>
                <textarea
                  name="manfaat"
                  value={formData.manfaat}
                  onChange={handleInputChange}
                  placeholder="Ceritakan manfaat yang Anda rasakan..."
                  className="form-textarea"
                ></textarea>
              </div>
            </div>

            {/* Section 4: Area Perbaikan */}
            <div className="form-section">
              <div className="section-header">
                <ThumbsDown className="section-icon" size={20} />
                <h3>Area Perbaikan</h3>
              </div>

              <RatingButtons
                rating={formData.ketidakpuasan_rating}
                onRatingClick={(rating) => handleRatingClick('ketidakpuasan_rating', rating)}
                label="Tingkat Ketidakpuasan"
                icon={ThumbsDown}
              />

              <div className="form-group">
                <label className="form-label">
                  <MessageSquare size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Kekurangan yang Ditemukan
                </label>
                <textarea
                  name="kekurangan"
                  value={formData.kekurangan}
                  onChange={handleInputChange}
                  placeholder="Jelaskan kekurangan yang ditemukan..."
                  className="form-textarea"
                ></textarea>
              </div>
            </div>

            {/* Section 5: Saran Perbaikan */}
            <div className="form-section">
              <div className="section-header">
                <MessageSquare className="section-icon" size={20} />
                <h3>Saran Perbaikan</h3>
              </div>

              <div className="form-group">
                <label className="form-label">Masukan untuk Perkembangan</label>
                <textarea
                  name="masukan"
                  value={formData.masukan}
                  onChange={handleInputChange}
                  placeholder="Berikan saran Anda..."
                  className="form-textarea"
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Mengirim...' : 'Kirim Feedback'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;