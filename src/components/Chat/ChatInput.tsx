import React, { useState } from "react";
import { InputControls } from "./InputControls";

interface ChatInputProps {
  isListening: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  onSend: (message: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  isListening,
  onStartListening,
  onStopListening,
  onSend,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;
    onSend(inputValue);
    setInputValue(""); // 送信後に入力欄をクリア
  };

  return (
    <div className="border-t pt-4">
      <div className="flex items-center gap-2">
        <InputControls
          isListening={isListening}
          onStartListening={onStartListening}
          onStopListening={onStopListening}
          onSend={handleSend}
          isInputEmpty={!inputValue.trim()}
        />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="音声で話すか、ここにテキストを入力してください..."
          className="flex-1 p-2 border rounded-lg"
        />
      </div>
    </div>
  );
};
