import React from 'react';
import { Message as MessageComponent } from './Message';
import { Message } from '../../types/chat';

interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto mb-4 space-y-4">
      {messages.map((message, index) => (
        <MessageComponent key={index} message={message} />
      ))}
    </div>
  );
};