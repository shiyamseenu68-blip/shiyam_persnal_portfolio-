import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Zap, Radio, Sparkles, Activity, Compass, Orbit, ArrowRight } from 'lucide-react';
import { useMousePosition } from '@/hooks/useMousePosition';

interface Props {
  onNavigate: (id: string) => void;
}

export const Scene06Journey: React.FC<Props> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.1, once: false });
  const { normalizedX, normalizedY } = useMousePosition();

  // Scroll Progress Tracking across section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 22,
    restDelta: 0.001
  });

  // Environmental Light Source & Atmosphere Animators
  const lightScale = useTransform(smoothProgress, [0, 0.25, 0.75, 1], [0.6, 1.3, 1.3, 0.8]);
  const lightOpacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0.1, 0.45, 0.45, 0.1]);
  const bgTextX = useTransform(smoothProgress, [0, 1], ['10%', '-50%']);

  // Phase 01 — THE FIRST SPARK (0.0 to 0.18)
  const p1Opacity = useTransform(smoothProgress, [0.02, 0.08, 0.16, 0.22], [0, 1, 1, 0]);
  const p1Y = useTransform(smoothProgress, [0.02, 0.08, 0.16, 0.22], [30, 0, 0, -30]);

  // Phase 02 — THE BREAK (0.18 to 0.38)
  const p2Opacity = useTransform(smoothProgress, [0.20, 0.26, 0.34, 0.40], [0, 1, 1, 0]);
  const p2Y = useTransform(smoothProgress, [0.20, 0.26, 0.34, 0.40], [30, 0, 0, -30]);

  // Phase 03 — THE LEARNING (0.38 to 0.58)
  const p3Opacity = useTransform(smoothProgress, [0.40, 0.46, 0.54, 0.60], [0, 1, 1, 0]);
  const p3Y = useTransform(smoothProgress, [0.40, 0.46, 0.54, 0.60], [30, 0, 0, -30]);

  // Phase 04 — THE BUILD (0.60 to 0.80)
  const p4Opacity = useTransform(smoothProgress, [0.62, 0.68, 0.76, 0.82], [0, 1, 1, 0]);
  const p4Y = useTransform(smoothProgress, [0.62, 0.68, 0.76, 0.82], [30, 0, 0, -30]);

  // Phase 05 — THE SHIP & HERO CLIMAX (0.80 to 1.0)
  const p5Opacity = useTransform(smoothProgress, [0.82, 0.88, 1.0], [0, 1, 1]);
  const p5Y = useTransform(smoothProgress, [0.82, 0.88, 1.0], [30, 0, 0]);

  // Dynamic Transformation State Label for Telemetry Header
  const [currentPhaseLabel, setCurrentPhaseLabel] = useState('01 // THE FIRST SPARK');

  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (v) => {
      if (v < 0.20) setCurrentPhaseLabel('01 // THE FIRST SPARK');
      else if (v < 0.40) setCurrentPhaseLabel('02 // THE BREAK');
      else if (v < 0.60) setCurrentPhaseLabel('03 // THE LEARNING');
      else if (v < 0.80) setCurrentPhaseLabel('04 // THE BUILD');
      else setCurrentPhaseLabel('05 // THE SHIP');
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  // Mouse Parallax Vectors
  const parallaxX = normalizedX * 12;
  const parallaxY = normalizedY * 12;

  return (
    <section
      ref={containerRef}
      id="journey"
      className="relative min-h-screen w-full bg-[#030305] text-white font-sans overflow-hidden select-none z-20 py-12 sm:py-20 px-4 sm:px-8 lg:px-12 flex flex-col justify-start border-t border-white/[0.04]"
    >
      {/* ═══ 1. VOLUMETRIC SPOTLIGHT & ATMOSPHERIC GRADIENTS ═══ */}
      <motion.div 
        style={{ scale: lightScale, opacity: lightOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] sm:w-[1400px] h-[650px] sm:h-[1000px] bg-gradient-to-b from-[#FF5500]/25 via-[#D94800]/06 to-transparent rounded-full blur-[190px] pointer-events-none z-0 transition-opacity duration-1000" 
      />

      {/* Grid Pattern & Noise Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none opacity-20 z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,85,0,0.05)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none opacity-30 z-0" />

      {/* Giant Shifting Editorial Watermark */}
      <motion.div 
        style={{ x: bgTextX }}
        className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none z-0 opacity-[0.03] text-white font-black text-[24vw] leading-none uppercase font-sans tracking-tighter"
      >
        THE FIRST SPARK • THE BREAK • THE LEARNING • THE BUILD • THE SHIP
      </motion.div>

      {/* Atmospheric Micro Coordinates */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex flex-col justify-between p-6 opacity-25 font-mono text-[9px] text-neutral-400 tracking-[0.35em] uppercase">
        <div className="flex justify-between">
          <span>SHIYAM SIGNAL // CINEMATIC EVOLUTION</span>
          <span>LAT. 10.8° N // LON. 78.7° E</span>
        </div>
        <div className="flex justify-between">
          <span>CURRENT PHASE // {currentPhaseLabel}</span>
          <span>SIGNAL BEAM // ONLINE</span>
        </div>
      </div>

      {/* ═══ 2. MAIN SECTION CONTENT CONTAINER ═══ */}
      <div className="relative max-w-7xl mx-auto w-full z-10 flex flex-col items-center min-h-[750px] sm:min-h-[850px] justify-between">
        
        {/* ── TOP TELEMETRY STATUS BAR ── */}
        <div className="w-full flex justify-between items-center font-mono text-xs text-neutral-400 pb-5 border-b border-white/10 mb-6 sm:mb-10">
          <div className="flex items-center space-x-3">
            <span className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${
              isInView ? 'bg-[#FF5500] shadow-[0_0_14px_#FF5500] animate-pulse' : 'bg-neutral-600'
            }`} />
            <span className="font-bold tracking-widest uppercase text-white">
              {isInView ? 'SHIYAM SIGNAL ACTIVE // EVOLUTION EXPERIENTIAL' : 'SIGNAL STANDBY'}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-[11px]">
            <Radio className="w-3.5 h-3.5 text-[#FF5500] animate-pulse" />
            <span className="text-[#FF5500] font-black uppercase tracking-wider">
              {currentPhaseLabel}
            </span>
          </div>
        </div>

        {/* ═══ 3. "THE SHIYAM SIGNAL" UNIQUE VISUAL SIGNATURE ═══ */}
        <div className="relative z-20 flex flex-col items-center justify-center my-4">
          <div className="relative flex items-center justify-center">
            {/* Outer Signal Halo */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#FF5500]/50 animate-ping opacity-50" />
            
            {/* Center Pulsing Signal Core */}
            <div className="absolute w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#FF5500] to-black border-2 border-white shadow-[0_0_30px_#FF5500] flex items-center justify-center">
              <Zap className="w-4 h-4 text-white animate-pulse" />
            </div>
          </div>
          <span className="font-mono text-[9px] font-bold text-[#FF5500] tracking-[0.3em] uppercase mt-3">
            THE SHIYAM SIGNAL
          </span>
        </div>

        {/* ═══ 4. TRANSFORMING VISUAL WORLDS (5 PHASES) ═══ */}
        <motion.div 
          style={{ x: parallaxX, y: parallaxY }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="relative w-full flex-1 flex flex-col items-center justify-center text-center my-6 z-20"
        >

          {/* ── PHASE 01 — THE FIRST SPARK ── */}
          <motion.div 
            style={{ opacity: p1Opacity, y: p1Y }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FF5500]/10 border border-[#FF5500]/30 font-mono text-xs text-[#FF5500] font-black tracking-widest uppercase mb-6 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#FF5500] animate-pulse" />
              <span>PHASE 01 // THE FIRST SPARK</span>
            </div>

            <h2 className="text-4xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-none max-w-5xl">
              EVERY VERSION <br />
              OF ME <br />
              <span className="text-[#FF5500] drop-shadow-[0_0_40px_rgba(255,85,0,0.7)]">
                LEFT A TRACE.
              </span>
            </h2>

            <p className="font-mono text-xs sm:text-sm text-neutral-300 max-w-lg mt-6 tracking-widest uppercase font-semibold">
              Curiosity was the first interface.
            </p>
          </motion.div>

          {/* ── PHASE 02 — THE BREAK ── */}
          <motion.div 
            style={{ opacity: p2Opacity, y: p2Y }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FF5500]/10 border border-[#FF5500]/30 font-mono text-xs text-[#FF5500] font-black tracking-widest uppercase mb-6 backdrop-blur-md">
              <Activity className="w-3.5 h-3.5 text-[#FF5500] animate-pulse" />
              <span>PHASE 02 // THE BREAK</span>
            </div>

            <h2 className="text-4xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-none max-w-5xl">
              FAILURE EXPOSED <br />
              <span className="text-[#FF5500] drop-shadow-[0_0_40px_rgba(255,85,0,0.7)]">
                WHAT I DIDN'T UNDERSTAND.
              </span>
            </h2>

            <p className="font-mono text-xs sm:text-sm text-neutral-300 max-w-lg mt-6 tracking-widest uppercase font-semibold">
              Broken projects & runtime exceptions forged diagnostic resilience.
            </p>
          </motion.div>

          {/* ── PHASE 03 — THE LEARNING ── */}
          <motion.div 
            style={{ opacity: p3Opacity, y: p3Y }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FF5500]/10 border border-[#FF5500]/30 font-mono text-xs text-[#FF5500] font-black tracking-widest uppercase mb-6 backdrop-blur-md">
              <Compass className="w-3.5 h-3.5 text-[#FF5500] animate-pulse" />
              <span>PHASE 03 // THE LEARNING</span>
            </div>

            <h2 className="text-4xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-none max-w-5xl">
              EVERY BROKEN SYSTEM <br />
              <span className="text-[#FF5500] drop-shadow-[0_0_40px_rgba(255,85,0,0.7)]">
                LEFT SOMETHING USEFUL BEHIND.
              </span>
            </h2>

            <p className="font-mono text-xs sm:text-sm text-neutral-300 max-w-lg mt-6 tracking-widest uppercase font-semibold">
              Scattered knowledge connected into clean React component architecture & reactive pipelines.
            </p>
          </motion.div>

          {/* ── PHASE 04 — THE BUILD ── */}
          <motion.div 
            style={{ opacity: p4Opacity, y: p4Y }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FF5500]/10 border border-[#FF5500]/30 font-mono text-xs text-[#FF5500] font-black tracking-widest uppercase mb-6 backdrop-blur-md">
              <Orbit className="w-3.5 h-3.5 text-[#FF5500] animate-spin" />
              <span>PHASE 04 // THE BUILD</span>
            </div>

            <h2 className="text-4xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-none max-w-5xl">
              I STOPPED WAITING. <br />
              <span className="text-[#FF5500] drop-shadow-[0_0_40px_rgba(255,85,0,0.7)]">
                I STARTED BUILDING.
              </span>
            </h2>

            <p className="font-mono text-xs sm:text-sm text-neutral-300 max-w-lg mt-6 tracking-widest uppercase font-semibold">
              Engineered and shipped 25+ real web applications from raw concept to production edge hosting.
            </p>
          </motion.div>

          {/* ── PHASE 05 — THE SHIP & HERO CLIMAX ── */}
          <motion.div 
            style={{ opacity: p5Opacity, y: p5Y }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FF5500]/10 border border-[#FF5500]/30 font-mono text-xs text-[#FF5500] font-black tracking-widest uppercase mb-6 backdrop-blur-md">
              <Zap className="w-3.5 h-3.5 text-[#FF5500] animate-pulse" />
              <span>PHASE 05 // THE SHIP</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-neutral-300 leading-none max-w-4xl mb-4">
              I LEARNED TO TURN IDEAS INTO <br />
              THINGS PEOPLE CAN USE.
            </h2>

            <h3 className="text-4xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-none max-w-5xl">
              I DIDN'T FIND A PATH. <br />
              <span className="text-[#FF5500] drop-shadow-[0_0_60px_rgba(255,85,0,0.95)] text-5xl sm:text-8xl lg:text-9xl">
                I BUILT ONE.
              </span>
            </h3>

            <div className="pt-8">
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center space-x-3 px-8 py-4 rounded-xl bg-[#FF5500] text-black font-mono text-xs font-black uppercase tracking-wider hover:bg-white hover:shadow-[0_0_40px_rgba(255,85,0,0.75)] transition-all duration-300 group cursor-pointer"
              >
                <span>CONNECT WITH SHIYAM.S →</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

        </motion.div>

        {/* ═══ 5. CONTINUOUS SIGNAL BEAM LEADING TO CONTACT ═══ */}
        <div className="w-full flex flex-col items-center pb-2 z-20">
          <span className="font-mono text-[9px] font-bold text-neutral-500 tracking-[0.3em] uppercase mb-2">
            SHIYAM SIGNAL LEADS TO CONTACT
          </span>
          <div className="w-[1.5px] h-12 bg-gradient-to-b from-[#FF5500] to-transparent shadow-[0_0_12px_#FF5500] animate-pulse" />
        </div>

      </div>
    </section>
  );
};

export default Scene06Journey;
