import React, { useState, useEffect } from 'react';
import { VOCATIONAL_FIELDS } from '../../data/interview-questions';
import { InterviewMode } from '../../types';
import { getInterviewHistory } from '../../lib/storage';
import { 
  Wrench, Network, UtensilsCrossed, Calculator, Users, 
  ArrowRight, BookMarked, Clock, Sparkles, History, Check, Zap 
} from 'lucide-react';

interface FieldSelectorProps {
  onSelectField: (fieldId: string, mode: InterviewMode, timerDuration: number) => void;
  onNavigateHistory?: () => void;
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
  onNavigateHistory 
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
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 sm:px-4 sm:py-2.5 rounded-xl border border-slate-200/90 shadow-2xs">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="font-semibold text-slate-800">Simulasi Mandiri Berbasis DUDI</span>
          <span className="hidden md:inline text-slate-400">• Evaluasi struktur STAR & kompetensi teknis</span>
        </div>

        {onNavigateHistory && savedSessionsCount > 0 && (
          <button
            type="button"
            onClick={onNavigateHistory}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-semibold transition cursor-pointer"
          >
            <History className="w-3.5 h-3.5" />
            <span>Lihat Riwayat Latihan ({savedSessionsCount} Sesi)</span>
          </button>
        )}
      </div>

      {/* Main Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold mb-3">
          <BookMarked className="w-3.5 h-3.5" />
          Tahap 1: Pengaturan Mode & Bidang Kejuruan
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
          Pilih Bidang Simulasi Wawancara
        </h2>
        <p className="text-slate-600 max-w-xl mx-auto text-xs sm:text-sm">
          Pertanyaan disesuaikan dengan kurikulum kejuruan SMK dan standar kompetensi kerja yang diujikan rekruter industri.
        </p>
      </div>

      {/* Mode & Timer Selection Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Pilih Mode Simulasi Latihan</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Tentukan apakah Anda ingin berlatih dengan batas waktu ujian atau mode santai tanpa timer.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Option 1: Timed Mode */}
          <div
            onClick={() => setSelectedMode('timed')}
            className={`p-4 rounded-xl border-2 transition cursor-pointer flex flex-col justify-between ${
              selectedMode === 'timed'
                ? 'border-blue-600 bg-blue-50/40 shadow-xs'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">⏱️</span>
                  <span className="font-bold text-sm text-slate-900">Mode Seleksi Industri</span>
                </div>
                {selectedMode === 'timed' && (
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Mensimulasikan tekanan wawancara nyata dengan batas waktu countdown per pertanyaan. Sangat dianjurkan untuk persiapan seleksi kerja.
              </p>
            </div>

            {/* Duration Options */}
            {selectedMode === 'timed' && (
              <div className="pt-3 border-t border-blue-200/60 mt-1">
                <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider block mb-2">
                  Durasi Per Pertanyaan:
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
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
                      className={`px-2 py-1.5 rounded-lg text-xs font-semibold text-center border transition cursor-pointer ${
                        selectedDuration === d.sec
                          ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div>{d.label}</div>
                      <div className={`text-[9px] font-normal ${selectedDuration === d.sec ? 'text-blue-100' : 'text-slate-400'}`}>
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
            className={`p-4 rounded-xl border-2 transition cursor-pointer flex flex-col justify-between ${
              selectedMode === 'relaxed'
                ? 'border-blue-600 bg-blue-50/40 shadow-xs'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">🧘</span>
                  <span className="font-bold text-sm text-slate-900">Mode Santai (Tanpa Batas Waktu)</span>
                </div>
                {selectedMode === 'relaxed' && (
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fokus belajar tanpa batasan timer. Sangat cocok bagi pemula untuk mempelajari formulasi struktur jawaban metode STAR dan memperkaya kosakata teknis kejuruan.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 mt-4">
              ✓ Timer tidak akan menghitung mundur saat Anda menyusun jawaban.
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
              className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-sm hover:border-blue-400 hover:shadow-md transition group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                    {field.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition mb-1.5">
                  {field.name}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  {field.description}
                </p>
              </div>

              <button
                onClick={() => onSelectField(field.id, selectedMode, selectedDuration)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-white font-medium text-sm hover:bg-blue-700 active:scale-[0.99] transition shadow-sm cursor-pointer"
              >
                <span>Mulai Simulasi {selectedMode === 'timed' ? `(Timer ${Math.floor(selectedDuration / 60)} Menit)` : '(Mode Santai)'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
