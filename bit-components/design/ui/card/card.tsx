import React from 'react';
import styles from './card.module.css';

export type CardProps = {
  /**
   * The title of the card
   */
  title: string;
  /**
   * The subtitle of the card
   */
  subtitle?: string;
  /**
   * The main content of the card
   */
  children: React.ReactNode;
  /**
   * Optional footer content
   */
  footer?: React.ReactNode;
  /**
   * Whether the card is in a loading state
   */
  isLoading?: boolean;
  /**
   * Optional click handler for the entire card
   */
  onClick?: () => void;
  /**
   * The elevation level of the card (0-3)
   */
  elevation?: 0 | 1 | 2 | 3;
  /**
   * Whether the card has a hover effect
   */
  hoverable?: boolean;
  /**
   * Optional data-testid for testing
   */
  'data-testid'?: string;
  /**
   * Optional className for custom styling
   */
  className?: string;
};

export function Card({
  title,
  subtitle,
  children,
  footer,
  isLoading = false,
  onClick,
  elevation = 1,
  hoverable = false,
  'data-testid': testId,
  className,
}: CardProps) {
  const cardClasses = [
    styles.card,
    styles[`elevation${elevation}`],
    hoverable && styles.hoverable,
    onClick && styles.clickable,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={cardClasses}
      onClick={onClick}
      data-testid={testId || 'card'}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      
      <div className={styles.content}>
        {isLoading ? (
          <div className={styles.loading} role="status" aria-label="Loading">
            <div className={styles.loadingSpinner} data-testid="loading-spinner" />
          </div>
        ) : (
          children
        )}
      </div>

      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
}
