import React, { useState, useEffect } from 'react';
import { PageView } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { InterviewPage } from './pages/Interview';
import { HistoryPage } from './pages/History';
import { MirrorPracticePage } from './pages/MirrorPractice';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');

  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-slate-800 font-sans selection:bg-amber-200 selection:text-amber-900">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="flex-1 flex flex-col">
        {currentPage === 'home' && <Home onNavigate={setCurrentPage} />}
        {currentPage === 'interview' && <InterviewPage onNavigate={setCurrentPage} />}
        {currentPage === 'history' && <HistoryPage onNavigate={setCurrentPage} />}
        {currentPage === 'mirror' && <MirrorPracticePage onNavigate={setCurrentPage} />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
