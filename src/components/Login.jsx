import React, { useState } from 'react';
import { Building2, Lock, User } from 'lucide-react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
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

      const foundUser = usersDb.find(u => u.email === email && u.pass === password);
      
      if (foundUser) {
        onLogin({ role: foundUser.role, department: foundUser.dept, name: foundUser.name });
      } else {
        setError('Invalid email or password. Please try again.');
        setIsLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <div className="login-logo">
            <Building2 size={36} color="white" />
          </div>
          <h2>Globe Scholars Pathway</h2>
          <p>Organization Portal Sign In</p>
        </div>

        {error && <div className="login-error">{error}</div>}

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
            <label>Password</label>
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
