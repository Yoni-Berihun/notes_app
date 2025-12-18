import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Toast } from './SuccessToast';

interface ChangePasswordScreenProps {
  onBack: () => void;
}

export function ChangePasswordScreen({ onBack }: ChangePasswordScreenProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [toast, setToast] = useState<{
    isVisible: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({
    isVisible: false,
    message: '',
    type: 'success'
  });

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ isVisible: true, message, type });
    setTimeout(() => {
      setToast({ isVisible: false, message: '', type: 'success' });
    }, 3000);
  };

  const validateForm = (): boolean => {
    const newErrors = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };

    if (!currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      showToast('Password updated successfully', 'success');
      
      // Clear form
      setTimeout(() => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        onBack();
      }, 1000);
    }, 1500);
  };

  const isFormValid = currentPassword && newPassword && confirmPassword && 
                      !errors.currentPassword && !errors.newPassword && !errors.confirmPassword;

  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="h-screen w-full bg-background flex flex-col"
    >
      <Toast 
        isVisible={toast.isVisible} 
        message={toast.message} 
        type={toast.type} 
      />

      {/* AppBar */}
      <div className="h-14 flex items-center px-4 border-b border-border bg-white">
        <button onClick={onBack} className="mr-3">
          <ArrowLeft size={24} className="text-foreground" />
        </button>
        <h2 className="text-foreground">Change Password</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto">
          {/* Info Text */}
          <p className="text-muted-foreground text-sm mb-6">
            Choose a strong password and don't reuse it for other accounts.
          </p>

          {/* Current Password */}
          <div className="space-y-2">
            <label htmlFor="currentPassword" className="block text-foreground">
              Current Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                id="currentPassword"
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  setErrors({ ...errors, currentPassword: '' });
                }}
                placeholder="Enter current password"
                className={`w-full pl-12 pr-12 py-3 bg-input-background rounded-xl border ${
                  errors.currentPassword ? 'border-destructive' : 'border-transparent'
                } focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.currentPassword && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-destructive"
              >
                {errors.currentPassword}
              </motion.p>
            )}
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <label htmlFor="newPassword" className="block text-foreground">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                id="newPassword"
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setErrors({ ...errors, newPassword: '' });
                }}
                placeholder="Enter new password"
                className={`w-full pl-12 pr-12 py-3 bg-input-background rounded-xl border ${
                  errors.newPassword ? 'border-destructive' : 'border-transparent'
                } focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.newPassword && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-destructive"
              >
                {errors.newPassword}
              </motion.p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-foreground">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrors({ ...errors, confirmPassword: '' });
                }}
                placeholder="Confirm new password"
                className={`w-full pl-12 pr-12 py-3 bg-input-background rounded-xl border ${
                  errors.confirmPassword ? 'border-destructive' : 'border-transparent'
                } focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-destructive"
              >
                {errors.confirmPassword}
              </motion.p>
            )}
          </div>
        </form>
      </div>

      {/* Save Button - Fixed at Bottom */}
      <div className="p-6 border-t border-border bg-white">
        <motion.button
          whileTap={isFormValid && !isLoading ? { scale: 0.98 } : {}}
          onClick={handleSubmit}
          disabled={!isFormValid || isLoading}
          className={`w-full py-3 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 ${
            isFormValid && !isLoading
              ? 'bg-primary text-primary-foreground hover:shadow-md'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span>Updating Password...</span>
            </>
          ) : (
            <span>Update Password</span>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
