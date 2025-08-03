import React, { forwardRef } from 'react';
import styles from './input.module.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'children'> {
  /** Label text for the input */
  label?: string;
  /** Type of input (text, password, email, etc.) */
  type?: string;
  /** Current value of the input */
  value?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the input is required */
  required?: boolean;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Error message to display */
  error?: string;
  /** Helper text to display below the input */
  helperText?: string;
  /** Icon to display before the input */
  icon?: React.ReactNode;
  /** Icon to display after the input */
  iconAfter?: React.ReactNode;
  /** Callback fired when the value changes */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Test ID for the input */
  'data-testid'?: string;
  /** Additional class name for the input */
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      type = 'text',
      value,
      placeholder,
      required,
      disabled,
      error,
      helperText,
      icon,
      iconAfter,
      onChange,
      'data-testid': testId,
      className,
      ...props
    },
    ref
  ) => {
    const inputClassName = [
      styles.input,
      error && styles.error,
      disabled && styles.disabled,
      icon && styles.hasIcon,
      iconAfter && styles.hasIconAfter,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={styles.container}>
        {label && (
          <label className={styles.label} htmlFor={testId || 'input'}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <div className={styles.inputWrapper}>
          {icon && <span className={styles.icon}>{icon}</span>}
          <input
            ref={ref}
            id={testId || 'input'}
            type={type}
            value={value}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            onChange={onChange}
            className={inputClassName}
            aria-invalid={!!error}
            aria-describedby={error || helperText ? 'input-description' : undefined}
            data-testid={testId}
            {...props}
          />
          {iconAfter && <span className={styles.iconAfter}>{iconAfter}</span>}
        </div>
        {error && <p className={styles.errorText}>{error}</p>}
        {helperText && !error && (
          <p className={styles.helperText} id="input-description">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
