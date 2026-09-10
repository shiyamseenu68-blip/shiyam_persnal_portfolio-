import React from 'react';
import { Trophy, Award, ShieldCheck, Star, ArrowRight, AlertCircle } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';

interface SceneProps {
  onNavigate: (sceneIndex: number) => void;
}

export const Scene07Achievements: React.FC<SceneProps> = ({ onNavigate }) => {
  const { achievements } = portfolioData;

  const getIcon = (type: string) => {
    switch (type) {
      case 'HACKATHON':
        return <Trophy className="w-8 h-8 text-[#FF6B00]" />;
      case 'CERTIFICATION':
        return <ShieldCheck className="w-8 h-8 text-amber-400" />;
      default:
        return <Award className="w-8 h-8 text-[#F59E0B]" />;
    }
  };

  return (
    <section
      id="scene-7"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 py-24 z-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#FF6B00]">
              <Trophy className="w-3.5 h-3.5" />
              <span>SCENE [07] — RECOGNITIONS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white">
              ACHIEVEMENTS & <span className="text-[#FF6B00]">AWARDS</span>
            </h2>
          </div>
        </div>

        {/* 5 Collectible Badge Cards Matching Reference Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-[#FF6B00]/50 transition-all duration-300 space-y-4 flex flex-col justify-between hover:-translate-y-1"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-black/60 border border-white/15 flex items-center justify-center">
                  {getIcon(item.type)}
                </div>
                <span className="px-2 py-0.5 rounded bg-white/10 text-[9px] font-mono text-neutral-300 font-bold">
                  {item.type}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-display font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-amber-200">
                  {item.subtitle}
                </p>
                <p className="text-[10px] font-mono text-neutral-400">
                  {item.date}
                </p>
              </div>

              {item.isPlaceholder && (
                <div className="pt-2 border-t border-white/10 flex items-center space-x-1 text-[9px] font-mono text-[#FF6B00]">
                  <AlertCircle className="w-3 h-3" />
                  <span>REPLACE WITH YOUR REAL AWARD</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Section Transition CTA */}
        <div className="flex justify-center pt-4">
          <button
            onClick={() => onNavigate(8)}
            className="px-8 py-3.5 rounded-full bg-white/[0.05] border border-white/20 hover:border-[#FF6B00] hover:bg-[#FF6B00]/10 text-white font-mono text-xs tracking-widest uppercase transition-all duration-300 flex items-center space-x-2 group"
          >
            <span>VIEW RESUME TERMINAL</span>
            <ArrowRight className="w-4 h-4 text-[#FF6B00] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
