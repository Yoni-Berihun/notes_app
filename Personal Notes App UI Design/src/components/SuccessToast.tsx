import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface ToastProps {
  isVisible: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}

export function Toast({ isVisible, message, type }: ToastProps) {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={20} className="text-accent" />;
      case 'error':
        return <XCircle size={20} className="text-destructive" />;
      case 'info':
        return <AlertCircle size={20} className="text-primary" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-accent/10 border-accent/20';
      case 'error':
        return 'bg-destructive/10 border-destructive/20';
      case 'info':
        return 'bg-primary/10 border-primary/20';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md"
        >
          <div className={`flex items-center gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-sm ${getBgColor()}`}>
            {getIcon()}
            <span className="text-foreground flex-1">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
