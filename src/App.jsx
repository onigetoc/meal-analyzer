import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import FileUpload from './components/FileUpload';
import LoadingSpinner from './components/LoadingSpinner';
import AnalysisResults from './components/AnalysisResults';
import NutritionInfo from './components/NutritionInfo';
import { useImageAnalysis } from './hooks/useImageAnalysis';

const App = () => {
  useEffect(() => {
    console.log('App mounted');
  }, []);

  const { imageFile, loading, analysis, analyzeImageFile } = useImageAnalysis();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <Toaster position="top-right" />
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Analyseur de Repas</h1>
        
        <div className="flex justify-center mb-8">
          <FileUpload onFileSelect={analyzeImageFile} />
        </div>

        {loading && <LoadingSpinner />}
        
        <AnalysisResults 
          imageFile={imageFile} 
          analysis={analysis} 
        />
      </div>
    </div>
  );
};

export default App;