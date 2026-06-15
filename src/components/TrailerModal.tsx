import { X } from "lucide-react";
import { motion } from "motion/react";

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TrailerModal({ isOpen, onClose }: TrailerModalProps) {
  if (!isOpen) return null;

  return (
    <div
      id="trailer-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-4xl bg-stone-950 border border-white/10 rounded-xl overflow-hidden aspect-video shadow-[0_0_50px_rgba(226,26,110,0.3)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header toolbar */}
        <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between px-4 z-10">
          <span className="text-xs font-semibold tracking-widest text-squid-pink font-sans">
            TRAILER DEBRIEFING • SQUID GAME SEASON 1
          </span>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Embedded Iframe */}
        <iframe
          src="https://www.youtube.com/embed/oqxAJKy0R4A?autoplay=1"
          title="Squid Game Official Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full pt-12"
          referrerPolicy="no-referrer"
        />
      </motion.div>
    </div>
  );
}
