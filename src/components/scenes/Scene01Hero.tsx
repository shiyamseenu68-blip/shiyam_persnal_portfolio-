import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Instagram, MapPin, MessageSquare, ChevronRight } from 'lucide-react';
import { useMousePosition } from '@/hooks/useMousePosition';
import portraitImg from '@/assets/shiyam-portrait-main.jpg';
import smLogoImg from '@/assets/shiyam-sm-logo.png';

interface SceneProps {
  onNavigate: (sectionId: string) => void;
}

/**
 * Scene01Hero — Editorial Cinema Poster Digital Identity HOME Scene
 * Preserves full original HOME section layout with Shiyam portrait, CTAs, role, and social hub.
 */
export const Scene01Hero: React.FC<SceneProps> = ({ onNavigate }) => {
  const { normalizedX, normalizedY } = useMousePosition();
  const containerRef = useRef<HTMLDivElement>(null);

  // GPU Scroll Camera Push-Through Motion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 24,
    restDelta: 0.001,
  });

  // Multi-Plane Camera Scroll Transforms
  const cameraScrollY = useTransform(smoothProgress, [0, 1], [0, -160]);
  const cameraScale = useTransform(smoothProgress, [0, 1], [1, 0.92]);
  const cameraOpacity = useTransform(smoothProgress, [0, 0.85], [1, 0]);
  const bgTitleY = useTransform(smoothProgress, [0, 1], [0, -80]);
  const portraitScrollY = useTransform(smoothProgress, [0, 1], [0, -200]);

  // Interactive 3D Magnetic Cursor Parallax Vectors
  const portraitParallaxX = normalizedX * -7;
  const portraitParallaxY = normalizedY * 7;
  const lightShiftX = normalizedX * 22;
  const lightShiftY = normalizedY * 22;
  const titleParallaxX = normalizedX * 10;

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-between px-4 sm:px-8 lg:px-16 pt-24 pb-12 overflow-hidden z-10 select-none bg-[#020204]"
    >
      {/* ═══ LAYER 0: DARK CINEMATIC CANVAS & GRID ═══ */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,85,0,0.04)_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none opacity-40" />

      {/* Studio Orange Ambient Backlight Source behind Subject */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-radial from-[#FF5500]/22 via-[#D94800]/06 to-transparent blur-[160px] pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(calc(-50% + ${lightShiftX}px), calc(-50% + ${lightShiftY}px), 0)`,
        }}
      />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] rounded-full bg-radial from-[#00F0FF]/07 to-transparent blur-[120px] pointer-events-none" />

      {/* ═══ LAYER 1: SIGNATURE ORANGE TRAJECTORY VECTOR LINE ═══ */}
      <motion.svg
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 0.8, pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M -100 450 Q 350 150 720 450 T 1540 450"
          stroke="url(#signature-orange-gradient)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
          className="opacity-70"
        />
        <defs>
          <linearGradient id="signature-orange-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF5500" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#FF5500" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FF8800" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        <circle cx="350" cy="280" r="3.5" fill="#FF5500" className="animate-ping opacity-75" />
        <circle cx="720" cy="450" r="4" fill="#FF5500" className="shadow-[0_0_12px_#FF5500]" />
        <circle cx="1100" cy="380" r="3" fill="#F59E0B" className="animate-pulse" />
      </motion.svg>

      {/* Top Right HUD Telemetry Label */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute top-28 right-6 lg:right-16 font-mono text-[10px] text-neutral-400 tracking-[0.25em] uppercase hidden md:flex items-center space-x-3 z-20"
      >
        <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse" />
        <span>SHIYAM.S // CREATIVE SYSTEM • DIGITAL IDENTITY SCENE</span>
      </motion.div>

      {/* ═══ LAYER 2 & 3: MAIN CINEMA POSTER STAGE ═══ */}
      <motion.div
        className="relative z-10 max-w-7xl w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        style={{
          y: cameraScrollY,
          scale: cameraScale,
          opacity: cameraOpacity,
        }}
      >
        {/* MOVIE TITLE SEQUENCE TYPOGRAPHY (PASSES BEHIND SUBJECT) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(16px)' }}
          animate={{ opacity: 0.22, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -top-20 sm:-top-28 left-0 w-full pointer-events-none z-0 overflow-hidden leading-none select-none"
          style={{
            y: bgTitleY,
            transform: `translate3d(${titleParallaxX}px, 0, 0)`,
          }}
        >
          <div className="font-display font-black text-[25vw] text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-[#FF5500]/50 tracking-tighter whitespace-nowrap">
            SHIYAM S
          </div>
        </motion.div>

        {/* ── LEFT COLUMN: METADATA & FOREGROUND CONTENT ── */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6 z-20 pt-4">
          {/* Status & Location Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-3"
          >
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-[#0B0D14]/90 border border-[#FF5500]/40 text-xs font-mono text-neutral-200 shadow-[0_4px_20px_rgba(255,85,0,0.2)] backdrop-blur-md">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#EF4444]" />
              </span>
              <span className="tracking-wider uppercase font-semibold text-neutral-200">
                AVAILABLE FOR OPPORTUNITIES
              </span>
            </div>

            <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-neutral-300">
              <MapPin className="w-3.5 h-3.5 text-[#FF5500]" />
              <span>Anywhere, Anytime</span>
            </div>
          </motion.div>

          {/* Heading & Role Title */}
          <div className="space-y-2 relative">
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center space-x-2 text-xl sm:text-2xl font-mono text-neutral-300"
            >
              <span className="w-4 h-[2px] bg-[#FF5500]" />
              <span>Hey, I'm</span>
            </motion.div>

            {/* MAIN SHIYAM S TITLE */}
            <motion.div
              initial={{ opacity: 0, y: 25, filter: 'blur(14px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-baseline flex-wrap gap-x-4"
            >
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-black tracking-tight leading-none text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]">
                SHIYAM
              </h1>

              <div className="flex items-center space-x-2">
                <span className="text-[#FF5500] font-mono text-3xl sm:text-5xl font-light">&lt;</span>
                <span className="text-5xl sm:text-7xl lg:text-8xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF5500] via-[#FF3300] to-[#FFA000] drop-shadow-[0_0_40px_rgba(255,85,0,0.85)]">
                  S
                </span>
                <span className="text-[#FF5500] font-mono text-3xl sm:text-5xl font-light">&gt;</span>
              </div>
            </motion.div>

            {/* Role Title */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="pt-1 flex items-center space-x-2"
            >
              <h2 className="text-xs sm:text-sm font-mono tracking-[0.25em] text-neutral-300 uppercase font-bold">
                <span className="text-[#FF5500] font-extrabold">CREATIVE</span> WEBSITE DEVELOPER
              </h2>
            </motion.div>
          </div>

          {/* Statement Tagline Description */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-lg"
          >
            I craft modern, interactive and high-performance web experiences that make an impact.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <button
              onClick={() => onNavigate('id-card')}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#FF5500] via-[#FF3300] to-[#FFA000] text-black font-bold font-mono text-xs tracking-widest uppercase hover:shadow-[0_0_35px_rgba(255,85,0,0.75)] hover:scale-105 transition-all duration-300 shadow-lg flex items-center space-x-2"
            >
              <span>VIEW MY WORK</span>
              <ChevronRight className="w-4 h-4 text-black font-bold" />
            </button>

            <button
              onClick={() => onNavigate('id-card')}
              className="px-8 py-4 rounded-full bg-[#0B0D14]/90 border border-white/20 text-white font-mono text-xs tracking-widest uppercase hover:border-[#FF5500] hover:bg-[#FF5500]/15 transition-all duration-300 flex items-center space-x-2 backdrop-blur-md"
            >
              <MessageSquare className="w-4 h-4 text-[#FF5500]" />
              <span>LET'S TALK</span>
            </button>
          </motion.div>

          {/* Social Icons Hub */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center space-x-4 pt-4 border-t border-white/10"
          >
            <a
              href="https://github.com/shiyamseenu68"
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-full bg-[#0B0D14] border border-white/15 text-white hover:border-[#FF5500] hover:text-[#FF5500] transition-all shadow-lg hover:scale-110"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href="https://linkedin.com/in/shiyam"
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-full bg-[#0077B5]/20 border border-[#0077B5]/50 text-[#00F0FF] hover:border-[#00F0FF] transition-all shadow-lg hover:scale-110"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4 text-[#00F0FF]" />
            </a>

            <a
              href="https://instagram.com/shiyam"
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-full bg-gradient-to-tr from-[#E4405F]/20 to-[#FF5500]/20 border border-[#E4405F]/50 text-[#E4405F] hover:border-[#FF5500] transition-all shadow-lg hover:scale-110"
              title="Instagram Profile"
            >
              <Instagram className="w-4 h-4 text-[#E4405F]" />
            </a>
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN: DOMINANT CHARACTER HERO SUBJECT ── */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[620px]">
          {/* Orbit Rings */}
          <div className="absolute w-[540px] h-[540px] rounded-full border border-[#FF5500]/20 pointer-events-none animate-[spin_55s_linear_infinite]" />
          <div className="absolute w-[440px] h-[440px] rounded-full border border-dashed border-white/10 pointer-events-none animate-[spin_35s_linear_infinite_reverse]" />

          {/* DOMINANT CHARACTER PORTRAIT REVEAL WITH ORANGE RIM LIGHT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, filter: 'blur(16px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-lg flex flex-col items-center"
            style={{
              y: portraitScrollY,
              transform: `translate3d(${portraitParallaxX}px, ${portraitParallaxY}px, 0)`,
            }}
          >
            {/* Annotation */}
            <div className="w-full flex items-center justify-between font-mono text-[9px] text-[#FF5500] pb-2 px-2 border-b border-[#FF5500]/30 mb-2">
              <span className="font-extrabold">// SHIYAM.S • CREATIVE SYSTEM</span>
              <span>SYSTEM ONLINE • LAT. 10.8° N</span>
            </div>

            {/* Character Portrait Image Stage */}
            <div className="relative w-full aspect-[3/4.2] max-h-[620px] overflow-visible group">
              {/* Corner HUD Accent Brackets */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#FF5500] z-30 pointer-events-none" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#FF5500] z-30 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#FF5500] z-30 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#FF5500] z-30 pointer-events-none" />

              {/* Natural Character Portrait Image */}
              <img
                src={portraitImg}
                alt="SHIYAM S — Digital Identity Character Poster"
                className="w-full h-full object-cover rounded-3xl filter contrast-105 shadow-[0_0_90px_rgba(255,85,0,0.5)] border border-[#FF5500]/45 transition-transform duration-700 group-hover:scale-[1.02]"
                loading="eager"
              />

              {/* Grounding Shadow */}
              <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#020204] via-[#020204]/80 to-transparent z-20 pointer-events-none rounded-b-3xl" />
            </div>

            {/* Bottom Annotation */}
            <div className="w-full flex items-center justify-between font-mono text-[9px] text-neutral-400 pt-2 px-2 border-t border-white/10 mt-2">
              <span>CREATIVE MODE</span>
              <span className="text-[#FF5500] font-extrabold">BUILDING DIGITAL EXPERIENCES</span>
            </div>
          </motion.div>

          {/* Official Personal Brand SM Logo Mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="absolute top-0 right-0 sm:-top-4 sm:-right-2 z-30 p-3 sm:p-4 rounded-3xl bg-[#0B0D14]/95 border-2 border-[#00F0FF]/60 shadow-[0_0_35px_rgba(0,240,255,0.45)] backdrop-blur-xl flex items-center space-x-3 transition-all duration-300 hover:scale-105"
            style={{
              transform: `translate3d(${portraitParallaxX * 0.4}px, ${portraitParallaxY * 0.4}px, 0)`,
            }}
          >
            <img
              src={smLogoImg}
              alt="SHIYAM S — Official Brand Logo Mark"
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain filter drop-shadow-[0_0_12px_rgba(0,240,255,0.6)]"
            />
            <div className="hidden sm:flex flex-col font-mono text-left">
              <span className="text-xs font-black text-white tracking-widest">SHIYAM.S</span>
              <span className="text-[9px] text-[#00F0FF] tracking-wider font-bold">PERSONAL BRAND</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* FOOTER NAVIGATION TELEMETRY & SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="relative z-20 max-w-7xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between pointer-events-none text-[10px] font-mono text-neutral-400 gap-2"
      >
        <div className="hidden md:flex items-center space-x-2">
          <span>Crafting Digital Experiences</span>
          <span className="text-[#FF5500] font-bold">• • •</span>
        </div>

        <div
          onClick={() => onNavigate('id-card')}
          className="pointer-events-auto flex items-center space-x-2 cursor-pointer text-neutral-300 hover:text-[#FF5500] transition-colors tracking-widest uppercase font-bold"
        >
          <span>SCROLL TO EXPLORE ID PASS</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#FF5500] animate-bounce" />
        </div>

        <div className="hidden md:flex items-center space-x-2">
          <span>Code</span>
          <span className="text-[#FF5500]">•</span>
          <span>Design</span>
          <span className="text-[#FF5500]">•</span>
          <span>Create</span>
        </div>
      </motion.div>
    </section>
  );
};

export default Scene01Hero;
