import React, { useState, useEffect } from 'react';
import { PageView } from '../types';
import { Briefcase, Home as HomeIcon, GraduationCap, History, Camera } from 'lucide-react';
import { getInterviewHistory } from '../lib/storage';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [historyCount, setHistoryCount] = useState<number>(0);

  // Update history count on render and when window focus/storage changes
  useEffect(() => {
    const updateCount = () => {
      const history = getInterviewHistory();
      setHistoryCount(history.length);
    };

    updateCount();
    window.addEventListener('storage', updateCount);
    window.addEventListener('focus', updateCount);
    return () => {
      window.removeEventListener('storage', updateCount);
      window.removeEventListener('focus', updateCount);
    };
  }, [currentPage]);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-amber-100/70 shadow-soft">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left group transition focus:outline-none cursor-pointer"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 text-white flex items-center justify-center font-bold shadow-warm-orange group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 text-lg tracking-tight group-hover:text-orange-600 transition-colors">
                JobReady
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-orange-100/80 text-orange-700 border border-orange-200/60">
                ✨ Ramah Siswa
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
              Simulasi Wawancara Kerja Interaktif Vokasi
            </p>
          </div>
        </button>

        {/* Navigation Links (Friendly Pills) */}
        <nav className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => onNavigate('home')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs sm:text-sm font-bold transition btn-bouncy cursor-pointer ${
              currentPage === 'home'
                ? 'bg-amber-100/90 text-amber-900 shadow-2xs border border-amber-200/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-amber-50/60'
            }`}
          >
            <HomeIcon className="w-4 h-4 text-amber-600" />
            <span className="hidden md:inline">Beranda</span>
          </button>

          <button
            onClick={() => onNavigate('interview')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition btn-bouncy cursor-pointer ${
              currentPage === 'interview'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-warm-orange'
                : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50/80'
            }`}
          >
            <Briefcase className="w-4 h-4 text-orange-500 group-hover:text-orange-600" />
            <span>Simulasi Wawancara</span>
            <span className="text-[10px] uppercase font-black px-1.5 py-0.2 rounded-full bg-orange-100 text-orange-800">
              Live
            </span>
          </button>

          <button
            onClick={() => onNavigate('mirror')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs sm:text-sm font-bold transition btn-bouncy cursor-pointer ${
              currentPage === 'mirror'
                ? 'bg-indigo-100 text-indigo-900 border border-indigo-200 shadow-2xs'
                : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/60'
            }`}
            title="Latihan tatap kamera 60 detik tanpa dinilai"
          >
            <Camera className="w-4 h-4 text-indigo-500" />
            <span className="hidden sm:inline">Mode Cermin</span>
            <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.2 rounded-full bg-indigo-50 text-indigo-700">
              60s
            </span>
          </button>

          <button
            onClick={() => onNavigate('history')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs sm:text-sm font-bold transition btn-bouncy cursor-pointer ${
              currentPage === 'history'
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-200 shadow-2xs'
                : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/60'
            }`}
          >
            <History className="w-4 h-4 text-emerald-600" />
            <span>Riwayat</span>
            {historyCount > 0 && (
              <span className="ml-0.5 px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500 text-white shadow-2xs">
                {historyCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};
