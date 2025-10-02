
import React, { useState, useEffect, useCallback } from 'react';
import type { PromptData } from '../types';

interface GeneratedPromptProps {
  data: PromptData;
}

const generatePromptText = (data: PromptData): string => {
  const sections = [
    { title: 'ROLE', content: data.persona, placeholder: '[Answer from Persona]' },
    { title: 'TASK', content: data.task, placeholder: '[Answer from Task]' },
    { title: 'CONTEXT', content: data.context },
    { title: 'EXAMPLE', content: data.example },
    { title: 'EVALUATION', content: data.evaluation },
    { title: 'REFINEMENTS', content: data.refinements },
    { title: 'CONSTRAINTS', content: data.constraints },
  ];

  let prompt = '';

  sections.forEach(section => {
    if (section.content || section.placeholder) {
      prompt += `**${section.title}**\n${section.content || section.placeholder}\n\n`;
    }
  });

  return prompt.trim();
};


const GeneratedPrompt: React.FC<GeneratedPromptProps> = ({ data }) => {
  const [copyButtonText, setCopyButtonText] = useState('Copy Prompt');
  const promptText = generatePromptText(data);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(promptText).then(() => {
      setCopyButtonText('Copied!');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      setCopyButtonText('Copy Failed');
    });
  }, [promptText]);

  useEffect(() => {
    if (copyButtonText === 'Copied!' || copyButtonText === 'Copy Failed') {
      const timer = setTimeout(() => {
        setCopyButtonText('Copy Prompt');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copyButtonText]);

  return (
    <div className="bg-ad-blue text-ad-text-light p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-ad-gold mb-4">Your Generated Prompt</h2>
      <div className="bg-ad-text-dark/50 p-4 rounded-md mb-4">
        <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
          {promptText}
        </pre>
      </div>
      <button
        onClick={handleCopy}
        className="w-full bg-ad-gold text-ad-blue font-bold py-3 px-4 rounded-md hover:bg-yellow-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-ad-blue focus:ring-ad-gold"
      >
        {copyButtonText}
      </button>
    </div>
  );
};

export default GeneratedPrompt;