export class SpeechRecognitionManager {
  private recognition: SpeechRecognition | null = null;
  private onResultCallback: ((transcript: string) => void) | null = null;
  private onErrorCallback: ((error: string) => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'ja-JP';
        this.setupEventListeners();
      }
    }
  }

  private setupEventListeners() {
    if (!this.recognition) return;

    this.recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      this.onResultCallback?.(transcript);
    };

    this.recognition.onerror = (event) => {
      this.onErrorCallback?.(event.error);
    };
  }

  public setCallbacks(
    onResult: (transcript: string) => void,
    onError?: (error: string) => void
  ) {
    this.onResultCallback = onResult;
    this.onErrorCallback = onError;
  }

  public start() {
    if (this.recognition) {
      try {
        this.recognition.start();
        return true;
      } catch (error) {
        console.error('Error starting recognition:', error);
        return false;
      }
    }
    return false;
  }

  public stop() {
    if (this.recognition) {
      this.recognition.stop();
      return true;
    }
    return false;
  }

  public isSupported() {
    return !!this.recognition;
  }
}