import React, { useState } from 'react';
import { Bell, Send, Inbox, ShieldAlert } from 'lucide-react';

const Notifications = ({ user, announcements, onPostAnnouncement }) => {
  const [text, setText] = useState('');
  const [target, setTarget] = useState('All');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onPostAnnouncement(text, target);
    setText('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Admin Compose Studio */}
      {user?.role === 'admin' && (
        <div className="card" style={{ backgroundColor: '#f8fafc', borderLeft: '4px solid var(--primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ backgroundColor: 'var(--primary-light)', padding: '0.5rem', borderRadius: '8px' }}>
              <ShieldAlert size={24} color="var(--primary)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0 }}>System Notification Studio</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Dispatch critical updates to specific departments</p>
            </div>
          </div>
           
           <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
             <div className="responsive-flex" style={{ display: 'flex', gap: '1rem', alignItems: 'stretch' }}>
               <div style={{ flex: 2 }}>
                 <label style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block', color: 'var(--text-main)' }}>Message Content</label>
                 <input 
                   type="text" 
                   required
                   className="form-control" 
                   placeholder="Enter your announcement text here..." 
                   value={text}
                   onChange={(e) => setText(e.target.value)}
                   style={{ backgroundColor: 'white', width: '100%', boxSizing: 'border-box' }}
                 />
               </div>
               <div style={{ flex: 1 }}>
                 <label style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block', color: 'var(--text-main)' }}>Target Department</label>
                 <select 
                   value={target} 
                   onChange={(e) => setTarget(e.target.value)} 
                   className="form-control"
                   style={{ backgroundColor: 'white', width: '100%', boxSizing: 'border-box' }}
                 >
                   <option value="All">All Departments (Global Broadcast)</option>
                   <option value="Financial">Financial Department</option>
                   <option value="Admission">Admission Department</option>
                   <option value="Counseling">Counseling Department</option>
                   <option value="Operations">Operations Department</option>
                   <option value="Marketing">Marketing Department</option>
                 </select>
               </div>
               <div style={{ display: 'flex', alignItems: 'flex-end', marginTop: '0.5rem' }}>
                 <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', height: '42px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                   <Send size={18} /> Dispatch Notice
                 </button>
               </div>
             </div>
           </form>
        </div>
      )}

      {/* Inbox List */}
      <div className="card">
        <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
          <Inbox size={22} color="var(--primary)" />
          {user?.role === 'admin' ? 'Sent Messages History' : 'My Notification Inbox'}
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {announcements.map((ann) => (
             <div key={ann.id} style={{ display: 'flex', padding: '1.5rem', border: '1px solid var(--border)', borderRadius: '12px', gap: '1.5rem', backgroundColor: '#fcfcfc', transition: 'box-shadow 0.2s' }}
                  onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'}
                  onMouseOut={(e) => e.currentTarget.style.boxShadow = 'none'}>
               <div style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                 <Bell size={24} />
               </div>
               <div style={{ flex: 1 }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'flex-start' }}>
                   <span style={{ fontWeight: '700', color: 'var(--text-main)', fontSize: '1.1rem' }}>
                     {user?.role === 'admin' ? `Sent Notice` : 'Message from Admin'}
                   </span>
                   <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', backgroundColor: 'var(--bg-main)', padding: '0.2rem 0.6rem', borderRadius: '12px' }}>{ann.date}</span>
                 </div>
                 <p style={{ color: 'var(--text-main)', lineHeight: '1.6', margin: '0 0 1rem 0', fontSize: '0.95rem' }}>{ann.text}</p>
                 
                 <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                   {user?.role === 'admin' ? (
                     <span style={{ fontSize: '0.8rem', backgroundColor: ann.targetDepartment === 'All' ? '#fee2e2' : '#e0e7ff', padding: '0.3rem 0.8rem', borderRadius: '6px', color: ann.targetDepartment === 'All' ? '#991b1b' : '#3730a3', fontWeight: '600' }}>
                       Delivered To: {ann.targetDepartment === 'All' ? 'All Departments' : ann.targetDepartment}
                     </span>
                   ) : (
                     <span style={{ fontSize: '0.8rem', backgroundColor: ann.targetDepartment === 'All' ? '#fee2e2' : '#e0e7ff', padding: '0.3rem 0.8rem', borderRadius: '6px', color: ann.targetDepartment === 'All' ? '#991b1b' : '#3730a3', fontWeight: '600' }}>
                       Addressing: {ann.targetDepartment === 'All' ? 'All Organization Staff' : 'Your Department Only'}
                     </span>
                   )}
                 </div>
               </div>
             </div>
          ))}
          {announcements.length === 0 && (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Inbox size={48} color="var(--border)" style={{ margin: '0 auto 1rem', display: 'block' }} />
              <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Inbox is empty</h3>
              <p>No formal notifications have been broadcasted yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
