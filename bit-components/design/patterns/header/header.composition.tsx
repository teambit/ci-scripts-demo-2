import React from 'react';
import { Header } from './header.js';

export const BasicHeader = () => {
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ];

  const userMenuItems = [
    { label: 'Profile', onClick: () => console.log('Profile clicked') },
    { label: 'Settings', onClick: () => console.log('Settings clicked') },
    { label: 'Logout', onClick: () => console.log('Logout clicked') },
  ];

  return (
    <Header
      logo={<div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Logo</div>}
      navItems={navItems}
      userMenuItems={userMenuItems}
    />
  );
};
