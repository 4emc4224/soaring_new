import React, { useState } from 'react';
import Navigation from './Navigation';
import { MessageCircle } from 'lucide-react';
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
              className="ticket-btn"
              onClick={() => setShowTicketSystem(true)}
              title="Support Tickets"
            >
              <MessageCircle size={18} />
              <span>Support</span>
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