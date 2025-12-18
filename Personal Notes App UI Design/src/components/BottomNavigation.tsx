import { StickyNote, User } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavigationProps {
  activeTab: 'notes' | 'profile';
  onTabChange: (tab: 'notes' | 'profile') => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <div className="h-16 bg-white border-t border-border flex items-center justify-around px-6">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onTabChange('notes')}
        className={`flex flex-col items-center gap-1 py-2 px-6 rounded-lg transition-colors ${
          activeTab === 'notes' ? 'text-primary' : 'text-muted-foreground'
        }`}
      >
        <StickyNote size={24} />
        <span className="text-xs">Notes</span>
        {activeTab === 'notes' && (
          <motion.div
            layoutId="activeTab"
            className="absolute -bottom-0.5 h-0.5 w-12 bg-primary"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onTabChange('profile')}
        className={`flex flex-col items-center gap-1 py-2 px-6 rounded-lg transition-colors ${
          activeTab === 'profile' ? 'text-primary' : 'text-muted-foreground'
        }`}
      >
        <User size={24} />
        <span className="text-xs">Profile</span>
        {activeTab === 'profile' && (
          <motion.div
            layoutId="activeTab"
            className="absolute -bottom-0.5 h-0.5 w-12 bg-primary"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
      </motion.button>
    </div>
  );
}
