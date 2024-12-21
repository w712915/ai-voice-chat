import { useState, useEffect, useRef } from 'react';
import { SpeechRecognitionManager } from '../utils/speechRecognition';

interface UseSpeechRecognitionProps {
  onResult: (transcript: string) => void;
  onError?: (error: string) => void;
}

export const useSpeechRecognition = ({ onResult, onError }: UseSpeechRecognitionProps) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionManager = useRef<SpeechRecognitionManager | null>(null);

  useEffect(() => {
    recognitionManager.current = new SpeechRecognitionManager();
    recognitionManager.current.setCallbacks(onResult, onError);

    return () => {
      if (recognitionManager.current) {
        recognitionManager.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionManager.current?.start()) {
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionManager.current?.stop()) {
      setIsListening(false);
    }
  };

  return {
    isListening,
    startListening,
    stopListening,
    isSupported: recognitionManager.current?.isSupported() ?? false,
  };
};