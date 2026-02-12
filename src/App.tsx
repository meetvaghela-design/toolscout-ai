import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, Zap, X, Menu, ArrowLeft, Send, History, Plus, Trash2, Image as ImageIcon, AlertCircle, Paperclip, FileText, Download, Cpu } from 'lucide-react';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTool, setActiveTool] = useState(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [gallery, setGallery] = useState([]); 
  const [currentChatId, setCurrentChatId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); 
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const words = ['Master AI', 'Pro Editor', 'Graphic Engine', 'Video Architect'];
  const allTools = [
    { id: "1", name: "TS-Vision Pro", desc: "Native high-fidelity image engine.", category: "Core" },
    { id: "2", name: "TS-Motion Master", desc: "Advanced neural video processing.", category: "Core" },
    { id: "3", name: "TS-Audio Sync", desc: "Studio-grade voice synthesis.", category: "Core" },
    { id: "4", name: "Neural-Edit", desc: "AI-powered video manipulation.", category: "Editor" },
    { id: "5", name: "TS-Script", desc: "Creative writing neural module.", category: "Text" },
    { id: "6", name: "Deep-Gen Art", desc: "Custom diffusion based art.", category: "Image" },
    { id: "7", name: "TS-Cinema", desc: "Cinematic video generation.", category: "Video" },
    { id: "8", name: "Vocal-Clone", desc: "Neural voice cloning engine.", category: "Audio" },
    { id: "9", name: "TS-Insight", desc: "Real-time data intelligence.", category: "Search" },
    { id: "10", name: "Avatar-Sync", desc: "AI video lip-sync engine.", category: "Video" },
    { id: "11", name: "Design-Bot", desc: "Automated graphic design.", category: "Design" },
    { id: "12", name: "Style-Transfer", desc: "Pro-level aesthetic filters.", category: "Image" },
    { id: "13", name: "Frame-Fix", desc: "Video quality upscaler.", category: "Video" },
    { id: "14", name: "Copy-Brain", desc: "Marketing & sales AI copy.", category: "Text" },
    { id: "15", name: "TS-Magic", desc: "All-in-one creative tools.", category: "Design" },
    { id: "16", name: "Flow-Auto", desc: "Process automation engine.", category: "Core" },
    { id: "17", name: "Audio-Clean", desc: "Noise removal & enhancement.", category: "Audio" },
    { id: "18", name: "Neural-Slide", desc: "AI presentation engine.", category: "Design" },
    { id: "19", name: "Open-TS", desc: "Open-source model lab.", category: "Core" },
    { id: "20", name: "Tube-Pilot", desc: "YouTube automation neural.", category: "Video" }
  ];

  useEffect(() => {
    const h = JSON.parse(localStorage.getItem('ts_h') || '[]');
    const g = JSON.parse(localStorage.getItem('ts_g') || '[]');
    setChatHistory(h); setGallery(g);
  }, []);

  useEffect(() => {
    localStorage.setItem('ts_h', JSON.stringify(chatHistory));
    localStorage.setItem('ts_g', JSON.stringify(gallery));
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, gallery, messages]);

  useEffect(() => { if(!activeTool) { const i = setInterval(() => setWordIndex(p => (p+1)%words.length), 2500); return () => clearInterval(i); } }, [activeTool]);

  const handleSendMessage = async (e) => {
    e.preventDefault(); if((!input.trim() && !selectedFile) || isLoading) return;
    const msg = { role: 'user', content: input, file: selectedFile };
    if(selectedFile?.type.startsWith('image/')) setGallery(p => [selectedFile, ...p]);
    const newMsgs = [...messages, msg]; setMessages(newMsgs); setInput(''); setSelectedFile(null); setIsLoading(true);
    
    try {
      const res = await fetch('/api/chat', { method: 'POST', body: JSON.stringify({ prompt: input || "Asset Processing" }) });
      const r = await res.json();
      const final = [...newMsgs, { role: 'bot', content: r.data, status: 'Processed by ToolScout Engine' }];
      setMessages(final);
      const idx = chatHistory.findIndex(c => c.id === currentChatId);
      if(idx > -1) { const nh = [...chatHistory]; nh[idx].messages = final; setChatHistory(nh); }
      else { setChatHistory([{ id: currentChatId, tool: activeTool.name, messages: final, date: new Date().toLocaleDateString() }, ...chatHistory]); }
    } catch { setMessages(p => [...p, { role: 'bot', content: "Neural Link Error! Re-trying..." }]); }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/30">
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-white/10 p-8 rounded-[2rem] max-w-sm w-full">
            <h3 className="text-red-500 font-black mb-6 uppercase flex items-center gap-2 tracking-tighter"><AlertCircle/> Delete Neural History?</h3>
            <div className="flex gap-4">
              <button onClick={() => setDeleteConfirmId(null)} className="flex-1 py-4 bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest">No</button>
              <button onClick={() => { setChatHistory(chatHistory.filter(c => c.id !== deleteConfirmId)); setDeleteConfirmId(null); if(currentChatId === deleteConfirmId) setActiveTool(null); }} className="flex-1 py-4 bg-red-600 rounded-2xl text-[10px] font-black uppercase tracking-widest">Confirm</button>
            </div>
          </div>
        </div>
      )}

      <div className={`fixed inset-y-0 left-0 z-[200] w-72 bg-[#080808] border-r border-white/5 transform transition-all duration-500 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col space-y-8">
          <div className="flex justify-between items-center"><span className="font-black text-blue-500 uppercase italic tracking-tighter">Dashboard</span><X onClick={() => setIsMenuOpen(false)} className="cursor-pointer text-gray-500"/></div>
          <button onClick={() => { setActiveTool(null); setIsMenuOpen(false); }} className="w-full py-4 bg-blue-600 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"><Plus size={16}/> New Neural Link</button>
          <div className="flex-1 overflow-y-auto space-y-8 no-scrollbar">
            <div>
              <p className="text-[10px] font-black text-gray-600 uppercase mb-4 tracking-[0.2em]">Recent Sessions</p>
              {chatHistory.map(c => (
                <div key={c.id} onClick={() => { setActiveTool(allTools.find(t=>t.name===c.tool) || allTools[0]); setMessages(c.messages); setCurrentChatId(c.id); setIsMenuOpen(false); }} className="p-3 bg-white/[0.02] hover:bg-white/5 rounded-xl mb-2 flex justify-between items-center group cursor-pointer border border-white/5">
                  <div className="truncate pr-2"><p className="text-[10px] text-gray-400 font-bold truncate">{c.messages[c.messages.length-1].content}</p><p className="text-[7px] text-gray-600 uppercase font-black">{c.tool}</p></div>
                  <Trash2 size={12} className="text-gray-700 group-hover:text-red-500 transition-colors" onClick={(e) => { e.stopPropagation(); setDeleteConfirmId(c.id); }}/>
                </div>
              ))}
            </div>
            {gallery.length > 0 && (
              <div>
                <p className="text-[10px] font-black text-gray-600 uppercase mb-4 tracking-[0.2em]">Media Vault</p>
                <div className="grid grid-cols-3 gap-2">
                  {gallery.map((img, i) => (
                    <div key={i} className="aspect-square rounded-lg overflow-hidden border border-white/10 group relative">
                      <img src={img.url} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                      <a href={img.url} download className="absolute inset-0 bg-blue-600/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all"><Download size={14}/></a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <nav className="fixed top-0 w-full z-[100] bg-black/50 backdrop-blur-xl border-b border-white/5 h-16 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTool(null)}><Zap className="text-blue-600" fill="currentColor"/><span className="text-xl font-black italic uppercase tracking-tighter">TOOL<span className="text-blue-600">SCOUT</span></span></div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-blue-600/10 rounded-full border border-blue-600/20"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"/><span className="text-[8px] font-black uppercase tracking-widest text-blue-500">System Online</span></div>
          <Menu onClick={() => setIsMenuOpen(true)} className="text-gray-400 cursor-pointer hover:text-white"/>
        </div>
      </nav>

      <main className={`pt-24 pb-10 transition-all ${activeTool ? 'px-0' : 'px-6 max-w-6xl mx-auto'}`}>
        {!activeTool ? (
          <div className="text-center">
            <h1 className="text-5xl md:text-8xl font-black italic uppercase leading-[0.9] tracking-tighter mb-12">Built to <br /><span className="text-blue-600">{words[wordIndex]}</span></h1>
            <div className="relative max-w-2xl mx-auto mb-16"><Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600"/><input type="text" placeholder="Search Neural Modules..." className="w-full bg-[#0c0c0c] border border-white/10 rounded-full py-6 px-16 focus:border-blue-600 transition-all text-sm outline-none shadow-2xl" onChange={e => setSearchTerm(e.target.value)}/></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {allTools.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase())).map(t => (
                <div key={t.id} onClick={() => { setCurrentChatId(Date.now().toString()); setActiveTool(t); setMessages([{role:'bot', content: `Neural Engine Initialized: ${t.name} is ready for processing.`}]); }} className="bg-[#0c0c0c] border border-white/5 p-8 rounded-[2.5rem] hover:border-blue-600/50 cursor-pointer transition-all active:scale-95 group relative overflow-hidden">
                   <div className="absolute top-0 right-0 p
     
