import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  Zap, Cpu, Activity, Radio, Sparkles, Layers, Code2, 
  Server, GitBranch, Cloud, Globe, ArrowRight, ShieldCheck, 
  Terminal, Atom, Compass, Crosshair
} from 'lucide-react';
import { useMousePosition } from '@/hooks/useMousePosition';

interface Props {
  onNavigate: (id: string) => void;
}

export interface SkillNode {
  id: string;
  name: string;
  group: '01 FRONTEND' | '02 BACKEND' | '03 CREATIVE' | '04 TOOLS' | '05 BUILD';
  groupId: number;
  tag: string;
  subtext: string;
  desc: string;
  orbitIndex: 1 | 2 | 3;
  angleDeg: number;
  icon: any;
}

const SKILL_NODES: SkillNode[] = [
  // 01 FRONTEND
  {
    id: 'html',
    name: 'HTML',
    group: '01 FRONTEND',
    groupId: 1,
    tag: 'MARKUP / DOM',
    subtext: 'STRUCTURE / SEMANTICS / ARIA',
    desc: 'Semantic layout architecture, accessible DOM hierarchy, clean document tree, SEO schemas.',
    orbitIndex: 1,
    angleDeg: 25,
    icon: Layers,
  },
  {
    id: 'css',
    name: 'CSS',
    group: '01 FRONTEND',
    groupId: 1,
    tag: 'STYLING / ENGINE',
    subtext: 'LAYOUT / ANIMATION / RESPONSIVE',
    desc: 'Custom CSS variables, Grid/Flexbox geometry, keyframe engines, 60fps GPU transforms.',
    orbitIndex: 2,
    angleDeg: 5,
    icon: Sparkles,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    group: '01 FRONTEND',
    groupId: 1,
    tag: 'LOGIC ENGINE',
    subtext: 'INTERACTION / MOTION / WEB',
    desc: 'ES6+ functional programming, asynchronous event loops, DOM performance, dynamic algorithm logic.',
    orbitIndex: 3,
    angleDeg: 42,
    icon: Code2,
  },
  {
    id: 'react',
    name: 'React',
    group: '01 FRONTEND',
    groupId: 1,
    tag: 'COMPONENT MATRIX',
    subtext: 'STATE / HOOKS / VIRTUAL DOM',
    desc: 'Component architecture, custom reactive hooks, state pipelines, virtual DOM rendering optimization.',
    orbitIndex: 2,
    angleDeg: 58,
    icon: Cpu,
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    group: '01 FRONTEND',
    groupId: 1,
    tag: 'SSR / HYBRID ARCH',
    subtext: 'SERVER COMPONENTS / HYDRATION',
    desc: 'Server-side rendering, static site generation, App Router architecture, edge route optimization.',
    orbitIndex: 3,
    angleDeg: 75,
    icon: Globe,
  },

  // 02 BACKEND
  {
    id: 'nodejs',
    name: 'Node.js',
    group: '02 BACKEND',
    groupId: 2,
    tag: 'RUNTIME ENVIRONMENT',
    subtext: 'EVENT-DRIVEN / ASYNC I/O',
    desc: 'Express API services, non-blocking I/O queues, REST architecture, serverless middleware pipelines.',
    orbitIndex: 1,
    angleDeg: 112,
    icon: Server,
  },
  {
    id: 'apis',
    name: 'APIs',
    group: '02 BACKEND',
    groupId: 2,
    tag: 'DATA PIPELINE',
    subtext: 'REST / ENDPOINTS / FETCH',
    desc: 'RESTful API integration, JSON schema contracts, third-party authentication, WebSockets & streams.',
    orbitIndex: 2,
    angleDeg: 92,
    icon: Activity,
  },
  {
    id: 'python',
    name: 'Python',
    group: '02 BACKEND',
    groupId: 2,
    tag: 'AUTOMATION / SCRIPT',
    subtext: 'DATA PROCESSING / UTILS',
    desc: 'Automation workflows, data parsing, backend scripting, algorithmic utility services.',
    orbitIndex: 2,
    angleDeg: 132,
    icon: Terminal,
  },
  {
    id: 'databases',
    name: 'Databases',
    group: '02 BACKEND',
    groupId: 2,
    tag: 'PERSISTENCE CORE',
    subtext: 'SCHEMA / QUERY / STORAGE',
    desc: 'Relational & NoSQL data models, query optimization, persistent storage architectures.',
    orbitIndex: 3,
    angleDeg: 152,
    icon: ShieldCheck,
  },

  // 03 CREATIVE
  {
    id: 'uiux',
    name: 'UI/UX',
    group: '03 CREATIVE',
    groupId: 3,
    tag: 'INTERFACE / EXP',
    subtext: 'USER CENTRIC / WIREFRAMING',
    desc: 'Micro-interactions, user journeys, design systems, visual hierarchy & ergonomic interfaces.',
    orbitIndex: 1,
    angleDeg: 192,
    icon: Compass,
  },
  {
    id: 'animation',
    name: 'Animation',
    group: '03 CREATIVE',
    groupId: 3,
    tag: '60FPS GPU MOTION',
    subtext: 'FRAMER MOTION / TIMELINES',
    desc: 'Scroll-driven animations, physics spring transitions, spatial kinetic motion curves.',
    orbitIndex: 2,
    angleDeg: 172,
    icon: Sparkles,
  },
  {
    id: 'creativecoding',
    name: 'Creative Coding',
    group: '03 CREATIVE',
    groupId: 3,
    tag: 'CANVAS / SHADERS',
    subtext: 'GENERATIVE / PARTICLES / 3D',
    desc: 'Canvas 2D particle systems, mathematical generative visuals, WebGL shader experiments.',
    orbitIndex: 2,
    angleDeg: 212,
    icon: Atom,
  },
  {
    id: 'visualdesign',
    name: 'Visual Design',
    group: '03 CREATIVE',
    groupId: 3,
    tag: 'TYPOGRAPHY / SPACE',
    subtext: 'EDITORIAL / CONTRAST / MOOD',
    desc: 'Cinematic layout composition, premium dark typography, intentional color theory & hierarchy.',
    orbitIndex: 3,
    angleDeg: 232,
    icon: Crosshair,
  },

  // 04 TOOLS
  {
    id: 'git',
    name: 'Git',
    group: '04 TOOLS',
    groupId: 4,
    tag: 'VERSION TRACKING',
    subtext: 'BRANCH FLOW / COMMITS',
    desc: 'Version control workflows, commit history architecture, rebase & merge strategies.',
    orbitIndex: 1,
    angleDeg: 272,
    icon: GitBranch,
  },
  {
    id: 'github',
    name: 'GitHub',
    group: '04 TOOLS',
    groupId: 4,
    tag: 'COLLABORATION HUB',
    subtext: 'REPOS / ACTIONS / PRs',
    desc: 'Remote repository hosting, issue tracking, continuous integration workflow triggers.',
    orbitIndex: 2,
    angleDeg: 252,
    icon: Code2,
  },
  {
    id: 'vscode',
    name: 'VS Code',
    group: '04 TOOLS',
    groupId: 4,
    tag: 'WORKSTATION ENGINE',
    subtext: 'IDE / EXTENSIONS / CLI',
    desc: 'Tailored workspace configuration, fast refactoring, debugging environment & CLI tools.',
    orbitIndex: 2,
    angleDeg: 292,
    icon: Terminal,
  },
  {
    id: 'vercel',
    name: 'Vercel',
    group: '04 TOOLS',
    groupId: 4,
    tag: 'EDGE DEPLOYMENT',
    subtext: 'SERVERLESS / CDN / DOMAIN',
    desc: 'Production deployment pipelines, global edge network hosting, zero-config builds.',
    orbitIndex: 3,
    angleDeg: 275,
    icon: Cloud,
  },

  // 05 BUILD
  {
    id: 'fullstack',
    name: 'Full Stack',
    group: '05 BUILD',
    groupId: 5,
    tag: 'END-TO-END ARCH',
    subtext: 'FRONTEND + BACKEND INTEGRATION',
    desc: 'Complete full stack system design, seamless API contracts, client-server data flow.',
    orbitIndex: 1,
    angleDeg: 332,
    icon: Cpu,
  },
  {
    id: 'webapps',
    name: 'Web Apps',
    group: '05 BUILD',
    groupId: 5,
    tag: 'REACTIVE APPS',
    subtext: 'SINGLE PAGE / PROGRESSIVE',
    desc: 'High performance web applications, rich interactive dashboards, scalable clients.',
    orbitIndex: 2,
    angleDeg: 312,
    icon: Globe,
  },
  {
    id: 'experiments',
    name: 'Experiments',
    group: '05 BUILD',
    groupId: 5,
    tag: 'PROTOTYPES / LAB',
    subtext: 'R&D / POC / INNOVATION',
    desc: 'Rapid prototyping, pushing interactive boundaries, experimental UI concept builds.',
    orbitIndex: 2,
    angleDeg: 352,
    icon: Zap,
  },
  {
    id: 'deployment',
    name: 'Deployment',
    group: '05 BUILD',
    groupId: 5,
    tag: 'PRODUCTION RELEASE',
    subtext: 'BUILD PIPELINES / RELEASE',
    desc: 'Live site deployment, environment configuration, build size optimization, performance checks.',
    orbitIndex: 3,
    angleDeg: 328,
    icon: Cloud,
  },
];

const ORBIT_RADII = {
  1: 170, // Inner orbit radius in px
  2: 275, // Middle orbit radius in px
  3: 380, // Outer orbit radius in px
};

export const Scene05Engine: React.FC<Props> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.15, once: false });
  const { normalizedX, normalizedY } = useMousePosition();

  const [activeNodeId, setActiveNodeId] = useState<string>('javascript');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  // Parallax spatial mouse tilt
  const parallaxX = normalizedX * 8;
  const parallaxY = normalizedY * 8;

  // Selected node details
  const activeNode = SKILL_NODES.find(n => n.id === activeNodeId) || SKILL_NODES[2];

  // System sequence timer step when entering view
  const [powerPhase, setPowerPhase] = useState<'dormant' | 'scanning' | 'core_on' | 'orbits_on' | 'nodes_on' | 'active'>('dormant');

  useEffect(() => {
    if (isInView) {
      setPowerPhase('scanning');
      const t1 = setTimeout(() => setPowerPhase('core_on'), 300);
      const t2 = setTimeout(() => setPowerPhase('orbits_on'), 700);
      const t3 = setTimeout(() => setPowerPhase('nodes_on'), 1100);
      const t4 = setTimeout(() => setPowerPhase('active'), 1600);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    } else {
      setPowerPhase('dormant');
    }
  }, [isInView]);

  // Center coordinate for SVG orbital system (Canvas space 900x900)
  const cx = 450;
  const cy = 450;

  // Compute position for each skill node
  const getCoordinates = (node: SkillNode) => {
    const r = ORBIT_RADII[node.orbitIndex];
    const rad = (node.angleDeg * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  const isPowerOn = powerPhase !== 'dormant';
  const isOrbitsOn = ['orbits_on', 'nodes_on', 'active'].includes(powerPhase);
  const isNodesOn = ['nodes_on', 'active'].includes(powerPhase);

  return (
    <section
      ref={containerRef}
      id="stack"
      className="relative min-h-screen w-full bg-[#030306] text-white font-sans overflow-hidden select-none z-20 py-12 sm:py-20 px-4 sm:px-8 lg:px-12 flex flex-col justify-start border-t border-white/[0.04]"
    >
      {/* ═══ 1. BACKGROUND ENVIRONMENT & WATERMARK ═══ */}
      {/* Volumetric Burnt Orange Central Backlight */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1200px] h-[500px] sm:h-[850px] bg-gradient-to-b from-[#FF5500]/20 via-[#D94800]/05 to-transparent rounded-full blur-[170px] pointer-events-none z-0 transition-opacity duration-1000 ${
          isPowerOn ? 'opacity-100' : 'opacity-20'
        }`} 
      />

      {/* Faint System Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-25 z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,85,0,0.06)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-30 z-0" />

      {/* Giant Background Typography Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 text-center">
        <span className="font-black text-[22vw] leading-none tracking-tighter text-white/[0.025] uppercase block font-sans">
          STACK
        </span>
      </div>

      {/* Atmospheric Micro Coordinates & System Status Tags */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex flex-col justify-between p-6 opacity-30 font-mono text-[9px] text-neutral-400 tracking-[0.35em] uppercase">
        <div className="flex justify-between">
          <span>SYSTEM // SKILL CONSTELLATION v4.0</span>
          <span>LAT. 10.8° N // LON. 78.7° E</span>
        </div>
        <div className="flex justify-between">
          <span>SHIYAM CORE // DIGITAL DNA ONLINE</span>
          <span>SYSTEM POWER // 100% NOMINAL</span>
        </div>
      </div>

      {/* Scanning Line Animation on Entrance */}
      {powerPhase === 'scanning' && (
        <motion.div 
          initial={{ top: '0%' }}
          animate={{ top: '100%' }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FF5500] to-transparent shadow-[0_0_20px_#FF5500] z-40 pointer-events-none"
        />
      )}

      {/* ═══ 2. SECTION CONTENT CONTAINER ═══ */}
      <div className="relative max-w-7xl mx-auto w-full z-10 flex flex-col items-center">
        
        {/* ── TOP TELEMETRY STATUS BAR ── */}
        <div className="w-full flex justify-between items-center font-mono text-xs text-neutral-400 pb-5 border-b border-white/10 mb-8 sm:mb-12">
          <div className="flex items-center space-x-3">
            <span className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${
              isPowerOn ? 'bg-[#FF5500] shadow-[0_0_14px_#FF5500] animate-pulse' : 'bg-neutral-600'
            }`} />
            <span className="font-bold tracking-widest uppercase text-white">
              {isPowerOn ? 'SYSTEM POWERED ON // SKILL CONSTELLATION ACTIVE' : 'SYSTEM STANDBY'}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-[11px]">
            <Radio className="w-3.5 h-3.5 text-[#FF5500] animate-pulse" />
            <span className="text-neutral-400 font-bold uppercase tracking-wider">
              MODE: {powerPhase.toUpperCase()}
            </span>
          </div>
        </div>

        {/* ── SECTION EDITORIAL HEADING ── */}
        <div className="w-full text-left mb-8 sm:mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#FF5500]/10 border border-[#FF5500]/30 backdrop-blur-md mb-3">
            <Zap className="w-3.5 h-3.5 text-[#FF5500] animate-pulse" />
            <span className="font-mono text-xs text-[#FF5500] font-black tracking-[0.25em] uppercase">
              04 // SKILL ARCHITECTURE
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            WHAT I USE <br className="hidden sm:inline" />
            <span className="text-[#FF5500] drop-shadow-[0_0_35px_rgba(255,85,0,0.65)]">
              TO MAKE THINGS MOVE.
            </span>
          </h2>

          <p className="font-mono text-xs sm:text-sm text-neutral-400 max-w-xl mt-3 tracking-widest uppercase font-semibold">
            NOT A TOOLBOX. A SYSTEM.
          </p>
        </div>

        {/* ── GROUP FILTER BUTTONS (Optional quick highlights) ── */}
        <div className="w-full flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10 font-mono text-[11px]">
          <button
            onClick={() => setSelectedGroup(null)}
            className={`px-3 py-1.5 rounded-full border tracking-wider uppercase transition-all duration-300 ${
              selectedGroup === null
                ? 'bg-[#FF5500] text-black font-black border-[#FF5500] shadow-[0_0_15px_rgba(255,85,0,0.4)]'
                : 'bg-white/[0.03] text-neutral-400 border-white/10 hover:border-white/30'
            }`}
          >
            ALL NODES (21)
          </button>

          {['01 FRONTEND', '02 BACKEND', '03 CREATIVE', '04 TOOLS', '05 BUILD'].map((grp) => (
            <button
              key={grp}
              onClick={() => setSelectedGroup(selectedGroup === grp ? null : grp)}
              className={`px-3 py-1.5 rounded-full border tracking-wider uppercase transition-all duration-300 ${
                selectedGroup === grp
                  ? 'bg-[#FF5500] text-black font-black border-[#FF5500] shadow-[0_0_15px_rgba(255,85,0,0.4)]'
                  : 'bg-white/[0.03] text-neutral-400 border-white/10 hover:border-white/30'
              }`}
            >
              {grp}
            </button>
          ))}
        </div>

        {/* ═══ 3. THE SKILL CONSTELLATION (DESKTOP ORBITAL SYSTEM) ═══ */}
        <motion.div 
          style={{ x: parallaxX, y: parallaxY }}
          transition={{ type: 'spring', stiffness: 200, damping: 24 }}
          className="relative w-full max-w-[900px] h-[550px] sm:h-[800px] lg:h-[880px] my-4 flex items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-[#06070D]/90 backdrop-blur-2xl shadow-[0_0_70px_rgba(0,0,0,0.95)]"
        >
          {/* Subtle Grid Overlay inside Canvas */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,85,0,0.05)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

          {/* SVG Orbital Canvas (900x900 viewport scale) */}
          <svg
            viewBox="0 0 900 900"
            className="w-full h-full absolute inset-0 pointer-events-none z-10"
          >
            <defs>
              {/* Radial gradient for active energy vectors */}
              <linearGradient id="energyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF5500" stopOpacity="1" />
                <stop offset="100%" stopColor="#FF8800" stopOpacity="0.4" />
              </linearGradient>

              {/* Glow Filter */}
              <filter id="glowOrange" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* ── Orbit Circles ── */}
            {isOrbitsOn && (
              <g className="transition-opacity duration-700">
                {/* Orbit 1 (Inner r=170) */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={ORBIT_RADII[1]}
                  fill="none"
                  stroke="#ffffff"
                  strokeOpacity="0.08"
                  strokeWidth="1.5"
                  strokeDasharray="4 8"
                  className="animate-[spin_60s_linear_infinite]"
                  style={{ transformOrigin: '450px 450px' }}
                />

                {/* Orbit 2 (Middle r=275) */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={ORBIT_RADII[2]}
                  fill="none"
                  stroke="#FF5500"
                  strokeOpacity="0.15"
                  strokeWidth="1.5"
                  strokeDasharray="12 12"
                  className="animate-[spin_80s_linear_infinite_reverse]"
                  style={{ transformOrigin: '450px 450px' }}
                />

                {/* Orbit 3 (Outer r=380) */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={ORBIT_RADII[3]}
                  fill="none"
                  stroke="#ffffff"
                  strokeOpacity="0.05"
                  strokeWidth="1"
                  strokeDasharray="2 6"
                />
              </g>
            )}

            {/* ── Vector Lines from Core to Skill Nodes ── */}
            {isNodesOn && SKILL_NODES.map((node) => {
              const coords = getCoordinates(node);
              const isActive = activeNodeId === node.id;
              const isGroupMatches = selectedGroup === null || selectedGroup === node.group;

              if (!isGroupMatches) return null;

              return (
                <g key={`line-${node.id}`}>
                  <line
                    x1={cx}
                    y1={cy}
                    x2={coords.x}
                    y2={coords.y}
                    stroke={isActive ? '#FF5500' : '#ffffff'}
                    strokeOpacity={isActive ? '0.9' : '0.08'}
                    strokeWidth={isActive ? '2.5' : '1'}
                    filter={isActive ? 'url(#glowOrange)' : undefined}
                    strokeDasharray={isActive ? '6 6' : 'none'}
                    className={isActive ? 'animate-[pulse_1.5s_infinite]' : ''}
                  />

                  {/* Animated Energy Particle traveling along active line */}
                  {isActive && (
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r="4"
                      fill="#FF5500"
                      filter="url(#glowOrange)"
                    >
                      <animate
                        attributeName="cx"
                        from={cx}
                        to={coords.x}
                        dur="1.2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="cy"
                        from={cy}
                        to={coords.y}
                        dur="1.2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              );
            })}

            {/* ── Crosshair Target Marks ── */}
            <line x1={cx - 15} y1={cy} x2={cx + 15} y2={cy} stroke="#FF5500" strokeOpacity="0.3" strokeWidth="1" />
            <line x1={cx} y1={cy - 15} x2={cx} y2={cy + 15} stroke="#FF5500" strokeOpacity="0.3" strokeWidth="1" />
          </svg>

          {/* ── CENTER CORE NODE ── */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center pointer-events-auto cursor-pointer group">
            
            {/* Layered Animated Rings */}
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center">
              
              {/* Outer Rotating Broken Ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-[#FF5500]/40 animate-[spin_35s_linear_infinite] group-hover:border-[#FF5500]" />
              
              {/* Middle Counter-Rotating Ring */}
              <div className="absolute inset-3 rounded-full border border-white/15 animate-[spin_25s_linear_infinite_reverse]" />

              {/* Inner Pulsing Aura Ring */}
              <div className="absolute inset-6 rounded-full bg-[#FF5500]/10 border border-[#FF5500]/60 animate-pulse group-hover:bg-[#FF5500]/20 transition-colors" />

              {/* Central Glowing Core Disc */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#121420] via-[#080910] to-[#000000] border-2 border-[#FF5500] shadow-[0_0_50px_rgba(255,85,0,0.5)] flex flex-col items-center justify-center p-3 text-center z-20 transition-transform duration-300 group-hover:scale-105">
                
                <span className="font-mono text-[9px] sm:text-[10px] font-black text-neutral-400 tracking-[0.25em] uppercase">
                  SHIYAM.S
                </span>
                
                <span className="font-sans text-xs sm:text-sm font-black text-white uppercase tracking-tight leading-none mt-1">
                  CREATIVE<br />ENGINE
                </span>

                <span className="font-mono text-[7px] text-[#FF5500] font-bold tracking-widest uppercase mt-2">
                  CORE ONLINE
                </span>
              </div>
            </div>

            {/* Micro Tag Under Core */}
            <span className="font-mono text-[9px] font-bold text-neutral-400 tracking-[0.2em] uppercase mt-3 bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
              BUILD • BREAK • LEARN • REPEAT
            </span>
          </div>

          {/* ── 21 INTERACTIVE SKILL NODES (Absolute HTML Positions inside Canvas) ── */}
          <div className="absolute inset-0 z-20 pointer-events-none hidden sm:block">
            {SKILL_NODES.map((node) => {
              const coords = getCoordinates(node);
              const isActive = activeNodeId === node.id;
              const isGroupMatches = selectedGroup === null || selectedGroup === node.group;
              const IconComp = node.icon;

              if (!isGroupMatches) return null;

              // Position percentage relative to 900x900 canvas
              const leftPercent = (coords.x / 900) * 100;
              const topPercent = (coords.y / 900) * 100;

              return (
                <div
                  key={node.id}
                  style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                >
                  <button
                    onMouseEnter={() => setActiveNodeId(node.id)}
                    onClick={() => setActiveNodeId(node.id)}
                    className={`relative group flex items-center justify-center rounded-full transition-all duration-300 focus:outline-none ${
                      isActive
                        ? 'w-12 h-12 bg-[#FF5500] border-2 border-white text-black shadow-[0_0_30px_#FF5500] scale-125 z-40'
                        : 'w-8 h-8 bg-[#0D0F18] border border-white/20 text-neutral-300 hover:border-[#FF5500] hover:scale-110 z-20'
                    }`}
                  >
                    <IconComp className={`w-4 h-4 ${isActive ? 'text-black font-bold' : 'text-neutral-300'}`} />

                    {/* Node Name Label beside point */}
                    <span className={`absolute left-full ml-2 whitespace-nowrap font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur-md transition-all ${
                      isActive 
                        ? 'bg-[#FF5500] text-black font-black border border-white shadow-[0_0_15px_#FF5500]'
                        : 'bg-black/70 text-neutral-300 border border-white/10 group-hover:text-white group-hover:border-white/30'
                    }`}>
                      {node.name}
                    </span>

                    {/* Pulsing Aura Ring on Active */}
                    {isActive && (
                      <span className="absolute inset-0 rounded-full border border-[#FF5500] animate-ping pointer-events-none" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* ── INTEGRATED READOUT HUD PANEL (Floating beside Active Node on Desktop) ── */}
          <div className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-80 bg-[#080912]/95 border border-[#FF5500]/40 rounded-2xl p-5 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.9)] z-30 font-mono text-xs text-white pointer-events-auto">
            <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-3 text-[10px] text-neutral-400">
              <span className="flex items-center space-x-1.5">
                <Activity className="w-3.5 h-3.5 text-[#FF5500] animate-pulse" />
                <span className="font-bold text-[#FF5500] tracking-widest uppercase">
                  {activeNode.group}
                </span>
              </span>
              <span className="bg-white/10 px-2 py-0.5 rounded text-white font-bold">
                {activeNode.tag}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-sans font-black uppercase text-white tracking-tight flex items-center justify-between">
                <span>{activeNode.name}</span>
                <span className="text-xs font-mono font-bold text-[#FF5500]">&gt; NODE ONLINE</span>
              </h3>

              <p className="text-[11px] text-[#FF5500] font-bold tracking-wider uppercase">
                "{activeNode.subtext}"
              </p>

              <p className="text-neutral-300 text-[11px] leading-relaxed font-sans font-medium">
                {activeNode.desc}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-[9px] text-neutral-400">
              <span>LATENCY: 0.1ms (OPTIMAL)</span>
              <span>INDEX: 0.99 // VERIFIED</span>
            </div>
          </div>

        </motion.div>

        {/* ═══ 4. MOBILE RESPONSIVE ORBITAL COMPOSITION ═══ */}
        <div className="sm:hidden w-full space-y-4 my-6 z-20">
          <div className="font-mono text-xs font-bold text-[#FF5500] uppercase tracking-wider mb-2 flex items-center space-x-2">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>SELECT NODE TO INSPECT DIGITAL DNA:</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {SKILL_NODES.map((node) => {
              const isActive = activeNodeId === node.id;
              const isGroupMatches = selectedGroup === null || selectedGroup === node.group;
              const IconComp = node.icon;

              if (!isGroupMatches) return null;

              return (
                <button
                  key={node.id}
                  onClick={() => setActiveNodeId(node.id)}
                  className={`min-h-[48px] px-3 py-2.5 rounded-xl border text-left flex items-center space-x-2.5 transition-all ${
                    isActive
                      ? 'bg-[#FF5500] border-white text-black font-black shadow-[0_0_20px_#FF5500]'
                      : 'bg-white/[0.03] border-white/10 text-white hover:border-white/30'
                  }`}
                >
                  <IconComp className={`w-4 h-4 shrink-0 ${isActive ? 'text-black' : 'text-[#FF5500]'}`} />
                  <div className="overflow-hidden">
                    <div className="text-xs font-black uppercase truncate">{node.name}</div>
                    <div className={`text-[9px] font-mono truncate ${isActive ? 'text-black/80 font-bold' : 'text-neutral-400'}`}>
                      {node.group.split(' ')[1]}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ═══ 5. FINAL SYSTEM STATEMENT ═══ */}
        <div className="mt-10 sm:mt-16 text-center space-y-4 w-full">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#FF5500]/10 border border-[#FF5500]/30 font-mono text-xs text-[#FF5500] font-black tracking-widest uppercase shadow-[0_0_20px_rgba(255,85,0,0.3)]">
            <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse" />
            <span>THE WORK IS THE PROOF. THE STACK IS THE SYSTEM.</span>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('journey')}
              className="inline-flex items-center space-x-3 px-8 py-4 rounded-xl bg-[#FF5500] text-black font-mono text-xs font-black uppercase tracking-wider hover:bg-white hover:shadow-[0_0_40px_rgba(255,85,0,0.7)] transition-all duration-300 group cursor-pointer"
            >
              <span>ENTER THE JOURNEY MAP →</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Scene05Engine;
