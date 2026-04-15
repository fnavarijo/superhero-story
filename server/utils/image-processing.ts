import { GenerateContentResponse } from '@google/genai';
import fs from 'node:fs';

export async function processImages(
  stream: AsyncGenerator<GenerateContentResponse>,
) {
  const generatedFileNames = [];
  let imageIndex = 0;

  for await (const chunk of stream) {
    for (const part of chunk.candidates?.[0]?.content?.parts ?? []) {
      if (part.text) {
        console.debug(part.text);
      } else if (part.inlineData?.data) {
        const outputDir = 'public';
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }
        const fileName = `${outputDir}/generated_image${imageIndex++}.png`;
        console.debug(`Writing response image to file: ${fileName}.`);
        try {
          fs.writeFileSync(
            fileName,
            Buffer.from(part.inlineData.data, 'base64'),
          );
          generatedFileNames.push(fileName);
        } catch (error) {
          console.error(`Failed to write image file ${fileName}:`, error);
        }
      }
    }
  }

  return generatedFileNames;
}
