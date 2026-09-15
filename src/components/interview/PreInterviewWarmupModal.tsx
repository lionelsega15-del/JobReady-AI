import React, { useState, useEffect } from 'react';
import { Field } from '../../types';
import { 
  Heart, Wind, Smile, Sparkles, ArrowRight, X, Play, RotateCcw,
  CheckCircle2, Volume2, ShieldCheck, Flame
} from 'lucide-react';

interface PreInterviewWarmupModalProps {
  field: Field;
  isOpen: boolean;
  onStartInterview: () => void;
  onClose: () => void;
}

type WarmupTab = 'breathing' | 'vocal' | 'affirmation';

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
          // After hold-out, loop to inhale and increment cycle
          setCycleCount((c) => c + 1);
          return 'inhale';
        });

        return 4;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, activeTab, isBreathingRunning]);

  if (!isOpen) return null;

  const getPhaseData = () => {
    switch (breathingPhase) {
      case 'inhale':
        return {
          title: 'Tarik Napas Perlahan',
          instruction: 'Tarik napas dalam-dalam melalui hidung secara perlahan...',
          color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
          circleScale: 'scale-125',
          haloBg: 'bg-cyan-400/20',
        };
      case 'hold-in':
        return {
          title: 'Tahan Napas',
          instruction: 'Tahan udara di dada dengan rileks, rasakan ketenangan...',
          color: 'text-blue-600 bg-blue-50 border-blue-200',
          circleScale: 'scale-125',
          haloBg: 'bg-blue-400/30',
        };
      case 'exhale':
        return {
          title: 'Hembuskan Perlahan',
          instruction: 'Keluarkan napas perlahan melalui mulut secara halus...',
          color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
          circleScale: 'scale-90',
          haloBg: 'bg-emerald-400/20',
        };
      case 'hold-out':
        return {
          title: 'Rileks & Kosongkan',
          instruction: 'Istirahat sejenak sebelum tarikan napas berikutnya...',
          color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
          circleScale: 'scale-90',
          haloBg: 'bg-indigo-400/20',
        };
    }
  };

  const phaseData = getPhaseData();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl max-w-xl w-full overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-cyan-700 p-5 text-white relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-white shadow-inner">
                <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
              </div>
              <div>
                <span className="text-[11px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-white/20 text-cyan-200">
                  Zona Pemanasan Anti-Gugup
                </span>
                <h3 className="text-lg font-extrabold tracking-tight mt-0.5">
                  1 Menit Relaksasi Sebelum Wawancara
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition cursor-pointer"
              title="Tutup / Lewati Pemanasan"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-blue-100/90 mt-2">
            Persiapan singkat untuk bidang <strong className="text-white">{field.name}</strong> agar detak jantung tenang dan otak tidak <em className="italic">blank</em>.
          </p>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 mt-4 p-1 rounded-xl bg-black/20 backdrop-blur-xs">
            <button
              onClick={() => setActiveTab('breathing')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeTab === 'breathing'
                  ? 'bg-white text-blue-800 shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Wind className="w-3.5 h-3.5" />
              <span>1. Pernapasan 4-4-4-4</span>
            </button>

            <button
              onClick={() => setActiveTab('vocal')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeTab === 'vocal'
                  ? 'bg-white text-blue-800 shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Smile className="w-3.5 h-3.5" />
              <span>2. Senam Vokal</span>
            </button>

            <button
              onClick={() => setActiveTab('affirmation')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeTab === 'affirmation'
                  ? 'bg-white text-blue-800 shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>3. Afirmasi Diri</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col justify-center">
          {/* TAB 1: BOX BREATHING 4-4-4-4 */}
          {activeTab === 'breathing' && (
            <div className="flex flex-col items-center text-center space-y-5 my-auto">
              <div className="space-y-1">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-colors ${phaseData.color}`}>
                  <Wind className="w-3.5 h-3.5" />
                  Siklus ke-{cycleCount} • {phaseData.title}
                </span>
                <p className="text-xs text-slate-500 max-w-sm">
                  Metode Box Breathing terbukti secara ilmiah menstabilkan detak jantung dan meredakan demam panggung.
                </p>
              </div>

              {/* Animated Visual Circle */}
              <div className="relative w-48 h-48 sm:w-52 sm:h-52 flex items-center justify-center">
                {/* Outer Halo */}
                <div 
                  className={`absolute inset-0 rounded-full transition-all duration-1000 ease-in-out ${phaseData.haloBg} ${phaseData.circleScale} blur-lg`} 
                />

                {/* Outer Rotating/Pulsing Ring */}
                <div 
                  className={`absolute inset-4 rounded-full border-2 border-dashed border-blue-400/50 transition-all duration-1000 ease-in-out ${phaseData.circleScale}`} 
                />

                {/* Inner Core Circle */}
                <div 
                  className={`w-32 h-32 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white flex flex-col items-center justify-center shadow-xl transition-transform duration-1000 ease-in-out ${phaseData.circleScale} z-10`}
                >
                  <span className="text-3xl sm:text-4xl font-black tracking-tight">{phaseSecondsLeft}</span>
                  <span className="text-[10px] font-semibold text-cyan-100 uppercase tracking-wider mt-0.5">
                    Detik
                  </span>
                </div>
              </div>

              {/* Instruction message */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 max-w-md w-full text-center">
                <p className="text-sm font-semibold text-slate-800">
                  {phaseData.instruction}
                </p>
                <div className="flex items-center justify-center gap-2 mt-2 text-[11px] text-slate-500">
                  <span className={breathingPhase === 'inhale' ? 'font-bold text-blue-700' : ''}>Tarik 4s</span>
                  <span>→</span>
                  <span className={breathingPhase === 'hold-in' ? 'font-bold text-blue-700' : ''}>Tahan 4s</span>
                  <span>→</span>
                  <span className={breathingPhase === 'exhale' ? 'font-bold text-blue-700' : ''}>Hembus 4s</span>
                  <span>→</span>
                  <span className={breathingPhase === 'hold-out' ? 'font-bold text-blue-700' : ''}>Tenang 4s</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VOCAL & FACIAL RELAXATION */}
          {activeTab === 'vocal' && (
            <div className="space-y-4 my-auto">
              <div className="text-center space-y-1">
                <h4 className="text-base font-bold text-slate-900">Senam Otot Wajah & Artikulasi Vokal</h4>
                <p className="text-xs text-slate-500">
                  Otot wajah yang tegang membuat suara terdengar kaku dan bergetar. Lakukan 3 langkah kilat ini:
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {/* Step 1 */}
                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    1
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                      <Smile className="w-3.5 h-3.5 text-amber-600" />
                      Tarik Senyum Lebar ke Kamera (3 Detik)
                    </h5>
                    <p className="text-xs text-amber-900/80 mt-0.5">
                      Tersenyumlah tulus ke arah kamera selama 3 detik. Otak merespons senyuman fisik dengan melepaskan hormon endorfin yang meredakan gugup.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    2
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                      <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                      Latihan Artikulasi Suara: "A - I - U - E - O"
                    </h5>
                    <p className="text-xs text-blue-900/80 mt-0.5">
                      Ucapkan huruf vokal dengan mulut terbuka lebar dan suara terdengar jelas. Ini melemaskan rahang agar kata-kata tidak bergumam.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    3
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Bahu Tegak & Rileks (Power Pose)
                    </h5>
                    <p className="text-xs text-emerald-900/80 mt-0.5">
                      Tarik bahu ke belakang, tegakkan punggung, dan jatuhkan bahu secara santai. Postur tegak mengirim sinyal ketenangan dan wibawa ke pewawancara.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AFFIRMATIONS */}
          {activeTab === 'affirmation' && (
            <div className="space-y-4 my-auto text-center">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  Mantra Penguat Diri
                </span>
                <h4 className="text-base font-bold text-slate-900">Kamu Lebih Siap Dari yang Kamu Duga!</h4>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 border border-blue-200/80 rounded-2xl p-5 text-left space-y-3 shadow-2xs">
                <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                  "Saya sudah berpraktik dan belajar berbulan-bulan di sekolah maupun magang. Saya memiliki keterampilan teknis yang nyata. Wawancara ini hanyalah obrolan profesional untuk menceritakan apa yang sudah pernah saya kerjakan."
                </p>

                <div className="pt-2 border-t border-blue-200/60 flex items-center justify-between text-xs text-slate-600">
                  <span className="font-semibold text-blue-700">Fokus Bidang: {field.shortName}</span>
                  <span>✨ Percayai Prosesmu</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Ingat: Pewawancara tidak mencari manusia sempurna yang hafal kamus, mereka mencari rekan kerja yang <strong>jujur, disiplin, dan mau belajar</strong>.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 transition cursor-pointer"
          >
            Lewati Pemanasan
          </button>

          <button
            onClick={onStartInterview}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <span>Saya Siap, Mulai Wawancara!</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
