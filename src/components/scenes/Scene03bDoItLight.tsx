import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ArrowRight, Zap, Radio, CornerDownRight, Activity } from 'lucide-react';
import { useMousePosition } from '@/hooks/useMousePosition';

interface Props {
  onNavigate: (id: string) => void;
}

export const Scene03bDoItLight: React.FC<Props> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.12, once: false });
  const { normalizedX, normalizedY } = useMousePosition();

  // Scroll Progress across section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  // Spatial Transforms & Light Ignition
  const ambientGlowOpacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0.05, 0.35, 0.35, 0.05]);
  const ambientGlowScale = useTransform(smoothProgress, [0, 0.3, 0.8], [0.7, 1.15, 1.0]);
  const laserBeamHeight = useTransform(smoothProgress, [0.1, 0.85], ["0%", "100%"]);

  // Spatial Moments Scroll Activations
  const moment1Opacity = useTransform(smoothProgress, [0.1, 0.25, 0.4], [0.3, 1, 0.6]);
  const moment2Opacity = useTransform(smoothProgress, [0.3, 0.45, 0.6], [0.3, 1, 0.6]);
  const moment3Opacity = useTransform(smoothProgress, [0.5, 0.65, 0.8], [0.3, 1, 0.6]);
  const moment4Opacity = useTransform(smoothProgress, [0.7, 0.85, 1.0], [0.3, 1, 1.0]);

  // Subtle Mouse Parallax
  const parallaxX = normalizedX * 8;
  const parallaxY = normalizedY * 8;

  const spatialMoments = [
    {
      id: '01',
      phase: 'FAIL',
      statement: 'Turn mistakes into data.',
      detail: 'Fragmented signals, error exceptions, and broken builds are diagnostic vectors revealing optimal architecture.',
      microTag: 'SIGNAL_DISTORTION // ERR_0x90',
      color: '#EF4444',
      opacityVal: moment1Opacity
    },
    {
      id: '02',
      phase: 'LEARN',
      statement: 'Turn knowledge into power.',
      detail: 'Reorganizing raw error fragments into structured mental models and reusable engineering logic.',
      microTag: 'MATRIX_ALIGNMENT // SYNTHESIZED',
      color: '#F59E0B',
      opacityVal: moment2Opacity
    },
    {
      id: '03',
      phase: 'BUILD',
      statement: 'Turn ideas into systems.',
      detail: 'Converting structured models into production-grade, resilient digital applications and software.',
      microTag: 'ARCHITECTURAL_MANIFEST // COMPILED',
      color: '#FF5500',
      opacityVal: moment3Opacity
    },
    {
      id: '04',
      phase: 'SHIP',
      statement: 'Turn vision into reality.',
      detail: 'Deploying completed builds into production to generate real-world impact and continuous value.',
      microTag: 'PRODUCTION_CONVERGENCE // DEPLOYED',
      color: '#FF7700',
      opacityVal: moment4Opacity
    }
  ];

  return (
    <section
      ref={containerRef}
      id="do-it-light"
      className="relative w-full bg-[#050508] text-white font-sans py-12 sm:py-20 px-4 sm:px-8 lg:px-12 overflow-hidden select-none z-20 border-t border-white/[0.04]"
    >
      {/* ═══ 1. CINEMATIC VOLUMETRIC LIGHT IGNITION ═══ */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1200px] h-[500px] sm:h-[800px] bg-gradient-to-b from-[#FF5500]/30 via-[#F59E0B]/08 to-transparent rounded-full blur-[160px] pointer-events-none z-0"
        style={{ opacity: ambientGlowOpacity, scale: ambientGlowScale }}
      />

      {/* Atmospheric Spatial Micro Coordinates & Timestamp Tags */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex flex-col justify-between p-6 opacity-20 font-mono text-[9px] text-neutral-500 tracking-[0.35em] uppercase">
        <div className="flex justify-between">
          <span>EXPERIMENTAL WORK ENGINE</span>
          <span>LAT. 10.8° N // LON. 78.7° E</span>
        </div>
        <div className="flex justify-between">
          <span>EXECUTION CHAMBER // ONLINE</span>
          <span>SHIYAM.S / CREATIVE STUDIO</span>
        </div>
      </div>

      {/* Subtle Spatial Fine Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,85,0,0.04)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none opacity-40 z-0" />

      <div className="relative max-w-6xl mx-auto z-10 flex flex-col items-center">
        
        {/* ═══ 2. IGNITION TELEMETRY STATUS BAR ═══ */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0.3 }}
          className="w-full flex justify-between items-center font-mono text-xs text-neutral-400 pb-6 border-b border-white/10 mb-12 sm:mb-16"
        >
          <div className="flex items-center space-x-3">
            <span className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${
              isInView ? 'bg-[#FF5500] shadow-[0_0_14px_#FF5500] animate-pulse' : 'bg-neutral-600'
            }`} />
            <span className="font-bold tracking-widest uppercase text-white">
              {isInView ? 'WORK ENGINE ONLINE // EXECUTION CHAMBER IGNITED' : 'SYSTEM STANDBY'}
            </span>
          </div>

          <div className="hidden sm:flex items-center space-x-3 text-[11px]">
            <Radio className="w-3.5 h-3.5 text-[#FF5500] animate-pulse" />
            <span className="text-neutral-400 font-bold">SIGNAL TRACKER ACTIVE</span>
          </div>
        </motion.div>

        {/* ═══ 3. HERO EDITORIAL TYPOGRAPHY COMPOSITION ═══ */}
        <motion.div 
          style={{ x: parallaxX, y: parallaxY }}
          className="w-full max-w-5xl text-left my-8 sm:my-14 select-none space-y-1 sm:space-y-2"
        >
          {/* Micro Sequence Tag */}
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1 rounded-full bg-[#FF5500]/10 border border-[#FF5500]/30 backdrop-blur-md mb-4">
            <Zap className="w-3.5 h-3.5 text-[#FF5500] animate-pulse" />
            <span className="font-mono text-xs text-[#FF5500] font-black tracking-[0.25em] uppercase">
              TRANSFORMATION SEQUENCE // 01 → 04
            </span>
          </div>

          {/* Massive Spatial Typography Stack */}
          <div className="flex flex-col leading-[0.88] uppercase tracking-tighter">
            <span className="text-4xl sm:text-7xl lg:text-8xl font-black text-neutral-500/50">
              THE
            </span>
            <span className="text-6xl sm:text-9xl lg:text-[11vw] font-black text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.9)]">
              WORK
            </span>
            <div className="flex items-center space-x-4 sm:space-x-8 my-1 sm:my-3">
              <div className="h-[2px] w-12 sm:w-24 bg-[#FF5500] shadow-[0_0_20px_#FF5500]" />
              <span className="text-2xl sm:text-5xl lg:text-6xl font-light text-neutral-400 tracking-wider">
                IS THE
              </span>
            </div>
            <span className="text-6xl sm:text-9xl lg:text-[11vw] font-black text-[#FF5500] drop-shadow-[0_0_50px_rgba(255,85,0,0.7)] tracking-tighter">
              PROOF.
            </span>
          </div>
        </motion.div>

        {/* ═══ 4. CONTINUOUS SPATIAL ENERGY TRAIL & 4 SPATIAL MOMENTS ═══ */}
        <div className="w-full relative pt-12 sm:pt-16 pb-8">
          
          {/* Continuous Vertical Laser Energy Trail (Backbone) */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 -translate-x-1/2 w-[2px] bg-neutral-800 pointer-events-none z-0">
            <motion.div 
              className="w-full bg-gradient-to-b from-[#FF5500] via-amber-400 via-emerald-400 to-blue-500 shadow-[0_0_15px_#FF5500]"
              style={{ height: laserBeamHeight }}
            />
          </div>

          {/* 4 Continuous Spatial Moments */}
          <div className="space-y-16 sm:space-y-28 relative z-10">
            {spatialMoments.map((moment, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={moment.id}
                  style={{ opacity: moment.opacityVal }}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                    isEven ? 'sm:justify-start' : 'sm:justify-end'
                  } pl-12 sm:pl-0`}
                >
                  {/* Laser Junction Node Ring */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-0 sm:top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#050508] border-2 border-[#FF5500] shadow-[0_0_20px_#FF5500] flex items-center justify-center z-20">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5500] animate-ping" />
                  </div>

                  {/* Spatial Moment Content Block (No card borders or boxes!) */}
                  <div className={`w-full sm:w-[44%] space-y-3 ${
                    isEven ? 'sm:pr-12 sm:text-right' : 'sm:pl-12 sm:text-left'
                  }`}>
                    {/* Micro Technical Tag */}
                    <div className={`flex items-center space-x-2 font-mono text-xs text-[#FF5500] font-bold tracking-widest uppercase ${
                      isEven ? 'sm:justify-end' : 'sm:justify-start'
                    }`}>
                      <span>{moment.id} //</span>
                      <span>{moment.phase}</span>
                    </div>

                    {/* Editorial Spatial Statement */}
                    <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-tight">
                      "{moment.statement}"
                    </h3>

                    {/* Explanatory Context */}
                    <p className="font-mono text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-md">
                      {moment.detail}
                    </p>

                    {/* Micro Telemetry Callout Tag */}
                    <div className={`inline-flex items-center space-x-2 pt-1 font-mono text-[10px] text-neutral-500 tracking-wider uppercase ${
                      isEven ? 'sm:justify-end' : 'sm:justify-start'
                    }`}>
                      <Activity className="w-3 h-3 text-[#FF5500]" />
                      <span>{moment.microTag}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* ═══ 5. TRANSITION TO PROJECTS: EXECUTION COMPLETE ═══ */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 sm:mt-24 text-center space-y-5 z-20"
        >
          {/* Execution Complete Micro Tag */}
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-[#FF5500]/10 border border-[#FF5500]/30 font-mono text-xs text-[#FF5500] font-black tracking-widest uppercase shadow-[0_0_20px_rgba(255,85,0,0.3)]">
            <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse" />
            <span>EXECUTION COMPLETE // CONTINUOUS REACTION</span>
          </div>

          <div className="font-mono text-xs text-neutral-400 tracking-[0.25em] uppercase">
            DON'T WAIT FOR THE RIGHT TIME. <span className="text-[#FF5500] font-bold">MAKE THE TIME RIGHT.</span>
          </div>

          <div className="pt-3">
            <button
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center space-x-3 px-8 py-4 rounded-xl bg-[#FF5500] text-black font-mono text-xs font-black uppercase tracking-wider hover:bg-white hover:shadow-[0_0_45px_rgba(255,85,0,0.7)] transition-all duration-300 group cursor-pointer"
            >
              <span>EXPLORE THE WORK →</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Scene03bDoItLight;
