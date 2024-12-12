import React from 'react';

const ImagePreview = ({ imageUrl }) => {
  return (
    <div className="w-full mb-6">
      <img 
        src={imageUrl} 
        alt="Repas à analyser" 
        className="w-full h-[300px] object-cover rounded-lg shadow-lg"
      />
    </div>
  );
};

export default ImagePreview;