import { useState, useEffect, useRef } from 'react';

/**
 * High-Performance Mouse Position Hook
 * Uses requestAnimationFrame throttling to prevent high-frequency React re-renders (fixes 120Hz mouse/touch lag).
 */
export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  const rafId = useRef<number | null>(null);

  useEffect(() => {
    let latestX = 0;
    let latestY = 0;

    const updateState = () => {
      const { innerWidth, innerHeight } = window;
      const normalizedX = (latestX / innerWidth) * 2 - 1;
      const normalizedY = -(latestY / innerHeight) * 2 + 1;

      setMousePosition({ x: latestX, y: latestY, normalizedX, normalizedY });
      rafId.current = null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      latestX = e.clientX;
      latestY = e.clientY;

      if (!rafId.current) {
        rafId.current = requestAnimationFrame(updateState);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        latestX = e.touches[0].clientX;
        latestY = e.touches[0].clientY;

        if (!rafId.current) {
          rafId.current = requestAnimationFrame(updateState);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return mousePosition;
}

/**
 * Zero-Re-render Mouse Position Ref for 60fps Canvas / 3D Animations
 */
export function useMouseRef() {
  const mouseRef = useRef({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0]?.clientX || 0 : e.clientX;
      const clientY = 'touches' in e ? e.touches[0]?.clientY || 0 : e.clientY;
      const { innerWidth, innerHeight } = window;

      mouseRef.current.x = clientX;
      mouseRef.current.y = clientY;
      mouseRef.current.normalizedX = (clientX / innerWidth) * 2 - 1;
      mouseRef.current.normalizedY = -(clientY / innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('touchmove', handleMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, []);

  return mouseRef;
}
