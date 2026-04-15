import { GoogleGenAI, Modality } from '@google/genai';
import { processImages } from '../utils/image-processing';

const ai = new GoogleGenAI({
  vertexai: true,
  apiKey: process.env.GEMINI_API_KEY,
});

// TODO: Implement Google AI SDK integration
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body?.content) {
    throw createError({
      status: 400,
      statusText: 'Missing required content',
    });
  }

  const response = await ai.models.generateContentStream({
    model: 'gemini-2.5-flash-image',
    contents: body.content,
    config: {
      responseModalities: [Modality.TEXT, Modality.IMAGE],
    },
  });

  const generatedFileNames = await processImages(response);

  return {
    image: generatedFileNames,
  };
});
