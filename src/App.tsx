import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, Zap, ArrowRight, X, Menu, ArrowLeft, Send, History, Plus, Trash2, Image as ImageIcon, AlertCircle, Paperclip, FileText, Download } from 'lucide-react';

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
    { "id": "1", "name": "ChatGPT-4", "desc": "Ultimate AI for writing and coding.", "category": "Text" },
    { "id": "2", "name": "Midjourney v6", "desc": "AI image generation for pros.", "category": "Image" },
    { "id": "3", "name": "ElevenLabs", "desc": "AI voice cloning and synthesis.", "category": "Audio" },
    { "id": "4", "name": "Runway Gen-3", "desc": "Text-to-video generation tool.", "category": "Video" },
    { "id": "5", "name": "Claude 3.5", "desc": "Advanced reasoning AI.", "category": "Text" },
    { "id": "6", "name": "DALL-E 3", "desc": "Creative image generation.", "category": "Image" },
    { "id": "12", "name": "Perplexity", "desc": "Real-time AI search engine.", "category": "Search" },
    { "id": "20", "name": "Adobe Firefly", "desc": "Pro creative AI editing.", "category": "Design" }
  ];

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('ts_history') || '[]');
    const savedGallery = JSON.parse(localStorage.getItem('ts_gallery') || '[]');
    setChatHistory(savedHistory);
    setGallery(savedGallery);
  }, []);

  useEffect(() => {
    localStorage.setItem('ts_history', JSON.stringify(chatHistory));
    localStorage.setItem('ts_gallery', JSON.stringify(gallery));
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, gallery, messages]);

  useEffect(() => {
    if (!activeTool) {
      const interval = setInterval(() => setWordIndex((p) => (p + 1) % words.length), 2500);
      return () => clearInterval(interval);
    }
  }, [activeTool]);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile({ name: file.name, type: file.type, url: URL.createObjectURL(file) });
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if ((!input.trim() && !selectedFile) || isLoading) return;
    const userMsg = { role: 'user', content: input, file: selectedFile };
    if (selectedFile?.type.startsWith('image/')) setGallery(p => [selectedFile, ...p]);
    const updatedMsgs = [...messages, userMsg];
    setMessages(updatedMsgs);
    setInput('');
    setSelectedFile(null);
    setIsLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input || "File sent" })
      });
      const result = await res.json();
      const finalMsgs = [...updatedMsgs, { role: 'bot', content: result.data }];
      setMessages(finalMsgs);
      const idx = chatHistory.findIndex(c => c.id === currentChatId);
      if (idx > -1) {
        const newHist = [...chatHistory];
        newHist[idx].messages = finalMsgs;
        setChatHistory(newHist);
      } else {
        setChatHistory([{ id: currentChatId, tool: activeTool.name, messages: finalMsgs, date: new Date().toLocaleDateString() }, ...chatHistory]);
      }
    } catch {
      setMessages(p => [...p, { role: 'bot', content: "Connection Error!" }]);
    }
    setIsLoading(false);
  };
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden">
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-[#121212] border border-white/10 p-8 rounded-[2rem] max-w-sm w-full shadow-2xl">
            <h3 className="font-black italic text-red-500 mb-4 flex items-center gap-2 uppercase tracking-tighter"><AlertCircle/> Delete?</h3>
            <div className="flex gap-4">
              <button onClick={() => setDeleteConfirmId(null)} className="flex-1 py-4 bg-white/5 rounded-2xl text-[10px] font-black uppercase">No</button>
              <button onClick={() => { setChatHistory(chatHistory.filter(c => c.id !== deleteConfirmId)); setDeleteConfirmId(null); if(currentChatId === deleteConfirmId) setActiveTool(null); }} className="flex-1 py-4 bg-red-600 rounded-2xl text-[10px] font-black uppercase">Yes</button>
            </div>
          </div>
        </div>
      )}

      <div className={`fixed inset-y-0 left-0 z-[200] w-72 bg-[#0c0c0c] border-r border-white/5 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <span className="font-black italic text-blue-500 text-lg uppercase tracking-tighter">Dashboard</span>
            <button onClick={() => setIsMenuOpen(false)} className="p-1 hover:bg-white/10 rounded-full"><X size={20}/></button>
          </div>
          <button onClick={() => { setActiveTool(null); setIsMenuOpen(false); }} className="w-full mb-6 py-4 bg-blue-600 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"><Plus size={16}/> New Chat</button>
          <div className="flex-1 overflow-y-auto space-y-4 no-scrollbar">
            <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">History</h3>
            {chatHistory.filter(c => c.tool.toLowerCase().includes(historySearchTerm.toLowerCase())).map(chat => (
              <div key={chat.id} onClick={() => { setActiveTool(allTools.find(t=>t.name === chat.tool) || allTools[0]); setMessages(chat.messages); setCurrentChatId(chat.id); setIsMenuOpen(false); }} className="p-3 bg-white/[0.02] hover:bg-white/5 rounded-xl cursor-pointer flex justify-between items-center group border border-white/5">
                <div className="flex-1 min-w-0 pr-2">
                  <p className="text-[11px] font-bold truncate text-gray-400 group-hover:text-white">{chat.messages[chat.messages.length-1].content}</p>
                  <p className="text-[8px] text-gray-600 uppercase mt-1 font-black">{chat.tool}</p>
                </div>
                <Trash2 size={12} className="text-gray-700 opacity-0 group-hover:opacity-100 hover:text-red-500" onClick={(e) => { e.stopPropagation(); setDeleteConfirmId(chat.id); }}/>
              </div>
            ))}
          </div>
        </div>
      </div>

      <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur-xl border-b border-white/5 h-16 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTool(null)}>
          <div className="bg-blue-600 p-1.5 rounded-lg"><Zap size={18} fill="white" /></div>
          <span className="text-xl font-black italic uppercase tracking-tighter">TOOL<span className="text-blue-600">SCOUT</span></span>
        </div>
        <button onClick={() => setIsMenuOpen(true)} className="p-2 hover:bg-white/5 rounded-lg"><Menu size={24} className="text-gray-400" /></button>
      </nav>

      <main className={`transition-all duration-300 ${activeTool ? 'pt-16' : 'pt-24 pb-20 px-4 max-w-6xl mx-auto'}`}>
        {!activeTool ? (
          <div className="text-center">
            <h1 className="text-5xl md:text-8xl font-black mb-8 italic uppercase leading-none tracking-tighter">Find your <br /><span className="text-blue-600">{words[wordIndex]}</span></h1>
            <div className="relative max-w-2xl mx-auto mt-12 px-4">
              <Search className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input type="text" placeholder="Search AI Tools..." className="w-full bg-[#0e0e0e] border border-white/10 rounded-full py-6 px-16 focus:outline-none focus:border-blue-600/50 shadow-2xl text-sm" onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              {allTools.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase())).map(tool => (
                <div key={tool.id} onClick={() => { setCurrentChatId(Date.now().toString()); setActiveTool(tool); setMessages([{role:'bot', content: `Bhai, main ${tool.name} hoon. Batao?`}]); }} className="group bg-[#0c0c0c] border border-white/5 rounded-[2.5rem] p-8 hover:border-blue-600/50 transition-all cursor-pointer">
                  <div className="mb-6 bg-blue-600/10 w-fit p-4 rounded-2xl text-blue-500 group-hover:bg-blue-600 group-hover:text-white"><Sparkles size={24} /></div>
                  <h3 className="text-2xl font-black italic uppercase group-hover:text-blue-500 leading-none tracking-tighter">{tool.name}</h3>
                  <p className="text-gray-500 text-[11px] mt-3 font-medium">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-[calc(100vh-64px)]">
            <div className="px-6 py-4 border-b border-white/5 flex items-center bg-black/40 backdrop-blur-md">
              <button onClick={() => setActiveTool(null)} className="p-2 mr-4 hover:bg-white/5 rounded-xl"><ArrowLeft size={18}/></button>
              <div><h2 className="font-black uppercase italic text-[11px] text-blue-500 tracking-widest">{activeTool.name}</h2></div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 md:p-12 space-y-8 flex flex-col items-center no-scrollbar pb-32">
               <div className="w-full max-w-3xl space-y-8">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-6 rounded-[2rem] text-[14px] leading-relaxed shadow-xl ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-[#0c0c0c] text-gray-200 rounded-tl-none border border-white/5 whitespace-pre-line'}`}>
                      {msg.file && (
                        <div className="mb-4 rounded-2xl overflow-hidden bg-black/20 border border-white/5">
                          {msg.file.type.startsWith('image/') ? <img src={msg.file.url} className="w-full max-h-[350px] object-cover" /> : <div className="p-4 flex items-center gap-3"><FileText size={20}/><span className="text-[10px] uppercase font-black">{msg.file.name}</span></div>}
                        </div>
                      )}
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && <div className="text-blue-500 text-[9px] font-black uppercase italic animate-pulse">Thinking...</div>}
                <div ref={chatEndRef} />
               </div>
            </div>
            <div className="fixed bottom-0 left-0 right-0 p-6 flex justify-center bg-gradient-to-t from-[#050505] to-transparent">
              <div className="w-full max-w-2xl">
                <form onSubmit={handleSendMessage} className="relative flex items-center gap-2 bg-[#0c0c0c] border border-white/10 rounded-full p-1.5 focus-within:border-blue-600/50 transition-all">
                  <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" />
                  <button type="button" onClick={() => fileInputRef.current.click()} className="p-4 text-gray-500 hover:text-blue-500"><Paperclip size={20}/></button>
                  <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Message AI..." className="flex-1 bg-transparent py-4 text-xs focus:outline-none" />
                  <button type="submit" className="p-4 bg-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"><Send size={20} /></button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
                }
                  
