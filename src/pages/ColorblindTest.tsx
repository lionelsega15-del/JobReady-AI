import React, { useState } from 'react';
import { useColorblindTest } from '../hooks/useColorblindTest';
import { ColorblindPlate } from '../components/colorblind/ColorblindPlate';
import { AnswerOptions } from '../components/colorblind/AnswerOptions';
import { ColorblindResult } from '../components/colorblind/ColorblindResult';
import { PageView } from '../types';
import { Eye, Info, ArrowLeft, Play, ShieldAlert, MonitorCheck } from 'lucide-react';

interface ColorblindTestPageProps {
  onNavigate: (page: PageView) => void;
}

export const ColorblindTestPage: React.FC<ColorblindTestPageProps> = ({ onNavigate }) => {
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const {
    currentPlateIndex,
    currentQuestion,
    totalPlates,
    progressPercentage,
    answers,
    isCompleted,
    result,
    submitAnswer,
    resetTest,
  } = useColorblindTest();

  const handleStart = () => {
    setHasStarted(true);
  };

  const handleRestart = () => {
    resetTest();
    setHasStarted(true);
  };

  return (
    <div className="py-6 sm:py-8 px-4 sm:px-6 max-w-5xl mx-auto flex-1 flex flex-col">
      {/* Intro Screen before starting */}
      {!hasStarted && !isCompleted && (
        <div className="max-w-3xl mx-auto text-center my-auto py-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-4">
            <Eye className="w-3.5 h-3.5" />
            Modul 2: Latihan Skrining Persepsi Warna
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Simulasi Tes Buta Warna Bergaya Ishihara
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto">
            Tes buta warna adalah salah satu syarat administratif utama seleksi kerja pada bidang teknik, otomotif, kelistrikan, dan operator manufaktur. Latih persepsi visual Anda melalui 10 plat warna standar.
          </p>

          {/* Guidelines Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 text-left shadow-sm mb-8 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <MonitorCheck className="w-5 h-5 text-emerald-600" />
              <span>Petunjuk Pelaksanaan Latihan:</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-800 block mb-1">1. Jarak Pandang</span>
                <p className="text-slate-600">Posisikan mata sekitar 50–70 cm tegak lurus di depan layar monitor.</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-800 block mb-1">2. Kecerahan Layar</span>
                <p className="text-slate-600">Pastikan kecerahan layar cukup dan matikan fitur filter cahaya malam (Night Light).</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-800 block mb-1">3. Durasi Membaca</span>
                <p className="text-slate-600">Amati setiap plat selama 3–5 detik, lalu pilih angka yang pertama kali Anda kenali.</p>
              </div>
            </div>

            <div className="flex items-start gap-2 pt-2 text-xs text-amber-900 bg-amber-50 p-3.5 rounded-xl border border-amber-200/80">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-700" />
              <span className="leading-relaxed">
                <strong>Klausul Transparansi:</strong> Tes ini berbasis vektor grafis SVG prosedural untuk tujuan simulasi latihan dan pembelajaran mandiri, bukan pengganti buku plat Ishihara berlisensi resmi di fasilitas kesehatan.
              </span>
            </div>
          </div>

          <button
            onClick={handleStart}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base transition shadow-sm hover:shadow-md active:scale-[0.99] cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Mulai Tes (10 Plat Ishihara)</span>
          </button>
        </div>
      )}

      {/* Active Plate Quiz */}
      {hasStarted && !isCompleted && currentQuestion && (
        <div className="max-w-2xl mx-auto w-full space-y-5">
          {/* Progress bar */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <Eye className="w-4 h-4" />
                <span>Plat {currentPlateIndex + 1} dari {totalPlates}</span>
              </span>
              <span>{Math.round(((currentPlateIndex) / totalPlates) * 100)}%</span>
            </div>

            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full transition-all duration-300 ease-out"
                style={{ width: `${Math.round(((currentPlateIndex) / totalPlates) * 100)}%` }}
              />
            </div>
          </div>

          {/* Ishihara Plate Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col items-center">
            <ColorblindPlate question={currentQuestion} />

            <div className="w-full mt-6 pt-6 border-t border-slate-100">
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
