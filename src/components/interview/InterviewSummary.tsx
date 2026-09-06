import React, { useState } from 'react';
import { Field, UserInterviewAnswer, InterviewMode } from '../../types';
import { INTERVIEW_QUESTIONS } from '../../data/interview-questions';
import { getScoreBadge } from '../../lib/feedback-engine';
import { 
  CheckCircle2, AlertTriangle, XCircle, RotateCcw, Copy, 
  Check, ArrowRight, Eye, ChevronDown, ChevronUp, Award, 
  Printer, FileText, History, Clock, BookmarkCheck
} from 'lucide-react';

interface InterviewSummaryProps {
  field: Field;
  answers: UserInterviewAnswer[];
  overallScore: number;
  mode?: InterviewMode;
  totalSessionDuration?: number;
  onRestart: () => void;
  onSelectOtherField: () => void;
  onGoToColorblind: () => void;
  onGoToHistory?: () => void;
}

export const InterviewSummary: React.FC<InterviewSummaryProps> = ({
  field,
  answers,
  overallScore,
  mode = 'timed',
  totalSessionDuration = 0,
  onRestart,
  onSelectOtherField,
  onGoToColorblind,
  onGoToHistory,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const badgeInfo = getScoreBadge(overallScore);

  const formatDuration = (seconds: number) => {
    if (seconds <= 0) return '0 dtk';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) return `${secs} detik`;
    return `${mins} menit ${secs > 0 ? `${secs} detik` : ''}`;
  };

  const copyToClipboard = () => {
    const textReport = [
      `=== LAPORAN EVALUASI SIMULASI WAWANCARA — JOBREADY ===`,
      `Bidang: ${field.name}`,
      `Skor Rata-Rata: ${overallScore}/100 (${badgeInfo.label})`,
      `Mode: ${mode === 'timed' ? 'Mode Seleksi Industri (Dengan Batas Waktu)' : 'Mode Santai'}`,
      totalSessionDuration > 0 ? `Total Durasi: ${formatDuration(totalSessionDuration)}` : '',
      `Tanggal: ${new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}`,
      `----------------------------------------------------`,
      ...answers.map((a, idx) => {
        return [
          `\n[Pertanyaan ${idx + 1}]: ${a.questionText}`,
          a.timeSpentSeconds ? `Waktu Menjawab: ${formatDuration(a.timeSpentSeconds)}` : '',
          `Jawaban Siswa: "${a.userAnswer}"`,
          `Skor: ${a.feedback.score}/100 (${a.feedback.summary})`,
          `Evaluasi: ${a.feedback.critique}`,
          a.feedback.strengths.length > 0 ? `Kelebihan: ${a.feedback.strengths.join('; ')}` : '',
          a.feedback.suggestions.length > 0 ? `Saran Perbaikan: ${a.feedback.suggestions.join('; ')}` : '',
        ].filter(Boolean).join('\n');
      }),
      `\n----------------------------------------------------`,
      `Catatan: Laporan ini disusun berdasarkan rubrik penilaian format STAR dan kata kunci kompetensi kejuruan untuk evaluasi mandiri.`,
    ].filter(Boolean).join('\n');

    navigator.clipboard.writeText(textReport).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 w-full">
      {/* Score Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm text-center relative overflow-hidden">
        <div className="max-w-xl mx-auto">
          {/* Tag & Mode indicator */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200/70">
              <Award className="w-4 h-4 text-blue-600" />
              Laporan Hasil Evaluasi Wawancara
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              {mode === 'timed' ? 'Mode Seleksi Industri' : 'Mode Santai'}
            </span>

            {totalSessionDuration > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                ⏱️ {formatDuration(totalSessionDuration)}
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
            {field.name}
          </h2>

          <div className="my-5">
            <div className="inline-flex items-baseline gap-1">
              <span className="text-5xl sm:text-6xl font-extrabold text-blue-700 tracking-tight">
                {overallScore}
              </span>
              <span className="text-slate-400 font-semibold text-lg sm:text-xl">/100</span>
            </div>

            <div className="mt-3">
              <span
                className={`inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border ${badgeInfo.color}`}
              >
                {badgeInfo.label}
              </span>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm mt-3 max-w-md mx-auto leading-relaxed">
              {badgeInfo.desc}
            </p>
          </div>

          {/* Storage notification badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-5">
            <BookmarkCheck className="w-4 h-4 text-emerald-600" />
            <span>Sesi ini telah tersimpan otomatis ke Riwayat Latihan</span>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4 border-t border-slate-100">
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition cursor-pointer shadow-2xs"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Tersalin!' : 'Salin Laporan'}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition cursor-pointer shadow-2xs"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Cetak / PDF</span>
            </button>

            {onGoToHistory && (
              <button
                onClick={onGoToHistory}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 text-xs font-semibold hover:bg-blue-100 transition cursor-pointer shadow-2xs"
              >
                <History className="w-4 h-4 text-blue-600" />
                <span>Riwayat Latihan</span>
              </button>
            )}

            <button
              onClick={onRestart}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition cursor-pointer shadow-2xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Sesi</span>
            </button>

            <button
              onClick={onSelectOtherField}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition cursor-pointer shadow-2xs"
            >
              <span>Pilih Bidang Lain</span>
            </button>

            <button
              onClick={onGoToColorblind}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition shadow-2xs cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>Lanjut Tes Buta Warna</span>
            </button>
          </div>
        </div>
      </div>

      {/* Per Question Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <span>Rincian Evaluasi & Feedback Jawaban</span>
          <span className="text-xs font-normal text-slate-500">
            ({answers.length} Pertanyaan)
          </span>
        </h3>

        {answers.map((item, idx) => {
          const isExpanded = expandedIndex === idx;
          const questionDetail = INTERVIEW_QUESTIONS.find(q => q.id === item.questionId);

          return (
            <div
              key={item.questionId}
              className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-2xs transition"
            >
              {/* Question Header Accordion Trigger */}
              <button
                type="button"
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 hover:bg-slate-50/70 transition cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                      item.feedback.score >= 80
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.feedback.score >= 50
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm sm:text-base leading-snug">
                      {item.questionText}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      <span className="text-xs font-bold text-slate-700">
                        Skor: {item.feedback.score}/100
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-500">
                        {item.feedback.summary}
                      </span>
                      {item.timeSpentSeconds && (
                        <>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {formatDuration(item.timeSpentSeconds)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 text-slate-400 pt-1">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-slate-100 space-y-4 text-xs sm:text-sm">
                  {/* User Answer */}
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-slate-700">
                        Jawaban Anda:
                      </span>
                      {item.timeSpentSeconds && (
                        <span className="text-[11px] text-slate-500 font-mono">
                          Waktu jawab: {formatDuration(item.timeSpentSeconds)}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-800 italic leading-relaxed whitespace-pre-wrap">
                      "{item.userAnswer}"
                    </p>
                    <div className="text-[11px] text-slate-400 mt-2">
                      Panjang: {item.userAnswer.length} karakter ({item.feedback.wordCount} kata)
                    </div>
                  </div>

                  {/* Feedback Critique */}
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold text-slate-900 block mb-1">
                        Analisis Pewawancara Industri:
                      </span>
                      <p className="text-slate-600 leading-relaxed">
                        {item.feedback.critique}
                      </p>
                    </div>

                    {/* Matched Keywords */}
                    {item.feedback.matchedKeywords.length > 0 && (
                      <div>
                        <span className="text-slate-600 font-medium block mb-1.5">
                          Kata Kunci Teknis Teridentifikasi:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {item.feedback.matchedKeywords.map((kw, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200"
                            >
                              ✓ {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Strengths */}
                    {item.feedback.strengths.length > 0 && (
                      <div className="bg-emerald-50/70 p-3 rounded-lg border border-emerald-200 text-emerald-900">
                        <span className="font-semibold text-emerald-950 block mb-1">
                          Kelebihan Jawaban:
                        </span>
                        <ul className="list-disc list-inside space-y-0.5 text-xs text-emerald-800">
                          {item.feedback.strengths.map((str, sIdx) => (
                            <li key={sIdx}>{str}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Suggestions */}
                    {item.feedback.suggestions.length > 0 && (
                      <div className="bg-amber-50/70 p-3 rounded-lg border border-amber-200 text-amber-900">
                        <span className="font-semibold text-amber-950 block mb-1">
                          Saran Pembinaan (Untuk Siswa & Guru BK):
                        </span>
                        <ul className="list-disc list-inside space-y-0.5 text-xs text-amber-800">
                          {item.feedback.suggestions.map((sug, sIdx) => (
                            <li key={sIdx}>{sug}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Sample Answer Benchmark */}
                    {questionDetail && (
                      <div className="p-3.5 rounded-lg bg-blue-50/60 border border-blue-200 text-blue-950">
                        <div className="flex items-center gap-1.5 font-semibold text-blue-900 mb-1">
                          <Award className="w-4 h-4 text-blue-600" />
                          <span>Tolok Ukur Jawaban Praktisi Industri:</span>
                        </div>
                        <p className="text-xs text-blue-900/90 leading-relaxed italic">
                          "{questionDetail.sampleIdealAnswer}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
