import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button.js';
import { vi } from 'vitest';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Button variant="primary">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('primary');

    rerender(<Button variant="secondary">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('secondary');

    rerender(<Button variant="outline">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('outline');

    rerender(<Button variant="danger">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('danger');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Button size="small">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('small');

    rerender(<Button size="medium">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('medium');

    rerender(<Button size="large">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('large');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables the button when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows loading state correctly', () => {
    render(<Button loading>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('loading');
    expect(button).toBeDisabled();
    expect(button).toContainElement(screen.getByTestId('spinner'));
  });

  it('renders icon correctly', () => {
    const icon = <span data-testid="test-icon">🚀</span>;
    render(<Button icon={icon}>Click me</Button>);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('renders iconAfter correctly', () => {
    const icon = <span data-testid="test-icon">→</span>;
    render(<Button iconAfter={icon}>Click me</Button>);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('hides icons when in loading state', () => {
    const icon = <span data-testid="test-icon">🚀</span>;
    render(<Button loading icon={icon}>Click me</Button>);
    expect(screen.queryByTestId('test-icon')).not.toBeInTheDocument();
  });

  it('applies data-testid correctly', () => {
    render(<Button data-testid="test-button">Click me</Button>);
    expect(screen.getByTestId('test-button')).toBeInTheDocument();
  });

  it('renders with correct type attribute', () => {
    const { rerender } = render(<Button type="button">Button</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');

    rerender(<Button type="submit">Button</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');

    rerender(<Button type="reset">Button</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
  });
});
