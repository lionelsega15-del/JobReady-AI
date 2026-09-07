import React, { useState } from 'react';
import { PageView } from '../types';
import { 
  Briefcase, Eye, ArrowRight, CheckCircle2, ShieldCheck, 
  Users, BookOpen, Target, Check, ChevronDown, ChevronUp,
  Cpu, Wrench, Network, UtensilsCrossed, Calculator, Sparkles,
  Award, Play
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: PageView) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [previewTab, setPreviewTab] = useState<'interview' | 'ishihara'>('interview');

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="space-y-20 sm:space-y-28 pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-16">
        {/* Soft Ambient Background Glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[360px] bg-gradient-to-tr from-blue-100/50 via-indigo-100/30 to-emerald-100/30 blur-3xl -z-10 rounded-full" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/[0.04] border border-slate-900/10 text-slate-700 text-xs font-semibold backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span>Platform Kesiapan Kerja Vokasi Modern</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
                Kuasai Wawancara Kerja & Tes Ishihara{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                  Sebelum Masuk Industri
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                Platform latihan mandiri tanpa login untuk siswa SMK/SMA dan Guru BK. Latih artikulasi lisan berformat STAR serta verifikasi ketajaman persepsi warna dengan modul angka dan alur berkelok interaktif.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <button
                  onClick={() => onNavigate('interview')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base transition-all shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.99] cursor-pointer"
                >
                  <Briefcase className="w-5 h-5" />
                  <span>Mulai Simulasi Wawancara</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('colorblind')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm sm:text-base transition-all border border-slate-200/90 shadow-2xs hover:shadow-sm active:scale-[0.99] cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <Eye className="w-5 h-5 text-emerald-600" />
                  <span>Uji Buta Warna Ishihara</span>
                </button>
              </div>

              {/* Metrics / Key Attributes Bar */}
              <div className="pt-5 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-y-2.5 gap-x-5 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <Check className="w-4 h-4 text-blue-600 stroke-[2.5]" />
                  5 Kluster Kejuruan SMK
                </span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <Check className="w-4 h-4 text-blue-600 stroke-[2.5]" />
                  Metode STAR Terarah
                </span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                  Mode Tracing Alur Berkelok
                </span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <Check className="w-4 h-4 text-indigo-600 stroke-[2.5]" />
                  100% Client-Side Privacy
                </span>
              </div>
            </div>

            {/* Right Live Simulation Preview Widget (Mockup Window) */}
            <div className="lg:col-span-5">
              <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/60 p-5 sm:p-6 space-y-4">
                {/* Mockup Window Header */}
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  </div>

                  {/* Interactive Switch Pills */}
                  <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setPreviewTab('interview')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        previewTab === 'interview'
                          ? 'bg-white text-blue-700 shadow-2xs'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      Wawancara STAR
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewTab('ishihara')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                        previewTab === 'ishihara'
                          ? 'bg-white text-emerald-700 shadow-2xs'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      <span>Tracing Ishihara</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </button>
                  </div>
                </div>

                {previewTab === 'interview' ? (
                  <div className="space-y-3.5 text-left">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          Pertanyaan Rekruter (TKJ):
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                          Standar DUDI
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                        "Bagaimana tindakan Anda saat terjadi gangguan koneksi jaringan LAN mendadak di kantor?"
                      </p>
                    </div>

                    {/* Candidate Answer Card */}
                    <div className="bg-slate-50/90 rounded-2xl p-3.5 border border-slate-200/80 text-xs space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                        <span>Jawaban Simulasi</span>
                        <span className="text-emerald-700 font-bold bg-emerald-100/70 px-2 py-0.5 rounded-full">
                          Skor: 92/100
                        </span>
                      </div>
                      <p className="text-slate-700 italic leading-relaxed text-[11px] sm:text-xs">
                        "Saat praktikum, saya langsung mengecek status LED switch dan kabel RJ-45 (Situasi), melakukan ping loopback ke gateway (Aksi), dan mengisolasi port yang bermasalah sehingga jaringan pulih dalam 5 menit (Hasil)."
                      </p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100/80 text-blue-800">
                          ✓ STAR Terstruktur
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100/80 text-emerald-800">
                          ✓ Terminologi: Switch, Ping, Gateway
                        </span>
                      </div>
                    </div>

                    {/* Evaluator Feedback */}
                    <div className="bg-blue-50/70 border border-blue-200/70 rounded-xl p-3 text-[11px] text-blue-900 leading-relaxed">
                      <span className="font-bold block mb-0.5">Ulasan Otomatis Evaluator:</span>
                      Artikulasi lugas, sistematis, dan langsung memberikan solusi teknis yang jelas. Sangat siap kerja!
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3.5 text-center">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-semibold text-slate-800">Plat #26: Alur Winding Berkelok</span>
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                        Kanvas Interaktif
                      </span>
                    </div>

                    {/* Mini Ishihara Plate Mockup */}
                    <div className="relative w-44 h-44 mx-auto my-2 rounded-full p-1.5 bg-slate-100 border border-slate-200/90 shadow-inner flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-full h-full rounded-full bg-slate-50">
                        <circle cx="50" cy="50" r="48" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
                        {/* Background dots */}
                        {[
                          [20, 30], [35, 20], [70, 25], [80, 45], [25, 75], 
                          [40, 85], [75, 80], [85, 70], [30, 50], [70, 55],
                          [18, 55], [50, 20], [50, 80], [82, 30], [22, 40]
                        ].map(([cx, cy], i) => (
                          <circle key={i} cx={cx} cy={cy} r="4.5" fill={i % 2 === 0 ? '#65a30d' : '#84cc16'} />
                        ))}
                        {/* Tracing Winding Path Dots */}
                        {[
                          [20, 50], [30, 38], [42, 35], [50, 45], [55, 60], [68, 65], [80, 50]
                        ].map(([cx, cy], i) => (
                          <circle key={i} cx={cx} cy={cy} r="5" fill={i % 2 === 0 ? '#ea580c' : '#dc2626'} />
                        ))}
                        {/* Winding guide line */}
                        <path
                          d="M 20 50 Q 35 30 50 45 T 80 50"
                          fill="none"
                          stroke="#0284c7"
                          strokeWidth="2.5"
                          strokeDasharray="3 3"
                          strokeLinecap="round"
                        />
                      </svg>
                      {/* Marker A & B */}
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-emerald-600 text-white font-black text-[9px] flex items-center justify-center shadow">
                        A
                      </span>
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-rose-600 text-white font-black text-[9px] flex items-center justify-center shadow">
                        B
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                      Siswa menarik garis dari <strong>Titik A</strong> ke <strong>Titik B</strong> untuk memverifikasi alur warna secara langsung dengan jari atau mouse.
                    </p>

                    <button
                      type="button"
                      onClick={() => onNavigate('colorblind')}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 transition cursor-pointer"
                    >
                      <span>Buka Mode Tracing Sekarang</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Core Modules Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Kurikulum Vokasi Terpadu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Dua Modul Inti Kesiapan Kerja
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Disusun untuk melatih kemampuan komunikasi verbal dan syarat fisik penglihatan yang paling sering diuji pada rekrutmen industri.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Simulasi Wawancara */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-9 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-13 h-13 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Briefcase className="w-6 h-6" />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
                  Modul 1
                </span>
                <span className="text-xs text-slate-500 font-medium">5 Kluster Kejuruan</span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Simulasi Wawancara Kerja
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Latihan tanya-jawab terpandu yang disesuaikan dengan program keahlian siswa. Evaluasi otomatis menganalisis struktur STAR, kata kunci industri, dan kejelasan jawaban.
              </p>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 mb-8">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>35 Pertanyaan realistis berstandar Dunia Usaha & Industri (DUDI)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Evaluasi instan skor 0–100, kekuatan jawaban, dan saran perbaikan</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Input mikrofon suara (Speech-to-Text) untuk melatih artikulasi lisan</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Ekspor ringkasan evaluasi untuk konseling lanjutan Guru BK</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('interview')}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-sm group-hover:shadow cursor-pointer"
            >
              <span>Mulai Latihan Wawancara</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 2: Tes Buta Warna */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-9 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-13 h-13 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Eye className="w-6 h-6" />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                  Modul 2
                </span>
                <span className="text-xs text-slate-500 font-medium">10 Plat Angka + 5 Plat Alur</span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Latihan Tes Buta Warna Ishihara
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Skrining persepsi warna mandiri sebelum mendaftar ke jurusan atau pekerjaan dengan syarat mata normal (teknik mesin, kelistrikan, otomotif, kimia, desain grafis).
              </p>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 mb-8">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>15 Plat pola warna Ishihara prosedural SVG murni bebas hak cipta</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Mode Baru:</strong> Kanvas tracing alur berliku dengan kuas sentuh & mouse</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Fitur pembanding garis rujukan resmi untuk verifikasi alur klinis</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Dilengkapi klausul disclaimer medis resmi demi kepatuhan integritas</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('colorblind')}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-sm group-hover:shadow cursor-pointer"
            >
              <span>Mulai Tes Buta Warna</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Modern STAR Methodology Breakdown Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-14 border border-slate-800 shadow-2xl relative overflow-hidden">
          {/* Ambient Glows */}
          <div className="pointer-events-none absolute top-0 right-0 w-80 h-80 bg-blue-600/10 blur-3xl rounded-full" />
          <div className="pointer-events-none absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/10 blur-3xl rounded-full" />

          <div className="max-w-2xl mx-auto text-center mb-12 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/90 px-3.5 py-1 rounded-full border border-blue-800/60">
              Metodologi Jawaban Rekruter
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold mt-3 tracking-tight">
              Mengapa Menggunakan Metode STAR?
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
              Pewawancara industri mencari bukti tindakan nyata, bukan sekadar teori. Metode STAR membantu siswa menyusun cerita pengalaman praktik kerja secara logis dan meyakinkan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-blue-500/50 transition">
              <div className="w-11 h-11 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-black text-xl">
                S
              </div>
              <h4 className="font-bold text-white text-base">Situation (Situasi)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Jelaskan latar belakang konteks, proyek sekolah, atau kendala spesifik yang dihadapi saat praktik bengkel/lab.
              </p>
            </div>

            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-indigo-500/50 transition">
              <div className="w-11 h-11 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-black text-xl">
                T
              </div>
              <h4 className="font-bold text-white text-base">Task (Tugas)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Uraikan apa tanggung jawab pribadi Anda dalam situasi tersebut dan target capaian yang harus diselesaikan.
              </p>
            </div>

            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-emerald-500/50 transition">
              <div className="w-11 h-11 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-black text-xl">
                A
              </div>
              <h4 className="font-bold text-white text-base">Action (Tindakan)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Sebutkan langkah teknis konkret, alat kerja yang digunakan, dan keputusan yang Anda ambil secara mandiri/tim.
              </p>
            </div>

            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-amber-500/50 transition">
              <div className="w-11 h-11 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-black text-xl">
                R
              </div>
              <h4 className="font-bold text-white text-base">Result (Hasil)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Paparkan dampak positif dari tindakan Anda: masalah terselesaikan, waktu efisien, atau pelajaran berharga yang didapat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Vocational Fields Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            5 Kluster Kejuruan Sesuai Standar DUDI
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Materi pertanyaan disusun mengacu pada kualifikasi rekrutmen entry-level yang paling sering dibuka di Bursa Kerja Khusus (BKK).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl border border-slate-200/90 bg-white hover:border-blue-400 hover:shadow-md transition space-y-3">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Teknik Kendaraan Ringan (Otomotif)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fokus pada diagnosis mesin, tune-up, sistem rem & EFI, serta standar K3 bengkel resmi.
            </p>
            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
              Target: Mekanik Bengkel, Teknisi Servis, QC Perakitan
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200/90 bg-white hover:border-blue-400 hover:shadow-md transition space-y-3">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Network className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Teknik Komputer & Jaringan (TKJ)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mencakup troubleshooting kabel LAN/Fiber Optic, konfigurasi IP & Mikrotik, serta keamanan data.
            </p>
            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
              Target: IT Support, Teknisi Jaringan, Junior Sysadmin
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200/90 bg-white hover:border-blue-400 hover:shadow-md transition space-y-3">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Tata Boga / Seni Kuliner</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Standar hygiene sanitasi dapur profesional, sistem FIFO, mise en place, dan kerja cepat saat jam sibuk.
            </p>
            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
              Target: Commis Chef, Baker, Kitchen Crew Restoran & Hotel
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200/90 bg-white hover:border-blue-400 hover:shadow-md transition space-y-3">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Akuntansi & Keuangan Lembaga</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pencatatan jurnal umum, rekonsiliasi kas kecil, verifikasi faktur pajak, dan ketelitian audit data.
            </p>
            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
              Target: Staff Administrasi, Kasir Keuangan, Junior Auditor
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200/90 bg-white hover:border-blue-400 hover:shadow-md transition space-y-3 sm:col-span-2 lg:col-span-1">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Umum (Semua Jurusan SMK/SMA)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pertanyaan sikap kerja universal: motivasi, adaptasi lembur, resolusi konflik tim, dan integritas kerja.
            </p>
            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
              Target: Operator Produksi, Frontliner, Customer Service
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Informasi praktis seputar penggunaan platform di sekolah atau secara mandiri di rumah.
          </p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: 'Apakah platform JobReady gratis dan perlu mendaftar akun?',
              a: 'JobReady sepenuhnya gratis dan tidak membutuhkan pembuatan akun maupun login. Siswa dapat langsung mengakses dan berlatih kapan saja melalui komputer laboratorium sekolah ataupun smartphone.',
            },
            {
              q: 'Bagaimana cara sistem menilai jawaban wawancara saya?',
              a: 'Sistem menganalisis kelengkapan struktur kalimat (panjang minimum, keberadaan konteks situasi dan aksi), mencocokkan kata kunci kompetensi kejuruan yang relevan, serta mengevaluasi penerapan format STAR.',
            },
            {
              q: 'Apakah rekaman suara saat latihan mikrofon disimpan ke server?',
              a: 'Tidak sama sekali. Fitur Speech-to-Text menggunakan API Speech Recognition bawaan browser lokal. Tidak ada data audio, suara, atau teks yang dikirim maupun disimpan ke server eksternal demi privasi siswa.',
            },
            {
              q: 'Apakah hasil tes buta warna dapat dijadikan surat keterangan dokter?',
              a: 'Bukan. Tes Ishihara ini adalah sarana simulasi edukatif awal untuk membiasakan siswa mengenali pola plat warna. Untuk keperluan administrasi resmi ke instansi kerja, siswa tetap harus melakukan pemeriksaan di fasilitas kesehatan resmi bersama dokter spesialis mata.',
            },
          ].map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs transition"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50 transition cursor-pointer"
                >
                  <span className="font-semibold text-slate-900 text-sm sm:text-base">
                    {faq.q}
                  </span>
                  <div className="shrink-0 text-slate-500">
                    {isOpen ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
