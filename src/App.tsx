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
    { "id": "4", "name": "Runway Gen-3", "desc": "Text-to-video generation tool.", "category": "Video" }
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
  }, [chatHistory, gallery]);

  useEffect(() => {
    if (!activeTool) {
      const interval = setInterval(() => setWordIndex((p) => (p + 1) % words.length), 2500);
      return () => clearInterval(interval);
    }
  }, [activeTool]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileData = { name: file.name, type: file.type, url: URL.createObjectURL(file) };
      setSelectedFile(fileData);
    }
  };

  const downloadMedia = (url, name) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = name || 'toolscout-media';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if ((!input.trim() && !selectedFile) || isLoading) return;

    const userMsg = { role: 'user', content: input, file: selectedFile };
    if (selectedFile && selectedFile.type.startsWith('image/')) {
        setGallery(prev => [selectedFile, ...prev]); // Add to gallery
    }
    
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    const currentInput = input;
    setInput('');
    setSelectedFile(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: currentInput || "User sent a file." })
      });
      const result = await response.json();
      const finalMsgs = [...updatedMessages, { role: 'bot', content: result.data }];
      setMessages(finalMsgs);
      
      const chatIdx = chatHistory.findIndex(c => c.id === currentChatId);
      if (chatIdx > -1) {
        const newHist = [...chatHistory];
        newHist[chatIdx].messages = finalMsgs;
        setChatHistory(newHist);
      } else {
        setChatHistory([{ id: currentChatId, tool: activeTool.name, messages: finalMsgs, date: new Date().toLocaleDateString() }, ...chatHistory]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', content: "Bhai, error aa gaya!" }]);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden">
      
      {/* DELETE MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-[#121212] border border-white/10 p-8 rounded-[2.5rem] max-w-sm w-full shadow-2xl animate-in zoom-in-95">
            <h3 className="font-black italic uppercase text-red-500 mb-2 flex items-center gap-2 text-xl"><AlertCircle/> Delete?</h3>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">Bhai, ye chat hamesha ke liye gayab ho jayegi. Pakka?</p>
            <div className="flex gap-4">
              <button onClick={() => setDeleteConfirmId(null)} className="flex-1 py-4 bg-white/5 rounded-2xl text-xs font-black uppercase tracking-widest">Nahi</button>
              <button onClick={() => { setChatHistory(chatHistory.filter(c => c.id !== deleteConfirmId)); setDeleteConfirmId(null); if(currentChatId === deleteConfirmId) setActiveTool(null); }} className="flex-1 py-4 bg-red-600 rounded-2xl text-xs font-black uppercase tracking-widest">Haan, Uda Do</button>
            </div>
          </div>
        </div>
      )}

      {/* SIDEBAR */}
      <div className={`fixed inset-y-0 left-0 z-[200] w-80 bg-[#0c0c0c] border-r border-white/5 transform transition-transform duration-500 cubic-bezier ${isMenuOpen ? 'translate-x-0 shadow-[30px_0_60px_rgba(0,0,0,0.9)]' : '-translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <span className="font-black italic text-blue-500 text-xl tracking-tighter uppercase">DASHBOARD</span>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-white/5 rounded-full"><X size={24}/></button>
          </div>
          
          <button onClick={() => { setActiveTool(null); setIsMenuOpen(false); }} className="w-full mb-8 py-4 bg-blue-600 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 active:scale-95 transition-all">
            <Plus size={18}/> New Chat
          </button>

          <div className="flex-1 overflow-y-auto space-y-8 no-scrollbar">
            {/* HISTORY */}
            <div>
              <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] mb-4">Recent History</h3>
              <div className="space-y-2">
                {chatHistory.map(chat => (
                  <div key={chat.id} onClick={() => { setActiveTool(allTools.find(t=>t.name === chat.tool) || allTools[0]); setMessages(chat.messages); setCurrentChatId(chat.id); setIsMenuOpen(false); }} 
                  className="p-4 bg-white/[0.02] hover:bg-white/5 rounded-2xl cursor-pointer border border-white/5 transition-all group flex justify-between items-center">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate text-gray-400 group-hover:text-white transition-colors">{chat.messages[chat.messages.length-1].content}</p>
                      <p className="text-[9px] text-gray-600 uppercase mt-1 font-black">{chat.tool} • {chat.date}</p>
                    </div>
                    <Trash2 size={14} className="text-gray-700 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all ml-2" onClick={(e) => { e.stopPropagation(); setDeleteConfirmId(chat.id); }}/>
                  </div>
                ))}
              </div>
            </div>

            {/* GALLERY */}
            {gallery.length > 0 && (
              <div>
                <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] mb-4">Media Gallery</h3>
                <div className="grid grid-cols-2 gap-3">
                  {gallery.slice(0, 6).map((img, i) => (
                    <div key={i} className="group relative aspect-square rounded-xl overflow-hidden border border-white/5 bg-white/5">
                      <img src={img.url} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                      <button onClick={() => downloadMedia(img.url, img.name)} className="absolute inset-0 bg-blue-600/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                        <Download size={20}/>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur-2xl border-b border-white/5 h-16 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTool(null)}>
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-600/20"><Zap size={20} fill="white" /></div>
          <span className="text-2xl font-black tracking-tighter italic uppercase">TOOL<span className="text-blue-600">SCOUT</span></span>
        </div>
        <button onClick={() => setIsMenuOpen(true)} className="p-2 hover:bg-white/5 rounded-xl transition-all"><Menu size={28} className="text-gray-400" /></button>
      </nav>

      <main className={`transition-all duration-500 ${activeTool ? 'pt-16' : 'pt-24 pb-20 px-4 max-w-6xl mx-auto'}`}>
        {!activeTool ? (
          <div className="text-center animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <h1 className="text-6xl md:text-9xl font-black mb-8 italic uppercase leading-[0.85] tracking-tighter">Find your <br /><span className="text-blue-600">Creative {words[wordIndex]}</span></h1>
            <div className="relative max-w-2xl mx-auto mt-20 group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-500" size={24} />
              <input type="text" placeholder="Search 20+ Premium AI Tools..." className="relative w-full bg-[#0e0e0e] border border-white/10 rounded-full py-7 px-20 focus:outline-none focus:border-blue-600/50 shadow-3xl text-lg" onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
              {allTools.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase())).map(tool => (
                <div key={tool.id} onClick={() => { setCurrentChatId(Date.now().toString()); setActiveTool(tool); setMessages([{role:'bot', content: `Bhai, main aapka ${tool.name} AI hoon.\n\nBatao kya design ya write karna hai?`}]); }} className="group bg-[#0c0c0c] border border-white/5 rounded-[40px] p-10 hover:border-blue-600/50 transition-all cursor-pointer relative overflow-hidden active:scale-95 shadow-2xl">
                  <div className="mb-8 bg-blue-600/10 w-fit p-5 rounded-3xl text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500"><Sparkles size={32} /></div>
                  <h3 className="text-3xl font-black italic uppercase group-hover:text-blue-500 transition-colors leading-none">{tool.name}</h3>
                  <p className="text-gray-500 text-sm mt-4 leading-relaxed font-medium">{tool.desc}</p>
                  <div className="mt-8 flex items-center text-xs font-black uppercase tracking-widest text-blue-600 gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">Start Crafting <ArrowRight size={14}/></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-[calc(100vh-64px)] bg-[#050505]">
            {/* CHAT HEADER */}
            <div className="px-8 py-5 border-b border-white/5 flex items-center bg-black/40 backdrop-blur-xl justify-between">
              <div className="flex items-center">
                <button onClick={() => setActiveTool(null)} className="p-3 mr-4 hover:bg-white/5 rounded-2xl transition-all border border-transparent hover:border-white/10"><ArrowLeft size={20}/></button>
                <div>
                  <h2 className="font-black uppercase italic text-sm text-blue-500 tracking-widest leading-none">{activeTool.name}</h2>
                  <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em] mt-1">Quantum Interface Active</p>
                </div>
              </div>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-6 md:p-12 space-y-10 flex flex-col items-center no-scrollbar pb-40">
               <div className="w-full max-w-3xl space-y-10">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-5 duration-500`}>
                    <div className={`max-w-[90%] p-7 rounded-[2.5rem] text-[15px] leading-relaxed shadow-2xl transition-all ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-none font-medium' 
                        : 'bg-[#0c0c0c] text-gray-200 rounded-tl-none border border-white/5 whitespace-pre-line'
                    }`}>
                      {msg.file && (
                        <div className="mb-5 rounded-[1.5rem] overflow-hidden bg-black/30 border border-white/10 group relative">
                          {msg.file.type.startsWith('image/') ? (
                             <>
                               <img src={msg.file.url} className="w-full max-h-[400px] object-cover" />
                               <button onClick={() => downloadMedia(msg.file.url)} className="absolute top-4 right-4 p-3 bg-black/60 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-all"><Download size={18}/></button>
                             </>
                          ) : (
                             <div className="flex items-center gap-4 p-5">
                               <div className="bg-blue-600/20 p-3 rounded-xl text-blue-500"><FileText size={24}/></div>
                               <div className="flex-1 min-w-0"><p className="text-xs font-black truncate uppercase tracking-widest">{msg.file.name}</p></div>
                               <button onClick={() => downloadMedia(msg.file.url)} className="p-3 hover:bg-white/5 rounded-full"><Download size={18}/></button>
                             </div>
                          )}
                        </div>
                      )}
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                   <div className="flex justify-start animate-pulse">
                     <div className="bg-[#0c0c0c] border border-white/5 p-5 rounded-[2rem] text-blue-500 text-[10px] font-black uppercase tracking-[0.3em] italic">Synthesizing Response...</div>
                   </div>
                )}
                <div ref={chatEndRef} />
               </div>
            </div>

            {/* INPUT */}
            <div className="fixed bottom-0 left-0 right-0 p-6 md:p-10 flex justify-center bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent pointer-events-none">
              <div className="w-full max-w-3xl pointer-events-auto">
                {selectedFile && (
                  <div className="mb-4 mx-4 p-4 bg-[#0c0c0c] border border-blue-600/30 rounded-3xl flex items-center justify-between animate-in slide-in-from-bottom-4 shadow-2xl backdrop-blur-xl">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl overflow-hidden bg-blue-600/10 flex items-center justify-center text-blue-500">
                        {selectedFile.type.startsWith('image/') ? <img src={selectedFile.url} className="h-full w-full object-cover"/> : <FileText size={20}/>}
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-widest truncate max-w-[150px]">{selectedFile.name}</p>
                        <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest mt-1">Ready to transmit</p>
                      </div>
                    </div>
                    <button onClick={() => setSelectedFile(null)} className="p-3 hover:bg-white/5 rounded-full transition-colors"><X size={18}/></button>
                  </div>
                )}
                
                <form onSubmit={handleSendMessage} className="relative flex items-center gap-3 bg-[#0c0c0c] border border-white/10 rounded-[2.5rem] p-2 shadow-2xl backdrop-blur-xl focus-within:border-blue-600/50 transition-all">
                  <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" />
                  <button type="button" onClick={() => fileInputRef.current.click()} className="p-5 text-gray-500 hover:text-blue-500 transition-all hover:rotate-12"><Paperclip size={24} /></button>
                  <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Tell ${activeTool.name} what to do...`} className="flex-1 bg-transparent py-5 px-2 focus:outline-none text-white text-sm font-medium" />
                  <button type="submit" disabled={isLoading} className="p-5 bg-blue-600 rounded-full hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/40 disabled:opacity-50"><Send size={24} /></button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
    }
    
