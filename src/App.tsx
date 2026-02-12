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
  
  // AB SARE 20 TOOLS WAPAS AA GAYE HAIN
  const allTools = [
    { "id": "1", "name": "ChatGPT-4", "desc": "Ultimate AI for writing, coding, and brainstorming.", "category": "Text" },
    { "id": "2", "name": "Midjourney v6", "desc": "Industry leading AI image generation for pros.", "category": "Image" },
    { "id": "3", "name": "ElevenLabs", "desc": "Human-like AI voice cloning and speech synthesis.", "category": "Audio" },
    { "id": "4", "name": "Runway Gen-3", "desc": "Professional text-to-video generation tool.", "category": "Video" },
    { "id": "5", "name": "Claude 3.5", "desc": "Advanced reasoning and long-form writing AI.", "category": "Text" },
    { "id": "6", "name": "DALL-E 3", "desc": "Creative and accurate image generation by OpenAI.", "category": "Image" },
    { "id": "7", "name": "Luma Dream Machine", "desc": "High-quality realistic video generation.", "category": "Video" },
    { "id": "8", "name": "Jasper AI", "desc": "Expert AI for marketing and ad copywriting.", "category": "Text" },
    { "id": "9", "name": "Suno AI", "desc": "Generate full high-quality songs with vocals.", "category": "Audio" },
    { "id": "10", "name": "Canva Magic Studio", "desc": "All-in-one AI design suite for creators.", "category": "Design" },
    { "id": "11", "name": "Pika Labs", "desc": "Cinematic animation and video styling AI.", "category": "Video" },
    { "id": "12", "name": "Perplexity AI", "desc": "AI search engine with real-time web access.", "category": "Search" },
    { "id": "13", "name": "Leonardo.ai", "desc": "Fine-tuned image generation and editing.", "category": "Image" },
    { "id": "14", "name": "HeyGen", "desc": "Create AI avatars with perfect lip-sync.", "category": "Video" },
    { "id": "15", "name": "InVideo AI", "desc": "Turn scripts into complete YouTube videos.", "category": "Video" },
    { "id": "16", "name": "Descript", "desc": "Edit audio and video like a text document.", "category": "Audio" },
    { "id": "17", "name": "Gamma AI", "desc": "Generate presentations and docs instantly.", "category": "Design" },
    { "id": "18", "name": "Stable Diffusion", "desc": "Powerful open-source image generation.", "category": "Image" },
    { "id": "19", "name": "Copy.ai", "desc": "Automate your sales and marketing copy.", "category": "Text" },
    { "id": "20", "name": "Adobe Firefly", "desc": "Professional creative filling and editing.", "category": "Design" }
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
        setGallery(prev => [selectedFile, ...prev]);
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
      setMessages(prev => [...prev, { role: 'bot', content: "Server Error!" }]);
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
            <p className="text-gray-400 text-sm mb-8">Bhai, ye chat uda doon?</p>
            <div className="flex gap-4">
              <button onClick={() => setDeleteConfirmId(null)} className="flex-1 py-4 bg-white/5 rounded-2xl text-xs font-black uppercase tracking-widest">Nahi</button>
              <button onClick={() => { setChatHistory(chatHistory.filter(c => c.id !== deleteConfirmId)); setDeleteConfirmId(null); if(currentChatId === deleteConfirmId) setActiveTool(null); }} className="flex-1 py-4 bg-red-600 rounded-2xl text-xs font-black uppercase tracking-widest">Haan</button>
            </div>
          </div>
        </div>
      )}

      {/* SIDEBAR */}
      <div className={`fixed inset-y-0 left-0 z-[200] w-80 bg-[#0c0c0c] border-r border-white/5 transform transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <span className="font-black italic text-blue-500 text-xl tracking-tighter uppercase">DASHBOARD</span>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-white/5 rounded-full"><X size={24}/></button>
          </div>
          
          <button onClick={() => { setActiveTool(null); setIsMenuOpen(false); }} className="w-full mb-8 py-4 bg-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2">
            <Plus size={18}/> New Chat
          </button>

          <div className="flex-1 overflow-y-auto space-y-8 no-scrollbar">
            {/* HISTORY SEARCH */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={14} />
              <input className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 text-xs focus:outline-none focus:border-blue-600" placeholder="Search chats..." onChange={(e) => setHistorySearchTerm(e.target.value)} />
            </div>

            {/* HISTORY */}
            <div>
              <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-4 flex items-center gap-2"><History size={12}/> History</h3>
              <div className="space-y-2">
                {chatHistory.filter(c => c.tool.toLowerCase().includes(historySearchTerm.toLowerCase())).map(chat => (
                  <div key={chat.id} onClick={() => { setActiveTool(allTools.find(t=>t.name === chat.tool) || allTools[0]); setMessages(chat.messages); setCurrentChatId(chat.id); setIsMenuOpen(false); }} 
                  className="p-4 bg-white/[0.02] hover:bg-white/5 rounded-2xl cursor-pointer border border-white/5 transition-all group flex justify-between items-center">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate text-gray-400 group-hover:text-white">{chat.messages[chat.messages.length-1].content}</p>
                      <p className="text-[9px] text-gray-600 uppercase mt-1">{chat.tool}</p>
                    </div>
                    <Trash2 size={14} className="text-gray-700 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all" onClick={(e) => { e.stopPropagation(); setDeleteConfirmId(chat.id); }}/>
                  </div>
                ))}
              </div>
            </div>

            {/* GALLERY */}
            {gallery.length > 0 && (
              <div>
                <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-4 flex items-center gap-2"><ImageIcon size={12}/> Gallery</h3>
                <div className="grid grid-cols-2 gap-3">
                  {gallery.slice(0, 4).map((img, i) => (
                    <div key={i} className="group relative aspect-square rounded-xl overflow-hidden border border-white/5 bg-white/5">
                      <img src={img.url} className="w-full h-full object-cover" />
                      <button onClick={() => downloadMedia(img.url)} className="absolute inset-0 bg-blue-600/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all"><Download size={18}/></button>
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
        <button onClick={() => setIsMenuOpen(true)} className="p-2 hover:
    
