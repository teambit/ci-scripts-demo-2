import React, { useState } from 'react';
import { Input } from '@automations/design.ui.input';
import { Dropdown } from '@automations/design.ui.dropdown';
import { Button } from '@automations/design.ui.button';
import styles from './form.module.css';

export type FormField = {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'select';
  placeholder?: string;
  options?: { label: string; value: string }[];
  required?: boolean;
  validation?: {
    pattern?: RegExp;
    message?: string;
  };
};

export type FormProps = {
  fields: FormField[];
  onSubmit: (values: Record<string, string>) => void;
  initialValues?: Record<string, string>;
  submitLabel?: string;
  'data-testid'?: string;
};

export function Form({
  fields,
  onSubmit,
  initialValues = {},
  submitLabel = 'Submit',
  'data-testid': testId,
}: FormProps) {
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    const newErrors: Record<string, string> = {};
    fields.forEach((field) => {
      const value = values[field.name] || '';
      if (field.required && !value) {
        newErrors[field.name] = 'This field is required';
      } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors[field.name] = 'Invalid email address';
      } else if (field.validation?.pattern && !field.validation.pattern.test(value)) {
        newErrors[field.name] = field.validation.message || 'Invalid value';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
      data-testid={testId}
      noValidate
    >
      {fields.map((field) => (
        <div key={field.name} className={styles.field}>
          <label htmlFor={field.name} className={styles.label}>
            {field.label}
            {field.required && <span className={styles.required}>*</span>}
          </label>
          {field.type === 'select' ? (
            <Dropdown
              value={values[field.name] || ''}
              onChange={(value) => handleChange(field.name, value)}
              options={field.options || []}
              placeholder={field.placeholder}
            />
          ) : (
            <Input
              id={field.name}
              type={field.type}
              value={values[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              error={errors[field.name]}
              data-testid={`${field.name}-input`}
            />
          )}
          {errors[field.name] && (
            <div className={styles.error} data-testid={`${field.name}-error`}>
              {errors[field.name]}
            </div>
          )}
        </div>
      ))}
      <Button
        type="submit"
        variant="primary"
        size="large"
        disabled={isSubmitting}
        data-testid="submit-button"
      >
        {isSubmitting ? 'Submitting...' : submitLabel}
      </Button>
    </form>
  );
} 