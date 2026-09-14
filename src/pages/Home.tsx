import React from 'react';
import { PageView } from '../types';
import { 
  Video, ArrowRight, CheckCircle2, History,
  Wrench, Network, UtensilsCrossed, Calculator, Users, Sparkles, Volume2, Mic, MessageSquareText
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: PageView) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 sm:space-y-20 pb-16 overflow-x-hidden">
      {/* 1. Hero Section: Simpel, Jelas, & Mengena */}
      <section className="relative pt-6 sm:pt-12">
        {/* Soft Ambient Background Glow */}
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-blue-100/50 via-indigo-100/40 to-purple-100/30 blur-3xl -z-10 rounded-full" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Platform Simulasi Wawancara AI Siswa Kejuruan</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] max-w-3xl mx-auto">
            Latihan Wawancara Kerja Nyata{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Tatap Muka Bersama AI
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Simulasi wawancara kerja interaktif dua arah tanpa perlu login. Latih kepercayaan diri dengan kamera tatap muka langsung, pertanyaan bersuara (AI Voice), dan evaluasi lisan seketika berbasis metode STAR.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('interview')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base transition shadow-md shadow-blue-500/20 hover:shadow-lg active:scale-95 cursor-pointer"
            >
              <Video className="w-5 h-5" />
              <span>Mulai Simulasi Wawancara</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('history')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm sm:text-base border border-slate-200 shadow-2xs transition active:scale-95 cursor-pointer"
            >
              <History className="w-4 h-4 text-slate-500" />
              <span>Riwayat Latihan</span>
            </button>
          </div>

          {/* Quick Feature Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2.5 text-xs text-slate-500 font-medium">
            <span className="bg-white border border-slate-200/80 px-3 py-1 rounded-full shadow-2xs">
              📹 Live Camera & REC Timer
            </span>
            <span className="bg-white border border-slate-200/80 px-3 py-1 rounded-full shadow-2xs">
              🔊 Dialog Audio AI Bahasa Indonesia
            </span>
            <span className="bg-white border border-slate-200/80 px-3 py-1 rounded-full shadow-2xs">
              ✨ Format STAR & Feedback Instan
            </span>
          </div>

          {/* Interactive Compact Video Call Preview Card */}
          <div className="pt-6 max-w-2xl mx-auto">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-5 text-white shadow-xl space-y-3">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span className="font-bold text-rose-400">REC 01:24</span>
                  <span className="text-slate-400">• Ruang Wawancara Tatap Muka</span>
                </div>
                <span className="text-[11px] font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  Standar Industri DUDI
                </span>
              </div>

              {/* 2-Pane Video Preview */}
              <div className="grid grid-cols-2 gap-3">
                {/* HR Recruiter Audio Pane */}
                <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700 relative flex flex-col justify-between p-2.5 min-h-[130px] text-center">
                  <div className="flex justify-between items-center text-[9px]">
                    <span className="font-semibold bg-black/60 px-2 py-0.5 rounded text-white border border-white/10">
                      Pewawancara
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                  </div>

                  {/* Recruiter Monogram & Natural Frequency Equalizer */}
                  <div className="my-auto py-1 flex flex-col items-center justify-center space-y-1.5">
                    <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-[11px] font-bold text-slate-200">
                      SP
                    </div>
                    <div className="flex items-center justify-center gap-1 h-5">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <span
                          key={num}
                          className={`w-1 rounded-full bg-blue-400 animate-eq-${num}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="text-left">
                    <span className="text-xs font-bold text-white block">Sarah Pratama, S.Psi.</span>
                    <span className="text-[10px] text-slate-300 flex items-center gap-1 mt-0.5">
                      <Volume2 className="w-2.5 h-2.5 text-blue-400 animate-pulse" /> Pewawancara Aktif
                    </span>
                  </div>
                </div>

                {/* Candidate Feed Pane */}
                <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700 flex flex-col items-center justify-between min-h-[130px]">
                  <div className="w-full flex items-center justify-between text-[10px] text-slate-400">
                    <span>Kamera Siswa</span>
                    <span className="text-emerald-400 font-bold">Aktif</span>
                  </div>

                  <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-xs font-semibold text-slate-300">
                    Siswa
                  </div>

                  <div className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-full text-[9px] text-emerald-400">
                    <Mic className="w-2.5 h-2.5" />
                    <span>Mic Terhubung</span>
                  </div>
                </div>
              </div>

              {/* Instant Evaluation Snippet */}
              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 text-left flex items-start gap-2.5 text-xs">
                <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-purple-300">Umpan Balik Lisan AI: </span>
                  <span className="text-slate-300">"Jawaban Anda sangat baik (Skor 92). Tindakan teknis terstruktur dengan metode STAR."</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fitur Baru: AI Debat Partner Banner */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-2xl p-5 sm:p-6 text-white border border-purple-500/30 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center shrink-0">
              <MessageSquareText className="w-6 h-6 text-purple-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-full border border-purple-400/30">
                  Fitur Baru
                </span>
                <h3 className="font-bold text-base sm:text-lg text-white">AI Debat Partner Real-Time</h3>
              </div>
              <p className="text-xs text-purple-200/80 mt-1 max-w-xl">
                Asah critical thinking, retorika, dan ketajaman argumentasi secara lisan melalui percakapan dua arah langsung dengan AI!
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('debate')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm transition shrink-0 cursor-pointer shadow-md hover:scale-[1.02] active:scale-95"
          >
            <span>Mulai Debat AI</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 2. Cara Kerja: 3 Langkah Mudah */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            3 Langkah Mudah Berlatih
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Persiapkan diri menghadapi dunia kerja dalam hitungan menit
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2 text-center">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 font-bold flex items-center justify-center mx-auto text-sm">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Pilih Jurusan Kejuruan</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Tersedia pilihan Otomotif, Jaringan (TKJ), Tata Boga, Akuntansi, atau Soft Skills Umum.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2 text-center">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center mx-auto text-sm">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Wawancara Tatap Muka</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              AI membacakan pertanyaan lisan. Anda menjawab langsung dengan suara melalui mikrofon.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2 text-center">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 font-bold flex items-center justify-center mx-auto text-sm">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Dengar Evaluasi Audio</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              AI merespons lisan memberi penilaian instan, analisis format STAR, dan saran perbaikan.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Pilihan Bidang Kejuruan (Klik untuk Langsung Mulai) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Pilihan Bidang Kejuruan
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Pilih bidang kejuruan Anda untuk memulai simulasi sekarang
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {/* Otomotif */}
          <button
            onClick={() => onNavigate('interview')}
            className="p-4 rounded-xl border border-slate-200/90 bg-white hover:border-blue-500 hover:shadow-sm transition text-left flex items-start gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                Otomotif / TKR
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                Diagnosis mesin, sistem transmisi, kelistrikan, dan K3 bengkel.
              </p>
            </div>
          </button>

          {/* TKJ */}
          <button
            onClick={() => onNavigate('interview')}
            className="p-4 rounded-xl border border-slate-200/90 bg-white hover:border-blue-500 hover:shadow-sm transition text-left flex items-start gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                Komputer & Jaringan (TKJ)
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                Kabel LAN, Mikrotik router, perakitan PC, dan troubleshooting sistem.
              </p>
            </div>
          </button>

          {/* Tata Boga */}
          <button
            onClick={() => onNavigate('interview')}
            className="p-4 rounded-xl border border-slate-200/90 bg-white hover:border-blue-500 hover:shadow-sm transition text-left flex items-start gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                Tata Boga / Kuliner
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                Hygiene sanitasi, sistem FIFO, mise en place, dan kerja tim dapur.
              </p>
            </div>
          </button>

          {/* Akuntansi */}
          <button
            onClick={() => onNavigate('interview')}
            className="p-4 rounded-xl border border-slate-200/90 bg-white hover:border-blue-500 hover:shadow-sm transition text-left flex items-start gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                Akuntansi / AKL
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                Pencatatan jurnal, kas kecil, verifikasi faktur, dan ketelitian audit data.
              </p>
            </div>
          </button>

          {/* Umum */}
          <button
            onClick={() => onNavigate('interview')}
            className="p-4 rounded-xl border border-slate-200/90 bg-white hover:border-blue-500 hover:shadow-sm transition text-left flex items-start gap-3 cursor-pointer group sm:col-span-2 lg:col-span-2"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                Umum (Semua Jurusan SMK/SMA)
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                Pertanyaan kepribadian, adaptasi kerja, komunikasi tim, dan integritas kerja.
              </p>
            </div>
          </button>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => onNavigate('interview')}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition cursor-pointer"
          >
            <span>Pilih Bidang & Mulai Wawancara</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
