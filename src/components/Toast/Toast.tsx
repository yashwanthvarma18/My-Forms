import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';
import { useToastStore } from '../../store/toastStore';

interface ToastProps {
  id: string;
  message: string;
  type: 'success' | 'error';
}

export const Toast: React.FC<ToastProps> = ({ id, message, type }) => {
  const { removeToast } = useToastStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [id, removeToast]);

  const bgColor = type === 'success' ? 'bg-green-50' : 'bg-red-50';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  const Icon = type === 'success' ? CheckCircle : AlertCircle;

  return (
    <div className={`rounded-md p-4 ${bgColor} shadow-lg transform transition-all duration-300 ease-in-out`}>
      <div className="flex items-center">
        <Icon className={`h-5 w-5 ${textColor} mr-3`} />
        <p className={`text-sm font-medium ${textColor} flex-1`}>{message}</p>
        <button
          onClick={() => removeToast(id)}
          className={`ml-3 ${textColor} hover:opacity-70`}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};