# Account Settings & Profile Management - Implementation Guide

## Overview

The Account Settings feature enables users to manage their profile information, including profile picture, name, email, and password. This UI is designed to support full CRUD operations with backend integration.

## Components Created

### 1. AccountSettingsScreen

**Location:** `/components/AccountSettingsScreen.tsx`

**Features:**

- Profile picture upload with image picker
- Full name editing with validation
- Email editing with format validation
- Change password navigation
- Real-time form validation
- Loading states during save operations
- Success/error toast notifications
- Disabled save button when no changes detected

**Backend Integration Points:**

```typescript
// Expected API endpoints:
// PATCH /api/users/me - Update user profile
// POST /api/users/me/avatar - Upload profile picture

// Request payload for profile update:
{
  fullName: string,
  email: string
}

// Multipart form data for avatar upload:
{
  avatar: File
}
```

### 2. ChangePasswordScreen

**Location:** `/components/ChangePasswordScreen.tsx`

**Features:**

- Current password field
- New password field with validation (min 8 characters)
- Confirm password field with match validation
- Password visibility toggle for all fields
- Form validation with error messages
- Loading state during password update
- Success feedback with auto-redirect

**Backend Integration Points:**

```typescript
// Expected API endpoint:
// PATCH /api/users/me/password

// Request payload:
{
  currentPassword: string,
  newPassword: string
}
```

### 3. ImagePickerBottomSheet

**Location:** `/components/ImagePickerBottomSheet.tsx`

**Features:**

- Bottom sheet modal animation
- Camera option
- Gallery option
- Cancel button
- Smooth slide-up/down animation

**Implementation Notes:**

```typescript
// In production, integrate with:
// - React Native Image Picker (for mobile)
// - HTML5 File Input (for web)
// - Camera API for direct capture
```

### 4. Toast Notification System

**Location:** `/components/SuccessToast.tsx`

**Features:**

- Success, error, and info variants
- Auto-dismiss after 3 seconds
- Smooth animations (fade + scale)
- Icon-based visual feedback
- Positioned at top center

## UI States

### Loading State

```typescript
// When saving changes
<button disabled={isLoading}>
  {isLoading ? (
    <>
      <Loader2 className="animate-spin" />
      <span>Saving Changes...</span>
    </>
  ) : (
    <span>Save Changes</span>
  )}
</button>
```

### Validation States

```typescript
// Email validation
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Name validation
const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

// Password validation
const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};
```

### Error Handling

```typescript
// Form errors displayed below input fields
{emailError && (
  <motion.p
    initial={{ opacity: 0, y: -5 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-xs text-destructive"
  >
    {emailError}
  </motion.p>
)}
```

## Navigation Flow

```
Profile Screen
    ↓
Account Settings Screen
    ↓
Change Password Screen
    ↓
Back to Account Settings
```

## Form Validation Rules

### Name Field

- Minimum 2 characters
- Required field
- Error message: "Name must be at least 2 characters"

### Email Field

- Valid email format (regex validation)
- Required field
- Error message: "Please enter a valid email address"

### Password Fields

- Current password: Required
- New password: Minimum 8 characters
- Confirm password: Must match new password
- Error messages:
  - "Current password is required"
  - "Password must be at least 8 characters"
  - "Passwords do not match"

## Animations & Micro-interactions

### Profile Picture

- **Hover:** Scale up (1.02)
- **Tap:** Scale down (0.98)
- **Update:** Cross-fade animation
- **Camera button:** Scale animation on tap

### Form Inputs

- **Focus:** Border color change + ring effect
- **Error:** Red border + error text fade-in
- **Validation:** Real-time feedback

### Save Button

- **Tap:** Scale animation (0.98)
- **Disabled:** Gray background, no interaction
- **Loading:** Spinner animation
- **Enabled:** Hover shadow increase

### Bottom Sheet

- **Open:** Slide up from bottom
- **Close:** Slide down
- **Backdrop:** Fade in/out

### Toast

- **Show:** Fade + scale up from top
- **Hide:** Fade + scale down
- **Duration:** 3 seconds auto-dismiss

## Backend Integration Guide

### Step 1: Set up API endpoints

```typescript
// api/users.ts
export const updateUserProfile = async (data: {
  fullName: string;
  email: string;
}) => {
  const response = await fetch("/api/users/me", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const uploadAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append("avatar", file);

  const response = await fetch("/api/users/me/avatar", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  return response.json();
};

export const updatePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  const response = await fetch("/api/users/me/password", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
```

### Step 2: Replace mock implementations

In `AccountSettingsScreen.tsx`, replace:

```typescript
// Current mock implementation
setTimeout(() => {
  setOriginalName(fullName);
  setOriginalEmail(email);
  setOriginalImage(profileImage);
  setIsLoading(false);
  showToast("Profile updated successfully", "success");
}, 1500);

// With actual API call
try {
  await updateUserProfile({ fullName, email });
  if (profileImage !== originalImage && profileImage) {
    await uploadAvatar(profileImageFile);
  }
  setOriginalName(fullName);
  setOriginalEmail(email);
  setOriginalImage(profileImage);
  showToast("Profile updated successfully", "success");
} catch (error) {
  showToast("Failed to update profile", "error");
} finally {
  setIsLoading(false);
}
```

### Step 3: Add authentication headers

Ensure all API requests include authentication tokens from your auth context/state.

## Flutter Conversion Guide

### Widget Mapping

| React Component   | Flutter Widget                   |
| ----------------- | -------------------------------- |
| `<div>`           | `Container` / `Column` / `Row`   |
| `<input>`         | `TextField` / `TextFormField`    |
| `<button>`        | `ElevatedButton` / `TextButton`  |
| `<img>`           | `CircleAvatar` / `Image.network` |
| Motion animations | `AnimatedContainer` / `Hero`     |
| Bottom Sheet      | `showModalBottomSheet`           |
| Toast             | `ScaffoldMessenger.showSnackBar` |

### Example Flutter Code

```dart
// Profile Picture with Camera Button
Stack(
  children: [
    CircleAvatar(
      radius: 56,
      backgroundImage: profileImage != null
        ? NetworkImage(profileImage!)
        : null,
      child: profileImage == null
        ? Icon(Icons.person, size: 48)
        : null,
    ),
    Positioned(
      bottom: 0,
      right: 0,
      child: InkWell(
        onTap: () => _showImagePicker(),
        child: Container(
          width: 40,
          height: 40,
          decoration: BoxDecoration(
            color: Colors.green,
            shape: BoxShape.circle,
            border: Border.all(color: Colors.white, width: 2),
          ),
          child: Icon(Icons.camera_alt, color: Colors.white),
        ),
      ),
    ),
  ],
)

// Form Field with Validation
TextFormField(
  controller: _nameController,
  decoration: InputDecoration(
    labelText: 'Full Name',
    prefixIcon: Icon(Icons.person),
    filled: true,
    fillColor: Colors.grey[100],
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(12),
      borderSide: BorderSide.none,
    ),
  ),
  validator: (value) {
    if (value == null || value.length < 2) {
      return 'Name must be at least 2 characters';
    }
    return null;
  },
)

// Bottom Sheet
void _showImagePicker() {
  showModalBottomSheet(
    context: context,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
    ),
    builder: (context) => Container(
      padding: EdgeInsets.all(24),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          ListTile(
            leading: Icon(Icons.camera_alt),
            title: Text('Take Photo'),
            onTap: () => _pickImage(ImageSource.camera),
          ),
          ListTile(
            leading: Icon(Icons.photo_library),
            title: Text('Choose from Gallery'),
            onTap: () => _pickImage(ImageSource.gallery),
          ),
        ],
      ),
    ),
  );
}
```

## Testing Checklist

- [ ] Profile picture upload from camera
- [ ] Profile picture upload from gallery
- [ ] Name validation (minimum 2 characters)
- [ ] Email validation (valid format)
- [ ] Email validation (invalid format shows error)
- [ ] Save button disabled when no changes
- [ ] Save button disabled when validation errors exist
- [ ] Loading state during save
- [ ] Success toast on successful save
- [ ] Error toast on failed save
- [ ] Password validation (minimum 8 characters)
- [ ] Password confirmation matching
- [ ] Change password success flow
- [ ] Navigation: Profile → Account Settings
- [ ] Navigation: Account Settings → Change Password
- [ ] Navigation: Change Password → back to Account Settings
- [ ] Form clears on successful password change

## Accessibility Considerations

1. **Form Labels:** All inputs have proper labels
2. **Error Messages:** Clear error feedback below fields
3. **Loading States:** Loading indicators for async operations
4. **Keyboard Navigation:** Tab order follows logical flow
5. **Touch Targets:** All buttons meet 44x44 minimum size
6. **Color Contrast:** Error messages use sufficient contrast

## Security Best Practices

1. **Password Handling:**
   - Never store passwords in state longer than necessary
   - Clear password fields after successful update
   - Use HTTPS for all API calls
   - Implement rate limiting on password change

2. **Image Upload:**
   - Validate file types (JPG, PNG only)
   - Limit file size (max 5MB recommended)
   - Sanitize uploaded files on backend
   - Use signed URLs for image storage

3. **Email Updates:**
   - Require email verification for changes
   - Send notification to old email
   - Implement cooldown period for changes

4. **Authentication:**
   - Use JWT tokens with refresh mechanism
   - Implement token expiration
   - Clear tokens on logout
   - Validate token on each protected request