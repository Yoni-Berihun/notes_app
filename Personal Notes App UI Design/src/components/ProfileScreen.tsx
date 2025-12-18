import { motion } from 'motion/react';
import { User, Mail, Calendar, Settings, LogOut, ChevronRight } from 'lucide-react';
import { BottomNavigation } from './BottomNavigation';

interface ProfileScreenProps {
  activeTab: 'notes' | 'profile';
  onTabChange: (tab: 'notes' | 'profile') => void;
  onLogout: () => void;
  onNavigateToAccountSettings: () => void;
}

export function ProfileScreen({ activeTab, onTabChange, onLogout, onNavigateToAccountSettings }: ProfileScreenProps) {
  const userInfo = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: 'December 2025'
  };

  return (
    <div className="h-screen w-full bg-background flex flex-col">
      {/* AppBar */}
      <div className="h-14 flex items-center justify-between px-6 border-b border-border bg-white">
        <h2 className="text-foreground">Profile</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-border"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User size={32} className="text-primary" />
            </div>
            <div>
              <h3 className="text-foreground">{userInfo.name}</h3>
              <p className="text-muted-foreground text-sm">{userInfo.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Calendar size={16} />
            <span>Joined {userInfo.joinDate}</span>
          </div>
        </motion.div>

        {/* Settings List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="space-y-2"
        >
          {/* Account Settings */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onNavigateToAccountSettings}
            className="w-full bg-white rounded-xl p-4 shadow-sm border border-border flex items-center justify-between hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <User size={20} className="text-foreground" />
              </div>
              <div className="text-left">
                <div className="text-foreground">Account Settings</div>
                <div className="text-xs text-muted-foreground">Manage your account</div>
              </div>
            </div>
            <ChevronRight size={20} className="text-muted-foreground" />
          </motion.button>

          {/* Email Settings */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white rounded-xl p-4 shadow-sm border border-border flex items-center justify-between hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <Mail size={20} className="text-foreground" />
              </div>
              <div className="text-left">
                <div className="text-foreground">Email Preferences</div>
                <div className="text-xs text-muted-foreground">Notification settings</div>
              </div>
            </div>
            <ChevronRight size={20} className="text-muted-foreground" />
          </motion.button>

          {/* App Settings */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white rounded-xl p-4 shadow-sm border border-border flex items-center justify-between hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <Settings size={20} className="text-foreground" />
              </div>
              <div className="text-left">
                <div className="text-foreground">App Settings</div>
                <div className="text-xs text-muted-foreground">Customize your experience</div>
              </div>
            </div>
            <ChevronRight size={20} className="text-muted-foreground" />
          </motion.button>
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-8"
        >
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onLogout}
            className="w-full py-3 bg-destructive text-destructive-foreground rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-center gap-2"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}