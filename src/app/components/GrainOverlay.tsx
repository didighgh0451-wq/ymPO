import React from 'react';

export const GrainOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[9000] opacity-[0.12] mix-blend-overlay overflow-hidden">
    <svg
      className="absolute inset-0 w-full h-full animate-grain"
      xmlns="http://www.w3.org/2000/svg"
      style={{ willChange: 'transform' }}
    >
      <filter id="noiseFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.75"
          numOctaves={3}
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
    <style>{`
      @keyframes grain {
        0%, 100% { transform: translate(0, 0); }
        25% { transform: translate(-2%, -3%); }
        50% { transform: translate(3%, 1%); }
        75% { transform: translate(-1%, 3%); }
      }
      .animate-grain {
        animation: grain 8s steps(4) infinite;
      }
    `}</style>
  </div>
);