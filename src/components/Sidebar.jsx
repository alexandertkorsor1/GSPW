import React from 'react';
import { LayoutDashboard, FilePlus, DollarSign, GraduationCap, Heart, Wrench, Settings, LogOut, Megaphone, Clock, Bell, X } from 'lucide-react';
import logoImage from './Globesholar.jpeg';

const Sidebar = ({ activeTab, setActiveTab, onLogout, user, isOpen, setIsOpen }) => {
  
  const handleMobileNav = (tabId) => {
    setActiveTab(tabId);
    if (setIsOpen) setIsOpen(false);
  };

  const getBtnStyle = (tabId) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.85rem 1rem',
    borderRadius: '8px',
    color: activeTab === tabId ? 'var(--sidebar-text-active)' : 'inherit',
    backgroundColor: activeTab === tabId ? 'var(--primary)' : 'transparent',
    transition: 'all 0.2s',
    textAlign: 'left',
    width: '100%',
    fontWeight: activeTab === tabId ? '600' : '500'
  });

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`} style={{
      width: '280px',
      backgroundColor: 'var(--sidebar-bg)',
      color: 'var(--sidebar-text)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.3s ease',
      overflowY: 'auto'
    }}>
      <div style={{ padding: '2rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ backgroundColor: 'white', padding: '0.25rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <img src={logoImage} alt="Globe Scholars Pathway Logo" style={{ width: '30px', height: '30px', borderRadius: '4px', objectFit: 'contain' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'white', lineHeight: '1.2' }}>Globe Scholars<br/>Pathway</h1>
          </div>
        </div>
        
        <button className="close-sidebar-btn" onClick={() => setIsOpen(false)}>
          <X size={24} />
        </button>
      </div>

      <nav style={{ flex: 1, padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem', paddingLeft: '0.5rem' }}>Workspace</p>
        
        {user?.role === 'admin' ? (
          <button onClick={() => handleMobileNav('dashboard')} style={getBtnStyle('dashboard')}>
            <LayoutDashboard size={20} />
            Global Dashboard
          </button>
        ) : (
          <button onClick={() => handleMobileNav('dashboard')} style={getBtnStyle('dashboard')}>
            <Clock size={20} />
            My Submissions
          </button>
        )}
        
        <button onClick={() => handleMobileNav('notifications')} style={getBtnStyle('notifications')}>
          <Bell size={20} />
          Notification Box
        </button>
        
        <button onClick={() => handleMobileNav('submit')} style={getBtnStyle('submit')}>
          <FilePlus size={20} />
          Submit Report
        </button>

        {user?.role === 'admin' && (
          <>
            <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginTop: '1.5rem', marginBottom: '0.5rem', paddingLeft: '0.5rem' }}>Departments</p>
            <button onClick={() => handleMobileNav('financial')} style={getBtnStyle('financial')}>
              <DollarSign size={20} /> Financial
            </button>
            <button onClick={() => handleMobileNav('admission')} style={getBtnStyle('admission')}>
              <GraduationCap size={20} /> Admission
            </button>
            <button onClick={() => handleMobileNav('counseling')} style={getBtnStyle('counseling')}>
              <Heart size={20} /> Counseling
            </button>
            <button onClick={() => handleMobileNav('operations')} style={getBtnStyle('operations')}>
              <Wrench size={20} /> Operations
            </button>
            <button onClick={() => handleMobileNav('marketing')} style={getBtnStyle('marketing')}>
              <Megaphone size={20} /> Marketing
            </button>
          </>
        )}
      </nav>

      <div style={{ padding: '1.5rem 1rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <button onClick={() => handleMobileNav('settings')} style={getBtnStyle('settings')}>
          <Settings size={20} />
          Settings
        </button>
        <button onClick={onLogout} style={{ ...getBtnStyle('logout'), color: '#fca5a5' }}>
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
