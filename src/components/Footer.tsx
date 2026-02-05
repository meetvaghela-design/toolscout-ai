import { Sparkles, Github, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-1 lg:col-span-2">
            <Link to="/" className="mb-4 flex items-center gap-2">
              <Sparkles className="text-indigo-600" size={24} />
              <span className="text-xl font-bold text-slate-900 dark:text-white">ToolScout</span>
            </Link>
            <p className="max-w-xs text-slate-600 dark:text-slate-400">
              The ultimate directory for AI tools. Helping you find the right tool for every task.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-bold text-slate-900 dark:text-white">Links</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/">Directory</Link></li>
              <li><Link to="/submit">Submit Tool</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-bold text-slate-900 dark:text-white">Social</h4>
            <div className="flex gap-4 text-slate-600 dark:text-slate-400">
              <Twitter size={20} />
              <Github size={20} />
              <Mail size={20} />
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-100 pt-8 text-center text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
          © {new Date().getFullYear()} ToolScout. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
