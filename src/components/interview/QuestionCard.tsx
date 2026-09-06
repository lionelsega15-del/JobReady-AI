import React, { useState, useEffect, useRef } from 'react';
import { InterviewQuestion, Field } from '../../types';
import { Lightbulb, Mic, MicOff, AlertCircle, ChevronRight, HelpCircle, UserCheck } from 'lucide-react';

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

  const insertStarTemplate = () => {
    const starTemplate = '[Situasi]: Pada saat kegiatan praktik/magang, ...\n[Tindakan]: Langkah teknis yang saya lakukan adalah ...\n[Hasil]: Hasilnya masalah dapat diselesaikan dan ...';
    if (!answerText) {
      setAnswerText(starTemplate);
    } else {
      setAnswerText(prev => prev + '\n\n' + starTemplate);
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
    <div className="max-w-3xl mx-auto w-full">
      {/* Progress header */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs mb-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60">
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
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm mb-5">
        {/* Recruiter Persona Header */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs">
              <UserCheck className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <span className="font-semibold text-slate-800">Tim Penguji Rekrutmen Vokasi</span>
              <span className="text-slate-400 text-[11px] block sm:inline sm:ml-2 sm:before:content-['•'] sm:before:mr-2">
                Simulasi Wawancara Kejuruan
              </span>
            </div>
          </div>
          <span className="text-[11px] text-slate-400 font-medium hidden sm:block">
            Standar DUDI
          </span>
        </div>

        <div className="flex items-start gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
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
            className="flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800 transition cursor-pointer"
          >
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>{showTips ? 'Sembunyikan Panduan Menjawab' : 'Lihat Petunjuk Rekruter'}</span>
          </button>

          {showTips && (
            <div className="mt-2.5 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-900 text-xs sm:text-sm leading-relaxed">
              <div className="font-semibold mb-1 flex items-center gap-1.5 text-amber-900">
                <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                <span>Poin yang Dicari Pewawancara:</span>
              </div>
              <p>{question.contextTips}</p>
            </div>
          )}
        </div>

        {/* Answer input form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <label htmlFor="answer-input" className="text-sm font-semibold text-slate-800">
                Jawaban Lisan / Tulisan Anda:
              </label>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={insertStarTemplate}
                  className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 transition cursor-pointer"
                  title="Sisipkan struktur Situasi-Tugas-Aksi-Hasil ke dalam jawaban"
                >
                  + Format STAR
                </button>

                {speechSupported && (
                  <button
                    type="button"
                    onClick={toggleSpeech}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium border transition cursor-pointer ${
                      isListening
                        ? 'bg-rose-50 border-rose-300 text-rose-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                    title="Gunakan mikrofon untuk latihan berbicara langsung"
                  >
                    {isListening ? (
                      <>
                        <MicOff className="w-3.5 h-3.5 text-rose-600" />
                        <span className="flex items-center gap-0.5">
                          <span className="w-1 bg-rose-500 rounded-full animate-wave-1"></span>
                          <span className="w-1 bg-rose-500 rounded-full animate-wave-2"></span>
                          <span className="w-1 bg-rose-500 rounded-full animate-wave-3"></span>
                          <span className="w-1 bg-rose-500 rounded-full animate-wave-4"></span>
                        </span>
                        <span className="font-bold text-rose-700">Merekam...</span>
                      </>
                    ) : (
                      <>
                        <Mic className="w-3.5 h-3.5 text-slate-600" />
                        <span>Bicara (Mic)</span>
                      </>
                    )}
                  </button>
                )}

                <span
                  className={`text-xs font-medium ${
                    charLength >= 20 ? 'text-emerald-600 font-semibold' : 'text-slate-400'
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
              placeholder="Contoh: Pada saat saya praktikum di sekolah, saya pernah menghadapi kendala... Tindakan teknis yang saya ambil adalah... Hasilnya pekerjaan selesai dengan baik."
              className="w-full p-3.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-900 text-sm leading-relaxed placeholder:text-slate-400 transition resize-y"
            />
          </div>

          {!isMinimumMet && charLength > 0 && (
            <div className="flex items-center gap-2 text-xs text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
              <span>
                Tambahkan penjelasan lebih terperinci (minimal 20 karakter) agar evaluator dapat menilai struktur dan kata kunci jawaban Anda secara akurat.
              </span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onCancel}
              className="text-xs font-medium text-slate-500 hover:text-slate-800 transition py-2 cursor-pointer"
            >
              ← Ganti Bidang Kejuruan
            </button>

            <button
              type="submit"
              disabled={!isMinimumMet}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition shadow-2xs ${
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
