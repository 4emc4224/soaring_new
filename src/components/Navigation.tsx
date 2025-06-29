import React from 'react';

const Navigation: React.FC = () => {
  const navItems = ['Home', 'Media', 'Roulette'];

  return (
    <nav className="flex items-center justify-center space-x-6">
      {navItems.map((item) => (
        <a
          key={item}
          href={`#${item.toLowerCase()}`}
          className="nav-link-minimal"
        >
          {item}
        </a>
      ))}
    </nav>
  );
};

export default Navigation;