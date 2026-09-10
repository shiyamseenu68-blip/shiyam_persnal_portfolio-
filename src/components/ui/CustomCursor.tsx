import React, { useEffect, useState } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';

export const CustomCursor: React.FC = () => {
  const { x, y } = useMousePosition();
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('interactive')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible && (x === 0 && y === 0)) return null;

  return (
    <>
      {/* Precision cursor dot */}
      <div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#FF5500] rounded-full pointer-events-none z-[100] transition-transform duration-75 ease-out shadow-[0_0_10px_#FF5500]"
        style={{
          transform: `translate3d(${x - 5}px, ${y - 5}px, 0)`,
        }}
      />
      {/* Outer interactive ring */}
      <div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[99] border transition-all duration-300 ease-out ${
          isHovered
            ? 'w-12 h-12 border-[#FF5500] bg-[#FF5500]/15 scale-110 shadow-[0_0_20px_rgba(255,85,0,0.4)]'
            : 'w-8 h-8 border-white/20 bg-transparent'
        }`}
        style={{
          transform: `translate3d(${x - (isHovered ? 24 : 16)}px, ${y - (isHovered ? 24 : 16)}px, 0)`,
        }}
      />
    </>
  );
};
