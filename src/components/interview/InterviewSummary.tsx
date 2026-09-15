import React, { useState } from 'react';
import { Field, UserInterviewAnswer, InterviewMode } from '../../types';
import { INTERVIEW_QUESTIONS } from '../../data/interview-questions';
import { getScoreBadge, analyzeConfidenceAndFluency } from '../../lib/feedback-engine';
import { 
  CheckCircle2, AlertTriangle, XCircle, RotateCcw, Copy, 
  Check, ArrowRight, ChevronDown, ChevronUp, Award, 
  Printer, FileText, History, Clock, BookmarkCheck,
  Activity, MessageSquareQuote, Zap, Brain, ThumbsUp, Volume2
} from 'lucide-react';

interface InterviewSummaryProps {
  field: Field;
  answers: UserInterviewAnswer[];
  overallScore: number;
  mode?: InterviewMode;
  totalSessionDuration?: number;
  onRestart: () => void;
  onSelectOtherField: () => void;
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
  onGoToHistory,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const badgeInfo = getScoreBadge(overallScore);
  const confidenceMetrics = analyzeConfidenceAndFluency(answers, totalSessionDuration);

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
      `[ANALISIS KEPERCAYAAN DIRI & KELANCARAN BICARA]`,
      `Indeks Percaya Diri: ${confidenceMetrics.confidenceScore}/100 (${confidenceMetrics.confidenceLabel})`,
      `Kecepatan Bicara: ${confidenceMetrics.wpm} WPM (${confidenceMetrics.wpmStatus === 'ideal' ? 'Ideal & Tenang' : confidenceMetrics.wpmStatus === 'fast' ? 'Terburu-buru' : 'Lambat'})`,
      `Kata Gumam (Filler Words): ${confidenceMetrics.fillerCount} kali terdeteksi`,
      `Catatan Psikologis: ${confidenceMetrics.psychologicalTip}`,
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
      <div className="bg-white rounded-3xl border-2 border-amber-200/80 p-6 sm:p-8 shadow-soft text-center relative overflow-hidden">
        {/* Subtle warm glow behind score */}
        <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-b from-amber-100/60 to-transparent blur-3xl -z-10 rounded-full" />

        <div className="max-w-xl mx-auto">
          {/* Tag & Mode indicator */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-100 text-orange-900 text-xs font-black border border-orange-200">
              <Award className="w-4 h-4 text-orange-600" />
              Laporan Evaluasi & Rapor Wawancara
            </span>

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              {mode === 'timed' ? 'Mode Seleksi Industri' : 'Mode Santai'}
            </span>

            {totalSessionDuration > 0 && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                ⏱️ {formatDuration(totalSessionDuration)}
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-1">
            {field.name}
          </h2>

          <div className="my-5">
            <div className="inline-flex items-baseline gap-1">
              <span className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-transparent tracking-tight">
                {overallScore}
              </span>
              <span className="text-slate-400 font-bold text-lg sm:text-xl">/100</span>
            </div>

            <div className="mt-3">
              <span
                className={`inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-black border ${badgeInfo.color}`}
              >
                {badgeInfo.label}
              </span>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm mt-3 max-w-md mx-auto leading-relaxed">
              {badgeInfo.desc}
            </p>
          </div>

          {/* Storage notification badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-5">
            <BookmarkCheck className="w-4 h-4 text-emerald-600" />
            <span>Sesi ini telah tersimpan otomatis ke Riwayat Latihan</span>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4 border-t border-amber-100">
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-300 bg-white text-slate-700 text-xs font-bold hover:bg-slate-50 transition btn-bouncy cursor-pointer shadow-soft"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Tersalin!' : 'Salin Laporan'}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-300 bg-white text-slate-700 text-xs font-bold hover:bg-slate-50 transition btn-bouncy cursor-pointer shadow-soft"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Cetak / PDF</span>
            </button>

            {onGoToHistory && (
              <button
                onClick={onGoToHistory}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-amber-200 bg-amber-50 text-amber-900 text-xs font-bold hover:bg-amber-100 transition btn-bouncy cursor-pointer shadow-soft"
              >
                <History className="w-4 h-4 text-amber-700" />
                <span>Riwayat Latihan</span>
              </button>
            )}

            <button
              onClick={onRestart}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-black shadow-warm-orange transition btn-bouncy cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Simulasi Ulang Bidang Ini</span>
            </button>

            <button
              onClick={onSelectOtherField}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition btn-bouncy cursor-pointer shadow-soft"
            >
              <span>Pilih Kejuruan Lain</span>
            </button>
          </div>
        </div>
      </div>

      {/* Confidence & Speech Fluency Analysis Card */}
      <div className="bg-white rounded-3xl border-2 border-amber-200/80 p-6 sm:p-7 shadow-soft relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-100/50 via-orange-50/30 to-transparent pointer-events-none rounded-full blur-2xl -mr-20 -mt-20" />

        <div className="relative z-10 space-y-5">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 border border-orange-200/80 flex items-center justify-center shadow-2xs">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                    Evaluasi Tempo & Kelancaran Bicara
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200">
                    Artikulasi & Pacing
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Evaluasi ritme tempo bicara, deteksi kata gumam, dan ketegasan penyampaian jawaban Anda.
                </p>
              </div>
            </div>

            <span className={`px-3.5 py-1 rounded-full text-xs font-black border ${
              confidenceMetrics.confidenceScore >= 80 
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                : confidenceMetrics.confidenceScore >= 65
                ? 'bg-orange-50 text-orange-800 border-orange-200'
                : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}>
              {confidenceMetrics.confidenceLabel}
            </span>
          </div>

          {/* 3 Metric Pillars (Harmonized Pastel Colors) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Box 1: Confidence Index (Warm Orange) */}
            <div className="bg-orange-50/60 border-2 border-orange-200/80 rounded-2xl p-4 flex flex-col justify-between shadow-soft">
              <div>
                <div className="flex items-center justify-between text-xs text-orange-950 font-bold mb-1">
                  <span>Skor Keteraturan Bicara</span>
                  <Activity className="w-4 h-4 text-orange-600" />
                </div>
                <div className="flex items-baseline gap-1.5 my-2">
                  <span className="text-3xl font-black text-slate-900 tracking-tight">
                    {confidenceMetrics.confidenceScore}
                  </span>
                  <span className="text-xs font-bold text-slate-400">/100</span>
                </div>
              </div>
              <div className="w-full bg-orange-200/80 h-2.5 rounded-full overflow-hidden mt-1">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${confidenceMetrics.confidenceScore}%` }}
                />
              </div>
              <span className="text-[11px] text-slate-600 mt-2 block font-medium">
                Tingkat ketegasan dan keteraturan alur bicara
              </span>
            </div>

            {/* Box 2: Speech Pacing / WPM (Sky Blue) */}
            <div className="bg-sky-50/60 border-2 border-sky-200/80 rounded-2xl p-4 flex flex-col justify-between shadow-soft">
              <div>
                <div className="flex items-center justify-between text-xs text-sky-950 font-bold mb-1">
                  <span>Kecepatan Bicara (Pacing)</span>
                  <Clock className="w-4 h-4 text-sky-600" />
                </div>
                <div className="flex items-baseline gap-1.5 my-2">
                  <span className="text-3xl font-black text-sky-700 tracking-tight">
                    {confidenceMetrics.wpm}
                  </span>
                  <span className="text-xs font-bold text-sky-600">WPM</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                  confidenceMetrics.wpmStatus === 'ideal' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : confidenceMetrics.wpmStatus === 'fast'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-slate-200 text-slate-700'
                }`}>
                  {confidenceMetrics.wpmStatus === 'ideal' ? '✓ Ideal (90-145 WPM)' : confidenceMetrics.wpmStatus === 'fast' ? '⚠ Terburu-buru' : '⚠ Terlalu Lambat'}
                </span>
              </div>
              <span className="text-[11px] text-slate-600 mt-2 block line-clamp-2 font-medium">
                {confidenceMetrics.wpmDescription}
              </span>
            </div>

            {/* Box 3: Filler Words (Mint / Emerald) */}
            <div className="bg-emerald-50/60 border-2 border-emerald-200/80 rounded-2xl p-4 flex flex-col justify-between shadow-soft">
              <div>
                <div className="flex items-center justify-between text-xs text-emerald-950 font-bold mb-1">
                  <span>Deteksi Kata Gumam</span>
                  <MessageSquareQuote className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex items-baseline gap-1.5 my-2">
                  <span className={`text-3xl font-black tracking-tight ${
                    confidenceMetrics.fillerCount <= 2 ? 'text-emerald-700' : 'text-amber-600'
                  }`}>
                    {confidenceMetrics.fillerCount}
                  </span>
                  <span className="text-xs font-bold text-slate-500">kali terdeteksi</span>
                </div>
              </div>
              {confidenceMetrics.fillerDetails.length > 0 ? (
                <div className="flex flex-wrap gap-1 mt-1">
                  {confidenceMetrics.fillerDetails.map((f, i) => (
                    <span key={i} className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-200 rounded-full">
                      "{f.word}": {f.count}x
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-[11px] text-emerald-700 font-bold mt-1">
                  ✓ Bersih tanpa gumaman canggung
                </span>
              )}
              <span className="text-[11px] text-slate-600 mt-2 block font-medium">
                {confidenceMetrics.fillerDescription}
              </span>
            </div>
          </div>

          {/* Recommendation Banner */}
          <div className="p-4 rounded-2xl bg-amber-50/90 border-2 border-amber-200/80 flex items-start gap-3 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
              <Brain className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-black text-slate-900">
                Saran Kelancaran & Ketenangan Berbicara:
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {confidenceMetrics.psychologicalTip}
              </p>
            </div>
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
