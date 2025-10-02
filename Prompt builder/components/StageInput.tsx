import React from 'react';
import type { PromptData } from '../types';

interface StageInputProps {
  stage: number;
  title: string;
  description: string;
  label: string;
  value: string;
  name: keyof PromptData;
  onChange: (name: keyof PromptData, value: string) => void;
  isTextarea?: boolean;
  tips?: string;
}

const StageInput: React.FC<StageInputProps> = ({
  stage,
  title,
  description,
  label,
  value,
  name,
  onChange,
  isTextarea = false,
  tips,
}) => {
  const commonInputStyles = "w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-ad-gold focus:border-ad-gold transition duration-150 ease-in-out text-ad-text-dark";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(name, e.target.value);
  };

  const hasHeader = title.trim() !== '';

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 transition-all duration-300 hover:shadow-lg">
      {hasHeader && (
        <h3 className="text-xl font-bold text-ad-blue mb-2">
          <span className="bg-ad-blue text-ad-gold rounded-full w-8 h-8 inline-flex items-center justify-center mr-3">{stage}</span>
          {title}
        </h3>
      )}
      <p className={`text-gray-600 mb-4 ${hasHeader ? 'ml-11' : ''}`}>{description}</p>
      <div className={hasHeader ? 'ml-11' : ''}>
        <label htmlFor={name} className="block text-sm font-bold text-ad-text-dark mb-2">
          {label}
        </label>
        {isTextarea ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={handleInputChange}
            rows={5}
            className={commonInputStyles}
            aria-label={label}
          />
        ) : (
          <input
            type="text"
            id={name}
            name={name}
            value={value}
            onChange={handleInputChange}
            className={commonInputStyles}
            aria-label={label}
          />
        )}
        {tips && (
          <div className="mt-3 flex items-start text-sm text-gray-500 bg-gray-50 p-3 rounded-md">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0 text-ad-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <p className="italic">{tips}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StageInput;