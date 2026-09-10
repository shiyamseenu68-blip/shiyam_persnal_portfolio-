import React from 'react';

interface ProgressDockProps {
  activeScene: number;
  onSelectScene: (sceneIndex: number) => void;
}

const scenesList = [
  { id: 1, label: 'Hero' },
  { id: 2, label: 'ID Card' },
  { id: 3, label: 'About' },
  { id: 4, label: 'Skills' },
  { id: 5, label: 'Projects' },
  { id: 6, label: 'Journey' },
  { id: 7, label: 'Awards' },
  { id: 8, label: 'Resume' },
  { id: 9, label: 'Contact' },
];

export const ProgressDock: React.FC<ProgressDockProps> = ({ activeScene, onSelectScene }) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden md:block pointer-events-auto">
      <div className="flex items-center space-x-1 px-4 py-2 rounded-full glass-panel border border-white/10 backdrop-blur-xl shadow-2xl">
        {scenesList.map((scene) => {
          const isActive = activeScene === scene.id;
          return (
            <button
              key={scene.id}
              onClick={() => onSelectScene(scene.id)}
              className={`group relative px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
                isActive
                  ? 'bg-[#FF6B00] text-black font-bold shadow-amber-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{String(scene.id).padStart(2, '0')}</span>
              
              {/* Tooltip on hover */}
              <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-black/90 border border-white/10 text-[10px] text-neutral-200 font-sans tracking-wide opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
                {scene.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
