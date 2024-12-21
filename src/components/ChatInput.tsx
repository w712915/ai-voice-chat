import React from 'react';
import { Mic, MicOff, Send } from 'lucide-react';

interface ChatInputProps {
  isListening: boolean;
  currentTranscript: string;
  onTranscriptChange: (text: string) => void;
  onStartListening: () => void;
  onStopListening: () => void;
  onSend: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  isListening,
  currentTranscript,
  onTranscriptChange,
  onStartListening,
  onStopListening,
  onSend,
}) => {
  return (
    <div className="border-t pt-4">
      <div className="flex items-center gap-2">
        <button
          onClick={isListening ? onStopListening : onStartListening}
          className={`p-2 rounded-full ${
            isListening
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          {isListening ? <MicOff size={24} /> : <Mic size={24} />}
        </button>
        <input
          type="text"
          value={currentTranscript}
          onChange={(e) => onTranscriptChange(e.target.value)}
          placeholder="音声で話すか、ここにテキストを入力してください..."
          className="flex-1 p-2 border rounded-lg"
        />
        <button
          onClick={onSend}
          disabled={!currentTranscript.trim()}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={24} />
        </button>
      </div>
    </div>
  );
};