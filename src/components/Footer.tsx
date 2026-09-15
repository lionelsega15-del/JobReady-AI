import React from 'react';
import { ShieldCheck, BookOpen, GraduationCap, CheckCircle2, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-warm-orange">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-lg tracking-tight">JobReady</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Platform latihan mandiri wawancara kerja tatap muka kamera dan dialog audio interaktif untuk siswa SMK/SMA menuju dunia usaha dan industri (DUDI).
            </p>
            <div className="pt-1 flex items-center gap-2 text-[11px] text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
              <span>100% Bebas Biaya & Menjaga Privasi Siswa</span>
            </div>
          </div>

          {/* Modules Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase text-slate-200 tracking-wider mb-3.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              Kluster Kejuruan
            </h4>
            <ul className="text-xs text-slate-400 space-y-2">
              <li>Teknik Kendaraan Ringan (Otomotif)</li>
              <li>Teknik Komputer & Jaringan (TKJ)</li>
              <li>Tata Boga / Seni Kuliner</li>
              <li>Akuntansi & Keuangan Lembaga</li>
              <li>Wawancara HR & Kepribadian Umum</li>
              <li>Simulasi Video Call & Perekam Nyata</li>
            </ul>
          </div>

          {/* Methodology Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase text-slate-200 tracking-wider mb-3.5 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              Fitur Interaktif
            </h4>
            <ul className="text-xs text-slate-400 space-y-2">
              <li>Preview Kamera Tatap Muka Langsung</li>
              <li>Pewawancara AI Bersuara (Audio TTS)</li>
              <li>Respon Evaluasi Lisan Otomatis</li>
              <li>Metode STAR (Situation, Task, Action, Result)</li>
              <li>Rapor Evaluasi & Cetak PDF</li>
            </ul>
          </div>

          {/* Privacy & Disclaimer Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase text-slate-200 tracking-wider mb-3.5">
              Prinsip Privasi Siswa
            </h4>
            <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 text-[11px] text-slate-400 leading-relaxed space-y-2">
              <p>
                Seluruh pengolahan kamera video, suara mikrofon, dan transkripsi dijalankan 100% di browser lokal Anda. Tidak ada video atau rekaman audio yang dikirim ke server luar.
              </p>
              <p className="text-slate-500 text-[10px] pt-1 border-t border-slate-800">
                *Simulasi dirancang untuk pendampingan siswa dan Guru BK dalam persiapan rekrutmen kerja.
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
