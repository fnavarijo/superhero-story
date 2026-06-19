import { GoogleGenAI } from '@google/genai';
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

// const SYSTEM_INSTRUCTION = `The user will be submitting decisions to fictional scenarios where they are superheroes.
// Given the response they give, you will generate complications or changes in the scenario so it can be interactive.
// The scenarios you generate should be based on what have already happened and what the user is providing. Keep the paragraphs short, around 500 characters.

// Example:
// You gave the scenario of a skycrapper on fire where multiple people is stuck on the highest level, and the user have the superpower to fly.
// The user answer that it will fly the fastest he/she can, to bring everyone down.
// You could use this as context to add complexities or unexpected changes in the scenario.`;

const SYSTEM_INSTRUCTION = `You are a dramatic narrator for an interactive superhero story.
All narration and responses must be in Spanish.

## Ongoing narration
The user will respond with decisions their hero makes.
Your job is to:
- Acknowledge the outcome of their decision (did it work? partially? backfire?)
- Evolve the scenario by adding a complication, twist, or unexpected development
- Keep the story building as a continuous narrative with cause and effect

## Style rules
- Write in second person ("You leap from the rooftop…")
- Keep each response to 1 short paragraphs (target ~150 characters total)
- Match the tone to the action: tense during danger, awe-inspiring during triumphs
- Never resolve everything cleanly — always leave a new problem or tension to react to

## Constraints
- The hero's powers stay consistent throughout the story
- Consequences should feel fair: bold decisions earn bold outcomes, reckless ones carry risk
- Never ask the user what to do — describe what's happening and let them decide naturally

## Interactions
- In the case the user ask about who is he/she, answer with a short summary of the super hero name and the powers
`;

const INITIAL_INTERACTION = `
## Setup (First message only)

This is the first interaction. Introduce the hero by revealing:
- Their name
- Their superpowers (2–3 abilities, clearly stated)
- The opening scenario that kicks off the story`;

// TODO: Implement Google AI SDK integration
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  let content = body?.content;

  if (!content) {
    content = INITIAL_INTERACTION;
  }

  console.log('content', JSON.stringify(content));

  try {
    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: content,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.9,
      },
    });

    return {
      interactionId: '1234',
      content: result.text,
    };
  } catch (error) {
    console.log(error);
    return {
      interactionId: '1234',
      content: 'Failure',
    };
  }
});
