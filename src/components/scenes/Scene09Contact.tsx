import React, { useState, useEffect, useRef } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';
import { 
  ArrowUpRight, 
  MessageSquare, 
  Instagram, 
  Github, 
  Linkedin, 
  Mail, 
  ArrowUp, 
  Terminal, 
  Lock, 
  Heart,
  Radio,
  Sparkles,
  Zap,
  ShieldCheck,
  Compass
} from 'lucide-react';
import smLogoImg from '@/assets/shiyam-sm-logo.png';

interface SceneProps {
  onNavigate: (sectionId: string | number) => void;
}

interface ChannelAccessPoint {
  id: string;
  code: string;
  name: string;
  tag: string;
  desc: string;
  coord: string;
  icon: React.ElementType;
  getUrl: () => string;
}

const CHANNELS: ChannelAccessPoint[] = [
  {
    id: 'whatsapp',
    code: 'ACCESS 01',
    name: 'WHATSAPP DIRECT',
    tag: 'DIRECT SIGNAL',
    desc: 'Instant encrypted communication line with Shiyam.',
    coord: 'LAT 12.9716° N / 77.5946° E',
    icon: MessageSquare,
    getUrl: () => 'https://wa.me/918668098302',
  },
  {
    id: 'instagram',
    code: 'ACCESS 02',
    name: 'INSTAGRAM ARCHIVE',
    tag: 'VISUAL NETWORK',
    desc: 'Behind the scenes, creative direction & daily logs.',
    coord: 'SIGNAL FREQ // 540.2 MHZ',
    icon: Instagram,
    getUrl: () => 'https://www.instagram.com/the_invisible_paradox',
  },
  {
    id: 'github',
    code: 'ACCESS 03',
    name: 'GITHUB REPOSITORIES',
    tag: 'CODE BASE',
    desc: 'Production systems, experiments & open-source tools.',
    coord: 'GIT HASH // HEAD->MAIN',
    icon: Github,
    getUrl: () => 'https://github.com/shiyamseenu68-blip/',
  },
  {
    id: 'linkedin',
    code: 'ACCESS 04',
    name: 'LINKEDIN NETWORK',
    tag: 'PROFESSIONAL KEY',
    desc: 'Career milestones, architecture posts & formal connection.',
    coord: 'AUTH PROTOCOL // SHA-256',
    icon: Linkedin,
    getUrl: () => 'https://www.linkedin.com/in/shiyam-s/',
  },
  {
    id: 'email',
    code: 'ACCESS 05',
    name: 'ENCRYPTED DISPATCH',
    tag: 'DIRECT EMAIL',
    desc: 'Proposals, project briefs & confidential inquiries.',
    coord: 'PORT 445 // SECURE MAIL',
    icon: Mail,
    getUrl: () => 'mailto:shiyamdev@gmail.com',
  },
];

/**
 * Scene09Contact — THE FINAL DOOR
 * An architectural dark portal installation representing the final environment of Shiyam's portfolio world.
 * Features spatial access switches around a monolith portal frame, 3D tilt, canvas light beam,
 * rare red status moment, and cinematic end credits.
 */
export const Scene09Contact: React.FC<SceneProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  const [activeChannelId, setActiveChannelId] = useState<string>('whatsapp');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [portalEngaged, setPortalEngaged] = useState(false);

  const { normalizedX, normalizedY } = useMousePosition();

  // Multi-axis spatial tilt
  const tiltX = normalizedY * -6;
  const tiltY = normalizedX * 8;

  // Track scroll depth inside section to drive camera approach sequence
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far into the contact section the user has scrolled
      const progress = Math.min(Math.max((windowHeight - rect.top) / (rect.height + windowHeight), 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for trigger animations
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const handleChannelClick = (channel: ChannelAccessPoint) => {
    setActiveChannelId(channel.id);
    setPortalEngaged(true);
    setTimeout(() => setPortalEngaged(false), 600);

    const url = channel.getUrl();
    if (url.startsWith('mailto:')) {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Canvas Architectural Light Beams & Spatial Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = 85;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.8) * 0.4,
      size: Math.random() * 2 + 0.8,
      alpha: Math.random() * 0.6 + 0.1,
    }));

    let beamPulse = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      beamPulse += 0.02;

      const portalX = width * 0.5;
      const portalY = height * 0.45;

      // Dark Obsidian Background Gradient with Central Energy Core
      const coreGrad = ctx.createRadialGradient(
        portalX,
        portalY,
        20,
        portalX,
        portalY,
        width * 0.75
      );
      coreGrad.addColorStop(0, `rgba(255, 85, 0, ${0.15 + Math.sin(beamPulse) * 0.05})`);
      coreGrad.addColorStop(0.3, 'rgba(15, 5, 2, 0.95)');
      coreGrad.addColorStop(0.7, '#030203');
      coreGrad.addColorStop(1, '#000000');
      ctx.fillStyle = coreGrad;
      ctx.fillRect(0, 0, width, height);

      // Light Beam Pillars from top/bottom portal focus
      const beamGrad = ctx.createLinearGradient(portalX - 200, 0, portalX + 200, height);
      beamGrad.addColorStop(0, 'rgba(255, 85, 0, 0.0)');
      beamGrad.addColorStop(0.45, `rgba(255, 85, 0, ${0.08 + Math.sin(beamPulse * 1.5) * 0.04})`);
      beamGrad.addColorStop(0.55, `rgba(255, 85, 0, ${0.08 + Math.sin(beamPulse * 1.5) * 0.04})`);
      beamGrad.addColorStop(1, 'rgba(255, 85, 0, 0.0)');
      ctx.fillStyle = beamGrad;
      ctx.fillRect(0, 0, width, height);

      // Architectural Spatial Perspective Lines radiating from the portal doorway
      ctx.strokeStyle = 'rgba(255, 85, 0, 0.05)';
      ctx.lineWidth = 1;
      const angles = [0, Math.PI * 0.25, Math.PI * 0.5, Math.PI * 0.75, Math.PI, Math.PI * 1.25, Math.PI * 1.5, Math.PI * 1.75];
      angles.forEach((angle) => {
        ctx.beginPath();
        ctx.moveTo(portalX, portalY);
        ctx.lineTo(
          portalX + Math.cos(angle + beamPulse * 0.05) * width,
          portalY + Math.sin(angle + beamPulse * 0.05) * height
        );
        ctx.stroke();
      });

      // Spatial Light Particles drifting upward into the doorway
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Attract gently toward central doorway focus
        const dx = portalX - p.x;
        const dy = portalY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 60 && dist < 500) {
          p.x += (dx / dist) * 0.12;
          p.y += (dy / dist) * 0.12;
        }

        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.fillStyle = `rgba(255, ${100 + Math.sin(p.z) * 50}, 0, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative min-h-[140vh] bg-[#000000] text-white font-sans overflow-hidden pt-20 pb-16 px-4 sm:px-6 lg:px-12 selection:bg-[#FF5500]/30 selection:text-white border-t border-[#FF5500]/20"
    >
      {/* Background Canvas Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Ambient Top Light Beam Glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[200px] pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(255, 85, 0, 0.35) 0%, rgba(0, 0, 0, 0) 70%)' }}
      />

      {/* STAGE 1 & 2: SCROLL CAMERA ENTRANCE HEADER — "YOU MADE IT THIS FAR" */}
      <div className="relative z-10 w-full max-w-5xl mx-auto text-center mb-16 space-y-4">
        {/* Spatial Stage Badge */}
        <div className={`inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-orange-950/40 border border-[#FF5500]/40 backdrop-blur-md transition-all duration-700 ${
          isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <Radio className="w-3.5 h-3.5 text-[#FF5500] animate-pulse" />
          <span className="font-mono text-xs font-bold tracking-widest text-[#FF5500] uppercase">
            07 // THE FINAL ENVIRONMENT
          </span>
          <span className="w-1 h-1 rounded-full bg-neutral-600" />
          <span className="font-mono text-[10px] text-neutral-400">ARCHITECTURAL PORTAL</span>
        </div>

        {/* Dramatic Sequential Reveal Title */}
        <h2 className={`text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none transition-all duration-1000 delay-150 ${
          isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          YOU MADE IT THIS FAR. <br />
          <span className="text-[#FF5500] drop-shadow-[0_0_40px_rgba(255,85,0,0.8)]">
            SO LET'S BUILD SOMETHING.
          </span>
        </h2>

        {/* Subtitle Statement */}
        <p className={`max-w-2xl mx-auto font-sans text-sm sm:text-base text-neutral-300 leading-relaxed transition-all duration-1000 delay-300 ${
          isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          You have reached the final physical destination of Shiyam's portfolio archive. Select a channel access switch around the monolith portal below to open direct communication.
        </p>

        {/* RARE RED AVAILABILITY MOMENT: 1-5% Highlight */}
        <div className={`inline-flex items-center space-x-3 mt-4 px-5 py-2 rounded-full bg-black/80 border border-[#EF4444]/60 shadow-[0_0_25px_rgba(239,68,68,0.35)] transition-all duration-1000 delay-500 ${
          isIntersecting ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}>
          {/* Rare Red Glowing Pulse Indicator */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#EF4444] shadow-[0_0_12px_#EF4444]" />
          </span>
          <span className="font-mono text-xs font-extrabold tracking-widest text-[#EF4444] uppercase">
            ● AVAILABLE FOR THE NEXT BUILD
          </span>
          <span className="font-mono text-[10px] text-orange-400/80 border-l border-neutral-800 pl-3">
            Q3 / Q4 2026 INTAKE
          </span>
        </div>
      </div>

      {/* STAGE 3: THE ARCHITECTURAL DOORWAY INSTALLATION (3D MONOLITH FRAME) */}
      <div 
        ref={portalRef}
        className="relative z-10 w-full max-w-[1400px] mx-auto min-h-[680px] flex flex-col lg:flex-row items-center justify-between gap-12 py-8"
        style={{
          transform: `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transition: 'transform 0.15s ease-out'
        }}
      >

        {/* LEFT COLUMN: 3 SPATIAL ACCESS SWITCHES (01, 02, 03) */}
        <div className="w-full lg:w-1/3 space-y-4">
          <div className="font-mono text-xs font-bold text-orange-400 tracking-widest uppercase mb-2 flex items-center space-x-2">
            <Compass className="w-4 h-4 text-[#FF5500]" />
            <span>WEST PORTAL SWITCHES</span>
          </div>

          {CHANNELS.slice(0, 3).map((channel, idx) => {
            const IconComponent = channel.icon;
            const isActive = activeChannelId === channel.id;

            return (
              <div
                key={channel.id}
                onClick={() => handleChannelClick(channel)}
                onMouseEnter={() => setActiveChannelId(channel.id)}
                className={`relative cursor-pointer group bg-black/90 border rounded-2xl p-5 backdrop-blur-xl transition-all duration-300 ${
                  isIntersecting ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
                } ${
                  isActive
                    ? 'border-[#FF5500] shadow-[0_0_40px_rgba(255,85,0,0.45)] scale-[1.03] bg-gradient-to-r from-orange-950/60 via-black to-black'
                    : 'border-orange-500/30 hover:border-orange-500/80 hover:scale-[1.01]'
                }`}
                style={{ transitionDelay: `${0.4 + idx * 0.15}s` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-[#FF5500] text-black border-[#FF5500] scale-110 shadow-[0_0_25px_#FF5500]'
                        : 'bg-neutral-900 text-orange-400 border-orange-500/40 group-hover:border-[#FF5500] group-hover:text-white'
                    }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-black text-[#FF5500]">{channel.code}</span>
                        <h4 className="font-mono font-bold text-sm text-white tracking-wider">
                          {channel.name}
                        </h4>
                      </div>
                      <p className="font-mono text-[11px] text-neutral-400 mt-1 leading-snug">
                        {channel.desc}
                      </p>
                      <div className="font-mono text-[9px] text-orange-500/70 mt-1">
                        {channel.coord}
                      </div>
                    </div>
                  </div>

                  <ArrowUpRight className={`w-5 h-5 transition-all ${
                    isActive ? 'text-[#FF5500] translate-x-1 -translate-y-1 scale-110' : 'text-neutral-500 group-hover:text-white'
                  }`} />
                </div>

                {/* Spatial Active Border Bar */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-3/4 bg-[#FF5500] rounded-r shadow-[0_0_15px_#FF5500]" />
                )}
              </div>
            );
          })}
        </div>

        {/* CENTER COLUMN: THE ARCHITECTURAL MONOLITH DOORWAY FRAME */}
        <div className="w-full lg:w-1/3 flex flex-col items-center justify-center relative my-6 lg:my-0">
          
          {/* Monolith Doorway Container */}
          <div className="relative w-full max-w-[380px] h-[520px] rounded-3xl bg-gradient-to-b from-neutral-950 via-black to-neutral-950 border-2 border-[#FF5500]/60 p-8 flex flex-col items-center justify-between text-center shadow-[0_0_80px_rgba(255,85,0,0.5)] backdrop-blur-2xl group transition-all duration-700 overflow-hidden">
            
            {/* Engraved Architectural Top Threshold Header */}
            <div className="w-full flex items-center justify-between border-b border-orange-500/20 pb-4">
              <span className="font-mono text-[10px] text-orange-400 uppercase tracking-widest flex items-center space-x-1">
                <Lock className="w-3 h-3 text-[#FF5500]" />
                <span>MONOLITH GATE // 09</span>
              </span>
              <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                VERIFIED ARCHIVE
              </span>
            </div>

            {/* Glowing Internal Doorway Light Beam Core */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#FF5500]/20 via-transparent to-transparent pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Central Engraved SHIYAM.S Logo Emblem */}
            <div className="relative z-10 my-auto flex flex-col items-center justify-center space-y-4">
              
              {/* Logo Frame Circle */}
              <div className={`relative w-44 h-44 rounded-full bg-black/90 border border-[#FF5500] p-4 flex items-center justify-center shadow-[0_0_50px_rgba(255,85,0,0.6)] transition-transform duration-700 ${
                portalEngaged ? 'scale-110 shadow-[0_0_90px_#FF5500]' : 'group-hover:scale-105'
              }`}>
                <img
                  src={smLogoImg}
                  alt="SHIYAM.S Engraved Monolith Brand Logo"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(255,85,0,0.8)] animate-pulse"
                  style={{ animationDuration: '4s' }}
                />
                
                {/* Rotating Outer Ring */}
                <div className="absolute inset-[-8px] rounded-full border border-dashed border-[#FF5500]/40 animate-[spin_20s_linear_infinite] pointer-events-none" />
              </div>

              {/* Monolith Engraved Nameplate */}
              <div className="space-y-1">
                <h3 className="font-mono font-black text-xl tracking-widest text-white uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
                  SHIYAM.S
                </h3>
                <p className="font-mono text-[11px] text-[#FF5500] font-semibold tracking-wider">
                  FULL-STACK & UI ARCHITECT
                </p>
              </div>

            </div>

            {/* Monolith Bottom Keypad Trigger Status */}
            <div className="relative z-10 w-full pt-4 border-t border-orange-500/20 flex items-center justify-between text-left">
              <div>
                <div className="font-mono text-[9px] text-neutral-400">ACTIVE GATEWAY NODE</div>
                <div className="font-mono text-xs font-bold text-[#FF5500]">
                  {CHANNELS.find(c => c.id === activeChannelId)?.name || 'WHATSAPP DIRECT'}
                </div>
              </div>

              <div className="w-8 h-8 rounded-lg bg-[#FF5500]/20 border border-[#FF5500] flex items-center justify-center text-[#FF5500] font-mono text-xs font-bold">
                ↵
              </div>
            </div>

            {/* Outer Corner Metallic Accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#FF5500]" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#FF5500]" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#FF5500]" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#FF5500]" />
          </div>

        </div>

        {/* RIGHT COLUMN: 2 SPATIAL ACCESS SWITCHES (04, 05) & DIRECT QUICK MESSAGE BOX */}
        <div className="w-full lg:w-1/3 space-y-4">
          <div className="font-mono text-xs font-bold text-orange-400 tracking-widest uppercase mb-2 flex items-center space-x-2">
            <Compass className="w-4 h-4 text-[#FF5500]" />
            <span>EAST PORTAL SWITCHES</span>
          </div>

          {CHANNELS.slice(3, 5).map((channel, idx) => {
            const IconComponent = channel.icon;
            const isActive = activeChannelId === channel.id;

            return (
              <div
                key={channel.id}
                onClick={() => handleChannelClick(channel)}
                onMouseEnter={() => setActiveChannelId(channel.id)}
                className={`relative cursor-pointer group bg-black/90 border rounded-2xl p-5 backdrop-blur-xl transition-all duration-300 ${
                  isIntersecting ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                } ${
                  isActive
                    ? 'border-[#FF5500] shadow-[0_0_40px_rgba(255,85,0,0.45)] scale-[1.03] bg-gradient-to-r from-orange-950/60 via-black to-black'
                    : 'border-orange-500/30 hover:border-orange-500/80 hover:scale-[1.01]'
                }`}
                style={{ transitionDelay: `${0.7 + idx * 0.15}s` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-[#FF5500] text-black border-[#FF5500] scale-110 shadow-[0_0_25px_#FF5500]'
                        : 'bg-neutral-900 text-orange-400 border-orange-500/40 group-hover:border-[#FF5500] group-hover:text-white'
                    }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-black text-[#FF5500]">{channel.code}</span>
                        <h4 className="font-mono font-bold text-sm text-white tracking-wider">
                          {channel.name}
                        </h4>
                      </div>
                      <p className="font-mono text-[11px] text-neutral-400 mt-1 leading-snug">
                        {channel.desc}
                      </p>
                      <div className="font-mono text-[9px] text-orange-500/70 mt-1">
                        {channel.coord}
                      </div>
                    </div>
                  </div>

                  <ArrowUpRight className={`w-5 h-5 transition-all ${
                    isActive ? 'text-[#FF5500] translate-x-1 -translate-y-1 scale-110' : 'text-neutral-500 group-hover:text-white'
                  }`} />
                </div>

                {/* Spatial Active Border Bar */}
                {isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-3/4 bg-[#FF5500] rounded-l shadow-[0_0_15px_#FF5500]" />
                )}
              </div>
            );
          })}

          {/* QUICK EMAIL COPY ACCESS CARD */}
          <div className={`bg-neutral-950/80 border border-orange-500/30 rounded-2xl p-5 backdrop-blur-xl space-y-3 transition-all duration-700 delay-1000 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <div className="flex items-center justify-between text-xs font-mono text-neutral-300">
              <span className="flex items-center space-x-2 text-[#FF5500] font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>DIRECT EMAIL DISPATCH</span>
              </span>
              <span className="text-[10px] text-neutral-500">FAST RESPONSE</span>
            </div>
            
            <a 
              href="mailto:shiyamdev@gmail.com"
              className="block font-mono text-sm sm:text-base font-black text-white hover:text-[#FF5500] transition-colors truncate bg-black/60 p-3 rounded-xl border border-neutral-800 hover:border-[#FF5500]"
            >
              shiyamdev@gmail.com
            </a>
          </div>

        </div>

      </div>

      {/* FINAL MOVIE-STYLE END CREDIT FADE OUT */}
      <div className="relative z-10 w-full max-w-5xl mx-auto mt-24 text-center space-y-8 border-t border-orange-500/20 pt-16">
        
        {/* End Credit Main Text */}
        <div className="space-y-3">
          <p className="font-mono text-xs sm:text-sm font-extrabold tracking-[0.25em] text-[#FF5500] uppercase">
            NO MORE WAITING. LET'S BUILD.
          </p>
          <h3 className="font-mono text-2xl sm:text-4xl font-black text-white tracking-widest uppercase">
            SEE YOU IN THE NEXT BUILD.
          </h3>
        </div>

        {/* Signature Line: CREATED BY SHIYAM S ♥ */}
        <div className="flex items-center justify-center space-x-3 pt-4">
          <span className="font-mono text-sm sm:text-base font-extrabold text-neutral-200 tracking-widest uppercase">
            CREATED BY SHIYAM S
          </span>
          {/* Elegant Amber/Golden Heart */}
          <Heart className="w-4 h-4 text-amber-400 fill-amber-400 drop-shadow-[0_0_10px_rgba(255,215,0,0.85)] animate-pulse" />
        </div>

        {/* Footer Navigation Bar */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-500">
          <div className="flex items-center space-x-4">
            <span className="text-[#FF5500] font-bold">SHIYAM.S PORTFOLIO v2026</span>
            <span>// ALL RIGHTS RESERVED</span>
          </div>

          <button
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-neutral-950 border border-orange-500/40 hover:border-[#FF5500] hover:bg-[#FF5500]/10 text-white transition-all group shadow-[0_0_20px_rgba(255,85,0,0.2)]"
          >
            <span className="text-xs font-mono font-bold tracking-wider">RETURN TO TOP</span>
            <ArrowUp className="w-4 h-4 text-[#FF5500] group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

      </div>

    </section>
  );
};
