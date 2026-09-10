import React, { useEffect, useRef, useState } from 'react';
import aboutPortraitImg from '@/assets/shiyam-about-cutout.png';

/**
 * SceneCinematicTransition
 *
 * A 300vh scroll-driven cinematic experience between ID CARD and ABOUT.
 *
 * Visual concept — "THE VAULT OPENS":
 *   Four large dark quadrant slabs assemble over the ID Card,
 *   then split apart in 3D revealing SHIYAM's portrait blazing
 *   through with orange light behind it.
 *
 * Scroll timeline (p = 0.0 → 1.0 over 300vh):
 *
 *   0.00–0.06   Black void opens. Depth particles appear.
 *   0.05–0.40   4 SLABS fly in from each corner (3D rotated).
 *               They assemble into a complete dark "wall" covering the screen.
 *               Each slab has orange rim/edge lighting.
 *   0.38–0.68   SLABS SPLIT OPEN in 3D — fly to their respective corners.
 *               Orange light BLAZES through the widening gap.
 *               Realistic depth: slabs push toward viewer as they open.
 *   0.60–0.82   PORTRAIT rises through the orange light, becoming visible.
 *               "WHO IS / SHIYAM S" typography assembles from scattered fragments.
 *   0.80–1.00   Everything settles. Particles. Glow. Scene complete.
 *               User arrives at the ABOUT section.
 *
 * Scroll is fully reversible — scrolling back reverses all animations.
 */
export const SceneCinematicTransition: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!wrapperRef.current) return;
      const { top, height } = wrapperRef.current.getBoundingClientRect();
      const winH = window.innerHeight;
      const raw = (winH - top) / (winH + height);
      setP(Math.max(0, Math.min(1, raw)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Easing ───────────────────────────────────────────────────────────────
  const eo = (t: number, e = 3) => 1 - Math.pow(1 - Math.max(0, Math.min(1, t)), e);
  const ei = (t: number, e = 2) => Math.pow(Math.max(0, Math.min(1, t)), e);

  // ── Per-slab phased transforms ────────────────────────────────────────────
  // Each slab: assembles 0.05→0.42, splits 0.40→0.70
  const aP  = eo((p - 0.05) / 0.37);  // assembly   0→1
  const spP = eo((p - 0.40) / 0.30);  // split open 0→1

  // Portrait rises 0.60→0.84
  const portP = eo((p - 0.60) / 0.24);
  // Typography assembles 0.68→0.94
  const typoP = eo((p - 0.68) / 0.26);

  // Orange glow intensity peaks during split, fades after portrait full
  const glowI = Math.max(0, Math.min(1, spP * 1.5)) * (1 - Math.max(0, (p - 0.85) / 0.15) * 0.3);

  // ── Slab geometry per quadrant ────────────────────────────────────────────
  // aP goes 0→1 (slab flies in from corner), spP goes 0→1 (slab flies out in 3D)
  // Final position = assembly offset + split offset
  type SlabState = { tx: number; ty: number; tz: number; ry: number; rx: number; op: number };

  const slabTL: SlabState = {
    tx: -62 * (1 - aP) + -78 * spP,
    ty: -62 * (1 - aP) + -78 * spP,
    tz:  spP * 480,
    ry:  30  * (1 - aP) + 48 * spP,
    rx:  18  * (1 - aP) + 28 * spP,
    op:  aP  * (1 - ei(spP, 1.5)),
  };
  const slabTR: SlabState = {
    tx:  62 * (1 - aP) +  78 * spP,
    ty: -62 * (1 - aP) + -78 * spP,
    tz:  spP * 480,
    ry: -30  * (1 - aP) + -48 * spP,
    rx:  18  * (1 - aP) +  28 * spP,
    op:  aP  * (1 - ei(spP, 1.5)),
  };
  const slabBL: SlabState = {
    tx: -62 * (1 - aP) + -78 * spP,
    ty:  62 * (1 - aP) +  78 * spP,
    tz:  spP * 480,
    ry:  30  * (1 - aP) +  48 * spP,
    rx: -18  * (1 - aP) + -28 * spP,
    op:  aP  * (1 - ei(spP, 1.5)),
  };
  const slabBR: SlabState = {
    tx:  62 * (1 - aP) +  78 * spP,
    ty:  62 * (1 - aP) +  78 * spP,
    tz:  spP * 480,
    ry: -30  * (1 - aP) + -48 * spP,
    rx: -18  * (1 - aP) + -28 * spP,
    op:  aP  * (1 - ei(spP, 1.5)),
  };

  const slabStyle = (s: SlabState, w: string, h: string, top?: 0 | 'auto', left?: 0 | 'auto', right?: 0 | 'auto', bottom?: 0 | 'auto'): React.CSSProperties => ({
    position: 'absolute',
    width: w, height: h,
    top, left, right, bottom,
    background: 'linear-gradient(135deg, #0a0a0e 0%, #0e0c10 50%, #0d0900 100%)',
    transform: `translate3d(${s.tx}vw, ${s.ty}vh, ${s.tz}px) rotateY(${s.ry}deg) rotateX(${s.rx}deg)`,
    opacity: Math.max(0, Math.min(1, s.op)),
    willChange: 'transform, opacity',
    transformStyle: 'preserve-3d',
    // Orange rim light on inner edges
    boxShadow: `inset 0 0 40px rgba(255,85,0,${0.04 + aP * 0.10}), 0 0 60px rgba(0,0,0,0.9)`,
  });

  // Deterministic spark positions
  const sparks = [
    [12,22],[88,18],[45,8],[92,65],[8,78],[72,88],[35,50],[60,30],[20,55],
  ];

  return (
    <div
      ref={wrapperRef}
      style={{ height: '300vh', position: 'relative', width: '100%' }}
    >
      {/* Sticky cinematic stage */}
      <div
        style={{
          position: 'sticky', top: 0, width: '100%', height: '100vh',
          overflow: 'hidden', background: '#050508',
          perspective: '1400px', perspectiveOrigin: '50% 50%',
        }}
      >

        {/* ── Deep black void ───────────────────────────────────────────────── */}
        <div style={{ position: 'absolute', inset: 0, background: '#050508', zIndex: 0 }} />

        {/* ── Dot matrix grid ───────────────────────────────────────────────── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(255,85,0,0.045) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
          opacity: Math.min(1, aP * 1.5) * 0.35,
        }} />

        {/* ── Volumetric orange core — blazes through the split gap ─────────── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          {/* Main core blast */}
          <div style={{
            width: '600px', height: '600px', borderRadius: '50%',
            background: `radial-gradient(circle, rgba(255,85,0,${glowI * 0.55}) 0%, rgba(255,60,0,${glowI * 0.22}) 35%, rgba(255,40,0,${glowI * 0.06}) 60%, transparent 75%)`,
            filter: 'blur(50px)',
          }} />
        </div>
        {/* Tighter inner bloom */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <div style={{
            width: '280px', height: '280px', borderRadius: '50%',
            background: `radial-gradient(circle, rgba(255,120,0,${glowI * 0.70}) 0%, rgba(255,85,0,${glowI * 0.35}) 40%, transparent 70%)`,
            filter: 'blur(20px)',
          }} />
        </div>

        {/* ── Horizontal orange light rails ────────────────────────────────── */}
        {spP > 0.1 && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
            {[0.455, 0.545].map((pos, i) => (
              <div key={i} style={{
                position: 'absolute', top: `${pos * 100}%`, left: 0, right: 0, height: '1px',
                background: 'linear-gradient(to right, transparent 0%, rgba(255,85,0,0.15) 20%, rgba(255,85,0,0.60) 50%, rgba(255,85,0,0.15) 80%, transparent 100%)',
                opacity: Math.min(1, (spP - 0.1) / 0.4),
                transform: `scaleX(${Math.min(1, (spP - 0.1) / 0.6)})`,
              }} />
            ))}
          </div>
        )}

        {/* ── Vertical orange light rails ───────────────────────────────────── */}
        {spP > 0.1 && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
            {[0.455, 0.545].map((pos, i) => (
              <div key={i} style={{
                position: 'absolute', left: `${pos * 100}%`, top: 0, bottom: 0, width: '1px',
                background: 'linear-gradient(to bottom, transparent 0%, rgba(255,85,0,0.12) 20%, rgba(255,85,0,0.50) 50%, rgba(255,85,0,0.12) 80%, transparent 100%)',
                opacity: Math.min(1, (spP - 0.1) / 0.5),
                transform: `scaleY(${Math.min(1, (spP - 0.1) / 0.7)})`,
              }} />
            ))}
          </div>
        )}

        {/* ── Spark particles ───────────────────────────────────────────────── */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', overflow: 'hidden' }}>
          {sparks.map(([x, y], i) => (
            <div key={i} style={{
              position: 'absolute', left: `${x}%`, top: `${y}%`,
              width: `${2 + (i % 3)}px`, height: `${2 + (i % 3)}px`,
              borderRadius: '50%', background: '#FF5500',
              boxShadow: '0 0 6px 3px rgba(255,85,0,0.45)',
              opacity: glowI * (0.25 + (i % 3) * 0.15),
              filter: 'blur(0.5px)',
            }} />
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            THE FOUR QUADRANT SLABS
        ══════════════════════════════════════════════════════════════════════ */}

        {/* Orange inner edge lines (visible when slabs assembled, before split) */}
        {aP > 0.3 && spP < 0.8 && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none',
            opacity: aP * (1 - spP * 1.3),
          }}>
            {/* Horizontal center seam */}
            <div style={{
              position: 'absolute', top: '50%', left: 0, right: 0, height: '1px',
              background: `linear-gradient(to right, transparent 0%, rgba(255,85,0,${aP * 0.6}) 25%, rgba(255,85,0,${aP * 0.9}) 50%, rgba(255,85,0,${aP * 0.6}) 75%, transparent 100%)`,
            }} />
            {/* Vertical center seam */}
            <div style={{
              position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px',
              background: `linear-gradient(to bottom, transparent 0%, rgba(255,85,0,${aP * 0.6}) 25%, rgba(255,85,0,${aP * 0.9}) 50%, rgba(255,85,0,${aP * 0.6}) 75%, transparent 100%)`,
            }} />
          </div>
        )}

        {/* TL — top-left quadrant */}
        <div style={{
          ...slabStyle(slabTL, '51%', '51%'),
          top: 0, left: 0, zIndex: 10,
          borderRight: `1px solid rgba(255,85,0,${aP * 0.4})`,
          borderBottom: `1px solid rgba(255,85,0,${aP * 0.4})`,
        }}>
          {/* Corner accent */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: 36, height: 36, borderTop: '2px solid rgba(255,85,0,0.7)', borderLeft: '2px solid rgba(255,85,0,0.7)' }} />
          <div style={{ position: 'absolute', bottom: 20, right: 20, fontFamily: 'monospace', fontSize: 9, color: 'rgba(255,85,0,0.4)', letterSpacing: '0.2em' }}>TL</div>
        </div>

        {/* TR — top-right quadrant */}
        <div style={{
          ...slabStyle(slabTR, '51%', '51%'),
          top: 0, right: 0, zIndex: 10,
          borderLeft: `1px solid rgba(255,85,0,${aP * 0.4})`,
          borderBottom: `1px solid rgba(255,85,0,${aP * 0.4})`,
        }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: 36, height: 36, borderTop: '2px solid rgba(255,85,0,0.7)', borderRight: '2px solid rgba(255,85,0,0.7)' }} />
          <div style={{ position: 'absolute', bottom: 20, left: 20, fontFamily: 'monospace', fontSize: 9, color: 'rgba(255,85,0,0.4)', letterSpacing: '0.2em' }}>TR</div>
        </div>

        {/* BL — bottom-left quadrant */}
        <div style={{
          ...slabStyle(slabBL, '51%', '51%'),
          bottom: 0, left: 0, zIndex: 10,
          borderRight: `1px solid rgba(255,85,0,${aP * 0.4})`,
          borderTop: `1px solid rgba(255,85,0,${aP * 0.4})`,
        }}>
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: 36, height: 36, borderBottom: '2px solid rgba(255,85,0,0.7)', borderLeft: '2px solid rgba(255,85,0,0.7)' }} />
          <div style={{ position: 'absolute', top: 20, right: 20, fontFamily: 'monospace', fontSize: 9, color: 'rgba(255,85,0,0.4)', letterSpacing: '0.2em' }}>BL</div>
        </div>

        {/* BR — bottom-right quadrant */}
        <div style={{
          ...slabStyle(slabBR, '51%', '51%'),
          bottom: 0, right: 0, zIndex: 10,
          borderLeft: `1px solid rgba(255,85,0,${aP * 0.4})`,
          borderTop: `1px solid rgba(255,85,0,${aP * 0.4})`,
        }}>
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: 36, height: 36, borderBottom: '2px solid rgba(255,85,0,0.7)', borderRight: '2px solid rgba(255,85,0,0.7)' }} />
          <div style={{ position: 'absolute', top: 20, left: 20, fontFamily: 'monospace', fontSize: 9, color: 'rgba(255,85,0,0.4)', letterSpacing: '0.2em' }}>BR</div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            PORTRAIT — rises through the blazing orange gap
        ══════════════════════════════════════════════════════════════════════ */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 15,
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          pointerEvents: 'none',
          opacity: Math.max(0, portP),
          transform: `translate3d(0, ${(1 - portP) * 60}px, 0) scale(${0.88 + portP * 0.12})`,
          willChange: 'transform, opacity',
        }}>
          <img
            src={aboutPortraitImg}
            alt="SHIYAM S"
            style={{
              height: '88vh', width: 'auto',
              objectFit: 'contain', objectPosition: 'bottom',
              filter: `contrast(1.05) drop-shadow(0 0 ${portP * 60}px rgba(255,85,0,0.50))`,
              display: 'block',
            }}
            loading="eager"
          />
          {/* Floor blend */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px',
            background: 'linear-gradient(to top, #050508 0%, rgba(5,5,8,0.8) 55%, transparent 100%)',
            zIndex: 30,
          }} />
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            TYPOGRAPHY — fragments that assemble alongside the portrait
        ══════════════════════════════════════════════════════════════════════ */}

        {/* "WHO IS" + "SHIYAM S" — top-left, assembles in */}
        <div style={{
          position: 'absolute', top: 'clamp(32px,5vh,64px)', left: 'clamp(32px,5vw,80px)',
          zIndex: 20, pointerEvents: 'none',
          opacity: Math.max(0, typoP),
          transform: `translate3d(${(1 - typoP) * -50}px, ${(1 - typoP) * -30}px, 0)`,
          willChange: 'transform, opacity',
        }}>
          <div style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.3em', color: 'rgba(170,170,190,0.7)', textTransform: 'uppercase', fontWeight: 600 }}>
            WHO IS
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
            <h2 style={{
              fontFamily: 'system-ui, sans-serif', fontWeight: 900,
              fontSize: 'clamp(20px,2.5vw,32px)', letterSpacing: '0.1em',
              color: '#FF5500', lineHeight: 1, margin: 0,
            }}>SHIYAM S</h2>
            <div style={{ height: 2, width: 40, background: '#FF5500', boxShadow: '0 0 8px #FF5500' }} />
          </div>
        </div>

        {/* "I BUILD." — bottom-left, outlined stroke */}
        <div style={{
          position: 'absolute',
          bottom: 'clamp(80px,14vh,140px)',
          left: 'clamp(24px,4vw,64px)',
          zIndex: 20, pointerEvents: 'none',
          opacity: Math.max(0, Math.min(1, typoP - 0.1) / 0.9),
          transform: `translate3d(${(1 - typoP) * -60}px, ${(1 - typoP) * 40}px, 0)`,
          willChange: 'transform, opacity',
        }}>
          <h3 style={{
            fontFamily: 'system-ui, sans-serif', fontWeight: 900,
            fontSize: 'clamp(40px,7vw,100px)', lineHeight: 0.9, letterSpacing: '-0.03em', margin: 0,
            WebkitTextStroke: '2px #FF5500', color: 'transparent',
            filter: 'drop-shadow(0 0 20px rgba(255,85,0,0.35))',
            userSelect: 'none',
          }}>I BUILD.</h3>
        </div>

        {/* "NEVER TRY LATER." — top-right */}
        <div style={{
          position: 'absolute',
          top: 'clamp(80px,14vh,140px)',
          right: 'clamp(24px,4vw,64px)',
          zIndex: 20, pointerEvents: 'none', textAlign: 'right',
          opacity: Math.max(0, Math.min(1, typoP - 0.15) / 0.85),
          transform: `translate3d(${(1 - typoP) * 50}px, ${(1 - typoP) * -40}px, 0)`,
          willChange: 'transform, opacity',
        }}>
          <h3 style={{
            fontFamily: 'system-ui, sans-serif', fontWeight: 900,
            fontSize: 'clamp(18px,3.2vw,46px)', lineHeight: 1.0, letterSpacing: '-0.02em', margin: 0,
            color: '#ffffff', userSelect: 'none',
          }}>NEVER TRY<br />LATER.</h3>
        </div>

        {/* "DO IT." — bottom-right, massive orange */}
        <div style={{
          position: 'absolute',
          bottom: 'clamp(80px,14vh,140px)',
          right: 'clamp(24px,4vw,60px)',
          zIndex: 20, pointerEvents: 'none', textAlign: 'right',
          opacity: Math.max(0, Math.min(1, typoP - 0.20) / 0.80),
          transform: `translate3d(${(1 - typoP) * 70}px, ${(1 - typoP) * 50}px, 0)`,
          willChange: 'transform, opacity',
        }}>
          <h3 style={{
            fontFamily: 'system-ui, sans-serif', fontWeight: 900,
            fontSize: 'clamp(36px,7vw,100px)', lineHeight: 0.88, letterSpacing: '-0.04em', margin: 0,
            color: '#FF5500',
            filter: `drop-shadow(0 0 ${typoP * 60}px rgba(255,85,0,0.85))`,
            userSelect: 'none',
          }}>DO IT.</h3>
        </div>

        {/* "/// MY MINDSET /// / ALWAYS BE HAPPY." — center-top fades in last */}
        <div style={{
          position: 'absolute', top: 'clamp(24px,4vh,40px)', left: '50%',
          transform: `translateX(-50%) translate3d(0, ${(1 - typoP) * -20}px, 0)`,
          zIndex: 20, pointerEvents: 'none', textAlign: 'center',
          opacity: Math.max(0, Math.min(1, typoP - 0.25) / 0.75),
          willChange: 'transform, opacity',
        }}>
          <div style={{
            fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.25em',
            color: 'rgba(255,85,0,0.6)', textTransform: 'uppercase', fontWeight: 700,
          }}>/// ALWAYS BE HAPPY. ALWAYS SMILE. ///</div>
        </div>

        {/* ── Scroll progress HUD ───────────────────────────────────────────── */}
        <div style={{
          position: 'absolute', bottom: 20, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
          fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'rgba(100,100,120,0.55)',
          pointerEvents: 'none', zIndex: 50,
        }}>
          <div style={{ width: 100, height: 1, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', background: '#FF5500', width: `${p * 100}%` }} />
          </div>
          <span>
            {p < 0.05 ? 'ID CARD' :
             p < 0.40 ? 'ASSEMBLING...' :
             p < 0.68 ? 'OPENING...' :
             p < 0.90 ? 'REVEALING...' : 'ABOUT'}
          </span>
        </div>

        {/* Top vignette to blend with ID Card above */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 80,
          background: 'linear-gradient(to bottom, #050508 0%, transparent 100%)',
          pointerEvents: 'none', zIndex: 45,
        }} />
        {/* Bottom vignette to blend into About below */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
          background: 'linear-gradient(to top, #050508 0%, transparent 100%)',
          pointerEvents: 'none', zIndex: 45,
        }} />

      </div>
    </div>
  );
};

export default SceneCinematicTransition;
