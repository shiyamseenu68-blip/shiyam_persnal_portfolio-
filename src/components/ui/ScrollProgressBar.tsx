import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [scrollPercent, setScrollPercent] = useState(0);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      setScrollPercent(Math.round(v * 100));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <>
      {/* Top Burnt Orange Kinetic Scroll Beam */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-[#FF5500] origin-left z-[100] pointer-events-none shadow-[0_0_16px_#FF5500]"
      />

      {/* Floating Micro Scroll Telemetry Tag (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 pointer-events-none hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#050508]/80 border border-[#FF5500]/30 backdrop-blur-md font-mono text-[10px] text-neutral-300 shadow-xl">
        <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse shadow-[0_0_8px_#FF5500]" />
        <span className="font-bold text-white tracking-widest uppercase">
          DEPTH PROGRESS //
        </span>
        <span className="font-black text-[#FF5500]">
          {scrollPercent}%
        </span>
      </div>
    </>
  );
};
