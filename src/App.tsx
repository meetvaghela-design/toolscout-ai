        {/* Main Heading - Fixed "perfect" size and spacing */}
        <h1 className="flex flex-col items-center justify-center text-center">
          
          {/* Find the - Solid & Heavy */}
          <span className="text-6xl md:text-[110px] font-black italic tracking-[-0.08em] leading-[0.8] text-white">
            Find the
          </span>

          {/* perfect - Size badha diya aur color thoda saaf kiya */}
          <span className="text-3xl md:text-4xl font-light text-white/30 lowercase tracking-[0.2em] my-6 italic">
            perfect
          </span>
          
          {/* Changing Text - Cinematic Gradient */}
          <div className="h-[1.1em] flex items-center justify-center relative">
            <AnimatePresence mode="wait">
              <motion.span
                key={words[index]}
                initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -30, filter: "blur(12px)" }}
                transition={{ duration: 0.6, ease: "circOut" }}
                className="text-6xl md:text-[110px] font-black bg-clip-text text-transparent bg-gradient-to-b from-white via-blue-500 to-blue-800 tracking-[-0.08em] leading-none drop-shadow-[0_15px_40px_rgba(59,130,246,0.3)]"
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </h1>
