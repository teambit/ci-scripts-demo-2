import React from 'react';
import { render, screen } from '@testing-library/react';
import { BasicHeader } from './header.composition.js';

describe('Header component', () => {
  it('should render navigation items correctly', () => {
    render(<BasicHeader />);
    
    // Check if navigation items are rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('should render user menu items correctly', () => {
    render(<BasicHeader />);
    
    // Check if user menu items are rendered
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it.skip('should render logo correctly', () => {
    render(<BasicHeader />);
    
    // Check if logo is rendered
    expect(screen.getByText('Logo')).toBeInTheDocument();
  });
});
