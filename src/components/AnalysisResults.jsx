import React from 'react';
import ImagePreview from './ImagePreview';
import NutritionInfo from './NutritionInfo';

const AnalysisResults = ({ imageFile, analysis }) => {
  if (!imageFile) return null;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
      <ImagePreview imageUrl={URL.createObjectURL(imageFile)} />
      
      {analysis && (
        <NutritionInfo 
          nutritionData={analysis.nutrition}
          description={analysis.description}
          detectedItems={analysis.detectedItems}
        />
      )}
    </div>
  );
};

export default AnalysisResults;