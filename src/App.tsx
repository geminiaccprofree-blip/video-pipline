import React, { useState } from "react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import PhaseContent from "@/components/PhaseContent";
import { pipelinePhases } from "@/data/pipelineData";
import { ChevronLeft, ChevronRight, Cpu, Activity, ShieldCheck, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [activePhaseId, setActivePhaseId] = useState<number>(1);
  const [completedPhases, setCompletedPhases] = useState<number[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const handlePhaseComplete = (id: number) => {
    if (!completedPhases.includes(id)) {
      setCompletedPhases([...completedPhases, id]);
    }
  };

  const activePhase = pipelinePhases.find((p) => p.id === activePhaseId);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#050a18] selection:bg-amber-500/30 text-white font-sans">
      {/* Background Layer */}
      <div className="bg-grid"></div>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      
      {/* GLOBAL HEADER */}
      <header className="fixed top-0 left-0 w-full h-20 md:h-24 px-6 md:px-12 flex justify-between items-center z-50 glass-panel border-b border-white/5 pointer-events-auto">
        <div className="flex items-center space-x-3 md:space-x-4">
            <motion.div 
                whileHover={{ rotate: 180 }}
                className="w-10 h-10 md:w-12 md:h-12 bg-amber-500 rounded-xl md:rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.3)]"
            >
                <Cpu className="text-black" size={20} />
            </motion.div>
            <div>
                <h1 className="text-xl md:text-3xl font-serif font-black leading-none">
                    Finance<span className="italic text-amber-500">Studio</span>
                </h1>
                <p className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-amber-500/60 mt-0.5 md:mt-1">
                    AI Content Pipeline v4.0
                </p>
            </div>
        </div>

        {/* INTEGRATED PHASE SELECTOR (Moved from bottom-right to prevent overlap) */}
        <div className="hidden md:flex items-center bg-white/5 rounded-2xl p-1.5 border border-white/10 backdrop-blur-xl">
            {[1,2,3,4,5,6].map(num => (
                <button
                    key={num}
                    onClick={() => setActivePhaseId(num)}
                    className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${
                        activePhaseId === num 
                        ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' 
                        : 'text-white/40 hover:text-white hover:bg-white/5'
                    } ${completedPhases.includes(num) ? 'relative' : ''}`}
                >
                    {num}
                    {completedPhases.includes(num) && (
                        <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    )}
                </button>
            ))}
        </div>

        <div className="flex items-center space-x-4 md:space-x-8">
            <div className="hidden lg:flex items-center space-x-6 text-[9px] font-black uppercase tracking-[0.2em] text-white/40">
                <span className="flex items-center"><Activity size={12} className="mr-2 text-amber-500" /> Live</span>
                <span className="flex items-center"><ShieldCheck size={12} className="mr-2 text-green-500" /> Secure</span>
            </div>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-md">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="flex flex-col md:flex-row w-full h-full pt-20 md:pt-24">
        
        {/* Navigation Section (Orbit) - Hidden on very small mobile if desired, or stacked */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full md:w-[40%] h-[300px] md:h-full flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5 bg-black/10 overflow-visible"
            >
              <div className="scale-[0.55] sm:scale-[0.7] md:scale-[0.75] lg:scale-[0.8] w-full h-full flex items-center justify-center">
                <RadialOrbitalTimeline 
                    timelineData={pipelinePhases} 
                    activePhaseId={activePhaseId}
                    onPhaseSelect={setActivePhaseId}
                />
              </div>

              {/* Progress Detail - Tablet/Desktop only */}
              <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 space-y-3 w-48 lg:w-64">
                 <div className="space-y-1.5">
                    <div className="flex justify-between items-end">
                        <span className="text-[8px] font-black uppercase tracking-widest text-white/40">Neural Sync</span>
                        <span className="text-sm font-serif italic text-amber-500">{Math.round((completedPhases.length / 6) * 100)}%</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                            className="h-full bg-gradient-to-r from-amber-600 to-amber-300" 
                            initial={{ width: 0 }}
                            animate={{ width: `${(completedPhases.length / 6) * 100}%` }}
                            transition={{ duration: 1 }}
                        />
                    </div>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Bar - Desktop only */}
        <div className="hidden md:flex relative w-px h-full bg-white/5 z-30 items-center">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute -left-5 w-10 h-10 rounded-xl bg-[#0d152b] border border-white/10 flex items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-black transition-all duration-300 z-40 group shadow-2xl"
          >
            {sidebarOpen ? <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> : <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </div>

        {/* Content Engine Section */}
        <div className="flex-1 h-full overflow-y-auto custom-scrollbar bg-black/40 backdrop-blur-md p-6 sm:p-10 md:p-16 lg:p-24 relative">
          <div className="max-w-4xl mx-auto">
             <PhaseContent 
                phaseId={activePhaseId} 
                onComplete={handlePhaseComplete}
             />
          </div>
        </div>

      </div>

      {/* MOBILE PHASE SELECTOR (Alternative for small screens) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full p-4 glass-panel border-t border-white/10 flex justify-between items-center z-50">
           <div className="flex items-center space-x-2 bg-white/5 rounded-xl p-1 border border-white/5 overflow-x-auto no-scrollbar">
                {[1,2,3,4,5,6].map(num => (
                    <button
                        key={num}
                        onClick={() => setActivePhaseId(num)}
                        className={`w-10 h-10 flex-shrink-0 rounded-lg text-[10px] font-black transition-all ${
                            activePhaseId === num ? 'bg-amber-500 text-black' : 'text-white/40'
                        }`}
                    >
                        {num}
                    </button>
                ))}
           </div>
           <div className="flex flex-col items-end">
                <span className="text-[8px] font-black uppercase text-amber-500/60">{activePhase?.date}</span>
                <span className="text-[10px] font-serif font-bold text-white">{activePhase?.title}</span>
           </div>
      </div>
    </div>
  );
}

export default App;
