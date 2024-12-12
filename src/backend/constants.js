export const OPENAI_CONFIG = {
  API_URL: 'https://api.openai.com/v1/chat/completions',
  MODEL: 'gpt-4o-mini',  // Remise du modèle original
  MAX_TOKENS: 500  // Remise de la valeur originale
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