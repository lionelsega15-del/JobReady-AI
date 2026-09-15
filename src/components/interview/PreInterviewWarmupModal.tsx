import React, { useState, useEffect } from 'react';
import { Field } from '../../types';
import { 
  Wind, Volume2, Eye, CheckCircle2, ArrowRight, X, 
  Play, Pause, RotateCcw, Clock
} from 'lucide-react';

interface PreInterviewWarmupModalProps {
  field: Field;
  isOpen: boolean;
  onStartInterview: () => void;
  onClose: () => void;
}

type WarmupTab = 'breathing' | 'vocal' | 'mindset';

export const PreInterviewWarmupModal: React.FC<PreInterviewWarmupModalProps> = ({
  field,
  isOpen,
  onStartInterview,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<WarmupTab>('breathing');
  
  // Box Breathing state (4-4-4-4)
  // Phases: 'inhale' (4s) -> 'hold-in' (4s) -> 'exhale' (4s) -> 'hold-out' (4s)
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold-in' | 'exhale' | 'hold-out'>('inhale');
  const [phaseSecondsLeft, setPhaseSecondsLeft] = useState<number>(4);
  const [cycleCount, setCycleCount] = useState<number>(1);
  const [isBreathingRunning, setIsBreathingRunning] = useState<boolean>(true);

  // Box Breathing Timer
  useEffect(() => {
    if (!isOpen || activeTab !== 'breathing' || !isBreathingRunning) return;

    const timer = setInterval(() => {
      setPhaseSecondsLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        // Switch to next phase
        setBreathingPhase((currPhase) => {
          if (currPhase === 'inhale') return 'hold-in';
          if (currPhase === 'hold-in') return 'exhale';
          if (currPhase === 'exhale') return 'hold-out';
          setCycleCount((c) => c + 1);
          return 'inhale';
        });

        return 4;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, activeTab, isBreathingRunning]);

  if (!isOpen) return null;

  const getPhaseInfo = () => {
    switch (breathingPhase) {
      case 'inhale':
        return {
          stepIndex: 0,
          label: 'Tarik Napas',
          instruction: 'Tarik napas perlahan melalui hidung secara teratur',
          scale: 'scale-110',
          ringColor: 'border-blue-500 bg-blue-50/70 text-blue-900',
        };
      case 'hold-in':
        return {
          stepIndex: 1,
          label: 'Tahan Napas',
          instruction: 'Tahan udara di dada dengan rileks tanpa menegangkan bahu',
          scale: 'scale-110',
          ringColor: 'border-slate-500 bg-slate-100 text-slate-900',
        };
      case 'exhale':
        return {
          stepIndex: 2,
          label: 'Hembuskan',
          instruction: 'Keluarkan napas perlahan dan halus melalui mulut',
          scale: 'scale-95',
          ringColor: 'border-emerald-500 bg-emerald-50/70 text-emerald-900',
        };
      case 'hold-out':
        return {
          stepIndex: 3,
          label: 'Jeda Santai',
          instruction: 'Istirahatkan dada sejenak sebelum tarikan napas berikutnya',
          scale: 'scale-95',
          ringColor: 'border-slate-400 bg-slate-50 text-slate-800',
        };
    }
  };

  const currentPhase = getPhaseInfo();

  const resetBreathing = () => {
    setBreathingPhase('inhale');
    setPhaseSecondsLeft(4);
    setCycleCount(1);
    setIsBreathingRunning(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Clean, Professional Header */}
        <div className="p-5 border-b border-slate-100 bg-white">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                  <Clock className="w-3 h-3" />
                  Persiapan Singkat (1 Menit)
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-medium text-slate-500">
                  {field.shortName}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1 tracking-tight">
                Latihan Kesiapan Pra-Wawancara
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Luangkan 1 menit untuk mengatur ketenangan napas, melenturkan artikulasi, dan memusatkan fokus.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer shrink-0"
              title="Tutup / Lewati"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Segmented Tabs Navigation */}
          <div className="grid grid-cols-3 gap-1 mt-4 p-1 rounded-xl bg-slate-100/90 text-xs font-medium text-slate-600">
            <button
              onClick={() => setActiveTab('breathing')}
              className={`py-2 px-2 rounded-lg text-center transition cursor-pointer ${
                activeTab === 'breathing'
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'hover:text-slate-900'
              }`}
            >
              1. Pernapasan
            </button>

            <button
              onClick={() => setActiveTab('vocal')}
              className={`py-2 px-2 rounded-lg text-center transition cursor-pointer ${
                activeTab === 'vocal'
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'hover:text-slate-900'
              }`}
            >
              2. Artikulasi Suara
            </button>

            <button
              onClick={() => setActiveTab('mindset')}
              className={`py-2 px-2 rounded-lg text-center transition cursor-pointer ${
                activeTab === 'mindset'
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'hover:text-slate-900'
              }`}
            >
              3. Kesiapan Mental
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col justify-center min-h-[300px]">
          {/* TAB 1: PERNAPASAN (BOX BREATHING) */}
          {activeTab === 'breathing' && (
            <div className="flex flex-col items-center text-center space-y-5 my-auto">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Ritme Pernapasan 4 Detik (Putaran {cycleCount})
                </span>
                <p className="text-xs text-slate-600 max-w-sm">
                  Mengatur ritme napas membantu meredakan rasa tegang dan menstabilkan suara sebelum berbicara.
                </p>
              </div>

              {/* Minimalist, Clean Breathing Circle Indicator */}
              <div className="relative w-40 h-40 flex items-center justify-center">
                {/* Subtle track circle */}
                <div className="absolute inset-0 rounded-full border border-slate-200" />

                {/* Animated soft circle */}
                <div 
                  className={`w-32 h-32 rounded-full border-2 flex flex-col items-center justify-center transition-all duration-1000 ease-in-out shadow-xs ${currentPhase.ringColor} ${currentPhase.scale}`}
                >
                  <span className="text-3xl font-bold tracking-tight">{phaseSecondsLeft}s</span>
                  <span className="text-[11px] font-semibold tracking-wide uppercase mt-0.5 opacity-90">
                    {currentPhase.label}
                  </span>
                </div>
              </div>

              {/* Instructions and 4-Step Tracker */}
              <div className="w-full max-w-sm bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-center space-y-2.5">
                <p className="text-xs font-semibold text-slate-800">
                  {currentPhase.instruction}
                </p>

                {/* Step indicator bar */}
                <div className="grid grid-cols-4 gap-1 text-[10px] font-medium pt-1 border-t border-slate-200/60">
                  <div className={`py-1 rounded ${currentPhase.stepIndex === 0 ? 'bg-blue-600 text-white font-bold' : 'text-slate-500'}`}>
                    1. Tarik
                  </div>
                  <div className={`py-1 rounded ${currentPhase.stepIndex === 1 ? 'bg-slate-700 text-white font-bold' : 'text-slate-500'}`}>
                    2. Tahan
                  </div>
                  <div className={`py-1 rounded ${currentPhase.stepIndex === 2 ? 'bg-emerald-600 text-white font-bold' : 'text-slate-500'}`}>
                    3. Hembus
                  </div>
                  <div className={`py-1 rounded ${currentPhase.stepIndex === 3 ? 'bg-slate-700 text-white font-bold' : 'text-slate-500'}`}>
                    4. Jeda
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setIsBreathingRunning(!isBreathingRunning)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  {isBreathingRunning ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Jeda</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span>Lanjutkan</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={resetBreathing}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ulangi</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: ARTIKULASI & POSTUR (CLEAN UNIFIED CARDS) */}
          {activeTab === 'vocal' && (
            <div className="space-y-3.5 my-auto">
              <div className="text-center space-y-0.5">
                <h4 className="text-sm font-bold text-slate-900">Tips Relaksasi Wajah & Artikulasi</h4>
                <p className="text-xs text-slate-500">
                  Lakukan 3 hal sederhana ini sebelum simulasi dimulai:
                </p>
              </div>

              <div className="space-y-2.5">
                {/* Item 1 */}
                <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold text-xs">
                    1
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">
                      Lafalkan Huruf Vokal "A - I - U - E - O"
                    </h5>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Buka mulut secara wajar dan ucapkan vokal dengan jelas untuk melemaskan otot rahang agar kata-kata tidak terdengar bergumam.
                    </p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-800 flex items-center justify-center shrink-0 font-bold text-xs">
                    2
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">
                      Arahkan Pandangan ke Kamera & Tersenyum Wajar
                    </h5>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Lihat langsung ke arah lensa kamera komputer atau laptop saat menjawab untuk menjaga kontak mata yang profesional.
                    </p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold text-xs">
                    3
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">
                      Postur Duduk Tegak dan Bahu Rileks
                    </h5>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Tegakkan punggung secara alami tanpa kaku. Postur yang baik melancarkan pernapasan sehingga intonasi suara terdengar mantap.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: KESIAPAN MENTAL (PRACTICAL VOCATIONAL REMINDERS) */}
          {activeTab === 'mindset' && (
            <div className="space-y-4 my-auto">
              <div className="text-center space-y-0.5">
                <h4 className="text-sm font-bold text-slate-900">Poin Kunci Menghadapi Wawancara</h4>
                <p className="text-xs text-slate-500">
                  Ingat 3 prinsip penting saat menjawab pertanyaan:
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 space-y-3">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    1. Ceritakan Pengalaman Nyata
                  </span>
                  <p className="text-xs text-slate-600 pl-5 leading-relaxed">
                    Kaitkan jawaban dengan apa yang pernah Anda praktikkan langsung di bengkel, lab sekolah, atau saat Praktik Kerja Lapangan (PKL).
                  </p>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-200/60">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    2. Sampaikan dengan Runtut (Metode STAR)
                  </span>
                  <p className="text-xs text-slate-600 pl-5 leading-relaxed">
                    Sebutkan situasinya, apa tugas yang diberikan, tindakan SOP yang Anda ambil, dan bagaimana hasilnya.
                  </p>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-200/60">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    3. Bersikap Jujur dan Mau Belajar
                  </span>
                  <p className="text-xs text-slate-600 pl-5 leading-relaxed">
                    Bila ada hal yang belum Anda ketahui secara mendalam, akui dengan jujur dan tunjukkan komitmen kuat untuk segera mempelajarinya.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200/80">
                  Target Bidang: <strong className="text-slate-800">{field.name}</strong>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Clean Modal Footer */}
        <div className="p-4 bg-slate-50/90 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition cursor-pointer"
          >
            Lewati Persiapan
          </button>

          <button
            onClick={onStartInterview}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-sm transition cursor-pointer"
          >
            <span>Mulai Simulasi Wawancara</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

