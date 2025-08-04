import React from 'react';
import { render, screen } from '@testing-library/react';
import { Heading } from './heading.js';
import styles from './heading.module.scss';

describe('Heading Component', () => {
  it('should render the correct semantic heading tag', () => {
    render(<Heading level={3}>Test Heading</Heading>);
    const headingElement = screen.getByText('Test Heading');
    expect(headingElement.tagName).toBe('H3');
  });

  it('should apply the correct visual level class', () => {
    render(<Heading level={3} visualLevel={1}>Test Heading</Heading>);
    const headingElement = screen.getByText('Test Heading');
    expect(headingElement).toHaveClass(styles.h1);
  });

  it('should apply the base heading class and custom class', () => {
    render(<Heading level={1} className="custom-class">Test Heading</Heading>);
    const headingElement = screen.getByText('Test Heading');
    expect(headingElement).toHaveClass(styles.heading);
    expect(headingElement).toHaveClass('custom-class');
  });
});