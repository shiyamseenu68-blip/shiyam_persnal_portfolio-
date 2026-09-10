import React, { useState, useEffect, useRef } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';

interface Props {
  onNavigate?: (id: string) => void;
  onActiveStateChange?: (isActive: boolean) => void;
}

// High Speed Vercel CDN Local Video Path (Zero Network Buffer Stalls)
const LOCAL_VIDEO_URL = '/videos/cinematic-fire.mp4';
const REMOTE_VIDEO_URL = 'https://videotourl.com/videos/1788867500284-e6f17e76-6a68-494d-804f-2077744f8207.mp4';

/**
 * SceneCinematicFireTransition — Fullscreen Cinematic Fire Video Transition Bridge
 * Features 100% Instant Vercel CDN Local Video Delivery (Zero Lag, Zero Stalling).
 */
export const SceneCinematicFireTransition: React.FC<Props> = ({ onNavigate, onActiveStateChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoSrc, setVideoSrc] = useState(LOCAL_VIDEO_URL);

  // Deterministic Play Method
  const safePlayVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
    video.defaultMuted = isMuted;

    const promise = video.play();
    if (promise !== undefined) {
      promise
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Autoplay gesture required or video stream waiting:', err);
          setIsPlaying(false);
        });
    }
  };

  // IntersectionObserver for view-based playback
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    video.muted = isMuted;
    video.defaultMuted = isMuted;
    video.playsInline = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const inView = entry.isIntersecting;
          if (onActiveStateChange) {
            onActiveStateChange(inView);
          }

          if (inView) {
            safePlayVideo();
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [onActiveStateChange, isMuted, videoSrc]);

  // Click/Tap anywhere to toggle play/pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      safePlayVideo();
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Toggle Mute / Unmute Audio
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    const nextMuteState = !isMuted;
    video.muted = nextMuteState;
    setIsMuted(nextMuteState);

    if (video.paused) {
      safePlayVideo();
    }
  };

  const handleVideoError = () => {
    console.warn('Local video load error, trying remote fallback');
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
        
        {/* Particle Embers Background Layer */}
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

        {/* Local Fast-Streaming CDN Video */}
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay={true}
          muted={isMuted}
          playsInline={true}
          preload="auto"
          loop={true}
          onCanPlay={safePlayVideo}
          onLoadedData={safePlayVideo}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={handleVideoError}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10 m-0 p-0 border-0 opacity-100 scale-105 group-hover:scale-100 transition-transform duration-700"
          style={{
            objectFit: 'cover',
            objectPosition: 'center center',
          }}
        />

        {/* Center Interactive Play Button Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/50 backdrop-blur-xs transition-opacity duration-300 pointer-events-none">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-[#FF5500]/90 text-white flex items-center justify-center shadow-[0_0_50px_#FF5500] animate-pulse">
                <Play className="w-10 h-10 fill-white translate-x-0.5" />
              </div>
              <span className="font-mono text-xs tracking-[0.3em] text-white uppercase bg-black/80 px-4 py-2 rounded-full border border-[#FF5500]/50">
                CLICK ANYWHERE TO PLAY FILM
              </span>
            </div>
          </div>
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
