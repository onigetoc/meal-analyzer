import React from 'react';
import NutritionChart from './NutritionChart';

const NutritionInfo = ({ nutritionData }) => (
  <div className="mt-6">
    <h2 className="text-xl font-bold mb-4">Valeurs Nutritionnelles:</h2>
    <p className="mb-4">Calories: {nutritionData.calories} kcal</p>
    <NutritionChart nutritionData={nutritionData} />
  </div>
);

export default NutritionInfo;