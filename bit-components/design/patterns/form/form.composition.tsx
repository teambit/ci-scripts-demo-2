import React from 'react';
import { Form } from './form.js';

export const BasicForm = () => {
  const fields = [
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

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <Form
        fields={fields}
        onSubmit={(values) => console.log('Form submitted:', values)}
        submitLabel="Sign Up"
      />
    </div>
  );
};

export const FormWithSelect = () => {
  const fields = [
    {
      name: 'name',
      label: 'Name',
      type: 'text' as const,
      placeholder: 'Enter your name',
      required: true,
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select' as const,
      placeholder: 'Select your role',
      required: true,
      options: [
        { label: 'Developer', value: 'developer' },
        { label: 'Designer', value: 'designer' },
        { label: 'Product Manager', value: 'pm' },
      ],
    },
  ];

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <Form
        fields={fields}
        onSubmit={(values) => console.log('Form submitted:', values)}
        submitLabel="Update Profile"
      />
    </div>
  );
};

export const FormWithInitialValues = () => {
  const fields = [
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
    {
      name: 'role',
      label: 'Role',
      type: 'select' as const,
      placeholder: 'Select your role',
      required: true,
      options: [
        { label: 'Developer', value: 'developer' },
        { label: 'Designer', value: 'designer' },
        { label: 'Product Manager', value: 'pm' },
      ],
    },
  ];

  const initialValues = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'developer',
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <Form
        fields={fields}
        initialValues={initialValues}
        onSubmit={(values) => console.log('Form submitted:', values)}
        submitLabel="Save Changes"
      />
    </div>
  );
};
