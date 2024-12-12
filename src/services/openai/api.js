import { openai } from './config';
import { createImageAnalysisPrompt, addImageToPrompt } from './prompts';
import { OPENAI_CONFIG, ERROR_MESSAGES } from '../../config/constants';

export async function analyzeImage(imageFile) {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch('/api/analyze', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
}