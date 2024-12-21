import OpenAI from 'openai';
import { Message } from '../types/chat';
import { handleAPIError } from '../utils/errorHandling';

export class OpenAIService {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });
  }

  async chat(messages: Message[]) {
    try {
      const response = await this.client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        temperature: 0.7,
        max_tokens: 150
      });

      return response.choices[0]?.message?.content || '';
    } catch (error) {
      throw handleAPIError(error);
    }
  }
}