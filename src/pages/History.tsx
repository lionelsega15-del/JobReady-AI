import React, { useState, useEffect, useMemo } from 'react';
import { PageView, SavedInterviewSession, InterviewMode } from '../types';
import { 
  getInterviewHistory, 
  deleteInterviewSession, 
  clearAllInterviewHistory, 
  getInterviewStats 
} from '../lib/storage';
import { VOCATIONAL_FIELDS } from '../data/interview-questions';
import { 
  Briefcase, Award, Clock, ArrowRight, Trash2, RotateCcw, 
  ChevronDown, ChevronUp, Copy, Check, Printer, Filter, 
  TrendingUp, Calendar, AlertCircle, ArrowLeft, BookOpen, 
  CheckCircle2, Sparkles, HelpCircle, Wrench, Network, 
  UtensilsCrossed, Calculator, Users
} from 'lucide-react';

interface HistoryPageProps {
  onNavigate: (page: PageView) => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Wrench,
  Network,
  UtensilsCrossed,
  Calculator,
  Users,
};

export const HistoryPage: React.FC<HistoryPageProps> = ({ onNavigate }) => {
  const [sessions, setSessions] = useState<SavedInterviewSession[]>([]);
  const [selectedFieldFilter, setSelectedFieldFilter] = useState<string>('all');
  const [selectedModeFilter, setSelectedModeFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'highest-score' | 'lowest-score'>('newest');
  const [expandedSessionId, setExpandedSessionId] = useState<string | null>(null);
  const [copiedSessionId, setCopiedSessionId] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState<boolean>(false);
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);

  useEffect(() => {
    setSessions(getInterviewHistory());
  }, []);

  const stats = useMemo(() => {
    return getInterviewStats(sessions);
  }, [sessions]);

  const filteredSessions = useMemo(() => {
    let result = [...sessions];

    // Filter by field
    if (selectedFieldFilter !== 'all') {
      result = result.filter(s => s.fieldId === selectedFieldFilter);
    }

    // Filter by mode
    if (selectedModeFilter !== 'all') {
      result = result.filter(s => s.mode === selectedModeFilter);
    }

    // Sort
    result.sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sortOrder === 'highest-score') {
        return b.overallScore - a.overallScore;
      }
      if (sortOrder === 'lowest-score') {
        return a.overallScore - b.overallScore;
      }
      return 0;
    });

    return result;
  }, [sessions, selectedFieldFilter, selectedModeFilter, sortOrder]);

  const handleDeleteSession = (id: string) => {
    const updated = deleteInterviewSession(id);
    setSessions(updated);
    setSessionToDelete(null);
    if (expandedSessionId === id) {
      setExpandedSessionId(null);
    }
  };

  const handleClearAll = () => {
    clearAllInterviewHistory();
    setSessions([]);
    setShowClearConfirm(false);
    setExpandedSessionId(null);
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds || seconds <= 0) return '-';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) return `${secs} dtk`;
    return `${mins}m ${secs}s`;
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  const copySessionReport = (session: SavedInterviewSession) => {
    const textReport = [
      `=== LAPORAN RIWAYAT SIMULASI WAWANCARA — JOBREADY ===`,
      `ID Sesi: ${session.id}`,
      `Bidang: ${session.fieldName}`,
      `Skor Rata-Rata: ${session.overallScore}/100 (${session.badgeLabel})`,
      `Mode: ${session.mode === 'timed' ? 'Mode Seleksi Industri' : 'Mode Santai'}`,
      `Durasi Total: ${formatDuration(session.totalDurationSeconds)}`,
      `Tanggal: ${formatDate(session.date)}`,
      `----------------------------------------------------`,
      ...(session.answers || []).map((a, idx) => {
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
      `Tersimpan secara lokal di browser JobReady.`,
    ].join('\n');

    navigator.clipboard.writeText(textReport).then(() => {
      setCopiedSessionId(session.id);
      setTimeout(() => setCopiedSessionId(null), 2500);
    });
  };

  return (
    <div className="py-6 sm:py-8 px-4 sm:px-6 max-w-5xl mx-auto flex-1 flex flex-col space-y-6">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('interview')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Simulasi Wawancara</span>
        </button>

        <button
          onClick={() => onNavigate('interview')}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition cursor-pointer"
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Mulai Simulasi Baru</span>
        </button>
      </div>

      {/* Header Banner */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold mb-2">
          <Clock className="w-3.5 h-3.5 text-blue-600" />
          <span>Rekam Jejak Evaluasi Mandiri</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Riwayat Latihan Wawancara
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          Pantau perkembangan skor, durasi latihan, dan catatan evaluasi dari setiap sesi latihan yang pernah Anda jalani di perangkat ini.
        </p>
      </div>

      {/* Statistics Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
            <span>Total Sesi Latihan</span>
            <Briefcase className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {stats.totalSessions} <span className="text-xs font-normal text-slate-500">sesi</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {stats.totalQuestionsAnswered} total pertanyaan dijawab
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
            <span>Rata-Rata Skor</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {stats.averageScore} <span className="text-xs font-normal text-slate-500">/ 100</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {stats.averageScore >= 80 ? 'Predikat: Sangat Siap' : stats.averageScore >= 55 ? 'Predikat: Cukup Siap' : 'Perlu Pemantapan'}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
            <span>Skor Tertinggi</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-blue-700">
            {stats.highestScore} <span className="text-xs font-normal text-slate-500">/ 100</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Pencapaian terbaik Anda
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
            <span>Bidang Terfavorit</span>
            <BookOpen className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-base sm:text-lg font-bold text-slate-900 truncate">
            {stats.mostPracticedField || '-'}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Paling sering dilatih
          </div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-3 sm:p-4 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Field Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium hidden sm:inline">Bidang:</span>
            <select
              value={selectedFieldFilter}
              onChange={(e) => setSelectedFieldFilter(e.target.value)}
              className="text-xs rounded-lg border border-slate-200 px-2.5 py-1.5 bg-slate-50 text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="all">Semua Bidang Kejuruan</option>
              {VOCATIONAL_FIELDS.map(f => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>

          {/* Mode Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="font-medium hidden sm:inline">Mode:</span>
            <select
              value={selectedModeFilter}
              onChange={(e) => setSelectedModeFilter(e.target.value)}
              className="text-xs rounded-lg border border-slate-200 px-2.5 py-1.5 bg-slate-50 text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="all">Semua Mode</option>
              <option value="timed">⏱️ Mode Seleksi (Timer)</option>
              <option value="relaxed">🧘 Mode Santai</option>
            </select>
          </div>

          {/* Sort Order */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="font-medium hidden sm:inline">Urutkan:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="text-xs rounded-lg border border-slate-200 px-2.5 py-1.5 bg-slate-50 text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="newest">Sesi Terbaru</option>
              <option value="highest-score">Skor Tertinggi</option>
              <option value="lowest-score">Skor Terendah</option>
            </select>
          </div>
        </div>

        {sessions.length > 0 && (
          <button
            type="button"
            onClick={() => setShowClearConfirm(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-semibold transition cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-600" />
            <span>Kosongkan Riwayat</span>
          </button>
        )}
      </div>

      {/* Confirmation Modal for Clear All */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-900">Kosongkan Semua Riwayat?</h3>
              <p className="text-xs text-slate-600 mt-1">
                Semua {sessions.length} riwayat sesi latihan dan evaluasi akan dihapus secara permanen dari browser ini. Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleClearAll}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition shadow-xs cursor-pointer"
              >
                Ya, Hapus Semua
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Single Session Delete */}
      {sessionToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-xl border border-slate-200 space-y-4 text-center">
            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Hapus Sesi Ini?</h3>
              <p className="text-xs text-slate-600 mt-1">
                Riwayat evaluasi untuk sesi ini akan dihapus dari daftar.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSessionToDelete(null)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => handleDeleteSession(sessionToDelete)}
                className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition shadow-xs cursor-pointer"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredSessions.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-12 text-center shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
            <Clock className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">
            {sessions.length === 0 ? 'Belum Ada Riwayat Latihan' : 'Tidak Ada Sesi yang Sesuai Filter'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6">
            {sessions.length === 0 
              ? 'Setiap kali Anda menyelesaikan simulasi wawancara kejuruan, hasil skor dan umpan balik akan disimpan otomatis di sini.' 
              : 'Coba ubah pilihan filter bidang kejuruan atau mode latihan di atas.'}
          </p>
          <button
            onClick={() => onNavigate('interview')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition shadow-sm cursor-pointer"
          >
            <Briefcase className="w-4 h-4" />
            <span>Mulai Simulasi Wawancara Pertama</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Session Cards List */}
      {filteredSessions.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Menampilkan {filteredSessions.length} sesi latihan</span>
          </div>

          {filteredSessions.map((session) => {
            const isExpanded = expandedSessionId === session.id;
            const IconComponent = ICON_MAP[session.fieldIcon] || Briefcase;

            return (
              <div
                key={session.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-sm transition"
              >
                {/* Main Card Summary */}
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Left: Field & Meta */}
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-tight">
                            {session.fieldName}
                          </h3>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                            {session.fieldTag}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            {formatDate(session.date)}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {session.mode === 'timed' 
                              ? `Mode Seleksi (${session.timerDurationSeconds ? Math.floor(session.timerDurationSeconds / 60) : 2}m)` 
                              : 'Mode Santai'}
                          </span>
                          {session.totalDurationSeconds > 0 && (
                            <>
                              <span className="text-slate-300">•</span>
                              <span>Durasi: {formatDuration(session.totalDurationSeconds)}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Score & Preparedness Badge */}
                    <div className="flex items-center justify-between sm:justify-end gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <div className="text-left sm:text-right">
                        <div className="flex items-baseline sm:justify-end gap-1">
                          <span className="text-2xl sm:text-3xl font-black text-blue-700">
                            {session.overallScore}
                          </span>
                          <span className="text-xs text-slate-400 font-semibold">/100</span>
                        </div>
                        <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full border mt-0.5 ${session.badgeColor}`}>
                          {session.badgeLabel}
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setExpandedSessionId(isExpanded ? null : session.id)}
                          className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1 transition cursor-pointer ${
                            isExpanded
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                          title="Lihat Detail Jawaban & Feedback"
                        >
                          <span className="hidden sm:inline">{isExpanded ? 'Tutup Rincian' : 'Rincian'}</span>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>

                        <button
                          type="button"
                          onClick={() => setSessionToDelete(session.id)}
                          className="p-2 rounded-lg border border-slate-200 hover:border-rose-200 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                          title="Hapus sesi ini"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Answers and Feedback Accordion */}
                {isExpanded && (
                  <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-slate-100 bg-slate-50/50 space-y-4">
                    {/* Action Toolbar for Session */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                      <span className="text-xs font-bold text-slate-700">
                        Daftar Pertanyaan & Jawaban Siswa ({session.answers?.length || 0})
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => copySessionReport(session)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50 transition cursor-pointer shadow-2xs"
                        >
                          {copiedSessionId === session.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedSessionId === session.id ? 'Tersalin!' : 'Salin Evaluasi'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => window.print()}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50 transition cursor-pointer shadow-2xs"
                        >
                          <Printer className="w-3.5 h-3.5 text-slate-600" />
                          <span>Cetak</span>
                        </button>
                      </div>
                    </div>

                    {/* Questions loop */}
                    <div className="space-y-3">
                      {(session.answers || []).map((ans, aIdx) => (
                        <div
                          key={aIdx}
                          className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-2xs"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-2.5">
                              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                                {aIdx + 1}
                              </span>
                              <div>
                                <h4 className="font-semibold text-slate-900 text-xs sm:text-sm leading-snug">
                                  {ans.questionText}
                                </h4>
                                {ans.timeSpentSeconds && (
                                  <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                                    <Clock className="w-3 h-3" />
                                    Waktu jawab: {formatDuration(ans.timeSpentSeconds)}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="text-right shrink-0">
                              <span className="font-bold text-xs text-slate-800">
                                {ans.feedback.score}/100
                              </span>
                              <span className="text-[11px] text-slate-400 block">
                                {ans.feedback.summary}
                              </span>
                            </div>
                          </div>

                          {/* Student's answer */}
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80 text-xs text-slate-800">
                            <span className="font-semibold text-slate-600 block mb-1">
                              Jawaban Siswa:
                            </span>
                            <p className="italic leading-relaxed whitespace-pre-wrap">
                              "{ans.userAnswer}"
                            </p>
                          </div>

                          {/* Evaluation & Tips */}
                          <div className="text-xs space-y-2">
                            <div>
                              <span className="font-semibold text-slate-800">Analisis Rekruter:</span>
                              <p className="text-slate-600 leading-relaxed mt-0.5">
                                {ans.feedback.critique}
                              </p>
                            </div>

                            {ans.feedback.matchedKeywords && ans.feedback.matchedKeywords.length > 0 && (
                              <div className="flex flex-wrap gap-1 items-center">
                                <span className="text-[11px] text-slate-500 font-medium mr-1">Kata Kunci:</span>
                                {ans.feedback.matchedKeywords.map((kw, kIdx) => (
                                  <span
                                    key={kIdx}
                                    className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 text-[11px] font-semibold border border-blue-200"
                                  >
                                    ✓ {kw}
                                  </span>
                                ))}
                              </div>
                            )}

                            {ans.feedback.strengths && ans.feedback.strengths.length > 0 && (
                              <div className="bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-200 text-emerald-900 text-xs">
                                <span className="font-bold block text-emerald-950 mb-0.5">Kelebihan:</span>
                                <ul className="list-disc list-inside space-y-0.5 text-emerald-800">
                                  {ans.feedback.strengths.map((str, sIdx) => (
                                    <li key={sIdx}>{str}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {ans.feedback.suggestions && ans.feedback.suggestions.length > 0 && (
                              <div className="bg-amber-50/70 p-2.5 rounded-lg border border-amber-200 text-amber-900 text-xs">
                                <span className="font-bold block text-amber-950 mb-0.5">Saran Perbaikan:</span>
                                <ul className="list-disc list-inside space-y-0.5 text-amber-800">
                                  {ans.feedback.suggestions.map((sug, sIdx) => (
                                    <li key={sIdx}>{sug}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
