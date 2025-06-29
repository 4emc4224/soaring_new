import React from 'react';

const Navigation: React.FC = () => {
  const navItems = ['Competition', 'Leaderboard', 'Winners', 'Play Together', 'Roulette'];

  return (
    <nav className="flex items-center justify-center space-x-4">
      {navItems.map((item) => (
        <a
          key={item}
          href={`#${item.toLowerCase().replace(' ', '-')}`}
          className="nav-link-minimal"
        >
          {item}
        </a>
      ))}
    </nav>
  );
};

export default Navigation;