import React from 'react';
import ImagePreview from './ImagePreview';
import DetectedItems from './DetectedItems';
import NutritionInfo from './NutritionInfo';

const AnalysisResults = ({ imageFile, analysis }) => {
  if (!imageFile) return null;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
      <ImagePreview imageUrl={URL.createObjectURL(imageFile)} />
      
      {analysis && (
        <>
          <DetectedItems items={analysis.detectedItems} />
          <NutritionInfo nutritionData={analysis.nutrition} />
        </>
      )}
    </div>
  );
};

export default AnalysisResults;