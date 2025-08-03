import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from './card.js';
import { vi } from 'vitest';

describe('Card', () => {
  it('renders title and content', () => {
    render(
      <Card title="Test Title">
        <p>Test Content</p>
      </Card>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(
      <Card title="Test Title" subtitle="Test Subtitle">
        <p>Test Content</p>
      </Card>
    );

    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders loading state', () => {
    render(
      <Card title="Test Title" isLoading>
        <p>Test Content</p>
      </Card>
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });

  it('handles click events when clickable', () => {
    const handleClick = vi.fn();
    render(
      <Card title="Test Title" onClick={handleClick}>
        <p>Test Content</p>
      </Card>
    );

    fireEvent.click(screen.getByText('Test Title'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies elevation classes', () => {
    const { rerender } = render(
      <Card title="Test Title" elevation={0}>
        <p>Test Content</p>
      </Card>
    );
    expect(screen.getByTestId('card')).toHaveClass('elevation0');

    rerender(
      <Card title="Test Title" elevation={2}>
        <p>Test Content</p>
      </Card>
    );
    expect(screen.getByTestId('card')).toHaveClass('elevation2');
  });

  it('applies hoverable class when specified', () => {
    render(
      <Card title="Test Title" hoverable>
        <p>Test Content</p>
      </Card>
    );
    expect(screen.getByTestId('card')).toHaveClass('hoverable');
  });

  it('applies custom class name', () => {
    render(
      <Card title="Test Title" className="custom-class">
        <p>Test Content</p>
      </Card>
    );
    expect(screen.getByTestId('card')).toHaveClass('custom-class');
  });

  it('renders footer content when provided', () => {
    render(
      <Card 
        title="Test Title" 
        footer={<button>Action Button</button>}
      >
        <p>Test Content</p>
      </Card>
    );

    expect(screen.getByText('Action Button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
