import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { BasicDropdown } from './dropdown.composition.js';

describe('Dropdown', () => {
  it('should render with placeholder text', () => {
    render(<BasicDropdown />);
    const placeholder = screen.getByText('Select an option');
    expect(placeholder).toBeTruthy();
  });

  it('should open dropdown on click', () => {
    render(<BasicDropdown />);
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);
    
    // Check if options are rendered
    expect(screen.getByText('Option 1')).toBeTruthy();
    expect(screen.getByText('Option 2')).toBeTruthy();
    expect(screen.getByText('Option 3')).toBeTruthy();
  });

  it('should select an option when clicked', () => {
    const onChangeMock = vi.fn();
    render(
      <div style={{ width: '300px' }}>
        <BasicDropdown onChange={onChangeMock} />
      </div>
    );
    
    // Open dropdown
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);
    
    // Select an option
    const option = screen.getByText('Option 1');
    fireEvent.click(option);
    
    // Check if onChange was called with correct value
    expect(onChangeMock).toHaveBeenCalledWith('1');
  });

  it('should close dropdown when clicking outside', () => {
    render(<BasicDropdown />);
    
    // Open dropdown
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);
    
    // Verify options are visible
    expect(screen.getByText('Option 1')).toBeTruthy();
    
    // Click outside
    fireEvent.mouseDown(document.body);
    
    // Verify options are no longer visible
    expect(screen.queryByText('Option 1')).toBeNull();
  });

  it('should handle keyboard navigation', () => {
    render(<BasicDropdown />);
    const trigger = screen.getByRole('button');
    
    // Open dropdown with Enter key
    fireEvent.keyDown(trigger, { key: 'Enter' });
    expect(screen.getByText('Option 1')).toBeTruthy();
    
    // Close dropdown with Escape key
    fireEvent.keyDown(trigger, { key: 'Escape' });
    expect(screen.queryByText('Option 1')).toBeNull();
  });
});
