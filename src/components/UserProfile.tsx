import React, { useState } from 'react';
import { User, ChevronDown, Settings, LogOut, Coins, Activity } from 'lucide-react';
import AuthModal from './AuthModal';
import Dashboard from './Dashboard';

const UserProfile: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const userData = {
    username: 'soaringuser',
    email: 'user@soaring.com',
    avatar: null,
    level: 42,
    coins: 15420,
    wins: 127,
    rank: 'Diamond'
  };

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleAuthSuccess = (formData: any) => {
    setIsLoggedIn(true);
    setShowAuthModal(false);
    // Здесь можно добавить логику сохранения данных пользователя
    console.log('User authenticated:', formData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowDropdown(false);
    setShowDashboard(false);
  };

  const handleDashboardOpen = () => {
    setShowDashboard(true);
    setShowDropdown(false);
  };

  if (isLoggedIn) {
    return (
      <>
        <div className="user-profile-container">
          <div 
            className="user-profile-logged-clean"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="user-avatar">
              {userData.avatar ? (
                <img src={userData.avatar} alt="Avatar" className="avatar-image" />
              ) : (
                <User size={20} />
              )}
            </div>
            <span className="username-clean">{userData.username}</span>
            <div className="coins-clean">
              <Coins size={14} />
              {userData.coins.toLocaleString()}
            </div>
            <ChevronDown size={16} className={`dropdown-arrow ${showDropdown ? 'rotated' : ''}`} />
          </div>

          {showDropdown && (
            <div className="user-dropdown">
              <button className="dropdown-item" onClick={handleDashboardOpen}>
                <Activity size={16} />
                Dashboard
              </button>
              <button className="dropdown-item">
                <Settings size={16} />
                Settings
              </button>
              <button className="dropdown-item" onClick={handleLogout}>
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>

        <Dashboard 
          isOpen={showDashboard}
          onClose={() => setShowDashboard(false)}
          userData={userData}
        />
      </>
    );
  }

  return (
    <>
      <div className="user-profile-container">
        <div className="auth-buttons">
          <button 
            className="auth-btn login-btn"
            onClick={() => handleAuthClick('login')}
          >
            Sign In
          </button>
          <button 
            className="auth-btn register-btn"
            onClick={() => handleAuthClick('register')}
          >
            Sign Up
          </button>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onSwitchMode={setAuthMode}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default UserProfile;