import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ReportForm from './components/ReportForm';
import Financial from './components/Financial';
import Admission from './components/Admission';
import Counseling from './components/Counseling';
import Operations from './components/Operations';
import Marketing from './components/Marketing';
import Notifications from './components/Notifications';
import Settings from './components/Settings';
import Login from './components/Login';
import { ToastProvider } from './components/Toast';
import { Bell, Menu, ChevronRight, Layout } from 'lucide-react';

function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  
  const [announcements, setAnnouncements] = useState([
    { id: 1, text: 'Welcome to the Globe Scholars Pathway Portal! Ensure all operations align with standard workflow protocols.', date: '2026-03-25', targetDepartment: 'All', isRead: false },
    { id: 2, text: 'Please ensure that the newly updated Q1 Financial formatting template is used for upcoming submissions.', date: '2026-03-27', targetDepartment: 'Financial', isRead: false },
  ]);

  const [reports, setReports] = useState([
    { id: 1, title: 'Q1 Budget Analysis', department: 'Financial', date: '2026-03-01', status: 'Approved' },
    { id: 2, title: 'Spring Enrollment Update', department: 'Admission', date: '2026-03-15', status: 'Pending' },
    { id: 3, title: 'Campus HVAC Maintenance', department: 'Operations', date: '2026-03-20', status: 'Reviewed' },
    { id: 4, title: 'Student Wellness Survey', department: 'Counseling', date: '2026-03-22', status: 'Approved' },
    { id: 5, title: 'Summer Ad Campaign', department: 'Marketing', date: '2026-03-25', status: 'Pending' }
  ]);

  // Simulate page travel loading
  useEffect(() => {
    setIsPageLoading(true);
    const timer = setTimeout(() => setIsPageLoading(false), 400);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const handleLogin = (userInfo) => {
    setUser(userInfo);
    setActiveTab('dashboard');
  };

  const handlePostAnnouncement = (text, targetDepartment) => {
    setAnnouncements([{ id: Date.now(), text, date: new Date().toISOString().split('T')[0], targetDepartment, isRead: false }, ...announcements]);
  };

  const addReport = (newReport) => {
    setReports([
      { ...newReport, id: reports.length + 1, date: new Date().toISOString().split('T')[0], status: 'Pending' },
      ...reports
    ]);
    setActiveTab('dashboard');
  };

  const getHeaderTitle = () => {
    if (activeTab === 'dashboard') return user?.role === 'admin' ? 'Global Overview' : 'My Submission History';
    if (activeTab === 'notifications') return 'Notification Inbox';
    if (activeTab === 'submit') return 'Submit New Report';
    if (activeTab === 'financial') return 'Financial Analytics';
    if (activeTab === 'admission') return 'Admission & Enrollment';
    if (activeTab === 'counseling') return 'Counseling & Support';
    if (activeTab === 'operations') return 'Operations & Facilities';
    if (activeTab === 'marketing') return 'Marketing & Outreach';
    if (activeTab === 'settings') return 'Account & App Settings';
    return 'Portal';
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  // Filter Reports
  const visibleReports = user.role === 'admin' 
    ? reports 
    : reports.filter(r => r.department === user.department);

  // Filter Announcements
  const myAnnouncements = user.role === 'admin'
    ? announcements
    : announcements.filter(a => a.targetDepartment === 'All' || a.targetDepartment === user.department);
    
  const unreadCount = user.role === 'admin' ? 0 : myAnnouncements.filter(a => !a.isRead).length;

  return (
    <ToastProvider>
      <div className="app-container">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => setUser(null)} user={user} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}

        <main className="main-content">
          {/* Top Progress Bar */}
          <div style={{ height: '3px', width: '100%', position: 'absolute', top: 0, left: 0, zIndex: 100 }}>
            {isPageLoading && <div className="loading-bar"></div>}
          </div>

          <header className="top-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button className="mobile-menu-btn" onClick={() => setIsSidebarOpen(true)} style={{ backgroundColor: 'var(--sidebar-bg)', color: 'white', padding: '0.5rem 0.8rem', borderRadius: '8px', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <Menu size={18} color="white" />
                <span>Menu</span>
              </button>
              
              <div className="breadcrumb-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '500' }}>
                   <Layout size={16} /> 
                   <span>Portal</span>
                </div>
                <ChevronRight size={14} color="var(--text-muted)" />
                <h2 className="header-title" style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>
                  {getHeaderTitle()}
                </h2>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              
              <div style={{ position: 'relative', cursor: 'pointer', padding: '0.25rem', backgroundColor: 'var(--bg-main)', borderRadius: '8px', display: 'flex', transition: 'background-color 0.2s' }}
                   onClick={() => setActiveTab('notifications')}
                   onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
                   onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-main)'}>
                <Bell size={22} color="var(--text-main)" />
                {unreadCount > 0 && (
                  <div style={{ position: 'absolute', top: -4, right: -4, backgroundColor: '#ef4444', color: 'white', borderRadius: '50%', width: 18, height: 18, fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', border: '2px solid white' }}>
                    {unreadCount}
                  </div>
                )}
              </div>

              <div style={{ width: '1px', height: '32px', backgroundColor: 'var(--border)' }}></div>

              <div 
                style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', padding: '0.4rem 0.75rem', borderRadius: '8px', transition: 'background-color 0.2s' }}
                onClick={() => setActiveTab('settings')}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                title="Open Account Settings"
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {user.name.substring(0, 2)}
                </div>
                <div className="header-name-block">
                   <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>{user.name}</div>
                   <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                     {user.role === 'admin' ? 'System Administrator' : `${user.department} Department`}
                   </div>
                </div>
              </div>
            </div>
          </header>

          <div className="page-wrapper" style={{ opacity: isPageLoading ? 0.6 : 1, transition: 'opacity 0.2s' }}>
            {activeTab === 'dashboard' && <Dashboard reports={visibleReports} user={user} />}
            {activeTab === 'notifications' && <Notifications user={user} announcements={myAnnouncements} onPostAnnouncement={handlePostAnnouncement} />}
            {activeTab === 'submit' && <ReportForm onSubmit={addReport} user={user} />}
            {activeTab === 'financial' && <Financial reports={reports.filter(r => r.department === 'Financial')} user={user} onPostAnnouncement={handlePostAnnouncement} />}
            {activeTab === 'admission' && <Admission reports={reports.filter(r => r.department === 'Admission')} user={user} onPostAnnouncement={handlePostAnnouncement} />}
            {activeTab === 'counseling' && <Counseling reports={reports.filter(r => r.department === 'Counseling')} user={user} onPostAnnouncement={handlePostAnnouncement} />}
            {activeTab === 'operations' && <Operations reports={reports.filter(r => r.department === 'Operations')} user={user} onPostAnnouncement={handlePostAnnouncement} />}
            {activeTab === 'marketing' && <Marketing reports={reports.filter(r => r.department === 'Marketing')} user={user} onPostAnnouncement={handlePostAnnouncement} />}
            {activeTab === 'settings' && <Settings user={user} />}
          </div>
        </main>
      </div>
      <style>{`
        .loading-bar {
          height: 100%;
          background: linear-gradient(to right, transparent, var(--primary), transparent);
          background-size: 200% 100%;
          animation: loadingBarAnim 1s infinite linear;
        }
        @keyframes loadingBarAnim {
          from { background-position: 200% 0; }
          to { background-position: -200% 0; }
        }
      `}</style>
    </ToastProvider>
  );
}

export default App;
