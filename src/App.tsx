{/* Hero Section - No Index.html changes needed */}
      <header className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
        {/* Glow Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-blue-600/10 blur-[140px] rounded-full -z-10" />

        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-12 shadow-2xl backdrop-blur-sm">
          <span className="text-[10px] uppercase tracking-[0.4em] font-black text-gray-500">
            The Ultimate AI Powerhouse for Creators
          </span>
        </div>

        {/* The Animated Header */}
        <h1 className="flex flex-col items-center justify-center text-center leading-[0.8]">
          
          {/* "Find the" - Extra Bold, Italic, Tight Spacing */}
          <span className="text-6xl md:text-9xl font-black italic text-white tracking-[-0.08em] select-none">
            Find the
          </span>

          {/* "perfect" - Contrast Word (Muted & Clean) */}
          <span className="text-xl md:text-3xl font-light text-gray-600 lowercase tracking-[0.2em] my-8 italic">
            perfect
          </span>
          
          {/* Dynamic Text - Blur Animation & Heavy Gradient */}
          <div className="h-[1.1em] flex items-center justify-center relative">
            <AnimatePresence mode="wait">
              <motion.span
                key={words[index]}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="text-6xl md:text-9xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white via-blue-500 to-blue-700 tracking-[-0.08em] leading-none drop-shadow-[0_15px_40px_rgba(59,130,246,0.3)]"
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </h1>

        {/* Search Bar - Apple Style */}
        <div className="max-w-xl mx-auto mt-20 relative group px-4">
          <div className="absolute inset-0 bg-blue-500/5 blur-2xl rounded-3xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
          <Search className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-600" size={20} />
          <input 
            type="text" 
            placeholder="Search 20+ Pro Tools"
            className="w-full bg-[#0c0c0c] border border-white/5 py-5 pl-16 pr-8 rounded-2xl text-lg text-white placeholder:text-gray-700 focus:outline-none focus:border-white/10 transition-all shadow-2xl"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>
