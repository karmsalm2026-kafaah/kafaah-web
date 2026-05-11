import { google } from '@ai-sdk/google';
import { streamText, stepCountIs, convertToModelMessages } from 'ai';
import { tool } from 'ai';
import { z } from 'zod';
import { chatbotKnowledge } from '@/lib/chatbotKnowledge';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Convert UIMessages (from the client) to ModelMessages (for the LLM)
  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: google('gemini-2.0-flash'),
    system: chatbotKnowledge,
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
}
