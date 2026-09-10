import React, { useState, useEffect, useRef } from 'react';
import { Play, ArrowRight } from 'lucide-react';

interface OpeningVideoIntroProps {
  onComplete: () => void;
}

// Local Fast 10Gbps Vercel Edge CDN Asset (1.78 MB)
const LOCAL_VIDEO_URL = '/videos/opening-intro.mp4';
const REMOTE_VIDEO_URL = 'https://videotourl.com/videos/1789050052981-f2ea8d5f-1db3-49be-b972-b866d6924137.mp4';

/**
 * OpeningVideoIntro — Cinema-Grade Fullscreen Opening Film Sequence
 * Robust Autoplay Engine with Local Vercel CDN Delivery & Desktop Autoplay Failure Protection.
 */
export const OpeningVideoIntro: React.FC<OpeningVideoIntroProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState(LOCAL_VIDEO_URL);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [showPlayFallback, setShowPlayFallback] = useState(false);

  const triggerSequenceEnd = () => {
    if (hasEnded) return;
    setHasEnded(true);

    setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        onComplete();
      }, 700);
    }, 300);
  };

  const attemptPlay = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');

    const p = video.play();
    if (p !== undefined) {
      p.then(() => {
        setIsVideoLoaded(true);
        setShowPlayFallback(false);
      }).catch((err) => {
        console.warn('Autoplay waiting for user gesture:', err);
        setIsVideoLoaded(true);
        setShowPlayFallback(true);
      });
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');

    attemptPlay();

    // Fallback safety timeout so user is never locked out
    const safetyTimeout = setTimeout(() => {
      if (!hasEnded && !isVideoLoaded) {
        setShowPlayFallback(true);
      }
    }, 4000);

    // Global interaction listener for desktop browsers requiring gesture
    const handleInteraction = () => {
      if (video && video.paused) {
        attemptPlay();
      }
    };

    window.addEventListener('click', handleInteraction, { passive: true });
    window.addEventListener('keydown', handleInteraction, { passive: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true });

    return () => {
      clearTimeout(safetyTimeout);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [hasEnded, isVideoLoaded]);

  const handleVideoError = () => {
    console.warn('Opening video load error, switching to remote fallback');
    if (videoSrc !== REMOTE_VIDEO_URL) {
      setVideoSrc(REMOTE_VIDEO_URL);
    } else {
      triggerSequenceEnd();
    }
  };

  return (
    <div
      className={`fixed inset-0 w-screen h-screen min-h-[100vh] min-h-[100dvh] z-[999999] bg-[#000000] overflow-hidden select-none pointer-events-auto flex items-center justify-center transition-opacity duration-700 ease-in-out ${
        isFadingOut ? 'opacity-0 scale-105 blur-sm' : 'opacity-100 scale-100 blur-none'
      }`}
    >
      {/* Loading Pulse */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 z-20 bg-[#000000] flex flex-col items-center justify-center space-y-3 pointer-events-none">
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-[#FF5500] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF5500] shadow-[0_0_15px_#FF5500]" />
          </div>
          <span className="font-mono text-[10px] tracking-[0.3em] text-[#FF5500] uppercase opacity-80 animate-pulse">
            INITIALIZING HD FILM // SHIYAM.S
          </span>
        </div>
      )}

      {/* Primary Video Element */}
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay={true}
        muted={true}
        playsInline={true}
        preload="auto"
        controls={false}
        onCanPlay={attemptPlay}
        onLoadedData={() => setIsVideoLoaded(true)}
        onEnded={triggerSequenceEnd}
        onError={handleVideoError}
        className="w-full h-full object-cover pointer-events-none block bg-black border-none outline-none"
        style={{
          width: '100vw',
          height: '100dvh',
          objectFit: 'cover',
          objectPosition: 'center center',
          WebkitTransform: 'translateZ(0)',
          transform: 'translateZ(0)',
        }}
      />

      {/* Desktop / Mobile Autoplay Fallback Trigger */}
      {showPlayFallback && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/70 backdrop-blur-xs">
          <button
            onClick={triggerSequenceEnd}
            className="group flex items-center space-x-3 px-6 py-3 rounded-full bg-[#FF5500] text-black font-extrabold font-mono text-xs tracking-widest uppercase shadow-[0_0_35px_#FF5500] hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <span>ENTER EXPERIENCE</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      {/* Skip Button */}
      <button
        onClick={triggerSequenceEnd}
        className="absolute bottom-8 right-8 z-30 flex items-center space-x-2 px-4 py-2 rounded-full bg-black/70 border border-[#FF5500]/40 text-[#FF5500] hover:bg-[#FF5500] hover:text-black font-extrabold font-mono text-xs tracking-widest uppercase transition-all duration-300 backdrop-blur-md cursor-pointer"
      >
        <span>SKIP FILM</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
