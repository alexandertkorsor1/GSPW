import React, { useState } from 'react';
import { GraduationCap, Send } from 'lucide-react';
import ReportsTable from './ReportsTable';
import { useToast } from './Toast';
import './Admission.css';

const Admission = ({ reports = [], user, onPostAnnouncement }) => {
  const [msg, setMsg] = useState('');
  const { showToast } = useToast();

  const handleSend = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    onPostAnnouncement(msg, 'Admission');
    setMsg('');
    showToast('Notice successfully dispatched to Admission department.', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {user?.role === 'admin' && (
        <div className="card" style={{ backgroundColor: '#eef2ff', border: '1px solid #c7d2fe', padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#3730a3' }}>
            <Send size={18} /> Direct Notice to Admission Department
          </h3>
          <form onSubmit={handleSend} style={{ display: 'flex', gap: '1rem' }}>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Type an urgent instruction or notice for the Admission team..." 
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              style={{ flex: 1, backgroundColor: 'white' }}
              required
            />
            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5' }}>Dispatch Notice</button>
          </form>
        </div>
      )}

      <div className="card">
        <div className="adm-header">
          <div className="adm-icon-wrap">
            <GraduationCap size={32} color="#4f46e5" />
          </div>
          <div>
            <h2 className="adm-title">Admission Department</h2>
            <p className="adm-subtitle">Applications and enrollment pipeline</p>
          </div>
        </div>

        <div className="adm-stats-grid">
          <div className="adm-stat-card adm-card-total">
            <h4 className="adm-stat-label">Total Applicants</h4>
            <p className="adm-stat-value">4,250</p>
          </div>
          <div className="adm-stat-card adm-card-review">
            <h4 className="adm-stat-label">Under Review</h4>
            <p className="adm-stat-value">840</p>
          </div>
          <div className="adm-stat-card adm-card-enroll">
            <h4 className="adm-stat-label">Enrolled</h4>
            <p className="adm-stat-value">1,120</p>
          </div>
        </div>

        <div className="adm-info-box">
          <h3 className="adm-info-title">Current Enrollment Goals</h3>
          <p className="adm-info-text">Targeting 1,500 total enrollments for the upcoming autumn semester. International student applications are up 15% from last year.</p>
        </div>
      </div>

      <ReportsTable reports={reports} title="Admission Submissions History" />
    </div>
  );
};

export default Admission;
