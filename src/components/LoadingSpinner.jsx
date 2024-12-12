import React from 'react';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
    <span className="ml-3 text-xl">Analyse en cours...</span>
  </div>
);

export default LoadingSpinner;