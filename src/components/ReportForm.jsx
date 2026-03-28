import React, { useState } from 'react';
import { UploadCloud, CheckCircle } from 'lucide-react';

const ReportForm = ({ onSubmit, user }) => {
  const [formData, setFormData] = useState({
    title: '',
    department: user?.department || 'Financial',
    description: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Admins see all depts, Clients only see their own
  const departments = user?.role === 'admin' 
    ? ['Financial', 'Admission', 'Counseling', 'Operations', 'Marketing', 'Other']
    : [user?.department];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      
      setTimeout(() => {
        onSubmit(formData);
        setSubmitted(false);
        setFormData({ title: '', department: user?.department || 'Financial', description: '' });
      }, 1500);
      
    }, 1000);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="card">
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>Submit Departmental Report</h2>
          <p style={{ color: 'var(--text-muted)' }}>Fill out the details below to submit a new report for your department. All fields are required to ensure proper documentation.</p>
        </div>

        {submitted ? (
          <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #10b981', color: '#065f46', padding: '2rem', borderRadius: '12px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <CheckCircle size={48} color="#10b981" />
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Report Submitted Successfully!</h3>
              <p>Redirecting your workspace...</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="title">Report Title</label>
                <input 
                  type="text" 
                  id="title"
                  name="title"
                  className="form-control" 
                  placeholder="e.g., Q3 Monthly Audit" 
                  value={formData.title}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="department">Department</label>
                <select 
                  id="department"
                  name="department"
                  className="form-control"
                  value={formData.department}
                  onChange={handleChange}
                  disabled={user?.role !== 'admin'}
                  style={{ opacity: user?.role !== 'admin' ? 0.7 : 1, cursor: user?.role !== 'admin' ? 'not-allowed' : 'pointer'}}
                  required
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="description">Report Summary / Description</label>
              <textarea 
                id="description"
                name="description"
                className="form-control" 
                placeholder="Briefly describe the contents and context of this report..."
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label className="form-label">Attach File</label>
              <div style={{ 
                border: '2px dashed var(--border)', 
                borderRadius: '12px', 
                padding: '3rem 2rem', 
                textAlign: 'center',
                backgroundColor: 'var(--bg-main)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <UploadCloud size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
                <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>Click to upload or drag and drop</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>SVG, PNG, JPG, PDF or DOCX (max. 10MB)</p>
                <input type="file" style={{ display: 'none' }} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '1px solid var(--border)', marginTop: '2rem' }}>
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={isSubmitting}
                style={{ padding: '0.75rem 2rem', fontSize: '1rem', opacity: isSubmitting ? 0.7 : 1 }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReportForm;
