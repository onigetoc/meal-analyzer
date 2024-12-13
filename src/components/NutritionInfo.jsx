import React from 'react';
import NutritionChart from './NutritionChart';

const NutritionInfo = ({ nutritionData, description, detectedItems }) => (
  <div className="mt-6 bg-gray-800 p-0 rt-6 bg-gray-800 p-0 px-6 pb-4 rounded-xlounded-xl">
    {description && (
      <p className="text-white mb-4">{description}</p>
    )}
    
    <h2 className="text-xl font-bold mb-4">Nutritional Values:</h2>
    <p className="mb-4">Calories: {nutritionData.calories} kcal</p>
    <NutritionChart nutritionData={nutritionData} />
    
    {detectedItems && detectedItems.length > 0 && (
      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Detected Items:</h3>
        <ul className="list-disc pl-5">
          {detectedItems.map((item, index) => (
            <li key={index} className="text-white">
              <span className="font-medium">{item.name}</span>: {item.calories} kcal
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

export default NutritionInfo;