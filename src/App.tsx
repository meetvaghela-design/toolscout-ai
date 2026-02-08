import React, { useState, useEffect, useMemo } from 'react';
import { Search, Sparkles, Video, FileText, Image as ImageIcon, Mic, BarChart3, Menu, Zap, ArrowRight, X, ArrowLeft, Upload, Settings, Info, Mail } from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTool, setActiveTool] = useState(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [aiResult, setAiResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const words = ['Video Editor', 'Script Writer', 'SEO Expert', 'Voice Artist', 'Thumbnail Designer'];
  
  useEffect(() => {
    if (!activeTool) {
      const interval = setInterval(() => {
        setWordIndex((prev) => (prev + 1) % words.length);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [activeTool]);

  const proTools = [
    { id: 'captions', name: 'Auto-Viral Captions', desc: 'Add influencer-style subtitles automatically.', category: 'Video', icon: <Video className="text-blue-500" /> },
    { id: 'script', name: '1-Click Script Writer', desc: 'Viral scripts for YouTube, Reels & Ads.', category: 'Text', icon: <FileText className="text-purple-500" /> },
    { id: 'upscale', name: '4K Image Upscaler', desc: 'Convert low-res photos to ultra-HD quality.', category: 'Image', icon: <ImageIcon className="text-green-500" /> },
    { id: 'voice', name: 'Ultra-Human Voice', desc: 'Hyper-realistic AI voiceovers in any language.', category: 'Audio', icon: <Mic className="text-orange-500" /> },
    { id: 'seo', name: 'SEO Deep-Rank', desc: 'Generate high-ranking tags & descriptions.', category: 'SEO', icon: <BarChart3 className="text-red-500" /> },
    { id: 'jumpcut', name: 'Pro Jump-Cut', desc: 'Remove silence & boring parts from videos.', category: 'Video', icon: <Zap className="text-yellow-500" /> },
    { id: 'thumbnail', name: 'Thumbnail AI', desc: 'Generate high-CTR thumbnails in seconds.', category: 'Image', icon: <ImageIcon className="text-pink-500" /> },
    { id: 'repurpose', name: 'Video Repurpose', desc: 'Turn 1 YouTube video into 10 Reels/Shorts.', category: 'Video', icon: <Video className="text-cyan-500" /> },
    { id: 'bg-remove', name: 'Magic BG Remover', desc: 'Remove video background with 100% precision.', category: 'Video', icon: <Video className="text-indigo-500" /> },
    { id: 'hook-gen', name: 'Viral Hook Generator', desc: 'Get 5 hooks that stop the scroll.', category: 'Text', icon: <FileText className="text-rose-500" /> },
    { id: 'color-grade', name: 'AI Color Grade', desc: 'Apply cinematic LUTs to your footage.', category: 'Video', icon: <Video className="text-emerald-500" /> },
    { id: 'noise-cancel', name: 'Crystal Clear Audio', desc: 'Remove background noise from recordings.', category: 'Audio', icon: <Mic className="text-sky-500" /> },
    { id: 'hashtags', name: 'Smart Hashtags', desc: 'Trending tags for TikTok, Insta & YT.', category: 'SEO', icon: <BarChart3 className="text-fuchsia-500" /> },
    { id: 'ad-copy', name: 'High-Convert Ad Copy', desc: 'Copy that sells your products instantly.', category: 'Text', icon: <FileText className="text-amber-500" /> },
    { id: 'translate', name: 'Global Dubber', desc: 'Translate your video into 20+ languages.', category: 'Video', icon: <Video className="text-violet-500" /> },
    { id: 'meme', name: 'Meme Generator', desc: 'Convert any idea into a viral meme.', category: 'Image', icon: <ImageIcon className="text-lime-500" /> },
    { id: 'outro', name: 'Pro Outro Maker', desc: 'End your videos like a pro YouTuber.', category: 'Video', icon: <Video className="text-blue-400" /> },
    { id: 'face-swap', name: 'AI Face Swap', desc: 'Swap faces in videos with high realism.', category: 'Video', icon: <Zap className="text-purple-400" /> },
    { id: 'content-plan', name: '30-Day Planner', desc: 'A complete month of content ideas.', category: 'Text', icon: <FileText className="text-orange-400" /> },
    { id: 'logo-gen', name: 'Brand Logo AI', desc: 'Instant premium logos for your brand.', category: 'Image', icon: <ImageIcon className="text-pink-400" /> }
  ];

  const categories = ['All', 'Video', 'Text', 'Image', 'Audio', 'SEO'];

  // 🔥 Optimized Search & Filter Logic
  const filteredTools = useMemo(() => {
    return proTools.filter(tool => {
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            tool.desc.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const handleProcessAI = async () => {
    if (!activeTool) return;
    setIsLoading(true);
    try {
      const response = await fetch('/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolId: activeTool.id })
      });
      const data = await response.json();
      setAiResult(data.data || "AI response received!");
    } catch (error) {
      setAiResult("Connecting to AI...");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-600/30 overflow-x-hidden">
      
      {/* Navbar - Fixed Logo & 3-Dot Menu */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/90 backdrop-blur-xl border-b border-white/5 h-16 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => {setActiveTool(null); setSearchTerm(''); setSelectedCategory('All');}}>
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.4)] flex items-center justify-center">
            <Zap size={18} fill="white" className="text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter italic uppercase text-white">TOOL<span className="text-blue-600">SCOUT</span></span>
        </div>
        
        <div className="relative">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 hover:bg-white/5 rounded-full cursor-pointer transition-all">
            {isMenuOpen ? <X className="text-gray-400" /> : <Menu className="text-gray-400" />}
          </button>
          
          {isMenuOpen && (
            <div className="absolute right-0 mt-4 w-48 bg-[#0e0e0e] border border-white/10 rounded-2xl shadow-2xl p-2 animate-in slide-in-from-top-2 duration-200">
              <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all">
                <Info size={16} /> About
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all">
                <Settings size={16} /> Settings
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all border-t border-white/5 mt-1">
                <Mail size={16} /> Contact
              </button>
            </div>
          )}
        </div>
      </nav>

      <main className="pt-24 pb-20 px-4 md:px-6 max-w-6xl mx-auto">
        {!activeTool ? (
          <div className="animate-in fade-in duration-700">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/20 px-4 py-2 rounded-full mb-8">
                <Sparkles size={14} className="text-blue-400" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 italic">20+ Pro AI Tools Ready</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-[1.1] italic uppercase">
                Find the perfect <br />
                <span className="bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-600 bg-clip-text text-transparent italic">
                  AI {words[wordIndex]}
                </span>
              </h1>
              
              <div className="relative max-w-2xl mx-auto mt-12">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input 
                  type="text"
                  value={searchTerm}
                  placeholder="Search 20+ tools (e.g. Script, SEO, Magic)..."
                  className="w-full bg-[#0e0e0e] border border-white/10 rounded-3xl py-6 px-16 focus:outline-none focus:border-blue-600/50 text-base transition-all text-white placeholder:text-gray-600"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap justify-center gap-2 mt-10">
                {categories.map(cat => (
                  <button key={cat} onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${selectedCategory === cat ? 'bg-blue-600 border-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]' : 'bg-white/5 border-white/10 text-gray-500 hover:bg-white/10'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.length > 0 ? (
                filteredTools.map(tool => (
                  <div key={tool.id} onClick={() => setActiveTool(tool)}
                    className="group bg-[#0c0c0c] border border-white/5 rounded-[32px] p-8 hover:bg-[#111] hover:border-blue-600/50 transition-all cursor-pointer relative overflow-hidden">
                    <div className="mb-6 flex justify-between items-start">
                      <div className="p-4 bg-black rounded-2xl border border-white/5 group-hover:border-blue-600/30 transition-all">{tool.icon}</div>
                      <div className="bg-white/5 px-3 py-1 rounded-full text-[9px] font-black text-gray-500 uppercase tracking-widest">{tool.category}</div>
                    </div>
                    <h3 className="text-2xl font-black mb-2 italic tracking-tight uppercase group-hover:text-blue-500 transition-colors text-white">{tool.name}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8">{tool.desc}</p>
                    <div className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-widest italic group-hover:gap-4 transition-all">
                      Open Workspace <ArrowRight size={14} />
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                   <p className="text-gray-500 font-bold uppercase tracking-widest">No tools found for "{searchTerm}"</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Workspace View */
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <button onClick={() => {setActiveTool(null); setAiResult('');}} className="mb-8 text-gray-500 hover:text-white flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all">
              <ArrowLeft size={16} /> Back to Library
            </button>
            <div className="bg-[#0c0c0c] border border-white/10 rounded-[40px] p-8 md:p-16 shadow-2xl">
              <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4 text-white">{activeTool.name}</h2>
              <p className="text-gray-500 text-lg mb-10">{activeTool.desc}</p>
              
              <div className="border-2 border-dashed border-white/10 rounded-[32px] p-12 text-center bg-black/40 hover:border-blue-600/30 transition-all cursor-pointer group">
                <Upload className="mx-auto mb-4 text-gray-600 group-hover:text-blue-500 transition-all" size={48} />
                <p className="font-black text-sm uppercase tracking-widest text-gray-400">Upload File or Paste Link</p>
              </div>
              
              <button 
                onClick={handleProcessAI}
                disabled={isLoading}
                className="w-full mt-10 bg-blue-600 hover:bg-blue-700 py-6 rounded-3xl font-black text-xl uppercase italic tracking-widest shadow-[0_10px_30px_rgba(37,99,235,0.3)] transition-all active:scale-95 disabled:opacity-50"
              >
                {isLoading ? 'AI is Thinking...' : <><Sparkles size={24} className="inline mr-2" /> Process with AI</>}
              </button>

              {aiResult && (
                <div className="mt-8 p-8 bg-blue-600/5 border border-blue-600/20 rounded-[32px] animate-in fade-in zoom-in-95">
                  <h4 className="text-blue-500 font-black text-[10px] uppercase tracking-widest mb-4 italic">Generated Result:</h4>
                  <div className="text-gray-200 leading-relaxed font-medium text-lg">{aiResult}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
     }
      
