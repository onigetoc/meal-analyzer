import Fastify from 'fastify'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import {
    OpenAI
} from 'openai'
import dotenv from 'dotenv'
import {
    OPENAI_CONFIG
} from './constants.js' // Ajout de l'import

dotenv.config()

const fastify = Fastify({
    logger: true
})

const openai = new OpenAI({
    apiKey: process.env.VITE_OPENAI_API_KEY
})

const prompt = `
You are an AI assistant trained to analyze food images and estimate their nutritional content. 

Here is the task:

1. Provide a short description in English of the food visible in the image, including the main ingredients and any other relevant details.
2. Estimate the nutritional content of the entire dish. Include the following keys: {'calories': number, 'protein': number, 'carbs': number, 'fat': number}.
3. List all individual food items visible in the image, along with their estimated calorie counts.
4. if there's multiple item like 2 eggs
5. estimate the number of grams of each item

Respond **only** in the following JSON format:
{
  "description": "Short description of the food visible.",
  "nutrition_estimate": {
    "calories": total_calories,
    "protein": total_protein,
    "carbs": total_carbs,
    "fat": total_fat
  },
  "detailed_elements": [
    { "name": "Food item name", "calories": estimated_calories },
    { "name": "Another food item", "calories": estimated_calories }
  ]
}

Do not include any additional text, commentary, or explanations outside of the JSON output.

Here is an example response:
{
  "description": "This dish contains two main elements: slices of pizza and spaghetti with bolognese sauce. Here is a nutritional estimate based on typical portions.",
  "nutrition_estimate": {
    "calories": 800,
    "protein": 30,
    "carbs": 90,
    "fat": 25
  },
  "detailed_elements": [
    { "name": "pizza slice", "calories": 400 },
    { "name": "2 eggs (medium)", "calories": 140 },
    { "name": "tofu (190g)", "calories": 200 },
    { "name": "spaghetti with bolognese sauce", "calories": 400 }
  ]
}
  `;

// const promptOLD = 'Analyze this food image andPlease, give a estimation of the following informations and provide only these details in JSON format: {'calories': number, 'protein': number, 'carbs': number, 'fat': number}';

await fastify.register(cors, {
    origin: true,
    methods: ['GET', 'POST'],
})

await fastify.register(multipart)

// Route de test
fastify.get('/', async (request, reply) => {
    return {
        status: 'OK',
        message: 'Server is running'
    }
})

// Route pour l'analyse d'image
fastify.post('/api/analyze', async (request, reply) => {
    try {
        console.log('📥 Received request body:', request.body);
        const {
            base64Image
        } = request.body;
        if (!base64Image) {
            return reply.code(400).send({
                success: false,
                error: 'Image data is required'
            });
        }

        console.log('🚀 Analyzing image with OpenAI...');
        const response = await openai.chat.completions.create({
            model: OPENAI_CONFIG.MODEL, // Utilisation de la constante
            messages: [{
                role: "user",
                content: [{
                        type: "text",
                        text: prompt
                    },
                    {
                        type: "image_url",
                        image_url: {
                            url: base64Image
                        }
                    }
                ]
            }],
            max_tokens: OPENAI_CONFIG.MAX_TOKENS
        });

        const content = response.choices[0].message.content;
        console.log('📥 OpenAI response:', content);

        // Extraction du JSON de la réponse
        let nutritionData;
        try {
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('No JSON found in response');
            }
            nutritionData = JSON.parse(jsonMatch[0]);
            console.log('✅ Parsed nutrition data:', nutritionData);
        } catch (e) {
            console.error('❌ Parsing error. Raw content:', content);
            // Valeurs par défaut si le parsing échoue
            nutritionData = {
                calories: 0,
                protein: 0,
                carbs: 0,
                fat: 0
            };
        }

        const responseData = {
            success: true,
            data: {
                description: nutritionData.description || '',
                nutrition: nutritionData.nutrition_estimate || {
                    calories: 0,
                    protein: 0,
                    carbs: 0,
                    fat: 0
                },
                detectedItems: nutritionData.detailed_elements || []
            }
        };

        console.log('📤 Sending final response:', JSON.stringify(responseData, null, 2));
        return reply.code(200).send(responseData);

    } catch (error) {
        console.error('❌ Server error details:', error);
        return reply.code(500).send({
            success: false,
            error: error.message || 'Failed to analyze image'
        });
    }
})

const start = async () => {
    try {
        await fastify.listen({
            port: 3000
        })
        console.log('Server is running on http://localhost:3000')
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()