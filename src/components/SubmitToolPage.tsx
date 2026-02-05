export function SubmitToolPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto max-w-2xl px-4">
        <h1 className="mb-4 text-3xl font-bold">Submit a Tool</h1>
        <p className="mb-8 text-slate-600 dark:text-slate-400">Add your AI tool to our directory.</p>
        <form className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
          <div>
            <label className="mb-2 block text-sm font-medium">Tool Name</label>
            <input type="text" className="w-full rounded-xl border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800" placeholder="e.g. ToolScout" />
          </div>
          <button type="submit" className="w-full rounded-xl bg-indigo-600 py-3 font-bold text-white">Submit for Review</button>
        </form>
      </div>
    </div>
  );
}
