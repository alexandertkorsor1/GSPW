import React, { useState } from 'react';
import { FileText, CheckCircle, Clock, Download } from 'lucide-react';

const Dashboard = ({ reports, user }) => {
  const handleDownload = (report) => {
    alert(`File downloaded: ${report.title.replace(/\s+/g, '_')}_final.pdf\n\n(This is a demonstration of the file payload access feature)`);
  };

  const stats = [
    { label: 'Total Reports', value: reports.length, icon: <FileText size={24} color="var(--primary)" />, bg: 'var(--primary-light)' },
    { label: 'Approved', value: reports.filter(r => r.status === 'Approved').length, icon: <CheckCircle size={24} color="var(--success)" />, bg: '#d1fae5' },
    { label: 'Pending Review', value: reports.filter(r => r.status === 'Pending').length, icon: <Clock size={24} color="var(--warning)" />, bg: '#fef3c7' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {stats.map((stat, i) => (
          <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '12px', backgroundColor: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {stat.icon}
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '500', marginBottom: '0.25rem' }}>{stat.label}</p>
              <h3 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Reports Table */}
      <div className="card">
        <h3 className="card-title">{user?.role === 'admin' ? 'Recent Submissions' : 'My Submission History'}</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '1rem', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ID</th>
                <th style={{ padding: '1rem', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Title</th>
                <th style={{ padding: '1rem', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Department</th>
                <th style={{ padding: '1rem', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date</th>
                <th style={{ padding: '1rem', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                <th style={{ padding: '1rem', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background-color 0.2s' }}>
                  <td style={{ padding: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>#{report.id}</td>
                  <td style={{ padding: '1rem', fontWeight: '500' }}>{report.title}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ backgroundColor: 'var(--bg-main)', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '500' }}>
                      {report.department}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>{report.date}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600',
                      backgroundColor: report.status === 'Approved' ? '#d1fae5' : report.status === 'Reviewed' ? '#cffafe' : '#fef3c7',
                      color: report.status === 'Approved' ? '#065f46' : report.status === 'Reviewed' ? '#164e63' : '#92400e'
                    }}>
                      {report.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <button 
                      onClick={() => handleDownload(report)}
                      title="Download File Context"
                      style={{ padding: '0.5rem', borderRadius: '8px', color: 'var(--primary)', backgroundColor: 'var(--primary-light)', transition: 'all 0.2s', cursor: 'pointer', border: 'none' }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#dbeafe'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-light)'}
                    >
                      <Download size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {reports.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No reports submitted yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
