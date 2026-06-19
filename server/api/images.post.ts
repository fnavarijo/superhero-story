import { GoogleGenAI, Modality } from '@google/genai';
import { processImages } from '../utils/image-processing';
import { Agent, setGlobalDispatcher } from 'undici';

setGlobalDispatcher(
  new Agent({
    headersTimeout: 330_000, // 5.5 minutes
    bodyTimeout: 660_000, // 11 minutes
    keepAliveTimeout: 60_000,
    connections: 20,
  }),
);

const ai = new GoogleGenAI({
  httpOptions: {
    timeout: 300_000,
  },
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
