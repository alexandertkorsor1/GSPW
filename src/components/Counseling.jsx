import React, { useState } from 'react';
import { Heart, Send } from 'lucide-react';
import ReportsTable from './ReportsTable';
import { useToast } from './Toast';
import './Counseling.css';

const Counseling = ({ reports = [], user, onPostAnnouncement }) => {
  const [msg, setMsg] = useState('');
  const { showToast } = useToast();

  const handleSend = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    onPostAnnouncement(msg, 'Counseling');
    setMsg('');
    showToast('Notice successfully dispatched to Counseling department.', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {user?.role === 'admin' && (
        <div className="card" style={{ backgroundColor: '#fff1f2', border: '1px solid #fecdd3', padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9f1239' }}>
            <Send size={18} /> Direct Notice to Counseling Department
          </h3>
          <form onSubmit={handleSend} style={{ display: 'flex', gap: '1rem' }}>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Type an urgent instruction or notice for the Counseling team..." 
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              style={{ flex: 1, backgroundColor: 'white' }}
              required
            />
            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#e11d48', borderColor: '#e11d48' }}>Dispatch Notice</button>
          </form>
        </div>
      )}

      <div className="card">
        <div className="cou-header">
          <div className="cou-icon-wrap">
            <Heart size={32} color="#e11d48" />
          </div>
          <div>
            <h2 className="cou-title">Counseling Department</h2>
            <p className="cou-subtitle">Student wellness and academic support</p>
          </div>
        </div>

        <div className="cou-stats-grid">
          <div className="cou-stat-card cou-card-sessions">
            <h4 className="cou-stat-label">Active Cases</h4>
            <p className="cou-stat-value">156</p>
          </div>
          <div className="cou-stat-card cou-card-pending">
            <h4 className="cou-stat-label">New Requests</h4>
            <p className="cou-stat-value">12</p>
          </div>
          <div className="cou-stat-card cou-card-complete">
            <h4 className="cou-stat-label">Completed (Mo)</h4>
            <p className="cou-stat-value">84</p>
          </div>
        </div>

        <div className="cou-info-box">
          <h3 className="cou-info-title">Student Wellness Program</h3>
          <p className="cou-info-text">The mental health awareness workshop has been attended by over 400 students this semester. Academic probation counseling sessions are ongoing.</p>
        </div>
      </div>

      <ReportsTable reports={reports} title="Counseling Submissions History" />
    </div>
  );
};

export default Counseling;
