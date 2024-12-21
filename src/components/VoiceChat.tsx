import React, { useState, useCallback } from 'react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { useOpenAI } from '../hooks/useOpenAI';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { Message } from '../types/chat';

export const VoiceChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const { speak } = useSpeechSynthesis();
  const { sendMessage } = useOpenAI();

  const handleResult = useCallback((transcript: string) => {
    setCurrentTranscript(transcript);
  }, []);

  const { isListening, startListening, stopListening } = useSpeechRecognition({
    onResult: handleResult,
    onError: (error) => console.error('Speech recognition error:', error),
  });

  const handleSend = useCallback(async () => {
    if (!currentTranscript.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: currentTranscript,
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentTranscript('');

    try {
      const response = await sendMessage([...messages, userMessage]);
      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
      };

      setMessages(prev => [...prev, assistantMessage]);
      speak(response);
    } catch (error) {
      console.error('Failed to get AI response:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'すみません、エラーが発生しました。もう一度お試しください。',
      };
      setMessages(prev => [...prev, errorMessage]);
      speak(errorMessage.content);
    }
  }, [currentTranscript, messages, sendMessage, speak]);

  return (
    <div className="max-w-2xl mx-auto p-4 h-screen flex flex-col">
      <MessageList messages={messages} />
      <ChatInput
        isListening={isListening}
        currentTranscript={currentTranscript}
        onTranscriptChange={setCurrentTranscript}
        onStartListening={startListening}
        onStopListening={stopListening}
        onSend={handleSend}
      />
    </div>
  );
};