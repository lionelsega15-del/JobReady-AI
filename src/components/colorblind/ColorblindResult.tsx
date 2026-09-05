import React from 'react';
import { ColorblindTestResult, UserColorblindAnswer } from '../../types';
import { COLORBLIND_QUESTIONS } from '../../data/colorblind-questions';
import { 
  CheckCircle2, XCircle, AlertTriangle, RotateCcw, 
  Briefcase, Home as HomeIcon, ShieldAlert, Award, FileText
} from 'lucide-react';

interface ColorblindResultProps {
  result: ColorblindTestResult;
  answers: UserColorblindAnswer[];
  onRestart: () => void;
  onGoToInterview: () => void;
  onGoToHome: () => void;
}

export const ColorblindResult: React.FC<ColorblindResultProps> = ({
  result,
  answers,
  onRestart,
  onGoToInterview,
  onGoToHome,
}) => {
  const getStatusBadge = () => {
    switch (result.statusCategory) {
      case 'normal':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
          icon: CheckCircle2,
          iconColor: 'text-emerald-600',
        };
      case 'partial-deficiency':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-300',
          icon: AlertTriangle,
          iconColor: 'text-amber-600',
        };
      case 'needs-clinical-eval':
      default:
        return {
          bg: 'bg-rose-50 text-rose-800 border-rose-300',
          icon: XCircle,
          iconColor: 'text-rose-600',
        };
    }
  };

  const badge = getStatusBadge();
  const IconComponent = badge.icon;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Score Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-3">
          <Award className="w-4 h-4 text-emerald-600" />
          Hasil Latihan Tes Buta Warna
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          {result.title}
        </h2>

        <div className="my-6">
          <div className="inline-flex items-baseline gap-1">
            <span className="text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">
              {result.score}
            </span>
            <span className="text-slate-400 font-semibold text-lg sm:text-xl">
              /{result.total} Plat Terbaca Benar
            </span>
          </div>

          <div className="mt-3">
            <span
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border ${badge.bg}`}
            >
              <IconComponent className={`w-4 h-4 ${badge.iconColor}`} />
              <span>Akurasi: {result.accuracyPercentage}%</span>
            </span>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm mt-3 max-w-lg mx-auto leading-relaxed">
            {result.explanation}
          </p>
        </div>

        {/* Mandatory Medical Disclaimer Box */}
        <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-4 sm:p-5 text-left max-w-2xl mx-auto mt-6">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-amber-900 space-y-1">
              <span className="font-bold text-amber-950 block">
                Disclaimer Medis Resmi:
              </span>
              <p className="leading-relaxed">
                Tes ini dirancang sebagai <strong>simulasi latihan mandiri edukatif</strong> dan <strong>BUKAN alat diagnosis medis resmi</strong>. Hasil tes di layar monitor dapat dipengaruhi oleh kecerahan, sudut pandang, dan teknologi panel layar. Untuk surat keterangan resmi kesiapan kerja/kuliah, silakan lakukan pemeriksaan di fasilitas kesehatan resmi bersama dokter spesialis mata (Sp.M) atau optometris.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-6 mt-6 border-t border-slate-100">
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs sm:text-sm font-semibold hover:bg-slate-50 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ulangi Tes Buta Warna</span>
          </button>

          <button
            onClick={onGoToInterview}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-blue-600 text-white text-xs sm:text-sm font-semibold hover:bg-blue-700 transition shadow-sm"
          >
            <Briefcase className="w-4 h-4" />
            <span>Lanjut ke Simulasi Wawancara</span>
          </button>

          <button
            onClick={onGoToHome}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-900 text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition"
          >
            <HomeIcon className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </button>
        </div>
      </div>

      {/* Plate-by-plate breakdown */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <span>Rincian Hasil per Plat Soal (1–10)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {answers.map((ans, idx) => {
            const questionData = COLORBLIND_QUESTIONS.find(q => q.id === ans.questionId);

            return (
              <div
                key={ans.questionId}
                className={`p-3.5 rounded-lg border text-xs sm:text-sm flex flex-col justify-between ${
                  ans.isCorrect
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : 'bg-rose-50/40 border-rose-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-slate-900">
                      Plat #{ans.plateNumber}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${
                        ans.isCorrect
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {ans.isCorrect ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" /> Benar
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" /> Keliru
                        </>
                      )}
                    </span>
                  </div>

                  <div className="space-y-0.5 text-slate-600 mb-2">
                    <div>Jawaban Anda: <strong className="text-slate-800">{String(ans.selectedAnswer)}</strong></div>
                    <div>Kunci Jawaban: <strong className="text-slate-800">{String(ans.correctAnswer)}</strong></div>
                  </div>
                </div>

                {questionData && (
                  <p className="text-[11px] text-slate-500 italic pt-1.5 border-t border-slate-200/60">
                    {questionData.diagnosisNote}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
