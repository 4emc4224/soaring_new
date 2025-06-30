import React, { useState } from 'react';
import { User, ChevronDown, Settings, LogOut, Coins, Activity } from 'lucide-react';
import AuthModal from './AuthModal';
import Dashboard from './Dashboard';

interface UserProfileProps {
  onAuthSuccess?: (success: boolean) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onAuthSuccess }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isAuthAnimating, setIsAuthAnimating] = useState(false);
  const [isDashboardAnimating, setIsDashboardAnimating] = useState(false);

  const userData = {
    username: 'soaringuser',
    email: 'user@soaring.com',
    avatar: null,
    coins: 15420,
    wins: 127,
    rank: 'Diamond'
  };

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleAuthSuccess = (formData: any) => {
    setIsAuthAnimating(true);
    
    // Плавное скрытие модального окна авторизации
    setTimeout(() => {
      setShowAuthModal(false);
      setIsLoggedIn(true);
      setIsAuthAnimating(false);
      onAuthSuccess?.(true);
    }, 500);
    
    console.log('User authenticated:', formData);
  };

  const handleAuthClose = () => {
    setIsAuthAnimating(true);
    
    // Плавное скрытие модального окна
    setTimeout(() => {
      setShowAuthModal(false);
      setIsAuthAnimating(false);
    }, 500);
  };

  const handleLogout = () => {
    setShowDropdown(false);
    setIsDashboardAnimating(true);
    
    // Если dashboard открыт, сначала закрываем его
    if (showDashboard) {
      setTimeout(() => {
        setShowDashboard(false);
        setIsLoggedIn(false);
        setIsDashboardAnimating(false);
        onAuthSuccess?.(false);
      }, 500);
    } else {
      setTimeout(() => {
        setIsLoggedIn(false);
        setIsDashboardAnimating(false);
        onAuthSuccess?.(false);
      }, 300);
    }
  };

  const handleDashboardOpen = () => {
    setShowDashboard(true);
    setShowDropdown(false);
  };

  const handleDashboardClose = () => {
    setIsDashboardAnimating(true);
    
    // Плавное скрытие dashboard
    setTimeout(() => {
      setShowDashboard(false);
      setIsDashboardAnimating(false);
    }, 500);
  };

  if (isLoggedIn) {
    return (
      <>
        <div className="user-profile-container">
          <div 
            className={`user-profile-logged-clean ${isDashboardAnimating ? 'fade-out' : 'fade-in'}`}
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
          onClose={handleDashboardClose}
          userData={userData}
          isAnimating={isDashboardAnimating}
        />
      </>
    );
  }

  return (
    <>
      <div className="user-profile-container">
        <div className={`auth-buttons ${isAuthAnimating ? 'fade-out' : 'fade-in'}`}>
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
        onClose={handleAuthClose}
        mode={authMode}
        onSwitchMode={setAuthMode}
        onAuthSuccess={handleAuthSuccess}
        isAnimating={isAuthAnimating}
      />
    </>
  );
};

export default UserProfile;