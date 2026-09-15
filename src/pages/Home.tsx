import React from 'react';
import { PageView } from '../types';
import { 
  Video, ArrowRight, Camera, CheckCircle2, Check, Brain,
  Wrench, Network, UtensilsCrossed, Calculator, Users,
  Sparkles, Star, Mic, Heart, Award, Clock, Smile
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: PageView) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-14 sm:space-y-20 pb-20 overflow-x-hidden">
      {/* ──────────────────────────────────────────────────────────
          1. HERO SECTION: Hangat, Ceria, & Mengundang Interaksi
      ────────────────────────────────────────────────────────── */}
      <section className="relative pt-6 sm:pt-12">
        {/* Warm ambient background glows */}
        <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-[650px] h-[320px] bg-gradient-to-b from-amber-100/70 via-orange-50/40 to-transparent blur-3xl -z-10 rounded-full" />
        <div className="pointer-events-none absolute top-40 right-10 w-72 h-72 bg-rose-100/40 blur-3xl -z-10 rounded-full" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          {/* Friendly Sparkle Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-amber-200/80 text-amber-900 text-xs font-bold shadow-soft">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>Kesiapan Kerja Vokasi SMK/SMA • Bebas Biaya & Tanpa Login</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black text-slate-900 tracking-tight leading-[1.18] max-w-3xl mx-auto">
            Latih Wawancara Kerja Jadi Lebih <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-transparent">Seru & Percaya Diri! 🚀</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Takut grogi saat ditatap pewawancara? Latih caramu berbicara di depan kamera, dengarkan suara pewawancara industri berformat STAR, dan ketahui skor kesiapan kerjamu tanpa rasa canggung!
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('interview')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-base shadow-warm-orange btn-bouncy cursor-pointer"
            >
              <Video className="w-5 h-5" />
              <span>Mulai Simulasi Wawancara</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('mirror')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white hover:bg-amber-50/50 text-slate-800 font-bold text-base border border-amber-200/90 shadow-soft btn-bouncy cursor-pointer"
              title="Latihan tatap kamera 60 detik tanpa dinilai"
            >
              <Camera className="w-5 h-5 text-indigo-500" />
              <span>Mode Cermin (60s)</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-extrabold">Bebas Nilai</span>
            </button>
          </div>

          {/* Trust Highlights Bar */}
          <div className="pt-5 border-t border-amber-100/90 max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-600 font-semibold">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50/80 border border-amber-200/60 text-amber-900">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" /> 5 Jurusan Kejuruan
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50/80 border border-sky-200/60 text-sky-900">
              <Mic className="w-3.5 h-3.5 text-sky-600" /> Dialog Audio Real-Time
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50/80 border border-emerald-200/60 text-emerald-900">
              <Heart className="w-3.5 h-3.5 text-emerald-600 fill-emerald-400" /> Pemanasan Napas 4-4-4
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50/80 border border-purple-200/60 text-purple-900">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" /> 100% Gratis & Mandiri
            </span>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────
            2. 4 KARTU MENU CEPAT (Quick Action Cards - Colorful & Fun)
            Terinspirasi dari referensi foto edukatif yang disukai teman
        ────────────────────────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Simulasi Suara Wawancara (Warm Orange/Amber) */}
            <button
              onClick={() => onNavigate('interview')}
              className="bg-gradient-to-b from-amber-50 to-orange-50/40 p-5 rounded-3xl border-2 border-amber-200/80 hover:border-orange-400 shadow-soft hover:shadow-card-hover transition-all text-left flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-warm-orange group-hover:scale-105 transition-transform">
                  <Video className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 bg-orange-100/90 px-2 py-0.5 rounded-full inline-block mb-1">
                    Interaktif Suara
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base group-hover:text-orange-600 transition-colors">
                    Simulasi Wawancara
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Dengarkan pertanyaan lisan dari pewawancara industri & jawab langsung lewat mic.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-between text-xs font-bold text-orange-700">
                <span>Mulai Simulasi</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Card 2: Mode Cermin (Sky Blue / Cyan) */}
            <button
              onClick={() => onNavigate('mirror')}
              className="bg-gradient-to-b from-sky-50 to-blue-50/40 p-5 rounded-3xl border-2 border-sky-200/80 hover:border-sky-400 shadow-soft hover:shadow-card-hover transition-all text-left flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-warm-blue group-hover:scale-105 transition-transform">
                  <Camera className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 bg-sky-100/90 px-2 py-0.5 rounded-full inline-block mb-1">
                    Latihan Kamera 60s
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base group-hover:text-sky-600 transition-colors">
                    Mode Cermin
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Bebas bicara di depan kamera tanpa dinilai salah, hilangkan rasa canggung tatap mata!
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-sky-200/60 flex items-center justify-between text-xs font-bold text-sky-700">
                <span>Buka Cermin</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Card 3: Pemanasan Napas 4-4-4 (Mint / Emerald Green) */}
            <button
              onClick={() => onNavigate('interview')}
              className="bg-gradient-to-b from-emerald-50 to-teal-50/40 p-5 rounded-3xl border-2 border-emerald-200/80 hover:border-emerald-400 shadow-soft hover:shadow-card-hover transition-all text-left flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-warm-emerald group-hover:scale-105 transition-transform">
                  <Heart className="w-6 h-6 fill-white/30" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-full inline-block mb-1">
                    Anti-Grogi
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base group-hover:text-emerald-700 transition-colors">
                    Pemanasan Relaksasi
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Pola pernapasan ritmis 4-4-4-4 untuk menstabilkan detak jantung sebelum wawancara.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-200/60 flex items-center justify-between text-xs font-bold text-emerald-700">
                <span>Coba Relaksasi</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Card 4: Riwayat & Rapor STAR (Purple / Lavender) */}
            <button
              onClick={() => onNavigate('history')}
              className="bg-gradient-to-b from-indigo-50 to-purple-50/40 p-5 rounded-3xl border-2 border-indigo-200/80 hover:border-indigo-400 shadow-soft hover:shadow-card-hover transition-all text-left flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-warm-purple group-hover:scale-105 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-100/90 px-2 py-0.5 rounded-full inline-block mb-1">
                    Rapor Siswa
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
                    Riwayat & Evaluasi
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Pantau perkembangan skor, detektor gumaman, kecepatan kata (WPM), dan saran Guru BK.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-indigo-200/60 flex items-center justify-between text-xs font-bold text-indigo-700">
                <span>Lihat Riwayat</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────
            3. PRATINJAU INTERAKTIF RUANG SIMULASI
            (Dibuat ramah dan nyaman dilihat, bukan sekadar box hitam kaku)
        ────────────────────────────────────────────────────────── */}
        <div className="pt-12 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl border-2 border-amber-200/80 shadow-soft p-5 sm:p-7 space-y-4">
            {/* Header Pratinjau */}
            <div className="flex items-center justify-between pb-3 border-b border-amber-100 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                <span className="font-black text-slate-800 text-sm">Pratinjau Ruang Simulasi Interaktif</span>
                <span className="text-amber-700 hidden sm:inline font-medium">• Seperti Video Call Nyata</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-extrabold text-[11px] border border-amber-200">
                Format STAR Standar DUDI
              </span>
            </div>

            {/* Split Screen Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Pewawancara Industri (Sarah) */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-2xl p-4 text-white flex flex-col justify-between min-h-[160px] shadow-sm">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="bg-white/15 px-2.5 py-0.5 rounded-full text-slate-200 font-semibold">
                    👩‍💼 Pewawancara Industri (Sarah Pratama)
                  </span>
                  <span className="flex items-center gap-1.5 text-amber-300 font-bold">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    Bersuara
                  </span>
                </div>

                <div className="my-auto py-2 text-center">
                  <p className="text-xs sm:text-sm font-semibold text-slate-100 italic leading-relaxed">
                    "Ceritakan pengalamanmu saat praktik kerja lapangan (PKL), dan bagaimana kamu mengatasi kendala di tim!"
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-700/80">
                  <span className="flex items-center gap-1 text-slate-300">
                    <Mic className="w-3.5 h-3.5 text-amber-400" /> Suara Bahasa Indonesia
                  </span>
                  <span className="text-amber-300 font-bold">Audio Jernih</span>
                </div>
              </div>

              {/* Kandidat Siswa */}
              <div className="bg-gradient-to-br from-amber-50/60 to-orange-50/40 border-2 border-amber-200 rounded-2xl p-4 flex flex-col justify-between min-h-[160px]">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="bg-white border border-amber-200 px-2.5 py-0.5 rounded-full text-slate-800 font-bold">
                    👤 Kamera Siswa
                  </span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 stroke-[3]" /> Mic Aktif
                  </span>
                </div>

                <div className="my-auto py-2 text-center space-y-1">
                  <span className="text-3xl">🎯</span>
                  <p className="text-xs sm:text-sm font-bold text-slate-800">
                    Jawab langsung dengan suara lewat mikrofon
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Dilengkapi panduan kontak mata & timer mundur otomatis
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-600 pt-2 border-t border-amber-200/70 font-semibold">
                  <span>Transkrip Teks Otomatis</span>
                  <span className="text-orange-600 font-black">Real-Time</span>
                </div>
              </div>
            </div>

            {/* Bottom Insight Strip */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-3.5 flex items-center gap-3 text-xs text-slate-800">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 fill-amber-500" />
              <span>
                <strong>Hasil Evaluasi Instan:</strong> Menganalisis ketepatan kata kunci kejuruan, struktur STAR (Situasi, Tugas, Aksi, Hasil), serta deteksi kata gumam (*"eemm"*, *"anu"*).
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          4. PILIHAN BIDANG KEJURUAN (Berwarna & Mirip Learning Card)
      ────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-900 text-xs font-bold border border-orange-200">
            <span>📚 Pilih Jurusanmu & Mulai Latihan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            5 Bidang Kejuruan SMK Siap Uji
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto">
            Materi disusun berdasarkan kompetensi teknis DUDI dan kisi-kisi wawancara BKK sekolah.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Otomotif / TKR */}
          <div className="bg-white rounded-3xl border-2 border-orange-200 p-5 shadow-soft hover:shadow-card-hover transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Wrench className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-0.5 text-amber-500 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                </div>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-orange-700 bg-orange-50 px-2 py-0.5 rounded-full inline-block mb-1">
                  Teknik & Mesin
                </span>
                <h3 className="font-extrabold text-slate-900 text-base group-hover:text-orange-600 transition-colors">
                  Otomotif / TKR
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Servis mesin, sistem rem, kelistrikan bodi, EFI, dan kepatuhan SOP K3 bengkel.
                </p>
              </div>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-1 pt-1">
                <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">Tune-Up</span>
                <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">Kelistrikan</span>
                <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">K3 Bengkel</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('interview')}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-2xs btn-bouncy cursor-pointer"
            >
              <span>Mulai Wawancara Otomotif</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* TKJ (Komputer & Jaringan) */}
          <div className="bg-white rounded-3xl border-2 border-sky-200 p-5 shadow-soft hover:shadow-card-hover transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Network className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-0.5 text-amber-500 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                </div>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full inline-block mb-1">
                  Teknologi Informasi
                </span>
                <h3 className="font-extrabold text-slate-900 text-base group-hover:text-sky-600 transition-colors">
                  Komputer & Jaringan (TKJ)
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Troubleshooting LAN/WAN, routing MikroTik, subnetting IP, dan server dasar.
                </p>
              </div>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-1 pt-1">
                <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">MikroTik</span>
                <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">LAN/WAN</span>
                <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">Fiber Optic</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('interview')}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-2xs btn-bouncy cursor-pointer"
            >
              <span>Mulai Wawancara TKJ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Tata Boga / Kuliner */}
          <div className="bg-white rounded-3xl border-2 border-rose-200 p-5 shadow-soft hover:shadow-card-hover transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <UtensilsCrossed className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-0.5 text-amber-500 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                </div>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full inline-block mb-1">
                  Pariwisata & Kuliner
                </span>
                <h3 className="font-extrabold text-slate-900 text-base group-hover:text-rose-600 transition-colors">
                  Tata Boga / Kuliner
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Sanitasi HACCP, mise en place dapur, manajemen rush hour, dan standard recipe.
                </p>
              </div>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-1 pt-1">
                <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">HACCP</span>
                <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">Mise en Place</span>
                <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">Rush Hour</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('interview')}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-2xs btn-bouncy cursor-pointer"
            >
              <span>Mulai Wawancara Kuliner</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Akuntansi (AKL) */}
          <div className="bg-white rounded-3xl border-2 border-emerald-200 p-5 shadow-soft hover:shadow-card-hover transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Calculator className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-0.5 text-amber-500 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                </div>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mb-1">
                  Bisnis & Keuangan
                </span>
                <h3 className="font-extrabold text-slate-900 text-base group-hover:text-emerald-700 transition-colors">
                  Akuntansi (AKL)
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Siklus jurnal umum, neraca lajur, rekonsiliasi bank, closing bulanan, dan pajak.
                </p>
              </div>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-1 pt-1">
                <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">Jurnal</span>
                <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">Neraca</span>
                <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">Rekonsiliasi</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('interview')}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs btn-bouncy cursor-pointer"
            >
              <span>Mulai Wawancara Akuntansi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Umum / Soft Skills */}
          <div className="bg-white rounded-3xl border-2 border-indigo-200 p-5 shadow-soft hover:shadow-card-hover transition-all flex flex-col justify-between group sm:col-span-2 lg:col-span-2">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-0.5 text-amber-500 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                </div>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full inline-block mb-1">
                  Kesiapan Karir Dasar
                </span>
                <h3 className="font-extrabold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
                  Umum & Soft Skills (Semua Jurusan)
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Perkenalan diri memukau, kelebihan/kelemahan diri, kerja sama tim, integritas, dan adaptabilitas saat memasuki dunia kerja pertama kali.
                </p>
              </div>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-1 pt-1">
                <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">Perkenalan Diri</span>
                <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">Kerjasama Tim</span>
                <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">Integritas</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('interview')}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-2xs btn-bouncy cursor-pointer"
            >
              <span>Mulai Wawancara Umum & Soft Skills</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          5. EDUKASI KARTU METODE STAR (Colorful & Easy to Digest)
      ────────────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-6 sm:p-8 text-white shadow-warm-orange space-y-6">
          <div className="space-y-2 text-center max-w-xl mx-auto">
            <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-white inline-block">
              🌟 Kunci Sukses Rekrutmen
            </span>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Gunakan Metode STAR Saat Menjawab!
            </h3>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              Pewawancara industri mencari bukti tindakan nyata, bukan teori hafalan. Kuasai 4 langkah mudah ini:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* S */}
            <div className="bg-white/90 rounded-2xl p-4 text-slate-800 shadow-sm space-y-1 text-center">
              <span className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 font-black text-lg flex items-center justify-center mx-auto mb-2">
                S
              </span>
              <span className="text-xs font-black text-slate-900 block">Situation</span>
              <p className="text-[11px] text-slate-600 leading-snug">Ceritakan situasi masalah di sekolah atau PKL.</p>
            </div>

            {/* T */}
            <div className="bg-white/90 rounded-2xl p-4 text-slate-800 shadow-sm space-y-1 text-center">
              <span className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 font-black text-lg flex items-center justify-center mx-auto mb-2">
                T
              </span>
              <span className="text-xs font-black text-slate-900 block">Task</span>
              <p className="text-[11px] text-slate-600 leading-snug">Jelaskan tugas dan tanggung jawab spesifik Anda.</p>
            </div>

            {/* A */}
            <div className="bg-white/90 rounded-2xl p-4 text-slate-800 shadow-sm space-y-1 text-center">
              <span className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-black text-lg flex items-center justify-center mx-auto mb-2">
                A
              </span>
              <span className="text-xs font-black text-slate-900 block">Action</span>
              <p className="text-[11px] text-slate-600 leading-snug">Uraikan langkah nyata dan SOP yang Anda terapkan.</p>
            </div>

            {/* R */}
            <div className="bg-white/90 rounded-2xl p-4 text-slate-800 shadow-sm space-y-1 text-center">
              <span className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-black text-lg flex items-center justify-center mx-auto mb-2">
                R
              </span>
              <span className="text-xs font-black text-slate-900 block">Result</span>
              <p className="text-[11px] text-slate-600 leading-snug">Sampaikan hasil positif yang berhasil dicapai.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
