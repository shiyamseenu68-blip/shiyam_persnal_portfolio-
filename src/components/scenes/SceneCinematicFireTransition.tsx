import React, { useState, useEffect, useRef } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';

interface Props {
  onNavigate?: (id: string) => void;
  onActiveStateChange?: (isActive: boolean) => void;
}

// Local 10Gbps Vercel Edge CDN Video Path
const LOCAL_VIDEO_URL = '/videos/cinematic-fire.mp4';
const REMOTE_VIDEO_URL = 'https://videotourl.com/videos/1788867500284-e6f17e76-6a68-494d-804f-2077744f8207.mp4';

/**
 * SceneCinematicFireTransition — Fullscreen Cinematic Fire Video Transition Bridge
 * Autoplays seamlessly on scroll using scroll/touch/wheel interaction event bindings.
 */
export const SceneCinematicFireTransition: React.FC<Props> = ({ onNavigate, onActiveStateChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoSrc, setVideoSrc] = useState(LOCAL_VIDEO_URL);

  // Deterministic Play Method
  const attemptPlay = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
    video.defaultMuted = isMuted;

    const promise = video.play();
    if (promise !== undefined) {
      promise
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
        });
    }
  };

  // Scroll & Viewport Automatic Playback Trigger Engine
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Enforce HTML5 Autoplay Muted Attributes
    video.muted = isMuted;
    video.defaultMuted = isMuted;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');

    const handleScrollCheck = () => {
      if (!container || !video) return;
      const rect = container.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.9 && rect.bottom > window.innerHeight * 0.1;

      if (onActiveStateChange) {
        onActiveStateChange(inView);
      }

      if (inView) {
        if (video.paused) {
          attemptPlay();
        }
      } else {
        if (!video.paused) {
          video.pause();
          setIsPlaying(false);
        }
      }
    };

    // Bind scroll, wheel, and touchmove as user interaction triggers for autoplay
    window.addEventListener('scroll', handleScrollCheck, { passive: true });
    window.addEventListener('touchmove', handleScrollCheck, { passive: true });
    window.addEventListener('wheel', handleScrollCheck, { passive: true });

    // Initial check
    handleScrollCheck();

    return () => {
      window.removeEventListener('scroll', handleScrollCheck);
      window.removeEventListener('touchmove', handleScrollCheck);
      window.removeEventListener('wheel', handleScrollCheck);
    };
  }, [onActiveStateChange, isMuted, videoSrc]);

  // Click/Tap anywhere to toggle play/pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      attemptPlay();
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Toggle Mute / Audio
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    const nextMuteState = !isMuted;
    video.muted = nextMuteState;
    setIsMuted(nextMuteState);

    if (video.paused) {
      attemptPlay();
    }
  };

  const handleVideoError = () => {
    console.warn('Local video fallback');
    if (videoSrc !== REMOTE_VIDEO_URL) {
      setVideoSrc(REMOTE_VIDEO_URL);
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
        
        {/* Particle Embers Layer */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen z-0"
          style={{
            backgroundImage: `radial-gradient(1.5px 1.5px at 30px 40px, rgba(255, 85, 0, 0.6), rgba(0,0,0,0)), radial-gradient(1px 1px at 70px 90px, rgba(255, 140, 0, 0.4), rgba(0,0,0,0))`,
            backgroundSize: '100px 100px'
          }}
        />

        {/* Ambient Radial Vignette */}
        <div 
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: 'radial-gradient(circle at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%)'
          }}
        />

        {/* Cinematic Video Tag */}
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay={true}
          muted={isMuted}
          playsInline={true}
          preload="auto"
          loop={true}
          onCanPlay={attemptPlay}
          onLoadedData={attemptPlay}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={handleVideoError}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10 m-0 p-0 border-0 opacity-100 scale-105 group-hover:scale-100 transition-transform duration-700"
          style={{
            objectFit: 'cover',
            objectPosition: 'center center',
          }}
        />

        {/* HUD Controls Overlay (Bottom Left & Right) */}
        <div className="absolute bottom-8 left-6 sm:left-10 right-6 sm:right-10 z-30 flex items-center justify-between pointer-events-none font-mono text-xs">
          {/* Left Title Badge */}
          <div className="flex items-center space-x-3 text-[#FF5500] uppercase bg-black/70 px-4 py-2 rounded-full border border-[#FF5500]/40 backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5500] animate-pulse" />
            <span className="font-bold tracking-widest text-[10px] sm:text-xs">
              CINEMATIC TRANSITION SEQUENCE // SHIYAM.S
            </span>
          </div>

          {/* Right Play / Mute Controls */}
          <div className="pointer-events-auto flex items-center space-x-3">
            <button
              onClick={toggleMute}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-full bg-black/70 border border-[#FF5500]/40 text-[#FF5500] hover:bg-[#FF5500] hover:text-black font-extrabold tracking-widest uppercase transition-all duration-300 backdrop-blur-md cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="text-[10px] hidden sm:inline">{isMuted ? 'UNMUTE AUDIO' : 'MUTED'}</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
