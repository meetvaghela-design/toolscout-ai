import React, { useState, useEffect } from 'react';
import { Search, Menu, Globe, ExternalLink, Cpu, Image as ImageIcon, MessageSquare, Code, Video, Music, Sparkles } from 'lucide-react';

// --- AI Tools Data ---
const tools = [
  {
    id: 1,
    name: 'ChatGPT',
    description: 'Advanced conversational AI by OpenAI for writing, coding, and brainstorming.',
    category: 'Text',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400',
    link: 'https://chat.openai.com',
    tags: ['Popular', 'Free/Paid']
  },
  {
    id: 2,
    name: 'Midjourney',
    description: 'High-quality AI image generation through Discord commands.',
    category: 'Image',
    image: 'https://images.unsplash.com/photo-1678332822183-4a0058e57833?auto=format&fit=crop&q=80&w=400',
    link: 'https://midjourney.com',
    tags: ['Art', 'Paid']
  },
  {
    id: 3,
    name: 'GitHub Copilot',
    description: 'Your AI pair programmer that helps you write code faster.',
    category: 'Code',
    image: 'https://images.unsplash.com/photo-1662010021854-e67c538ea7a9?auto=format&fit=crop&q=80&w=400',
    link: 'https://github.com/features/copilot',
    tags: ['Developer', 'Subscription']
  }
];

// --- Main App Component ---
export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Text', 'Image', 'Code', 'Video', 'Music'];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img 
                src="/logo.png" 
                alt="ToolScout" 
                className="h-10 w-10 object-contain mr-2" 
                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/40?text=TS'; }}
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-tight">
                ToolScout
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
              {['Tools', 'Categories', 'About'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-cyan-400 transition-colors">
                  {item}
                </a>
              ))}
              <button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-5 py-2 rounded-full transition-all shadow-lg shadow-cyan-500/20 flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                Submit Tool
              </button>
            </div>
            <div className="md:hidden text-gray-400"><Menu className="w-6 h-6" /></div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-400">Discover the Next Generation of AI Tools</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            Find the perfect <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              AI companion
            </span>
          </h1>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors w-5 h-5" />
            <input
              type="text"
              placeholder="Search for AI tools (e.g. ChatGPT, Midjourney...)"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full border transition-all ${
                  selectedCategory === category
                    ? 'bg-cyan-500 border-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                    : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {filteredTools.map((tool) => (
              <div key={tool.id} className="group bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/[0.08] transition-all hover:-translate-y-1 hover:border-white/20">
                <div className="relative h-48 mb-6 overflow-hidden rounded-2xl">
                  <img src={tool.image} alt={tool.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-white/10 text-cyan-400">
                    {tool.category}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{tool.name}</h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-2">{tool.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex gap-2">
                    {tool.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-wider text-gray-500 border border-white/5 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a href={tool.link} target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-lg hover:bg-cyan-500 hover:text-white transition-all">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
              }
                  
