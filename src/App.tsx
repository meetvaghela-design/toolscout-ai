import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Video, FileText, Image as ImageIcon, Mic, BarChart3, Menu, Zap, ArrowRight, X, ArrowLeft, Upload } from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTool, setActiveTool] = useState(null);
  const [wordIndex, setWordIndex] = useState(0);
  
  // NEW: AI states for backend connectivity
  const [aiResult, setAiResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    { id: 'jumpcut', name: 'Pro Jump-Cut', desc: 'Remove silence & boring parts from videos.', category: 'Video', icon: <Zap className="text-yellow-500" /> }
  ];

  const categories = ['All', 'Video', 'Text', 'Image', 'Audio', 'SEO'];

  const filteredTools = proTools.filter(tool => {
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // NEW: Function to talk to our Netlify Backend
  const handleProcessAI = async () => {
    if (!activeTool) return;
    setIsLoading(true);
    setAiResult(''); // Purana result clear karein

    try {
      const response = await fetch('/.netlify/functions/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          toolId: activeTool.id, 
          prompt: "User Input" // Agle step mein textarea se connect karenge
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setAiResult(data.data);
      } else {
        setAiResult("AI setup incomplete. Please check keys.");
      }
    } catch (error) {
      setAiResult("Connection error. Ensure your site is live on Netlify.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden max-w-full">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/90 backdrop-blur-xl border-b border-white/5 h-16 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => {setActiveTool(null); setAiResult('');}}>
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg">
            <Zap size={18} fill="white" />
          </div>
          <span className="text-xl font-black tracking-tighter italic uppercase">TOOLSCOUT</span>
        </div>
        <Menu className="text-gray-400" />
      </nav>

      <main className="pt-24 pb-20 px-4 md:px-6 max-w-6xl mx-auto box-border">
        {!activeTool ? (
          /* DASHBOARD VIEW */
          <div className="animate-in fade-in duration-700">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8">
                <Sparkles size={14} className="text-blue-400" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 italic">20+ Pro AI Tools Ready</span>
              </div>
              <h1 className="text-4xl md:text-8xl font-black mb-6 tracking-tighter leading-[1.1] italic">
                Find the perfect <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent italic transition-all duration-500">
                  AI {words[wordIndex]}
                </span>
              </h1>
              <div className="relative max-w-2xl mx-auto mt-12 w-full px-2 box-border">
                <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input 
                  type="text"
                  placeholder="Search for tools..."
                  className="w-full bg-[#0e0e0e] border border-white/10 rounded-3xl py-5 px-16 focus:outline-none focus:border-blue-600/50 text-base"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-10">
                {categories.map(cat => (
                  <button key={cat} onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${selectedCategory === cat ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white/5 border-white/10 text-gray-500 hover:bg-white/10'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTools.map(tool => (
                <div key={tool.id} onClick={() => setActiveTool(tool)}
                  className="group bg-[#0c0c0c] border border-white/5 rounded-[32px] p-8 hover:bg-[#111] hover:border-blue-500/50 transition-all cursor-pointer">
                  <div className="mb-6 flex justify-between items-start">
                    <div className="p-4 bg-black rounded-2xl border border-white/5">{tool.icon}</div>
                    <div className="bg-white/5 px-3 py-1 rounded-full text-[9px] font-black text-gray-500 uppercase tracking-widest">{tool.category}</div>
                  </div>
                  <h3 className="text-2xl font-black mb-2 italic tracking-tight uppercase">{tool.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8">{tool.desc}</p>
                  <div className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-widest italic group-hover:gap-4 transition-all">
                    Open Workspace <ArrowRight size={14} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* WORKSPACE VIEW */
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <button onClick={() => {setActiveTool(null); setAiResult('');}} className="mb-8 text-gray-500 flex items-center gap-2 text-xs font-black uppercase tracking-widest">
              <ArrowLeft size={16} /> Back to Library
            </button>
            <div className="bg-[#0c0c0c] border border-white/10 rounded-[40px] p-8 md:p-16">
              <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">{activeTool.name}</h2>
              <p className="text-gray-500 text-lg mb-10">{activeTool.desc}</p>
              
              <div className="border-2 border-dashed border-white/10 rounded-[32px] p-12 text-center bg-black/40 hover:border-blue-500/50 transition-all cursor-pointer">
                <Upload className="mx-auto mb-4 text-gray-600" size={48} />
                <p className="font-black text-sm uppercase tracking-widest">Upload File</p>
              </div>
              
              <button 
                onClick={handleProcessAI}
                disabled={isLoading}
                className="w-full mt-10 bg-blue-600 hover:bg-blue-500 py-6 rounded-3xl font-black text-xl uppercase italic tracking-widest shadow-2xl transition-all active:scale-95 disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : <><Sparkles size={24} className="inline mr-2" /> Process with AI</>}
              </button>

              {/* AI Result Box */}
              {aiResult && (
                <div className="mt-8 p-6 bg-white/5 border border-blue-500/30 rounded-3xl animate-in fade-in slide-in-from-top-2">
                  <h4 className="text-blue-500 font-black text-[10px] uppercase tracking-widest mb-2 italic">AI Result:</h4>
                  <p className="text-gray-200 leading-relaxed font-mono text-sm">{aiResult}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
                                                                                                                              }
      
