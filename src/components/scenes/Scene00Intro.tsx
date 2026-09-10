import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';
import { Terminal, Compass, Zap, ArrowRight, Activity, ShieldAlert, Sparkles, Orbit } from 'lucide-react';
import smLogoImg from '@/assets/shiyam-sm-logo.png';

interface Scene00IntroProps {
  onComplete: () => void;
  onNavReveal: () => void;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  alpha: number;
  color: string;
}

interface Star {
  x: number;
  y: number;
  z: number;
  pz: number;
}

/**
 * Scene00Intro — CYBER SPATIAL IGNITION & 3D WARP HYPERDRIVE INTRO
 * Fully Responsive across Mobile, Tablet, Laptop, and Desktop (320px to 4K Displays).
 */
export const Scene00Intro: React.FC<Scene00IntroProps> = ({ onComplete, onNavReveal }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { normalizedX, normalizedY } = useMousePosition();

  // Multi-axis 3D spatial tilt vectors for text hovering
  const tiltX = normalizedY * -16;
  const tiltY = normalizedX * 18;

  // System Progress State (0 to 100)
  const [progress, setProgress] = useState<number>(0);

  // Intro Phase Engine
  const [phase, setPhase] = useState<number>(0);
  const [showRedAccent, setShowRedAccent] = useState<boolean>(false);
  const [isWarping, setIsWarping] = useState<boolean>(false);

  // Letter array for SHIYAM and .S
  const mainLetters = ['S', 'H', 'I', 'Y', 'A', 'M'];
  const dotLetters = ['.', 'S'];

  // Fast forward / Skip Handler (Triggers Warp Speed Transition)
  const triggerWarpExit = () => {
    setIsWarping(true);
    onNavReveal();
    setTimeout(() => {
      onComplete();
    }, 750);
  };

  // Keyboard shortcut listener (SPACE to skip)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        triggerWarpExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // System progress timer & Phase control
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 36);

    // Phase 1: Core Explosion (0.5s)
    const t1 = setTimeout(() => setPhase(1), 500);

    // Phase 2: 3D Monolith Typography Reveal (1.3s)
    const t2 = setTimeout(() => setPhase(2), 1300);

    // Phase 3: Identity Ignition (2.8s)
    const t3 = setTimeout(() => setPhase(3), 2800);

    // Phase 4: Rare Red Alert Moment (3.6s)
    const t4 = setTimeout(() => {
      setPhase(4);
      setShowRedAccent(true);
      setTimeout(() => setShowRedAccent(false), 950);
    }, 3600);

    // Phase 5: Warp Hyperdrive Zoom Exit (4.8s)
    const t5 = setTimeout(() => {
      setPhase(5);
      triggerWarpExit();
    }, 4800);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  // Canvas 2D Atmospheric Cyber Spatial Ignition & Warp Speed Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Spatial Stars for Hyperdrive Effect
    const starCount = window.innerWidth < 768 ? 100 : 200;
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: (Math.random() - 0.5) * width * 2,
      y: (Math.random() - 0.5) * height * 2,
      z: Math.random() * width,
      pz: Math.random() * width,
    }));

    // Particle Embers
    const particleCount = window.innerWidth < 768 ? 50 : 90;
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      vz: 0,
      size: Math.random() * 2.5 + 0.6,
      alpha: Math.random() * 0.7 + 0.2,
      color: Math.random() > 0.85 ? '#EF4444' : '#FF5500',
    }));

    let animTime = 0;
    let shockwaveRadius = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      animTime += 0.025;

      const centerX = width * 0.5;
      const centerY = height * 0.5;

      // 1. Deep Void Radial Gradient
      const bgGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        width * 0.95
      );
      bgGrad.addColorStop(0, `rgba(255, 85, 0, ${isWarping ? 0.45 : 0.2 + Math.sin(animTime * 1.5) * 0.05})`);
      bgGrad.addColorStop(0.35, 'rgba(10, 4, 2, 0.98)');
      bgGrad.addColorStop(0.8, '#040203');
      bgGrad.addColorStop(1, '#000000');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Core Explosion Shockwave Ring
      if (phase >= 1 && shockwaveRadius < width * 0.85) {
        shockwaveRadius += 18;
        const swAlpha = Math.max(0, 1 - shockwaveRadius / (width * 0.85));

        ctx.save();
        ctx.strokeStyle = `rgba(255, 85, 0, ${swAlpha})`;
        ctx.lineWidth = 3;
        ctx.shadowColor = '#FF5500';
        ctx.shadowBlur = 25;
        ctx.beginPath();
        ctx.arc(centerX, centerY, shockwaveRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 3. Hyperdrive Starfield Lines
      const warpSpeed = isWarping ? 35 : phase >= 1 ? 4 : 1.2;
      ctx.save();
      ctx.strokeStyle = isWarping ? 'rgba(255, 140, 0, 0.9)' : 'rgba(255, 85, 0, 0.35)';
      ctx.lineWidth = isWarping ? 2.5 : 1;

      stars.forEach((star) => {
        star.pz = star.z;
        star.z -= warpSpeed;

        if (star.z <= 0) {
          star.z = width;
          star.pz = width;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        const k = 256 / star.z;
        const px = star.x * k + centerX;
        const py = star.y * k + centerY;

        const pk = 256 / star.pz;
        const ppx = star.x * pk + centerX;
        const ppy = star.y * pk + centerY;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          ctx.beginPath();
          ctx.moveTo(ppx, ppy);
          ctx.lineTo(px, py);
          ctx.stroke();
        }
      });
      ctx.restore();

      // 4. Floating Spatial Dust & Embers
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = p.color === '#EF4444' && showRedAccent ? 'rgba(239, 68, 68, 0.95)' : `rgba(255, 125, 0, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [phase, showRedAccent, isWarping]);

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#000000] text-white flex flex-col justify-between p-4 sm:p-8 lg:p-10 overflow-hidden select-none pointer-events-auto transition-all duration-700 ease-in-out ${
        isWarping ? 'scale-[2.2] opacity-0 blur-xl' : 'scale-100 opacity-100 blur-none'
      }`}
    >
      {/* Background Canvas Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Atmospheric Glowing Center Core Spotlight */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1100px] lg:w-[1400px] h-[700px] sm:h-[1100px] lg:h-[1400px] rounded-full blur-[180px] sm:blur-[240px] pointer-events-none transition-all duration-1000 ${
          phase >= 1 ? 'opacity-100 scale-100' : 'opacity-20 scale-50'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(255, 85, 0, 0.45) 0%, rgba(12, 5, 2, 0) 70%)',
        }}
      />

      {/* TOP TELEMETRY HUD BAR */}
      <div
        className={`relative z-20 max-w-7xl w-full mx-auto flex items-center justify-between font-mono text-[9px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase transition-all duration-700 ${
          phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        {/* Left Telemetry */}
        <div className="flex items-center space-x-2 sm:space-x-3 text-neutral-300">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FF5500] animate-pulse" />
          <span className="font-bold tracking-widest text-[#FF5500]">SHIYAM.S</span>
          <span className="hidden sm:inline text-neutral-400">// SPATIAL WARP INITIALIZER</span>
        </div>

        {/* Dynamic Equalizer Visualizer & System Status */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="hidden md:flex items-center space-x-1 h-3">
            {[40, 80, 60, 100, 50, 90, 70, 95, 55].map((h, i) => (
              <motion.div
                key={i}
                className="w-1 bg-[#FF5500] rounded-full"
                animate={{ height: [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.08 }}
              />
            ))}
          </div>

          {/* Rare Red Accent Moment Badge */}
          <div
            className={`flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border backdrop-blur-md transition-all duration-500 ${
              showRedAccent
                ? 'bg-[#EF4444]/25 border-[#EF4444] text-[#EF4444] shadow-[0_0_30px_rgba(239,68,68,0.75)]'
                : 'bg-orange-950/40 border-[#FF5500]/40 text-neutral-200 shadow-[0_0_15px_rgba(255,85,0,0.2)]'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                  showRedAccent ? 'bg-[#EF4444]' : 'bg-[#FF5500]'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  showRedAccent ? 'bg-[#EF4444]' : 'bg-[#FF5500]'
                }`}
              />
            </span>
            <span className="font-extrabold tracking-widest text-[9px] sm:text-[10px]">
              {showRedAccent ? '● SIGNAL ACTIVE' : '● WARP CORE READY'}
            </span>
          </div>
        </div>
      </div>

      {/* CENTER STAGE: CYBER SPATIAL IGNITION & 3D MONOLITH TYPOGRAPHY */}
      <div
        className="relative z-10 max-w-7xl w-full mx-auto my-auto flex flex-col items-center justify-center text-center space-y-3 sm:space-y-6"
        style={{
          transform: `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transition: 'transform 0.12s ease-out',
        }}
      >
        {/* 3D Animated Official SM Logo Holographic Core Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.2, rotate: -360, filter: 'blur(20px)' }}
          animate={phase >= 1 ? { opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' } : { opacity: 0, scale: 0.2, rotate: -360, filter: 'blur(20px)' }}
          transition={{ duration: 1.0, type: 'spring', stiffness: 120, damping: 14 }}
          className="relative z-20 flex items-center justify-center mb-1"
        >
          <div className="relative group cursor-pointer">
            {/* Double Spinning Sci-Fi Reticle Rings */}
            <div className="absolute -inset-5 sm:-inset-7 rounded-full border border-dashed border-[#FF5500]/60 animate-[spin_10s_linear_infinite] pointer-events-none" />
            <div className="absolute -inset-8 sm:-inset-10 rounded-full border border-[#FF5500]/25 animate-[spin_18s_linear_infinite_reverse] pointer-events-none" />

            {/* Glowing Energy Aura */}
            <div className="absolute -inset-3 sm:-inset-4 rounded-full bg-gradient-to-r from-[#FF5500] via-amber-500 to-[#FF5500] opacity-85 blur-xl group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
            
            <div className="relative w-18 h-18 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-black/85 p-2 border border-[#FF5500]/60 shadow-[0_0_60px_rgba(255,85,0,0.85)] backdrop-blur-xl flex items-center justify-center overflow-hidden">
              <img
                src={smLogoImg}
                alt="SHIYAM SM Logo Emblem"
                className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(255,85,0,0.95)] scale-105 group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
        </motion.div>

        {/* Technical Sub-Header Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-orange-950/40 border border-[#FF5500]/40 font-mono text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.15em] sm:tracking-[0.3em] text-[#FF5500] uppercase shadow-[0_0_20px_rgba(255,85,0,0.25)] backdrop-blur-md"
        >
          <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF5500]" />
          <span>CREATIVE DEVELOPER // FRONTEND • INTERACTION • WEB</span>
        </motion.div>

        {/* GIANT 3D MONOLITH KINETIC TYPOGRAPHY */}
        <div className="relative w-full flex flex-col items-center justify-center">
          {/* Ambient Glow Aura */}
          <div
            className={`absolute -inset-x-12 sm:-inset-x-24 -inset-y-10 sm:-inset-y-14 bg-gradient-to-r from-[#FF5500]/35 via-orange-500/20 to-[#FF5500]/35 rounded-full blur-3xl transition-opacity duration-1000 ${
              phase >= 2 ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Sweeping Laser Beam */}
          {phase >= 2 && (
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5500] to-transparent shadow-[0_0_45px_#FF5500] pointer-events-none z-20"
            />
          )}

          {/* Letter-by-Letter 3D Physical Monolith Typography */}
          <div className="flex items-center justify-center space-x-0.5 sm:space-x-2 lg:space-x-3 select-none flex-nowrap">
            {/* Main Name: SHIYAM */}
            {mainLetters.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 70, scale: 0.3, rotateX: -80, filter: 'blur(15px)' }}
                animate={
                  phase >= 2
                    ? { opacity: 1, y: 0, scale: 1, rotateX: 0, filter: 'blur(0px)' }
                    : { opacity: 0, y: 70, scale: 0.3, rotateX: -80, filter: 'blur(15px)' }
                }
                transition={{
                  duration: 0.7,
                  delay: index * 0.11,
                  type: 'spring',
                  stiffness: 150,
                  damping: 12,
                }}
                className="relative inline-block font-display font-black text-4xl xs:text-5xl sm:text-7xl lg:text-[11vw] tracking-tighter text-white drop-shadow-[0_12px_40px_rgba(255,85,0,0.85)]"
                style={{
                  textShadow:
                    '0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 12px rgba(255,85,0,.45)',
                }}
              >
                {letter}
              </motion.span>
            ))}

            {/* Dot S Accent: .S */}
            {dotLetters.map((letter, index) => (
              <motion.span
                key={`dot-${index}`}
                initial={{ opacity: 0, scale: 0, rotateY: 90 }}
                animate={
                  phase >= 2
                    ? { opacity: 1, scale: 1, rotateY: 0 }
                    : { opacity: 0, scale: 0, rotateY: 90 }
                }
                transition={{
                  duration: 0.75,
                  delay: 0.75 + index * 0.14,
                  type: 'spring',
                  stiffness: 170,
                  damping: 10,
                }}
                className="relative inline-block font-display font-black text-4xl xs:text-5xl sm:text-7xl lg:text-[11vw] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#FF5500] via-[#FF3300] to-[#FFA000] drop-shadow-[0_0_55px_rgba(255,85,0,0.95)]"
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Dynamic Tagline Reveal */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="font-display text-base sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-neutral-200"
        >
          TURNING VISION INTO{' '}
          <span className="text-[#FF5500] drop-shadow-[0_0_35px_rgba(255,85,0,0.9)] underline decoration-[#FF5500]/50 underline-offset-8">
            DIGITAL REALITY.
          </span>
        </motion.p>

        {/* Charging Progress Matrix Bar & System Metrics */}
        <div className="w-full max-w-xs sm:max-w-md mx-auto pt-1 sm:pt-2 flex flex-col items-center space-y-2">
          <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-[#FF5500]/35 p-0.5 shadow-[0_0_15px_rgba(255,85,0,0.2)]">
            <motion.div
              className="h-full bg-gradient-to-r from-[#FF5500] via-amber-400 to-[#FF5500] rounded-full shadow-[0_0_18px_#FF5500]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="w-full flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-neutral-400 tracking-widest uppercase">
            <span>WARP CORE: {progress}%</span>
            <span>STATUS: {progress === 100 ? 'ENGAGING HYPERDRIVE' : 'INITIALIZING'}</span>
          </div>
        </div>
      </div>

      {/* BOTTOM TELEMETRY FOOTER & WARP EXIT BUTTON */}
      <div
        className={`relative z-20 max-w-7xl w-full mx-auto flex items-center justify-between font-mono text-[9px] sm:text-xs text-neutral-400 transition-all duration-700 ${
          phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {/* Left Footer Info */}
        <div className="flex items-center space-x-2 sm:space-x-3 text-neutral-400">
          <Compass className="w-3.5 h-3.5 text-[#FF5500]" />
          <span className="hidden sm:inline">3D CYBER SPATIAL HYPERDRIVE INTRO</span>
          <span className="sm:hidden">SHIYAM.S INTRO</span>
        </div>

        {/* Right Warp Speed Exit Button */}
        <button
          onClick={triggerWarpExit}
          className="group flex items-center space-x-1.5 sm:space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-neutral-900/90 border border-[#FF5500]/40 text-[#FF5500] hover:bg-[#FF5500] hover:text-black font-extrabold tracking-widest uppercase transition-all duration-300 shadow-[0_0_25px_rgba(255,85,0,0.25)] cursor-pointer text-[10px] sm:text-xs"
        >
          <span>WARP PORTFOLIO</span>
          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform" />
          <span className="hidden sm:inline text-[9px] opacity-60 ml-1">[SPACE]</span>
        </button>
      </div>
    </div>
  );
};
