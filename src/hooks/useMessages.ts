import { useState, useCallback } from 'react';
import { Message } from '../types/chat';

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message]);
  }, []);

  return { messages, addMessage };
};