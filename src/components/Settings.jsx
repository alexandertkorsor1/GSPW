import React, { useState } from 'react';
import { User, Lock, Palette, Save, CheckCircle2 } from 'lucide-react';

const Settings = ({ user }) => {
  const [success, setSuccess] = useState('');
  
  // Forms
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    setSuccess('Security credentials successfully updated.');
    setCurrentPassword('');
    setNewPassword('');
    setTimeout(() => setSuccess(''), 3000);
  };

  const changeTheme = (theme) => {
    const root = document.documentElement;
    if (theme === 'blue') {
      root.style.setProperty('--primary', '#2563eb');
      root.style.setProperty('--primary-hover', '#1d4ed8');
      root.style.setProperty('--primary-light', '#eff6ff');
    } else if (theme === 'emerald') {
      root.style.setProperty('--primary', '#10b981');
      root.style.setProperty('--primary-hover', '#059669');
      root.style.setProperty('--primary-light', '#ecfdf5');
    } else if (theme === 'purple') {
      root.style.setProperty('--primary', '#8b5cf6');
      root.style.setProperty('--primary-hover', '#7c3aed');
      root.style.setProperty('--primary-light', '#f5f3ff');
    } else if (theme === 'rose') {
      root.style.setProperty('--primary', '#f43f5e');
      root.style.setProperty('--primary-hover', '#e11d48');
      root.style.setProperty('--primary-light', '#fff1f2');
    } else if (theme === 'dark') {
      root.style.setProperty('--sidebar-bg', '#000000');
      root.style.setProperty('--sidebar-hover', '#222222');
    } else if (theme === 'light') {
      root.style.setProperty('--sidebar-bg', '#0f172a');
      root.style.setProperty('--sidebar-hover', '#1e293b');
    }
    setSuccess(`Application theme updated successfully.`);
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
      {success && (
        <div style={{ backgroundColor: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <CheckCircle2 size={20} color="#10b981" /> 
          <span style={{ fontWeight: '500' }}>{success}</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        
        {/* Profile Card */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
            <div style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '0.5rem', borderRadius: '8px' }}>
              <User size={20} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-main)' }}>Profile Overview</h3>
          </div>
          <div style={{ display: 'grid', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name</label>
              <div style={{ fontSize: '1.05rem', fontWeight: '500', marginTop: '0.25rem' }}>{user.name}</div>
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Department Assignment</label>
              <div style={{ fontSize: '1.05rem', fontWeight: '500', marginTop: '0.25rem' }}>{user.department || 'Executive Administration'}</div>
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Security Access Level</label>
              <div>
                <div style={{ display: 'inline-block', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '0.35rem 0.85rem', borderRadius: '99px', fontSize: '0.85rem', fontWeight: '700', marginTop: '0.5rem', border: '1px solid var(--primary)' }}>
                  {user.role === 'admin' ? 'System Administrator' : 'Department Representative'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Card */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
            <div style={{ backgroundColor: '#fff1f2', color: '#e11d48', padding: '0.5rem', borderRadius: '8px' }}>
              <Lock size={20} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-main)' }}>Security & Password</h3>
          </div>
          <form onSubmit={handlePasswordUpdate}>
            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label className="form-label" style={{ fontSize: '0.9rem', fontWeight: '600' }}>Current Password</label>
              <input type="password" required className="form-control" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} placeholder="Enter current password" />
            </div>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label" style={{ fontSize: '0.9rem', fontWeight: '600' }}>New Password</label>
              <input type="password" required minLength="8" className="form-control" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Minimum 8 characters" />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '44px', fontWeight: '600' }}>
              <Save size={18} /> Update Password
            </button>
          </form>
        </div>

        {/* Appearance Card */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
            <div style={{ backgroundColor: '#f5f3ff', color: '#7c3aed', padding: '0.5rem', borderRadius: '8px' }}>
              <Palette size={20} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-main)' }}>Platform Appearance</h3>
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <label className="form-label" style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.75rem', display: 'block' }}>Primary Brand Color</label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                title="Ocean Blue" 
                onClick={() => changeTheme('blue')} 
                style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#2563eb', border: '3px solid white', boxShadow: '0 2px 8px rgba(37, 99, 235, 0.4)', cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}></button>
              
              <button 
                title="Emerald Green" 
                onClick={() => changeTheme('emerald')} 
                style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#10b981', border: '3px solid white', boxShadow: '0 2px 8px rgba(16, 185, 129, 0.4)', cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}></button>
              
              <button 
                title="Royal Purple" 
                onClick={() => changeTheme('purple')} 
                style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#8b5cf6', border: '3px solid white', boxShadow: '0 2px 8px rgba(139, 92, 246, 0.4)', cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}></button>
              
              <button 
                title="Crimson Rose" 
                onClick={() => changeTheme('rose')} 
                style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#f43f5e', border: '3px solid white', boxShadow: '0 2px 8px rgba(244, 63, 94, 0.4)', cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}></button>
            </div>
          </div>

          <div>
            <label className="form-label" style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.75rem', display: 'block' }}>Sidebar Contrast Theme</label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => changeTheme('light')} className="btn btn-outline" style={{ flex: 1, fontWeight: '600', height: '44px' }}>Standard Navy</button>
              <button onClick={() => changeTheme('dark')} className="btn" style={{ flex: 1, backgroundColor: '#000000', color: 'white', fontWeight: '600', height: '44px' }}>Midnight Black</button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Settings;
