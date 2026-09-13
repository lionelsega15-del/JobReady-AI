/**
 * Speech Synthesis (Text-to-Speech) Service for JobReady-AI
 * Supports Indonesian natural speech, question reading, and AI vocal feedback
 */

export interface SpeakOptions {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err?: any) => void;
  rate?: number;
  pitch?: number;
}

class SpeechService {
  private voices: SpeechSynthesisVoice[] = [];
  private indonesianVoice: SpeechSynthesisVoice | null = null;
  private isInitialized = false;

  constructor() {
    this.initVoices();
  }

  private initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    const loadVoices = () => {
      this.voices = window.speechSynthesis.getVoices();
      // Find Indonesian voice
      const idVoice = this.voices.find(
        v => v.lang === 'id-ID' || v.lang === 'id_ID' || v.lang.startsWith('id')
      );
      if (idVoice) {
        this.indonesianVoice = idVoice;
      }
      this.isInitialized = true;
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public stop(): void {
    if (this.isSupported()) {
      window.speechSynthesis.cancel();
    }
  }

  public speak(text: string, options?: SpeakOptions): void {
    if (!this.isSupported() || !text) {
      options?.onEnd?.();
      return;
    }

    // Stop any ongoing speech
    this.stop();

    // Clean markdown asterisks or special markers from speech
    const cleanText = text
      .replace(/\*\*/g, '')
      .replace(/\[Situasi\]/gi, 'Situasi:')
      .replace(/\[Tindakan\]/gi, 'Tindakan:')
      .replace(/\[Hasil\]/gi, 'Hasil:');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'id-ID';
    utterance.rate = options?.rate ?? 0.95; // Slightly measured, professional recruiter pace
    utterance.pitch = options?.pitch ?? 1.0;

    if (this.indonesianVoice) {
      utterance.voice = this.indonesianVoice;
    } else {
      // Re-scan in case voices loaded asynchronously
      const voices = window.speechSynthesis.getVoices();
      const idVoice = voices.find(
        v => v.lang === 'id-ID' || v.lang === 'id_ID' || v.lang.startsWith('id')
      );
      if (idVoice) {
        this.indonesianVoice = idVoice;
        utterance.voice = idVoice;
      }
    }

    utterance.onstart = () => {
      options?.onStart?.();
    };

    utterance.onend = () => {
      options?.onEnd?.();
    };

    utterance.onerror = (e) => {
      // 'canceled' error happens normally when stop() is called, treat gracefully
      if (e.error !== 'canceled') {
        console.warn('SpeechSynthesis error:', e);
      }
      options?.onError?.(e);
      options?.onEnd?.();
    };

    window.speechSynthesis.speak(utterance);
  }

  public isSpeaking(): boolean {
    return this.isSupported() && window.speechSynthesis.speaking;
  }
}

export const speechService = new SpeechService();
