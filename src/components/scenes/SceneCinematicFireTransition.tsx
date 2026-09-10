import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Flame } from 'lucide-react';

interface Props {
  onNavigate?: (id: string) => void;
  onActiveStateChange?: (isActive: boolean) => void;
}

const LOCAL_VIDEO_URL = '/videos/cinematic-fire.mp4';
const REMOTE_VIDEO_URL = 'https://videotourl.com/videos/1788867500284-e6f17e76-6a68-494d-804f-2077744f8207.mp4';

/**
 * SceneCinematicFireTransition — Fullscreen Cinematic Fire Transition
 * Features:
 * 1. 100% Reliable Playback on Desktop (Laptop/PC) with HTML5 <source> fallback & Play trigger.
 * 2. 60FPS Hardware-Accelerated Canvas Fire Embers Portal on Mobile (Zero Lag / Zero Hang).
 */
export const SceneCinematicFireTransition: React.FC<Props> = ({ onNavigate, onActiveStateChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile Detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || navigator.maxTouchPoints > 0);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Safe Play Execution for Desktop
  const forcePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
    video.defaultMuted = isMuted;

    const p = video.play();
    if (p !== undefined) {
      p.then(() => setIsPlaying(true)).catch((err) => {
        console.warn('Autoplay waiting for user gesture:', err);
        setIsPlaying(false);
      });
    }
  };

  // IntersectionObserver for view detection
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const inView = entry.isIntersecting;
          if (onActiveStateChange) {
            onActiveStateChange(inView);
          }

          if (inView) {
            if (video) forcePlay();
          } else {
            if (video && !video.paused) {
              video.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    // Global scroll/click interaction fallback for desktop browsers
    const handleScrollPlay = () => {
      if (container) {
        const rect = container.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (inView && video && video.paused) {
          forcePlay();
        }
      }
    };

    window.addEventListener('scroll', handleScrollPlay, { passive: true });
    window.addEventListener('click', handleScrollPlay, { passive: true });
    window.addEventListener('wheel', handleScrollPlay, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScrollPlay);
      window.removeEventListener('click', handleScrollPlay);
      window.removeEventListener('wheel', handleScrollPlay);
    };
  }, [onActiveStateChange, isMuted, isMobile]);

  // Mobile 60FPS Fire Canvas Engine (Zero Lag, Zero Hang)
  useEffect(() => {
    if (!isMobile) return;
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

    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: height + Math.random() * 100,
      size: Math.random() * 3 + 1,
      speedY: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 1.2,
      alpha: Math.random() * 0.8 + 0.2,
      color: Math.random() > 0.3 ? '#FF5500' : '#FFAA00',
    }));

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      // Dark Obsidian Radial Vignette
      const grad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        20,
        width * 0.5,
        height * 0.5,
        width * 0.8
      );
      grad.addColorStop(0, `rgba(255, 85, 0, ${0.25 + Math.sin(time * 2) * 0.05})`);
      grad.addColorStop(0.5, 'rgba(10, 4, 2, 0.95)');
      grad.addColorStop(1, '#000000');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Rising Fire Embers
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  // Click handler
  const togglePlay = () => {
    if (isMobile) return;
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      forcePlay();
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Toggle Mute / Audio
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMobile) return;
    const video = videoRef.current;
    if (!video) return;

    const nextMuteState = !isMuted;
    video.muted = nextMuteState;
    setIsMuted(nextMuteState);

    if (video.paused) {
      forcePlay();
    }
  };

  return (
    <section
      ref={containerRef}
      id="cinematic-climax"
      onClick={togglePlay}
      className="relative h-screen w-full bg-[#000000] m-0 p-0 overflow-hidden selection:bg-[#FF5500]/30 selection:text-white border-none cursor-pointer group"
    >
      {/* FULLSCREEN VIEWPORT */}
      <div className="relative w-full h-full overflow-hidden bg-[#000000] flex items-center justify-center m-0 p-0">
        
        {/* Ambient Radial Vignette */}
        <div 
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: 'radial-gradient(circle at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%)'
          }}
        />

        {/* 1. DESKTOP VIDEO IMPLEMENTATION (Laptop/PC) */}
        {!isMobile && (
          <>
            <video
              ref={videoRef}
              autoPlay={true}
              muted={isMuted}
              playsInline={true}
              preload="auto"
              loop={true}
              onCanPlay={forcePlay}
              onLoadedData={forcePlay}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10 m-0 p-0 border-0 opacity-100 scale-105 group-hover:scale-100 transition-transform duration-700"
              style={{
                objectFit: 'cover',
                objectPosition: 'center center',
              }}
            >
              <source src={LOCAL_VIDEO_URL} type="video/mp4" />
              <source src={REMOTE_VIDEO_URL} type="video/mp4" />
            </video>

            {/* Desktop Play Overlay (If Autoplay is blocked by browser) */}
            {!isPlaying && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xs transition-opacity duration-300 pointer-events-none">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-[#FF5500]/90 text-white flex items-center justify-center shadow-[0_0_60px_#FF5500] animate-pulse">
                    <Play className="w-10 h-10 fill-white translate-x-0.5" />
                  </div>
                  <span className="font-mono text-xs tracking-[0.3em] text-white uppercase bg-black/80 px-4 py-2 rounded-full border border-[#FF5500]/50">
                    CLICK ANYWHERE TO PLAY CINEMATIC FILM
                  </span>
                </div>
              </div>
            )}
          </>
        )}

        {/* 2. MOBILE 60FPS CANVAS ENGINE (Zero Lag / Zero Hang on Mobile) */}
        {isMobile && (
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />
        )}

        {/* HUD Controls Overlay */}
        <div className="absolute bottom-8 left-6 sm:left-10 right-6 sm:right-10 z-30 flex items-center justify-between pointer-events-none font-mono text-xs">
          {/* Left Title Badge */}
          <div className="flex items-center space-x-3 text-[#FF5500] uppercase bg-black/70 px-4 py-2 rounded-full border border-[#FF5500]/40 backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5500] animate-pulse" />
            <span className="font-bold tracking-widest text-[10px] sm:text-xs">
              CINEMATIC TRANSITION SEQUENCE // SHIYAM.S
            </span>
          </div>

          {/* Right Audio Mute Control (Desktop Only) */}
          {!isMobile && (
            <div className="pointer-events-auto flex items-center space-x-3">
              <button
                onClick={toggleMute}
                className="flex items-center space-x-2 px-3.5 py-2 rounded-full bg-black/70 border border-[#FF5500]/40 text-[#FF5500] hover:bg-[#FF5500] hover:text-black font-extrabold tracking-widest uppercase transition-all duration-300 backdrop-blur-md cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span className="text-[10px] hidden sm:inline">{isMuted ? 'UNMUTE AUDIO' : 'MUTED'}</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
