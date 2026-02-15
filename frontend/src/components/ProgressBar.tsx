import React from 'react';
import { ProcessingStep } from '@/types';

interface ProgressBarProps {
  currentStep: ProcessingStep;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Details' },
    { number: 2, label: 'Review' },
    { number: 3, label: 'Processing' },
    { number: 4, label: 'Result' },
  ];

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  currentStep > step.number
                    ? 'bg-white text-black'
                    : currentStep === step.number
                    ? 'bg-white text-black ring-2 ring-white/50 ring-offset-2 ring-offset-black'
                    : 'bg-white/10 text-gray-500 border border-white/20'
                }`}
              >
                {currentStep > step.number ? '✓' : step.number}
              </div>
              <div
                className={`mt-2 text-xs font-medium transition-colors ${
                  currentStep >= step.number ? 'text-white' : 'text-gray-500'
                }`}
              >
                {step.label}
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 mb-6">
                <div
                  className={`h-full transition-all duration-500 ${
                    currentStep > step.number ? 'bg-white' : 'bg-white/20'
                  }`}
                ></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
