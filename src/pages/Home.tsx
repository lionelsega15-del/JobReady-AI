import React from 'react';
import { PageView } from '../types';
import { 
  Briefcase, Eye, ArrowRight, CheckCircle, ShieldCheck, 
  Sparkles, Users, BookOpen, Award, Target, Laptop
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: PageView) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-10">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Karya Inovasi Teknologi Digital Pendidikan — LIDM VII 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
            Kuasai Wawancara & Tes Kesiapan Kerja Sebelum Masuk Dunia Industri
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Platform latihan mandiri berbasis web untuk siswa SMK/SMA dan alat bantu Bimbingan Konseling (BK) / Bursa Kerja Khusus (BKK). Dirancang ringan, interaktif, dan tanpa hambatan teknis.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => onNavigate('interview')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base transition shadow-md shadow-blue-600/20 active:scale-[0.99]"
            >
              <Briefcase className="w-5 h-5" />
              <span>Simulasi Wawancara Kerja</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('colorblind')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm sm:text-base transition shadow-md active:scale-[0.99]"
            >
              <Eye className="w-5 h-5 text-emerald-400" />
              <span>Latihan Tes Buta Warna</span>
            </button>
          </div>
        </div>
      </section>

      {/* Two Main Feature Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Dua Modul Inti Kesiapan Kerja
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Dua modul mandiri terfokus untuk mengasah soft skill komunikasi dan kesiapan syarat administratif.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Card 1: Simulasi Wawancara */}
          <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 sm:p-8 hover:border-blue-500 hover:shadow-lg transition duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-5 group-hover:scale-105 transition">
                <Briefcase className="w-6 h-6" />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded">
                  Modul 1
                </span>
                <span className="text-xs text-slate-500 font-medium">Multi-Bidang Kejuruan</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                Simulasi Wawancara Kerja
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Latihan tanya jawab terpandu yang disesuaikan dengan jurusan siswa (Otomotif, TKJ, Tata Boga, Akuntansi, dan Umum). Dilengkapi mesin evaluasi rule-based otomatis per butir jawaban.
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Pertanyaan berbasis kurikulum SMK & standar kompetensi industri</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Umpan balik instan (kekuatan jawaban, saran perbaikan, kata kunci relevan)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Dukungan input teks dan mikrofon suara (Speech-to-Text)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Ringkasan laporan komprehensif yang dapat disalin untuk bahan refleksi</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('interview')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition shadow-sm group-hover:shadow"
            >
              <span>Mulai Latihan Wawancara</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>
          </div>

          {/* Card 2: Tes Buta Warna */}
          <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 sm:p-8 hover:border-emerald-500 hover:shadow-lg transition duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5 group-hover:scale-105 transition">
                <Eye className="w-6 h-6" />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded">
                  Modul 2
                </span>
                <span className="text-xs text-slate-500 font-medium">10 Plat Ishihara Prosedural</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                Latihan Tes Buta Warna
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Simulasi skrining persepsi warna mandiri sebelum siswa mendaftar ke bidang kerja yang mensyaratkan kesehatan mata prima (teknik, kelistrikan, otomotif, penerbangan, desain).
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Plat pola warna bergaya Ishihara 100% SVG mandiri (bebas hak cipta)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Navigasi angka responsif dengan dukungan tombol keyboard (1–4)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Interpretasi hasil langsung beserta rincian diagnostik per butir plat</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Dilengkapi klausul disclaimer medis resmi demi kepatuhan integritas</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('colorblind')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition shadow-sm group-hover:shadow"
            >
              <span>Mulai Tes Buta Warna</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>
          </div>
        </div>
      </section>

      {/* Target & Pedagogical Impact Section */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Dirancang untuk Ekosistem Pendidikan Berdampak
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Menjawab tantangan nyata antara kompetensi teknis di sekolah kejuruan dengan kesiapan proses rekrutmen kerja nyata.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Bagi Siswa SMK/SMA</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Membangun kepercayaan diri sebelum wawancara PKL atau seleksi kerja. Membiasakan diri menjawab dengan metode STAR tanpa rasa cemas.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Bagi Guru BK & BKK</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Solusi praktis untuk kegiatan bimbingan karier klasikal di laboratorium komputer. Tidak membutuhkan instalasi server atau biaya langganan.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-4 font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Keamanan & Kecepatan</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Arsitektur native Single Page Application (SPA). Semua data jawaban diproses di browser lokal tanpa mengirim data pribadi ke server manapun.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* User Journey / Cara Menggunakan */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-8">
          Alur Penggunaan yang Mudah & Cepat (3 Langkah)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs mb-3">
              1
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Pilih Modul</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Tentukan modul latihan: simulasi tanya-jawab kejuruan atau uji buta warna Ishihara.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs mb-3">
              2
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Jawab Pertanyaan</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Jawab pertanyaan satu per satu secara mandiri dengan tenang dan terstruktur.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs mb-3">
              3
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Evaluasi & Refleksi</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Dapatkan skor objektif, catatan evaluasi, serta rekomendasi untuk pembenahan diri.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
