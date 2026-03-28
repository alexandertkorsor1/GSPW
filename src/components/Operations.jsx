import React, { useState } from 'react';
import { Wrench, Send } from 'lucide-react';
import ReportsTable from './ReportsTable';
import './Operations.css';

const Operations = ({ reports = [], user, onPostAnnouncement }) => {
  const [msg, setMsg] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    onPostAnnouncement(msg, 'Operations');
    setMsg('');
    alert('Message sent directly to the Operations department!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {user?.role === 'admin' && (
        <div className="card" style={{ backgroundColor: '#fff7ed', border: '1px solid #fed7aa', padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9a3412' }}>
            <Send size={18} /> Direct Notice to Operations Department
          </h3>
          <form onSubmit={handleSend} style={{ display: 'flex', gap: '1rem' }}>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Type an urgent instruction or notice for the Operations team..." 
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              style={{ flex: 1, backgroundColor: 'white' }}
              required
            />
            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#ea580c', borderColor: '#ea580c' }}>Dispatch Notice</button>
          </form>
        </div>
      )}

      <div className="card">
        <div className="ops-header">
          <div className="ops-icon-wrap">
            <Wrench size={32} color="#ea580c" />
          </div>
          <div>
            <h2 className="ops-title">Operations Department</h2>
            <p className="ops-subtitle">Facilities, infrastructure, and IT systems</p>
          </div>
        </div>

        <div className="ops-stats-grid">
          <div className="ops-stat-card ops-card-tickets">
            <h4 className="ops-stat-label">Tickets Open</h4>
            <p className="ops-stat-value">24</p>
          </div>
          <div className="ops-stat-card ops-card-resolved">
            <h4 className="ops-stat-label">Resolved (Week)</h4>
            <p className="ops-stat-value">118</p>
          </div>
          <div className="ops-stat-card ops-card-uptime">
            <h4 className="ops-stat-label">System Uptime</h4>
            <p className="ops-stat-value">99.9%</p>
          </div>
        </div>

        <div className="ops-info-box">
          <h3 className="ops-info-title">Maintenance Schedule</h3>
          <p className="ops-info-text">Routine campus HVAC maintenance will begin next Monday. Server backup logs show complete success with no errors over the last 30 days.</p>
        </div>
      </div>

      <ReportsTable reports={reports} title="Operations Submissions History" />
    </div>
  );
};

export default Operations;
