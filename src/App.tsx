import React, { useState } from 'react';
import { 
  Sparkles, Video, FileText, Image as ImageIcon, Upload, Search, 
  BarChart3, ArrowLeft, Mic, Share2, Zap, Settings, HelpCircle, Layout
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedTool, setSelectedTool] = useState(null);

  const toolCategories = [
    {
      name: "Video Engineering",
      icon: <Video className="text-blue-500" />,
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
      icon: <FileText className="text-purple-500" />,
      tools: [
        { id: 'script', name: '1-Click Script Writer', desc: 'Full viral script structure.' },
        { id: 'seo', name: 'SEO Deep-Rank', desc: 'Top-ranking tags & description.' },
        { id: 'titles', name: 'Title A/B Genius', desc: '5 high-CTR title options.' },
        { id: 'plan', name: '30-Day Content Plan', desc: 'Full monthly content calendar.' },
        { id: 'translator', name: 'Script Translator', desc: 'Pro multi-language translation.' }
      ]
    },
    {
      name: "Visuals & Branding",
      icon: <ImageIcon className="text-green-500" />,
      tools: [
        { id: 'upscale', name: '4K Image Upscaler', desc: 'Low-res to ultra-HD quality.' },
        { id: 'bg-remove', name: 'BG Magic Remover', desc: 'Clean studio background removal.' },
        { id: 'thumb-ai', name: 'Thumbnail Concept', desc: 'AI-generated thumbnail ideas.' },
        { id: 'social-kit', name: 'Social Media Kit', desc: 'DP, Banners & Posts in 1-click.' },
        { id: 'icons', name: 'Text-to-Icon', desc: 'Custom brand icons from text.' }
      ]
    },
    {
      name: "Audio & Marketing",
      icon: <Mic className="text-orange-500" />,
      tools: [
        { id: 'voice', name: 'Ultra-Human Voice', desc: 'Hyper-realistic AI voiceovers.' },
        { id: 'clean', name: 'Podcast Clean-Up', desc: 'Remove noise, studio quality.' },
        { id: 'sync', name: 'Music Sync', desc: 'Mood-based background music.' },
        { id: 'ads', name: 'Ad Copy Pro', desc: 'High-converting ad copies.' },
        { id: 'social', name: 'Viral Tweet/Post', desc: 'Trending social media content.' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-black border-r border-white/5 hidden lg:flex flex-col p-6">
        <div className="flex items-center gap-2 mb-12">
          <div className="bg-blue-600 p-1.5 rounded-lg"><Zap size={20} fill="white" /></div>
          <span className="text-xl font-black tracking-tighter italic">TOOLSCOUT</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Main Menu</div>
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}>
            <Layout size={18} /> Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-white transition-all">
            <Settings size={18} /> Settings
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-white transition-all">
            <HelpCircle size={18} /> Support
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-8">
        {activeTab === 'dashboard' ? (
          /* DASHBOARD VIEW */
          <div className="max-w-6xl mx-auto">
            <header className="mb-12 flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-black mb-2">Welcome, Creator</h1>
                <p className="text-gray-500 font-medium">Which "Pro" tool do you need today?</p>
              </div>
              <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-3">
                <Search size={18} className="text-gray-500" />
                <input placeholder="Search 20+ Pro Tools..." className="bg-transparent outline-none text-sm w-48" />
              </div>
            </header>

            {/* Categories Grid */}
            <div className="space-y-12">
              {toolCategories.map((category) => (
                <div key={category.name}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-white/5 rounded-lg">{category.icon}</div>
                    <h2 className="text-xl font-bold">{category.name}</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.tools.map((tool) => (
                      <div 
                        key={tool.id}
                        onClick={() => { setSelectedTool(tool); setActiveTab('editor'); }}
                        className="p-6 rounded-3xl bg-neutral-900/40 border border-white/5 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-pointer group"
                      >
                        <h3 className="font-bold mb-1 group-hover:text-blue-400">{tool.name}</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">{tool.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* WORKSPACE VIEW */
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button onClick={() => setActiveTab('dashboard')} className="mb-8 text-gray-500 hover:text-white flex items-center gap-2">
              <ArrowLeft size={18} /> Back to Dashboard
            </button>
            <div className="bg-neutral-900/60 border border-white/5 rounded-[48px] p-12">
              <span className="bg-blue-600/10 text-blue-500 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 inline-block">Pro AI Workspace</span>
              <h2 className="text-5xl font-black mb-4 tracking-tighter">{selectedTool?.name}</h2>
              <p className="text-gray-400 text-lg mb-10">{selectedTool?.desc}</p>
              
              <div className="space-y-6">
                <div className="border-2 border-dashed border-white/10 rounded-[32px] p-20 text-center hover:border-blue-500/30 transition-all cursor-pointer">
                  <Upload className="mx-auto mb-4 text-gray-600" size={48} />
                  <p className="font-bold text-xl">Upload Assets</p>
                  <p className="text-gray-500 text-sm">Drag & drop your files here</p>
                </div>
                
                <textarea 
                  placeholder="Enter your pro prompt here..."
                  className="w-full bg-black border border-white/5 rounded-3xl p-6 h-40 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-lg"
                ></textarea>

                <button className="w-full bg-blue-600 hover:bg-blue-500 py-6 rounded-[24px] font-black text-xl flex items-center justify-center gap-3 shadow-2xl shadow-blue-900/40">
                  <Sparkles size={24} /> START PRO GENERATION
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
      }
         
