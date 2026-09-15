import React, { useState, useEffect } from 'react';
import { VOCATIONAL_FIELDS } from '../../data/interview-questions';
import { InterviewMode } from '../../types';
import { getInterviewHistory } from '../../lib/storage';
import { 
  Wrench, Network, UtensilsCrossed, Calculator, Users, 
  ArrowRight, BookMarked, Clock, Camera, History, Check, Zap 
} from 'lucide-react';

interface FieldSelectorProps {
  onSelectField: (fieldId: string, mode: InterviewMode, timerDuration: number) => void;
  onNavigateHistory?: () => void;
  onNavigateMirror?: () => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Wrench,
  Network,
  UtensilsCrossed,
  Calculator,
  Users,
};

export const FieldSelector: React.FC<FieldSelectorProps> = ({ 
  onSelectField,
  onNavigateHistory,
  onNavigateMirror,
}) => {
  const [selectedMode, setSelectedMode] = useState<InterviewMode>('timed');
  const [selectedDuration, setSelectedDuration] = useState<number>(120); // default 2 minutes (120s)
  const [savedSessionsCount, setSavedSessionsCount] = useState<number>(0);

  useEffect(() => {
    const history = getInterviewHistory();
    setSavedSessionsCount(history.length);
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner / Notification */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 sm:px-5 sm:py-3 rounded-2xl border-2 border-amber-200/80 shadow-soft">
        <div className="flex items-center gap-2 text-xs text-slate-700">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-extrabold text-slate-900">Simulasi Mandiri Vokasi Standar DUDI</span>
          <span className="hidden md:inline text-slate-400">• Evaluasi struktur STAR & kosakata industri</span>
        </div>

        <div className="flex items-center gap-2">
          {onNavigateMirror && (
            <button
              type="button"
              onClick={onNavigateMirror}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 text-xs font-bold transition btn-bouncy cursor-pointer"
              title="Latihan tatap kamera 60 detik tanpa dinilai"
            >
              <Camera className="w-3.5 h-3.5 text-indigo-500" />
              <span>Mode Cermin (60s)</span>
            </button>
          )}

          {onNavigateHistory && savedSessionsCount > 0 && (
            <button
              type="button"
              onClick={onNavigateHistory}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 hover:bg-amber-200/70 border border-amber-200 text-xs font-bold transition btn-bouncy cursor-pointer"
            >
              <History className="w-3.5 h-3.5 text-amber-700" />
              <span>Riwayat ({savedSessionsCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-900 text-xs font-black mb-3">
          <BookMarked className="w-3.5 h-3.5 text-orange-600" />
          Langkah 1: Pengaturan Mode & Bidang Kejuruan
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
          Pilih Bidang Simulasi Wawancara
        </h2>
        <p className="text-slate-600 max-w-xl mx-auto text-xs sm:text-sm">
          Pertanyaan disesuaikan dengan kurikulum kejuruan SMK dan standar kompetensi kerja yang diujikan rekruter industri.
        </p>
      </div>

      {/* Mode & Timer Selection Card */}
      <div className="bg-white rounded-3xl border-2 border-amber-200/80 p-5 sm:p-6 shadow-soft">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-100">
          <div>
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-500" />
              <span>Pilih Mode Simulasi Latihan</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Tentukan apakah Anda ingin berlatih dengan batas waktu ujian atau mode santai tanpa timer.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Option 1: Timed Mode */}
          <div
            onClick={() => setSelectedMode('timed')}
            className={`p-4 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between ${
              selectedMode === 'timed'
                ? 'border-orange-500 bg-orange-50/50 shadow-soft'
                : 'border-slate-200 hover:border-orange-300 bg-white'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⏱️</span>
                  <span className="font-extrabold text-sm text-slate-900">Mode Seleksi Industri</span>
                </div>
                {selectedMode === 'timed' && (
                  <span className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs shadow-2xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Mensimulasikan batas waktu countdown nyata per pertanyaan. Sangat cocok untuk menguji kesiapan mental sebelum seleksi kerja.
              </p>
            </div>

            {/* Duration Options */}
            {selectedMode === 'timed' && (
              <div className="pt-3 border-t border-orange-200/80 mt-1">
                <span className="text-[11px] font-black text-orange-950 uppercase tracking-wider block mb-2">
                  Durasi Per Pertanyaan:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {[
                    { sec: 15, label: '15 Detik', desc: 'Tes Cepat' },
                    { sec: 60, label: '1 Menit', desc: 'Cepat' },
                    { sec: 120, label: '2 Menit', desc: 'Standar DUDI' },
                    { sec: 180, label: '3 Menit', desc: 'Mendalam' },
                  ].map(d => (
                    <button
                      key={d.sec}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDuration(d.sec);
                      }}
                      className={`px-2 py-1.5 rounded-xl text-xs font-bold text-center border transition cursor-pointer ${
                        selectedDuration === d.sec
                          ? 'bg-orange-500 text-white border-orange-500 shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-orange-50'
                      }`}
                    >
                      <div>{d.label}</div>
                      <div className={`text-[9px] font-normal ${selectedDuration === d.sec ? 'text-orange-100' : 'text-slate-400'}`}>
                        {d.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Option 2: Relaxed Mode */}
          <div
            onClick={() => setSelectedMode('relaxed')}
            className={`p-4 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between ${
              selectedMode === 'relaxed'
                ? 'border-indigo-500 bg-indigo-50/50 shadow-soft'
                : 'border-slate-200 hover:border-indigo-300 bg-white'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🧘</span>
                  <span className="font-extrabold text-sm text-slate-900">Mode Santai (Tanpa Batas Waktu)</span>
                </div>
                {selectedMode === 'relaxed' && (
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs shadow-2xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fokus belajar tanpa rasa cemas timer. Sangat cocok bagi pemula untuk mempelajari formulasi struktur jawaban metode STAR dan memperkaya kosakata teknis.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 text-[11px] text-indigo-700 font-medium mt-4">
              ✓ Timer tidak akan menghitung mundur saat Anda merespons pertanyaan.
            </div>
          </div>
        </div>
      </div>

      {/* Field Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {VOCATIONAL_FIELDS.map((field) => {
          const IconComponent = ICON_MAP[field.icon] || Users;
          return (
            <div
              key={field.id}
              className="bg-white rounded-3xl border-2 border-amber-200/80 p-5 shadow-soft hover:shadow-card-hover transition group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center group-hover:scale-105 transition">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/70">
                    {field.tag}
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-900 group-hover:text-orange-600 transition mb-1.5">
                  {field.name}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  {field.description}
                </p>
              </div>

              <button
                onClick={() => onSelectField(field.id, selectedMode, selectedDuration)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-sm hover:from-orange-600 hover:to-amber-600 active:scale-[0.99] transition shadow-warm-orange btn-bouncy cursor-pointer"
              >
                <span>Mulai Simulasi {selectedMode === 'timed' ? `(${Math.floor(selectedDuration / 60)} Menit)` : '(Santai)'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
