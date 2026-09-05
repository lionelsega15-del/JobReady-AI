import React from 'react';
import { PageView } from '../types';
import { Briefcase, Eye, Home as HomeIcon, GraduationCap } from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left group transition"
        >
          <div className="w-10 h-10 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold shadow-sm group-hover:bg-blue-800 transition">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-lg tracking-tight">JobReady AI</span>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800 tracking-wider">
                LIDM VII 2026
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Simulasi Wawancara & Tes Kesiapan Kerja SMK/SMA
            </p>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => onNavigate('home')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition ${
              currentPage === 'home'
                ? 'bg-slate-100 text-blue-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <HomeIcon className="w-4 h-4" />
            <span className="hidden md:inline">Beranda</span>
          </button>

          <button
            onClick={() => onNavigate('interview')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition ${
              currentPage === 'interview'
                ? 'bg-blue-50 text-blue-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Simulasi Wawancara</span>
          </button>

          <button
            onClick={() => onNavigate('colorblind')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition ${
              currentPage === 'colorblind'
                ? 'bg-emerald-50 text-emerald-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Tes Buta Warna</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
