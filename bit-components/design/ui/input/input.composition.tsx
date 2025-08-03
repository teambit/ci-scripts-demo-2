import { Input } from './input.js';

export const BasicInput = () => {
  return (
    <Input 
      label="Basic Input"
      placeholder="Enter text here"
    />
  );
};

export const InputWithHelperText = () => {
  return (
    <Input 
      label="Input with Helper Text"
      placeholder="Enter text here"
      helperText="This is a helper text"
    />
  );
};

export const InputWithError = () => {
  return (
    <Input 
      label="Input with Error"
      placeholder="Enter text here"
      error="This field is required"
    />
  );
};
