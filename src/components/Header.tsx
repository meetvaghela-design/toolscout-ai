import { Search, Menu, X, Sparkles, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Dark mode ko control karne ke liye
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/80">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/20">
             <Sparkles size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Tool<span className="text-indigo-600">Scout</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-white">
            Browse Tools
          </Link>
          <Link to="/submit" className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30">
            Submit Tool
          </Link>
          
          {/* Theme Toggle Button */}
          <button 
            onClick={() => setIsDark(!isDark)} 
            className="ml-2 rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>

        {/* Mobile Menu Button (Only for mobile screens) */}
        <button className="md:hidden text-slate-600 dark:text-slate-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="border-b border-slate-200 bg-white p-4 md:hidden dark:border-slate-800 dark:bg-slate-950">
          <nav className="flex flex-col gap-4">
            <Link to="/" className="text-sm font-medium text-slate-600 dark:text-slate-400" onClick={() => setIsMenuOpen(false)}>Browse Tools</Link>
            <Link to="/submit" className="text-sm font-medium text-slate-600 dark:text-slate-400" onClick={() => setIsMenuOpen(false)}>Submit Tool</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
