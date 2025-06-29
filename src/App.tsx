import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AnimatedBackground from './components/AnimatedBackground';
import UserProfile from './components/UserProfile';
import NotFound from './components/NotFound';

function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      
      {/* Логотип в левом верхнем углу */}
      <div className="logo-left">
        soaring
      </div>
      
      {/* Профиль пользователя в правом верхнем углу */}
      <UserProfile />
      
      <Header />
      <main className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="center-box">
          <div className="glow-top-right"></div>
          <div className="glow-bottom-left"></div>
          <h1 className="center-text-main">Be smarter than the rest of us</h1>
          <p className="center-text-sub">Delightful script for neverlose & gamesense</p>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;