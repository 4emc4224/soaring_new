import React from 'react';
import Navigation from './Navigation';

interface HeaderProps {
  isLoggedIn?: boolean;
  userData?: {
    username: string;
    email: string;
  };
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn = false, userData }) => {
  return (
    <header className="header-minimal">
      <div className="flex items-center justify-center h-full px-6">
        <Navigation />
      </div>
    </header>
  );
};

export default Header;