import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, Zap, X, Menu, ArrowLeft, Send, History, Plus, Trash2, Image as ImageIcon, AlertCircle, Paperclip, FileText, Download } from 'lucide-react';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [historySearchTerm, setHistorySearchTerm] = useState('');
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

  const words = ['Video Editor', 'Script Writer', 'SEO Expert', 'Voice Artist', 'Thumbnail Designer'];
  const allTools = [
    { id: "1", name: "ChatGPT-4", desc: "Ultimate AI writing.", category: "Text" },
    { id: "2", name: "Midjourney v6", desc: "Pro AI images.", category: "Image" },
    { id: "3", name: "ElevenLabs", desc: "AI voice cloning.", category: "Audio" },
    { id: "4", name: "Runway Gen-3", desc: "Pro Video AI.", category: "Video" },
    { id: "5", name: "Claude 3.5", desc: "Advanced Reasoning.", category: "Text" },
    { id: "6", name: "DALL-E 3", desc: "Creative images.", category: "Image" },
    { id: "7", name: "Luma Dream", desc: "Realistic videos.", category: "Video" },
    { id: "8", name: "Suno AI", desc: "AI Music & Vocals.", category: "Audio" },
    { id: "9", name: "Perplexity", id2: "9", desc: "AI Search Engine.", category: "Search" },
    { id: "10", name: "HeyGen", desc: "AI Video Avatars.", category: "Video" },
    { id: "11", name: "Adobe Firefly", desc: "Pro AI Editing.", category: "Design" },
    { id: "12", name: "Leonardo AI", desc: "Fine-tuned Art.", category: "Image" },
    { id: "13", name: "Pika Labs", desc: "Cinematic Video.", category: "Video" },
    { id: "14", name: "Jasper AI", desc: "Marketing Copy.", category: "Text" },
    { id: "15", name: "Canva Magic", desc: "AI Design Tools.", category: "Design" },
    { id: "16", name: "Copy.ai", desc: "Sales Automation.", category: "Text" },
    { id: "17", name: "Descript", desc: "Audio/Video Edit.", category: "Audio" },
    { id: "18", name: "Gamma AI", desc: "AI Presentations.", category: "Design" },
    { id: "19", name: "Stable Diffusion", desc: "Open Source AI.", category: "Image" },
    { id: "20", name: "InVideo AI", desc: "YouTube Automation.", category: "Video" }
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
      const res = await fetch('/api/chat', { method: 'POST', body: JSON.stringify({ prompt: input || "File" }) });
      const r = await res.json(); const final = [...newMsgs, { role: 'bot', content: r.data }]; setMessages(final);
      const idx = chatHistory.findIndex(c => c.id === currentChatId);
      if(idx > -1) { const nh = [...chatHistory]; nh[idx].messages = final; setChatHistory(nh); }
      else { setChatHistory([{ id: currentChatId, tool: activeTool.name, messages: final, date: new Date().toLocaleDateString() }, ...chatHistory]); }
    } catch { setMessages(p => [...p, { role: 'bot', content: "Error!" }]); }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-white/10 p-8 rounded-[2rem] max-w-sm w-full">
            <h3 className="text-red-500 font-black mb-6 uppercase flex items-center gap-2"><AlertCircle/> Delete Chat?</h3>
            <div className="flex gap-4">
              <button onClick={() => setDeleteConfirmId(null)} className="flex-1 py-4 bg-white/5 rounded-2xl text-[10px] font-black uppercase">No</button>
              <button onClick={() => { setChatHistory(chatHistory.filter(c => c.id !== deleteConfirmId)); setDeleteConfirmId(null); if(currentChatId === deleteConfirmId) setActiveTool(null); }} className="flex-1 py-4 bg-red-600 rounded-2xl text-[10px] font-black uppercase">Yes</button>
            </div>
          </div>
        </div>
      )}

      <div className={`fixed inset-y-0 left-0 z-[200] w-72 bg-[#0c0c0c] border-r border-white/5 transform transition-all ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col space-y-8">
          <div className="flex justify-between items-center"><span className="font-black text-blue-500 uppercase italic">Dashboard</span><X onClick={() => setIsMenuOpen(false)} className="cursor-pointer"/></div>
          <button onClick={() => { setActiveTool(null); setIsMenuOpen(false); }} className="w-full py-4 bg-blue-600 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2"><Plus size={16}/> New Chat</button>
          <div className="flex-1 overflow-y-auto space-y-6 no-scrollbar">
            <div>
              <p className="text-[10px] font-black text-gray-600 uppercase mb-4 tracking-widest">Recent Chats</p>
              {chatHistory.map(c => (
                <div key={c.id} onClick={() => { setActiveTool(allTools.find(t=>t.name===c.tool)); setMessages(c.messages); setCurrentChatId(c.id); setIsMenuOpen(false); }} className="p-3 bg-white/[0.02] hover:bg-white/5 rounded-xl mb-2 flex justify-between items-center group cursor-pointer border border-white/5">
                  <p className="text-[10px] truncate text-gray-400 font-bold">{c.messages[c.messages.length-1].content}</p>
                  <Trash2 size={12} className="text-gray-700 group-hover:text-red-500" onClick={(e) => { e.stopPropagation(); setDeleteConfirmId(c.id); }}/>
                </div>
              ))}
            </div>
            {gallery.length > 0 && (
              <div>
                <p className="text-[10px] font-black text-gray-600 uppercase mb-4 tracking-widest">Media Gallery</p>
                <div className="grid grid-cols-3 gap-2">
                  {gallery.map((img, i) => (
                    <div key={i} className="aspect-square rounded-lg overflow-hidden border border-white/10 relative group">
                      <img src={img.url} className="w-full h-full object-cover" />
                      <a href={img.url} download className="absolute inset-0 bg-blue-600/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all"><Download size={14}/></a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <nav className="fixed top-0 w-full z-[100] bg-black/80 backdrop-blur-xl border-b border-white/5 h-16 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTool(null)}><Zap className="text-blue-600" fill="currentColor"/><span className="text-xl font-black italic uppercase">TOOL<span className="text-blue-600">SCOUT</span></span></div>
        <Menu onClick={() => setIsMenuOpen(true)} className="text-gray-400 cursor-pointer"/>
      </nav>

      <main className={`pt-24 pb-10 transition-all ${activeTool ? 'px-0' : 'px-6 max-w-6xl mx-auto'}`}>
        {!activeTool ? (
          <div className="text-center">
            <h1 className="text-5xl md:text-8xl font-black italic uppercase leading-none tracking-tighter mb-12">Find your <br /><span className="text-blue-600">{words[wordIndex]}</span></h1>
            <div className="relative max-w-2xl mx-auto mb-16"><Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600"/><input type="text" placeholder="Search 20+ AI Tools..." className="w-full bg-[#0c0c0c] border border-white/10 rounded-full py-6 px-16 focus:border-blue-600 transition-all text-sm outline-none" onChange={e => setSearchTerm(e.target.value)}/></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {allTools.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase())).map(t => (
                <div key={t.id} onClick={() => { setCurrentChatId(Date.now().toString()); setActiveTool(t); setMessages([{role:'bot', content: `Bhai, ${t.name} active hai. Batao kya karna hai?`}]); }} className="bg-[#0c0c0c] border border-white/5 p-8 rounded-[2.5rem] hover:border-blue-600 cursor-pointer transition-all active:scale-95 group">
                  <Sparkles className="text-blue-500 mb-6 group-hover:scale-125 transition-all"/>
                  <h3 className="text-2xl font-black uppercase italic leading-none">{t.name}</h3>
                  <p className="text-gray-500 text-[10px] mt-4 font-bold uppercase tracking-widest">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-[calc(100vh-64px-4rem)]">
            <div className="px-6 py-4 border-b border-white/5 flex items-center bg-black/40"><ArrowLeft onClick={() => setActiveTool(null)} className="mr-4 cursor-pointer"/><h2 className="text-[11px] font-black uppercase text-blue-500">{activeTool.name}</h2></div>
            <div className="flex-1 overflow-y-auto p-4 md:p-12 space-y-8 no-scrollbar">
              <div className="w-full max-w-3xl mx-auto space-y-8">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role==='user'?'justify-end':'justify-start'}`}>
                    <div className={`max-w-[85%] p-6 rounded-[2rem] text-sm ${m.role==='user'?'bg-blue-600 text-white rounded-tr-none':'bg-[#0c0c0c] border border-white/5 rounded-tl-none text-gray-200'} whitespace-pre-line shadow-xl`}>
                      {m.file && <div className="mb-4 rounded-xl overflow-hidden border border-white/10">{m.file.type.startsWith('image/') ? <img src={m.file.url} className="max-h-80 object-cover w-full"/> : <div className="p-4 flex items-center gap-2 bg-black/20"><FileText size={16}/>{m.file.name}</div>}</div>}
                      {m.content}
                    </div>
                  </div>
                ))}
                {isLoading && <div className="text-blue-500 text-[10px] font-black italic animate-pulse">Processing...</div>}
                <div ref={chatEndRef}/>
              </div>
            </div>
            <div className="p-6 flex justify-center bg-gradient-to-t from-black to-transparent">
              <div className="w-full max-w-2xl">
                {selectedFile && <div className="mb-2 p-3 bg-[#0c0c0c] border border-blue-600/30 rounded-2xl flex justify-between text-[10px] font-black uppercase tracking-widest px-4"><span>{selectedFile.name}</span><X size={14} onClick={() => setSelectedFile(null)} className="cursor-pointer"/></div>}
                <form onSubmit={handleSendMessage} className="relative flex items-center gap-2 bg-[#0c0c0c] border border-white/10 rounded-full p-2 focus-within:border-blue-600 transition-all shadow-2xl">
                  <input type="file" ref={fileInputRef} className="hidden" onChange={e => { const f = e.target.files[0]; if(f) setSelectedFile({name:f.name, type:f.type, url:URL.createObjectURL(f)}); }}/>
                  <Paperclip className="p-2 cursor-pointer text-gray-500 hover:text-blue-500" size={36} onClick={() => fileInputRef.current.click()}/>
                  <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message..." className="flex-1 bg-transparent py-4 text-xs outline-none"/>
                  <button type="submit" className="p-4 bg-blue-600 rounded-full hover:bg-blue-700 shadow-lg shadow-blue-600/30"><Send size={20}/></button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
     }
     
