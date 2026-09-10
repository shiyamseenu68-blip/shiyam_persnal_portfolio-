import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useMouseRef } from '@/hooks/useMousePosition';
import { Terminal, Compass, ArrowRight } from 'lucide-react';
import smLogoImg from '@/assets/shiyam-sm-logo.png';

interface Scene00IntroProps {
  onComplete: () => void;
  onNavReveal: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
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
 * Scene00Intro — ULTRA-SMOOTH 60FPS LIGHTNING FAST CYBER SPATIAL INTRO
 * Re-render Free Mouse Interaction Engine (0 React re-renders on mousemove).
 * Butter smooth performance on Low-End Mobiles, Laptops, and 4K Displays.
 */
export const Scene00Intro: React.FC<Scene00IntroProps> = ({ onComplete, onNavReveal }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useMouseRef();

  // Mobile Detection
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || navigator.maxTouchPoints > 0);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // System Progress State (0 to 100)
  const [progress, setProgress] = useState<number>(0);

  // Intro Phase Engine
  const [phase, setPhase] = useState<number>(0);
  const [showRedAccent, setShowRedAccent] = useState<boolean>(false);
  const [isWarping, setIsWarping] = useState<boolean>(false);

  // Letter array for SHIYAM and .S
  const mainLetters = ['S', 'H', 'I', 'Y', 'A', 'M'];
  const dotLetters = ['.', 'S'];

  // Fast forward / Skip Handler
  const triggerWarpExit = () => {
    setIsWarping(true);
    onNavReveal();
    setTimeout(() => {
      onComplete();
    }, 550);
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
        return prev + 25; // Accelerates smoothly to ~400ms total loading
      });
    }, 28);

    const t1 = setTimeout(() => setPhase(1), 350);
    const t2 = setTimeout(() => setPhase(2), 900);
    const t3 = setTimeout(() => setPhase(3), 2000);
    const t4 = setTimeout(() => {
      setPhase(4);
      setShowRedAccent(true);
      setTimeout(() => setShowRedAccent(false), 700);
    }, 2700);
    const t5 = setTimeout(() => {
      setPhase(5);
      triggerWarpExit();
    }, 3600);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  // 60FPS Canvas 2D + Smooth Lerp Spatial Parallax Engine (Zero React re-render overhead)
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
    window.addEventListener('resize', handleResize, { passive: true });

    // Smooth Lerped Tilt values
    let currentTiltX = 0;
    let currentTiltY = 0;

    // Optimized particle counts
    const starCount = isMobile ? 30 : 100;
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: (Math.random() - 0.5) * width * 1.5,
      y: (Math.random() - 0.5) * height * 1.5,
      z: Math.random() * width,
      pz: Math.random() * width,
    }));

    const particleCount = isMobile ? 18 : 45;
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.6,
      alpha: Math.random() * 0.5 + 0.2,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      color: Math.random() > 0.85 ? '#EF4444' : '#FF5500',
    }));

    let animTime = 0;
    let shockwaveRadius = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      animTime += 0.025;

      // Lerp tilt calculation for silky smooth mouse/touch movement
      const targetTiltX = isMobile ? 0 : mouseRef.current.normalizedY * -10;
      const targetTiltY = isMobile ? 0 : mouseRef.current.normalizedX * 12;
      currentTiltX += (targetTiltX - currentTiltX) * 0.08;
      currentTiltY += (targetTiltY - currentTiltY) * 0.08;

      if (containerRef.current && !isMobile) {
        containerRef.current.style.transform = `perspective(1000px) rotateX(${currentTiltX}deg) rotateY(${currentTiltY}deg)`;
      }

      const centerX = width * 0.5;
      const centerY = height * 0.5;

      // 1. Radial Background Gradient
      const bgGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        width * 0.9
      );
      bgGrad.addColorStop(0, `rgba(255, 85, 0, ${isWarping ? 0.35 : 0.16 + Math.sin(animTime * 1.5) * 0.03})`);
      bgGrad.addColorStop(0.35, 'rgba(10, 4, 2, 0.98)');
      bgGrad.addColorStop(0.8, '#040203');
      bgGrad.addColorStop(1, '#000000');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Shockwave Pulse
      if (phase >= 1 && shockwaveRadius < width * 0.8) {
        shockwaveRadius += 24;
        const swAlpha = Math.max(0, 1 - shockwaveRadius / (width * 0.8));

        ctx.save();
        ctx.strokeStyle = `rgba(255, 120, 0, ${swAlpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, shockwaveRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 3. Hyperdrive Star Lines
      const warpSpeed = isWarping ? 28 : phase >= 1 ? 3 : 1;
      ctx.save();
      ctx.strokeStyle = isWarping ? 'rgba(255, 140, 0, 0.8)' : 'rgba(255, 85, 0, 0.25)';
      ctx.lineWidth = isWarping ? 2 : 1;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.pz = star.z;
        star.z -= warpSpeed;

        if (star.z <= 0) {
          star.z = width;
          star.pz = width;
          star.x = (Math.random() - 0.5) * width * 1.5;
          star.y = (Math.random() - 0.5) * height * 1.5;
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
      }
      ctx.restore();

      // 4. Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = p.color === '#EF4444' && showRedAccent ? 'rgba(239, 68, 68, 0.9)' : `rgba(255, 125, 0, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [phase, showRedAccent, isWarping, isMobile]);

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#000000] text-white flex flex-col justify-between p-4 sm:p-8 lg:p-10 overflow-hidden select-none pointer-events-auto transition-all duration-500 ease-out will-change-transform ${
        isWarping ? 'scale-125 opacity-0 blur-sm' : 'scale-100 opacity-100 blur-none'
      }`}
    >
      {/* Background Canvas Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Lightweight Spotlight */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] sm:w-[800px] h-[450px] sm:h-[800px] rounded-full blur-2xl pointer-events-none transition-all duration-500 ${
          phase >= 1 ? 'opacity-75 scale-100' : 'opacity-20 scale-50'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(255, 85, 0, 0.3) 0%, rgba(10, 4, 2, 0) 70%)',
        }}
      />

      {/* TOP TELEMETRY HUD BAR */}
      <div
        className={`relative z-20 max-w-7xl w-full mx-auto flex items-center justify-between font-mono text-[9px] sm:text-xs tracking-[0.2em] uppercase transition-all duration-500 ${
          phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        {/* Left Telemetry */}
        <div className="flex items-center space-x-2 sm:space-x-3 text-neutral-300">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FF5500] animate-pulse" />
          <span className="font-bold tracking-widest text-[#FF5500]">SHIYAM.S</span>
          <span className="hidden sm:inline text-neutral-400">// SPATIAL WARP</span>
        </div>

        {/* System Status Badge */}
        <div
          className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full border backdrop-blur-sm transition-all duration-300 ${
            showRedAccent
              ? 'bg-[#EF4444]/25 border-[#EF4444] text-[#EF4444]'
              : 'bg-orange-950/40 border-[#FF5500]/40 text-neutral-200'
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
            {showRedAccent ? '● SIGNAL ACTIVE' : '● SYSTEM ONLINE'}
          </span>
        </div>
      </div>

      {/* CENTER STAGE: CYBER SPATIAL IGNITION & 3D MONOLITH TYPOGRAPHY */}
      <div
        ref={containerRef}
        className="relative z-10 max-w-7xl w-full mx-auto my-auto flex flex-col items-center justify-center text-center space-y-3 sm:space-y-5 will-change-transform"
      >
        {/* 3D Animated Official SM Logo Holographic Core Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          animate={phase >= 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative z-20 flex items-center justify-center mb-1"
        >
          <div className="relative group cursor-pointer">
            {/* Spinning Sci-Fi Ring */}
            <div className="absolute -inset-3 sm:-inset-5 rounded-full border border-dashed border-[#FF5500]/50 animate-[spin_12s_linear_infinite] pointer-events-none" />

            {/* Glowing Energy Aura */}
            <div className="absolute -inset-2 rounded-full bg-[#FF5500]/25 blur-md" />
            
            <div className="relative w-16 h-16 sm:w-22 sm:h-22 rounded-full bg-black/85 p-2 border border-[#FF5500]/50 shadow-md flex items-center justify-center overflow-hidden">
              <img
                src={smLogoImg}
                alt="SHIYAM SM Logo Emblem"
                className="w-full h-full object-contain scale-105"
              />
            </div>
          </div>
        </motion.div>

        {/* Technical Sub-Header Tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center space-x-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-orange-950/40 border border-[#FF5500]/40 font-mono text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.15em] sm:tracking-[0.25em] text-[#FF5500] uppercase"
        >
          <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF5500]" />
          <span>CREATIVE DEVELOPER // FRONTEND • INTERACTION</span>
        </motion.div>

        {/* GIANT 3D MONOLITH KINETIC TYPOGRAPHY */}
        <div className="relative w-full flex flex-col items-center justify-center">
          {/* Sweeping Laser Beam */}
          {phase >= 2 && (
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5500] to-transparent shadow-[0_0_20px_#FF5500] pointer-events-none z-20"
            />
          )}

          {/* Letter-by-Letter 3D Physical Monolith Typography */}
          <div className="flex items-center justify-center space-x-0.5 sm:space-x-2 lg:space-x-3 select-none flex-nowrap">
            {/* Main Name: SHIYAM */}
            {mainLetters.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.7 }}
                animate={
                  phase >= 2
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 30, scale: 0.7 }
                }
                transition={{
                  duration: 0.4,
                  delay: index * 0.06,
                  ease: 'easeOut',
                }}
                className="relative inline-block font-display font-black text-4xl xs:text-5xl sm:text-7xl lg:text-[11vw] tracking-tighter text-white"
                style={{
                  textShadow: '0 2px 10px rgba(255,85,0,.6)',
                }}
              >
                {letter}
              </motion.span>
            ))}

            {/* Dot S Accent: .S */}
            {dotLetters.map((letter, index) => (
              <motion.span
                key={`dot-${index}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  phase >= 2
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0 }
                }
                transition={{
                  duration: 0.45,
                  delay: 0.4 + index * 0.08,
                  ease: 'easeOut',
                }}
                className="relative inline-block font-display font-black text-4xl xs:text-5xl sm:text-7xl lg:text-[11vw] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#FF5500] via-[#FF3300] to-[#FFA000]"
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Dynamic Tagline Reveal */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
          className="font-display text-sm sm:text-xl lg:text-3xl font-extrabold tracking-tight text-neutral-200"
        >
          TURNING VISION INTO{' '}
          <span className="text-[#FF5500] underline decoration-[#FF5500]/50 underline-offset-4">
            DIGITAL REALITY.
          </span>
        </motion.p>

        {/* Charging Progress Matrix Bar */}
        <div className="w-full max-w-[220px] sm:max-w-md mx-auto pt-1 flex flex-col items-center space-y-1.5">
          <div className="w-full h-1 sm:h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-[#FF5500]/35 p-0.5">
            <motion.div
              className="h-full bg-gradient-to-r from-[#FF5500] via-amber-400 to-[#FF5500] rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="w-full flex items-center justify-between text-[9px] font-mono text-neutral-400 tracking-widest uppercase">
            <span>WARP CORE: {progress}%</span>
            <span>{progress === 100 ? 'READY' : 'INITIALIZING'}</span>
          </div>
        </div>
      </div>

      {/* BOTTOM TELEMETRY FOOTER & WARP EXIT BUTTON */}
      <div
        className={`relative z-20 max-w-7xl w-full mx-auto flex items-center justify-between font-mono text-[9px] sm:text-xs text-neutral-400 transition-all duration-500 ${
          phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {/* Left Footer Info */}
        <div className="flex items-center space-x-2 text-neutral-400">
          <Compass className="w-3.5 h-3.5 text-[#FF5500]" />
          <span>SHIYAM.S INTRO</span>
        </div>

        {/* Right Warp Speed Exit Button */}
        <button
          onClick={triggerWarpExit}
          className="group flex items-center space-x-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-neutral-900/90 border border-[#FF5500]/40 text-[#FF5500] hover:bg-[#FF5500] hover:text-black font-extrabold tracking-widest uppercase transition-all duration-300 shadow-md cursor-pointer text-[10px] sm:text-xs"
        >
          <span>ENTER PORTFOLIO</span>
          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform" />
          <span className="hidden sm:inline text-[9px] opacity-60 ml-1">[SPACE]</span>
        </button>
      </div>
    </div>
  );
};
