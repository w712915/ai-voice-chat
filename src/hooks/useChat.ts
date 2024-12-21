import { useState, useCallback } from 'react';
import { Message } from '../types/chat';
import { useOpenAI } from './useOpenAI';
import { useSpeechSynthesis } from './useSpeechSynthesis';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { sendMessage } = useOpenAI();
  const { speak } = useSpeechSynthesis();

  const addMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const handleNewMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      role: 'user',
      content,
    };

    addMessage(userMessage);

    try {
      const response = await sendMessage([...messages, userMessage]);
      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
      };

      addMessage(assistantMessage);
      speak(response);
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: '申し訳ありません。エラーが発生しました。もう一度お試しください。',
      };
      addMessage(errorMessage);
      speak(errorMessage.content);
    }
  }, [messages, sendMessage, speak, addMessage]);

  return {
    messages,
    handleNewMessage,
  };
};