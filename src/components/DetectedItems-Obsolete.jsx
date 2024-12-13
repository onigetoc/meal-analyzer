import React from 'react';

const DetectedItems = ({ items }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">Aliments détectés:</h2>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li 
            key={index} 
            className="flex items-center bg-gray-700 p-3 rounded-lg"
          >
            <span className="flex-grow">{item.class}</span>
            <span className="text-sm text-gray-300">
              {Math.round(item.score * 100)}% de confiance
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetectedItems;