import React, { useState, useEffect, useRef } from 'react';

interface Props {
  onNavigate?: (id: string) => void;
  onActiveStateChange?: (isActive: boolean) => void;
}

/**
 * SceneCinematicFireTransition — Fullscreen Cinematic Fire Video Transition Bridge (~13.45s)
 * Single pre-mounted video with IntersectionObserver for deterministic replay on repeated scrolling.
 * JOURNEY → CINEMATIC VIDEO TRANSITION → CONTACT
 */
export const SceneCinematicFireTransition: React.FC<Props> = ({ onNavigate, onActiveStateChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const inView = entry.isIntersecting;
          if (onActiveStateChange) {
            onActiveStateChange(inView);
          }

          if (inView) {
            // When entering viewport, reset and play video immediately
            setVideoEnded(false);
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise
                .then(() => setIsPlaying(true))
                .catch(() => {
                  setIsPlaying(true);
                });
            }
          } else {
            // When leaving viewport, pause video cleanly
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [onActiveStateChange]);

  const handleEnded = () => {
    setVideoEnded(true);
    setIsPlaying(false);
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
            background: 'radial-gradient(circle at center, rgba(0,0,0,0) 50%, rgba(0,0,0,0.85) 100%)'
          }}
        />

        {/* Single Pre-Mounted Fullscreen Cinematic Video */}
        <video
          ref={videoRef}
          src="https://videotourl.com/videos/1788867500284-e6f17e76-6a68-494d-804f-2077744f8207.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          loop={false}
          onEnded={handleEnded}
          onError={(e) => console.error('Cinematic fire video error:', e)}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10 m-0 p-0 border-0 opacity-100 scale-100"
        />

        {/* Energy Collapse & Center Orange Signal Ignition Node */}
        {videoEnded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30 space-y-4">
            {/* Ignited Signal Node */}
            <div className="relative flex items-center justify-center">
              <div className="rounded-full bg-[#FF5500] w-6 h-6 shadow-[0_0_80px_#FF5500] animate-ping" />
              <div className="absolute rounded-full border border-[#FF5500]/80 w-32 h-32 animate-pulse" />
              <div className="absolute rounded-full border border-[#FF5500]/40 w-64 h-64" />
            </div>

            {/* Atmosphere Atmosphere */}
            <div 
              className="absolute rounded-full blur-[140px] w-[500px] h-[500px]"
              style={{ background: 'radial-gradient(circle, rgba(255, 85, 0, 0.65) 0%, rgba(0, 0, 0, 0) 70%)' }}
            />
          </div>
        )}

      </div>
    </section>
  );
};
