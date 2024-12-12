import axios from 'axios';

const API_URL = '/api'; // Utiliser le proxy Vite au lieu de l'URL complète

export const analyzeImage = async (base64Image) => {
  if (!base64Image) {
    throw new Error('Image data is required');
  }

  try {
    console.log('📤 Sending request to:', `${API_URL}/analyze`);
    const response = await axios.post(`${API_URL}/analyze`, { 
      base64Image 
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 30000 // 30 secondes timeout
    });
    
    console.log('📥 Received response:', response.data);
    if (response.data.success) {
      return response.data.data;
    }
    
    throw new Error(response.data.error || 'Analysis failed');
  } catch (error) {
    console.error('❌ API Error:', error.response?.data || error.message);
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout');
    }
    if (error.response) {
      throw new Error(error.response.data.error || 'Server error');
    }
    throw error;
  }
};