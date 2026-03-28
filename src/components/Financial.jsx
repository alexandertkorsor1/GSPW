import React, { useState } from 'react';
import { DollarSign, Send } from 'lucide-react';
import ReportsTable from './ReportsTable';
import './Financial.css';

const Financial = ({ reports = [], user, onPostAnnouncement }) => {
  const [msg, setMsg] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    onPostAnnouncement(msg, 'Financial');
    setMsg('');
    alert('Message sent directly to the Financial department!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {user?.role === 'admin' && (
        <div className="card" style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#166534' }}>
            <Send size={18} /> Direct Notice to Financial Department
          </h3>
          <form onSubmit={handleSend} style={{ display: 'flex', gap: '1rem' }}>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Type an urgent instruction or notice for the Financial team..." 
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              style={{ flex: 1, backgroundColor: 'white' }}
              required
            />
            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#16a34a', borderColor: '#16a34a' }}>Dispatch Notice</button>
          </form>
        </div>
      )}

      <div className="card">
        <div className="fin-header">
          <div className="fin-icon-wrap">
            <DollarSign size={32} color="#059669" />
          </div>
          <div>
            <h2 className="fin-title">Financial Department</h2>
            <p className="fin-subtitle">Budget, expenditures, and revenue tracking</p>
          </div>
        </div>
        
        <div className="fin-stats-grid">
          <div className="fin-stat-card fin-card-revenue">
            <h4 className="fin-stat-label">Total Revenue YTD</h4>
            <p className="fin-stat-value">$1.2M</p>
          </div>
          <div className="fin-stat-card fin-card-expenses">
            <h4 className="fin-stat-label">Total Expenses YTD</h4>
            <p className="fin-stat-value">$840K</p>
          </div>
          <div className="fin-stat-card fin-card-profit">
            <h4 className="fin-stat-label">Net Profit</h4>
            <p className="fin-stat-value">$360K</p>
          </div>
        </div>

        <div className="fin-info-box">
          <h3 className="fin-info-title">Recent Transactions</h3>
          <p className="fin-info-text">The complete ledger and individual transaction records are accessible by authorized financial personnel only. Please use the 'Submit Report' to file audits.</p>
        </div>
      </div>

      <ReportsTable reports={reports} title="Financial Submissions History" />
    </div>
  );
};

export default Financial;
