import React, { useState, useEffect } from 'react';
import { Video, Youtube, Palette, Mic, TrendingUp, Search, Zap } from 'lucide-react';
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
      
      {/* 1. NAVBAR (Screenshot Wala Look) */}
      <nav className="border-b border-white/5 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo Box */}
            <div className="w-10 h-6 bg-[#1a1a2e] flex items-center justify-center rounded-sm border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
               <Zap className="text-white fill-white" size={12} />
            </div>
            {/* ToolScout Blue Text */}
            <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              ToolScout
            </span>
          </div>
          {/* 3-Dot/Line Menu */}
          <div className="flex flex-col gap-[4.5px] cursor-pointer group p-2">
            <div className="w-6 h-[2px] bg-gray-400 group-hover:bg-cyan-400 transition-colors"></div>
            <div className="w-6 h-[2px] bg-gray-400 group-hover:bg-cyan-400 transition-colors"></div>
            <div className="w-6 h-[2px] bg-gray-400 group-hover:bg-cyan-400 transition-colors"></div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative pt-20 pb-20 px-6 text-center">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[700px] h-[350px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />

        {/* 2. PILL BADGE (Ultimate AI Powerhouse) */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-12 shadow-2xl backdrop-blur-sm">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]"></div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400/80">
            The Ultimate AI Powerhouse for Creators
          </span>
        </div>

        {/* 3. HEADING (Spacing Fix taaki overlap na ho) */}
        <div className="flex flex-col items-center justify-center space-y-6 md:space-y-10">
          <h1 className="text-6xl md:text-[110px] font-black italic tracking-[-0.08em] leading-none text-white m-0 p-0">
            Find the
          </h1>

          <div className="text-4xl md:text-5xl font-medium text-white/30 lowercase tracking-[0.2em] italic leading-none m-0 p-0">
            perfect
          </div>
          
          {/* Dynamic Text Box with Fixed Height */}
          <div className="h-[70px] md:h-[120px] flex items-center justify-center relative m-0 p-0">
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
          <Search className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search 20+ Pro Tools"
            className="w-full bg-[#0c0c0c] border border-white/5 py-5 pl-16 pr-8 rounded-2xl text-lg text-white focus:outline-none focus:border-blue-500/20 shadow-2xl transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {/* GRID */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-40 mt-10">
        {filteredTools.map((tool, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className="bg-[#0A0A0A] border border-white/5 p-8 rounded-[2.5rem] hover:border-blue-500/40 transition-all duration-500 group"
          >
            <tool.Icon className="text-blue-500 mb-6 group-hover:scale-110 transition-transform duration-500" size={32} />
            <h3 className="text-xl font-bold mb-3 tracking-tight">{tool.name}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{tool.desc}</p>
          </motion.div>
        ))}
      </main>
    </div>
  );
};

// Netlify Fix: Default export zaroori hai
export default App;
    
