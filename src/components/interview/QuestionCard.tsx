import React, { useState, useEffect, useRef } from 'react';
import { InterviewQuestion, Field } from '../../types';
import { Lightbulb, Send, Mic, MicOff, AlertCircle, Sparkles, ChevronRight, HelpCircle } from 'lucide-react';

interface QuestionCardProps {
  question: InterviewQuestion;
  field: Field;
  currentIndex: number;
  totalQuestions: number;
  onSubmitAnswer: (answer: string) => void;
  onCancel: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  field,
  currentIndex,
  totalQuestions,
  onSubmitAnswer,
  onCancel,
}) => {
  const [answerText, setAnswerText] = useState<string>('');
  const [showTips, setShowTips] = useState<boolean>(true);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(false);
  const recognitionRef = useRef<any>(null);

  // Reset textarea on question change
  useEffect(() => {
    setAnswerText('');
  }, [question.id]);

  // Setup Web Speech API if supported
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'id-ID';

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          currentTranscript += event.results[i][0].transcript;
        }
        setAnswerText(prev => (prev ? prev + ' ' : '') + currentTranscript.trim());
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleSpeech = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        setIsListening(false);
      }
    }
  };

  const charLength = answerText.trim().length;
  const isMinimumMet = charLength >= 20;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isMinimumMet) return;
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
    onSubmitAnswer(answerText.trim());
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress header */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm mb-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-100 text-blue-800">
              {field.shortName}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Kompetensi: {question.evaluatedCompetency}
            </span>
          </div>

          <div className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
            Pertanyaan {currentIndex + 1} dari {totalQuestions}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-full transition-all duration-300 ease-out"
            style={{ width: `${Math.round(((currentIndex) / totalQuestions) * 100)}%` }}
          />
        </div>
      </div>

      {/* Main question card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-5">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
            {currentIndex + 1}
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              {question.question}
            </h3>
          </div>
        </div>

        {/* Context Tips Accordion */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => setShowTips(!showTips)}
            className="flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800 transition"
          >
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>{showTips ? 'Sembunyikan Tips Menjawab' : 'Tampilkan Tips Menjawab'}</span>
          </button>

          {showTips && (
            <div className="mt-2.5 p-3.5 rounded-lg bg-amber-50/80 border border-amber-200 text-amber-900 text-xs sm:text-sm leading-relaxed">
              <div className="font-semibold mb-1 flex items-center gap-1 text-amber-800">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Panduan Rekruter:
              </div>
              <p>{question.contextTips}</p>
            </div>
          )}
        </div>

        {/* Answer input form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="answer-input" className="text-sm font-semibold text-slate-700">
                Jawaban Anda:
              </label>

              <div className="flex items-center gap-3">
                {speechSupported && (
                  <button
                    type="button"
                    onClick={toggleSpeech}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium border transition ${
                      isListening
                        ? 'bg-red-50 border-red-300 text-red-700 animate-pulse'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                    title="Gunakan mikrofon untuk latihan berbicara langsung"
                  >
                    {isListening ? <MicOff className="w-3.5 h-3.5 text-red-600" /> : <Mic className="w-3.5 h-3.5" />}
                    <span>{isListening ? 'Merekam Suara...' : 'Bicara (Mic)'}</span>
                  </button>
                )}

                <span
                  className={`text-xs font-medium ${
                    charLength >= 20 ? 'text-emerald-600' : 'text-slate-400'
                  }`}
                >
                  {charLength} karakter {charLength < 20 && '(min. 20)'}
                </span>
              </div>
            </div>

            <textarea
              id="answer-input"
              rows={6}
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              placeholder="Ketikkan jawaban Anda di sini seolah-olah sedang berbicara langsung dengan pewawancara industri..."
              className="w-full p-3.5 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-900 text-sm leading-relaxed placeholder:text-slate-400 transition resize-y"
            />
          </div>

          {!isMinimumMet && charLength > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 p-2.5 rounded border border-amber-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>
                Tambahkan penjelasan lebih rinci (minimal 20 karakter) agar sistem rule-based dapat menganalisis kompetensi jawabanmu.
              </span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onCancel}
              className="text-xs font-medium text-slate-500 hover:text-slate-800 transition py-2"
            >
              ← Ganti Bidang Kejuruan
            </button>

            <button
              type="submit"
              disabled={!isMinimumMet}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition shadow-sm ${
                isMinimumMet
                  ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer active:scale-[0.99]'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>{currentIndex + 1 === totalQuestions ? 'Selesai & Lihat Evaluasi' : 'Kirim Jawaban & Lanjut'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
