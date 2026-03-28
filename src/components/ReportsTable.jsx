import React from 'react';
import { Download } from 'lucide-react';

const ReportsTable = ({ reports, title = "Recent Submissions" }) => {
  const handleDownload = (report) => {
    alert(`File downloaded: ${report.title.replace(/\s+/g, '_')}_final.pdf\n\n(This is a demonstration of the file payload access feature)`);
  };

  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
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
  );
};

export default ReportsTable;
