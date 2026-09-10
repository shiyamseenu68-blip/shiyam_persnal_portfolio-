import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Code2, Smartphone, Globe, Rocket, Coffee, Smile, Sparkles, Terminal, UserCheck, Layers, Scan, ArrowRight } from 'lucide-react';
import { useMousePosition } from '@/hooks/useMousePosition';
import aboutPortraitImg from '@/assets/shiyam-about-cutout.png';

interface Props {
  onNavigate: (id: string) => void;
}

/**
 * Scene03About — "THE PERSON BEHIND THE CODE"
 * Signature Cinematic Film Sequence & 3D Personal Identity Experience
 */
export const Scene03About: React.FC<Props> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { normalizedX, normalizedY } = useMousePosition();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Preload Portrait Image
  useEffect(() => {
    const img = new Image();
    img.src = aboutPortraitImg;
  }, []);

  // Frame-Accurate GPU Scroll Progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.95", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 18,
    restDelta: 0.0001
  });

  // ═══ 3D SPATIAL TRANSFORM PIPELINE ═══

  // Phase 1 (0.00 -> 0.25): Mega Background Typography & Radar Matrix
  const bgTypoOpacity = useTransform(smoothProgress, [0, 0.12, 0.88, 1], [0, 0.40, 0.40, 0]);
  const bgTypoScale = useTransform(smoothProgress, [0, 0.3, 0.8, 1], [0.94, 1.0, 1.0, 0.95]);

  // Phase 2 (0.05 -> 0.35): Volumetric Orange Backlight Bloom
  const glowScale = useTransform(smoothProgress, [0, 0.4, 0.85], [0.8, 1.15, 0.9]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.08, 0.88, 1], [0, 1, 1, 0]);

  // Phase 3 (0.05 -> 0.30): Statement 1 — "EVERYTHING HAPPENS FOR A REASON."
  const stmt1Y = useTransform(smoothProgress, [0.05, 0.22, 0.35], [35, 0, -15]);
  const stmt1Opacity = useTransform(smoothProgress, [0.05, 0.18, 0.32, 0.42], [0, 1, 1, 0.3]);

  // Phase 4 (0.18 -> 0.45): Statement 2 — "BUT NOTHING HAPPENS WITHOUT ACTION."
  const stmt2Y = useTransform(smoothProgress, [0.18, 0.32, 0.45], [35, 0, -15]);
  const stmt2Opacity = useTransform(smoothProgress, [0.18, 0.28, 0.42, 0.52], [0, 1, 1, 0.4]);

  // Phase 5 (0.30 -> 0.70): HERO STATEMENT — "DO IT."
  const doItScale = useTransform(smoothProgress, [0.28, 0.42, 0.75, 1], [0.88, 1.0, 1.0, 0.94]);
  const doItY = useTransform(smoothProgress, [0.28, 0.42, 0.75, 1], [40, 0, 0, -30]);
  const doItOpacity = useTransform(smoothProgress, [0.28, 0.38, 0.85, 1], [0, 1, 1, 0]);
  const doItLightSweep = useTransform(smoothProgress, [0.35, 0.65], ["-100%", "200%"]);

  // Phase 6 (0.45 -> 0.78): Statement 3 — "NO PERFECT TIME. NO PERFECT PLAN. JUST START."
  const stmt3Y = useTransform(smoothProgress, [0.45, 0.58], [35, 0]);
  const stmt3Opacity = useTransform(smoothProgress, [0.45, 0.55], [0, 1]);

  // Phase 7 (0.10 -> 0.50): Portrait 3D Emergence into Focus
  const portraitY = useTransform(smoothProgress, [0.08, 0.35, 0.85, 1], [70, 0, 0, -40]);
  const portraitScale = useTransform(smoothProgress, [0.08, 0.35, 0.85, 1], [0.90, 1.0, 1.0, 0.94]);
  const portraitOpacity = useTransform(smoothProgress, [0.08, 0.20, 0.85, 1], [0, 1, 1, 0]);

  // SIGNATURE INTERACTION: Horizontal Identity Scan Line Sweep
  const scanLineY = useTransform(smoothProgress, [0.08, 0.75], ["5%", "95%"]);

  // Stats Dashboard Lock (Bottom)
  const statsY = useTransform(smoothProgress, [0.40, 0.60], [30, 0]);
  const statsOpacity = useTransform(smoothProgress, [0.40, 0.60], [0, 1]);

  // Dynamic 3D Mouse Parallax (Disabled on Mobile)
  const portraitMouseX = isMobile ? 0 : normalizedX * -10;
  const portraitMouseY = isMobile ? 0 : normalizedY * 6;
  const bgMouseX = isMobile ? 0 : normalizedX * 14;
  const bgMouseY = isMobile ? 0 : normalizedY * -8;
  const typoMouseX = isMobile ? 0 : normalizedX * 8;
  const typoMouseY = isMobile ? 0 : normalizedY * -5;

  const stats = [
    { icon: Code2, v: '25+', l: 'WEB PROJECTS' },
    { icon: Smartphone, v: '10+', l: 'MOBILE FRIENDLY' },
    { icon: Globe, v: '15+', l: 'REAL-WORLD SOLUTIONS' },
    { icon: Rocket, v: '5+', l: 'FULL STACK APPS' },
    { icon: Coffee, v: '∞', l: 'CUPS OF COFFEE' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#050508] text-white font-sans overflow-hidden select-none z-20 py-12 sm:py-16 px-4 sm:px-8 flex flex-col justify-between"
    >
      {/* FULLSCREEN VIEWPORT STAGE */}
      <div className="relative w-full flex-1 flex flex-col justify-between overflow-hidden">
        
        {/* ═══ LAYER 0: FAINT ARCHITECTURAL MEGA TYPOGRAPHY (DEEP BACKGROUND) ═══ */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none z-0"
          style={{
            opacity: bgTypoOpacity,
            scale: bgTypoScale,
            x: bgMouseX,
            y: bgMouseY,
          }}
        >
          <div className="font-mono text-[20vw] font-black text-white/[0.03] tracking-tighter leading-none select-none uppercase">
            SHIYAM.S
          </div>
          <div className="font-mono text-[13vw] font-black text-[#FF5500]/[0.03] tracking-widest leading-none select-none uppercase -mt-6">
            PHILOSOPHY
          </div>
        </motion.div>

        {/* ═══ LAYER 1: VOLUMETRIC BURNT-ORANGE AMBIENT SPOTLIGHT ═══ */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] sm:w-[920px] h-[720px] sm:h-[920px] bg-gradient-to-b from-[#FF5500]/22 via-[#F59E0B]/06 to-transparent blur-[140px] pointer-events-none z-0"
          style={{ scale: glowScale, opacity: glowOpacity }}
        />

        {/* Subtle Matrix Code Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,85,0,0.05)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none opacity-40 z-0" />

        {/* Floating Subtle Ambient GPU Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-1/4 left-1/5 w-1.5 h-1.5 rounded-full bg-[#FF5500]/40 blur-[1px] animate-[ping_7s_infinite]" />
          <div className="absolute top-1/3 right-1/5 w-2 h-2 rounded-full bg-[#F59E0B]/30 blur-[1px] animate-[pulse_5s_infinite]" />
          <div className="absolute bottom-1/4 left-1/3 w-1 h-1 rounded-full bg-[#FF5500]/40 animate-[ping_9s_infinite]" />
        </div>

        {/* ═══ SIGNATURE VISUAL INTERACTION: HORIZONTAL DATA DECODE SCAN LINE ═══ */}
        <motion.div
          className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FF5500] to-transparent z-40 pointer-events-none shadow-[0_0_15px_#FF5500]"
          style={{ top: scanLineY, opacity: glowOpacity }}
        >
          <div className="absolute right-4 -top-5 px-2 py-0.5 rounded bg-[#0B0D14]/90 border border-[#FF5500]/70 text-[9px] font-mono text-[#FF5500] font-black tracking-widest flex items-center space-x-1 shadow-md">
            <Scan className="w-3 h-3 text-[#FF5500] animate-pulse" />
            <span>SYSTEM DECODE // ACTIVE</span>
          </div>
        </motion.div>

        {/* ═══ FLOATING SOURCE CODE MATRIX FRAGMENTS ═══ */}
        <div className="absolute top-16 left-6 hidden lg:block font-mono text-[11px] text-[#FF5500]/40 leading-relaxed pointer-events-none z-1 max-w-sm opacity-60">
          <div className="text-neutral-500">// ARCHIVAL IDENTITY SPECIFICATION</div>
          <div><span className="text-[#FF5500]">const</span> developer = <span className="text-white">{"{"}</span></div>
          <div className="pl-4">name: <span className="text-[#FF5500]">"Shiyam S"</span>,</div>
          <div className="pl-4">philosophy: <span className="text-[#FF5500]">"EVERYTHING HAPPENS FOR A REASON"</span>,</div>
          <div className="pl-4">rule: <span className="text-emerald-400">"DO IT."</span></div>
          <div><span className="text-white">{"}"}</span>;</div>
        </div>

        <div className="absolute bottom-24 right-6 hidden lg:block font-mono text-[11px] text-neutral-400/40 leading-relaxed pointer-events-none z-1 max-w-sm opacity-60 text-right">
          <div className="text-neutral-500">// ACTION EXECUTION PIPELINE</div>
          <div><span className="text-[#FF5500]">async function</span> executeAction() <span className="text-white">{"{"}</span></div>
          <div className="pr-4"><span className="text-[#FF5500]">await</span> action.startNow();</div>
          <div className="pr-4">return <span className="text-emerald-400">"NO_PERFECT_TIME"</span>;</div>
          <div><span className="text-white">{"}"}</span></div>
        </div>

        {/* ═══ LAYER 2: TOP ARCHIVAL HEADER TELEMETRY BAR ═══ */}
        <div className="relative z-30 flex justify-between items-center font-mono text-xs text-neutral-400 tracking-[0.25em] uppercase pt-2">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse" />
            <span className="text-white font-bold">03 // ABOUT THE DEVELOPER</span>
          </div>
          <div className="hidden sm:flex items-center space-x-3 text-neutral-400">
            <span className="px-2.5 py-0.5 rounded bg-[#FF5500]/15 border border-[#FF5500]/40 text-[#FF5500] text-[10px] font-black">
              STATUS: ACTIVE
            </span>
            <span>LAT. 10.8° N</span>
          </div>
        </div>

        {/* ═══ LAYER 3: SCROLL STORYTELLING & 3D EDITORIAL COMPOSITION ═══ */}
        <div className="relative flex-1 grid grid-cols-1 lg:grid-cols-12 items-center gap-6 z-20 my-auto">
          
          {/* LEFT COLUMN: SCROLL STORYTELLING TYPOGRAPHY STACK (Col 1-7) */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-6 z-30"
            style={{ x: typoMouseX, y: typoMouseY }}
          >
            {/* Minimal Intro Label */}
            <div className="flex items-center space-x-3">
              <div className="h-[2px] w-8 bg-[#FF5500] shadow-[0_0_10px_#FF5500]" />
              <span className="font-mono text-xs text-[#FF5500] font-extrabold tracking-[0.3em] uppercase">
                THE PERSON BEHIND THE CODE
              </span>
            </div>

            {/* SCROLL STORY STEP 1: "EVERYTHING HAPPENS FOR A REASON." */}
            <motion.div
              className="space-y-1"
              style={{ y: stmt1Y, opacity: stmt1Opacity }}
            >
              <div className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
                [ PHILOSOPHY 01 ]
              </div>
              <h3 className="text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight uppercase leading-snug">
                EVERYTHING HAPPENS FOR A REASON.
              </h3>
            </motion.div>

            {/* SCROLL STORY STEP 2: "BUT NOTHING HAPPENS WITHOUT ACTION." */}
            <motion.div
              className="space-y-1"
              style={{ y: stmt2Y, opacity: stmt2Opacity }}
            >
              <div className="font-mono text-xs text-[#FF5500] tracking-widest uppercase font-bold">
                [ ACTION RULE ]
              </div>
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400 tracking-tight uppercase leading-none">
                BUT NOTHING HAPPENS WITHOUT ACTION.
              </h3>
            </motion.div>

            {/* ═══ SCROLL STORY STEP 3: "DO IT." HERO DOMINANT STATEMENT ═══ */}
            <motion.div
              className="relative py-2"
              style={{ scale: doItScale, y: doItY, opacity: doItOpacity }}
            >
              {/* Dynamic Orange Light Sweep Flare across Text */}
              <div className="relative inline-block">
                <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black text-[#FF5500] tracking-tighter leading-none drop-shadow-[0_0_40px_rgba(255,85,0,0.65)] select-none">
                  DO IT.
                </h1>

                {/* Animated Light Sweep Flare Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent mix-blend-overlay pointer-events-none"
                  style={{ x: doItLightSweep }}
                />
              </div>
            </motion.div>

            {/* SCROLL STORY STEP 4: "NO PERFECT TIME. NO PERFECT PLAN. JUST START." */}
            <motion.div
              className="space-y-3"
              style={{ y: stmt3Y, opacity: stmt3Opacity }}
            >
              <div className="text-sm sm:text-lg font-mono text-neutral-300 font-bold uppercase tracking-wide border-l-2 border-[#FF5500] pl-3">
                NO PERFECT TIME. NO PERFECT PLAN. <span className="text-[#FF5500] font-black">JUST START.</span>
              </div>

              {/* ═══ PERSONAL SIGNATURE PHILOSOPHY BADGE ═══ */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#0B0D14]/90 border border-[#FF5500]/50 shadow-[0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl max-w-lg space-y-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#FF5500]" />
                <div className="flex items-center space-x-2 font-mono text-[10px] text-[#FF5500] font-extrabold tracking-widest uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF5500]" />
                  <span>PERSONAL SIGNATURE</span>
                </div>
                <div className="text-lg sm:text-2xl font-black text-white tracking-wide flex items-center space-x-2">
                  <span>ALWAYS BE HAPPY.</span>
                  <span className="text-[#FF5500] underline decoration-[#FF5500]/60 underline-offset-4">ALWAYS SMILE.</span>
                  <Smile className="w-6 h-6 text-[#FF5500] inline-block ml-1 animate-bounce" />
                </div>
              </div>
            </motion.div>

          </motion.div>

          {/* RIGHT COLUMN: PORTRAIT SUBJECT WITH EDITORIAL FRAME (Col 8-12) */}
          <motion.div
            className="lg:col-span-5 relative flex items-center justify-center h-[380px] sm:h-[480px] lg:h-[540px] z-20"
            style={{
              y: portraitY,
              scale: portraitScale,
              opacity: portraitOpacity,
              x: portraitMouseX,
            }}
          >
            {/* Technical Frame Bracket Background */}
            <div className="absolute inset-2 sm:inset-4 rounded-3xl border border-[#FF5500]/30 pointer-events-none z-0 shadow-[0_0_40px_rgba(255,85,0,0.15)]">
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#FF5500]" />
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#FF5500]" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#FF5500]" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#FF5500]" />
            </div>

            {/* Glowing Orange Backdrop Aura */}
            <div className="absolute w-[280px] sm:w-[360px] h-[280px] sm:h-[360px] rounded-full bg-[#FF5500]/20 blur-[80px] pointer-events-none" />

            {/* MAIN PORTRAIT SUBJECT IMAGE */}
            <div className="relative w-full h-full flex items-center justify-center z-10 p-4">
              <img
                src={aboutPortraitImg}
                alt="SHIYAM S — Creative Web & Full Stack Developer"
                className="max-h-full max-w-full object-contain filter contrast-105 drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
              />
              
              {/* Floor Shadow Blend */}
              <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#050508] to-transparent pointer-events-none" />
            </div>

            {/* Micro Coordinates Callout Tag */}
            <div className="absolute bottom-6 right-6 px-3 py-1 rounded bg-[#0B0D14]/95 border border-[#FF5500]/60 text-[10px] font-mono text-[#FF5500] font-bold tracking-widest z-30 shadow-lg backdrop-blur-md">
              SHIYAM.S // ARCHIVE PORTRAIT
            </div>
          </motion.div>

        </div>

        {/* ═══ LAYER 4: STATS & SKILL TELEMETRY METRICS DASHBOARD (BOTTOM) ═══ */}
        <motion.div
          className="relative z-30 border-t border-white/10 pt-4 pb-2 grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4"
          style={{ y: statsY, opacity: statsOpacity }}
        >
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="flex items-center space-x-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#FF5500]/50 hover:bg-[#FF5500]/10 transition-all duration-300 group cursor-pointer"
              >
                <div className="p-2 rounded-lg bg-[#FF5500]/15 text-[#FF5500] group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-black text-white group-hover:text-[#FF5500] transition-colors leading-none">
                    {s.v}
                  </div>
                  <div className="text-[9px] font-mono text-neutral-400 tracking-wider uppercase mt-1 leading-tight">
                    {s.l}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default Scene03About;

