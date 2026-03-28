import React, { useState } from 'react';
import { Heart, Send } from 'lucide-react';
import ReportsTable from './ReportsTable';
import './Counseling.css';

const Counseling = ({ reports = [], user, onPostAnnouncement }) => {
  const [msg, setMsg] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    onPostAnnouncement(msg, 'Counseling');
    setMsg('');
    alert('Message sent directly to the Counseling department!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {user?.role === 'admin' && (
        <div className="card" style={{ backgroundColor: '#fdf4ff', border: '1px solid #f5d0fe', padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#86198f' }}>
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
            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#c026d3', borderColor: '#c026d3' }}>Dispatch Notice</button>
          </form>
        </div>
      )}

      <div className="card">
        <div className="cns-header">
          <div className="cns-icon-wrap">
            <Heart size={32} color="#c026d3" />
          </div>
          <div>
            <h2 className="cns-title">Counseling Department</h2>
            <p className="cns-subtitle">Student wellness and mental health support</p>
          </div>
        </div>

        <div className="cns-stats-grid">
          <div className="cns-stat-card cns-card-weekly">
            <h4 className="cns-stat-label">Sessions This Week</h4>
            <p className="cns-stat-value">145</p>
          </div>
          <div className="cns-stat-card cns-card-cases">
            <h4 className="cns-stat-label">Active Cases</h4>
            <p className="cns-stat-value">38</p>
          </div>
          <div className="cns-stat-card cns-card-today">
            <h4 className="cns-stat-label">Today's Appts</h4>
            <p className="cns-stat-value">12</p>
          </div>
        </div>

        <div className="cns-info-box">
          <h3 className="cns-info-title">Department Update</h3>
          <p className="cns-info-text">The new "Peer Support Network" initiative has successfully onboarded 50 student volunteers. Satisfaction with counseling services remains well above benchmark.</p>
        </div>
      </div>

      <ReportsTable reports={reports} title="Counseling Submissions History" />
    </div>
  );
};

export default Counseling;
