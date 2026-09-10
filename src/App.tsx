import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Scene00Intro } from '@/components/scenes/Scene00Intro';
import { CanvasWorld } from '@/components/background/CanvasWorld';
import { GrainOverlay } from '@/components/background/GrainOverlay';
import { Header } from '@/components/navigation/Header';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar';
import { Scene01Hero } from '@/components/scenes/Scene01Hero';
import { Scene02IDCard } from '@/components/scenes/Scene02IDCard';
import { Scene03About } from '@/components/scenes/Scene03About';
import { Scene03bDoItLight } from '@/components/scenes/Scene03bDoItLight';
import { Scene04Projects } from '@/components/scenes/Scene04Projects';
import { Scene05Engine } from '@/components/scenes/Scene05Engine';
import { Scene06Journey } from '@/components/scenes/Scene06Journey';
import { SceneCinematicFireTransition } from '@/components/scenes/SceneCinematicFireTransition';
import { Scene09Contact } from '@/components/scenes/Scene09Contact';

export type IntroPageState = 'INTRO_REVEAL' | 'MAIN_PORTFOLIO';

export function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [lenisRef, setLenisRef] = useState<Lenis | null>(null);

  // Page Intro State Machine: INTRO_REVEAL → MAIN_PORTFOLIO (100% Code-Driven 3D Kinetic Typography Intro)
  const [pageState, setPageState] = useState<IntroPageState>('INTRO_REVEAL');
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    // Cinema-Grade Weightless Lenis Smooth Scroll Tuning
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2.2,
      infinite: false,
    });
    setLenisRef(lenis);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Control scrolling lock based on intro page state
  useEffect(() => {
    if (pageState === 'INTRO_REVEAL') {
      if (lenisRef) lenisRef.stop();
      document.body.style.overflow = 'hidden';
    } else {
      if (lenisRef) lenisRef.start();
      document.body.style.overflow = '';
    }
  }, [pageState, lenisRef]);

  const handleNavigate = (sectionId: string | number) => {
    const targetId = typeof sectionId === 'string' ? sectionId : `scene-${sectionId}`;
    setActiveSection(targetId);
    const target = document.getElementById(targetId);
    if (target) {
      if (lenisRef) {
        lenisRef.scrollTo(target, { offset: 0, duration: 1.6 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050508] text-neutral-100 selection:bg-[#FF5500] selection:text-white font-sans antialiased overflow-x-hidden">
      {/* ═══ 1. DEDICATED 3D KINETIC TYPOGRAPHY INTRO SECTION (Image-Free, Code-Driven) ═══ */}
      {pageState === 'INTRO_REVEAL' && (
        <Scene00Intro
          onNavReveal={() => setShowNav(true)}
          onComplete={() => {
            setPageState('MAIN_PORTFOLIO');
            setShowNav(true);
          }}
        />
      )}

      {/* UI Controls & Overlays */}
      <CustomCursor />
      {pageState !== 'INTRO_REVEAL' && <ScrollProgressBar />}
      {pageState !== 'INTRO_REVEAL' && <CanvasWorld />}
      <GrainOverlay />

      {/* Header Navigation — Appears smoothly after Intro completes */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isVisible={showNav || pageState === 'MAIN_PORTFOLIO'}
      />

      {/* ═══ 2. MAIN PORTFOLIO TRAJECTORY (Rendered only after Intro finishes) ═══ */}
      {pageState !== 'INTRO_REVEAL' && (
        <main className="relative z-10">
          <Scene01Hero onNavigate={handleNavigate} />
          <Scene02IDCard onNavigate={handleNavigate} />
          <Scene03About onNavigate={handleNavigate} />
          <Scene03bDoItLight onNavigate={handleNavigate} />
          <Scene04Projects onNavigate={handleNavigate} />
          <Scene05Engine onNavigate={handleNavigate} />
          <Scene06Journey onNavigate={handleNavigate} />
          <SceneCinematicFireTransition
            onNavigate={handleNavigate}
            onActiveStateChange={(isActive) => {
              if (isActive) {
                setActiveSection('cinematic-climax');
              }
            }}
          />
          <Scene09Contact onNavigate={handleNavigate} />
        </main>
      )}
    </div>
  );
}

export default App;
