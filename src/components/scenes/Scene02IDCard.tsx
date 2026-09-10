import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { CheckCircle2, QrCode, ShieldCheck, Zap, Scan, Radio } from 'lucide-react';
import { useMousePosition } from '@/hooks/useMousePosition';
import { portfolioData } from '@/data/portfolioData';
import smLogoImg from '@/assets/shiyam-sm-logo.png';
import idCardArtwork from '@/assets/shiyam-id-card-artwork.png';

interface SceneProps {
  onNavigate: (sectionId: string) => void;
}

/**
 * Scene02IDCard — SHIYAM // DIGITAL IDENTITY ARCHIVE
 * Signature 3D Depth & Cinematic Scroll Discovery Experience
 */
export const Scene02IDCard: React.FC<SceneProps> = ({ onNavigate }) => {
  const { normalizedX, normalizedY } = useMousePosition();
  const [isFlipped, setIsFlipped] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastClickTimeRef = useRef<number>(0);
  const { personal, stats } = portfolioData;

  // Synchronous Preloading of ID Card & Asset Textures for 0ms render delay
  useEffect(() => {
    const img1 = new Image();
    img1.src = idCardArtwork;
    const img2 = new Image();
    img2.src = smLogoImg;
  }, []);

  // Double-Click / Double-Tap Flip Detection
  const handleCardInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - lastClickTimeRef.current;
    
    if (timeDiff > 0 && timeDiff < 320) {
      e.preventDefault();
      setIsFlipped((prev) => !prev);
      lastClickTimeRef.current = 0;
    } else {
      lastClickTimeRef.current = currentTime;
    }
  };

  // Scroll Progress mapped from early viewport entry (start 0.95) to exit (end start)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.95", "end start"]
  });

  // Smooth GPU Physics Inertia
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 18,
    restDelta: 0.0001
  });

  // ═══ MULTI-LAYER DEPTH PARALLAX TRANSFORMS ═══
  
  // Layer 0: Background Circular Radar Parallax Movement
  const radarY = useTransform(smoothProgress, [0, 1], [-40, 60]);
  const radarScale = useTransform(smoothProgress, [0, 0.5, 1], [0.95, 1.05, 0.95]);

  // Layer 1: Ambient Backlight Parallax & Glow Intensity
  const glowScale = useTransform(smoothProgress, [0, 0.4, 0.8, 1], [0.85, 1.1, 1.0, 0.85]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.08, 0.92, 1], [0, 1, 1, 0.5]);

  // Layer 2: Perimeter Archive Frame & Telemetry Brackets
  const frameOpacity = useTransform(smoothProgress, [0, 0.12, 0.90, 1.0], [0, 0.7, 0.7, 0.3]);
  const frameScale = useTransform(smoothProgress, [0, 0.3, 0.8, 1.0], [0.96, 1.0, 1.0, 0.96]);

  // Layer 3: Main Physical ID Card Descent & Physics Fall
  const cardY = useTransform(smoothProgress, [0, 0.18, 0.22, 0.88, 1.0], [-135, 5, 0, 0, -30]);
  const cardOpacity = useTransform(smoothProgress, [0, 0.06, 0.92, 1.0], [0, 1, 1, 0.4]);
  const cardScale = useTransform(smoothProgress, [0, 0.18, 0.22, 0.88, 1.0], [0.88, 1.02, 1.0, 1.0, 0.94]);
  const cardRotateX = useTransform(smoothProgress, [0, 0.18, 0.82, 1.0], [16, 0, 0, -4]);
  const cardRotateZ = useTransform(smoothProgress, [0, 0.18, 0.82, 1.0], [-4, 0, 0, 2]);

  // Layer 4: Elegant Identity Scanner Sweep
  const scanLineY = useTransform(smoothProgress, [0.08, 0.65], ["-5%", "105%"]);
  const verifiedBadgeOpacity = useTransform(smoothProgress, [0.10, 0.24], [0, 1]);
  const orbitPathLength = useTransform(smoothProgress, [0.02, 0.45], [0, 1]);

  // Dynamic 3D Mouse Parallax Tilt
  const tiltX = normalizedY * 7;
  const tiltY = normalizedX * 9;

  return (
    <section
      ref={containerRef}
      id="id-card"
      className="relative min-h-[105vh] sm:min-h-[115vh] w-full bg-[#020204] text-white font-sans overflow-hidden select-none z-20 m-0 p-0"
    >
      {/* STICKY FULLSCREEN VIEWPORT STAGE */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-between px-4 sm:px-6 pt-14 sm:pt-16 pb-6 sm:pb-8 overflow-hidden">
        
        {/* ═══ LAYER 0: FAINT CIRCULAR RADAR SCANNING RINGS (DEEP BACKGROUND) ═══ */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
          style={{ y: radarY, scale: radarScale, opacity: cardOpacity }}
        >
          <svg className="w-[700px] sm:w-[900px] h-[700px] sm:h-[900px] opacity-15" viewBox="0 0 900 900" fill="none">
            <circle cx="450" cy="450" r="420" stroke="#FF5500" strokeWidth="1" strokeDasharray="4 8" />
            <circle cx="450" cy="450" r="320" stroke="#FF5500" strokeWidth="1" strokeDasharray="12 12" />
            <circle cx="450" cy="450" r="220" stroke="#FF5500" strokeWidth="1" strokeDasharray="2 6" />
            <line x1="450" y1="30" x2="450" y2="870" stroke="#FF5500" strokeWidth="0.5" strokeDasharray="6 6" />
            <line x1="30" y1="450" x2="870" y2="450" stroke="#FF5500" strokeWidth="0.5" strokeDasharray="6 6" />
          </svg>
        </motion.div>

        {/* ═══ LAYER 1: AMBIENT VOLUMETRIC STUDIO BACKLIGHT ═══ */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] sm:w-[900px] h-[720px] sm:h-[900px] bg-gradient-to-b from-[#FF5500]/25 via-[#F59E0B]/08 to-transparent blur-[140px] pointer-events-none z-0"
          style={{ scale: glowScale, opacity: glowOpacity }}
        />

        {/* Subtle Background Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,85,0,0.05)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none opacity-40 z-0" />

        {/* Floating Ambient GPU Dust Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-1/4 left-1/5 w-1.5 h-1.5 rounded-full bg-[#FF5500]/40 blur-[1px] animate-[ping_7s_infinite]" />
          <div className="absolute top-1/3 right-1/5 w-2 h-2 rounded-full bg-[#F59E0B]/30 blur-[1px] animate-[pulse_5s_infinite]" />
          <div className="absolute bottom-1/4 left-1/3 w-1 h-1 rounded-full bg-[#FF5500]/40 animate-[ping_9s_infinite]" />
        </div>

        {/* ═══ LAYER 2: ELEGANT PERIMETER ARCHIVE FRAME & HUD TELEMETRY ═══ */}
        <motion.div
          className="absolute inset-4 sm:inset-8 border border-[#FF5500]/20 rounded-3xl pointer-events-none z-10 flex flex-col justify-between p-4 sm:p-6"
          style={{ opacity: frameOpacity, scale: frameScale }}
        >
          {/* Top Frame Corner Brackets & Telemetry */}
          <div className="flex justify-between items-start font-mono text-[10px] sm:text-xs text-neutral-400 tracking-[0.25em] uppercase">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse" />
              <span className="text-[#FF5500] font-black">SYS.ID // ARCHIVE 01</span>
            </div>
            <div className="hidden sm:flex items-center space-x-2 text-neutral-400">
              <Radio className="w-3.5 h-3.5 text-[#FF5500] animate-pulse" />
              <span>STATUS // ACCESS VERIFIED</span>
            </div>
          </div>

          {/* Frame Laser Corner Accents */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#FF5500]" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#FF5500]" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#FF5500]" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#FF5500]" />

          {/* Bottom Frame Telemetry */}
          <div className="flex justify-between items-end font-mono text-[10px] sm:text-xs text-neutral-400 tracking-[0.25em] uppercase">
            <div>SUBJECT // SHIYAM.S</div>
            <div className="hidden sm:block">SYS.LAT 10.8° N // WEB DEV</div>
          </div>
        </motion.div>

        {/* Technical Orbit Trajectory Line around Card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[490px] aspect-[1/1.25] pointer-events-none z-20">
          <svg className="w-full h-full" viewBox="0 0 490 610" fill="none">
            <motion.path
              d="M 25 50 L 465 50 C 475 50 480 55 480 65 L 480 545 C 480 555 475 560 465 560 L 25 560 C 15 560 10 555 10 545 L 10 65 C 10 55 15 50 25 50 Z"
              stroke="#FF5500"
              strokeWidth="1.5"
              strokeDasharray="8 8"
              style={{
                pathLength: orbitPathLength,
                opacity: cardOpacity,
              }}
            />
          </svg>
        </div>

        {/* Section Header Title Telemetry */}
        <motion.div
          className="relative z-30 font-mono text-xs text-neutral-400 tracking-[0.25em] uppercase flex items-center space-x-2 pt-2 sm:pt-4"
          style={{ opacity: cardOpacity }}
        >
          <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse" />
          <span>SHIYAM // DIGITAL IDENTITY ARCHIVE</span>
        </motion.div>

        {/* ═══ LAYER 3: PHYSICAL ID CARD & LANYARD FLOATING IN 3D SPACE ═══ */}
        <div className="relative w-full max-w-sm sm:max-w-md aspect-[1/1.28] flex flex-col items-center justify-start z-30 my-auto">
          
          {/* LANYARD ROPE & METAL CARABINER ASSEMBLY */}
          <motion.div
            className="absolute -top-[1070px] left-1/2 -translate-x-1/2 w-20 sm:w-22 flex flex-col items-center z-30 pointer-events-none"
            style={{
              y: cardY,
              scale: cardScale,
              opacity: cardOpacity,
              rotateX: cardRotateX,
              rotateZ: cardRotateZ,
              transformOrigin: 'top center',
            }}
          >
            {/* Woven Technical Strap */}
            <div className="w-16 sm:w-18 h-[1030px] bg-[#0A0C14] border-x-4 border-[#FF5500]/60 shadow-[0_0_40px_rgba(255,85,0,0.5)] flex flex-col items-center justify-around overflow-hidden py-8 text-xs sm:text-sm font-mono font-black text-[#FF5500] tracking-[0.25em] uppercase writing-vertical rotate-180 drop-shadow-[0_0_14px_rgba(255,85,0,0.9)]">
              <span className="opacity-95">SHIYAM S — WEB DEVELOPER</span>
              <span className="opacity-95">SHIYAM S — WEB DEVELOPER</span>
              <span className="opacity-95">SHIYAM S — WEB DEVELOPER</span>
              <span className="opacity-95">SHIYAM S — WEB DEVELOPER</span>
              <span className="opacity-95">SHIYAM S — WEB DEVELOPER</span>
              <span className="opacity-95">SHIYAM S — WEB DEVELOPER</span>
            </div>

            {/* Carabiner Latch */}
            <div className="w-10 h-12 rounded-t-xl bg-gradient-to-b from-neutral-200 via-neutral-500 to-neutral-800 border-2 border-white/60 shadow-2xl flex items-center justify-center relative -mt-1 z-40">
              <div className="w-3.5 h-3.5 rounded-full bg-neutral-950 border-2 border-[#FF5500] flex items-center justify-center shadow-inner">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
              </div>
            </div>

            {/* Steel Ring */}
            <div className="w-7 h-7 rounded-full border-4 border-neutral-300 shadow-2xl bg-gradient-to-tr from-neutral-600 via-neutral-200 to-neutral-600 relative -mt-2 z-40 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-neutral-950 border border-neutral-400" />
            </div>
          </motion.div>

          {/* PHYSICAL ID CARD WRAPPER WITH DEEP REALISTIC SHADOW */}
          <motion.div
            className="relative w-full h-full rounded-3xl cursor-pointer group shadow-[0_65px_120px_rgba(0,0,0,0.98)] pt-3"
            onClick={handleCardInteraction}
            onTouchEnd={handleCardInteraction}
            style={{
              y: cardY,
              scale: cardScale,
              opacity: cardOpacity,
              rotateX: cardRotateX,
              rotateZ: cardRotateZ,
              transformOrigin: 'center center',
              perspective: '1600px',
            }}
          >
            {/* Top Slot Header */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-gradient-to-b from-neutral-900 to-neutral-950 border-2 border-white/30 rounded-t-xl flex items-center justify-center space-x-2.5 z-30 shadow-lg">
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-950 border border-white/40" />
              <div className="w-6 h-3 rounded-full bg-neutral-950 border-2 border-[#FF5500] flex items-center justify-center shadow-inner">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF5500]" />
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-950 border border-white/40" />
            </div>

            {/* ═══ LAYER 4: ELEGANT IDENTITY SCANNER LINE SWEEP ═══ */}
            <motion.div
              className="absolute left-0 w-full h-8 bg-gradient-to-b from-transparent via-[#FF5500]/60 to-transparent z-40 pointer-events-none shadow-[0_0_24px_#FF5500]"
              style={{ top: scanLineY, opacity: cardOpacity }}
            >
              <div className="absolute right-3 -top-5 px-2 py-0.5 rounded bg-[#0B0D14]/90 border border-[#FF5500]/70 text-[9px] font-mono text-[#FF5500] font-black tracking-widest flex items-center space-x-1 shadow-md">
                <Scan className="w-3 h-3 text-[#FF5500] animate-pulse" />
                <span>IDENTITY SCAN // VERIFIED</span>
              </div>
            </motion.div>

            <div
              className="relative w-full h-full rounded-3xl transition-transform duration-700 ease-out"
              style={{
                transform: `rotateX(${tiltX}deg) rotateY(${tiltY + (isFlipped ? 180 : 0)}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* FRONT SIDE OF ID CARD */}
              <div
                className="absolute inset-0 w-full h-full rounded-3xl bg-[#08090E]/98 p-3 sm:p-5 flex flex-col justify-between overflow-hidden border-2 sm:border-4 border-[#FF5500]/60 shadow-[0_0_65px_rgba(255,85,0,0.45)] backdrop-blur-2xl"
                style={{ backfaceVisibility: 'hidden' }}
              >
                {/* Glare Flare */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.12] to-transparent pointer-events-none z-20" />

                {/* Verified Tick Badge */}
                <motion.div
                  className="absolute top-4 left-4 z-30 flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/60 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                  style={{ opacity: verifiedBadgeOpacity }}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 font-bold" />
                  <span className="text-[10px] font-mono text-emerald-400 font-extrabold tracking-wider">VERIFIED DEV ✓</span>
                </motion.div>

                {/* ID Card Image Artwork */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center bg-neutral-950 shadow-inner">
                  <img
                    src={idCardArtwork}
                    alt="SHIYAM S — Official ID Card Artwork"
                    className="w-full h-full object-contain rounded-xl filter contrast-105"
                  />

                  {/* Double-Click To Flip Badge */}
                  <div className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-full bg-[#0B0D14]/95 border border-[#FF5500]/70 text-[10px] font-mono text-[#FF5500] font-bold flex items-center space-x-1.5 z-30 shadow-lg backdrop-blur-md">
                    <QrCode className="w-3.5 h-3.5 text-[#FF5500]" />
                    <span>DOUBLE CLICK TO FLIP</span>
                  </div>
                </div>
              </div>

              {/* BACK SIDE OF ID CARD */}
              <div
                className="absolute inset-0 w-full h-full rounded-3xl bg-[#090A0F]/98 p-6 sm:p-8 flex flex-col justify-between border-2 sm:border-4 border-white/20 shadow-2xl backdrop-blur-2xl"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <div className="flex justify-between items-center font-mono text-xs sm:text-sm text-neutral-300 border-b border-white/10 pb-3">
                  <div className="flex items-center space-x-2.5">
                    <img src={smLogoImg} alt="SM Logo" className="w-6 h-6 object-contain filter drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]" />
                    <span className="font-bold tracking-wider">SECURITY VERIFICATION</span>
                  </div>
                  <div className="flex items-center space-x-1 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs">VERIFIED ✓</span>
                  </div>
                </div>

                <div className="space-y-4 font-mono text-xs text-neutral-200">
                  <p className="text-xs sm:text-sm leading-relaxed text-neutral-200 font-light">
                    "Official Digital Pass for Shiyam S — Creative Website & Full Stack Developer crafting modern high-performance web experiences."
                  </p>
                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                    <div className="flex justify-between text-xs text-neutral-400">
                      <span>PROJECTS COMPLETED:</span>
                      <span className="text-[#FF5500] font-bold">25+ Projects</span>
                    </div>
                    <div className="flex justify-between text-xs text-neutral-400">
                      <span>EXPERIENCE:</span>
                      <span className="text-[#FF5500] font-bold">3+ Years</span>
                    </div>
                    <div className="flex justify-between text-xs text-neutral-400">
                      <span>VERIFICATION STATUS:</span>
                      <span className="text-emerald-400 font-bold flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 inline" />
                        <span>AUTHENTICATED PASS</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-white/10 font-mono text-xs">
                  <span className="text-neutral-400">DOUBLE-CLICK TO FLIP BACK</span>
                  <span className="px-3 py-1 rounded-full bg-[#FF5500] text-black font-bold">VERIFIED PASS</span>
                </div>
              </div>

            </div>
          </motion.div>
        </div>

        {/* Transition Telemetry Connector */}
        <motion.div
          className="relative z-30 w-full flex flex-col items-center pt-2 pb-2"
          style={{ opacity: cardOpacity }}
        >
          <div className="flex items-center space-x-2 font-mono text-[10px] text-[#FF5500] font-extrabold tracking-[0.2em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-ping" />
            <span>IDENTITY ARCHIVE ACTIVE // SCROLL FOR ABOUT STORY</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-ping" />
          </div>
          <div className="w-[1px] h-5 bg-gradient-to-b from-[#FF5500]/60 to-transparent mt-1" />
        </motion.div>

      </div>
    </section>
  );
};

export default Scene02IDCard;


