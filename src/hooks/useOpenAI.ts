import { useEffect, useState, useCallback } from 'react';
import { OpenAIService } from '../services/openai';
import { Message } from '../types/chat';
import { getFallbackResponse } from '../utils/fallbackResponses';
import { logger } from '../utils/logger';

export const useOpenAI = () => {
  const [openAI, setOpenAI] = useState<OpenAIService | null>(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (apiKey) {
      setOpenAI(new OpenAIService(apiKey));
    } else {
      logger.warn('No API key found, using fallback responses');
      setIsUsingFallback(true);
    }
  }, []);

  const sendMessage = useCallback(async (messages: Message[]): Promise<string> => {
    if (isUsingFallback || !openAI) {
      logger.info('Using fallback response');
      return getFallbackResponse(messages[messages.length - 1].content);
    }

    try {
      return await openAI.chat(messages);
    } catch (error) {
      logger.error('Failed to get AI response:', error);
      return getFallbackResponse(messages[messages.length - 1].content);
    }
  }, [openAI, isUsingFallback]);

  return { sendMessage, isUsingFallback };
};