import { useParams, Link } from 'react-router-dom';
import { ExternalLink, Star, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';

export function ToolDetailPage({ tools }: { tools: any[] }) {
  const { toolId } = useParams();
  const tool = tools.find(t => t.id === toolId);

  if (!tool) return <div className="pt-32 text-center">Tool not found</div>;

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <Link to="/" className="mb-8 flex items-center gap-2 text-slate-600 hover:text-indigo-600 dark:text-slate-400">
          <ArrowLeft size={20} /> Back to Directory
        </Link>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-8 flex items-center gap-6">
              <img src={tool.logo} alt={tool.name} className="h-24 w-24 rounded-3xl object-cover shadow-2xl" />
              <div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">{tool.name}</h1>
                <p className="text-xl text-slate-600 dark:text-slate-400">{tool.tagline}</p>
              </div>
            </div>
            <div className="prose prose-slate max-w-none dark:prose-invert">
              <h2 className="text-2xl font-bold">About {tool.name}</h2>
              <p className="text-lg leading-relaxed">{tool.description}</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <a href={tool.url} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-4 font-bold text-white transition-transform hover:scale-[1.02]">
                Visit Website <ExternalLink size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
