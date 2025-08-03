import React from 'react';
import styles from './button.module.css';

export type ButtonProps = {
  /**
   * The content to be displayed inside the button
   */
  children: React.ReactNode;
  /**
   * The variant of the button
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  /**
   * The size of the button
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
  /**
   * Whether the button is in a loading state
   */
  loading?: boolean;
  /**
   * Optional icon to display before the text
   */
  icon?: React.ReactNode;
  /**
   * Optional icon to display after the text
   */
  iconAfter?: React.ReactNode;
  /**
   * Click handler for the button
   */
  onClick?: () => void;
  /**
   * The type of button
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Optional data-testid for testing
   */
  'data-testid'?: string;
};

export function Button({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconAfter,
  onClick,
  type = 'button',
  'data-testid': testId,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${loading ? styles.loading : ''}`}
      disabled={isDisabled}
      onClick={onClick}
      data-testid={testId}
    >
      {loading && (
        <span className={styles.spinner} data-testid="spinner" aria-hidden="true" />
      )}
      {icon && !loading && (
        <span className={styles.icon}>{icon}</span>
      )}
      <span className={styles.content}>{children}</span>
      {iconAfter && !loading && (
        <span className={styles.iconAfter}>{iconAfter}</span>
      )}
    </button>
  );
}
