import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, Zap, ArrowRight, X, Menu, ArrowLeft, Send, Download, History, Image as ImageIcon, Plus } from 'lucide-react';

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
  const chatEndRef = useRef(null);

  const words = ['Video Editor', 'Script Writer', 'SEO Expert', 'Voice Artist', 'Thumbnail Designer'];
  
  const allTools = [
    { "id": "1", "name": "ChatGPT-4", "desc": "Ultimate AI for writing, coding, and brainstorming.", "category": "Text", "pro": true },
    { "id": "2", "name": "Midjourney v6", "desc": "Industry leading AI image generation for pros.", "category": "Image", "pro": true },
    { "id": "3", "name": "ElevenLabs", "desc": "Human-like AI voice cloning and speech synthesis.", "category": "Audio", "pro": true },
    { "id": "4", "name": "Runway Gen-3", "desc": "Professional text-to-video generation tool.", "category": "Video", "pro": true },
    { "id": "16", "name": "Suno AI", "desc": "Generate full high-quality songs with AI.", "category": "Audio", "pro": true },
    { "id": "17", "name": "Gamma AI", "desc": "Create stunning presentations and websites instantly.", "category": "Design", "pro": false }
  ];

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('ts_history') || '[]');
    const savedGallery = JSON.parse(localStorage.getItem('ts_gallery') || '[]');
    setChatHistory(savedHistory);
    setGallery(savedGallery);
  }, []);

  useEffect(() => {
    localStorage.setItem('ts_history', JSON.stringify(chatHistory));
  }, [chatHistory]);

  useEffect(() => {
    localStorage.setItem('ts_gallery', JSON.stringify(gallery));
  }, [gallery]);

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

  const startNewChat = (tool) => {
    const newId = Date.now().toString();
    setCurrentChatId(newId);
    setActiveTool(tool);
    setMessages([{ role: 'bot', content: `Bhai, main aapka ${tool.name} AI hoon. Batao kya help karun?` }]);
    setIsMenuOpen(false);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user', content: input };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: currentInput })
      });
      const result = await response.json();
      const botMsg = { role: 'bot', content: result.data || "Bhai, error aa gaya!" };
      const finalMessages = [...updatedMessages, botMsg];
      setMessages(finalMessages);

      const chatIndex = chatHistory.findIndex(c => c.id === currentChatId);
      if (chatIndex > -1) {
        const newHistory = [...chatHistory];
        newHistory[chatIndex].messages = finalMessages;
        setChatHistory(newHistory);
      } else {
        setChatHistory([{ id: currentChatId, tool: activeTool.name, messages: finalMessages, date: new Date().toLocaleDateString() }, ...chatHistory]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', content: "Server Error!" }]);
    }
    setIsLoading(false);
  };

  const downloadMedia = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'toolscout-download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden">
      {/* SIDEBAR */}
      <div className={`fixed inset-y-0 left-0 z-[200] w-80 bg-[#0c0c0c] border-r border-white/5 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <span className="font-black italic uppercase text-blue-500">Dashboard</span>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-white/5 rounded-full"><X size={20}/></button>
          </div>

          <button onClick={() => { setActiveTool(null); setIsMenuOpen(false); }} className="w-full mb-6 py-3 bg-blue-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
            <Plus size={18}/> New Session
          </button>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
            <input 
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-blue-600/50"
              placeholder="Search history..."
              onChange={(e) => setHistorySearchTerm(e.target.value)}
            />
          </div>

          <div className="flex-1 overflow-y-auto space-y-6 no-scrollbar">
            <div>
              <h3 className="text-[10px] font-black uppercase text-gray-500 mb-3 tracking-widest flex items-center gap-2"><History size={12}/> Recent Chats</h3>
              {chatHistory.filter(c => c.tool.toLowerCase().includes(historySearchTerm.toLowerCase())).map(chat => (
                <div key={chat.id} onClick={() => { setActiveTool(allTools.find(t=>t.name === chat.tool) || allTools[0]); setMessages(chat.messages); setCurrentChatId(chat.id); setIsMenuOpen(false); }} 
                className="p-3 hover:bg-white/5 rounded-lg cursor-pointer border border-transparent hover:border-white/10 mb-1 transition-all">
                  <p className="text-sm font-bold truncate text-gray-200">{chat.messages[chat.messages.length-1].content}</p>
                  <p className="text-[10px] text-gray-600 uppercase mt-1">{chat.tool} • {chat.date}</p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-[10px] font-black uppercase text-gray-500 mb-3 tracking-widest flex items-center gap-2"><ImageIcon size={12}/> Media Gallery</h3>
              <div className="grid grid-cols-2 gap-2">
                {gallery.length === 0 && <p className="col-span-2 text-[10px] text-gray-700 italic">No media saved yet...</p>}
                {gallery.map((item, idx) => (
                  <div key={idx} className="relative group rounded-lg overflow-hidden bg-white/5 aspect-square border border-white/5">
                    <img src={item.url} className="w-full h-full object-cover" alt="Saved" />
                    <button onClick={() => downloadMedia(item.url)} className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Download size={18} className="text-white"/>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/90 backdrop-blur-xl border-b border-white/5 h-16 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTool(null)}>
          <div className="bg-blue-600 p-1.5 rounded-lg"><Zap size={18} fill="white" /></div>
          <span className="text-xl font-black tracking-tighter italic uppercase">TOOL<span className="text-blue-600">SCOUT</span></span>
        </div>
        <button onClick={() => setIsMenuOpen(true)} className="p-2 hover:bg-white/5 rounded-full transition-all">
          <Menu size={24} className="text-gray-400" />
        </button>
      </nav>

      {/* MAIN */}
      <main className={`transition-all duration-300 ${activeTool ? 'pt-16' : 'pt-24 pb-20 px-4 max-w-6xl mx-auto'}`}>
        {!activeTool ? (
          <div className="animate-in fade-in duration-700">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter italic uppercase leading-none">Find the perfect <br /><span className="text-blue-600">{words[wordIndex]}</span></h1>
              <div className="relative max-w-2xl mx-auto mt-12 px-4">
                <Search className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input type="text" placeholder="Search 20+ Premium AI Tools..." className="w-full bg-[#0e0e0e] border border-white/10 rounded-full py-6 px-16 focus:outline-none focus:border-blue-600/50 transition-all" onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allTools.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase())).map(tool => (
                <div key={tool.id} onClick={() => startNewChat(tool)} className="group bg-[#0c0c0c] border border-white/5 rounded-[32px] p-8 hover:border-blue-600/50 transition-all cursor-pointer relative overflow-hidden active:scale-95">
                  <div className="mb-6 bg-blue-600/10 w-fit p-4 rounded-2xl text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all"><Sparkles size={24} /></div>
                  <h3 className="text-2xl font-black italic uppercase group-hover:text-blue-500 transition-colors">{tool.name}</h3>
                  <p className="text-gray-500 text-sm mt-2">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-[calc(100vh-64px)] w-full bg-[#050505]">
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-black/40 backdrop-blur-md">
              <div className="flex items-center">
                <button onClick={() => setActiveTool(null)} className="p-2 mr-4 hover:bg-white/5 rounded-full transition-colors"><ArrowLeft size={20} className="text-gray-400"/></button>
                <div>
                  <h2 className="font-black uppercase italic text-sm text-blue-500 tracking-wider">{activeTool.name}</h2>
                  <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">Active Now</p>
                </div>
              </div>
              <button onClick={() => startNewChat(activeTool)} className="hidden md:flex p-2 bg-white/5 hover:bg-blue-600/20 rounded-lg text-[10px] font-black uppercase items-center gap-2 transition-all"><Plus size={14}/> Clear Chat</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 flex flex-col items-center no-scrollbar">
               <div className="w-full max-w-3xl space-y-6">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                    <div className={`max-w-[85%] p-5 rounded-[2rem] text-[15px] leading-relaxed shadow-2xl ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-[#121212] text-gray-200 rounded-tl-none border border-white/5'}`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                   <div className="flex justify-start">
                     <div className="bg-[#121212] border border-white/5 p-4 rounded-3xl animate-pulse text-blue-500 text-[10px] font-black uppercase tracking-widest">Toolscout AI is thinking...</div>
                   </div>
                )}
                <div ref={chatEndRef} />
               </div>
            </div>

            <div className="p-4 md:p-8 flex justify-center sticky bottom-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent">
              <form onSubmit={handleSendMessage} className="relative w-full max-w-3xl flex items-center gap-3 bg-[#121212] border border-white/10 rounded-3xl p-1 shadow-2xl">
                <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Ask ${activeTool.name} anything...`} className="flex-1 bg-transparent py-4 px-6 focus:outline-none text-white text-sm" />
                <button type="submit" disabled={isLoading} className="p-4 bg-blue-600 rounded-2xl mr-1 disabled:opacity-50 transition-all hover:bg-blue-700 shadow-lg shadow-blue-600/20"><Send size={20} /></button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
      }
    
