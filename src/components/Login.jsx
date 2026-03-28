import React, { useState } from 'react';
import { Building2, Lock, User, ShieldAlert, CheckCircle2 } from 'lucide-react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  
  // Password Reset States
  const [resetEmail, setResetEmail] = useState('');
  const [empId, setEmpId] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);
    
    // Simulate authentication process
    setTimeout(() => {
      const usersDb = [
        { email: 'admin@gspw1', pass: 'admingspw123', role: 'admin', name: 'Super Admin' },
        { email: 'finance@gspw1', pass: 'finance123', role: 'department', dept: 'Financial', name: 'Finance Rep' },
        { email: 'admission@gspw1', pass: 'admission123', role: 'department', dept: 'Admission', name: 'Admissions Rep' },
        { email: 'counseling@gspw1', pass: 'counseling123', role: 'department', dept: 'Counseling', name: 'Counseling Rep' },
        { email: 'operations@gspw1', pass: 'operations123', role: 'department', dept: 'Operations', name: 'Operations Rep' },
        { email: 'marketing@gspw1', pass: 'marketing123', role: 'department', dept: 'Marketing', name: 'Marketing Rep' }
      ];

      // Simulate authentication. We also allow 'newPassword' to simulate a successful password change!
      const foundUser = usersDb.find(u => u.email === email && (u.pass === password || (newPassword !== '' && password === newPassword)));
      
      if (foundUser) {
        onLogin({ role: foundUser.role, department: foundUser.dept, name: foundUser.name });
      } else {
        setError('Invalid email or password. Please try again.');
        setIsLoading(false);
      }
    }, 1200);
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      if(!resetEmail || !empId || !newPassword) {
        setError('Please fill in all security details to reset password.');
        return;
      }
      
      // Simulate Successful Security Reset
      setSuccess('Identity verified. Password successfully updated!');
      setIsResetMode(false);
      setEmail(resetEmail); // Auto-fill their email back on the login page
      setPassword(''); // Clear password so they type the new one
      
      // Clear reset form for next time
      setResetEmail('');
      setEmpId('');
    }, 1500);
  };

  // ------------------------------------------
  // RENDER FORGOT PASSWORD MODE
  // ------------------------------------------
  if (isResetMode) {
    return (
      <div className="login-container">
        <div className="login-box" style={{ animation: 'fadeIn 0.3s ease-out' }}>
          <div className="login-header">
            <div className="login-logo" style={{ backgroundColor: '#ef4444' }}>
              <ShieldAlert size={36} color="white" />
            </div>
            <h2>Password Recovery</h2>
            <p>Verify your identity to reset access</p>
          </div>

          {error && <div className="login-error" style={{ backgroundColor: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca' }}>{error}</div>}

          <form onSubmit={handleResetSubmit} className="login-form">
            <div className="form-group-custom">
              <label>Registered Email</label>
              <div className="input-with-icon">
                <User size={18} className="input-icon" />
                <input 
                  type="text" 
                  placeholder="e.g. admin@gspw1"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group-custom">
              <label>Employee Authorization Code</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input 
                  type="text" 
                  placeholder="e.g. EMP-9942"
                  value={empId}
                  onChange={(e) => setEmpId(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group-custom">
              <label>New Password</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input 
                  type="password" 
                  placeholder="Enter new secure password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="login-btn" style={{ backgroundColor: '#ef4444' }} disabled={isLoading}>
              {isLoading ? 'Verifying Identity...' : 'Update Password'}
            </button>
            
            <button 
              type="button" 
              onClick={() => { setIsResetMode(false); setError(''); }} 
              style={{ marginTop: '1.5rem', width: '100%', background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.9rem', cursor: 'pointer', textDecoration: 'underline' }}>
              Cancel and Return to Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ------------------------------------------
  // RENDER NORMAL LOGIN MODE
  // ------------------------------------------
  return (
    <div className="login-container">
      <div className="login-box" style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <div className="login-header">
          <div className="login-logo">
            <Building2 size={36} color="white" />
          </div>
          <h2>Globe Scholars Pathway</h2>
          <p>Organization Portal Sign In</p>
        </div>

        {error && <div className="login-error">{error}</div>}
        {success && (
          <div style={{ backgroundColor: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={18} /> {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group-custom">
            <label>Username / Email</label>
            <div className="input-with-icon">
              <User size={18} className="input-icon" />
              <input 
                type="text" 
                placeholder="e.g. admin@gspw1 or finance@gspw1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group-custom">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
               <label style={{ margin: 0 }}>Password</label>
               <button 
                  type="button" 
                  onClick={() => { setIsResetMode(true); setError(''); setSuccess(''); }} 
                  style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontSize: '0.85rem', cursor: 'pointer', fontWeight: '500' }}>
                  Forgot password?
                </button>
            </div>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p>Secure System Access • Authorized Personnel Only</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
