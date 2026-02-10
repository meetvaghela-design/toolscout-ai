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
  
  // 100% Safe Data - No external file needed
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

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', content: `Bhai, main aapka ${activeTool.name} AI assistant hoon. Jald hi main live kaam karunga!` }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-600/30 overflow-x-hidden">
      <nav
                                        
