import { googleAI } from '@genkit-ai/googleai';
import { dotprompt, prompt } from '@genkit-ai/dotprompt';
import { configureGenkit } from '@genkit-ai/core';

import * as dotenv from 'dotenv';

dotenv.config();

configureGenkit({
  plugins: [
    googleAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY, apiVersion: 'v1beta' }),
    dotprompt()
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true
});

export async function getChallenge(instruction: string) {
  const newPrompt = await prompt('challenge');

  const result = await newPrompt.generate({
    input: {
      instructions: instruction
    }
  });

  const output = result.text();

  console.log(output)

  return output;
}
