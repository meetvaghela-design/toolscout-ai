import React, { useState, useEffect } from 'react';
import { Video, Youtube, Palette, Mic, TrendingUp, Search, Zap, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [index, setIndex] = useState(0);

  const words = ["AI Script Writer", "AI Video Editor", "SEO Expert", "Thumbnail Designer"];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const tools = [
    { id: 1, cat: 'Video', name: 'Auto-Viral Captions', desc: 'Modern, colorful subtitles auto-add honge.', Icon: Video },
    { id: 2, cat: 'Video', name: 'Pro Jump-Cut', desc: 'Video se boring silence mita dega.', Icon: Video },
    { id: 5, cat: 'YouTube', name: '1-Click Script Writer', desc: 'Viral video ka poora structure likhega.', Icon: Youtube },
    { id: 9, cat: 'Graphics', name: '4K Image Upscaler', desc: 'Purani photo ko HD kar dega.', Icon: Palette },
    { id: 13, cat: 'Audio', name: 'Ultra-Human Voice', desc: 'AI voice jo bilkul insaan jaisi ho.', Icon: Mic },
    { id: 16, cat: 'Growth', name: '30-Day Content Plan', desc: 'Agle ek mahine ka content calendar.', Icon: TrendingUp },
  ];

  const filteredTools = tools.filter(t => 
    (activeCategory === 'All' || t.cat === activeCategory) &&
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-blue-500/30">
      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-black text-2xl italic tracking-tighter">
            <Zap className="text-blue-500 fill-blue-500" size={24} /> TOOLSCOUT
          </div>
        </div>
      </nav>

      <header className="relative pt-32 pb-20 px-6 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[700px] h-[350px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />

        <h1 className="flex flex-col items-center justify-center text-center">
          <span className="text-6xl md:text-[110px] font-black italic tracking-[-0.08em] leading-[0.8] text-white">
            Find the
          </span>

          <span className="text-xl md:text-2xl font-light text-gray-500 lowercase tracking-[0.3em] my-10 italic">
            perfect
          </span>
          
          <div className="h-[1.2em] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={words[index]}
                initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -30, filter: "blur(12px)" }}
                transition={{ duration: 0.6, ease: "circOut" }}
                className="text-6xl md:text-[110px] font-black bg-clip-text text-transparent bg-gradient-to-b from-white via-blue-500 to-blue-800 tracking-[-0.08em] leading-none drop-shadow-[0_15px_40px_rgba(59,130,246,0.3)]"
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </h1>

        <div className="max-w-xl mx-auto mt-24 relative group px-4">
          <Search className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-600" size={20} />
          <input 
            type="text" 
            placeholder="Search 20+ Pro Tools"
            className="w-full bg-[#0c0c0c] border border-white/5 py-5 pl-16 pr-8 rounded-2xl text-lg text-white focus:outline-none focus:border-white/10 shadow-2xl transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-40 mt-10">
        {filteredTools.map((tool) => (
          <div key={tool.id} className="bg-[#0A0A0A] border border-white/5 p-8 rounded-[2.5rem] hover:border-blue-500/40 transition-all duration-500 group">
            <tool.Icon className="text-blue-500 mb-6 group-hover:scale-110 transition-transform duration-500" size={32} />
            <h3 className="text-xl font-bold mb-3 tracking-tight">{tool.name}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{tool.desc}</p>
          </div>
        ))}
      </main>
    </div>
  );
};

// YAHI MISSING THA BHAI!
export default App;
