import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Form } from './form.js';

describe('Form', () => {
  const mockFields = [
    {
      name: 'name',
      label: 'Name',
      type: 'text' as const,
      placeholder: 'Enter your name',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email' as const,
      placeholder: 'Enter your email',
      required: true,
    },
  ];

  it('should render all form fields', () => {
    render(<Form fields={mockFields} onSubmit={() => {}} />);
    
    expect(screen.getByTestId('name-input')).toBeTruthy();
    expect(screen.getByTestId('email-input')).toBeTruthy();
  });

  it('should show required field indicators', () => {
    render(<Form fields={mockFields} onSubmit={() => {}} />);
    
    const requiredIndicators = screen.getAllByText('*');
    expect(requiredIndicators).toHaveLength(2);
  });

  it('should validate required fields', () => {
    const onSubmit = vi.fn();
    render(<Form fields={mockFields} onSubmit={onSubmit} />);
    
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);
    
    expect(screen.getByTestId('name-error')).toHaveTextContent('This field is required');
    expect(screen.getByTestId('email-error')).toHaveTextContent('This field is required');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('should validate email format', async () => {
    const onSubmit = vi.fn();
    render(<Form fields={mockFields} onSubmit={onSubmit} />);
    
    const emailInput = screen.getByTestId('email-input');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);
    
    // Wait for validation to complete
    const emailError = await screen.findByTestId('email-error');
    expect(emailError).toHaveTextContent('Invalid email address');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('should submit form with valid values', () => {
    const onSubmit = vi.fn();
    render(<Form fields={mockFields} onSubmit={onSubmit} />);
    
    const nameInput = screen.getByTestId('name-input');
    const emailInput = screen.getByTestId('email-input');
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);
    
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
    });
  });

  it('should initialize form with values', () => {
    const initialValues = {
      name: 'John Doe',
      email: 'john@example.com',
    };
    
    render(<Form fields={mockFields} onSubmit={() => {}} initialValues={initialValues} />);
    
    const nameInput = screen.getByTestId('name-input');
    const emailInput = screen.getByTestId('email-input');
    
    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
  });
});
