export const OPENAI_CONFIG = {
  // API_URL: 'https://api.openai.com/v1', // OPENAI API
  // API_URL: 'https://api.mistral.ai/v1/chat/completions', // MISTRAL API
  API_URL: 'https://openrouter.ai/api/v1', // OPENROUTER API
  // MODEL: 'gpt-4o-mini',  // Remise du modèle original
  // MODEL: 'pixtral-12b-2409',  // MODEL MISTRAL
  MODEL: 'mistralai/pixtral-12b',  // MODEL OPENROUTER
  MAX_TOKENS: 500  // Remise de la valeur originale
};

// Ajoutez ces configurations
export const OPENROUTER_CONFIG = {
  REFERER: 'http://localhost:5173',
  APP_NAME: 'Calories Counter'
};

export const CHART_COLORS = {
  PROTEIN: '#0088FE',
  CARBS: '#00C49F',
  FAT: '#FFBB28'
};

export const ERROR_MESSAGES = {
  ANALYSIS_FAILED: 'Erreur lors de l\'analyse de l\'image',
  INVALID_IMAGE: 'Format d\'image non supporté',
  API_ERROR: 'Erreur de communication avec l\'API',
  PARSING_ERROR: 'Erreur lors du traitement de la réponse',
  NO_API_KEY: 'Clé API OpenAI manquante'
};