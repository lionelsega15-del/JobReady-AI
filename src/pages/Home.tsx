import React, { useState } from 'react';
import { PageView } from '../types';
import { 
  Briefcase, Video, Mic, Volume2, ArrowRight, CheckCircle2, 
  ShieldCheck, Check, ChevronDown, ChevronUp,
  Wrench, Network, UtensilsCrossed, Calculator, Sparkles,
  History, RotateCcw, UserCheck
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: PageView) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="space-y-20 sm:space-y-28 pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-16">
        {/* Soft Ambient Background Glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[360px] bg-gradient-to-tr from-blue-100/50 via-indigo-100/30 to-purple-100/30 blur-3xl -z-10 rounded-full" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span>Simulasi Wawancara AI Tatap Muka & Suara Interaktif</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
                Kuasai Wawancara Kerja Vokasi{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Secara Tatap Muka Bersama AI
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                Platform latihan interaktif dua arah tanpa login untuk siswa SMK/SMA. Rasakan pengalaman nyata wawancara kerja industri dengan kamera tatap muka, pembacaan pertanyaan bersuara (AI Voice), transkripsi lisan, dan evaluasi audio langsung seketika.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <button
                  onClick={() => onNavigate('interview')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base transition-all shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.99] cursor-pointer"
                >
                  <Video className="w-5 h-5" />
                  <span>Mulai Simulasi Tatap Muka</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('history')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm sm:text-base transition-all border border-slate-200/90 shadow-2xs hover:shadow-sm active:scale-[0.99] cursor-pointer"
                >
                  <History className="w-5 h-5 text-indigo-600" />
                  <span>Riwayat & Rapor Latihan</span>
                </button>
              </div>

              {/* Metrics / Key Attributes Bar */}
              <div className="pt-5 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-y-2.5 gap-x-5 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <Check className="w-4 h-4 text-blue-600 stroke-[2.5]" />
                  Live Camera Feed & REC Timer
                </span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <Check className="w-4 h-4 text-blue-600 stroke-[2.5]" />
                  Audio AI Bahasa Indonesia
                </span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <Check className="w-4 h-4 text-indigo-600 stroke-[2.5]" />
                  Metode STAR Terstruktur
                </span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <Check className="w-4 h-4 text-purple-600 stroke-[2.5]" />
                  100% Client-Side Privacy
                </span>
              </div>
            </div>

            {/* Right Live Simulation Preview Widget (Interactive Virtual Video Room Mockup) */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl p-5 sm:p-6 space-y-4 text-white">
                {/* Mockup Window Header */}
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs text-slate-400 font-mono ml-1">ruang-wawancara-ai.live</span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                    LIVE REC 01:24
                  </span>
                </div>

                {/* Mini Split Video Screen Mockup */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Left: AI Interviewer */}
                  <div className="bg-slate-800/90 rounded-2xl p-3 border border-slate-700 flex flex-col items-center text-center justify-between min-h-[160px] relative overflow-hidden">
                    <div className="w-full flex justify-between items-center text-[10px] text-slate-400">
                      <span className="font-semibold text-blue-400">Pewawancara AI</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <Volume2 className="w-3 h-3" /> Berbicara
                      </span>
                    </div>

                    <div className="my-2 relative">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 p-0.5 shadow-lg">
                        <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center font-bold text-base text-white">
                          SP
                        </div>
                      </div>
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-slate-900 px-2 py-0.5 rounded-full border border-blue-500 flex items-center gap-0.5">
                        <span className="w-0.5 h-2 bg-blue-400 rounded-full animate-wave-1" />
                        <span className="w-0.5 h-3 bg-blue-400 rounded-full animate-wave-2" />
                        <span className="w-0.5 h-1.5 bg-blue-400 rounded-full animate-wave-3" />
                      </div>
                    </div>

                    <p className="text-[10px] text-slate-300 font-medium line-clamp-1">
                      Ibu Sarah (HR Industri)
                    </p>
                  </div>

                  {/* Right: Candidate Camera Feed */}
                  <div className="bg-slate-800/90 rounded-2xl p-3 border border-slate-700 flex flex-col items-center justify-between min-h-[160px] relative">
                    <div className="w-full flex justify-between items-center text-[10px] text-slate-400">
                      <span className="font-semibold text-slate-300">Kandidat Siswa</span>
                      <span className="text-rose-400 font-bold">REC</span>
                    </div>

                    <div className="my-2 flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-xs font-bold text-slate-200">
                        Siswa
                      </div>
                    </div>

                    {/* Mic visualizer */}
                    <div className="w-full flex items-center justify-center gap-1 bg-black/60 px-2 py-1 rounded-full text-[10px]">
                      <Mic className="w-2.5 h-2.5 text-emerald-400" />
                      <span className="w-1 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="w-1 h-3 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="w-1 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="text-[9px] text-slate-300 ml-1">Mic Aktif</span>
                    </div>
                  </div>
                </div>

                {/* Live Dialog Caption Box */}
                <div className="bg-slate-950/90 p-3.5 rounded-2xl border border-slate-800 space-y-1.5 text-xs text-left">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-blue-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Umpan Balik Lisan AI Instan:
                    </span>
                    <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Skor: 92/100
                    </span>
                  </div>
                  <p className="text-slate-200 italic leading-relaxed text-[11px]">
                    "Bagus sekali! Anda menjelaskan tindakan teknis dengan runtut sesuai metode STAR dan menguasai istilah industri. Pertahankan intonasi ini!"
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('interview')}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Coba Ruang Wawancara Tatap Muka Sekarang</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Interactive Features Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3 border border-blue-200/60">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Simulasi Kelas Industri</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Pengalaman Latihan Wawancara Interaktif Dua Arah
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Dirancang khusus untuk membangun rasa percaya diri siswa saat menghadapi tes wawancara kerja sesungguhnya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-7 hover:border-blue-500 hover:shadow-xl transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Tatap Muka Kamera & Perekam Nyata
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Tampilan video call split-screen dengan indikator <em>LIVE REC</em> dan panduan posisi wajah oval, melatih gestur, kontak mata, dan ketenangan peserta.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 text-xs font-semibold text-blue-600 flex items-center gap-1">
              <span>Preview Kamera Web Standar Industri</span>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-7 hover:border-indigo-500 hover:shadow-xl transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <Volume2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Dialog Audio Dua Arah (Voice AI)
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Pewawancara AI membacakan pertanyaan dengan suara bahasa Indonesia alami, dan memberikan <strong>umpan balik lisan langsung</strong> setelah Anda menjawab.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 text-xs font-semibold text-indigo-600 flex items-center gap-1">
              <span>Text-to-Speech & Speech Recognition Lokal</span>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-7 hover:border-purple-500 hover:shadow-xl transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Format STAR & Istilah Kejuruan
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Penilaian komprehensif mengukur alur Situasi-Tugas-Aksi-Hasil serta kecocokan kata kunci teknis kejuruan SMK (Otomotif, TKJ, Boga, Akuntansi, Umum).
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 text-xs font-semibold text-purple-600 flex items-center gap-1">
              <span>Skor Objektif & Rapor Evaluasi</span>
            </div>
          </div>
        </div>
      </section>

      {/* Modern STAR Methodology Breakdown Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-14 border border-slate-800 shadow-2xl relative overflow-hidden">
          {/* Ambient Glows */}
          <div className="pointer-events-none absolute top-0 right-0 w-80 h-80 bg-blue-600/10 blur-3xl rounded-full" />
          <div className="pointer-events-none absolute bottom-0 left-0 w-80 h-80 bg-purple-600/10 blur-3xl rounded-full" />

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

            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-purple-500/50 transition">
              <div className="w-11 h-11 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-black text-xl">
                A
              </div>
              <h4 className="font-bold text-white text-base">Action (Tindakan)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Sebutkan langkah teknis konkret, alat kerja yang digunakan, dan keputusan yang Anda ambil secara mandiri/tim.
              </p>
            </div>

            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-emerald-500/50 transition">
              <div className="w-11 h-11 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-black text-xl">
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

          <div className="p-6 rounded-2xl border border-slate-200/90 bg-white hover:border-blue-400 hover:shadow-md transition space-y-3 sm:col-span-2 lg:col-span-2">
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
            Informasi praktis seputar penggunaan simulasi wawancara tatap muka AI di sekolah atau mandiri.
          </p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: 'Apakah platform JobReady gratis dan perlu mendaftar akun?',
              a: 'JobReady sepenuhnya gratis dan tidak membutuhkan pembuatan akun maupun login. Siswa dapat langsung mengakses dan berlatih kapan saja melalui komputer laboratorium sekolah ataupun smartphone.',
            },
            {
              q: 'Bagaimana cara kerja fitur Tatap Muka Kamera & Audio AI di JobReady?',
              a: 'Platform memanfaatkan kamera web dan mikrofon browser langsung di perangkat Anda tanpa instalasi aplikasi tambahan. AI secara otomatis membacakan pertanyaan dengan suara bahasa Indonesia alami dan langsung memberikan umpan balik lisan konstruktif setelah Anda selesai berbicara.',
            },
            {
              q: 'Bagaimana cara sistem menilai jawaban wawancara saya?',
              a: 'Sistem menganalisis kelengkapan struktur kalimat (keberadaan konteks situasi, tindakan, dan hasil), mencocokkan kata kunci kompetensi kejuruan yang relevan, serta mengevaluasi penerapan format STAR.',
            },
            {
              q: 'Apakah rekaman video dan suara disimpan ke server?',
              a: 'Tidak sama sekali. Semua pemrosesan kamera (MediaStream), pengenalan suara (Speech Recognition), dan Text-to-Speech berjalan 100% di browser lokal Anda (client-side). Tidak ada file rekaman video atau suara yang diunggah ke server mana pun, sehingga privasi Anda terjamin aman.',
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
