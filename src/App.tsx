import React, { useState, useEffect } from 'react';
import { Video, Youtube, Palette, Mic, TrendingUp, Search, Zap, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'; // Animation ke liye

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [index, setIndex] = useState(0);

  // Video jaisa badalne wala text
  const words = ["AI Script Writer", "AI Video Editor", "SEO Expert", "Thumbnail Designer", "Content Planner"];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500); // 2.5 seconds mein change hoga
    return () => clearInterval(timer);
  }, []);

  const tools = [
    { id: 1, cat: 'Video', name: 'Auto-Viral Captions', desc: 'Modern, colorful subtitles auto-add honge.', icon: <Video /> },
    { id: 2, cat: 'Video', name: 'Pro Jump-Cut', desc: 'Video se boring silence mita dega.', icon: <Video /> },
    { id: 3, cat: 'Video', name: 'Hook Master', desc: 'Video ke shuruat mein visual hook dalega.', icon: <Video /> },
    { id: 4, cat: 'Video', name: 'Cinematic Color Fix', desc: 'Raw video ko iPhone jaisi grading dega.', icon: <Video /> },
    { id: 5, cat: 'YouTube', name: '1-Click Script Writer', desc: 'Viral video ka poora structure likhega.', icon: <Youtube /> },
    { id: 6, cat: 'YouTube', name: 'Thumbnail Concept AI', desc: 'Pro ideas aur prompts bana ke dega.', icon: <Youtube /> },
    { id: 7, cat: 'YouTube', name: 'SEO Deep-Rank', desc: 'Tags jo video ko search mein layein.', icon: <Youtube /> },
    { id: 8, cat: 'YouTube', name: 'Title A/B Genius', desc: '5 titles jo click layein hi layein.', icon: <Youtube /> },
    { id: 9, cat: 'Graphics', name: '4K Image Upscaler', desc: 'Purani photo ko HD kar dega.', icon: <Palette /> },
    { id: 10, cat: 'Graphics', name: 'BG Magic Remover', desc: 'Studio quality background removal.', icon: <Palette /> },
    { id: 11, cat: 'Graphics', name: 'Social Media Kit', desc: 'DP, Banner aur Post ka design.', icon: <Palette /> },
    { id: 12, cat: 'Graphics', name: 'Text-to-Icon', desc: 'Brand ke liye custom icons.', icon: <Palette /> },
    { id: 13, cat: 'Audio', name: 'Ultra-Human Voice', desc: 'AI voice jo bilkul insaan jaisi ho.', icon: <Mic /> },
    { id: 14, cat: 'Audio', name: 'Podcast Clean-Up', desc: 'Shor mita kar studio voice dega.', icon: <Mic /> },
    { id: 15, cat: 'Audio', name: 'Music Sync', desc: 'Mood ke hisaab se BGM set karega.', icon: <Mic /> },
    { id: 16, cat: 'Growth', name: '30-Day Content Plan', desc: 'Agle ek mahine ka content calendar.', icon: <TrendingUp /> },
    { id: 17, cat: 'Growth', name: 'Viral Tweet/Post', desc: 'Twitter ke liye viral content ideas.', icon: <TrendingUp /> },
    { id: 18, cat: 'Growth', name: 'Script Translator', desc: 'Hindi to English pro translation.', icon: <TrendingUp /> },
    { id: 19, cat: 'Growth', name: 'Ad Copy Pro', desc: 'Convert hone wali FB/Insta ads.', icon: <TrendingUp /> },
    { id: 20, cat: 'Growth', name: 'Video Summarizer', desc: 'Lambi video ko 60s reel mein badle.', icon: <TrendingUp /> },
  ];

  const filteredTools = tools.filter(t => 
    (activeCategory === 'All' || t.cat === activeCategory) &&
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 font-sans">
      
      {/* Navigation */}
      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-black text-2xl tracking-tighter italic">
            <Zap className="text-blue-500 fill-blue-500" size={24} />
            TOOLSCOUT
          </div>
          <div className="hidden md:flex gap-8 text-[12px] uppercase tracking-widest font-bold text-gray-400">
            <a href="#" className="hover:text-blue-500 transition">Tools</a>
            <a href="#" className="hover:text-blue-500 transition">Pricing</a>
            <button className="bg-white text-black px-5 py-2 rounded-full text-xs hover:bg-blue-500 hover:text-white transition">Get Started</button>
          </div>
        </div>
      </nav>

      {/* Hero Section - VIDEO STYLE */}
      <header className="relative pt-28 pb-20 px-6 text-center overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/20 blur-[120px] rounded-full -z-10" />

        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-10">
          <span className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-400">
            The Ultimate AI Powerhouse for Creators
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[1.1]">
          <span className="italic block mb-2">Find the</span>
          <span className="block mb-4 text-gray-300/50">perfect</span>
          
          {/* Animated Text Part */}
          <div className="h-[100px] flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={words[index]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-500 drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]"
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </h1>

        {/* Search Bar - Video Style */}
        <div className="max-w-2xl mx-auto mt-16 relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={24} />
          <input 
            type="text" 
            placeholder="Search 20+ Pro Tools"
            className="w-full bg-[#111] border border-white/5 py-6 pl-16 pr-8 rounded-2xl text-xl focus:outline-none focus:border-white/20 transition-all shadow-2xl"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {/* Filter Chips */}
      <div className="flex justify-center gap-3 mb-16 flex-wrap px-4">
        {['All', 'Video', 'YouTube', 'Graphics', 'Audio', 'Growth'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full text-[13px] font-bold transition-all border ${activeCategory === cat ? 'bg-blue-600 border-blue-600 text-white' : 'bg-transparent border-white/10 text-gray-500 hover:border-white/30'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tool Cards Grid */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 pb-40">
        {filteredTools.map((tool) => (
          <motion.div 
            layout
            key={tool.id} 
            className="group bg-[#0A0A0A] border border-white/5 p-8 rounded-[2rem] hover:bg-[#111] hover:border-blue-500/50 transition-all duration-500 cursor-pointer relative overflow-hidden"
          >
            <div className="text-blue-500 mb-6 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-500">
              {React.cloneElement(tool.icon as React.ReactElement, { size: 32 })}
            </div>
            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{tool.name}</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">{tool.desc}</p>
            <div className="flex items-center text-[11px] font-black uppercase tracking-widest text-blue-500 opacity-0 group-hover:opacity-100 transition-all">
              Launch Tool <ChevronRight size={14} className="ml-1" />
            </div>
          </motion.div>
        ))}
      </main>
    </div>
  );
};

export default App;
