import React, { useState } from 'react';
import { ExternalLink, Github, Layers, ArrowRight, Monitor, Code, AlertCircle } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';

interface SceneProps {
  onNavigate: (sceneIndex: number) => void;
}

export const Scene05Projects: React.FC<SceneProps> = ({ onNavigate }) => {
  const { projects } = portfolioData;
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeViewTab, setActiveViewTab] = useState<'preview' | 'code'>('preview');

  const currentProject = projects[activeProjectIndex];

  return (
    <section
      id="scene-5"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 py-24 z-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#FF6B00]">
              <Layers className="w-3.5 h-3.5" />
              <span>SCENE [05] — SHOWCASE</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white">
              FEATURED <span className="text-[#FF6B00]">PROJECTS</span>
            </h2>
          </div>

          {/* Project Switcher Tabs */}
          <div className="flex items-center space-x-2 bg-white/[0.03] p-1.5 rounded-full border border-white/10">
            {projects.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setActiveProjectIndex(idx)}
                className={`px-4 py-2 rounded-full font-mono text-xs transition-all duration-300 ${
                  activeProjectIndex === idx
                    ? 'bg-[#FF6B00] text-black font-bold shadow-amber-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {p.numberStr}
              </button>
            ))}
          </div>
        </div>

        {/* Main Stage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Project Specs */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono text-[#FF6B00] font-bold">
                  PROJECT {currentProject.numberStr}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono text-amber-300 flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3 text-[#FF6B00]" />
                  <span>PLACEHOLDER — ADD YOUR REAL DETAILS</span>
                </span>
              </div>
              
              <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
                {currentProject.title}
              </h3>
              
              <p className="text-sm font-mono text-amber-200">
                {currentProject.subtitle}
              </p>

              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                {currentProject.description}
              </p>

              {/* Tech Stack Pills */}
              <div className="space-y-2 pt-2">
                <h5 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                  TECH STACK
                </h5>
                <div className="flex flex-wrap gap-2">
                  {currentProject.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-neutral-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 pt-4 border-t border-white/10">
              <a
                href={currentProject.liveDemoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full bg-[#FF6B00] text-black font-mono font-bold text-xs tracking-wider uppercase hover:shadow-amber-glow hover:scale-105 transition-all flex items-center space-x-2"
              >
                <span>LIVE DEMO</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={currentProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full glass-panel border border-white/20 text-white font-mono text-xs tracking-wider uppercase hover:border-[#FF6B00] hover:bg-[#FF6B00]/10 transition-all flex items-center space-x-2"
              >
                <Github className="w-4 h-4" />
                <span>GITHUB</span>
              </a>
            </div>
          </div>

          {/* Right Column: Project Viewport Canvas Frame */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="w-full h-full min-h-[360px] rounded-3xl glass-panel-amber border-2 border-[#FF6B00]/40 overflow-hidden flex flex-col justify-between shadow-amber-glow">
              
              {/* Top Bar */}
              <div className="px-6 py-4 bg-black/60 border-b border-white/10 flex justify-between items-center font-mono text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="text-neutral-400 ml-2">project-{currentProject.numberStr}.dev</span>
                </div>

                <div className="flex items-center space-x-2 bg-white/10 p-1 rounded-lg">
                  <button
                    onClick={() => setActiveViewTab('preview')}
                    className={`px-3 py-1 rounded text-[11px] flex items-center space-x-1.5 transition-colors ${
                      activeViewTab === 'preview'
                        ? 'bg-[#FF6B00] text-black font-bold'
                        : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    <Monitor className="w-3 h-3" />
                    <span>PREVIEW</span>
                  </button>
                  <button
                    onClick={() => setActiveViewTab('code')}
                    className={`px-3 py-1 rounded text-[11px] flex items-center space-x-1.5 transition-colors ${
                      activeViewTab === 'code'
                        ? 'bg-[#FF6B00] text-black font-bold'
                        : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    <Code className="w-3 h-3" />
                    <span>CODE</span>
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-8 flex-1 flex flex-col justify-center bg-gradient-to-b from-[#0A0C14] to-[#050508] relative overflow-hidden">
                {activeViewTab === 'preview' ? (
                  <div className="relative z-10 space-y-4 text-center py-4">
                    <div className="p-4 rounded-2xl bg-white/[0.04] border border-dashed border-[#FF6B00]/40 max-w-md mx-auto space-y-2">
                      <div className="text-xs font-mono text-[#FF6B00] font-bold">
                        [PROJECT PREVIEW CANVAS]
                      </div>
                      <p className="text-xs font-mono text-neutral-300">
                        {currentProject.title}
                      </p>
                      <div className="text-[10px] font-mono text-neutral-500">
                        {currentProject.liveDemoUrl}
                      </div>
                    </div>
                  </div>
                ) : (
                  <pre className="relative z-10 font-mono text-xs text-amber-200 bg-black/80 p-4 rounded-2xl border border-white/10 overflow-x-auto">
                    <code>{currentProject.previewCode}</code>
                  </pre>
                )}
              </div>

              <div className="px-6 py-3 bg-black/80 border-t border-white/10 font-mono text-[10px] text-neutral-400 flex justify-between">
                <span>PLACEHOLDER PROJECT VIEWPORT</span>
                <span className="text-[#FF6B00]">REPLACE WITH YOUR REAL URL</span>
              </div>

            </div>
          </div>

        </div>

        {/* Section Transition CTA */}
        <div className="flex justify-center pt-4">
          <button
            onClick={() => onNavigate(6)}
            className="px-8 py-3.5 rounded-full bg-white/[0.05] border border-white/20 hover:border-[#FF6B00] hover:bg-[#FF6B00]/10 text-white font-mono text-xs tracking-widest uppercase transition-all duration-300 flex items-center space-x-2 group"
          >
            <span>VIEW MY JOURNEY TIMELINE</span>
            <ArrowRight className="w-4 h-4 text-[#FF6B00] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
