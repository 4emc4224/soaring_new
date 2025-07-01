import React, { useState } from 'react';
import Navigation from './Navigation';
import TicketSystem from './TicketSystem';

interface HeaderProps {
  isLoggedIn?: boolean;
  userData?: {
    username: string;
    email: string;
  };
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn = false, userData }) => {
  const [showTicketSystem, setShowTicketSystem] = useState(false);

  return (
    <>
      <header className="header-minimal">
        <div className="flex items-center justify-center h-full px-6">
          <Navigation />
          
          {/* Ticket System Button - Only show when logged in */}
          {isLoggedIn && userData && (
            <button 
              className="support-text-btn"
              onClick={() => setShowTicketSystem(true)}
              title="Support Tickets"
            >
              Support
            </button>
          )}
        </div>
      </header>

      {/* Ticket System Modal */}
      {showTicketSystem && userData && (
        <TicketSystem
          isOpen={showTicketSystem}
          onClose={() => setShowTicketSystem(false)}
          userData={userData}
        />
      )}
    </>
  );
};

export default Header;