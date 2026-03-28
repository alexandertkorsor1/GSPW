import React from 'react';
import { LayoutDashboard, FilePlus, Building2, DollarSign, GraduationCap, Heart, Wrench, Settings, LogOut, Megaphone, Clock, Bell } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, onLogout, user }) => {
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
    <aside style={{
      width: '280px',
      backgroundColor: 'var(--sidebar-bg)',
      color: 'var(--sidebar-text)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.3s ease',
      overflowY: 'auto'
    }}>
      <div style={{ padding: '2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '0.5rem', borderRadius: '8px' }}>
          <Building2 size={24} />
        </div>
        <div>
          <h1 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'white', lineHeight: '1.2' }}>Globe Scholars<br/>Pathway</h1>
        </div>
      </div>

      <nav style={{ flex: 1, padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem', paddingLeft: '0.5rem' }}>Workspace</p>
        
        {user?.role === 'admin' ? (
          <button onClick={() => setActiveTab('dashboard')} style={getBtnStyle('dashboard')}>
            <LayoutDashboard size={20} />
            Global Dashboard
          </button>
        ) : (
          <button onClick={() => setActiveTab('dashboard')} style={getBtnStyle('dashboard')}>
            <Clock size={20} />
            My Submissions
          </button>
        )}
        
        <button onClick={() => setActiveTab('notifications')} style={getBtnStyle('notifications')}>
          <Bell size={20} />
          Notification Box
        </button>
        
        <button onClick={() => setActiveTab('submit')} style={getBtnStyle('submit')}>
          <FilePlus size={20} />
          Submit Report
        </button>

        <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginTop: '1.5rem', marginBottom: '0.5rem', paddingLeft: '0.5rem' }}>
          {user?.role === 'admin' ? 'Departments' : 'My Department'}
        </p>
        
        {(user?.role === 'admin' || user?.department === 'Financial') && (
          <button onClick={() => setActiveTab('financial')} style={getBtnStyle('financial')}>
            <DollarSign size={20} />
            Financial
          </button>
        )}
        
        {(user?.role === 'admin' || user?.department === 'Admission') && (
          <button onClick={() => setActiveTab('admission')} style={getBtnStyle('admission')}>
            <GraduationCap size={20} />
            Admission
          </button>
        )}
        
        {(user?.role === 'admin' || user?.department === 'Counseling') && (
          <button onClick={() => setActiveTab('counseling')} style={getBtnStyle('counseling')}>
            <Heart size={20} />
            Counseling
          </button>
        )}

        {(user?.role === 'admin' || user?.department === 'Operations') && (
          <button onClick={() => setActiveTab('operations')} style={getBtnStyle('operations')}>
            <Wrench size={20} />
            Operations
          </button>
        )}

        {(user?.role === 'admin' || user?.department === 'Marketing') && (
          <button onClick={() => setActiveTab('marketing')} style={getBtnStyle('marketing')}>
            <Megaphone size={20} />
            Marketing
          </button>
        )}

        {user?.role === 'admin' && (
          <>
            <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginTop: '1.5rem', marginBottom: '0.5rem', paddingLeft: '0.5rem' }}>Management</p>
            
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1rem', borderRadius: '8px', transition: 'all 0.2s', textAlign: 'left', width: '100%', fontWeight: '500' }}>
              <Settings size={20} />
              System Settings
            </button>
          </>
        )}
      </nav>

      <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <button onClick={onLogout} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          color: 'var(--sidebar-text)',
          transition: 'all 0.2s',
          width: '100%',
          textAlign: 'left',
          padding: '0.5rem'
        }}>
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
