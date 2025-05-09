'use client';

import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { 
  CheckCircleIcon, 
  ExclamationCircleIcon, 
  InformationCircleIcon, 
  XMarkIcon,
  BellAlertIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
  title?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextValue {
  showToast: (params: Omit<Toast, 'id'>) => string;
  hideToast: (id: string) => void;
  updateToast: (id: string, params: Partial<Omit<Toast, 'id'>>) => void;
}

// Create context
const ToastContext = createContext<ToastContextValue | undefined>(undefined);

// Provider component
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  const showToast = useCallback((params: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const toast: Toast = {
      id,
      ...params
    };
    
    setToasts(prev => [...prev, toast]);
    
    // Auto dismiss
    if (params.duration > 0) {
      setTimeout(() => {
        hideToast(id);
      }, params.duration);
    }
    
    return id;
  }, []);
  
  const hideToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);
  
  const updateToast = useCallback((id: string, params: Partial<Omit<Toast, 'id'>>) => {
    setToasts(prev => prev.map(toast => 
      toast.id === id ? { ...toast, ...params } : toast
    ));
  }, []);
  
  return (
    <ToastContext.Provider value={{ showToast, hideToast, updateToast }}>
      {children}
      <ToastContainer toasts={toasts} hideToast={hideToast} />
    </ToastContext.Provider>
  );
};

// Hook to use the toast functionality
export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Container component that renders all active toasts
const ToastContainer: React.FC<{ toasts: Toast[], hideToast: (id: string) => void }> = ({ 
  toasts, 
  hideToast 
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto"
          >
            <NotificationToast toast={toast} onClose={() => hideToast(toast.id)} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// Individual toast component
const NotificationToast: React.FC<{ 
  toast: Toast, 
  onClose: () => void 
}> = ({ 
  toast, 
  onClose 
}) => {
  const [progress, setProgress] = useState(100);
  
  // Handle progress bar animation
  useEffect(() => {
    if (toast.duration <= 0) return;
    
    const interval = 10; // Update every 10ms
    const step = (interval / toast.duration) * 100;
    
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev - step;
        return newProgress <= 0 ? 0 : newProgress;
      });
    }, interval);
    
    return () => clearInterval(timer);
  }, [toast.duration]);
  
  // Icon based on toast type
  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'error':
        return <ExclamationCircleIcon className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <BellAlertIcon className="w-5 h-5 text-yellow-500" />;
      case 'info':
      default:
        return <InformationCircleIcon className="w-5 h-5 text-blue-500" />;
    }
  };
  
  // Background color based on toast type
  const getBgColor = () => {
    switch (toast.type) {
      case 'success': return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'error': return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'warning': return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'info': default: return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
    }
  };
  
  return (
    <div 
      className={`flex items-start overflow-hidden rounded-lg shadow-lg border ${getBgColor()}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex w-full p-4">
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        
        <div className="ml-3 w-0 flex-1">
          {toast.title && (
            <p className="font-medium text-sm text-gray-900 dark:text-gray-100">{toast.title}</p>
          )}
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{toast.message}</p>
          
          {toast.action && (
            <div className="mt-3">
              <button
                type="button"
                onClick={toast.action.onClick}
                className="text-sm font-medium text-primary hover:text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {toast.action.label}
              </button>
            </div>
          )}
        </div>
        
        <div className="ml-4 flex-shrink-0 flex">
          <button
            className="inline-flex text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
      
      {/* Progress bar */}
      {toast.duration > 0 && (
        <div 
          className="h-1 bg-primary"
          style={{ 
            width: `${progress}%`, 
            transition: 'width linear',
            marginTop: '-4px'
          }}
        />
      )}
    </div>
  );
};

// Main component to use directly


export default NotificationToast;
