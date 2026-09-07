import React, { useState } from 'react';
import { useColorblindTest } from '../hooks/useColorblindTest';
import { ColorblindPlate } from '../components/colorblind/ColorblindPlate';
import { AnswerOptions } from '../components/colorblind/AnswerOptions';
import { ColorblindResult } from '../components/colorblind/ColorblindResult';
import { PageView, ColorblindMode } from '../types';
import { 
  Eye, MonitorCheck, ShieldAlert, Play, ArrowLeft, 
  Pencil, Hash, Layers, HelpCircle, CheckCircle, RotateCcw
} from 'lucide-react';

interface ColorblindTestPageProps {
  onNavigate: (page: PageView) => void;
}

export const ColorblindTestPage: React.FC<ColorblindTestPageProps> = ({ onNavigate }) => {
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [selectedMode, setSelectedMode] = useState<ColorblindMode>('digits');

  const {
    mode,
    changeMode,
    currentPlateIndex,
    currentQuestion,
    totalPlates,
    progressPercentage,
    answers,
    isCompleted,
    result,
    submitAnswer,
    resetTest,
  } = useColorblindTest(selectedMode);

  const handleSelectMode = (newMode: ColorblindMode) => {
    setSelectedMode(newMode);
    changeMode(newMode);
  };

  const handleStart = () => {
    setHasStarted(true);
  };

  const handleRestart = () => {
    resetTest();
    setHasStarted(true);
  };

  const handleExitToMenu = () => {
    resetTest();
    setHasStarted(false);
  };

  const isTracingQuestion = currentQuestion?.category === 'winding-path';

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 max-w-5xl mx-auto flex-1 flex flex-col justify-center">
      {/* Intro & Mode Selection Screen */}
      {!hasStarted && !isCompleted && (
        <div className="max-w-3xl mx-auto text-center my-auto py-4 sm:py-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-4 shadow-2xs">
            <Eye className="w-3.5 h-3.5 text-emerald-600" />
            <span>Simulasi Skrining Persepsi Warna Ishihara</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Uji & Latih Penglihatan Warna Mandiri
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto">
            Persiapkan syarat fisik seleksi dunia kerja vokasi (teknik, kelistrikan, otomotif, dan manufaktur) dengan simulasi plat angka klasik atau kanvas alur berkelok interaktif.
          </p>

          {/* Mode Selector Cards */}
          <div className="text-left mb-8">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 block text-center">
              Pilih Format Pengujian:
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* Option 1: Digits */}
              <button
                type="button"
                onClick={() => handleSelectMode('digits')}
                className={`p-4 rounded-2xl border-2 transition text-left cursor-pointer flex flex-col justify-between ${
                  selectedMode === 'digits'
                    ? 'border-emerald-600 bg-emerald-50/40 shadow-sm ring-2 ring-emerald-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                    selectedMode === 'digits' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Hash className="w-5 h-5" />
                  </div>
                  {selectedMode === 'digits' && (
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Skrining Angka</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    10 plat angka klasik Ishihara dengan pilihan ganda cepat keyboard (1–4).
                  </p>
                </div>
              </button>

              {/* Option 2: Tracing Path */}
              <button
                type="button"
                onClick={() => handleSelectMode('tracing')}
                className={`p-4 rounded-2xl border-2 transition text-left cursor-pointer flex flex-col justify-between ${
                  selectedMode === 'tracing'
                    ? 'border-emerald-600 bg-emerald-50/40 shadow-sm ring-2 ring-emerald-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                    selectedMode === 'tracing' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Pencil className="w-5 h-5" />
                  </div>
                  {selectedMode === 'tracing' && (
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <h4 className="font-bold text-slate-900 text-sm">Tracing Jalur Berkelok</h4>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                      Baru
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    5 plat alur meliuk interaktif dengan kanvas sentuh/mouse & kunci rujukan.
                  </p>
                </div>
              </button>

              {/* Option 3: All */}
              <button
                type="button"
                onClick={() => handleSelectMode('all')}
                className={`p-4 rounded-2xl border-2 transition text-left cursor-pointer flex flex-col justify-between ${
                  selectedMode === 'all'
                    ? 'border-emerald-600 bg-emerald-50/40 shadow-sm ring-2 ring-emerald-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                    selectedMode === 'all' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Layers className="w-5 h-5" />
                  </div>
                  {selectedMode === 'all' && (
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Evaluasi Penuh</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    15 plat kombinasi angka dan alur berliku untuk simulasi komprehensif.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Guidelines Card - Simplified & Polished */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 text-left shadow-2xs mb-8 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <MonitorCheck className="w-4 h-4 text-emerald-600" />
              <span>Petunjuk Pelaksanaan Latihan:</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="font-semibold text-slate-800 block mb-1">1. Jarak Pandang</span>
                <p className="text-slate-600">Posisikan mata sekitar 50–70 cm tegak lurus di depan layar monitor.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="font-semibold text-slate-800 block mb-1">2. Kecerahan Layar</span>
                <p className="text-slate-600">Pastikan kecerahan cukup dan nonaktifkan filter warna malam (Night Light).</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="font-semibold text-slate-800 block mb-1">3. Durasi Membaca</span>
                <p className="text-slate-600">Amati setiap plat selama 3–5 detik, lalu telusuri alur atau pilih angka yang tampak.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 pt-2 text-xs text-amber-900 bg-amber-50/80 p-3.5 rounded-xl border border-amber-200/80">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-700" />
              <span className="leading-relaxed">
                <strong>Klausul Transparansi:</strong> Tes ini berbasis vektor grafis SVG prosedural untuk sarana simulasi latihan mandiri dan pembelajaran siswa, bukan pengganti buku plat Ishihara berlisensi resmi di faskes dokter spesialis mata.
              </span>
            </div>
          </div>

          <button
            onClick={handleStart}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base transition shadow-sm hover:shadow-md active:scale-[0.99] cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>
              Mulai Tes ({selectedMode === 'digits' ? '10 Plat Angka' : selectedMode === 'tracing' ? '5 Plat Alur Berkelok' : '15 Plat Lengkap'})
            </span>
          </button>
        </div>
      )}

      {/* Active Plate Quiz */}
      {hasStarted && !isCompleted && currentQuestion && (
        <div className="max-w-2xl mx-auto w-full space-y-5">
          {/* Top Status & Progress Bar */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200/60">
                  {isTracingQuestion ? <Pencil className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>Plat {currentPlateIndex + 1} dari {totalPlates}</span>
                </span>
                <span className="text-slate-400 hidden sm:inline">•</span>
                <span className="text-slate-500 hidden sm:inline">
                  {isTracingQuestion ? 'Mode Tracing Alur' : 'Mode Skrining Angka'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-slate-500 font-bold">{progressPercentage}%</span>
                <button
                  type="button"
                  onClick={handleExitToMenu}
                  className="text-[11px] text-slate-400 hover:text-slate-700 font-medium transition cursor-pointer"
                >
                  Keluar
                </button>
              </div>
            </div>

            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Ishihara Plate Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-sm flex flex-col items-center">
            {/* Tracing Instruction Box if Winding Path */}
            {isTracingQuestion && currentQuestion.instruction && (
              <div className="w-full mb-4 p-3.5 rounded-xl bg-blue-50/80 border border-blue-200/80 text-blue-900 text-xs sm:text-sm flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block mb-0.5 text-blue-950">Petunjuk Penelusuran Alur:</span>
                  <p className="leading-relaxed">{currentQuestion.instruction}</p>
                </div>
              </div>
            )}

            {/* Interactive Plate */}
            <ColorblindPlate question={currentQuestion} />

            {/* Answer Selector */}
            <div className="w-full mt-5 pt-5 border-t border-slate-100">
              <AnswerOptions
                options={currentQuestion.options}
                onSelectOption={submitAnswer}
              />
            </div>
          </div>
        </div>
      )}

      {/* Results View */}
      {isCompleted && (
        <ColorblindResult
          result={result}
          answers={answers}
          onRestart={handleRestart}
          onGoToInterview={() => onNavigate('interview')}
          onGoToHome={() => onNavigate('home')}
        />
      )}
    </div>
  );
};
