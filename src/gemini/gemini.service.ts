import { addTrip } from '@/services/trip.service';

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  SchemaType,
  GenerationConfig,
} from '@google/generative-ai';

const apiKey = import.meta.env.VITE_APP_GEMINI_API_KEY;
if (!apiKey) throw new Error('GEMINI_API_KEY is not set');
const genAI = new GoogleGenerativeAI(apiKey);

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  safetySettings,
});

const generationConfig: GenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
  responseSchema: {
    type: SchemaType.OBJECT,
    properties: {
      response: {
        type: SchemaType.STRING,
      },
      destination: {
        type: SchemaType.STRING,
      },
      startDate: {
        type: SchemaType.STRING,
      },
      endDate: {
        type: SchemaType.STRING,
      },
      duration: {
        type: SchemaType.STRING,
      },
      numberOfPeople: {
        type: SchemaType.STRING,
      },
      budget: {
        type: SchemaType.STRING,
        enum: ['low', 'moderate', 'high'],
      },
      preferences: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.STRING,
        },
      },
      generatedItinerary: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            day: {
              type: SchemaType.INTEGER,
            },
            hotel: {
              type: SchemaType.STRING,
            },
            activities: {
              type: SchemaType.OBJECT,
              properties: {
                morning: {
                  type: SchemaType.OBJECT,
                  properties: {
                    location: {
                      type: SchemaType.STRING,
                    },
                    description: {
                      type: SchemaType.STRING,
                    },
                  },
                  required: ['location', 'description'],
                },
                afternoon: {
                  type: SchemaType.OBJECT,
                  properties: {
                    location: {
                      type: SchemaType.STRING,
                    },
                    description: {
                      type: SchemaType.STRING,
                    },
                  },
                  required: ['location', 'description'],
                },
                evening: {
                  type: SchemaType.OBJECT,
                  properties: {
                    location: {
                      type: SchemaType.STRING,
                    },
                    description: {
                      type: SchemaType.STRING,
                    },
                  },
                  required: ['location', 'description'],
                },
                night: {
                  type: SchemaType.OBJECT,
                  properties: {
                    location: {
                      type: SchemaType.STRING,
                    },
                    description: {
                      type: SchemaType.STRING,
                    },
                  },
                  required: ['location', 'description'],
                },
              },
              required: ['morning', 'afternoon', 'evening', 'night'],
            },
          },
          required: ['day', 'hotel', 'activities'],
        },
      },
    },
    required: [
      'destination',
      'startDate',
      'endDate',
      'duration',
      'numberOfPeople',
      'budget',
      'preferences',
      'generatedItinerary',
    ],
  },
};

type TripQuery = {
  destination: string;
  startDate: string;
  endDate: string;
  duration: number;
  numberOfPeople: number;
  budget: 'low' | 'moderate' | 'high';
  preferences?: string[]; // keywords
};

const history = [
  {
    role: 'user',
    parts: [
      {
        text: 'Generate Trip Plan for me for the location: "Paris", from start date: "2024-11-01" to end date: "2024-11-05" for 2 people in low Budget. The people going on the trip prefer culture, art,  food so generate plan accordingly. Give me in generatedItinerary property the list of days with day count, hotel name to stay at, activities to do in the day one for morning, afternoon, evening, night, for each activity tell me the location and description of the activity.',
      },
    ],
  },
  {
    role: 'model',
    parts: [
      {
        text: '```json\n{"budget": "low", "destination": "Paris", "duration": 4, "endDate": "2024-11-05", "generatedItinerary": [{"activities": {"afternoon": {"description": "Visit the Louvre Museum, focusing on key works like the Mona Lisa and Venus de Milo to avoid museum fatigue.", "location": "Louvre Museum"}, "evening": {"description": "Enjoy a picnic dinner along the Seine River, taking in the beautiful city views.", "location": "Seine River"}, "morning": {"description": "Start your day with a visit to the Eiffel Tower. Pre-book your tickets to skip the long queues.", "location": "Eiffel Tower"}, "night": {"description": "Experience a traditional French dinner at a local bistro in the Latin Quarter.", "location": "Latin Quarter"}}, "day": 1, "hotel": "HotelF1 Paris"}, {"activities": {"afternoon": {"description": "Explore the charming streets of Montmartre, visiting the Sacré-Cœur Basilica and Place du Tertre.", "location": "Montmartre"}, "evening": {"description": "Enjoy a delicious and affordable crepe from a street vendor.", "location": "Street vendor in Montmartre"}, "morning": {"description": "Visit the Musée d\'Orsay, known for its Impressionist and Post-Impressionist masterpieces.", "location": "Musée d\'Orsay"}, "night": {"description": "Return to the hotel and relax.", "location": "HotelF1 Paris"}}, "day": 2, "hotel": "HotelF1 Paris"}, {"activities": {"afternoon": {"description": "Take a leisurely walk along the Seine River, admiring the bridges and architecture.", "location": "Seine River"}, "evening": {"description": "Indulge in a final French dinner, trying a traditional dish like Boeuf Bourguignon.", "location": "Traditional French restaurant"}, "morning": {"description": "Visit the Palace of Versailles, exploring the palace and gardens.", "location": "Palace of Versailles"}, "night": {"description": "Relax at the hotel, preparing for departure.", "location": "HotelF1 Paris"}}, "day": 3, "hotel": "HotelF1 Paris"}, {"activities": {"afternoon": {"description": "Depart from Paris", "location": "Charles de Gaulle Airport"}, "evening": {"description": "N/A", "location": "N/A"}, "morning": {"description": "Visit a local market and enjoy some final Parisian pastries.", "location": "Local Market"}, "night": {"description": "N/A", "location": "N/A"}}, "day": 4, "hotel": "N/A"}], "numberOfPeople": 2, "preferences": ["culture", "art", "food"], "startDate": "2024-11-01"}\n\n```',
      },
    ],
  },
];

async function generateTrip(userId: string, tripQuery: TripQuery) {
  try {
    const { destination, startDate, endDate, numberOfPeople, budget, preferences } = tripQuery;
    const prompt = `
      Generate Trip Plan for me for the location: "${destination}", 
      from start date: "${startDate}" to end date: "${endDate}" for ${numberOfPeople} people in ${budget} budget. 
      ${preferences && `The people going on the trip prefer ${preferences.join(', ')}.`} 
      Generate an itinerary in the 'generatedItinerary' property.
    `;

    const chatSession = model.startChat({
      generationConfig,
      history: history,
    });

    const response = await chatSession.sendMessage(prompt);
    const result = JSON.parse(response.response.text());

    // Save trip to database
    const tripId = await addTrip(userId, result);

    return { result, tripId };
  } catch (error) {
    console.error('Error generating trip:', error);
    throw new Error('Trip generation failed. Please try again.');
  }
}

export { generateTrip };
