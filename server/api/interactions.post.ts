import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  vertexai: true,
  // project: process.env.GOOGLE_CLOUD_PROJECT,
  // location: process.env.GOOGLE_CLOUD_LOCATION || 'europe-west4',
  apiKey: process.env.GEMINI_API_KEY,
});

const SYSTEM_INSTRUCTION = `The user will be submitting decisions to fictional scenarios where they are superheroes.
Given the response they give, you will generate complications or changes in the scenario so it can be interactive.
The scenarios you generate should be based on what have already happened and what the user is providing. Keep the paragraphs short.

Example:
You gave the scenario of a skycrapper on fire where multiple people is stuck on the highest level, and the user have the superpower to fly. 
The user answer that it will fly the fastest he/she can, to bring everyone down.
You could use this as context to add complexities or unexpected changes in the scenario.`;

// TODO: Implement Google AI SDK integration
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  let contents = body?.content;
  if (!contents) {
    contents =
      'The initial fictional scenario. Indicate what are the user superpowers and what they are facing.';
  }

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.9,
    },
  });

  return {
    interactionId: '1234',
    content: response.text,
  };
});
