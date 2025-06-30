import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AnimatedBackground from './components/AnimatedBackground';
import UserProfile from './components/UserProfile';
import PublicProfile from './components/PublicProfile';
import AdminPanel from './components/AdminPanel';
import NotFound from './components/NotFound';

function HomePage() {
  // Mock user state - in real app this would come from context/state management
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [showAdminPanel, setShowAdminPanel] = React.useState(false);
  
  const userData = {
    username: 'soaringuser',
    email: 'user@soaring.com'
  };

  // Mock admin check - in real app this would be based on user role
  React.useEffect(() => {
    // Simulate admin check
    const checkAdminStatus = () => {
      // For demo purposes, make user admin if logged in
      if (isLoggedIn) {
        setIsAdmin(true);
      }
    };
    
    checkAdminStatus();
  }, [isLoggedIn]);

  // Listen for admin panel shortcut (Ctrl+Shift+A)
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A' && isAdmin) {
        setShowAdminPanel(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isAdmin]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      
      {/* Логотип в левом верхнем углу */}
      <div className="logo-left">
        soaring
      </div>
      
      {/* Профиль пользователя в правом верхнем углу */}
      <UserProfile onAuthSuccess={(success) => setIsLoggedIn(success)} />
      
      <Header isLoggedIn={isLoggedIn} userData={isLoggedIn ? userData : undefined} />
      
      <main className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="center-box">
          <div className="glow-top-right"></div>
          <div className="glow-bottom-left"></div>
          <h1 className="center-text-main">Be smarter than the rest of us</h1>
          <p className="center-text-sub">Delightful script for neverlose & gamesense</p>
        </div>
      </main>

      {/* Admin Panel */}
      {showAdminPanel && isAdmin && (
        <AdminPanel
          isOpen={showAdminPanel}
          onClose={() => setShowAdminPanel(false)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/id/:id" element={<PublicProfile />} />
        <Route path="/profile/:id" element={<PublicProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;