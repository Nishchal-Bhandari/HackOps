import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        <div className="mt-4 text-center text-gray-300 font-medium">
          Analyzing transaction...
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
