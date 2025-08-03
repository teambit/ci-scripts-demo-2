import { useState, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';

export type DropdownOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type DropdownProps = {
  /**
   * The options to display in the dropdown
   */
  options: DropdownOption[];
  /**
   * The currently selected value
   */
  value?: string;
  /**
   * Callback when an option is selected
   */
  onChange?: (value: string) => void;
  /**
   * Placeholder text when no option is selected
   */
  placeholder?: string;
  /**
   * Whether the dropdown is disabled
   */
  disabled?: boolean;
  /**
   * Custom trigger element
   */
  trigger?: ReactNode;
};

export function Dropdown({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  trigger,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      const selected = options.find(opt => opt.value === value);
      setSelectedLabel(selected?.label || '');
    } else {
      setSelectedLabel('');
    }
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        setIsOpen(!isOpen);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) setIsOpen(true);
        break;
      default:
        break;
    }
  };

  const handleOptionClick = (option: DropdownOption) => {
    if (option.disabled) return;
    onChange?.(option.value);
    setIsOpen(false);
  };

  const handleOptionKeyDown = (e: React.KeyboardEvent, option: DropdownOption) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOptionClick(option);
    }
  };

  return (
    <div 
      ref={dropdownRef}
      className="relative inline-block w-full"
      onKeyDown={handleKeyDown}
    >
      {trigger ? (
        <div 
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              !disabled && setIsOpen(!isOpen);
            }
          }}
          role="button"
          tabIndex={0}
        >
          {trigger}
        </div>
      ) : (
        <button
          type="button"
          className={`w-full px-4 py-2 text-left border rounded-md ${
            disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white cursor-pointer'
          }`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          {selectedLabel || placeholder}
        </button>
      )}

      {isOpen && (
        <div
          className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto"
          role="listbox"
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-2 cursor-pointer ${
                option.disabled
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'hover:bg-gray-100'
              } ${option.value === value ? 'bg-gray-50' : ''}`}
              onClick={() => handleOptionClick(option)}
              onKeyDown={(e) => handleOptionKeyDown(e, option)}
              role="option"
              aria-selected={option.value === value}
              tabIndex={0}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
