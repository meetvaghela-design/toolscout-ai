// Is line ko dhundiye aur aise replace kijiye:
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
