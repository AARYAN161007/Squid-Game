import { Menu, X, Trophy, Users, Shield, BookOpen } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  onOpenCast: () => void;
  onPlayBeep?: (freq?: number, type?: OscillatorType, duration?: number) => void;
}

export default function Header({ onOpenCast, onPlayBeep }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    onPlayBeep?.(750, "sine", 0.06);
    setIsOpen(!isOpen);
  };

  // Cast members for the menu overlay
  const castList = [
    { number: "456", name: "Seong Gi-hun", description: "The protagonist, a down-on-his-luck chauffeur and gambling addict who enters the game to pay off debts and secure custody of his daughter.", role: "Player 456" },
    { number: "218", name: "Cho Sang-woo", description: "Gi-hun's childhood friend and a gifted SNU graduate who is wanted by police for stealing money from his clients.", role: "Player 218" },
    { number: "067", name: "Kang Sae-byeok", description: "A North Korean defector who enters the game to pay a broker to find her mother and buy a house for her family.", role: "Player 067" },
    { number: "001", name: "Oh Il-nam", description: "An elderly man suffering from a brain tumor who enters the game out of sheer boredom, seeking genuine excitement.", role: "Player 001" }
  ];

  return (
    <header id="main-header" className="relative z-50 w-full px-6 py-6 md:px-12 flex justify-between items-center text-white bg-transparent">
      {/* BRAND MARK (Triangle, Circle, Square) */}
      <motion.div
        id="header-brand"
        className="flex items-center space-x-3 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        onClick={() => {
          onPlayBeep?.(900, "sine", 0.08);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <svg viewBox="0 0 115 32" className="w-24 h-7 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
          {/* Triangle */}
          <polygon
            points="16,3 3,29 29,29"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Circle */}
          <circle
            cx="57"
            cy="16"
            r="12"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
          />
          {/* Square */}
          <rect
            x="86"
            y="4"
            width="24"
            height="24"
            rx="2"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* NAVIGATION LINKS */}
      <nav id="header-nav" className="hidden md:flex items-center space-x-10 text-xs font-semibold tracking-[0.2em] text-gray-300">
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            onPlayBeep?.(800, "sine", 0.05);
            const el = document.getElementById("about");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="hover:text-squid-pink hover:text-glow transition-all duration-300 relative group py-1"
        >
          ABOUT
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-squid-pink transition-all duration-300 group-hover:w-full"></span>
        </a>
        <button
          onClick={() => {
            onPlayBeep?.(800, "sine", 0.05);
            onOpenCast();
          }}
          className="cursor-pointer hover:text-squid-pink hover:text-glow transition-all duration-300 relative group py-1"
        >
          ACTORS
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-squid-pink transition-all duration-300 group-hover:w-full"></span>
        </button>
        <a
          href="#history"
          onClick={(e) => {
            e.preventDefault();
            onPlayBeep?.(800, "sine", 0.05);
            const el = document.getElementById("history-section");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="hover:text-squid-pink hover:text-glow transition-all duration-300 relative group py-1"
        >
          HISTORY
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-squid-pink transition-all duration-300 group-hover:w-full"></span>
        </a>
      </nav>

      {/* MENU ACTION */}
      <motion.button
        id="header-menu-btn"
        className="flex items-center space-x-2 text-xs font-semibold tracking-[0.25em] text-white hover:text-squid-pink transition-colors duration-300 cursor-pointer"
        onClick={toggleMenu}
        whileTap={{ scale: 0.95 }}
      >
        <Menu className="w-5 h-5 text-white hover:text-squid-pink transition-colors" />
        <span className="font-sans">MENU</span>
      </motion.button>

      {/* FULL SCREEN MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="fullmenu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-black/98 backdrop-blur-md flex flex-col justify-between p-8 md:p-16 text-white"
          >
            {/* Header in Overlay */}
            <div className="flex justify-between items-center">
              {/* Brand icon in overlay */}
              <div className="flex items-center space-x-3">
                <svg viewBox="0 0 115 32" className="w-24 h-7 filter drop-shadow-[0_0_8px_rgba(226,26,110,0.4)]">
                 <polygon points="16,3 3,29 29,29" fill="none" stroke="#e21a6e" strokeWidth="3" strokeLinejoin="round" />
                 <circle cx="57" cy="16" r="12" fill="none" stroke="#e21a6e" strokeWidth="3" />
                 <rect x="86" y="4" width="24" height="24" rx="2" fill="none" stroke="#e21a6e" strokeWidth="3" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Close Button */}
              <motion.button
                onClick={toggleMenu}
                className="flex items-center space-x-2 text-xs tracking-[0.25em] text-gray-400 hover:text-squid-pink transition-colors duration-300 cursor-pointer"
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-6 h-6 text-white hover:text-squid-pink transition-all" />
                <span className="font-sans">CLOSE</span>
              </motion.button>
            </div>

            {/* Main Content inside Overlay Menu */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 my-auto max-w-7xl mx-auto w-full">
              {/* Menu Navigation */}
              <div className="flex flex-col space-y-6 md:space-y-8">
                <p className="text-squid-pink text-xs font-bold tracking-[0.3em] uppercase">Navigation Registry</p>
                <div className="flex flex-col space-y-4 md:space-y-6 text-3xl md:text-5xl font-bold font-display tracking-tight">
                  <motion.a
                    href="#top"
                    onClick={(e) => { e.preventDefault(); toggleMenu(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="hover:text-squid-pink transition-colors text-glow-hover flex items-center space-x-4"
                    whileHover={{ x: 10 }}
                  >
                    <span>00</span>
                    <span className="text-gray-400">/</span>
                    <span>HOME PORTAL</span>
                  </motion.a>
                  <motion.a
                    href="#about"
                    onClick={(e) => { e.preventDefault(); toggleMenu(); const el = document.getElementById("about"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                    className="hover:text-squid-pink transition-colors flex items-center space-x-4"
                    whileHover={{ x: 10 }}
                  >
                    <span>01</span>
                    <span className="text-gray-400">/</span>
                    <span>SYSTEM OVERVIEW</span>
                  </motion.a>
                  <motion.button
                    onClick={() => { toggleMenu(); onOpenCast(); }}
                    className="text-left hover:text-squid-pink transition-colors flex items-center space-x-4 cursor-pointer"
                    whileHover={{ x: 10 }}
                  >
                    <span>02</span>
                    <span className="text-gray-400">/</span>
                    <span>ACTORS & STAFF</span>
                  </motion.button>
                  <motion.a
                    href="#history"
                    onClick={(e) => { e.preventDefault(); toggleMenu(); const el = document.getElementById("history-section"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                    className="hover:text-squid-pink transition-colors flex items-center space-x-4"
                    whileHover={{ x: 10 }}
                  >
                    <span>03</span>
                    <span className="text-gray-400">/</span>
                    <span>VIP CHRONICLES</span>
                  </motion.a>
                </div>
              </div>

              {/* Game Profile Cast Details */}
              <div className="space-y-6">
                <p className="text-squid-pink text-xs font-bold tracking-[0.3em] uppercase">Key Contestants</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {castList.map((c) => (
                    <div
                      key={c.number}
                      className="border border-white/10 bg-white/5 p-4 rounded-lg hover:border-squid-pink/50 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-[2px] text-[10px] font-bold bg-squid-pink text-white tracking-[0.1em] rounded-sm">
                          NO. {c.number}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">{c.role}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-squid-pink transition-colors">
                        {c.name}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                        {c.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer inside Overlay Menu */}
            <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-mono border-t border-white/10 pt-6">
              <p>© 2026 SQUID GAME OFFICIAL DATABASE. ALL ASSETS COPIED RESPECTFULLY.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <span className="hover:text-white transition-colors cursor-pointer">TERMS OF ENTRY</span>
                <span className="hover:text-white transition-colors cursor-pointer">SURVIVAL PROTOCOLS</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
