import React, { useState } from 'react';
import type { PromptData } from './types';
import StageInput from './components/StageInput';
import GeneratedPrompt from './components/GeneratedPrompt';

const App: React.FC = () => {
  const [promptData, setPromptData] = useState<PromptData>({
    task: '',
    persona: '',
    context: '',
    example: '',
    evaluation: '',
    refinements: '',
    constraints: '',
  });

  const [generatedData, setGeneratedData] = useState<PromptData | null>(null);

  const handleInputChange = (name: keyof PromptData, value: string) => {
    setPromptData(prev => ({ ...prev, [name]: value }));
  };

  const handleGeneratePrompt = () => {
    setGeneratedData(promptData);
  };

  const Divider = () => <hr className="my-8 border-t-2 border-ad-gold" />;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-ad-blue text-ad-text-light py-6 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-ad-gold tracking-wide">
            Prompt Perfect
          </h1>
          <p className="mt-2 text-lg text-gray-300">
            A guided console to help you construct effective prompts for AI models.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full">
        {/* Single Column Layout */}
        <div>
          <StageInput
            stage={1}
            title="Task"
            description="Clearly state what you want the AI to do."
            label="Task"
            name="task"
            value={promptData.task}
            onChange={handleInputChange}
            tips="Tip: Be specific and action-oriented. Start with a verb like 'Create', 'Write', 'Analyze', or 'Summarize'. ‘Expert tip’ Write short sentences."
          />
          <StageInput
            stage={1}
            title=""
            description="Define who the AI should be."
            label="Persona / Role"
            name="persona"
            value={promptData.persona}
            onChange={handleInputChange}
            tips="Tip: Think about the tone and expertise you want. Examples: 'a smart marketing expert..', 'a formal academic researcher'."
          />

          <Divider />

          <StageInput
            stage={2}
            title="Context"
            description="Give background information or data the AI needs to complete the task."
            label="Context"
            name="context"
            value={promptData.context}
            onChange={handleInputChange}
            isTextarea={true}
            tips="Tip: Provide the 'why' behind the task. Who is the audience? What is the goal? The more background, the better."
          />

          <Divider />

          <StageInput
            stage={3}
            title="References"
            description="Provide a clear, high-quality example of the desired output."
            label="Example"
            name="example"
            value={promptData.example}
            onChange={handleInputChange}
            isTextarea={true}
            tips="Tip: A good example is worth a thousand words. Describe to the AI exactly what a successful output looks like."
          />

          <Divider />

          <StageInput
            stage={4}
            title="Evaluation"
            description="How should the AI's output be judged? (e.g., accuracy, creativity, tone)"
            label="Evaluation Criteria"
            name="evaluation"
            value={promptData.evaluation}
            onChange={handleInputChange}
            tips="Tip: Define success. 'The code must be well-commented', 'The summary should be under 200 words and use a professional tone'."
          />
          
          {/* Conditionally rendered Generated Prompt and Stage 5 */}
          {generatedData && (
            <>
              <Divider />
              <div className="my-8">
                <GeneratedPrompt data={generatedData} />
              </div>

              <Divider />
              <StageInput
                stage={5}
                title="Iteration"
                description="Add any final adjustments or rules."
                label="Refinements"
                name="refinements"
                value={promptData.refinements}
                onChange={handleInputChange}
                tips="Tip: Use this to guide the AI's behavior. 'If the user asks for code, provide it in Python.' or 'Avoid using technical jargon'."
              />
              <StageInput
                stage={5}
                title=""
                description="Specify things the AI absolutely should not do."
                label="Constraints"
                name="constraints"
                value={promptData.constraints}
                onChange={handleInputChange}
                tips="Tip: Be explicit about boundaries. 'Do not mention competitors.' or 'The response must not exceed 100 words'."
              />
            </>
          )}

          <button
            onClick={handleGeneratePrompt}
            className="w-full bg-ad-blue text-ad-gold font-bold text-lg py-4 px-6 rounded-lg shadow-md hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ad-gold my-8"
            aria-label={generatedData ? "Refresh Prompt" : "Generate Prompt"}
          >
            {generatedData ? 'Refresh Prompt' : 'Generate Prompt'}
          </button>

        </div>
      </main>
      <footer className="text-center py-6 bg-ad-bg text-gray-500 text-sm">
        <p>Built by Achievement Digital, Auckland, New Zealand</p>
      </footer>
    </div>
  );
};

export default App;