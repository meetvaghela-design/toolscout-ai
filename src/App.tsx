import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Video, FileText, Image as ImageIcon, Mic, BarChart3, Menu, Zap, ArrowRight } from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [displayText, setDisplayText] = useState('AI Video Editor');

  // Rotating Text Logic
  const words = ['AI Video Editor', 'AI Script Writer', 'AI SEO Expert', 'AI Voice Artist', 'AI Thumbnail Designer'];
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % words.length;
      setDisplayText(words[i]);
    }, 3000); // Har 3 second mein badlega
    return () => clearInterval(interval);
  }, []);

  // Hamare Pro 20 Tools (Sample list, aap isse badha sakte ho)
  const proTools = [
    { id: 1, name: 'Auto-Viral Captions', desc: 'Add influencer-style subtitles automatically.', category: 'Video', icon: <Video className="text-blue-500" /> },
    { id: 2, name: '1-Click Script Writer', desc: 'Viral scripts for YouTube, Reels & Ads.', category: 'Text', icon: <FileText className="text-purple-500" /> },
    { id: 3, name: '4K Image Upscaler', desc: 'Convert low-res photos to ultra-HD quality.', category: 'Image', icon: <ImageIcon className="text-green-500" /> },
    { id: 4, name: 'Ultra-Human Voice', desc: 'Hyper-realistic AI voiceovers in any language.', category: 'Audio', icon: <Mic className="text-orange-500" /> },
    { id: 5, name: 'SEO Deep-Rank', desc: 'Generate high-ranking tags & descriptions.', category: 'SEO', icon: <BarChart3 className="text-red-500" /> },
    { id: 6, name: 'Pro Jump-Cut', desc: 'Remove silence & boring parts from videos.', category: 'Video', icon: <Zap className="text-yellow-500" /> },
    { id: 7, name: 'Thumbnail Genius', desc: 'AI-generated thumbnail concepts that get clicks.', category: 'Image', icon: <ImageIcon className="text-blue-400" /> },
    { id: 8, name: 'Ad Copy Pro', desc: 'High-converting ad copies for FB & Instagram.', category: 'Text', icon: <FileText className="text-green-400" /> },
  ];

  const categories = ['All', 'Video', 'Text', 'Image', 'Audio', 'SEO'];

  const filteredTools = proTools.filter(tool => {
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Navbar */}
      <nav className="p-5 border-b border-white/5 flex justify-between items-center sticky top-0 bg-black/80 backdrop-blur-xl z-50">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-900/40">
            <Zap size={18} fill="white" />
          </div>
          <span className="text-xl font-black tracking-tighter italic">TOOLSCOUT</span>
        </div>
        <Menu className="text-gray-400" />
      </nav>

      {/* Hero Section */}
      <div className="pt-20 pb-10 px-6 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8 animate-pulse">
          <Sparkles size={14} className="text-blue-400" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">The Ultimate AI Powerhouse for Creators</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-tight italic">
          Find the perfect <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent transition-all duration-1000">
            {displayText}
          </span>
        </h1>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mt-12">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input 
            type="text"
            placeholder="Search 20+ Pro Tools..."
            className="w-full bg-[#111] border border-white/5 rounded-[24px] py-6 px-16 focus:outline-none focus:border-blue-600/50 transition-all text-lg shadow-2xl"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all border ${
                selectedCategory === cat 
                ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-900/40 translate-y-[-2px]' 
                : 'bg-white/5 border-white/10 text-gray-500 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-32 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTools.map(tool => (
            <div 
              key={tool.id}
              className="group bg-neutral-900/20 border border-white/5 rounded-[40px] p-10 hover:bg-neutral-900/50 hover:border-blue-500/30 transition-all duration-500 cursor-pointer"
            >
              <div className="mb-8 flex justify-between items-start">
                <div className="p-5 bg-black rounded-3xl border border-white/5 group-hover:border-blue-500/50 transition-all">
                  {tool.icon}
                </div>
                <div className="bg-white/5 px-4 py-1.5 rounded-full border border-white/10 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                  {tool.category}
                </div>
              </div>
              <h3 className="text-2xl font-black mb-3 italic tracking-tight">{tool.name}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 font-medium">{tool.desc}</p>
              
              <div className="flex items-center gap-3 text-[11px] font-black text-blue-500 uppercase tracking-widest group-hover:gap-5 transition-all">
                Launch Workspace <ArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
