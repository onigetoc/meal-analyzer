export const createImageAnalysisPrompt = (text = "Analyze this meal and provide: 1) List of detected food items with confidence scores 2) Estimated nutrition facts (calories, protein, carbs, fat). Format as JSON with 'detectedItems' array and 'nutrition' object.") => ({
  role: "user",
  content: [
    { type: "text", text },
  ]
});

export const addImageToPrompt = (prompt, base64Image) => ({
  ...prompt,
  content: [
    ...prompt.content,
    {
      type: "image_url",
      image_url: {
        url: `data:image/jpeg;base64,${base64Image}`
      }
    }
  ]
});