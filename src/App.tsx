import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, Zap, ArrowRight, X, Menu, ArrowLeft, Send, Paperclip, Info, Mail } from 'lucide-react';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTool, setActiveTool] = useState(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const chatEndRef = useRef(null);

  const words = ['Video Editor', 'Script Writer', 'SEO Expert', 'Voice Artist', 'Thumbnail Designer'];
  
  const allTools = [
    { "id": "1", "name": "ChatGPT-4", "desc": "Ultimate AI for writing, coding, and brainstorming.", "category": "Text", "pro": true },
    { "id": "2", "name": "Midjourney v6", "desc": "Industry leading AI image generation for pros.", "category": "Image", "pro": true },
    { "id": "3", "name": "ElevenLabs", "desc": "Human-like AI voice cloning and speech synthesis.", "category": "Audio", "pro": true },
    { "id": "4", "name": "Runway Gen-3", "desc": "Professional text-to-video generation tool.", "category": "Video", "pro": true },
    { "id": "5", "name": "Adobe Firefly", "desc": "Generative AI integrated into Photoshop workflow.", "category": "Design", "pro": true },
    { "id": "6", "name": "Canva Magic", "desc": "AI-powered design tools for social media.", "category": "Design", "pro": false },
    { "id": "7", "name": "HeyGen", "desc": "AI avatars for professional video presentations.", "category": "Video", "pro": true },
    { "id": "8", "name": "Descript", "desc": "Edit video and audio by editing the transcript text.", "category": "Video", "pro": true },
    { "id": "9", "name": "Perplexity AI", "desc": "AI search engine for deep research and citations.", "category": "Research", "pro": false },
    { "id": "10", "name": "Lovo.ai", "desc": "Premium AI voices for creators and marketers.", "category": "Audio", "pro": true },
    { "id": "11", "name": "Grammarly", "desc": "AI writing assistant for clear communication.", "category": "Text", "pro": false },
    { "id": "12", "name": "Jasper", "desc": "Enterprise AI for marketing and blog writing.", "category": "Marketing", "pro": true },
    { "id": "13", "name": "Leonardo.ai", "desc": "Advanced AI image generator with fine controls.", "category": "Image", "pro": false },
    { "id": "14", "name": "Veed.io", "desc": "Online video editor with AI subtitles and effects.", "category": "Video", "pro": false },
    { "id": "15", "name": "Surfer SEO", "desc": "AI tool to rank your content on Google.", "category": "SEO", "pro": true },
    { "id": "16", "name": "Suno AI", "desc": "Generate full high-quality songs with AI.", "category": "Audio", "pro": true },
    { "id": "17", "name": "Gamma AI", "desc": "Create stunning presentations and websites instantly.", "category": "Design", "pro": false },
    { "id": "18", "name": "Copy.ai", "desc": "AI copywriting for social media and ads.", "category": "Marketing", "pro": false },
    { "id": "19", "name": "Murf AI", "desc": "Professional studio-quality AI voiceovers.", "category": "Audio", "pro": true },
    { "id": "20", "name": "Adobe Podcast", "desc": "AI to clean audio and make it studio quality.", "category": "Audio", "pro": false }
  ];

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

  const filteredTools = allTools.filter(tool => 
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
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
      setMessages(prev => [...prev, { role: 'bot', content: result.data || "Bhai, AI se jawab nahi mil paya. Key check karo!" }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', content: "Server Error: AI connected nahi h!" }]);
    }
    setIsLoading(false);
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
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 hover:bg-white/5 rounded-full transition-all">
          <Menu size={24} className="text-gray-400" />
        </button>
      </nav>

      <main className={`transition-all duration-300 ${activeTool ? 'pt-16' : 'pt-24 pb-20 px-4 md:px-6 max-w-6xl mx-auto'}`}>
        {!activeTool ? (
          <div className="animate-in fade-in duration-700">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter italic uppercase leading-none">
                Find the perfect <br />
                <span className="text-blue-600">{words[wordIndex]}</span>
              </h1>
              <div className="relative max-w-2xl mx-auto mt-12 px-4">
                <Search className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input type="text" placeholder="Search 20+ Premium AI Tools..." className="w-full bg-[#0e0e0e] border border-white/10 rounded-full py-6 px-16 focus:outline-none focus:border-blue-600/50 text-base shadow-2xl" onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
              {filteredTools.map(tool => (
                <div key={tool.id} onClick={() => {setActiveTool(tool); setMessages([{role:'bot', content: `Bhai, main aapka ${tool.name} AI hoon. Batao kya help karun?`}]);}} className="group bg-[#0c0c0c] border border-white/5 rounded-[32px] p-8 hover:border-blue-600/50 transition-all cursor-pointer relative overflow-hidden active:scale-95">
                  <div className="mb-6 bg-blue-600/10 w-fit p-4 rounded-2xl text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Sparkles size={24} />
                  </div>
                  <h3 className="text-2xl font-black mb-2 italic uppercase group-hover:text-blue-500 transition-colors">{tool.name}</h3>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed">{tool.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">{tool.category}</span>
                    <ArrowRight size={18} className="text-blue-600 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                  </div>
                  {tool.pro && <div className="absolute top-6 right-6 text-[10px] font-black bg-blue-600 px-3 py-1 rounded-full uppercase italic shadow-lg">PRO</div>}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-[calc(100vh-64px)] w-full bg-[#050505] animate-in slide-in-from-right-4">
            <div className="px-6 py-4 border-b border-white/5 flex items-center bg-black/40 backdrop-blur-md">
              <button onClick={() => setActiveTool(null)} className="p-2 mr-4 hover:bg-white/5 rounded-full transition-colors">
                <ArrowLeft size={20} className="text-gray-400" />
              </button>
              <div>
                <h2 className="font-black uppercase italic text-sm tracking-widest text-blue-500">{activeTool.name}</h2>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Active Now</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 flex flex-col items-center">
               <div className="w-full max-w-3xl space-y-6">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[90%] md:max-w-[80%] p-5 rounded-[2rem] text-[15px] leading-relaxed shadow-xl ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-[#121212] text-gray-200 rounded-tl-none border border-white/5'}`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-[#121212] border border-white/5 p-4 rounded-3xl animate-pulse text-blue-500 text-xs font-black uppercase tracking-widest">
                      Toolscout AI is thinking...
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
               </div>
            </div>

            <div className="p-4 md:p-8 bg-gradient-to-t from-[#050505] flex justify-center sticky bottom-0">
              <form onSubmit={handleSendMessage} className="relative w-full max-w-3xl flex items-center gap-3 bg-[#121212] border border-white/10 rounded-3xl p-1 shadow-2xl">
                <input 
                  type="text" 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  placeholder={`Ask ${activeTool.name} anything...`} 
                  className="flex-1 bg-transparent py-4 px-6 focus:outline-none text-sm text-white" 
                />
                <button type="submit" className="p-4 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/20 mr-1 disabled:opacity-50" disabled={isLoading}>
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
      
      {!activeTool && (
        <footer className="py-12 px-6 border-t border-white/5 text-center mt-10">
           <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.4em]">
             Site Created by <span className="text-white">Meet</span>
           </p>
        </footer>
      )}
    </div>
  );
    }
    
