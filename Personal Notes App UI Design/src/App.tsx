import { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { NotesListScreen } from './components/NotesListScreen';
import { AddEditNoteScreen } from './components/AddEditNoteScreen';
import { NoteDetailScreen } from './components/NoteDetailScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { AccountSettingsScreen } from './components/AccountSettingsScreen';
import { ChangePasswordScreen } from './components/ChangePasswordScreen';

type Screen = 
  | 'splash' 
  | 'login' 
  | 'register' 
  | 'notes-list' 
  | 'add-note' 
  | 'edit-note' 
  | 'note-detail' 
  | 'profile'
  | 'account-settings'
  | 'change-password';

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [activeTab, setActiveTab] = useState<'notes' | 'profile'>('notes');
  const [selectedNote, setSelectedNote] = useState<Note | undefined>();

  // Show splash screen for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen('login');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    setCurrentScreen('notes-list');
    setActiveTab('notes');
  };

  const handleRegister = () => {
    setCurrentScreen('notes-list');
    setActiveTab('notes');
  };

  const handleLogout = () => {
    setCurrentScreen('login');
    setActiveTab('notes');
  };

  const handleAddNote = () => {
    setSelectedNote(undefined);
    setCurrentScreen('add-note');
  };

  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    setCurrentScreen('edit-note');
  };

  const handleViewNote = (note: Note) => {
    setSelectedNote(note);
    setCurrentScreen('note-detail');
  };

  const handleSaveNote = (title: string, content: string) => {
    // In a real app, this would save to backend
    console.log('Saving note:', { title, content });
    setCurrentScreen('notes-list');
    setActiveTab('notes');
  };

  const handleTabChange = (tab: 'notes' | 'profile') => {
    setActiveTab(tab);
    if (tab === 'notes') {
      setCurrentScreen('notes-list');
    } else {
      setCurrentScreen('profile');
    }
  };

  const handleBackToNotes = () => {
    setCurrentScreen('notes-list');
    setActiveTab('notes');
  };

  // Mobile container wrapper
  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">
      {/* Mobile Frame */}
      <div className="w-full max-w-[400px] h-[calc(100vh-2rem)] max-h-[844px] bg-white rounded-[2rem] shadow-2xl overflow-hidden relative">
        {/* Screen Container */}
        <div className="h-full w-full overflow-hidden">
          {currentScreen === 'splash' && <SplashScreen />}
          
          {currentScreen === 'login' && (
            <LoginScreen
              onLogin={handleLogin}
              onNavigateToRegister={() => setCurrentScreen('register')}
            />
          )}
          
          {currentScreen === 'register' && (
            <RegisterScreen
              onRegister={handleRegister}
              onBack={() => setCurrentScreen('login')}
            />
          )}
          
          {currentScreen === 'notes-list' && (
            <NotesListScreen
              activeTab={activeTab}
              onTabChange={handleTabChange}
              onAddNote={handleAddNote}
              onEditNote={handleEditNote}
              onViewNote={handleViewNote}
            />
          )}
          
          {currentScreen === 'add-note' && (
            <AddEditNoteScreen
              onSave={handleSaveNote}
              onBack={handleBackToNotes}
            />
          )}
          
          {currentScreen === 'edit-note' && selectedNote && (
            <AddEditNoteScreen
              note={selectedNote}
              onSave={handleSaveNote}
              onBack={handleBackToNotes}
            />
          )}
          
          {currentScreen === 'note-detail' && selectedNote && (
            <NoteDetailScreen
              note={selectedNote}
              onBack={handleBackToNotes}
              onEdit={() => {
                setCurrentScreen('edit-note');
              }}
            />
          )}
          
          {currentScreen === 'profile' && (
            <ProfileScreen
              activeTab={activeTab}
              onTabChange={handleTabChange}
              onLogout={handleLogout}
              onNavigateToAccountSettings={() => setCurrentScreen('account-settings')}
            />
          )}
          
          {currentScreen === 'account-settings' && (
            <AccountSettingsScreen
              onBack={() => setCurrentScreen('profile')}
              onChangePassword={() => setCurrentScreen('change-password')}
            />
          )}
          
          {currentScreen === 'change-password' && (
            <ChangePasswordScreen
              onBack={() => setCurrentScreen('account-settings')}
            />
          )}
        </div>
      </div>
    </div>
  );
}