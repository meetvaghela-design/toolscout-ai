import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, Video, FileText, Image as ImageIcon, Mic, BarChart3, Menu, Zap, ArrowRight, X, ArrowLeft, Upload, Send, Paperclip, Info, Settings, Mail } from 'lucide-react';
// Yahan humne tumhari 20 tools wali file ko import kiya h
import toolsData from './data/directoryData.json';
import { Tool } from './types';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTool, setActiveTool] = useState<any>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const chatEndRef = useRef<null | HTMLDivElement>(null);

  const words = ['Video Editor', 'Script Writer', 'SEO Expert', 'Voice Artist', 'Thumbnail Designer'];
  
  // Ab hum proTools variable ki jagah seedha toolsData use karenge
  const allTools = toolsData;

  useEffect(() => {
    if (!activeTool) {
      const interval = setInterval(() => {
        setWordIndex((prev) => (prev + 1) % words.length);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [activeTool]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const filteredTools = allTools.filter(tool => {
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', content: `Bhai, abhi main server se connect nahi hoon, lekin aapne kaha: "${input}". Jald hi main live kaam karunga!` }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-600/30 overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/90 backdrop-blur-xl border-b border-white/5 h-16 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTool(null)}>
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            <Zap size={18} fill="white" className="text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter italic uppercase">TOOL<span className="text-blue-600">SCOUT</span></span>
        </div>
        <div className="relative">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 hover:bg-white/5 rounded-full cursor-pointer transition-all">
            {isMenuOpen ? <X className="text-gray-400" /> : <Menu className="text-gray-400" />}
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-4 w-48 bg-[#0e0e0e] border border-white/10 rounded-2xl shadow-2xl p-2">
              <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white"><Info size={16} /> About</button>
              <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white border-t border-white/5 mt-1"><Mail size={16} /> Contact</button>
            </div>
          )}
        </div>
      </nav>

      <main className="pt-24 pb-20 px-4 md:px-6 max-w-6xl mx-auto">
        {!activeTool ? (
          <div className="animate-in fade-in duration-700">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter italic uppercase">
                Find the perfect <br />
                <span className="bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-600 bg-clip-text text-transparent">AI {words[wordIndex]}</span>
              </h1>
              <div className="relative max-w-2xl mx-auto mt-12">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input type="text" placeholder="Search for tools..." className="w-full bg-[#0e0e0e] border border-white/10 rounded-3xl py-6 px-16 focus:outline-none focus:border-blue-600/50 text-base shadow-2xl" onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map(tool => (
                <div key={tool.id} onClick={() => {setActiveTool(tool); setMessages([{role:'bot', content: `Bhai, main aapka ${tool.name} AI hoon. Batao kya help karun?`}]);}} className="group bg-[#0c0c0c] border border-white/5 rounded-[32px] p-8 hover:bg-[#111] hover:border-blue-600/50 transition-all cursor-pointer relative overflow-hidden">
                  <div className="mb-6 bg-blue-600/10 w-fit p-4 rounded-2xl text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Sparkles size={24} />
                  </div>
                  <h3 className="text-2xl font-black mb-2 italic uppercase group-hover:text-blue-500">{tool.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{tool.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{tool.category}</span>
                    <ArrowRight size={16} className="text-blue-600 opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                  {tool.pro && <div className="absolute top-6 right-6 text-[10px] font-black bg-blue-600 px-3 py-1 rounded-full uppercase italic">PRO</div>}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-[75vh] bg-[#0c0c0c] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4">
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-4">
                <button onClick={() => setActiveTool(null)}><ArrowLeft size={20} className="text-gray-500 hover:text-white transition-all" /></button>
                <h2 className="font-black uppercase italic text-sm tracking-widest text-blue-500">{activeTool.name}</h2>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-3xl text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white/5 text-gray-200 rounded-tl-none border border-white/5'}`}>{msg.content}</div>
                </div>
              ))}
              {isLoading && <div className="text-blue-500 text-[10px] font-bold italic animate-pulse px-2 uppercase">Toolscout AI is working...</div>}
              <div ref={chatEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="p-6 bg-black/40 border-t border-white/5">
              <div className="relative flex items-center gap-3">
                <button type="button" className="p-3 bg-white/5 rounded-2xl text-gray-400 hover:text-white"><Paperclip size={20} /></button>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Message ${activeTool.name}...`} className="flex-1 bg-[#121212] border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-blue-600/50 text-sm text-white" />
                <button type="submit" className="p-4 bg-blue-600 rounded-2xl hover:bg-blue-700 transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)]"><Send size={20} /></button>
              </div>
            </form>
          </div>
        )}
      </main>
      
      {/* Footer added back for "Created by Meet" */}
      {!activeTool && (
        <footer className="py-12 px-6 border-t border-white/5 text-center">
           <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">
             Site Created by <span className="text-white">Meet</span>
           </p>
        </footer>
      )}
    </div>
  );
                                                                         }
