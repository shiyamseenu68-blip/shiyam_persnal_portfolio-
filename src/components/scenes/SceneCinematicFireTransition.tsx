import React, { useState, useEffect, useRef } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';

interface Props {
  onNavigate?: (id: string) => void;
  onActiveStateChange?: (isActive: boolean) => void;
}

const LOCAL_VIDEO_URL = '/videos/cinematic-fire.mp4';
const REMOTE_VIDEO_URL = 'https://videotourl.com/videos/1788867500284-e6f17e76-6a68-494d-804f-2077744f8207.mp4';

/**
 * SceneCinematicFireTransition — Fullscreen Cinematic Fire Transition
 * Features:
 * 1. 100% Reliable Playback on BOTH Mobile & Desktop with HTML5 <video> attributes.
 * 2. Hardware-accelerated smooth decoding without heavy CSS transforms.
 */
export const SceneCinematicFireTransition: React.FC<Props> = ({ onActiveStateChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Safe Play Execution for Mobile & Desktop
  const forcePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
    video.defaultMuted = isMuted;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');

    const p = video.play();
    if (p !== undefined) {
      p.then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Autoplay waiting for user gesture:', err);
        setIsPlaying(false);
      });
    }
  };

  // IntersectionObserver & Touch/Scroll fallbacks for mobile & desktop
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container) return;

    // Ensure DOM attributes are set immediately for mobile WebKit
    if (video) {
      video.muted = isMuted;
      video.defaultMuted = isMuted;
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');
    }

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

    // Global scroll/touch interaction fallback for mobile & desktop browsers
    const handleUserInteraction = () => {
      if (container) {
        const rect = container.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (inView && video && video.paused) {
          forcePlay();
        }
      }
    };

    window.addEventListener('scroll', handleUserInteraction, { passive: true });
    window.addEventListener('touchstart', handleUserInteraction, { passive: true });
    window.addEventListener('click', handleUserInteraction, { passive: true });
    window.addEventListener('wheel', handleUserInteraction, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('wheel', handleUserInteraction);
    };
  }, [onActiveStateChange, isMuted]);

  // Click / Touch handler
  const togglePlay = () => {
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
  const toggleMute = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
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

        {/* UNCONDITIONAL HTML5 VIDEO IMPLEMENTATION (Mobile & Desktop) */}
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
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10 m-0 p-0 border-0 opacity-100"
          style={{
            objectFit: 'cover',
            objectPosition: 'center center',
            transform: 'translateZ(0)',
          }}
        >
          <source src={LOCAL_VIDEO_URL} type="video/mp4" />
          <source src={REMOTE_VIDEO_URL} type="video/mp4" />
        </video>

        {/* Play Overlay (If Autoplay is blocked by mobile or desktop browser) */}
        {!isPlaying && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xs transition-opacity duration-300 pointer-events-none">
            <div className="flex flex-col items-center space-y-4 px-4 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FF5500]/90 text-white flex items-center justify-center shadow-[0_0_60px_#FF5500] animate-pulse">
                <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white translate-x-0.5" />
              </div>
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] text-white uppercase bg-black/80 px-4 py-2 rounded-full border border-[#FF5500]/50">
                TAP OR CLICK TO PLAY CINEMATIC FILM
              </span>
            </div>
          </div>
        )}

        {/* HUD Controls Overlay */}
        <div className="absolute bottom-6 sm:bottom-8 left-4 sm:left-10 right-4 sm:right-10 z-30 flex items-center justify-between pointer-events-none font-mono text-xs">
          {/* Left Title Badge */}
          <div className="flex items-center space-x-2 sm:space-x-3 text-[#FF5500] uppercase bg-black/70 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#FF5500]/40 backdrop-blur-md">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FF5500] animate-pulse" />
            <span className="font-bold tracking-widest text-[9px] sm:text-xs">
              CINEMATIC TRANSITION SEQUENCE // SHIYAM.S
            </span>
          </div>

          {/* Right Audio Mute Control */}
          <div className="pointer-events-auto flex items-center space-x-3">
            <button
              onClick={toggleMute}
              className="flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-black/70 border border-[#FF5500]/40 text-[#FF5500] hover:bg-[#FF5500] hover:text-black font-extrabold tracking-widest uppercase transition-all duration-300 backdrop-blur-md cursor-pointer text-[10px] sm:text-xs"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              <span className="text-[9px] sm:text-[10px]">{isMuted ? 'UNMUTE' : 'MUTED'}</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
