import React from 'react';
import { PageView } from '../types';
import { 
  Video, ArrowRight, Camera, CheckCircle2, Check, Brain,
  Wrench, Network, UtensilsCrossed, Calculator, Users
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: PageView) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20 overflow-x-hidden">
      {/* ──────────────────────────────────────────────────────────
          1. HERO SECTION: Bersih, Berwibawa, & Nyaman Dilihat
      ────────────────────────────────────────────────────────── */}
      <section className="relative pt-6 sm:pt-14">
        {/* Soft elegant background tint */}
        <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-gradient-to-b from-blue-50/60 via-slate-50/40 to-transparent blur-3xl -z-10 rounded-full" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Kesiapan Kerja Vokasi • Standar Industri & BKK SMK</span>
          </div>

          {/* Main Headline (Clean typography, no flashy AI gradients) */}
          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-slate-900 tracking-tight leading-[1.18] max-w-3xl mx-auto">
            Latih Kepercayaan Diri Sebelum Wawancara Kerja yang Sesungguhnya
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Platform latihan mandiri untuk siswa SMK dan pencari kerja pemula. Berlatih tatap muka dengan simulasi suara, panduan pernapasan anti-gugup, serta evaluasi kelancaran bicara berbasis standar DUDI.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('interview')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base transition shadow-sm hover:shadow-md active:scale-98 cursor-pointer"
            >
              <Video className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Mulai Simulasi Wawancara</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('mirror')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base border border-slate-200 shadow-2xs transition active:scale-98 cursor-pointer"
              title="Latihan tatap kamera 60 detik tanpa dinilai"
            >
              <Camera className="w-4 h-4 text-slate-600" />
              <span>Mode Cermin (Latihan 60s)</span>
            </button>
          </div>

          {/* Trust Highlights Bar (Clean, single-line alignment) */}
          <div className="pt-6 border-t border-slate-200/70 max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-600 font-medium">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600" /> 5 Pilihan Jurusan Kejuruan
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600" /> Pemanasan Relaksasi 4-4-4-4
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600" /> Detektor Tempo & Gumaman
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600" /> Tanpa Registrasi / Gratis
            </span>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────
            Hero Product Showcase: Kartu Pratinjau Ruang Simulasi
        ────────────────────────────────────────────────────────── */}
        <div className="pt-10 max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg p-5 sm:p-6 space-y-4">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                <span className="font-bold text-slate-800">Simulasi Tatap Muka Realistis</span>
                <span className="text-slate-400 hidden sm:inline">• Ruang Latihan Mandiri</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold text-[11px]">
                Format Jawaban STAR
              </span>
            </div>

            {/* Split Screen Mockup */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Recruiter Box */}
              <div className="bg-slate-900 rounded-2xl p-4 text-white flex flex-col justify-between min-h-[140px]">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="bg-white/10 px-2 py-0.5 rounded text-slate-200 font-medium">
                    Pewawancara Industri
                  </span>
                  <span className="flex items-center gap-1 text-cyan-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    Bersuara
                  </span>
                </div>

                <div className="my-auto py-2 text-center">
                  <p className="text-xs sm:text-sm font-semibold text-slate-100 italic leading-relaxed">
                    "Ceritakan pengalamanmu saat menjalani praktik kerja lapangan (PKL) di bengkel/kantor!"
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                  <span>Audio Speech Synthesis</span>
                  <span className="text-slate-300 font-medium">Bahasa Indonesia</span>
                </div>
              </div>

              {/* Candidate Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between min-h-[140px]">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-700 font-bold">
                    Kamera Kandidat
                  </span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Siap Rekam
                  </span>
                </div>

                <div className="my-auto py-2 text-center space-y-1">
                  <span className="text-2xl">👤</span>
                  <p className="text-xs font-semibold text-slate-700">
                    Jawab langsung dengan suara melalui mikrofon
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Dilengkapi panduan kontak mata dan timer
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/80">
                  <span>Web Speech Recognition</span>
                  <span className="text-blue-700 font-bold">Real-Time</span>
                </div>
              </div>
            </div>

            {/* Bottom Insight Strip */}
            <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3 flex items-center gap-2.5 text-xs text-blue-950">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                <strong>Hasil Akhir Komprehensif:</strong> Evaluasi format STAR, skor penguasaan kata kunci, kecepatan bicara (WPM), dan deteksi kata gumam.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          2. 3 PILAR FITUR UTAMA KESIAPAN KERJA
      ────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Metode Latihan Terstruktur
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Dirancang Mengatasi Penyebab Utama Kegagalan Wawancara
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto">
            Bukan sekadar bank soal, melainkan sarana membangun kesiapan mental, vokal, dan ketelitian administratif.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between hover:border-slate-300 transition">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Simulasi Wawancara Tatap Muka
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pewawancara membacakan pertanyaan lisan secara interaktif. Kandidat merespons dengan suara, melatih refleks dan ketepatan menjawab langsung di hadapan kamera.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-blue-700">
              <span>7 Pertanyaan Baku per Jurusan</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between hover:border-slate-300 transition">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                <Camera className="w-5 h-5 text-slate-700" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Mode Cermin & Pemanasan Relaksasi
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Latihan menatap lensa kamera dengan panduan titik fokus, pernapasan ritmis 4-4-4-4 untuk menurunkan detak jantung, serta putar ulang rekaman sendiri agar bebas canggung.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-slate-700">
              <span>Bebas Latihan Tanpa Dinilai</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between hover:border-slate-300 transition">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Brain className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Analisis Kelancaran & Kata Gumam
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Setelah selesai 7 pertanyaan, sistem otomatis menghitung tempo bicara (WPM), mendeteksi frekuensi kata gumam (*"eemm"*, *"anu"*), dan memberikan skor percaya diri objektif.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-emerald-700">
              <span>Evaluasi Non-Verbal Terukur</span>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          3. PILIHAN BIDANG KEJURUAN (Langsung Akses)
      ────────────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Pilihan Bidang Kejuruan
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            Materi disusun berdasarkan kompetensi teknis DUDI dan standar kurikulum SMK
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {/* Otomotif */}
          <button
            onClick={() => onNavigate('interview')}
            className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-blue-500 hover:shadow-xs transition text-left flex items-start gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Teknik & Manufaktur</span>
              <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-700 transition-colors">
                Otomotif / TKR
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                Servis mesin, sistem rem, kelistrikan bodi, dan K3 bengkel.
              </p>
            </div>
          </button>

          {/* TKJ */}
          <button
            onClick={() => onNavigate('interview')}
            className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-blue-500 hover:shadow-xs transition text-left flex items-start gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Teknologi Informasi</span>
              <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-700 transition-colors">
                Komputer & Jaringan (TKJ)
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                Troubleshooting LAN, konfigurasi router, dan dasar cloud computing.
              </p>
            </div>
          </button>

          {/* Tata Boga */}
          <button
            onClick={() => onNavigate('interview')}
            className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-blue-500 hover:shadow-xs transition text-left flex items-start gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pariwisata & Kuliner</span>
              <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-700 transition-colors">
                Tata Boga / Kuliner
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                HACCP, sanitasi dapur, mise en place, dan penanganan rush hour.
              </p>
            </div>
          </button>

          {/* Akuntansi */}
          <button
            onClick={() => onNavigate('interview')}
            className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-blue-500 hover:shadow-xs transition text-left flex items-start gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Bisnis & Keuangan</span>
              <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-700 transition-colors">
                Akuntansi (AKL)
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                Siklus jurnal, neraca/laba rugi, closing akhir bulan, dan pajak.
              </p>
            </div>
          </button>

          {/* Umum */}
          <button
            onClick={() => onNavigate('interview')}
            className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-blue-500 hover:shadow-xs transition text-left flex items-start gap-3 cursor-pointer group sm:col-span-2 lg:col-span-2"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Kesiapan Karir Dasar</span>
              <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-700 transition-colors">
                Umum & Soft Skills (Semua Jurusan)
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                Perkenalan diri, kelebihan/kelemahan, kerja sama tim, integritas, dan adaptabilitas kerja.
              </p>
            </div>
          </button>
        </div>

        {/* CTA to start */}
        <div className="mt-8 text-center">
          <button
            onClick={() => onNavigate('interview')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition cursor-pointer shadow-xs"
          >
            <span>Pilih Kejuruan & Mulai Simulasi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          4. EDUKASI: METODE STAR & PENILAIAN NON-VERBAL
      ────────────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 rounded-3xl p-6 sm:p-8 text-white space-y-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300">
              Panduan Jawaban Standar HRD
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Mengapa Metode STAR & Kelancaran Non-Verbal Sangat Menentukan?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Pewawancara industri mencari bukti nyata tindakan, bukan teori hafalan. Kuasai 4 pilar ini saat menjawab:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white/10 rounded-xl p-3.5 border border-white/10 space-y-1">
              <span className="text-lg font-black text-cyan-300">S</span>
              <span className="text-xs font-bold text-white block">Situation</span>
              <p className="text-[11px] text-slate-300">Ceritakan latar belakang situasi atau proyek secara ringkas.</p>
            </div>

            <div className="bg-white/10 rounded-xl p-3.5 border border-white/10 space-y-1">
              <span className="text-lg font-black text-blue-300">T</span>
              <span className="text-xs font-bold text-white block">Task</span>
              <p className="text-[11px] text-slate-300">Jelaskan tugas dan tanggung jawab spesifik yang Anda pikul.</p>
            </div>

            <div className="bg-white/10 rounded-xl p-3.5 border border-white/10 space-y-1">
              <span className="text-lg font-black text-amber-300">A</span>
              <span className="text-xs font-bold text-white block">Action</span>
              <p className="text-[11px] text-slate-300">Uraikan tindakan nyata dan SOP yang Anda terapkan.</p>
            </div>

            <div className="bg-white/10 rounded-xl p-3.5 border border-white/10 space-y-1">
              <span className="text-lg font-black text-emerald-300">R</span>
              <span className="text-xs font-bold text-white block">Result</span>
              <p className="text-[11px] text-slate-300">Sampaikan hasil positif yang berhasil dicapai bersama tim.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
