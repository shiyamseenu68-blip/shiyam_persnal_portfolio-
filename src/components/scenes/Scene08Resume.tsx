import React, { useState } from 'react';
import { FileText, Download, Check, ArrowRight, User, GraduationCap, Briefcase, Code } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';

interface SceneProps {
  onNavigate: (sceneIndex: number) => void;
}

export const Scene08Resume: React.FC<SceneProps> = ({ onNavigate }) => {
  const [isDownloaded, setIsDownloaded] = useState(false);
  const { personal, education, stats } = portfolioData;

  const handleDownload = () => {
    setIsDownloaded(true);
    setTimeout(() => setIsDownloaded(false), 4000);
  };

  return (
    <section
      id="scene-8"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 py-24 z-20 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#FF6B00]">
              <FileText className="w-3.5 h-3.5" />
              <span>SCENE [08] — EXECUTIVE DOCUMENT</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white">
              MY <span className="text-[#FF6B00]">RESUME</span>
            </h2>
          </div>

          <button
            onClick={handleDownload}
            className={`px-6 py-3 rounded-full font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center space-x-2 shadow-lg ${
              isDownloaded
                ? 'bg-emerald-500 text-black'
                : 'bg-gradient-to-r from-[#FF6B00] to-[#F59E0B] text-black hover:shadow-amber-glow hover:scale-105'
            }`}
          >
            {isDownloaded ? (
              <>
                <Check className="w-4 h-4" />
                <span>RESUME GENERATED!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>DOWNLOAD RESUME</span>
              </>
            )}
          </button>
        </div>

        {/* 3D Booklet Layout Matching Reference Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Booklet Page */}
          <div className="lg:col-span-8 glass-panel p-8 sm:p-10 rounded-3xl border border-white/15 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-4 font-mono text-xs">
              <div>
                <h3 className="text-2xl font-display font-extrabold text-white">
                  {personal.name}
                </h3>
                <span className="text-[#FF6B00] font-bold">{personal.altRole}</span>
              </div>
              <div className="text-neutral-400 text-right">
                <div>{personal.location}</div>
                <div>{personal.email}</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono text-[#FF6B00] uppercase tracking-widest flex items-center space-x-2">
                <GraduationCap className="w-4 h-4" />
                <span>EDUCATION</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1 font-mono text-xs">
                <div className="text-white font-bold">{education.degree}</div>
                <div className="text-amber-300">{education.years}</div>
                <div className="text-neutral-400">{education.institution}</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono text-[#FF6B00] uppercase tracking-widest flex items-center space-x-2">
                <Briefcase className="w-4 h-4" />
                <span>EXPERIENCE & STATS</span>
              </div>
              <div className="grid grid-cols-3 gap-2 font-mono text-xs text-center">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-amber-300 font-bold">{stats.experience}</div>
                  <div className="text-neutral-400 text-[10px]">EXPERIENCE</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-amber-300 font-bold">{stats.projectsCompleted}</div>
                  <div className="text-neutral-400 text-[10px]">PROJECTS</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-amber-300 font-bold">{stats.technologiesCount}</div>
                  <div className="text-neutral-400 text-[10px]">TECH STACK</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Gold Embossed Book Cover */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-full max-w-xs aspect-[3/4] rounded-3xl glass-panel-amber p-8 border-2 border-[#FF6B00]/40 flex flex-col justify-between items-center text-center shadow-amber-glow">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF6B00] to-[#F59E0B] text-black flex items-center justify-center font-display font-extrabold text-2xl shadow-lg">
                S
              </div>

              <div className="space-y-2">
                <div className="font-display font-extrabold text-2xl text-white tracking-widest">
                  RESUME
                </div>
                <div className="text-xs font-mono text-[#FF6B00]">
                  {personal.name}
                </div>
              </div>

              <button
                onClick={handleDownload}
                className="w-full py-3 rounded-xl bg-[#FF6B00] text-black font-mono font-bold text-xs uppercase hover:scale-105 transition-transform flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD</span>
              </button>
            </div>
          </div>

        </div>

        {/* Section Transition CTA */}
        <div className="flex justify-center pt-4">
          <button
            onClick={() => onNavigate(9)}
            className="px-8 py-3.5 rounded-full bg-white/[0.05] border border-white/20 hover:border-[#FF6B00] hover:bg-[#FF6B00]/10 text-white font-mono text-xs tracking-widest uppercase transition-all duration-300 flex items-center space-x-2 group"
          >
            <span>PROCEED TO FINAL CONTACT SCENE</span>
            <ArrowRight className="w-4 h-4 text-[#FF6B00] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
