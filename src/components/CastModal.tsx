import { X } from "lucide-react";
import { motion } from "motion/react";

interface CastModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CastModal({ isOpen, onClose }: CastModalProps) {
  if (!isOpen) return null;

  const actors = [
    {
      role: "Player 456",
      name: "Lee Jung-jae",
      character: "Seong Gi-hun",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
      bio: "An actor and model from Seoul. He is widely acclaimed for his performance as the sympathetic protagonist Gi-hun, winning the Primetime Emmy Award."
    },
    {
      role: "Player 218",
      name: "Park Hae-soo",
      character: "Cho Sang-woo",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
      bio: "A prominent actor recognized for his incredible range. He plays the calculating, survival-driven SNU alumnus Sang-woo."
    },
    {
      role: "Player 067",
      name: "Jung Ho-yeon",
      character: "Kang Sae-byeok",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300",
      bio: "A world-class supermodel who made her breakthrough acting debut. Her portrayal of the resilient Sae-byeok earned her global adoration."
    },
    {
      role: "Player 001",
      name: "O Yeong-su",
      character: "Oh Il-nam",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300",
      bio: "A veteran stage actor who delivers a legendary, emotional performance as the oldest, most mysterious competitor in the facility."
    },
    {
      role: "Staff / Detective",
      name: "Wi Ha-joon",
      character: "Hwang Jun-ho",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300",
      bio: "A high-profile actor who brings intense suspense as the daring detective who infiltrates the game's secret facility to locate his missing brother."
    },
    {
      role: "The Overseer",
      name: "Lee Byung-hun",
      character: "The Front Man",
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=300",
      bio: "A legendary figure in South Korean cinema, representing the absolute authority overseeing the games in his signature dark mask."
    },
    {
      role: "The Salesman",
      name: "Gong Yoo",
      character: "The Recruiter",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300",
      bio: "The charismatic, mysterious recruiter who tests potential candidates on public subways with games of ddakji, drawing them into the syndicate."
    },
    {
      role: "Player 199",
      name: "Anupam Tripathi",
      character: "Abdul Ali",
      image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=300",
      bio: "An compassionate actor who beautifully portrays Ali, a trusting and selflessly brave factory worker fighting to provide security for his young family."
    },
    {
      role: "Player 101",
      name: "Heo Sung-tae",
      character: "Jang Deok-su",
      image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=300",
      bio: "The intimidating antagonist who acts with zero reservation, performing any and all ruthless deeds to survive in the playground."
    }
  ];

  return (
    <div
      id="cast-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="w-full max-w-4xl bg-stone-950 border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden shadow-[0_0_50px_rgba(226,26,110,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-squid-pink animate-pulse" />
            <h3 className="text-lg font-bold font-display uppercase tracking-widest text-white">
              CAST REGISTRY • PRINCIPAL ACTORS
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto pr-2">
          {actors.map((actor, idx) => (
            <div
              key={idx}
              className="flex items-start space-x-4 p-4 rounded-xl border border-white/5 bg-white/2 hover:border-squid-pink/40 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-white/15">
                <img
                  src={actor.image}
                  alt={actor.name}
                  className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-grow">
                <span className="text-[10px] font-bold tracking-wider text-squid-pink font-mono block mb-1">
                  {actor.role}
                </span>
                <h4 className="text-white font-bold text-sm tracking-tight">{actor.name}</h4>
                <p className="text-xs text-stone-400 font-medium">As {actor.character}</p>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed line-clamp-3">
                  {actor.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-4 mt-6 text-right">
          <p className="text-[10px] text-gray-500 font-mono">
            SOURCE: NETFLIX GLOBAL PRESS KIT • 2026 EDITION
          </p>
        </div>
      </motion.div>
    </div>
  );
}
