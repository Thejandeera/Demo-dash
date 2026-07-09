import {
  streamText,
  convertToModelMessages,
  createUIMessageStreamResponse,
  toUIMessageStream,
} from 'ai';
import { createOllama } from 'ai-sdk-ollama';

const ollama = createOllama({
  baseURL: 'http://localhost:11434',
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: ollama('gemma3:4b') as any,
    messages: await convertToModelMessages(messages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}