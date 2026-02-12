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
    { "id": "14", "name": "HeyGen", "desc": "AI avatars with lip-sync.", "category": "Video" },
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
        body: JSON.stringify({ prompt: input || "File attached" })
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
      setMessages(p => [...p, { role: 'bot', content: "Error connecting to AI!" }]);
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
              <button onClick={() => setDeleteConfirmId(null)} className="flex-1 py-4 bg-white/5 rounded-2xl text-[10px] font-black uppercase">Cancel</button>
              <button onClick={() => { setChatHistory(chatHistory.filter(c => c.id !== deleteConfirmId)); setDeleteConfirmId(null); if(currentChatId === deleteConfirmId) setActiveTool(null); }} className="flex-1 py-4 bg-red-600 rounded-2xl text-[10px] font-black uppercase">Delete</button>
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
              <div key={chat.id} onClick={() => { setActiveTool(allTools.find(t=>t.name === chat.tool) || allTools
      
