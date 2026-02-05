import { useState, useMemo } from 'react';
import { Search, Sparkles, Shield, Zap, Play, PenTool as Pen, Layout, ExternalLink, Star, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import directoryData from '../data/directoryData.json';

const IconMap = {
  spark: Sparkles,
  pen: Pen,
  play: Play,
  code: Layout
};

export function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredTools = useMemo(() => {
    return directoryData.tools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchesFilter = selectedFilter === 'All' || tool.price === selectedFilter;
      return matchesSearch && matchesCategory && matchesFilter;
    });
  }, [searchQuery, selectedCategory, selectedFilter]);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
              Find the Best <span className="text-indigo-600 dark:text-indigo-400">AI Tools</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              Discover curated AI tools to supercharge your workflow. From writing to coding, we've got you covered.
            </p>
            
            {/* Search Bar */}
            <div className="mx-auto max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search 500+ AI tools..."
                  className="w-full rounded-2xl border-0 bg-white p-4 pl-12 text-slate-900 shadow-xl ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-600 dark:bg-slate-900 dark:text-white dark:ring-slate-800"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 pb-20">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-2 transition-colors ${
                      selectedCategory === 'All' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900'
                    }`}
                  >
                    All Tools
                  </button>
                  {directoryData.categories.map((cat) => {
                    const Icon = IconMap[cat.icon as keyof typeof IconMap] || Sparkles;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`flex w-full items-center gap-3 rounded-xl px-4 py-2 transition-colors ${
                          selectedCategory === cat.name ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900'
                        }`}
                      >
                        <Icon size={18} />
                        {cat.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* Tools Grid */}
          <main className="flex-1">
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredTools.map((tool) => (
                <Link
                  key={tool.id}
                  to={`/tools/${tool.id}`}
                  className="group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <img src={tool.logo} alt={tool.name} className="h-12 w-12 rounded-2xl object-cover" />
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star size={16} fill="currentColor" />
                      <span className="text-sm font-bold">{tool.rating}</span>
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">{tool.name}</h3>
                  <p className="mb-4 flex-1 text-sm text-slate-600 dark:text-slate-400">{tool.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                    <span className="rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                      {tool.price}
                    </span>
                    <ArrowRight className="text-slate-300 transition-colors group-hover:text-indigo-600" size={20} />
                  </div>
                </Link>
              ))}
            </div>
          </main>
        </div>
      </section>
    </div>
  );
                                                                  }
      
