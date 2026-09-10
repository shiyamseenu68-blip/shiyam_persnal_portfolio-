import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ExternalLink, Lock, Grid, ChevronLeft, ChevronRight, Code2, Terminal, Search, X, Radio, Orbit, Activity, Sparkles, Zap, ArrowRight, Eye } from 'lucide-react';
import { useMousePosition } from '@/hooks/useMousePosition';

interface Props {
  onNavigate: (id: string) => void;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  url: string;
  tag: string;
  tech: string[];
  badge?: string;
  isPrivate?: boolean;
  codePreview?: string[];
}

export interface CategorySector {
  id: string;
  code: string;
  name: string;
  nameFormatted: React.ReactNode;
  subtitle: string;
  desc: string;
  projectCountStr: string;
  projects: ProjectItem[];
}

const CATEGORIES: CategorySector[] = [
  {
    id: 'basic',
    code: '01',
    name: 'BASIC / SMALL',
    nameFormatted: <>BASIC / SMALL<br />LABS</>,
    subtitle: 'Canvas Architecture & Foundational Labs',
    desc: 'Foundational HTML/CSS experiments, web compilers, custom spatial canvases, and lightweight playgrounds.',
    projectCountStr: '9 PROJECTS',
    projects: [
      { 
        id: 'b-5', 
        title: 'PEN CODE', 
        subtitle: 'Frontend Code Sandbox', 
        desc: 'A simple and powerful online code editor and frontend playground. Write, test and preview your code in real-time.', 
        url: 'https://paradaxexe-commits.github.io/Pen-code.shiyam./', 
        tag: 'WEB TOOL', 
        tech: ['HTML', 'CSS', 'JS'],
        codePreview: [
          'const canvas = document.getElementById("world");',
          'const ctx = canvas.getContext("2d");',
          'function renderCore() {',
          '  ctx.fillStyle = "#FF5500";',
          '  ctx.beginPath();',
          '  ctx.arc(150, 150, 60, 0, Math.PI * 2);',
          '  ctx.fill();',
          '}',
          'requestAnimationFrame(renderCore);'
        ]
      },
      { 
        id: 'b-1', 
        title: 'PERSONAL WEB COM', 
        subtitle: 'Spatial Canvas Portfolio', 
        desc: 'Custom canvas-based web exhibit exploring spatial layout, dynamic node connections & geometry.', 
        url: 'https://shiyam-persnal-webcom.netlify.app/', 
        tag: 'CANVAS BUILD', 
        tech: ['HTML5', 'Canvas', 'CSS3'] 
      },
      { 
        id: 'b-2', 
        title: 'FRUIT FRENZY', 
        subtitle: 'HuggingFace Interactive Space', 
        desc: 'Interactive AI & web experiment hosted on HuggingFace Spaces.', 
        url: 'https://huggingface.co/spaces/shiyam09879/fruit-frenzy', 
        tag: 'AI EXPERIMENT', 
        tech: ['Python', 'Gradio', 'HuggingFace'] 
      },
      { 
        id: 'b-3', 
        title: 'SONGS CONVERTER', 
        subtitle: 'Audio Format Utility', 
        desc: 'Lightweight web tool for audio conversion & format processing.', 
        url: 'https://songsconvater.tiiny.site/', 
        tag: 'WEB UTILITY', 
        tech: ['JS', 'Web Audio API'] 
      },
      { 
        id: 'b-4', 
        title: 'DARK STORY WORLD', 
        subtitle: 'Interactive Story Platform', 
        desc: 'Dark-themed storytelling environment with audio-visual ambiance and dynamic chapter renders.', 
        url: 'https://darkstoryworld.tiiny.site/', 
        tag: 'STORY PLATFORM', 
        tech: ['HTML5', 'CSS Shaders', 'Audio'] 
      },
      { 
        id: 'b-6', 
        title: 'ONLINE COMPILER', 
        subtitle: 'Multi-Language Code Runner', 
        desc: 'Web IDE executing JavaScript, Python & HTML snippets in isolated browser sandbox.', 
        url: 'https://compliers.vercel.app/', 
        tag: 'CODE TOOL', 
        tech: ['React', 'Node.js', 'Vercel'] 
      },
      { 
        id: 'b-7', 
        title: 'JAVA COMPILER', 
        subtitle: 'Java Execution Sandbox', 
        desc: 'Specialized browser environment for compiling & testing Java code.', 
        url: 'https://complier-java.vercel.app/', 
        tag: 'CODE TOOL', 
        tech: ['Java', 'React', 'REST'] 
      },
      { 
        id: 'b-8', 
        title: 'FIRST HTML PROJECT', 
        subtitle: 'First Principles Web Build', 
        desc: 'Foundational HTML/CSS structure exploring layout geometry and semantic tags.', 
        url: 'https://firsttime-own-html-jc25.vercel.app/', 
        tag: 'LEARNING PROJECT', 
        tech: ['HTML5', 'Vanilla CSS'] 
      },
      { 
        id: 'b-9', 
        title: 'SECOND HTML PROJECT', 
        subtitle: 'Advanced Micro-Interactions', 
        desc: 'Expanded HTML5 exploration focusing on styling, keyframes & responsiveness.', 
        url: 'https://mysecond-html.vercel.app/', 
        tag: 'ARCHIVE BUILD', 
        tech: ['HTML5', 'CSS Keyframes'] 
      },
    ],
  },
  {
    id: 'portfolios',
    code: '02',
    name: 'PORTFOLIOS',
    nameFormatted: <>DEMO<br />SHOWCASES</>,
    subtitle: 'Production Websites & High-Performance Showcases',
    desc: 'High-performance personal websites, studio landing pages, cyberpunk concepts, and interactive showcases.',
    projectCountStr: '6 PROJECTS',
    projects: [
      { id: 'p-1', title: 'MINIMALIST DEVELOPER SITE', subtitle: 'Clean Obsidian Portfolio', desc: 'Ultra-clean dark UI showcasing development projects & skills with obsidian lighting.', url: 'https://shiyam-site.vercel.app/#', tag: 'PORTFOLIO V1', tech: ['React', 'Tailwind', 'Vite'] },
      { id: 'p-2', title: 'CREATIVE PROFOLIO SITE', subtitle: 'Interactive Motion Showcase', desc: 'Dynamic web portfolio featuring smooth scroll & parallax exhibits.', url: 'https://shiyam-profolio-site.vercel.app/', tag: 'PORTFOLIO V2', tech: ['React', 'GSAP', 'Lenis'] },
      { id: 'p-3', title: 'CONTACT & STUDIO SITE', subtitle: 'Client Engagement Hub', desc: 'Focused booking & contact portfolio built for web projects and client commissions.', url: 'https://shiyam-site-com.vercel.app/#contact', tag: 'STUDIO HUB', tech: ['Next.js', 'Tailwind'] },
      { id: 'p-4', title: 'WEB BY SNIPER', subtitle: 'Cyberpunk Portfolio Concept', desc: 'Futuristic developer showcase with neon glowing accents & HUD elements.', url: 'https://web-by-sniper.vercel.app/', tag: 'CONCEPT BUILD', tech: ['React', 'Framer Motion'] },
      { id: 'p-5', title: 'UPDATED PORTFOLIO V5', subtitle: 'Full-Stack Showcase', desc: 'Refined production portfolio with modular project galleries and dynamic filters.', url: 'https://updated-potfolio-five.vercel.app/', tag: 'PORTFOLIO V5', tech: ['React', 'TypeScript'] },
      { id: 'p-6', title: 'FINAL MASTER PORTFOLIO', subtitle: 'Cinematic Developer Experience', desc: 'Flagship portfolio experience with 3D interactions & custom shaders.', url: 'https://shiyam-s-final-fortfolio.vercel.app/', tag: 'FLAGSHIP SITE', tech: ['React', 'Three.js', 'Tailwind'] },
    ],
  },
  {
    id: 'animated',
    code: '03',
    name: 'MOTION / SHADERS',
    nameFormatted: <>MOTION /<br />SHADERS</>,
    subtitle: 'Shader Experiments & Scroll-Driven Stories',
    desc: 'Immersive visual websites testing timeline keyframes, scroll triggers, and industrial UI.',
    projectCountStr: '4 PROJECTS',
    projects: [
      { id: 'a-1', title: 'BUILDERS DEV', subtitle: 'Architectural Agency Site', desc: 'Cinematic agency showcase for full-stack developers & web creators.', url: 'https://builders-dev-shiyam.vercel.app/', tag: 'AGENCY SITE', tech: ['React', 'GSAP', 'Lenis'] },
      { id: 'a-2', title: 'THE SEVEN STAGES', subtitle: 'Interactive Scroll Story', desc: 'Sequential 7-phase story experience driven by smooth scrolling.', url: 'https://the-seven-stages.vercel.app/', tag: 'SCROLL STORY', tech: ['Framer Motion', 'React'] },
      { id: 'a-3', title: 'FIRST ANIMATED SCROLLING', subtitle: 'ScrollTrigger Benchmark', desc: 'Experimental smooth scroll site testing timeline keyframes and pinning.', url: 'https://first-animted-srolling.vercel.app/', tag: 'MOTION BENCHMARK', tech: ['GSAP', 'HTML5'] },
      { id: 'a-4', title: 'SECRET STEEL', subtitle: 'Dark Industrial Aesthetic Site', desc: 'Metamorphic UI design featuring brushed steel & obsidian lighting.', url: 'https://secreat-steel.vercel.app/', tag: 'INDUSTRIAL UI', tech: ['React', 'CSS Shaders'] },
    ],
  },
  {
    id: 'editors',
    code: '04',
    name: 'EDITORS / TOOLS',
    nameFormatted: <>EDITORS /<br />WORKSPACES</>,
    subtitle: 'Rich Text Engines & Browser Workspaces',
    desc: 'Enterprise document management suites, markdown note tools, AI notepad workspaces, and PDF editors.',
    projectCountStr: '6 PROJECTS',
    projects: [
      { id: 'e-1', title: 'DOCFLOW', subtitle: 'Enterprise Document Suite', desc: 'Full-featured online document management & rich text editing app.', url: 'https://docflow-z0hff89.public.builtwithrocket.new/', tag: 'ENTERPRISE TOOL', tech: ['React', 'Node.js', 'Quill'] },
      { id: 'e-2', title: 'WORD FLOW CORE', subtitle: 'Minimal Markdown Editor', desc: 'Distraction-free browser editor designed for rapid writing.', url: 'https://word-flow-psi.vercel.app/', tag: 'MARKDOWN EDITOR', tech: ['React', 'Markdown'] },
      { id: 'e-3', title: 'WORD FLOW PRO', subtitle: 'Advanced Document Engine', desc: 'Enhanced document editor with live formatting & cloud sync.', url: 'https://word-flow-fhal.vercel.app/', tag: 'DOC ENGINE', tech: ['React', 'TypeScript'] },
      { id: 'e-4', title: 'AI STUDIO NOTEPAD', subtitle: 'AI-Assisted Note Workspace', desc: 'Smart note-taking workspace integrated with AI prompt tools.', url: 'https://notepad-61th.ai.studio/', tag: 'AI NOTEPAD', tech: ['React', 'AI API'] },
      { id: 'e-5', title: 'WHEAT NOTEPAD', subtitle: 'Clean Web Note App', desc: 'Lightweight local-storage note application with quick export.', url: 'https://note-pad-wheat-eight.vercel.app/', tag: 'LIGHTWEIGHT APP', tech: ['React', 'LocalStorage'] },
      { id: 'e-6', title: 'PDF EDITOR XI', subtitle: 'Browser PDF Annotation Tool', desc: 'Web utility for viewing, annotating, and editing PDF files online.', url: 'https://pdf-editor-xi-nine.vercel.app/', tag: 'PDF UTILITY', tech: ['PDF.js', 'React'] },
    ],
  },
  {
    id: 'realworld',
    code: '05',
    name: 'UTILITIES',
    nameFormatted: <>REAL-WORLD<br />UTILITIES</>,
    subtitle: 'Commercial Platforms & Internal Automation',
    desc: 'Dynamic QR generator platforms and internal playlist management applications.',
    projectCountStr: '2 PROJECTS',
    projects: [
      { id: 'r-1', title: 'QR STORE', subtitle: 'E-Commerce QR Generator', desc: 'Commercial platform for generating branded QR codes & dynamic links.', url: 'https://qr-store-henna.vercel.app/', tag: 'COMMERCIAL TOOL', tech: ['React', 'QRCode API'] },
      { 
        id: 'r-2', 
        title: 'YOUTUBE PLAYLIST MANAGER', 
        subtitle: 'Internal Media Curation Tool', 
        desc: 'Sensitive media management system with automated playlist tools.', 
        url: 'https://youtube-playlistbrok.vercel.app/', 
        tag: 'UTILITY APP',
        tech: ['React', 'YouTube API'],
        badge: 'RESTRICTED • CONTACT ADMIN TO ACCESS',
        isPrivate: true 
      },
    ],
  },
];

export const Scene04Projects: React.FC<Props> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { normalizedX, normalizedY } = useMousePosition();

  const [activeCategoryIdx, setActiveCategoryIdx] = useState<number>(0);
  const [activeProjectIdx, setActiveProjectIdx] = useState<number>(0);
  const [selectedWorldProject, setSelectedWorldProject] = useState<ProjectItem | null>(null);
  const [showMatrixView, setShowMatrixView] = useState<boolean>(false);
  const [matrixSearch, setMatrixSearch] = useState<string>('');
  const [creationCount, setCreationCount] = useState<number>(0);

  const currentCategory = CATEGORIES[activeCategoryIdx];

  // Animated Creation Counter on mount/scroll
  useEffect(() => {
    let start = 0;
    const end = 27;
    const duration = 1200;
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      start += 1;
      setCreationCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, []);

  // GPU Scroll Progress Mapping across the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
    restDelta: 0.001
  });

  const bgGridY = useTransform(smoothProgress, [0, 1], [-50, 50]);
  const glowScale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1.2, 0.9]);

  // 3D tilt vectors from cursor
  const tiltX = normalizedY * -6;
  const tiltY = normalizedX * 8;

  // Flattened all projects for Matrix view
  const allProjects = CATEGORIES.flatMap(cat => cat.projects.map(p => ({ ...p, categoryName: cat.name })));
  const filteredProjects = allProjects.filter(p => 
    p.title.toLowerCase().includes(matrixSearch.toLowerCase()) ||
    p.desc.toLowerCase().includes(matrixSearch.toLowerCase()) ||
    p.tech.some(t => t.toLowerCase().includes(matrixSearch.toLowerCase()))
  );

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative min-h-screen w-full bg-[#020204] text-white overflow-hidden py-12 px-4 sm:px-6 lg:px-12 z-20 flex flex-col justify-start select-none border-t border-white/[0.04]"
    >
      {/* ═══ VOLUMETRIC BURNT ORANGE AMBIENT SPOTLIGHT ═══ */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] sm:w-[1100px] h-[800px] sm:h-[1100px] bg-gradient-to-b from-[#FF5500]/20 via-[#D94800]/06 to-transparent rounded-full blur-[160px] pointer-events-none"
        style={{ scale: glowScale }}
      />

      {/* Atmospheric Spatial Micro Coordinates & Timestamp Tags */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex flex-col justify-between p-6 opacity-20 font-mono text-[9px] text-neutral-500 tracking-[0.35em] uppercase">
        <div className="flex justify-between">
          <span>SHIYAM.S // CREATION ARCHIVE</span>
          <span>LAT. 10.8° N // LON. 78.7° E</span>
        </div>
        <div className="flex justify-between">
          <span>CONSTELLATION INDEX // ACTIVE</span>
          <span>TOTAL BUILDS // 027</span>
        </div>
      </div>

      {/* Parallax Fine Spatial Grid */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,85,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50"
        style={{ y: bgGridY }}
      />

      {/* Mega Background Typography: PROJECTS */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none overflow-hidden opacity-5">
        <span className="font-mono text-[22vw] font-black text-white tracking-tighter leading-none uppercase">
          PROJECTS
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto w-full z-10 flex flex-col items-center">
        
        {/* ═══ 1. TELEMETRY HEADER & CREATION COUNTER ═══ */}
        <div className="w-full flex justify-between items-center font-mono text-xs text-neutral-400 pb-6 border-b border-white/10 mb-8 sm:mb-12">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5500] shadow-[0_0_12px_#FF5500] animate-pulse" />
            <span className="font-bold tracking-widest uppercase text-white">
              // SHIYAM.S CREATION ARCHIVE
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1 rounded bg-[#FF5500]/10 border border-[#FF5500]/30 text-[#FF5500] font-bold text-xs">
              <Orbit className="w-3.5 h-3.5 animate-spin" />
              <span>CREATIONS DISCOVERED: <strong>0{creationCount < 10 ? `0${creationCount}` : creationCount}</strong></span>
            </div>

            {/* All Builds Matrix Modal Button */}
            <button
              onClick={() => setShowMatrixView(true)}
              className="hidden sm:flex items-center space-x-2 px-3.5 py-1 rounded bg-white/5 border border-white/10 hover:border-[#FF5500]/50 text-white font-mono text-xs uppercase transition-all duration-300 cursor-pointer"
            >
              <Grid className="w-3.5 h-3.5 text-[#FF5500]" />
              <span>ALL 27 BUILDS</span>
            </button>
          </div>
        </div>

        {/* ═══ 2. EDITORIAL HERO HEADING ═══ */}
        <div className="w-full text-left mb-10 sm:mb-14">
          <div className="flex flex-col leading-[0.88] uppercase tracking-tighter font-black text-4xl sm:text-7xl lg:text-8xl">
            <span className="text-neutral-500/60">IDEAS</span>
            <span className="text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">BECOME</span>
            <span className="text-[#FF5500] drop-shadow-[0_0_45px_rgba(255,85,0,0.65)]">REAL.</span>
          </div>
          <p className="font-mono text-xs sm:text-sm text-neutral-400 max-w-xl mt-3 tracking-wider uppercase font-medium">
            {currentCategory.desc}
          </p>
        </div>

        {/* ═══ 3. ARCHIVE INDEX CATEGORY SELECTOR ═══ */}
        <div className="w-full relative mb-10 sm:mb-14 z-30">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 border-b border-white/10 pb-4">
            <span className="font-mono text-xs text-neutral-400 font-bold tracking-widest uppercase mr-2">
              ARCHIVE INDEX:
            </span>
            {CATEGORIES.map((cat, idx) => {
              const isActive = idx === activeCategoryIdx;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategoryIdx(idx);
                    setActiveProjectIdx(0);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg font-mono text-xs font-bold uppercase transition-all duration-300 flex items-center space-x-2 border cursor-pointer ${
                    isActive
                      ? 'bg-[#FF5500]/20 text-[#FF5500] border-[#FF5500] shadow-[0_0_25px_rgba(255,85,0,0.4)] scale-105'
                      : 'bg-[#0A0C14]/80 text-neutral-400 border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <span>{cat.code}</span>
                  <span>{cat.name}</span>
                  <span className="text-[10px] text-neutral-400">({cat.projects.length})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ═══ 4. PROJECT SPATIAL CONSTELLATION CHASSIS ═══ */}
        <motion.div 
          style={{ rotateX: tiltX, rotateY: tiltY }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="w-full bg-[#0A0C14]/90 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden min-h-[520px] flex flex-col justify-between"
        >
          {/* Scanline overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_51%)] bg-[size:100%_4px] pointer-events-none opacity-30 z-10" />

          {/* Central Laser Energy Connection Vector */}
          <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-[1.5px] bg-neutral-800 pointer-events-none z-0 hidden sm:block">
            <motion.div 
              className="h-full bg-[#FF5500] shadow-[0_0_12px_#FF5500]"
              animate={{ width: ['0%', '100%'] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            />
          </div>

          {/* Floating Spatial Constellation Nodes (Desktop / Tablet) */}
          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-6 relative z-20 my-auto">
            {currentCategory.projects.map((proj, pIdx) => {
              const isSelected = pIdx === activeProjectIdx;

              return (
                <motion.div
                  key={proj.id}
                  whileHover={{ scale: 1.04, y: -4 }}
                  onClick={() => {
                    setActiveProjectIdx(pIdx);
                    setSelectedWorldProject(proj);
                  }}
                  className={`relative p-5 rounded-2xl border transition-all duration-300 backdrop-blur-md cursor-pointer group flex flex-col justify-between min-h-[220px] ${
                    isSelected
                      ? 'bg-[#101320] border-2 border-[#FF5500] shadow-[0_0_40px_rgba(255,85,0,0.35)] z-30'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.04] z-10'
                  }`}
                >
                  {/* Top Node Junction Header */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-mono text-xs font-black text-[#FF5500]">
                        PROJ 0{pIdx + 1} // {proj.tag}
                      </span>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FF5500] shadow-[0_0_8px_#FF5500]" />
                    </div>

                    <h4 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight mb-1 group-hover:text-[#FF5500] transition-colors">
                      {proj.title}
                    </h4>

                    <p className="font-mono text-xs text-neutral-300 font-bold mb-2">
                      {proj.subtitle}
                    </p>

                    <p className="font-mono text-[11px] text-neutral-400 font-light leading-relaxed line-clamp-2">
                      {proj.desc}
                    </p>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                    <div className="flex flex-wrap gap-1">
                      {proj.tech.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-white/5 font-mono text-[9px] text-neutral-300">
                          {t}
                        </span>
                      ))}
                    </div>

                    <span className="font-mono text-xs text-[#FF5500] font-bold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                      <span>ENTER WORLD</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Floating Spatial Constellation Nodes (Mobile View) */}
          <div className="sm:hidden flex flex-col space-y-4 relative z-20">
            {currentCategory.projects.map((proj, pIdx) => {
              return (
                <div
                  key={proj.id}
                  onClick={() => setSelectedWorldProject(proj)}
                  className="p-4 rounded-xl bg-[#101320] border border-[#FF5500]/50 shadow-lg space-y-2 cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs font-black text-[#FF5500]">PROJ 0{pIdx + 1} // {proj.tag}</span>
                    <ArrowRight className="w-4 h-4 text-[#FF5500]" />
                  </div>
                  <h4 className="text-lg font-black text-white uppercase">{proj.title}</h4>
                  <p className="font-mono text-xs text-neutral-300 font-medium">{proj.subtitle}</p>
                  <p className="font-mono text-[10px] text-neutral-400 line-clamp-2">{proj.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Bottom Chassis Telemetry Footer */}
          <div className="relative z-20 pt-6 border-t border-white/10 flex flex-wrap justify-between items-center font-mono text-xs text-neutral-400">
            <span>SECTOR: <strong className="text-white">{currentCategory.name}</strong></span>
            <span>TOTAL SECTOR CREATIONS: <strong className="text-[#FF5500]">{currentCategory.projects.length}</strong></span>
          </div>
        </motion.div>

        {/* ═══ 5. CINEMATIC "ENTER CREATION WORLD" MODAL ═══ */}
        <AnimatePresence>
          {selectedWorldProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="relative w-full max-w-3xl bg-[#0B0D14] border-2 border-[#FF5500] rounded-3xl p-6 sm:p-10 shadow-[0_0_80px_rgba(255,85,0,0.5)] overflow-hidden text-left"
              >
                {/* Laser Corner Accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#FF5500]" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#FF5500]" />

                {/* Close Modal Button */}
                <button
                  onClick={() => setSelectedWorldProject(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-[#FF5500] text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center space-x-2 text-[#FF5500] font-mono text-xs font-black tracking-widest uppercase mb-2">
                      <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-ping" />
                      <span>CREATION WORLD // {selectedWorldProject.tag}</span>
                    </div>

                    <h3 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-none mb-2">
                      {selectedWorldProject.title}
                    </h3>

                    <p className="font-mono text-sm sm:text-base text-[#FF5500] font-bold">
                      {selectedWorldProject.subtitle}
                    </p>
                  </div>

                  <p className="font-mono text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                    {selectedWorldProject.desc}
                  </p>

                  {/* Tech Stack Badges */}
                  <div>
                    <span className="font-mono text-xs text-neutral-400 block mb-2 uppercase font-bold">
                      TECHNOLOGY MATRIX:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedWorldProject.tech.map((t, idx) => (
                        <span key={idx} className="px-3 py-1 rounded bg-[#FF5500]/15 border border-[#FF5500]/40 font-mono text-xs text-[#FF5500] font-bold">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Code Preview Snippet (if available) */}
                  {selectedWorldProject.codePreview && (
                    <div className="bg-[#050508] border border-white/10 rounded-xl p-4 font-mono text-xs space-y-1">
                      <div className="text-neutral-400 text-[10px] pb-1 border-b border-white/10 mb-2 font-bold uppercase">
                        CODE_PREVIEW // EXECUTION_CORE
                      </div>
                      {selectedWorldProject.codePreview.map((line, lIdx) => (
                        <div key={lIdx} className="text-emerald-400 font-light">
                          {line}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Button: Launch Project URL */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap justify-between items-center gap-4">
                    {selectedWorldProject.isPrivate ? (
                      <div className="flex items-center space-x-2 text-amber-400 font-mono text-xs font-bold">
                        <Lock className="w-4 h-4" />
                        <span>{selectedWorldProject.badge || 'RESTRICTED ACCESS'}</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => window.open(selectedWorldProject.url, '_blank')}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#FF5500] text-black font-mono text-xs font-black uppercase tracking-wider hover:bg-white hover:shadow-[0_0_35px_rgba(255,85,0,0.7)] transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <span>LAUNCH PROJECT WORLD ↗</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ 6. ALL 27 BUILDS MATRIX DRAWER MODAL ═══ */}
        <AnimatePresence>
          {showMatrixView && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex flex-col p-4 sm:p-8 overflow-hidden"
            >
              {/* Top Drawer Controls */}
              <div className="flex justify-between items-center pb-6 border-b border-white/10 max-w-7xl mx-auto w-full">
                <div className="flex items-center space-x-3">
                  <Grid className="w-5 h-5 text-[#FF5500]" />
                  <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                    FULL CREATION ARCHIVE <span className="text-[#FF5500]">(27 BUILDS)</span>
                  </h3>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Search Input */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="SEARCH BUILDS..."
                      value={matrixSearch}
                      onChange={(e) => setMatrixSearch(e.target.value)}
                      className="pl-9 pr-4 py-1.5 rounded-lg bg-white/5 border border-white/10 font-mono text-xs text-white focus:outline-none focus:border-[#FF5500]"
                    />
                  </div>

                  <button
                    onClick={() => setShowMatrixView(false)}
                    className="p-2 rounded-full bg-white/10 hover:bg-[#FF5500] text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Filtered Grid Results */}
              <div className="flex-1 overflow-y-auto max-w-7xl mx-auto w-full py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProjects.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setShowMatrixView(false);
                      setSelectedWorldProject(p);
                    }}
                    className="p-5 rounded-xl bg-[#0B0D14] border border-white/10 hover:border-[#FF5500] transition-all cursor-pointer space-y-2"
                  >
                    <div className="flex justify-between items-center text-[10px] font-mono text-[#FF5500] font-bold">
                      <span>{p.categoryName}</span>
                      <span>{p.tag}</span>
                    </div>
                    <h4 className="text-lg font-black text-white uppercase leading-tight">{p.title}</h4>
                    <p className="font-mono text-xs text-neutral-300 font-bold">{p.subtitle}</p>
                    <p className="font-mono text-[10px] text-neutral-400 line-clamp-2">{p.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Scene04Projects;
