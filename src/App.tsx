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
    { "id": "4", "name": "Runway Gen-3", "desc": "Professional text-to-video generation tool.", "category": "Video", "pro": true },
    { "id": "16", "name": "Suno AI", "desc": "Generate full high-quality songs with AI.", "category": "Audio", "pro": true },
    // ... baaki tools list
  ];

  // Load Data from LocalStorage
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('ts_history') || '[]');
    const savedGallery = JSON.parse(localStorage.getItem('ts_gallery') || '[]');
    setChatHistory(savedHistory);
    setGallery(savedGallery);
  }, []);

  // Save to LocalStorage whenever they change
  useEffect(() => {
    localStorage.setItem('ts_history', JSON.stringify(chatHistory));
  }, [chatHistory]);

  useEffect(() => {
    localStorage.setItem('ts_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    if (!activeTool) {
      const interval = setInterval(() => setWordIndex((prev) => (prev + 1) % words.length), 2500);
      return () => clearInterval(interval);
    }
  }, [activeTool]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startNewChat = (tool = activeTool) => {
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
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input })
      });
      const result = await response.json();
      const botMsg = { role: 'bot', content: result.data || "Bhai error aa gaya!" };
      const finalMessages = [...updatedMessages, botMsg];
      setMessages(finalMessages);

      // Save to History
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

  const downloadMedia = (url, name) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = name || 'toolscout-media';
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
            <span className="font-black italic uppercase text-blue-500">History & Media</span>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-white/5 rounded-full"><X size={20}/></button>
          </div>

          <button onClick={() => { setActiveTool(null); setIsMenuOpen(false); }} className="w-full mb-4 py-3 bg-blue-600 rounded-xl font-bold flex items-center justify-center gap-2">
            <Plus size={18}/> New Chat
          </button>

          {/* Search History */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
            <input 
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-xs focus:outline-none"
              placeholder="Search chats..."
              onChange={(e) => setHistorySearchTerm(e.target.value)}
            />
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 no-scrollbar">
            <div>
              <h3 className="text-[10px] font-black uppercase text-gray-500 mb-3 tracking-widest flex items-center gap-2"><History size={12}/> Recent Chats</h3>
              {chatHistory.filter(c => c.tool.toLowerCase().includes(historySearchTerm.toLowerCase())).map(chat => (
                <div key={chat.id} onClick={() => { setActiveTool(allTools.find(t=>t.name === chat.tool) || allTools[0]); setMessages(chat.messages); setCurrentChatId(chat.id); setIsMenuOpen(false); }} 
                className="p-3 hover:bg-white/5 rounded-lg cursor-pointer border border-transparent hover:border-white/10 mb-2">
                  <p className="text-sm font-bold truncate">{chat.messages[chat.messages.length-1].content}</p>
                  <p className="text-[10px] text-gray-600 uppercase mt-1">{chat.tool} • {chat.date}</p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-[10px] font-black uppercase text-gray-500 mb-3 tracking-widest flex items-center gap-2"><ImageIcon size={12}/> Media Gallery</h3>
              <div className="grid grid-cols-2 gap-2">
                {gallery.map((item, idx) => (
                  <div key={idx} className="relative group rounded-lg overflow-
    
