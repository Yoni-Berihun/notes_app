import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Camera, Mail, User, Lock, ChevronRight, Loader2 } from 'lucide-react';
import { ImagePickerBottomSheet } from './ImagePickerBottomSheet';
import { Toast } from './SuccessToast';

interface AccountSettingsScreenProps {
  onBack: () => void;
  onChangePassword: () => void;
}

export function AccountSettingsScreen({ onBack, onChangePassword }: AccountSettingsScreenProps) {
  // User state
  const [fullName, setFullName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  // Original values for comparison
  const [originalName, setOriginalName] = useState('John Doe');
  const [originalEmail, setOriginalEmail] = useState('john.doe@example.com');
  const [originalImage, setOriginalImage] = useState<string | null>(null);

  // UI states
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  
  // Toast state
  const [toast, setToast] = useState<{
    isVisible: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({
    isVisible: false,
    message: '',
    type: 'success'
  });

  // Check if form has changes
  const hasChanges = 
    fullName !== originalName || 
    email !== originalEmail || 
    profileImage !== originalImage;

  // Email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate name
  const validateName = (name: string): boolean => {
    return name.trim().length >= 2;
  };

  // Handle email change with validation
  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (value && !validateEmail(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  // Handle name change with validation
  const handleNameChange = (value: string) => {
    setFullName(value);
    if (value && !validateName(value)) {
      setNameError('Name must be at least 2 characters');
    } else {
      setNameError('');
    }
  };

  // Show toast
  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ isVisible: true, message, type });
    setTimeout(() => {
      setToast({ isVisible: false, message: '', type: 'success' });
    }, 3000);
  };

  // Handle image selection from camera
  const handleCameraSelect = () => {
    // Simulate image capture
    setTimeout(() => {
      const mockImageUrl = `https://i.pravatar.cc/300?img=${Math.floor(Math.random() * 70)}`;
      setProfileImage(mockImageUrl);
      showToast('Photo captured successfully', 'success');
    }, 500);
  };

  // Handle image selection from gallery
  const handleGallerySelect = () => {
    // Simulate gallery selection
    setTimeout(() => {
      const mockImageUrl = `https://i.pravatar.cc/300?img=${Math.floor(Math.random() * 70)}`;
      setProfileImage(mockImageUrl);
      showToast('Photo selected successfully', 'success');
    }, 500);
  };

  // Handle save changes
  const handleSave = async () => {
    // Validate before saving
    if (!validateName(fullName)) {
      setNameError('Name must be at least 2 characters');
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Update original values
      setOriginalName(fullName);
      setOriginalEmail(email);
      setOriginalImage(profileImage);
      
      setIsLoading(false);
      showToast('Profile updated successfully', 'success');
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="h-screen w-full bg-background flex flex-col"
    >
      {/* Toast Notification */}
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
        <h2 className="text-foreground">Account Settings</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Profile Header Section */}
        <div className="bg-white border-b border-border py-8 px-6">
          <div className="flex flex-col items-center">
            {/* Avatar with Edit Button */}
            <div className="relative mb-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative"
              >
                {profileImage ? (
                  <motion.img
                    key={profileImage}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    src={profileImage}
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover border-4 border-primary/20"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center border-4 border-primary/20">
                    <User size={48} className="text-primary" />
                  </div>
                )}
                
                {/* Camera Icon Overlay */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsImagePickerOpen(true)}
                  className="absolute bottom-0 right-0 w-10 h-10 bg-accent text-accent-foreground rounded-full flex items-center justify-center shadow-lg border-2 border-white"
                >
                  <Camera size={20} />
                </motion.button>
              </motion.div>
            </div>

            {/* User Info Preview */}
            <h3 className="text-foreground text-center mb-1">{fullName}</h3>
            <p className="text-muted-foreground text-sm text-center">{email}</p>
          </div>
        </div>

        {/* Personal Information Form */}
        <div className="p-6 space-y-6">
          <div>
            <h4 className="text-foreground mb-4">Personal Information</h4>

            {/* Full Name Field */}
            <div className="space-y-2 mb-4">
              <label htmlFor="fullName" className="block text-foreground">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Enter your full name"
                  className={`w-full pl-12 pr-4 py-3 bg-input-background rounded-xl border ${
                    nameError ? 'border-destructive' : 'border-transparent'
                  } focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
                />
              </div>
              {nameError && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-destructive mt-1"
                >
                  {nameError}
                </motion.p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-foreground">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  placeholder="Enter your email"
                  className={`w-full pl-12 pr-4 py-3 bg-input-background rounded-xl border ${
                    emailError ? 'border-destructive' : 'border-transparent'
                  } focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
                />
              </div>
              {emailError && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-destructive mt-1"
                >
                  {emailError}
                </motion.p>
              )}
            </div>
          </div>

          {/* Security Section */}
          <div>
            <h4 className="text-foreground mb-4">Security</h4>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={onChangePassword}
              className="w-full bg-white rounded-xl p-4 shadow-sm border border-border flex items-center justify-between hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Lock size={20} className="text-foreground" />
                </div>
                <div className="text-left">
                  <div className="text-foreground">Change Password</div>
                  <div className="text-xs text-muted-foreground">Update your password</div>
                </div>
              </div>
              <ChevronRight size={20} className="text-muted-foreground" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Save Button - Fixed at Bottom */}
      <div className="p-6 border-t border-border bg-white">
        <motion.button
          whileTap={hasChanges && !isLoading && !emailError && !nameError ? { scale: 0.98 } : {}}
          onClick={handleSave}
          disabled={!hasChanges || isLoading || !!emailError || !!nameError}
          className={`w-full py-3 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 ${
            hasChanges && !isLoading && !emailError && !nameError
              ? 'bg-primary text-primary-foreground hover:shadow-md'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <span>Save Changes</span>
          )}
        </motion.button>
        
        {!hasChanges && !isLoading && (
          <p className="text-xs text-muted-foreground text-center mt-2">
            Make changes to enable save
          </p>
        )}
      </div>

      {/* Image Picker Bottom Sheet */}
      <ImagePickerBottomSheet
        isOpen={isImagePickerOpen}
        onClose={() => setIsImagePickerOpen(false)}
        onSelectCamera={handleCameraSelect}
        onSelectGallery={handleGallerySelect}
      />
    </motion.div>
  );
}
