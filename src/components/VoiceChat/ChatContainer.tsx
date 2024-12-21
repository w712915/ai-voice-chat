import React from 'react';
import { Message } from '../../types/chat';
import { MessageList } from '../MessageList';
import { ChatInput } from '../ChatInput';

interface ChatContainerProps {
  messages: Message[];
  currentTranscript: string;
  isListening: boolean;
  onTranscriptChange: (text: string) => void;
  onStartListening: () => void;
  onStopListening: () => void;
  onSend: () => void;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  currentTranscript,
  isListening,
  onTranscriptChange,
  onStartListening,
  onStopListening,
  onSend,
}) => {
  return (
    <div className="max-w-2xl mx-auto p-4 h-screen flex flex-col">
      <MessageList messages={messages} />
      <ChatInput
        isListening={isListening}
        currentTranscript={currentTranscript}
        onTranscriptChange={onTranscriptChange}
        onStartListening={onStartListening}
        onStopListening={onStopListening}
        onSend={onSend}
      />
    </div>
  );
};