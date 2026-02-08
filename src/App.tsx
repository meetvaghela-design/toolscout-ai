import React, { useState, useEffect } from 'react';
import { Video, Youtube, Palette, Mic, TrendingUp, Search, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [index, setIndex] = useState(0);

  const words = ["AI Script Writer", "AI Video Editor", "SEO Expert", "Thumbnail Designer"];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const tools = [
    { id: 1, name: 'Auto-Viral Captions', desc: 'Modern, colorful subtitles auto-add honge.', Icon: Video },
    { id: 2, name: 'Pro Jump-Cut', desc: 'Video se boring silence mita dega.', Icon: Video },
    { id: 3, name: '1-Click Script Writer', desc: 'Viral video ka poora structure likhega.', Icon: Youtube },
    { id: 4, name: '4K Image Upscaler', desc: 'Purani photo ko HD kar dega.', Icon: Palette },
    { id: 5, name: 'Ultra-Human Voice', desc: 'AI voice jo bilkul insaan jaisi ho.', Icon: Mic },
    { id: 6, name: '30-Day Content Plan', desc: 'Agle ek mahine ka content calendar.', Icon: TrendingUp },
  ];

  const filteredTools = tools.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-blue-500/30">
      
      {/* 1. NAVBAR - Fixed with GitHub Logo & Cyan Menu */}
      <nav className="border-b border-white/5 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo from your Public Folder */}
            <div className="w-10 h-7 bg-[#1a1a2e] flex items-center justify-center rounded-md border border-white/10 overflow-hidden">
               <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            {/* ToolScout Blue Text */}
            <span className="text-2xl font-bold tracking-tight text-[#38bdf8]">
              ToolScout
            </span>
          </div>
          {/* Cyan Menu Icon */}
          <div className="cursor-pointer p-1">
            <Menu className="text-[#38bdf8] w-8 h-8 stroke-[1.5]" />
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative pt-20 pb-20 px-6 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[700px] h-[350px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />

        {/* 2. UPDATED BADGE (White/Grey Circle Design) */}
        <div className="inline-flex items-center gap-3 bg-[#111111] border border-white/5 px-5 py-2.5 rounded-full mb-12 shadow-xl">
          <div className="w-2.5 h-2.5 bg-[#38bdf8] rounded-full shadow-[0_0_12px_#38bdf8]"></div>
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-gray-300">
            The Ultimate AI Powerhouse for Creators
          </span>
        </div>

        {/* 3. HEADING (Final Spacing & No Overlap) */}
        <div className="flex flex-col items-center justify-center space-y-8 md:space-y-12">
          <h1 className="text-6xl md:text-[110px] font-black italic tracking-[-0.08em] leading-none text-white">
            Find the
          </h1>

          <div className="text-4xl md:text-5xl font-medium text-white/30 lowercase tracking-[0.2em] italic leading-none">
            perfect
          </div>
          
          <div className="h-[80px] md:h-[130px] flex items-center justify-center relative">
            <AnimatePresence mode="wait">
              <motion.span
                key={words[index]}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-5xl md:text-[110px] font-black bg-clip-text text-transparent bg-gradient-to-b from-white via-blue-500 to-blue-800 tracking-[-0.08em] leading-none drop-shadow-[0_15px_40px_rgba(59,130,246,0.3)]"
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="max-w-xl mx-auto mt-28 relative group px-4">
          <Search className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#38bdf8] transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search 20+ Pro Tools"
            className="w-full bg-[#0c0c0c] border border-white/5 py-5 pl-16 pr-8 rounded-2xl text-lg text-white focus:outline-none focus:border-blue-500/20 shadow-2xl transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {/* GRID */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-40">
        {filteredTools.map((tool, i) => (
          <div key={i} className="bg-[#0A0A0A] border border-white/5 p-8 rounded-[2.5rem] hover:border-blue-500/40 transition-all duration-500 group">
            <tool.Icon className="text-blue-500 mb-6 group-hover:scale-110 transition-transform duration-500" size={32} />
            <h3 className="text-xl font-bold mb-3 tracking-tight">{tool.name}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{tool.desc}</p>
          </div>
        ))}
      </main>
    </div>
  );
};

// NETLIFY FIX
export default App;
          
