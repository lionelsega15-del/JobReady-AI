import React from 'react';
import { ShieldCheck, BookOpen, GraduationCap, CheckCircle2, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-850 mt-auto pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-lg tracking-tight">JobReady</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Platform latihan mandiri wawancara kerja dan asesmen visual persepsi warna untuk siswa SMK/SMA menuju dunia usaha dan industri (DUDI).
            </p>
            <div className="pt-1 flex items-center gap-2 text-[11px] text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>100% Gratis & Privasi Terjaga</span>
            </div>
          </div>

          {/* Modules Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase text-slate-200 tracking-wider mb-3.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              Modul Latihan
            </h4>
            <ul className="text-xs text-slate-400 space-y-2">
              <li>Teknik Kendaraan Ringan (Otomotif)</li>
              <li>Teknik Komputer & Jaringan (TKJ)</li>
              <li>Tata Boga / Seni Kuliner</li>
              <li>Akuntansi & Keuangan Lembaga</li>
              <li>Wawancara HR / Kepribadian Umum</li>
              <li>Skrining Ishihara 10 Plat SVG</li>
            </ul>
          </div>

          {/* Methodology Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase text-slate-200 tracking-wider mb-3.5 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              Pendekatan & Standar
            </h4>
            <ul className="text-xs text-slate-400 space-y-2">
              <li>Metode STAR (Situation, Task, Action, Result)</li>
              <li>Standar Kompetensi Kerja Kejuruan</li>
              <li>Analisis Terminologi & Kata Kunci Teknis</li>
              <li>Dukungan Praktik Suara (Speech-to-Text)</li>
              <li>Pedoman Konseling BKK & Guru BK</li>
            </ul>
          </div>

          {/* Privacy & Disclaimer Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase text-slate-200 tracking-wider mb-3.5">
              Prinsip Privasi Siswa
            </h4>
            <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 text-[11px] text-slate-400 leading-relaxed space-y-2">
              <p>
                Seluruh pengolahan jawaban dan suara dilakukan langsung di browser Anda. Tidak ada data pribadi atau rekaman yang disimpan di server eksternal.
              </p>
              <p className="text-slate-500 text-[10px] pt-1 border-t border-slate-800">
                *Tes buta warna adalah simulasi latihan awal, bukan surat keterangan medis resmi faskes.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <p>© {new Date().getFullYear()} JobReady — Platform Kesiapan Kerja Siswa Kejuruan Indonesia.</p>
          <div className="flex items-center gap-1.5 text-slate-300 text-[11px]">
            <span>Mendukung pendidikan vokasi berkarakter dan berdaya saing</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
