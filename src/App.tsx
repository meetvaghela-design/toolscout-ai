import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, Zap, ArrowRight, X, Menu, ArrowLeft, Send, History, Plus, Trash2, Image as ImageIcon, AlertCircle, Paperclip, FileText, Play } from 'lucide-react';

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
  const [currentChatId, setCurrentChatId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); // File state
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const words = ['Video Editor', 'Script Writer', 'SEO Expert', 'Voice Artist', 'Thumbnail Designer'];
  
  const allTools = [
    { "id": "1", "name": "ChatGPT-4", "desc": "Ultimate AI for writing and coding.", "category": "Text", "pro": true },
    { "id": "2", "name": "Midjourney v6", "desc": "AI image generation for pros.", "category": "Image", "pro": true },
    { "id": "4", "name": "Runway Gen-3", "desc": "Text-to-video generation tool.", "category": "Video", "pro": true }
  ];

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('ts_history') || '[]');
    setChatHistory(savedHistory);
  }, []);

  useEffect(() => {
    localStorage.setItem('ts_history', JSON.stringify(chatHistory));
  }, [chatHistory]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile({
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file)
      });
    }
  };

  const startNewChat = (tool) => {
    const newId = Date.now().toString();
    setCurrentChatId(newId);
    setActiveTool(tool);
    setMessages([{ role: 'bot', content: `Bhai, main aapka ${tool.name} AI hoon.\n\nBatao aaj kya file ya text pe kaam karna hai?` }]);
    setIsMenuOpen(false);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if ((!input.trim() && !selectedFile) || isLoading) return;

    const userMsg = { 
      role: 'user', 
      content: input,
      file: selectedFile // Attach file to message
    };
    
    setMessages([...messages, userMsg]);
    setInput('');
    setSelectedFile(null); // Clear preview
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input || "User has attached a file." })
      });
      const result = await response.json();
      setMessages(prev => [...prev, { role: 'bot', content: result.data }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', content: "Server Error!" }]);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden">
      
      {/* DELETE MODAL (Same as before) */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#121212] border border-white/10 p-6 rounded-[2rem] max-w-sm w-full">
            <h3 className="font-black italic uppercase text-red-500 mb-4 flex items-center gap-2"><AlertCircle/> Delete?</h3>
            <p className="text-gray-400 text-sm mb-6">Bhai, chat delete karun?</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirmId(null)} className="flex-1 py-3 bg-white/5 rounded-xl text-xs font-bold uppercase">No</button>
              <button onClick={() => { setChatHistory(chatHistory.filter(c => c.id !== deleteConfirmId)); setDeleteConfirmId(null); if(currentChatId === deleteConfirmId) setActiveTool(null); }} className="flex-1 py-3 bg-red-600 rounded-xl text-xs font-bold uppercase">Yes</button>
            </div>
          </div>
        </div>
      )}

      {/* SIDEBAR */}
      <div className={`fixed inset-y-0 left-0 z-[200] w-72 bg-[#0c0c0c] border-r border-white/5 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <span className="font-black italic text-blue-500 uppercase">Dashboard</span>
            <button onClick={() => setIsMenuOpen(false)} className="p-1"><X size={20}/></button>
          </div>
          <button onClick={() => { setActiveTool(null); setIsMenuOpen(false); }} className="w-full mb-6 py-3 bg-blue-600 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"><Plus size={16}/> New Chat</button>
          <div className="flex-1 overflow-y-auto space-y-2 no-scrollbar">
            {chatHistory.map(chat => (
              <div key={chat.id} onClick={() => { setActiveTool(allTools.find(t=>t.name === chat.tool) || allTools[0]); setMessages(chat.messages); setCurrentChatId(chat.id); setIsMenuOpen(false); }} className="p-3 hover:bg-white/5 rounded-lg cursor-pointer flex justify-between items-center group">
                <p className="text-xs font-medium truncate text-gray-400">{chat.messages[chat.messages.length-1].content}</p>
                <Trash2 size={14} className="text-gray-600 opacity-0 group-hover:opacity-100 hover:text-red-500" onClick={(e) => { e.stopPropagation(); setDeleteConfirmId(chat.id); }}/>
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
        <button onClick={() => setIsMenuOpen(true)}><Menu size={24} className="text-gray-400" /></button>
      </nav>

      <main className={`transition-all duration-300 ${activeTool ? 'pt-16' : 'pt-24 pb-20 px-4 max-w-6xl mx-auto'}`}>
        {!activeTool ? (
          <div className="text-center animate-in fade-in duration-700">
            <h1 className="text-5xl md:text-8xl font-black mb-6 italic uppercase">Find your <br /><span className="text-blue-600 tracking-tighter">{words[wordIndex]}</span></h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              {allTools.map(tool => (
                <div key={tool.id} onClick={() => startNewChat(tool)} className="bg-[#0c0c0c] border border-white/5 rounded-[32px] p-8 hover:border-blue-600/50 transition-all cursor-pointer">
                  <Sparkles size={24} className="text-blue-500 mb-4"/>
                  <h3 className="text-2xl font-black italic uppercase">{tool.name}</h3>
                  <p className="text-gray-500 text-sm mt-2">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-[calc(100vh-64px)]">
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 flex flex-col items-center no-scrollbar pb-32">
              <div className="w-full max-w-3xl space-y-6">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-5 rounded-[2rem] text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-[#121212] text-gray-200 rounded-tl-none border border-white/5 whitespace-pre-line'}`}>
                      {msg.file && (
                        <div className="mb-3 rounded-xl overflow-hidden bg-black/20 p-2 border border-white/10">
                          {msg.file.type.startsWith('image/') ? <img src={msg.file.url} className="max-h-60 rounded-lg" /> : <div className="flex items-center gap-2 p-2"><FileText size={20}/> <span className="text-xs truncate">{msg.file.name}</span></div>}
                        </div>
                      )}
                      {msg.content}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            </div>

            {/* ATTACHMENT PREVIEW */}
            <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4">
              {selectedFile && (
                <div className="bg-[#121212] border border-blue-600/30 p-3 rounded-2xl flex items-center justify-between animate-in slide-in-from-bottom-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-600/20 p-2 rounded-lg text-blue-500">
                      {selectedFile.type.startsWith('image/') ? <ImageIcon size={20}/> : <FileText size={20}/>}
                    </div>
                    <div>
                      <p className="text-xs font-bold truncate max-w-[150px]">{selectedFile.name}</p>
                      <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest">Ready to upload</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedFile(null)} className="p-2 hover:bg-white/5 rounded-full"><X size={16}/></button>
                </div>
              )}
            </div>

            {/* INPUT AREA */}
            <div className="p-4 md:p-8 flex justify-center sticky bottom-0 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent">
              <form onSubmit={handleSendMessage} className="relative w-full max-w-3xl flex items-center gap-2 bg-[#121212] border border-white/10 rounded-[2.5rem] p-1.5 shadow-2xl">
                <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept="image/*,video/*,application/pdf" />
                <button type="button" onClick={() => fileInputRef.current.click()} className="p-4 text-gray-400 hover:text-blue-500 transition-colors"><Paperclip size={22} /></button>
                <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Message ${activeTool.name}...`} className="flex-1 bg-transparent py-4 px-2 focus:outline-none text-white text-sm" />
                <button type="submit" className="p-4 bg-blue-600 rounded-full hover:bg-blue-700 transition-all"><Send size={20} /></button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
        }
      
