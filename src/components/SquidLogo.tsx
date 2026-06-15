import { motion } from "motion/react";

export default function SquidLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-lg md:max-w-2xl select-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 680 250"
        className="w-full h-auto drop-shadow-[0_0_15px_rgba(226,26,110,0.15)]"
      >
        <defs>
          {/* Grungy/noise texture styling to emulate the distressed print from the poster */}
          <filter id="grunge-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.08"
              numOctaves="4"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="3"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feBlend mode="multiply" in="SourceGraphic" in2="displaced" />
          </filter>
          
          <linearGradient id="pink-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff2e93" />
            <stop offset="100%" stopColor="#e21a6e" />
          </linearGradient>
        </defs>

        <g filter="url(#grunge-filter)">
          {/* ========================================================
              LINE 1: SQUID
              ======================================================== */}
          {/* 'S' with horizontal extension line extending to the left */}
          {/* Extending line to the left of S */}
          <path
            d="M 10 100 L 90 100 M 90 100 Q 75 100 75 85 L 75 75 Q 75 60 90 60 L 155 60 Q 170 60 170 75 L 170 80 Q 170 95 150 95 L 110 95 Q 90 95 90 110 L 90 115 Q 90 130 110 130 L 170 130"
            fill="none"
            stroke="#ffffff"
            strokeWidth="10"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />

          {/* 'Q' (hollow circle/oval) with internal hot pink circle */}
          <g>
            <ellipse
              cx="230"
              cy="95"
              rx="40"
              ry="38"
              fill="none"
              stroke="#ffffff"
              strokeWidth="10"
            />
            {/* The signature pink circle of the Q */}
            <circle
              cx="230"
              cy="95"
              r="24"
              fill="url(#pink-glow)"
              className="animate-pulse"
            />
          </g>

          {/* 'U' */}
          <path
            d="M 295 62 L 295 110 Q 295 130 315 130 L 335 130 Q 355 130 355 110 L 355 62"
            fill="none"
            stroke="#ffffff"
            strokeWidth="10"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />

          {/* 'I' */}
          <path
            d="M 390 62 L 390 130"
            fill="none"
            stroke="#ffffff"
            strokeWidth="10"
            strokeLinecap="square"
          />

          {/* 'D' */}
          <path
            d="M 425 62 L 425 130 L 455 130 Q 485 130 485 96 Q 485 62 455 62 Z"
            fill="none"
            stroke="#ffffff"
            strokeWidth="10"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />

          {/* ========================================================
              THE CONNECTOR: Tail of 'Q' down to 'G'
              ======================================================== */}
          {/* Diagnol connection from Q's lower aspect, zig-zagging to G */}
          <path
            d="M 240 130 L 255 155 L 210 185"
            fill="none"
            stroke="#ffffff"
            strokeWidth="8"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />


          {/* ========================================================
              LINE 2: GAME
              ======================================================== */}
          {/* 'G' - starting bottom right, curving left, up, then right and down.
              Connected from Q's extension above */}
          <path
            d="M 210 185 Q 180 185 180 205 L 180 215 Q 180 235 210 235 L 245 235 Q 260 235 260 215"
            fill="none"
            stroke="#ffffff"
            strokeWidth="10"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          <path
            d="M 260 205 L 235 205"
            fill="none"
            stroke="#ffffff"
            strokeWidth="10"
            strokeLinecap="square"
          />

          {/* 'A' - White triangular outline enclosing a solid pink/magenta triangle */}
          <g>
            <polygon
              points="285,235 315,170 345,235"
              fill="none"
              stroke="#ffffff"
              strokeWidth="10"
              strokeLinejoin="miter"
            />
            {/* Inside pink solid triangle */}
            <polygon
              points="298,226 315,190 332,226"
              fill="url(#pink-glow)"
            />
          </g>

          {/* 'M' */}
          <path
            d="M 370 235 L 370 170 L 392 210 L 414 170 L 414 235"
            fill="none"
            stroke="#ffffff"
            strokeWidth="10"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />

          {/* 'E' - Styled block E matching the poster:
              A solid pink block with negative horizontal strips cutout, and a white line going right. */}
          <g>
            {/* The white border frame of the E solid block */}
            <rect
              x="435"
              y="170"
              width="50"
              height="65"
              fill="url(#pink-glow)"
              stroke="#ffffff"
              strokeWidth="6"
              strokeLinejoin="miter"
            />
            {/* Cutting out the 2 horizontal gaps in the E block to reveal background texturing */}
            <rect x="455" y="185" width="31" height="8" fill="#000000" />
            <rect x="455" y="208" width="31" height="8" fill="#000000" />
            
            {/* Middle horizontal line extending to the right from E */}
            <path
              d="M 490 202 L 550 202"
              fill="none"
              stroke="#ffffff"
              strokeWidth="10"
              strokeLinecap="square"
            />
          </g>
        </g>
      </svg>
    </motion.div>
  );
}
