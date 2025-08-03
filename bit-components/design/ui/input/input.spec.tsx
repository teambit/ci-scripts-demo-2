import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './input.js';
import { vi } from 'vitest';

describe('Input', () => {
  it('renders label and input', () => {
    render(<Input label="Test Label" data-testid="test-input" />);
    
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByTestId('test-input')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(<Input label="Test Label" required />);
    
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays error message when provided', () => {
    render(<Input label="Test Label" error="Error message" />);
    
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('displays helper text when provided', () => {
    render(<Input label="Test Label" helperText="Helper text" />);
    
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('handles value changes', () => {
    const handleChange = vi.fn();
    render(<Input label="Test Label" onChange={handleChange} />);
    
    fireEvent.change(screen.getByLabelText('Test Label'), {
      target: { value: 'new value' },
    });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('applies disabled styles when disabled', () => {
    render(<Input label="Test Label" disabled />);
    
    expect(screen.getByLabelText('Test Label')).toBeDisabled();
  });

  it('renders icon when provided', () => {
    render(
      <Input
        label="Test Label"
        icon={<span data-testid="test-icon">🔍</span>}
      />
    );
    
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('renders icon after when provided', () => {
    render(
      <Input
        label="Test Label"
        iconAfter={<span data-testid="test-icon-after">✓</span>}
      />
    );
    
    expect(screen.getByTestId('test-icon-after')).toBeInTheDocument();
  });

  it('applies custom class name', () => {
    render(<Input label="Test Label" className="custom-class" />);
    
    expect(screen.getByLabelText('Test Label')).toHaveClass('custom-class');
  });
});
