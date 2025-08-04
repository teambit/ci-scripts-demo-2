import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AutomationsTheme } from './automations-theme.js';
import styles from './automations-theme.module.scss';

describe('AutomationsTheme', () => {
  it('renders with children', () => {
    render(
      <MemoryRouter>
        <AutomationsTheme>
          <div>Hello World</div>
        </AutomationsTheme>
      </MemoryRouter>
    );
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('applies the automationsTheme class', () => {
    const { container } = render(
      <MemoryRouter>
        <AutomationsTheme>
          <div>Hello World</div>
        </AutomationsTheme>
      </MemoryRouter>
    );
    expect(container.firstChild).toHaveClass(styles.automationsTheme);
  });

  it('accepts a className prop', () => {
    const { container } = render(
      <MemoryRouter>
        <AutomationsTheme className="custom-class">
          <div>Hello World</div>
        </AutomationsTheme>
      </MemoryRouter>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});