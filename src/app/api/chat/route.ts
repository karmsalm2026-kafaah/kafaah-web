import { createGroq } from '@ai-sdk/groq';
import { streamText, generateText, stepCountIs, convertToModelMessages } from 'ai';
import { tool } from 'ai';
import { z } from 'zod';
import { getChatbotKnowledge } from '@/lib/chatbotKnowledge';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Global cache for failed keys (keyIndex -> cooldown expiration timestamp)
const failedKeys = new Map<number, number>();

export async function POST(req: Request) {
  const { messages, locale } = await req.json();

  // Convert UIMessages (from the client) to ModelMessages (for the LLM)
  const modelMessages = await convertToModelMessages(messages);

  // Gather keys from environment variables (primary + backup keys)
  const keys = [
    process.env.GROQ_API_KEY,
    process.env.GROQ_API_KEY_BACKUP_1,
    process.env.GROQ_API_KEY_BACKUP_2,
  ].filter(Boolean) as string[];

  let lastError: any = null;
  const now = Date.now();

  for (let i = 0; i < keys.length; i++) {
    // If this key failed recently (within the 5-minute cooldown), skip it
    if (failedKeys.has(i) && (failedKeys.get(i) || 0) > now) {
      console.log(`[CHATBOT] Key index ${i} is in cooldown, skipping...`);
      continue;
    }

    try {
      const apiKey = keys[i];
      const groqProvider = createGroq({ apiKey });

      // Pre-flight check: verify the key has active quota and is valid
      // This throws immediately if the key is rate-limited (429) or invalid (401).
      await generateText({
        model: groqProvider('llama-3.3-70b-versatile'),
        prompt: 'hi',
      });

      console.log(`[CHATBOT] Pre-flight check passed for key index ${i}. Starting stream...`);

      const result = streamText({
        model: groqProvider('llama-3.3-70b-versatile'),
        system: getChatbotKnowledge(locale),
        messages: modelMessages,
        tools: {
          collectLead: tool({
            description: 'Record a customer lead. Use this tool when the user provides their name, phone number, and inquiry details to request contact or pricing.',
            inputSchema: z.object({
              name: z.string().describe('The name of the customer'),
              phoneOrEmail: z.string().describe('The phone number or email address of the customer'),
              inquiry: z.string().describe('What the customer is interested in (e.g., pricing, specific service)'),
            }),
            execute: async ({ name, phoneOrEmail, inquiry }) => {
              console.log(`[LEAD CAPTURED] Name: ${name}, Contact: ${phoneOrEmail}, Inquiry: ${inquiry}`);
              return {
                status: 'success' as const,
                message: 'Lead recorded successfully. We will contact you soon!',
                leadDetails: { name, phoneOrEmail, inquiry },
              };
            },
          }),
        },
        stopWhen: stepCountIs(2),
      });

      return result.toUIMessageStreamResponse();
    } catch (error) {
      console.warn(`[CHATBOT] Key index ${i} failed check. Putting in 5-minute cooldown. Error:`, error);
      failedKeys.set(i, Date.now() + 5 * 60 * 1000); // 5-minute cooldown
      lastError = error;
    }
  }

  // If all keys failed
  console.error('[CHATBOT] All available Groq keys failed.');
  return new Response(
    JSON.stringify({
      error: 'The chatbot service is temporarily unavailable due to API limit restrictions. Please try again in a few minutes.',
      details: lastError?.message || String(lastError),
    }),
    { status: 500, headers: { 'Content-Type': 'application/json' } }
  );
}
