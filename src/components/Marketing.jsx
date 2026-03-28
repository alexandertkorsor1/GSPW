import React, { useState } from 'react';
import { Megaphone, Send } from 'lucide-react';
import ReportsTable from './ReportsTable';
import './Marketing.css';

const Marketing = ({ reports = [], user, onPostAnnouncement }) => {
  const [msg, setMsg] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    onPostAnnouncement(msg, 'Marketing');
    setMsg('');
    alert('Message sent directly to the Marketing department!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {user?.role === 'admin' && (
        <div className="card" style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#991b1b' }}>
            <Send size={18} /> Direct Notice to Marketing Department
          </h3>
          <form onSubmit={handleSend} style={{ display: 'flex', gap: '1rem' }}>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Type an urgent instruction or notice for the Marketing team..." 
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              style={{ flex: 1, backgroundColor: 'white' }}
              required
            />
            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#dc2626', borderColor: '#dc2626' }}>Dispatch Notice</button>
          </form>
        </div>
      )}

      <div className="card">
        <div className="mkt-header">
          <div className="mkt-icon-wrap">
            <Megaphone size={32} color="#dc2626" />
          </div>
          <div>
            <h2 className="mkt-title">Marketing Department</h2>
            <p className="mkt-subtitle">Outreach, public relations, and campaigns</p>
          </div>
        </div>

        <div className="mkt-stats-grid">
          <div className="mkt-stat-card mkt-card-reach">
            <h4 className="mkt-stat-label">Total Reach (Q1)</h4>
            <p className="mkt-stat-value">1.4M</p>
          </div>
          <div className="mkt-stat-card mkt-card-campaigns">
            <h4 className="mkt-stat-label">Active Campaigns</h4>
            <p className="mkt-stat-value">3</p>
          </div>
          <div className="mkt-stat-card mkt-card-roi">
            <h4 className="mkt-stat-label">Average Ad ROI</h4>
            <p className="mkt-stat-value">225%</p>
          </div>
        </div>

        <div className="mkt-info-box">
          <h3 className="mkt-info-title">Current Campaigns</h3>
          <p className="mkt-info-text">The "Future Leaders" social media push is outperforming expectations by 30%. The email newsletter open rates are holding steady at 24%.</p>
        </div>
      </div>

      <ReportsTable reports={reports} title="Marketing Submissions History" />
    </div>
  );
};

export default Marketing;
