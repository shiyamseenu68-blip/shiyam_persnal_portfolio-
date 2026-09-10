import React, { useState } from 'react';
import { Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';

interface SceneProps {
  onNavigate: (sceneIndex: number) => void;
}

export const Scene04Skills: React.FC<SceneProps> = ({ onNavigate }) => {
  const { skills } = portfolioData;
  const [activeSkill, setActiveSkill] = useState(skills[0]);

  return (
    <section
      id="scene-4"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 py-24 z-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#FF6B00]">
              <Cpu className="w-3.5 h-3.5" />
              <span>SCENE [04] — INTERACTIVE NETWORK</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white">
              MY <span className="text-[#FF6B00]">SKILLS</span>
            </h2>
          </div>
          <p className="text-xs font-mono text-neutral-400 max-w-sm">
            HOVER OR TAP ANY TECHNOLOGY NODE TO INSPECT SPECS.
          </p>
        </div>

        {/* Central Node Network Layout Matching Reference Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Node Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {skills.map((skill) => {
              const isSelected = activeSkill.id === skill.id;
              return (
                <div
                  key={skill.id}
                  onClick={() => setActiveSkill(skill)}
                  onMouseEnter={() => setActiveSkill(skill)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col items-center justify-center space-y-2 text-center ${
                    isSelected
                      ? 'glass-panel-amber border-2 border-[#FF6B00] scale-105 shadow-amber-glow z-10'
                      : 'glass-panel border-white/10 hover:border-white/30'
                  }`}
                >
                  <span className="text-3xl">{skill.icon}</span>
                  <span className="font-display font-bold text-sm text-white">{skill.name}</span>
                  <span className="text-[10px] font-mono text-[#FF6B00]">{skill.category}</span>
                </div>
              );
            })}
          </div>

          {/* Right Column: Node Details Inspector */}
          <div className="lg:col-span-5">
            <div className="glass-panel-amber p-8 rounded-3xl border border-[#FF6B00]/40 space-y-4 shadow-amber-glow">
              <div className="flex items-center space-x-3 pb-4 border-b border-white/10">
                <span className="text-4xl">{activeSkill.icon}</span>
                <div>
                  <h3 className="text-2xl font-display font-bold text-white">
                    {activeSkill.name}
                  </h3>
                  <span className="text-xs font-mono text-[#FF6B00]">
                    {activeSkill.category} • {activeSkill.level}
                  </span>
                </div>
              </div>

              <p className="text-xs font-mono text-neutral-300 leading-relaxed">
                Core technological node configured for production frontend and full-stack web applications.
              </p>

              <div className="pt-3 border-t border-white/10 flex justify-between items-center text-xs font-mono text-neutral-400">
                <span>STATUS: VERIFIED READY</span>
                <span className="text-emerald-400 font-bold">100% ACTIVE</span>
              </div>
            </div>
          </div>

        </div>

        {/* Section Transition CTA */}
        <div className="flex justify-center pt-4">
          <button
            onClick={() => onNavigate(5)}
            className="px-8 py-3.5 rounded-full bg-white/[0.05] border border-white/20 hover:border-[#FF6B00] hover:bg-[#FF6B00]/10 text-white font-mono text-xs tracking-widest uppercase transition-all duration-300 flex items-center space-x-2 group"
          >
            <span>VIEW FEATURED PROJECTS</span>
            <ArrowRight className="w-4 h-4 text-[#FF6B00] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
