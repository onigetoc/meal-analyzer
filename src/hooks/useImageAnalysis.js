import { useState, useCallback } from 'react';
import { analyzeImage } from '../services/openai';
import { convertToBase64, optimizeImage } from '../utils/imageUtils';
import { ERROR_MESSAGES } from '../backend/constants';
import toast from 'react-hot-toast';

export const useImageAnalysis = () => {
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);

  const analyzeImageFile = useCallback(async (file) => {
    if (!file?.type.startsWith('image/')) {
      toast.error(ERROR_MESSAGES.INVALID_IMAGE);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setImageFile(file);
      setAnalysis(null);  // Reset previous analysis
      
      console.log('🖼️ Processing image...');
      const optimizedImage = await optimizeImage(file);
      console.log('📊 Converting to base64...');
      const base64Image = await convertToBase64(optimizedImage);
      console.log('🚀 Sending to API...');
      const result = await analyzeImage(base64Image);
      
      if (!result?.nutrition) {
        throw new Error(ERROR_MESSAGES.PARSING_ERROR);
      }
      
      console.log('✅ Analysis result:', result);
      setAnalysis(result);
      toast.success('Image analysis completed successfully');
    } catch (error) {
      const errorMessage = error.message || ERROR_MESSAGES.ANALYSIS_FAILED;
      console.error('❌ Analysis error:', error);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    imageFile,
    loading,
    analysis,
    error,
    analyzeImageFile
  };
};