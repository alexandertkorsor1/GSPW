import React, { useState } from 'react';
import { Lock, User, KeyRound, CheckCircle2, ArrowLeft, Mail, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import logoImage from './Globesholar.jpeg';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Password Visibility States
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password Reset States (0 = Login, 1 = Enter Email, 2 = Enter OTP, 3 = New Password)
  const [resetStep, setResetStep] = useState(0);
  const [resetEmail, setResetEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // -------------------------------------
  // MAIN LOGIN HANDLER
  // -------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);
    
    setTimeout(() => {
      const usersDb = [
        { email: 'admin@gspw1', pass: 'admingspw123', role: 'admin', name: 'Super Admin' },
        { email: 'finance@gspw1', pass: 'finance123', role: 'department', dept: 'Financial', name: 'Finance Rep' },
        { email: 'admission@gspw1', pass: 'admission123', role: 'department', dept: 'Admission', name: 'Admissions Rep' },
        { email: 'counsel@gspw1', pass: 'counsel123', role: 'department', dept: 'Counseling', name: 'Counseling Rep' },
        { email: 'operation@gspw1', pass: 'operation123', role: 'department', dept: 'Operations', name: 'Operations Rep' },
        { email: 'market@gspw1', pass: 'market123', role: 'department', dept: 'Marketing', name: 'Marketing Rep' }
      ];

      // Simulate authentication allowing newPassword if successfully changed
      const foundUser = usersDb.find(u => u.email === email && (u.pass === password || (newPassword !== '' && password === newPassword)));
      
      if (foundUser) {
        onLogin({ role: foundUser.role, department: foundUser.dept, name: foundUser.name });
      } else {
        setError('Invalid credentials. Please verify your email and password.');
        setIsLoading(false);
      }
    }, 1200);
  };

  // -------------------------------------
  // RESET FLOW HANDLERS
  // -------------------------------------
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (!resetEmail.includes('@')) {
        setError('Please enter a valid work email address.');
        return;
      }
      // Fakes sending an OTP Email
      setResetStep(2);
    }, 1500);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (otpCode.length < 5) {
        setError('Invalid OTP code. Please check your email and try again.');
        return;
      }
      setResetStep(3);
    }, 1200);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (newPassword.length < 8) {
        setError('Password must be at least 8 characters long.');
        return;
      }
      if (newPassword !== confirmPassword) {
        setError('Passwords do not match. Please try again.');
        return;
      }
      
      // Complete!
      setSuccess('Your password has been successfully updated. Please sign in with your new credentials.');
      setResetStep(0);
      setEmail(resetEmail);
      setPassword('');
      setResetEmail('');
      setOtpCode('');
      setConfirmPassword('');
    }, 1500);
  };

  const cancelReset = () => {
    setResetStep(0);
    setError('');
    setResetEmail('');
    setOtpCode('');
  };

  // -------------------------------------
  // RENDER: PASSWORD RESET FLOW
  // -------------------------------------
  if (resetStep > 0) {
    return (
      <div className="login-container">
        <div className="login-box" style={{ animation: 'fadeIn 0.3s ease-out', maxWidth: '440px', padding: '3rem 2.5rem' }}>
          
          <button 
            type="button"
            onClick={cancelReset}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '0.9rem', cursor: 'pointer', marginBottom: '2rem', padding: 0, fontWeight: '600', transition: 'color 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-main)'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
            <ArrowLeft size={16} /> Cancel Recovery
          </button>

          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ backgroundColor: 'var(--primary-light)', width: '56px', height: '56px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              {resetStep === 1 && <KeyRound size={28} color="var(--primary)" />}
              {resetStep === 2 && <Mail size={28} color="var(--primary)" />}
              {resetStep === 3 && <ShieldCheck size={28} color="var(--primary)" />}
            </div>
            
            <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.5rem', lineHeight: '1.2' }}>
              {resetStep === 1 && "Reset password"}
              {resetStep === 2 && "Enter Secure OTP"}
              {resetStep === 3 && "Create New Password"}
            </h2>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
              {resetStep === 1 && "Please enter your registered work email. We will send a secure One-Time Password (OTP) to verify your identity."}
              {resetStep === 2 && `We've sent a 6-digit confirmation code to ${resetEmail}. Please enter it below to continue.`}
              {resetStep === 3 && "Your identity has been verified. Please create a strong new password to secure your account."}
            </p>
          </div>

          {error && <div className="login-error" style={{ marginBottom: '1.5rem' }}>{error}</div>}

          {/* STEP 1: EMAIL */}
          {resetStep === 1 && (
            <form onSubmit={handleEmailSubmit} className="login-form">
              <div className="form-group-custom" style={{ marginBottom: '2rem' }}>
                <label>Registered Work Email</label>
                <div className="input-with-icon">
                  <User size={18} className="input-icon" />
                  <input 
                    type="email" 
                    placeholder="name@gspw1"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="login-btn" disabled={isLoading} style={{ height: '52px', fontSize: '1.05rem', borderRadius: '10px' }}>
                {isLoading ? 'Sending Code...' : 'Send OTP Code'}
              </button>
            </form>
          )}

          {/* STEP 2: OTP */}
          {resetStep === 2 && (
            <form onSubmit={handleOtpSubmit} className="login-form">
              <div className="form-group-custom" style={{ marginBottom: '2rem' }}>
                <label>Secure OTP Code</label>
                <div className="input-with-icon">
                  <Lock size={18} className="input-icon" />
                  <input 
                    type="text" 
                    placeholder="e.g. 529184"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    required
                    maxLength={8}
                    style={{ letterSpacing: '2px', fontWeight: 'bold' }}
                  />
                </div>
              </div>
              <button type="submit" className="login-btn" disabled={isLoading} style={{ height: '52px', fontSize: '1.05rem', borderRadius: '10px' }}>
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>
          )}

          {/* STEP 3: NEW PASSWORD */}
          {resetStep === 3 && (
            <form onSubmit={handlePasswordSubmit} className="login-form">
              <div className="form-group-custom">
                <label>New Secure Password</label>
                <div className="input-with-icon">
                  <Lock size={18} className="input-icon" />
                  <input 
                    type={showNewPassword ? "text" : "password"} 
                    placeholder="Enter a strong password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={8}
                    style={{ paddingRight: '2.5rem' }}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    style={{ position: 'absolute', right: '12px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="form-group-custom" style={{ marginBottom: '2rem' }}>
                <label>Confirm Password</label>
                <div className="input-with-icon">
                  <ShieldCheck size={18} className="input-icon" />
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="Repeat new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={8}
                    style={{ paddingRight: '2.5rem' }}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{ position: 'absolute', right: '12px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <button type="submit" className="login-btn" disabled={isLoading} style={{ height: '52px', fontSize: '1.05rem', borderRadius: '10px' }}>
                {isLoading ? 'Updating System...' : 'Confirm New Password'}
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // -------------------------------------
  // RENDER: NORMAL LOGIN 
  // -------------------------------------
  return (
    <div className="login-container">
      <div className="login-box" style={{ animation: 'fadeIn 0.3s ease-out', maxWidth: '440px', padding: '3rem 2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ backgroundColor: 'white', width: '72px', height: '72px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', padding: '6px' }}>
            <img src={logoImage} alt="Globe Scholars Pathway" style={{ width: '100%', height: '100%', borderRadius: '12px', objectFit: 'contain' }} />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Sign in to the Globe Scholars Pathway Portal</p>
        </div>

        {error && <div className="login-error" style={{ marginBottom: '1.5rem' }}>{error}</div>}
        {success && (
          <div style={{ backgroundColor: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem', fontSize: '0.9rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', lineHeight: '1.4' }}>
            <CheckCircle2 size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} /> 
            <span style={{ fontWeight: '500' }}>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group-custom">
            <label>Work Email</label>
            <div className="input-with-icon">
              <User size={18} className="input-icon" />
              <input 
                type="text" 
                placeholder="name@gspw1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group-custom" style={{ marginBottom: '2rem' }}>
            <label>Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ paddingRight: '2.5rem' }}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '12px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="login-btn" disabled={isLoading} style={{ height: '52px', fontSize: '1.05rem', borderRadius: '10px', marginTop: '0.5rem' }}>
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </button>
          
          <div style={{ textAlign: 'center', marginTop: '1.75rem' }}>
            <button 
              type="button" 
              onClick={() => { setResetStep(1); setError(''); setSuccess(''); }} 
              style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontSize: '0.95rem', cursor: 'pointer', fontWeight: '600', transition: 'color 0.2s', letterSpacing: '0.01em' }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary-hover)'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--primary)'}>
              Forgot your password?
            </button>
          </div>
        </form>

        <div style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Secure System Access • Authorized Personnel Only</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
