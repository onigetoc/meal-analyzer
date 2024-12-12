import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CHART_COLORS } from '../backend/constants';  // Correction du chemin d'import

const NutritionChart = ({ nutritionData }) => {
  const data = [
    { name: 'Protein', value: nutritionData.protein, color: CHART_COLORS.PROTEIN },
    { name: 'Carbs', value: nutritionData.carbs, color: CHART_COLORS.CARBS },
    { name: 'Fat', value: nutritionData.fat, color: CHART_COLORS.FAT }
  ];

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NutritionChart;