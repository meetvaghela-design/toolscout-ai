import React, { useState } from 'react';
import { Video, Youtube, Palette, Mic, TrendingUp, Search, ChevronRight, Zap } from 'lucide-react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

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
    <div className="min-h-screen bg-[#0f172a] text-slate-200 selection:bg-blue-500/30">
      {/* Glow Effect */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/10 blur-[120px] pointer-events-none" />

      {/* Navbar Style Header */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="bg-blue-600 p-1.5 rounded-lg"><Zap size={20} className="fill-white" /></div>
            TOOLSCOUT <span className="text-blue-500">AI</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white">Pricing</a>
            <a href="#" className="hover:text-white">API</a>
            <a href="#" className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition">Login</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-20 pb-16 px-6 text-center">
        <h1 className="text-6xl font-black mb-6 tracking-tight text-white">
          Level Up Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">Content Game</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
          20+ Pro-level AI tools designed for creators. Just search, click, and create.
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search for a tool (e.g. 'Viral')"
            className="w-full bg-slate-800/50 border border-slate-700 py-4 pl-12 pr-4 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all backdrop-blur-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {/* Categories */}
      <div className="flex justify-center gap-2 mb-12 flex-wrap px-4">
        {['All', 'Video', 'YouTube', 'Graphics', 'Audio', 'Growth'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${activeCategory === cat ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 border border-slate-700'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-6 pb-32 relative">
        {filteredTools.map((tool) => (
          <div key={tool.id} className="group bg-slate-800/30 border border-slate-800 p-6 rounded-3xl hover:bg-slate-800/50 hover:border-slate-600 transition-all duration-300 cursor-pointer flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-blue-400 mb-5 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                {tool.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{tool.name}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{tool.desc}</p>
            </div>
            <div className="mt-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-500">Launch Tool</span>
              <ChevronRight size={16} className="text-blue-500" />
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default App;
