import React from 'react';
import { Mic, MicOff, Send } from 'lucide-react';

interface InputControlsProps {
  isListening: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  onSend: () => void;
  isInputEmpty: boolean;
}

export const InputControls: React.FC<InputControlsProps> = ({
  isListening,
  onStartListening,
  onStopListening,
  onSend,
  isInputEmpty,
}) => {
  return (
    <>
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
      <button
        onClick={onSend}
        disabled={isInputEmpty}
        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send size={24} />
      </button>
    </>
  );
};