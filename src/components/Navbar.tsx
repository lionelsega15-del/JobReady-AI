import React, { useState, useEffect } from 'react';
import { PageView } from '../types';
import { Briefcase, Eye, Home as HomeIcon, GraduationCap, History } from 'lucide-react';
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left group transition focus:outline-none cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold shadow-sm group-hover:bg-blue-600 transition-colors">
            <GraduationCap className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 text-lg tracking-tight">JobReady</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                Kejuruan & Vokasi
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Simulasi Wawancara Kerja & Tes Fisik Ishihara
            </p>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => onNavigate('home')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition cursor-pointer ${
              currentPage === 'home'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <HomeIcon className="w-4 h-4" />
            <span className="hidden md:inline">Beranda</span>
          </button>

          <button
            onClick={() => onNavigate('interview')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition cursor-pointer ${
              currentPage === 'interview'
                ? 'bg-blue-50 text-blue-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Briefcase className="w-4 h-4 text-blue-600" />
            <span>Simulasi Wawancara</span>
          </button>

          <button
            onClick={() => onNavigate('history')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition cursor-pointer ${
              currentPage === 'history'
                ? 'bg-indigo-50 text-indigo-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <History className="w-4 h-4 text-indigo-600" />
            <span>Riwayat</span>
            {historyCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700">
                {historyCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onNavigate('colorblind')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition cursor-pointer ${
              currentPage === 'colorblind'
                ? 'bg-emerald-50 text-emerald-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Eye className="w-4 h-4 text-emerald-600" />
            <span>Tes Buta Warna</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
