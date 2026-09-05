import React from 'react';
import { ShieldCheck, Sparkles, BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold">
                JR
              </div>
              <span className="font-bold text-white text-lg">JobReady AI</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Platform Simulasi Wawancara dan Tes Kesiapan Kerja Berbasis AI untuk Mendukung Bimbingan Karier Siswa SMK/SMA.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase text-white tracking-wider mb-3 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-400" />
              Konteks Karya ITDP
            </h4>
            <ul className="text-sm text-slate-400 space-y-1.5">
              <li>LIDM VII / 2026</li>
              <li>Cabang: Inovasi Teknologi Digital Pendidikan</li>
              <li>Lingkup: Mikro (Pembelajaran Mandiri & BKK)</li>
              <li>Sifat: Client-Side Native SPA (Tanpa Database Luar)</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase text-white tracking-wider mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Pernyataan Integritas & Edukasi
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed bg-slate-800/80 p-3 rounded border border-slate-700">
              Platform ini dikembangkan khusus sebagai media latihan mandiri dan simulasi bimbingan karier di sekolah. 
              Feedback wawancara menggunakan mesin rule-based edukatif dan tes buta warna bukanlah pengganti diagnosis medis resmi faskes.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© 2026 Tim JobReady AI — Dikembangkan untuk Seleksi LIDM VII.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Mendukung Ekosistem Pendidikan Berintegritas & Berdampak</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
