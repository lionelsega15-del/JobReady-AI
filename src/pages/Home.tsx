import React, { useState } from 'react';
import { PageView } from '../types';
import { 
  Briefcase, Eye, ArrowRight, CheckCircle2, ShieldCheck, 
  Users, BookOpen, Target, Check, ChevronDown, ChevronUp,
  Cpu, Wrench, Network, UtensilsCrossed, Calculator, Mic
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
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section with Split Layout & Live Preview Card */}
      <section className="relative pt-6 sm:pt-12 bg-grid-slate">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-semibold shadow-2xs">
                <Target className="w-3.5 h-3.5 text-blue-600" />
                <span>Standar Kompetensi Kerja Kejuruan & Industri</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Kuasai Wawancara Kerja & Tes Ishihara Sebelum Masuk Industri
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Latihan mandiri interaktif untuk siswa SMK/SMA dan instrumen pendamping Guru BK & BKK. Kuasai artikulasi jawaban metode STAR serta verifikasi persepsi visual warna secara mandiri.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <button
                  onClick={() => onNavigate('interview')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base transition shadow-sm hover:shadow-md active:scale-[0.99] cursor-pointer"
                >
                  <Briefcase className="w-5 h-5" />
                  <span>Mulai Simulasi Wawancara</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('colorblind')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm sm:text-base transition shadow-sm hover:shadow-md active:scale-[0.99] cursor-pointer"
                >
                  <Eye className="w-5 h-5 text-emerald-400" />
                  <span>Uji Buta Warna Ishihara</span>
                </button>
              </div>

              {/* Highlights */}
              <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-5 text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-blue-600 stroke-[2.5]" />
                  5 Kluster Jurusan SMK
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-blue-600 stroke-[2.5]" />
                  Mode Timer Seleksi DUDI
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-blue-600 stroke-[2.5]" />
                  Format STAR Terarah
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-indigo-600 stroke-[2.5]" />
                  Riwayat Evaluasi Tersimpan
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                  100% Privasi di Browser
                </span>
              </div>
            </div>

            {/* Right Live Simulation Preview Widget */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Live Preview Penilaian
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                    Teknik Jaringan (TKJ)
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Pertanyaan Pewawancara:
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                    "Bagaimana tindakan Anda saat terjadi gangguan koneksi jaringan LAN mendadak di kantor?"
                  </p>
                </div>

                {/* Sample Answer with STAR badges */}
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 text-xs space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                    <span>Contoh Jawaban Siswa</span>
                    <span className="text-emerald-700 font-bold">Skor: 92/100</span>
                  </div>
                  <p className="text-slate-700 italic leading-relaxed text-[11px] sm:text-xs">
                    "Saat praktikum, saya langsung mengecek status LED switch dan kabel RJ-45 (Situasi), melakukan ping loopback ke gateway (Aksi), dan mengisolasi port yang bermasalah sehingga jaringan pulih dalam 5 menit (Hasil)."
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                      ✓ STAR Terstruktur
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      ✓ Terminologi: Switch, Ping, Gateway
                    </span>
                  </div>
                </div>

                {/* Feedback Note */}
                <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3 text-[11px] text-blue-900 leading-relaxed">
                  <span className="font-bold block mb-0.5">Catatan Evaluator:</span>
                  Artikulasi lugas, sistematis, dan langsung memberikan solusi teknis yang jelas. Sangat siap kerja!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Core Modules */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dua Modul Inti Kesiapan Kerja
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Dipilah menjadi modul komunikasi wawancara dan modul uji penglihatan warna yang sering menjadi syarat mutlak rekrutmen industri.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Card 1: Simulasi Wawancara */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 hover:border-blue-500 hover:shadow-lg transition duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-5 group-hover:scale-105 transition">
                <Briefcase className="w-6 h-6" />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded">
                  Modul 1
                </span>
                <span className="text-xs text-slate-500 font-medium">5 Kluster Kejuruan</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                Simulasi Wawancara Kerja
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Latihan tanya-jawab terpandu yang disesuaikan dengan program keahlian siswa. Evaluasi real-time berbasis kelengkapan struktur STAR dan penguasaan kata kunci teknis kejuruan.
              </p>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 mb-8">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Pertanyaan relevan dengan kurikulum SMK & kebutuhan rekruter industri nyata</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Evaluasi instan mencakup kekuatan jawaban, saran perbaikan, dan kata kunci</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Dukungan input teks & mikrofon suara untuk membiasakan artikulasi lisan</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Laporan evaluasi komprehensif yang dapat dicetak atau disalin untuk guru BK</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('interview')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition shadow-xs group-hover:shadow cursor-pointer"
            >
              <span>Mulai Latihan Wawancara</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>
          </div>

          {/* Card 2: Tes Buta Warna */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 hover:border-emerald-500 hover:shadow-lg transition duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-5 group-hover:scale-105 transition">
                <Eye className="w-6 h-6" />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded">
                  Modul 2
                </span>
                <span className="text-xs text-slate-500 font-medium">10 Plat Ishihara Standar</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                Latihan Tes Buta Warna
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Skrining persepsi warna mandiri sebelum siswa mendaftar kerja di bidang yang mewajibkan mata normal (teknik mesin, kelistrikan, otomotif, kimia, laboratorium, desain grafis).
              </p>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 mb-8">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>10 Plat pola warna Ishihara berbasis vektor SVG murni dan bebas lisensi</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Interaksi cepat menggunakan tombol keyboard (1–4) atau klik layar</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Interpretasi hasil langsung dengan rincian diagnostik butir soal</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Dilengkapi klausul disclaimer medis resmi demi transparansi dan integritas</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('colorblind')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition shadow-xs group-hover:shadow cursor-pointer"
            >
              <span>Mulai Tes Buta Warna</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>
          </div>
        </div>
      </section>

      {/* STAR Method Breakdown Section */}
      <section className="bg-slate-900 text-white py-14 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/80 px-3 py-1 rounded-full border border-blue-800/80">
              Metodologi Jawaban Rekruter
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-3 tracking-tight">
              Mengapa Menggunakan Metode STAR?
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
              Pewawancara industri mencari bukti tindakan nyata, bukan sekadar janji. Metode STAR membantu siswa menceritakan pengalaman praktik kerja secara terstruktur dan meyakinkan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700/80 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-lg">
                S
              </div>
              <h4 className="font-bold text-white text-base">Situation (Situasi)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Jelaskan latar belakang konteks, proyek sekolah, atau kendala spesifik yang dihadapi saat praktik bengkel/lab.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700/80 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-lg">
                T
              </div>
              <h4 className="font-bold text-white text-base">Task (Tugas)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Uraikan apa tanggung jawab pribadi Anda dalam situasi tersebut dan target capaian yang harus diselesaikan.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700/80 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-lg">
                A
              </div>
              <h4 className="font-bold text-white text-base">Action (Tindakan)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Sebutkan langkah teknis konkret, alat kerja yang digunakan, dan keputusan yang Anda ambil secara mandiri/tim.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700/80 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-amber-600 text-white flex items-center justify-center font-black text-lg">
                R
              </div>
              <h4 className="font-bold text-white text-base">Result (Hasil)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Paparkan dampak positif dari tindakan Anda: masalah terselesaikan, waktu efisien, atau pelajaran berharga yang dipetik.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Vocational Fields Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            5 Kluster Kejuruan Sesuai Kebutuhan DUDI
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Materi disusun mengacu pada deskripsi pekerjaan entry-level yang sering dibuka di Bursa Kerja Khusus (BKK).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-5 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-sm transition space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Teknik Kendaraan Ringan (Otomotif)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fokus pada diagnosis mesin, tune-up, sistem rem & EFI, serta standar K3 bengkel resmi.
            </p>
            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
              Target: Mekanik Bengkel, Teknisi Servis, Quality Control Perakitan
            </div>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-sm transition space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Network className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Teknik Komputer & Jaringan (TKJ)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mencakup troubleshooting kabel LAN/Fiber Optic, konfigurasi IP & Mikrotik, serta keamanan data.
            </p>
            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
              Target: IT Support, Teknisi Jaringan, Junior System Administrator
            </div>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-sm transition space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Tata Boga / Seni Kuliner</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Standar hygiene sanitasi dapur profesional, sistem FIFO, mise en place, dan kerja di bawah tekanan jam sibuk.
            </p>
            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
              Target: Commis Chef, Baker, Kitchen Crew Hotel & Restoran
            </div>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-sm transition space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Akuntansi & Keuangan Lembaga</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pencatatan jurnal umum, rekonsiliasi kas bank, ketelitian pembukuan, dan etika kerahasiaan keuangan.
            </p>
            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
              Target: Staf Administrasi, Junior Auditor, Kasir Operasional
            </div>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-sm transition space-y-3 sm:col-span-2 lg:col-span-2">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Wawancara Umum & Karakter Kerja</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pertanyaan umum HR seputar motivasi kerja, adaptasi budaya perusahaan, cara mengatasi rekan kerja toksik, serta rencana karier jangka panjang. Berlaku untuk seluruh rumpun kejuruan maupun SMA.
            </p>
            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
              Target: Semua posisi magang PKL dan rekrutmen kerja lulusan sekolah menengah
            </div>
          </div>
        </div>
      </section>

      {/* Target & Educational Impact */}
      <section className="bg-slate-100/80 border-y border-slate-200 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Manfaat Nyata bagi Ekosistem Sekolah
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Menjembatani keahlian praktikum siswa dengan kesiapan psikologis menghadapi tahapan seleksi kerja.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Bagi Siswa SMK/SMA</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Mengurangi rasa grogi dan gagap saat wawancara nyata. Melatih artikulasi jawaban yang padat, sopan, dan berbobot tanpa perlu menghafal secara kaku.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Bagi Guru BK & Tim BKK</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Instrumen siap pakai untuk bimbingan klasikal di laboratorium komputer. Siswa dapat langsung menyalin atau mencetak lembar evaluasi sebagai bahan konseling lanjutan.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center mb-4 font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Bebas Hambatan Akses</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Aplikasi langsung terbuka tanpa form pendaftaran yang merepotkan. Seluruh data diproses lokal di peramban sehingga aman untuk sekolah dan hemat kuota data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
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
              a: 'Bukan. Tes 10 plat Ishihara ini adalah sarana simulasi edukatif awal untuk membiasakan siswa mengenali pola plat warna. Untuk keperluan administrasi resmi ke instansi kerja, siswa tetap harus melakukan pemeriksaan di fasilitas kesehatan resmi bersama dokter spesialis mata.',
            },
          ].map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs"
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
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
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
