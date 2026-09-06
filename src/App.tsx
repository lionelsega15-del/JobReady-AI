import React, { useState, useEffect } from 'react';
import { PageView } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { InterviewPage } from './pages/Interview';
import { ColorblindTestPage } from './pages/ColorblindTest';
import { HistoryPage } from './pages/History';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');

  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="flex-1 flex flex-col">
        {currentPage === 'home' && <Home onNavigate={setCurrentPage} />}
        {currentPage === 'interview' && <InterviewPage onNavigate={setCurrentPage} />}
        {currentPage === 'history' && <HistoryPage onNavigate={setCurrentPage} />}
        {currentPage === 'colorblind' && <ColorblindTestPage onNavigate={setCurrentPage} />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
