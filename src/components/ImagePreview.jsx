import React from 'react';

const ImagePreview = ({ imageUrl }) => {
  return (
    <div className="w-full mb-6">
      <img 
        src={imageUrl} 
        alt="Meals to analyze" 
        className="w-full h-[300px] object-cover rounded-t-lg shadow-lg"
      />
    </div>
  );
};

export default ImagePreview;