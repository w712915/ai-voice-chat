import React, { useState, useCallback } from "react";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";
import { ChatInput } from "../Chat/ChatInput";
import { MessageList } from "../Chat/MessageList";
import { useChat } from "../../hooks/useChat";

export const VoiceChat: React.FC = () => {
  const { messages, handleNewMessage } = useChat();

  const handleResult = useCallback(
    (transcript: string) => {
      handleNewMessage(transcript);
    },
    [handleNewMessage]
  );

  const { isListening, startListening, stopListening } = useSpeechRecognition({
    onResult: handleResult,
    onError: (error) => console.error("音声認識エラー:", error),
  });

  return (
    <div className="max-w-2xl mx-auto p-4 h-screen flex flex-col">
      <MessageList messages={messages} />
      <ChatInput
        isListening={isListening}
        onStartListening={startListening}
        onStopListening={stopListening}
        onSend={handleNewMessage}
      />
    </div>
  );
};
