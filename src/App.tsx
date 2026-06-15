import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, TrendingUp, Trophy, Skull, Volume2, VolumeX, Eye, Fingerprint, Search, ShieldAlert, Monitor } from "lucide-react";
import SquidLogo from "./components/SquidLogo";
import Header from "./components/Header";
import TrailerModal from "./components/TrailerModal";
import CastModal from "./components/CastModal";

const contestantsData = [
  {
    id: "456",
    name: "SEONG GI-HUN",
    status: "SURVIVED / VICTOR",
    debt: "₩45.6 BILLION",
    risk: "CRITICAL / RETROGRADE",
    photo: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=250",
    quote: "“Listen to me... I'm not a horse. I'm a human.”",
    evaluation: "High susceptibility to emotional distress but exhibits anomalous compliance instincts."
  },
  {
    id: "067",
    name: "KANG SAE-BYEOK",
    status: "ELIMINATED / HIGH VALUE",
    debt: "₩650 MILLION",
    risk: "EXTREME / DEFECTOR",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    quote: "“Don't trust anybody here. Especially me.”",
    evaluation: "Exceptional speed and agility. Highly protective of personal baggage. Terminated."
  },
  {
    id: "218",
    name: "CHO SANG-WOO",
    status: "ELIMINATED / EXTREME RISK",
    debt: "₩6.5 BILLION",
    risk: "MAXIMUM / FUGITIVE",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=250",
    quote: "“We are too far gone to halt now.”",
    evaluation: "Brilliant strategic capabilities, zero moral boundaries during competitive rounds."
  },
  {
    id: "001",
    name: "OH IL-NAM",
    status: "DECEASED / ARCHITECT",
    debt: "EXEMPT (SPONSOR)",
    risk: "NULL / INTELLECTUAL",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250",
    quote: "“Do you think people with no money or too much can have fun?”",
    evaluation: "Primary organizer of early game mechanics. Brain tumor confirmed terminal. Deceased."
  }
];

// Stagger entrance transitions for premium feel
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 25 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 14
    }
  }
};

export default function App() {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [isCastOpen, setIsCastOpen] = useState(false);

  // Premium interactive states
  const [isMuted, setIsMuted] = useState(true);
  const [isCRTOn, setIsCRTOn] = useState(false);
  const [selectedContestantIdx, setSelectedContestantIdx] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  // Audio synths for true luxury feedback
  const playSynthBeep = (freq = 800, type: OscillatorType = "sine", duration = 0.08) => {
    if (isMuted) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch {
      // Audio context blocked
    }
  };

  const handleScanContestant = (idx: number) => {
    if (idx === selectedContestantIdx) return;
    playSynthBeep(650, "triangle", 0.15);
    setIsScanning(true);
    setSelectedContestantIdx(idx);
    setTimeout(() => {
      setIsScanning(false);
      playSynthBeep(1100, "sine", 0.08);
    }, 850);
  };

  // Stats Counters
  const totalPrize = "$45.6 BILLION";
  const gameStats = [
    { label: "PLAYERS REGISTERED", value: "456", icon: Skull },
    { label: "PRIZE ACCUMULATED", value: totalPrize, icon: Trophy },
    { label: "CURRENT STATUS", value: "ROUND 1 IN PROGRESS", icon: TrendingUp },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-squid-pink selection:text-white flex flex-col justify-between overflow-x-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover opacity-60 z-0 pointer-events-none animate-fade-in"
      >
        <source src="https://res.cloudinary.com/dald5vvqi/video/upload/v1780338427/kling_20260602_Image_to_Video__400_0_u8tcxa.mp4" type="video/mp4" />
      </video>
      <div className="fixed inset-0 bg-gradient-to-b from-black/85 via-black/30 to-black/95 z-0 pointer-events-none" />

      {/* Background Cinematic Scanlines Cover */}
      <div className="absolute inset-0 grunge-texture pointer-events-none opacity-40 z-10" />

      {/* Background vignette glow */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-squid-pink/5 rounded-full blur-[150px] pointer-events-none" />

      {/* ==========================================
          HEADER COMPONENT
          ========================================== */}
      <Header
        onOpenCast={() => {
          playSynthBeep(850, "sine", 0.08);
          setIsCastOpen(true);
        }}
        onPlayBeep={playSynthBeep}
      />

      {/* ==========================================
          MAIN HERO BODY PORTAL
          ========================================== */}
      <main id="main-content" className="relative z-20 flex-grow w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Core Hero Text / Logo Area */}
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            
            {/* The Famous Squid Game Logotype */}
            <div className="mb-6">
              <SquidLogo />
            </div>

            {/* Sub-description section mimicking the exact layout:
                Squid Game Diagram on Left, Text block on Right */}
            <div className="flex items-start mt-4 space-x-6 max-w-xl md:max-w-2xl">
              {/* Squid traditional board schema SVG (White/Pink drawing from reference) */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex-shrink-0"
              >
                <svg
                  viewBox="0 0 50 100"
                  className="w-12 h-24 filter drop-shadow-[0_0_8px_rgba(226,26,110,0.6)]"
                >
                  {/* Circle at top */}
                  <circle cx="25" cy="18" r="9" fill="none" stroke="#e21a6e" strokeWidth="2.5" />
                  <circle cx="25" cy="18" r="3" fill="#ffffff" />
                  
                  {/* Connector lines inside board schema */}
                  <line x1="25" y1="27" x2="25" y2="45" stroke="#ffffff" strokeWidth="2" />
                  
                  {/* Triangle center piece */}
                  <polygon points="25,40 10,65 40,65" fill="none" stroke="#e21a6e" strokeWidth="2.5" />
                  <circle cx="25" cy="52" r="2" fill="#ffffff" />
                  
                  {/* Connecting core body line */}
                  <line x1="25" y1="65" x2="25" y2="78" stroke="#ffffff" strokeWidth="2" />
                  
                  {/* Square base block */}
                  <rect x="13" y="74" width="24" height="24" rx="1.5" fill="none" stroke="#e21a6e" strokeWidth="2.5" />
                  <circle cx="25" cy="86" r="3" fill="#ffffff" />
                </svg>
              </motion.div>

              {/* Exact Poster Copy Text */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-col justify-center"
              >
                <p className="text-gray-300 text-sm md:text-base font-medium leading-relaxed tracking-wide font-sans text-left">
                  Hundreds of cash-strapped players accept a strange invitation
                  to compete in children’s games. Inside, a tempting prize awaits
                  — with deadly high stakes.
                </p>
                <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mt-2 block">
                  SYSTEM OVERFLOW INITIATE • NETFLIX SERIES
                </span>
              </motion.div>
            </div>
            
          </div>

          {/* Right Action/Interactive Column (Visible on Desktop) */}
          <div className="hidden lg:col-span-4 lg:flex flex-col space-y-6 pl-12 border-l border-white/5 relative">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-bold tracking-[0.2em] text-[#e21a6e] uppercase flex items-center">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse inline-block" />
                SURVEILLANCE DIRECTORY
              </h3>
              <span className="text-[9px] font-mono text-zinc-500 tracking-wider">DATABASE ACTIVE</span>
            </div>

            {/* Interactive Player Selector Tabs */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid grid-cols-4 gap-2" 
              style={{ perspective: 1000 }}
            >
              {contestantsData.map((c, idx) => {
                const isSelected = selectedContestantIdx === idx;
                return (
                  <motion.button
                    key={c.id}
                    variants={staggerItem}
                    onClick={() => handleScanContestant(idx)}
                    whileHover={{ 
                      scale: 1.08,
                      rotateX: -5,
                      rotateY: 6,
                      z: 10,
                      boxShadow: isSelected 
                        ? "0 0 15px rgba(226,26,110,0.6)" 
                        : "0 0 10px rgba(226,26,110,0.25)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 350, damping: 15 }}
                    style={{ transformStyle: "preserve-3d" }}
                    className={`py-2 px-1 text-center font-mono text-xs font-bold rounded-lg border cursor-pointer transition-all duration-300 relative overflow-hidden ${
                      isSelected
                        ? "bg-[#e21a6e]/15 border-[#e21a6e] text-[#e21a6e] shadow-[0_0_12px_rgba(226,26,110,0.35)]"
                        : "bg-black/50 border-white/10 text-gray-400 hover:text-white"
                    }`}
                  >
                    {/* Pink corner tick design */}
                    <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#e21a6e] opacity-0 group-hover:opacity-100 transition-opacity rounded-bl" />
                    <span className="relative z-10">#{c.id}</span>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Interactive Biometrics Monitor Frame */}
            <motion.div 
              animate={{
                borderColor: isScanning ? "rgba(226,26,110,0.45)" : "rgba(255,255,255,0.1)",
                boxShadow: isScanning 
                  ? "0 0 25px rgba(226,26,110,0.2)" 
                  : "0 0 0px rgba(0,0,0,0)",
              }}
              whileHover={{
                scale: 1.01,
                rotateY: 2,
                rotateX: -1
              }}
              transition={{ duration: 0.3 }}
              style={{ transformStyle: "preserve-3d", perspective: 1000 }}
              className="bg-white/[0.02] border rounded-xl p-5 relative overflow-hidden group"
            >
              
              {/* Scanline laser animation */}
              <AnimatePresence>
                {isScanning && (
                  <motion.div
                    initial={{ top: "0%" }}
                    animate={{ top: "100%" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.85, ease: "easeInOut" }}
                    className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#e21a6e] to-transparent z-30 pointer-events-none shadow-[0_0_8px_rgba(226,26,110,1)]"
                  />
                )}
              </AnimatePresence>

              {/* Contestant Data Feed */}
              <div className="space-y-4">
                {/* Photo & Identity Core */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-white/15 relative bg-stone-900 flex-shrink-0">
                    <img
                      src={contestantsData[selectedContestantIdx].photo}
                      alt={contestantsData[selectedContestantIdx].name}
                      className={`w-full h-full object-cover filter contrast-125 transition-all duration-500 ${
                        isScanning ? "grayscale blur-xs opacity-40Scale" : "grayscale hover:grayscale-0"
                      }`}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    <div className="absolute top-1 left-1 text-[7px] font-mono text-[#e21a6e] bg-black/60 px-1 rounded">CAM 12</div>
                  </div>

                  <div className="flex-grow min-w-0">
                    <span className="text-[9px] font-mono text-zinc-500 tracking-wider block">IDENTIFIED AS</span>
                    <h4 className="text-white font-extrabold text-sm tracking-tight truncate">
                      {contestantsData[selectedContestantIdx].name}
                    </h4>
                    <span className={`inline-flex items-center px-1.5 py-0.5 mt-1 rounded text-[9px] font-mono font-bold tracking-wider uppercase ${
                      contestantsData[selectedContestantIdx].status.includes("SURVIVED")
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : contestantsData[selectedContestantIdx].status.includes("DECEASED")
                        ? "bg-zinc-800 text-zinc-400 border border-zinc-700/50"
                        : "bg-rose-500/15 text-rose-400 border border-rose-500/20"
                    }`}>
                      {contestantsData[selectedContestantIdx].status}
                    </span>
                  </div>
                </div>

                {/* Surveillance Factoids */}
                <div className="space-y-2 border-t border-white/5 pt-3 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-zinc-500 uppercase">LIQUID DEBT:</span>
                    <span className="text-white font-sans font-semibold text-right">{contestantsData[selectedContestantIdx].debt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500 uppercase">EVAL RISK:</span>
                    <span className="text-red-400 text-right uppercase">{contestantsData[selectedContestantIdx].risk}</span>
                  </div>
                </div>

                {/* Psychological Bio quote block */}
                <div className="bg-black/30 border border-white/5 p-3 rounded-lg text-left">
                  <p className="text-[11px] text-zinc-400 italic leading-snug font-sans">
                    {contestantsData[selectedContestantIdx].quote}
                  </p>
                  <span className="text-[8px] font-mono text-zinc-600 block mt-1.5 uppercase tracking-widest leading-none">
                    DIAGNOSTIC PROTOCOL #E-2026
                  </span>
                  <p className="text-[9px] text-zinc-500 mt-1 font-sans leading-relaxed">
                    {contestantsData[selectedContestantIdx].evaluation}
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Quick action system tips */}
            <p className="text-[10px] font-mono text-zinc-500 leading-normal flex items-start">
              <Fingerprint className="w-3.5 h-3.5 text-[#e21a6e] mr-1.5 flex-shrink-0 animate-pulse" />
              <span>Biometric credentials loaded dynamically. Ensure proper audio status configuration.</span>
            </p>
          </div>
        </div>
      </main>

      {/* ==========================================
          BOTTOM CONTROLS BAR (Trailer & Games Grid)
          ========================================== */}
      <footer id="bottom-controls" className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12 border-t border-white/5 bg-transparent">
        <div id="footer-inner-grid" className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* PLAY TRAILER BUTTON (Left aspect) */}
          <div className="md:col-span-4 flex justify-start">
            <motion.button
              id="play-trailer-btn"
              onClick={() => setIsTrailerOpen(true)}
              className="flex items-center space-x-4 group cursor-pointer focus:outline-none"
              whileHover="hover"
            >
              {/* Giant hot pink circle with centered white play triangle */}
              <motion.div
                variants={{
                  hover: { scale: 1.1, boxShadow: "0 0 20px rgba(226,26,110,0.6)" }
                }}
                className="w-14 h-14 rounded-full bg-squid-pink text-white flex items-center justify-center transition-all duration-300"
              >
                <Play className="w-5 h-5 fill-white text-white ml-1" />
              </motion.div>
              
              {/* Accompanying Play Title text */}
              <div className="text-left">
                <span className="text-xs font-bold tracking-[0.25em] text-white group-hover:text-squid-pink transition-colors duration-300 block font-sans">
                  PLAY TRAILER
                </span>
                <span className="text-[9px] text-gray-500 font-mono tracking-widest block mt-0.5 uppercase">
                  Duration 2:10 • HD
                </span>
              </div>
            </motion.button>
          </div>

          {/* THREE METADATA SPECIFICATIONS (Center/Right Aspect) */}
          <div id="credits-grid" className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            
            {/* Spec 01 */}
            <div className="p-4 border-l border-white/10 hover:border-squid-pink/30 hover:bg-white/2 transition-all duration-300 rounded-r-lg group">
              <span className="text-[10px] font-mono tracking-widest text-[#e21a6e] block mb-1">01 / CREATOR</span>
              <h4 className="text-white font-bold text-xs tracking-[0.12em] uppercase group-hover:text-glow transition-all duration-300">
                HWANG DONG-HYUK
              </h4>
              <p className="text-[10px] text-gray-500 mt-2 leading-relaxed">
                Emmy® Award-winning Director of the global television masterpiece.
              </p>
            </div>

            {/* Spec 02 */}
            <div className="p-4 border-l border-white/10 hover:border-squid-pink/30 hover:bg-white/2 transition-all duration-300 rounded-r-lg group">
              <span className="text-[10px] font-mono tracking-widest text-[#e21a6e] block mb-1">02 / SOUNDTRACK</span>
              <h4 className="text-white font-bold text-xs tracking-[0.12em] uppercase group-hover:text-glow transition-all duration-300">
                JUNG JAE-IL
              </h4>
              <p className="text-[10px] text-gray-500 mt-2 leading-relaxed">
                Brilliant electronic-classical score including the haunting "Way Back then".
              </p>
            </div>

            {/* Spec 03 */}
            <div className="p-4 border-l border-white/10 hover:border-squid-pink/30 hover:bg-white/2 transition-all duration-300 rounded-r-lg group">
              <span className="text-[10px] font-mono tracking-widest text-[#e21a6e] block mb-1">03 / PERFORMANCE</span>
              <h4 className="text-white font-bold text-xs tracking-[0.12em] uppercase group-hover:text-glow transition-all duration-300">
                CRITICAL ACCLAIM
              </h4>
              <p className="text-[10px] text-gray-500 mt-2 leading-relaxed">
                Officially ranked as the most watched launching title in Netflix history.
              </p>
            </div>

          </div>
        </div>
      </footer>

      {/* ==========================================
          EXTRA SCROLLABLE ABOUT & REGISTRY BLOCKS
          ========================================== */}
      <section id="about" className="w-full max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 border-t border-white/5 bg-transparent relative">
        <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-sky-500/2 rounded-full blur-[120px] pointer-events-none" />
        <p className="text-squid-pink text-xs font-bold tracking-[0.3em] uppercase mb-2 text-left">SYSTEM ENVIORNMENT OVERVIEW</p>
        <h2 className="text-2xl md:text-4xl font-extrabold font-display text-white tracking-tight mb-8 text-left">
          WHAT IS THE SYSTEM SQUID GAME?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 border border-white/10 bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="p-8 hover:bg-white/[0.02] transition-colors duration-500 group">
            <span className="text-xs font-mono text-squid-pink block mb-4 tracking-[0.2em]">01 / TOTAL DISCIPLINE</span>
            <h4 className="text-white font-bold text-lg mb-4 tracking-tight group-hover:text-squid-pink transition-colors">CONTESTANT SELECTION</h4>
            <p className="text-sm text-gray-400 leading-relaxed font-sans font-light">
              We scout and invite only those individuals whose real-world debt and obligations render their survival parameters completely desperate.
            </p>
          </div>
          <div className="p-8 hover:bg-white/[0.02] transition-colors duration-500 group">
            <span className="text-xs font-mono text-squid-pink block mb-4 tracking-[0.2em]">02 / IMMERSION SYSTEMS</span>
            <h4 className="text-white font-bold text-lg mb-4 tracking-tight group-hover:text-squid-pink transition-colors">RETRO PLAYGROUNDS</h4>
            <p className="text-sm text-gray-400 leading-relaxed font-sans font-light">
              Each round takes place inside massive custom arenas styled exactly like simple color-saturated children's schoolyards to isolate mental attention.
            </p>
          </div>
          <div className="p-8 hover:bg-white/[0.02] transition-colors duration-500 group">
            <span className="text-xs font-mono text-squid-pink block mb-4 tracking-[0.2em]">03 / REAL CONSTRAINTS</span>
            <h4 className="text-white font-bold text-lg mb-4 tracking-tight group-hover:text-squid-pink transition-colors">ELIMINATION CRITERIA</h4>
            <p className="text-sm text-gray-400 leading-relaxed font-sans font-light">
              Failure to adhere to standard circular/triangular directives results in immediate, non-negotiable physical clearing of the asset.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Board Banner in Between Section */}
      <section className="w-full bg-black/60 backdrop-blur-md border-y border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          {gameStats.map((stat, idx) => {
            const IconComp = stat.icon;
            return (
              <div key={idx} className="flex flex-col items-center justify-center py-4 md:py-0 px-6 group">
                <IconComp className="w-6 h-6 text-squid-pink mb-3 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-[10px] text-zinc-500 font-mono tracking-[0.25em] uppercase">{stat.label}</span>
                <span className="text-xl md:text-2xl font-extrabold font-display text-white mt-1.5 tracking-tight group-hover:text-glow transition-all duration-300">{stat.value}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* HISTORY / VIP LORE CHRONICLES */}
      <section id="history-section" className="w-full max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32 bg-transparent relative">
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[400px] h-[400px] bg-[#e21a6e]/4 rounded-full blur-[140px] pointer-events-none" />
        <p className="text-squid-pink text-xs font-bold tracking-[0.3em] uppercase mb-3 text-left">CHRONOLOGY MATRIX</p>
        <h2 className="text-3xl md:text-5xl font-extrabold font-display text-white tracking-tight mb-16 text-left">
          THE TOURNAMENT TIMELINE
        </h2>

        <div className="space-y-16 max-w-4xl text-left relative before:absolute before:inset-y-0 before:left-3 before:w-[1px] before:bg-white/10">
          
          <div className="relative pl-10 group">
            <div className="absolute left-1.5 top-1 w-3.5 h-3.5 rounded-full bg-black border border-white/30 group-hover:border-squid-pink group-hover:scale-110 transition-all duration-300" />
            <span className="text-xs text-squid-pink font-mono block mb-2 tracking-widest font-semibold">ESTABLISHED 1988</span>
            <h3 className="text-white font-bold text-lg tracking-tight group-hover:text-squid-pink transition-colors duration-300">THE SECRETS OF FOUNDING</h3>
            <p className="text-sm text-zinc-400 mt-3 leading-relaxed font-sans font-light max-w-2xl">
              The game began as a private syndicate between exceptionally wealthy industrialists seeking an alternative form of stimulation. It evolved into a high-technology facility on an isolated island.
            </p>
          </div>

          <div className="relative pl-10 group">
            <div className="absolute left-1.5 top-1 w-3.5 h-3.5 rounded-full bg-black border border-white/30 group-hover:border-squid-pink group-hover:scale-110 transition-all duration-300" />
            <span className="text-xs text-squid-pink font-mono block mb-2 tracking-widest font-semibold">DEVELOPED 2020</span>
            <h3 className="text-white font-bold text-lg tracking-tight group-hover:text-squid-pink transition-colors duration-300">MODERN SURVEILLANCE INFRASTRUCTURE</h3>
            <p className="text-sm text-zinc-400 mt-3 leading-relaxed font-sans font-light max-w-2xl">
              Introduction of AI-assisted visual tracking dolls, custom electronic heart trackers, and full HD sensory equipment to facilitate real-time viewing for VIP guests.
            </p>
          </div>

          <div className="relative pl-10 group">
            <div className="absolute left-1.5 top-1 w-3.5 h-3.5 rounded-full bg-black border border-[#e21a6e] bg-[#e21a6e]/10 group-hover:scale-110 transition-all duration-300" />
            <span className="text-xs text-squid-pink font-mono block mb-2 tracking-widest font-semibold">ACTIVE 2026</span>
            <h3 className="text-white font-bold text-lg tracking-tight group-hover:text-squid-pink transition-colors duration-300">THE CURRENT SEASON</h3>
            <p className="text-sm text-zinc-400 mt-3 leading-relaxed font-sans font-light max-w-2xl">
              We are currently executing our highest stakes matching yet. The jackpot has climbed to a historical record. May the odds be in favor of the contestants.
            </p>
          </div>

        </div>
      </section>

      {/* Simple elegant credits margin */}
      <footer className="w-full py-6 border-t border-white/5 bg-transparent text-center text-xs text-gray-600 font-mono">
        <p>© 2026 SQUID GAME OFFICIAL HUB • COPIED EXACTLY FROM REFERENCE IMAGES</p>
      </footer>

      {/* ==========================================
          MODALS & OVERLAYS LISTING
          ========================================== */}
      <AnimatePresence>
        {isTrailerOpen && (
          <TrailerModal
            isOpen={isTrailerOpen}
            onClose={() => setIsTrailerOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCastOpen && (
          <CastModal
            isOpen={isCastOpen}
            onClose={() => setIsCastOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Atmospheric Audio & CRT Controller Command Center (Floating, Fixed) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-2 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-black/90 backdrop-blur-md border border-white/10 p-3 rounded-2xl flex items-center space-x-3 shadow-[0_0_25px_rgba(0,0,0,0.8)] pointer-events-auto"
        >
          {/* Audio volume switch */}
          <button
            onClick={() => {
              setIsMuted(!isMuted);
              if (isMuted) {
                // Instantly synthesize a welcoming digital tone upon unmuting
                try {
                  const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
                  const osc = audioCtx.createOscillator();
                  const gain = audioCtx.createGain();
                  osc.type = "sine";
                  osc.frequency.setValueAtTime(800, audioCtx.currentTime);
                  gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
                  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.15);
                  osc.connect(gain);
                  gain.connect(audioCtx.destination);
                  osc.start();
                  osc.stop(audioCtx.currentTime + 0.15);
                } catch {}
              }
            }}
            className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
              !isMuted 
                ? "bg-[#e21a6e]/10 border-[#e21a6e] text-[#e21a6e] shadow-[0_0_12px_rgba(226,26,110,0.4)]" 
                : "bg-stone-900 border-white/10 text-gray-500 hover:text-white"
            }`}
            title={isMuted ? "Enable terminal clicks & bleeps" : "Mute terminal clicks & bleeps"}
          >
            {isMuted ? <VolumeX className="w-4.5 h-4.5" /> : <Volume2 className="w-4.5 h-4.5 animate-bounce" />}
          </button>

          {/* CRT scanlines toggle */}
          <button
            onClick={() => {
              setIsCRTOn(!isCRTOn);
              if (isMuted) return;
              try {
                const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = "triangle";
                osc.frequency.setValueAtTime(isCRTOn ? 450 : 980, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.12);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.12);
              } catch {}
            }}
            className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
              isCRTOn 
                ? "bg-purple-500/10 border-purple-500 text-purple-400 shadow-[0_0_12px_rgba(168,50,224,0.4)]" 
                : "bg-stone-900 border-white/10 text-gray-500 hover:text-white"
            }`}
            title="Toggle Retro CRT Surveillance HUD"
          >
            <Monitor className="w-4.5 h-4.5" />
          </button>
        </motion.div>
      </div>

      {/* Full-Screen CRT scanlines and subtle cathode rays layer */}
      {isCRTOn && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden mix-blend-overlay opacity-[0.25] pointer-events-none">
          <div className="w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.3)_50%),_linear-gradient(90deg,_rgba(255,0,0,0.06),_rgba(0,255,0,0.02),_rgba(0,0,255,0.06))] bg-[size:100%_4px,_6px_100%] animate-pulse" />
        </div>
      )}
    </div>
  );
}
