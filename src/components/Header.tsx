import React from 'react';
import Navigation from './Navigation';

const Header: React.FC = () => {
  return (
    <header className="header-minimal">
      <div className="flex items-center justify-center h-full px-6">
        <Navigation />
      </div>
    </header>
  );
};

export default Header;