import React, { useState, useEffect, useRef } from 'react';

interface OpeningVideoIntroProps {
  onComplete: () => void;
}

const VIDEO_URL = 'https://videotourl.com/videos/1789050052981-f2ea8d5f-1db3-49be-b972-b866d6924137.mp4';

/**
 * OpeningVideoIntro — Fullscreen Opening Film Experience (Restored)
 * Plays the second half (zoom-in to eye) in ultra HD with eye-level focus alignment.
 */
export const OpeningVideoIntro: React.FC<OpeningVideoIntroProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    videoEl.preload = 'auto';

    const playPromise = videoEl.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsVideoLoaded(true);
        })
        .catch((err) => {
          console.warn('Autoplay prevented or video load failed:', err);
          setTimeout(triggerSequenceEnd, 2000);
        });
    }

    const safetyTimeout = setTimeout(() => {
      if (!hasEnded) {
        triggerSequenceEnd();
      }
    }, 20000);

    return () => clearTimeout(safetyTimeout);
  }, []);

  const handleLoadedMetadata = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    if (videoEl.duration && videoEl.duration > 0) {
      videoEl.currentTime = videoEl.duration * 0.48;
    }
  };

  const triggerSequenceEnd = () => {
    if (hasEnded) return;
    setHasEnded(true);

    setTimeout(() => {
      setIsFadingOut(true);

      setTimeout(() => {
        onComplete();
      }, 1000);
    }, 400);
  };

  const handleVideoEnded = () => {
    triggerSequenceEnd();
  };

  const handleVideoError = () => {
    console.error('Opening video playback error. Invoking graceful transition fallback.');
    triggerSequenceEnd();
  };

  return (
    <div
      className={`fixed inset-0 w-screen h-screen min-h-[100vh] min-h-[100dvh] z-[99999] bg-[#000000] overflow-hidden select-none pointer-events-auto flex items-center justify-center transition-opacity duration-1000 ease-in-out ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {!isVideoLoaded && (
        <div className="absolute inset-0 z-20 bg-[#000000] flex flex-col items-center justify-center space-y-3">
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-[#FF5500] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF5500] shadow-[0_0_15px_#FF5500]" />
          </div>
          <span className="font-mono text-[10px] tracking-[0.3em] text-[#FF5500] uppercase opacity-80 animate-pulse">
            INITIALIZING HD FILM // SHIYAM.S
          </span>
        </div>
      )}

      <video
        ref={videoRef}
        src={VIDEO_URL}
        autoPlay
        muted
        playsInline
        preload="auto"
        controls={false}
        onLoadedMetadata={handleLoadedMetadata}
        onLoadedData={() => setIsVideoLoaded(true)}
        onEnded={handleVideoEnded}
        onError={handleVideoError}
        className="w-full h-full object-cover pointer-events-none block bg-black border-none outline-none ring-0"
        style={{
          width: '100vw',
          height: '100dvh',
          objectFit: 'cover',
          objectPosition: 'center 35%',
          WebkitTransform: 'translateZ(0)',
          transform: 'translateZ(0)',
        }}
      />
    </div>
  );
};
