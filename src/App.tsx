import React, { useState } from 'react';
import { 
  Sparkles, Video, FileText, Image as ImageIcon, Upload, Search, 
  BarChart3, ArrowLeft, Mic, Menu, X, Zap
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedTool, setSelectedTool] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toolCategories = [
    {
      name: "Video Engineering",
      icon: <Video className="text-blue-500" size={20} />,
      tools: [
        { id: 'captions', name: 'Auto-Viral Captions', desc: 'Add influencer-style subtitles.' },
        { id: 'jumpcut', name: 'Pro Jump-Cut', desc: 'Remove silence & boring parts.' },
        { id: 'hook', name: 'Hook Master', desc: 'Add viral visual/text hooks.' },
        { id: 'grading', name: 'Cinematic Color Fix', desc: 'Studio-grade color grading.' },
        { id: 'summary', name: 'Video Summarizer', desc: 'Long videos to 60s reels.' }
      ]
    },
    {
      name: "Content & SEO",
      icon: <FileText className="text-purple-500" size={20} />,
      tools: [
        { id: 'script', name: '1-Click Script Writer', desc: 'Full viral script structure.' },
        { id: 'seo', name: 'SEO Deep-Rank', desc: 'Top-ranking tags & description.' },
        { id: 'titles', name: 'Title A/B Genius', desc: '5 high-CTR title options.' }
      ]
    }
  ];

  const handleToolClick = (tool) => {
    setSelectedTool(tool);
    setActiveTab('editor');
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* --- FIXED NAVBAR --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-white/10 px-4 h-16 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => {setActiveTab('dashboard'); setSelectedTool(null); setIsMenuOpen(false);}}
        >
          <div className="bg-blue-600 p-1 rounded-lg flex items-center justify-center">
            <Zap size={18} fill="white" />
          </div>
          <span className="text-lg font-black tracking-tighter italic">TOOLSCOUT AI</span>
        </div>
        
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-400">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* --- MOBILE MENU OVERLAY --- */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black animate-in fade-in duration-300 pt-20 px-6">
          <nav className="flex flex-col gap-8 text-3xl font-black italic">
            <button onClick={() => {setActiveTab('dashboard'); setIsMenuOpen(false);}}>DASHBOARD</button>
            <button onClick={() => setIsMenuOpen(false)}>SERVICES</button>
            <button onClick={() => setIsMenuOpen(false)}>PRO ACCESS</button>
            <button onClick={() => setIsMenuOpen(false)}>SETTINGS</button>
          </nav>
        </div>
      )}

      {/* --- MAIN CONTENT --- */}
      <main className="pt-20 pb-10 px-4 w-full max-w-full box-border">
        {activeTab === 'dashboard' ? (
          <div className="animate-in fade-in duration-500">
            <header className="mb-8">
              <h1 className="text-3xl font-black mb-2 leading-tight">Welcome,<br/>Creator</h1>
              <p className="text-gray-500 text-sm">Select a pro tool to start.</p>
            </header>

            <div className="space-y-10">
              {toolCategories.map((category) => (
                <div key={category.name} className="w-full">
                  <div className="flex items-center gap-2 mb-4 border-l-2 border-blue-600 pl-3">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">{category.name}</h2>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {category.tools.map((tool) => (
                      <div 
                        key={tool.id}
                        onClick={() => handleToolClick(tool)}
                        className="p-5 rounded-2xl bg-neutral-900/60 border border-white/5 active:bg-blue-600/10 active:border-blue-500/50 transition-all cursor-pointer"
                      >
                        <h3 className="font-bold text-base mb-1">{tool.name}</h3>
                        <p className="text-[11px] text-gray-500 leading-relaxed">{tool.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* --- WORKSPACE VIEW (MOBILE OPTIMIZED) --- */
          <div className="animate-in slide-in-from-bottom-4 duration-500 w-full">
            <button onClick={() => setActiveTab('dashboard')} className="mb-6 text-gray-500 flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
              <ArrowLeft size={14} /> Back to Tools
            </button>
            <div className="bg-neutral-900/80 border border-white/10 rounded-[28px] p-6 shadow-2xl">
              <div className="mb-8">
                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2 block">AI Workspace</span>
                <h2 className="text-2xl font-black mb-2 leading-tight">{selectedTool?.name}</h2>
                <p className="text-gray-500 text-xs">{selectedTool?.desc}</p>
              </div>
              
              <div className="space-y-5">
                <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center bg-black/20 active:bg-white/5 transition-all">
                  <Upload className="mx-auto mb-3 text-gray-600" size={28} />
                  <p className="font-bold text-xs uppercase tracking-tight">Tap to Upload File</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">AI Prompt</label>
                  <textarea 
                    placeholder="Describe how you want it edited..."
                    className="w-full bg-black border border-white/10 rounded-xl p-4 h-32 focus:ring-1 focus:ring-blue-500 outline-none text-sm transition-all"
                  ></textarea>
                </div>

                <button className="w-full bg-blue-600 active:bg-blue-700 py-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-900/20">
                  <Sparkles size={16} /> GENERATE PRO RESULT
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
    }
        
