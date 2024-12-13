import Fastify from 'fastify'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import { OpenAI } from 'openai'
import dotenv from 'dotenv'
import { OPENAI_CONFIG } from './constants.js'
import { getPromptForLanguage } from './prompt.js'

dotenv.config()

const fastify = Fastify({
    logger: true
})

const openai = new OpenAI({
    apiKey: process.env.VITE_OPENAI_API_KEY,
    baseURL: OPENAI_CONFIG.API_URL, 
    defaultHeaders: {
        'HTTP-Referer': 'http://localhost:5173',
        'X-Title': 'Calories Counter'
    }
})

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
fastify.post('/analyze', async (request, reply) => {  // Route simple /analyze
    try {
        console.log(OPENAI_CONFIG.API_URL);
        console.log('📥 Received request body:', request.body);
        const { base64Image, language = 'en' } = request.body;
        if (!base64Image) {
            return reply.code(400).send({
                success: false,
                error: 'Image data is required'
            });
        }

        const promptWithLang = getPromptForLanguage(language);
        
        const response = await openai.chat.completions.create({
            model: OPENAI_CONFIG.MODEL,
            messages: [{
                role: "user",
                content: [{
                    type: "text",
                    text: promptWithLang
                },
                {
                    type: "image_url",
                    image_url: {
                        url: base64Image
                    }
                }]
            }]
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