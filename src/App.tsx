import React, { useState, useEffect } from 'react';
import { Video, Youtube, Palette, Mic, TrendingUp, Search, Menu, Zap, MessageSquare, Image, Share2, Globe, Sparkles } from 'lucide-react';
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

  // 20+ Tools List (Sab wapas add kar diye hain)
  const tools = [
    { id: 1, name: 'Auto-Viral Captions', desc: 'Modern, colorful subtitles auto-add honge.', Icon: Video },
    { id: 2, name: 'Pro Jump-Cut', desc: 'Video se boring silence mita dega.', Icon: Video },
    { id: 3, name: '1-Click Script Writer', desc: 'Viral video ka poora structure likhega.', Icon: Youtube },
    { id: 4, name: '4K Image Upscaler', desc: 'Purani photo ko HD kar dega.', Icon: Palette },
    { id: 5, name: 'Ultra-Human Voice', desc: 'AI voice jo bilkul insaan jaisi ho.', Icon: Mic },
    { id: 6, name: '30-Day Content Plan', desc: 'Agle ek mahine ka content calendar.', Icon: TrendingUp },
    { id: 7, name: 'AI Face Swap', desc: 'Video mein face replace karein asani se.', Icon: Sparkles },
    { id: 8, name: 'Smart B-Roll Finder', desc: 'Script ke hisaab se stock footage dhunde.', Icon: Search },
    { id: 9, name: 'Tweet to Video', desc: 'Tweets ko viral videos mein badlein.', Icon: Share2 },
    { id: 10, name: 'AI Podcast Editor', desc: 'Audio se noise saaf karke edit kare.', Icon: Mic },
    { id: 11, name: 'Title Generator', desc: 'High CTR wale titles generate kare.', Icon: MessageSquare },
    { id: 12, name: 'Thumbnail Background AI', desc: 'Background badlo 1 second mein.', Icon: Image },
    { id: 13, name: 'Global Subtitles', desc: 'Video ko kisi bhi language mein badlo.', Icon: Globe },
    { id: 14, name: 'Viral Hook Writer', desc: 'Video ki starting ko interesting banaye.', Icon: Sparkles },
    { id: 15, name: 'AI Color Grader', desc: 'Cinematic color grading ek click mein.', Icon: Palette },
    { id: 16, name: 'Shadow Remover', desc: 'Face se dark shadows hataye.', Icon: Video },
    { id: 17, name: 'Logo Animator', desc: 'Static logo ko motion mein laaye.', Icon: Zap },
    { id: 18, name: 'SEO Tag Extractor', desc: 'Competitors ke viral tags nikaale.', Icon: Youtube },
    { id: 19, name: 'AI Reel Maker', desc: 'Long video se short clips nikaale.', Icon: Video },
    { id: 20, name: 'Trend Predictor', desc: 'Next viral topic bataye.', Icon: TrendingUp },
  ];

  const filteredTools = tools.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-blue-500/30">
      
      {/* 1. NAVBAR - GitHub Logo + Cyan Text/Menu */}
      <nav className="border-b border-white/5 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-7 bg-[#1a1a2e] flex items-center justify-center rounded-md border border-white/10 overflow-hidden">
               <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#38bdf8]">ToolScout</span>
          </div>
          <div className="cursor-pointer p-1 group">
            <Menu className="text-[#38bdf8] w-8 h-8 stroke-[1.5] group-hover:opacity-70 transition-opacity" />
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative pt-20 pb-20 px-6 text-center">
        {/* Glow Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[700px] h-[350px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />

        {/* 2. HEADING (Spacing Fix: No Overlap) */}
        <div className="flex flex-col items-center justify-center space-y-8 md:space-y-12 mb-14">
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

        {/* 3. UPDATED BADGE (Positioned below Heading as per screenshot) */}
        <div className="inline-flex items-center gap-3 bg-[#0f0f0f] border border-white/5 px-6 py-3 rounded-full shadow-2xl backdrop-blur-md">
          <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee]"></div>
          <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-gray-400">
            The Ultimate AI Powerhouse for Creators
          </span>
        </div>

        {/* SEARCH BAR */}
        <div className="max-w-xl mx-auto mt-20 relative group px-4">
          <Search className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#38bdf8] transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search 20+ Pro Tools"
            className="w-full bg-[#0c0c0c] border border-white/5 py-5 pl-16 pr-8 rounded-2xl text-lg text-white focus:outline-none focus:border-blue-500/20 shadow-2xl transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {/* 4. GRID (20 Tools) */}

      
