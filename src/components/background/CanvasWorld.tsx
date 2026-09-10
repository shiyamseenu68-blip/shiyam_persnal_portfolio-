import React, { useEffect, useRef } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useScrollProgress } from '@/hooks/useScrollProgress';

interface SparkParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  maxOpacity: number;
  pulseSpeed: number;
  color: string;
}

export const CanvasWorld: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useMousePosition();
  const mouseRef = useRef(mouse);
  mouseRef.current = mouse;

  const scrollProgress = useScrollProgress();
  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Black + Orange + Limited Red Spark Palette
    const sparkColors = ['#FF5500', '#FF4500', '#FF7700', '#D94800', '#EF4444'];
    const particles: SparkParticle[] = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.6,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: -Math.random() * 0.45 - 0.15,
      opacity: Math.random() * 0.5 + 0.1,
      maxOpacity: Math.random() * 0.7 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
    }));

    let time = 0;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Deep Black Obsidian Ambient Gradient
      const activeScroll = scrollRef.current;
      const bgGradient = ctx.createRadialGradient(
        width * 0.5 + (mouseRef.current.normalizedX * 100),
        height * 0.4 + (activeScroll * 200),
        100,
        width * 0.5,
        height * 0.5,
        Math.max(width, height)
      );

      bgGradient.addColorStop(0, 'rgba(255, 85, 0, 0.06)');
      bgGradient.addColorStop(0.5, 'rgba(5, 5, 8, 0.95)');
      bgGradient.addColorStop(1, '#030305');

      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Render Floating Embers & Sparks
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        p.opacity += Math.sin(time * 5) * p.pulseSpeed;
        if (p.opacity > p.maxOpacity) p.opacity = p.maxOpacity;
        if (p.opacity < 0.1) p.opacity = 0.1;

        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
};
