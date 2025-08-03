import React from 'react';
import { Dropdown } from './dropdown.js';

const handleChange = (value: string) => {
  // Mock function for demonstration
  return value;
};

export const BasicDropdown = ({ onChange }: { onChange?: (value: string) => void }) => {
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];

  return (
    <div style={{ width: '300px' }}>
      <Dropdown
        options={options}
        placeholder="Select an option"
        onChange={onChange}
      />
    </div>
  );
};

export const DisabledDropdown = () => {
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2', disabled: true },
    { label: 'Option 3', value: '3' },
  ];

  return (
    <div style={{ width: '300px' }}>
      <Dropdown
        options={options}
        placeholder="Select an option"
        disabled
        onChange={() => {}}
      />
    </div>
  );
};

export const WithCustomTrigger = () => {
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];

  return (
    <div style={{ width: '300px' }}>
      <Dropdown
        options={options}
        trigger={<button className="px-4 py-2 bg-blue-500 text-white rounded-md">Custom Trigger</button>}
        onChange={() => {}}
      />
    </div>
  );
};
