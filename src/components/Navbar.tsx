import React from 'react';
import { PageView } from '../types';
import { Briefcase, Eye, Home as HomeIcon, GraduationCap } from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left group transition focus:outline-none"
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
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
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
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
              currentPage === 'interview'
                ? 'bg-blue-50 text-blue-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Briefcase className="w-4 h-4 text-blue-600" />
            <span>Simulasi Wawancara</span>
          </button>

          <button
            onClick={() => onNavigate('colorblind')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
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
