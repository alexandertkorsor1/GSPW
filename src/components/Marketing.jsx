import React, { useState } from 'react';
import { Megaphone, Send } from 'lucide-react';
import ReportsTable from './ReportsTable';
import { useToast } from './Toast';
import './Marketing.css';

const Marketing = ({ reports = [], user, onPostAnnouncement }) => {
  const [msg, setMsg] = useState('');
  const { showToast } = useToast();

  const handleSend = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    onPostAnnouncement(msg, 'Marketing');
    setMsg('');
    showToast('Notice successfully dispatched to Marketing department.', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {user?.role === 'admin' && (
        <div className="card" style={{ backgroundColor: '#fdf2f8', border: '1px solid #fbcfe8', padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9d174d' }}>
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
            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#db2777', borderColor: '#db2777' }}>Dispatch Notice</button>
          </form>
        </div>
      )}

      <div className="card">
        <div className="mar-header">
          <div className="mar-icon-wrap">
            <Megaphone size={32} color="#db2777" />
          </div>
          <div>
            <h2 className="mar-title">Marketing Department</h2>
            <p className="mar-subtitle">Digital outreach and brand management</p>
          </div>
        </div>

        <div className="mar-stats-grid">
          <div className="mar-stat-card mar-card-reach">
            <h4 className="mar-stat-label">Social Reach</h4>
            <p className="mar-stat-value">250K</p>
          </div>
          <div className="mar-stat-card mar-card-conversion">
            <h4 className="mar-stat-label">Conv. Rate</h4>
            <p className="mar-stat-value">3.2%</p>
          </div>
          <div className="mar-stat-card mar-card-leads">
            <h4 className="mar-stat-label">Direct Leads</h4>
            <p className="mar-stat-value">1,420</p>
          </div>
        </div>

        <div className="mar-info-box">
          <h3 className="mar-info-title">Global Outreach Strategy</h3>
          <p className="mar-info-text">Our new summer ad campaign is live across all platforms. Initial engagement metrics show a significant increase in international traffic.</p>
        </div>
      </div>

      <ReportsTable reports={reports} title="Marketing Submissions History" />
    </div>
  );
};

export default Marketing;
