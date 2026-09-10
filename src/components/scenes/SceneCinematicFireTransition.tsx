import React, { useState, useEffect, useRef } from 'react';

interface Props {
  onNavigate?: (id: string) => void;
  onActiveStateChange?: (isActive: boolean) => void;
}

// Anime Video URL uploaded by user
const ANIME_VIDEO_URL = 'https://videotourl.com/videos/1789050052981-f2ea8d5f-1db3-49be-b972-b866d6924137.mp4';
const FALLBACK_VIDEO_URL = 'https://videotourl.com/videos/1788867500284-e6f17e76-6a68-494d-804f-2077744f8207.mp4';

/**
 * SceneCinematicFireTransition — Fullscreen Anime Video Transition Bridge before Contact
 * Features:
 * 1. Plays the user's Anime Video in high quality before Scene09Contact
 * 2. IntersectionObserver trigger for 100% deterministic playback on scroll
 * 3. Mobile autoplay & user interaction fallback handler
 */
export const SceneCinematicFireTransition: React.FC<Props> = ({ onNavigate, onActiveStateChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(ANIME_VIDEO_URL);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    video.muted = true;
    video.playsInline = true;

    const playVideo = () => {
      if (!video) return;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn('Video play attempt failed, trying fallback:', err);
            // If main anime video fails, try fallback source
            if (currentSrc !== FALLBACK_VIDEO_URL) {
              setCurrentSrc(FALLBACK_VIDEO_URL);
            }
          });
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const inView = entry.isIntersecting;
          if (onActiveStateChange) {
            onActiveStateChange(inView);
          }

          if (inView) {
            setVideoEnded(false);
            playVideo();
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    // Touch/Click listener fallback for mobile autoplay policies
    const handleUserInteraction = () => {
      if (video && video.paused) {
        playVideo();
      }
    };

    window.addEventListener('touchstart', handleUserInteraction, { passive: true });
    window.addEventListener('click', handleUserInteraction, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('click', handleUserInteraction);
    };
  }, [onActiveStateChange, currentSrc]);

  const handleEnded = () => {
    setVideoEnded(true);
    setIsPlaying(false);
  };

  const handleError = () => {
    console.warn('Anime video playback error, switching source');
    if (currentSrc === ANIME_VIDEO_URL) {
      setCurrentSrc(FALLBACK_VIDEO_URL);
    }
  };

  return (
    <section
      ref={containerRef}
      id="cinematic-climax"
      className="relative h-screen w-full bg-[#000000] m-0 p-0 overflow-hidden selection:bg-[#FF5500]/30 selection:text-white border-none"
    >
      {/* FULLSCREEN VIEWPORT (100vw x 100vh) */}
      <div className="relative w-full h-full overflow-hidden bg-[#000000] flex items-center justify-center m-0 p-0">
        
        {/* Continuous Orange Energy Dust Particle Layer */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen z-0"
          style={{
            backgroundImage: `radial-gradient(1.5px 1.5px at 30px 40px, rgba(255, 85, 0, 0.6), rgba(0,0,0,0)), radial-gradient(1px 1px at 70px 90px, rgba(255, 140, 0, 0.4), rgba(0,0,0,0))`,
            backgroundSize: '100px 100px'
          }}
        />

        {/* Ambient Radial Vignette & Glow */}
        <div 
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: 'radial-gradient(circle at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%)'
          }}
        />

        {/* Anime Video Component */}
        <video
          ref={videoRef}
          src={currentSrc}
          autoPlay
          muted
          playsInline
          preload="auto"
          loop={true}
          onEnded={handleEnded}
          onError={handleError}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10 m-0 p-0 border-0 opacity-100 scale-100"
          style={{
            objectFit: 'cover',
            objectPosition: 'center center',
          }}
        />

        {/* Atmosphere Accent HUD */}
        <div className="absolute bottom-10 left-10 z-30 flex items-center space-x-3 pointer-events-none font-mono text-xs tracking-widest text-[#FF5500] uppercase bg-black/60 px-4 py-2 rounded-full border border-[#FF5500]/30 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse" />
          <span>CINEMATIC ANIME SEQUENCE // SHIYAM.S</span>
        </div>

        {/* Signal Node Overlay on End */}
        {videoEnded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30 space-y-4 bg-black/80">
            <div className="relative flex items-center justify-center">
              <div className="rounded-full bg-[#FF5500] w-6 h-6 shadow-[0_0_80px_#FF5500] animate-ping" />
              <div className="absolute rounded-full border border-[#FF5500]/80 w-32 h-32 animate-pulse" />
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
