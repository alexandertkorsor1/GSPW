import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        pointerEvents: 'none'
      }}>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const Toast = ({ message, type, onClose }) => {
  const icons = {
    success: <CheckCircle size={20} color="#10b981" />,
    error: <AlertCircle size={20} color="#ef4444" />,
    info: <Info size={20} color="#3b82f6" />,
  };

  const colors = {
    success: { bg: '#ecfdf5', border: '#10b981', text: '#065f46' },
    error: { bg: '#fef2f2', border: '#ef4444', text: '#991b1b' },
    info: { bg: '#eff6ff', border: '#3b82f6', text: '#1e3a8a' },
  };

  const style = colors[type] || colors.info;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      borderRadius: '12px',
      backgroundColor: style.bg,
      border: `1px solid ${style.border}`,
      color: style.text,
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      minWidth: '300px',
      maxWidth: '450px',
      animation: 'slideIn 0.3s ease-out',
      pointerEvents: 'auto'
    }}>
      <div style={{ flexShrink: 0 }}>{icons[type]}</div>
      <div style={{ flex: 1, fontSize: '0.9rem', fontWeight: '500' }}>{message}</div>
      <button 
        onClick={onClose}
        style={{ 
          background: 'none', 
          border: 'none', 
          padding: '4px', 
          cursor: 'pointer',
          color: style.text,
          opacity: 0.6,
          display: 'flex'
        }}
      >
        <X size={16} />
      </button>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
