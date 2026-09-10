import React, { useEffect, useRef, useState } from 'react';
import { Code2, Smartphone, Globe, Rocket, Coffee, Smile } from 'lucide-react';
import { useMousePosition } from '@/hooks/useMousePosition';
import aboutPortraitImg from '@/assets/shiyam-about-cutout.png';

interface Props {
  onNavigate: (id: string) => void;
}

/**
 * SceneDoItAndAbout
 *
 * A single 700vh scroll-driven cinematic experience that handles:
 *
 *   DO IT:
 *     1. Four physical cinematic panels enter from different directions
 *     2. They lock together into a full composition
 *     3. "I BUILD." / "NEVER TRY LATER." / "DO IT." is revealed
 *     4. "EVERYTHING HAPPENS FOR A REASON." concludes the chapter
 *
 *   TRANSITION:
 *     5. Panels split apart — top panels fly upward, bottom flies down
 *     6. Shiyam's portrait rises through the opening gap
 *
 *   ABOUT:
 *     7. Full identity, mindset, stats emerge into the dark studio
 *
 * Scroll Timeline (0.0 → 1.0):
 *   0.00–0.06   Black void opens
 *   0.06–0.28   Panel 1 (top-left, "I BUILD.") enters from upper-left
 *   0.20–0.42   Panel 2 (top-right, "NEVER TRY LATER.") enters from upper-right
 *   0.36–0.56   Panel 3 (bottom-full, "DO IT.") rises from below
 *   0.54–0.70   All locked. "EVERYTHING HAPPENS FOR A REASON." emerges
 *   0.70–0.82   Scene held, full composition visible
 *   0.80–0.93   Panels split away (1+2 fly up, 3 flies down)
 *   0.88–1.00   About identity / portrait / stats revealed
 */
export const SceneDoItAndAbout: React.FC<Props> = ({ onNavigate }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0); // normalized scroll 0..1

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

  const { normalizedX, normalizedY } = useMousePosition();

  // ── Easing functions ──────────────────────────────────────────────────────
  const easeOut  = (t: number, exp = 3) => 1 - Math.pow(1 - t, exp);
  const easeIn   = (t: number, exp = 2) => Math.pow(t, exp);
  const easeIO   = (t: number) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;
  const phase    = (s: number, e: number, ease = easeOut) =>
    ease(Math.max(0, Math.min(1, (p - s) / (e - s))));

  // ── Phase progress values ─────────────────────────────────────────────────
  const panel1P   = phase(0.06, 0.28);        // Panel 1 entry
  const panel2P   = phase(0.20, 0.42);        // Panel 2 entry
  const panel3P   = phase(0.36, 0.56);        // Panel 3 entry
  const reasonP   = phase(0.54, 0.70);        // "EVERYTHING HAPPENS FOR A REASON."
  const holdP     = phase(0.70, 0.82, easeIO);// Scene hold
  const splitP    = phase(0.80, 0.93);        // Panels split
  const aboutP    = phase(0.88, 1.00);        // About reveal

  // How assembled: 0 = fully split/away, 1 = fully assembled
  const assembleP = Math.max(0, Math.min(1, Math.min(
    panel1P, panel2P, panel3P
  ) * 1.2 - splitP * 1.2));

  // ── Panel 1 — top-left, "I BUILD." ───────────────────────────────────────
  // Enters from upper-left, slight 3D rotateY
  const p1inv = 1 - panel1P;
  const panel1Style: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '58%',
    height: '55%',
    background: 'linear-gradient(135deg, #0a0a0e 0%, #0e0c10 60%, #0a0800 100%)',
    borderRight: '1px solid rgba(255,85,0,0.2)',
    borderBottom: '1px solid rgba(255,85,0,0.12)',
    transform: `
      translate3d(${p1inv * -65}vw, ${p1inv * -45}vh, 0)
      rotateY(${p1inv * 28}deg)
      rotateX(${p1inv * -12}deg)
      scale(${0.7 + panel1P * 0.3})
    `,
    opacity: panel1P,
    boxShadow: `inset -2px -2px 60px rgba(255,85,0,0.06), 4px 4px 40px rgba(0,0,0,0.8)`,
    // On split: fly upward
    ...(splitP > 0 && {
      transform: `
        translate3d(${splitP * -30}vw, ${splitP * -120}vh, 0)
        rotateY(${splitP * -18}deg)
        rotateX(${splitP * 15}deg)
        scale(${1 - splitP * 0.15})
      `,
    }),
    willChange: 'transform, opacity',
    zIndex: 10,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    padding: 'clamp(20px, 4vw, 60px)',
  };

  // ── Panel 2 — top-right, "NEVER TRY LATER." ──────────────────────────────
  const p2inv = 1 - panel2P;
  const panel2Style: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '44%',
    height: '55%',
    background: 'linear-gradient(225deg, #0c0c12 0%, #090910 50%, #0d0a06 100%)',
    borderLeft: '1px solid rgba(255,85,0,0.15)',
    borderBottom: '1px solid rgba(255,85,0,0.12)',
    transform: `
      translate3d(${p2inv * 65}vw, ${p2inv * -40}vh, 0)
      rotateY(${p2inv * -30}deg)
      rotateX(${p2inv * -8}deg)
      scale(${0.7 + panel2P * 0.3})
    `,
    opacity: panel2P,
    boxShadow: `inset 2px -2px 60px rgba(255,85,0,0.04), -4px 4px 40px rgba(0,0,0,0.8)`,
    ...(splitP > 0 && {
      transform: `
        translate3d(${splitP * 30}vw, ${splitP * -120}vh, 0)
        rotateY(${splitP * 18}deg)
        rotateX(${splitP * 15}deg)
        scale(${1 - splitP * 0.15})
      `,
    }),
    willChange: 'transform, opacity',
    zIndex: 11,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: 'clamp(20px, 4vw, 60px)',
  };

  // ── Panel 3 — bottom full-width, "DO IT." ────────────────────────────────
  const p3inv = 1 - panel3P;
  const panel3Style: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '47%',
    background: 'linear-gradient(180deg, #0b0800 0%, #050508 100%)',
    borderTop: '2px solid rgba(255,85,0,0.35)',
    transform: `
      translate3d(0, ${p3inv * 80}vh, 0)
      rotateX(${p3inv * 22}deg)
      scale(${0.85 + panel3P * 0.15})
    `,
    opacity: panel3P,
    boxShadow: `inset 0 4px 80px rgba(255,85,0,0.10), 0 -8px 60px rgba(0,0,0,0.9)`,
    ...(splitP > 0 && {
      transform: `
        translate3d(0, ${splitP * 130}vh, 0)
        rotateX(${splitP * -15}deg)
        scale(${1 - splitP * 0.1})
      `,
    }),
    willChange: 'transform, opacity',
    zIndex: 12,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 'clamp(16px, 3vw, 48px) clamp(24px, 5vw, 80px)',
  };

  // ── About section opacity & transform ────────────────────────────────────
  const aboutOpacity = aboutP;

  // ── Stats list ────────────────────────────────────────────────────────────
  const stats = [
    { icon: Code2,      v: '25+', l: 'WEB PROJECTS' },
    { icon: Smartphone, v: '10+', l: 'MOBILE FRIENDLY' },
    { icon: Globe,      v: '15+', l: 'REAL WORLD SOLUTIONS' },
    { icon: Rocket,     v: '5+',  l: 'FULL STACK APPS' },
    { icon: Coffee,     v: '∞',   l: 'CUPS OF COFFEE' },
  ];

  return (
    <div
      ref={wrapperRef}
      id="do-it"
      className="relative w-full"
      style={{ height: '700vh' }}
    >
      {/* ═══════════════════════════════════════════════════
          STICKY CINEMATIC STAGE — stays fixed while user
          scrolls through the 700vh scroll space
      ═══════════════════════════════════════════════════ */}
      <div
        className="sticky top-0 w-full overflow-hidden bg-[#050508]"
        style={{ height: '100vh', perspective: '1800px', perspectiveOrigin: '50% 50%' }}
      >

        {/* ── Void background ─────────────────────────────────────────────── */}
        <div className="absolute inset-0 bg-[#050508]" />

        {/* ── Technical dot matrix ────────────────────────────────────────── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,85,0,0.05) 1px, transparent 1px)',
            backgroundSize: '34px 34px',
            opacity: 0.3,
          }}
        />

        {/* ── Volumetric orange ambient light ─────────────────────────────── */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 1 }}
        >
          <div
            style={{
              width: '800px',
              height: '800px',
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(255,85,0,${
                0.04 + panel3P * 0.20 - splitP * 0.05
              }) 0%, rgba(255,60,0,${panel3P * 0.06}) 40%, transparent 70%)`,
              filter: 'blur(60px)',
            }}
          />
        </div>

        {/* ── Orange horizontal light trails (appear on DO IT phase) ──────── */}
        {panel3P > 0.3 && (
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
            {[0.55, 0.54].map((pos, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: `${pos * 100}%`,
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: 'linear-gradient(to right, transparent 0%, rgba(255,85,0,0.2) 25%, rgba(255,85,0,0.55) 50%, rgba(255,85,0,0.2) 75%, transparent 100%)',
                  opacity: (panel3P - 0.3) / 0.7 * (1 - splitP * 1.2),
                  transform: `scaleX(${panel3P})`,
                }}
              />
            ))}
          </div>
        )}

        {/* ── Floating ember sparks ────────────────────────────────────────── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
          {[
            [8, 25], [82, 18], [55, 8], [92, 72], [12, 85], [65, 92], [38, 15],
          ].map(([x, y], i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${x}%`,
                top: `${y}%`,
                width: '3px',
                height: '3px',
                borderRadius: '50%',
                background: '#FF5500',
                boxShadow: '0 0 6px 3px rgba(255,85,0,0.4)',
                opacity: Math.min(panel1P, 0.5),
                filter: 'blur(0.5px)',
              }}
            />
          ))}
        </div>

        {/* ════════════════════════════════════════════════════════
            THE FOUR CINEMATIC PANELS
        ════════════════════════════════════════════════════════ */}

        {/* PANEL 1 — "I BUILD." ─────────────────────────────────────────── */}
        <div style={{ ...panel1Style, transformStyle: 'preserve-3d' }}>
          {/* Top-left orange corner accent */}
          <div style={{
            position: 'absolute', top: 0, left: 0,
            width: '48px', height: '48px',
            borderTop: '2px solid #FF5500',
            borderLeft: '2px solid #FF5500',
          }} />
          {/* Bottom-right micro accent */}
          <div style={{
            position: 'absolute', bottom: 0, right: 0,
            width: '24px', height: '24px',
            borderBottom: '1px solid rgba(255,85,0,0.4)',
            borderRight: '1px solid rgba(255,85,0,0.4)',
          }} />

          {/* Panel label */}
          <div style={{
            position: 'absolute', top: '16px', right: '20px',
            fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.25em',
            color: 'rgba(255,85,0,0.5)', textTransform: 'uppercase',
          }}>
            01 / IDENTITY
          </div>

          {/* "I BUILD." — massive outlined stroke */}
          <h2 style={{
            fontFamily: 'system-ui, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(52px, 10vw, 148px)',
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            WebkitTextStroke: '2px #FF5500',
            color: 'transparent',
            filter: 'drop-shadow(0 0 30px rgba(255,85,0,0.3))',
            userSelect: 'none',
          }}>
            I BUILD.
          </h2>

          {/* Sub keywords */}
          <div style={{
            position: 'absolute', right: '24px', bottom: '24px',
            display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
            gap: '4px',
          }}>
            {['WEBSITES', 'DESIGN', 'CODE', 'IDEAS'].map((kw) => (
              <span key={kw} style={{
                fontFamily: 'monospace', fontSize: '9px',
                letterSpacing: '0.2em', color: 'rgba(200,200,210,0.5)',
                fontWeight: 700,
              }}>
                • {kw}
              </span>
            ))}
          </div>
        </div>

        {/* PANEL 2 — "NEVER TRY LATER." ───────────────────────────────────── */}
        <div style={{ ...panel2Style, transformStyle: 'preserve-3d' }}>
          {/* Top-right corner accent */}
          <div style={{
            position: 'absolute', top: 0, right: 0,
            width: '48px', height: '48px',
            borderTop: '2px solid rgba(255,85,0,0.5)',
            borderRight: '2px solid rgba(255,85,0,0.5)',
          }} />

          {/* Panel label */}
          <div style={{
            position: 'absolute', bottom: '16px', left: '20px',
            fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.25em',
            color: 'rgba(255,85,0,0.4)', textTransform: 'uppercase',
          }}>
            02 / MINDSET
          </div>

          {/* "NEVER TRY LATER." — large white bold */}
          <div style={{ textAlign: 'right' }}>
            <h2 style={{
              fontFamily: 'system-ui, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(28px, 4.5vw, 72px)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              textShadow: '0 0 40px rgba(255,255,255,0.08)',
              userSelect: 'none',
            }}>
              NEVER<br />TRY<br />LATER.
            </h2>
          </div>

          {/* Thin orange line */}
          <div style={{
            position: 'absolute', left: 0, top: '50%',
            width: '2px', height: '40%',
            background: 'linear-gradient(to bottom, rgba(255,85,0,0.5), transparent)',
          }} />
        </div>

        {/* PANEL 3 — "DO IT." ─────────────────────────────────────────────── */}
        <div style={{ ...panel3Style, transformStyle: 'preserve-3d' }}>
          {/* Left corner accent */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0,
            width: '48px', height: '48px',
            borderBottom: '2px solid rgba(255,85,0,0.6)',
            borderLeft: '2px solid rgba(255,85,0,0.6)',
          }} />
          {/* Right corner accent */}
          <div style={{
            position: 'absolute', bottom: 0, right: 0,
            width: '48px', height: '48px',
            borderBottom: '2px solid rgba(255,85,0,0.6)',
            borderRight: '2px solid rgba(255,85,0,0.6)',
          }} />

          {/* Panel label */}
          <div style={{
            position: 'absolute', top: '14px', right: '24px',
            fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.25em',
            color: 'rgba(255,85,0,0.6)', textTransform: 'uppercase',
          }}>
            03 / ACTION
          </div>

          {/* "DO IT." — massive orange fill */}
          <h2 style={{
            fontFamily: 'system-ui, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(64px, 16vw, 220px)',
            lineHeight: 0.85,
            letterSpacing: '-0.04em',
            color: '#FF5500',
            filter: `drop-shadow(0 0 ${panel3P * 80}px rgba(255,85,0,0.8))`,
            userSelect: 'none',
          }}>
            DO IT.
          </h2>

          {/* Right-side sub-text */}
          <div style={{
            position: 'absolute', right: '24px', bottom: '20px',
            textAlign: 'right',
          }}>
            <p style={{
              fontFamily: 'monospace', fontSize: '10px',
              color: 'rgba(200,200,210,0.4)', letterSpacing: '0.18em',
              lineHeight: 1.6,
            }}>
              START NOW.<br />NOT TOMORROW.
            </p>
          </div>
        </div>

        {/* ── "EVERYTHING HAPPENS FOR A REASON." ──────────────────────────── */}
        {/* Appears as overlay on the assembled scene, then fades with splitP */}
        <div
          style={{
            position: 'absolute',
            top: '55%',
            left: 0,
            right: 0,
            zIndex: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 clamp(24px, 5vw, 80px)',
            opacity: Math.max(0, reasonP - splitP * 2),
            transform: `translate3d(0, ${(1 - reasonP) * 40}px, 0)`,
            willChange: 'transform, opacity',
            pointerEvents: 'none',
          }}
        >
          {/* Thin orange rule above */}
          <div style={{
            width: '60px', height: '2px',
            background: 'linear-gradient(to right, transparent, #FF5500, transparent)',
            marginBottom: '16px',
          }} />

          <h3 style={{
            fontFamily: 'system-ui, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(22px, 4vw, 64px)',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            textAlign: 'center',
            color: '#ffffff',
            userSelect: 'none',
          }}>
            EVERYTHING{' '}
            <span style={{
              WebkitTextStroke: '1.5px rgba(255,85,0,0.75)',
              color: 'transparent',
            }}>
              HAPPENS
            </span>
            <br />
            FOR A{' '}
            <span style={{ color: '#FF5500' }}>REASON.</span>
          </h3>

          <p style={{
            fontFamily: 'monospace',
            fontSize: 'clamp(9px, 1.2vw, 13px)',
            letterSpacing: '0.2em',
            color: 'rgba(160,160,180,0.6)',
            marginTop: '12px',
            textAlign: 'center',
            opacity: Math.max(0, (reasonP - 0.4) / 0.6),
          }}>
            EVERY LINE OF CODE. EVERY PROJECT. EVERY FAILURE. EVERY WIN.
          </p>
        </div>

        {/* ════════════════════════════════════════════════════════
            ABOUT EXPERIENCE — rises through the panel split gap
        ════════════════════════════════════════════════════════ */}
        <div
          id="about"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 25,
            opacity: aboutOpacity,
            transform: `translate3d(0, ${(1 - aboutP) * 50}px, 0)`,
            willChange: 'transform, opacity',
            background: '#050508',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Background dot grid */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(255,85,0,0.055) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            opacity: 0.28,
            pointerEvents: 'none',
          }} />

          {/* Code watermark */}
          <div style={{
            position: 'absolute', top: '56px', right: '24px',
            fontFamily: 'monospace', fontSize: '10px',
            color: 'rgba(80,80,100,0.35)',
            lineHeight: 1.7, userSelect: 'none', pointerEvents: 'none',
          }} className="hidden xl:block">
            <p>{`const shiyam = { role: "Creative Developer", city: "Chennai" };`}</p>
            <p>{`const belief = "ALWAYS BE HAPPY. ALWAYS SMILE.";`}</p>
            <p>{`shiyam.build({ passion: Infinity, coffee: true });`}</p>
          </div>

          {/* Volumetric orange spotlight — behind portrait, not on face */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '55%',
            transform: 'translate(-30%, -50%)',
            width: '700px', height: '700px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,85,0,0.18) 0%, rgba(255,85,0,0.05) 45%, transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
            zIndex: 0,
          }} />

          {/* Orbital HUD rings — behind portrait */}
          <div style={{
            position: 'absolute', top: '50%', right: '25%',
            transform: 'translateY(-50%)',
            width: '520px', height: '520px',
            borderRadius: '50%', border: '1px solid rgba(255,85,0,0.15)',
            animation: 'spin 50s linear infinite',
            pointerEvents: 'none', zIndex: 0,
          }} />
          <div style={{
            position: 'absolute', top: '50%', right: '25%',
            transform: 'translateY(-50%)',
            width: '400px', height: '400px',
            borderRadius: '50%', border: '1px solid rgba(255,255,255,0.07)',
            animation: 'spin 35s linear infinite reverse',
            pointerEvents: 'none', zIndex: 0,
          }} />

          {/* Section label */}
          <div style={{
            position: 'absolute', top: '24px', left: '32px',
            display: 'flex', alignItems: 'center', gap: '8px',
            fontFamily: 'monospace', fontSize: '10px',
            color: 'rgba(120,120,140,0.7)', letterSpacing: '0.2em',
            textTransform: 'uppercase', pointerEvents: 'none', zIndex: 30,
          }}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#FF5500', boxShadow: '0 0 8px #FF5500',
            }} />
            03 ABOUT
          </div>

          {/* Left nav indicator */}
          <div style={{
            position: 'absolute', top: '50%', left: '20px',
            transform: 'translateY(-50%)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '16px', zIndex: 30,
            pointerEvents: 'none',
          }} className="hidden xl:flex">
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#FF5500', boxShadow: '0 0 10px #FF5500',
            }} />
            <span style={{
              fontFamily: 'monospace', fontSize: '9px',
              color: 'rgba(120,120,140,0.6)', letterSpacing: '0.25em',
              textTransform: 'uppercase', fontWeight: 600,
              writingMode: 'vertical-rl', transform: 'rotate(180deg)',
            }}>
              WHO IS SHIYAM S
            </span>
          </div>

          {/* ── MAIN COMPOSITION ─────────────────────────────────────────── */}
          <div style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            position: 'relative', zIndex: 10,
          }}>

            {/* LEFT: Identity Typography Column */}
            <div style={{
              display: 'flex', flexDirection: 'column',
              justifyContent: 'center',
              padding: 'clamp(60px, 8vh, 100px) clamp(24px, 4vw, 64px) clamp(24px, 4vh, 60px) clamp(40px, 6vw, 80px)',
              gap: '20px',
            }}>

              {/* WHO IS / SHIYAM S */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{
                  fontFamily: 'monospace', fontSize: '11px',
                  letterSpacing: '0.3em', color: 'rgba(180,180,200,0.7)',
                  textTransform: 'uppercase', fontWeight: 600,
                }}>WHO IS</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <h2 style={{
                    fontFamily: 'system-ui, sans-serif', fontWeight: 900,
                    fontSize: 'clamp(22px, 3vw, 40px)',
                    letterSpacing: '0.1em', color: '#FF5500',
                    lineHeight: 1,
                  }}>SHIYAM S</h2>
                  <div style={{
                    height: '2px', width: '48px',
                    background: '#FF5500',
                    boxShadow: '0 0 8px #FF5500',
                  }} />
                </div>
              </div>

              {/* Identity labels */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { t: 'WEB DEVELOPER',    active: true },
                  { t: 'WEB DESIGNER',     active: true },
                  { t: 'CREATIVE THINKER', active: false },
                  { t: 'PROBLEM SOLVER',   active: false },
                  { t: 'LIFELONG LEARNER', active: false },
                ].map((item) => (
                  <div key={item.t} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: item.active ? '#FF5500' : 'rgba(100,100,120,0.5)',
                      boxShadow: item.active ? '0 0 6px #FF5500' : 'none',
                      flexShrink: 0,
                    }} />
                    <span style={{
                      fontFamily: 'monospace', fontSize: '10px',
                      letterSpacing: '0.2em', fontWeight: 700,
                      textTransform: 'uppercase',
                      color: item.active ? '#ffffff' : 'rgba(100,100,120,0.7)',
                    }}>{item.t}</span>
                  </div>
                ))}
              </div>

              {/* Philosophy */}
              <div style={{
                borderLeft: '2px solid rgba(255,85,0,0.35)',
                paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px',
              }}>
                <p style={{
                  fontFamily: 'monospace', fontSize: '11px',
                  color: 'rgba(160,160,180,0.8)', lineHeight: 1.7,
                }}>
                  I don't believe in waiting for<br />
                  the perfect time. I believe in{' '}
                  <span style={{ color: '#FF5500', fontWeight: 700 }}>creating</span> it.
                </p>
                <p style={{
                  fontFamily: 'monospace', fontSize: '10px',
                  color: 'rgba(120,120,140,0.6)', lineHeight: 1.7, marginTop: '4px',
                }}>
                  I learn. I explore. I build.<br />
                  Every project is a{' '}
                  <span style={{ color: '#FF5500', fontWeight: 700 }}>step forward</span>.
                </p>
              </div>

              {/* Built many projects tag */}
              <div>
                <p style={{
                  fontFamily: 'monospace', fontSize: '11px',
                  color: '#FF5500', fontWeight: 700, letterSpacing: '0.15em',
                }}>
                  &gt; I'VE BUILT MANY PROJECTS
                </p>
                <p style={{
                  fontFamily: 'monospace', fontSize: '9px',
                  color: 'rgba(120,120,140,0.6)', letterSpacing: '0.2em',
                  textTransform: 'uppercase', marginTop: '2px',
                }}>
                  EACH ONE TAUGHT ME SOMETHING NEW
                </p>
              </div>

            </div>

            {/* RIGHT: Portrait centerpiece + floating callouts */}
            <div style={{ position: 'relative', overflow: 'hidden' }}>

              {/* Mindset callout — top right, floating (NO CARD) */}
              <div style={{
                position: 'absolute', top: '12px', right: '16px',
                zIndex: 30, textAlign: 'right',
                display: 'flex', flexDirection: 'column',
                alignItems: 'flex-end', gap: '4px',
                pointerEvents: 'none',
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  justifyContent: 'flex-end',
                  fontFamily: 'monospace', fontSize: '9px',
                  color: '#FF5500', letterSpacing: '0.22em',
                  fontWeight: 700, textTransform: 'uppercase',
                }}>
                  <span style={{
                    width: '5px', height: '5px', borderRadius: '50%',
                    background: '#FF5500', animation: 'ping 2s infinite',
                  }} />
                  /// MY MINDSET ///
                </div>
                <h3 style={{
                  fontFamily: 'system-ui, sans-serif', fontWeight: 900,
                  fontSize: 'clamp(20px, 2.8vw, 38px)', lineHeight: 1.0,
                  letterSpacing: '-0.01em', color: '#ffffff',
                  textShadow: '0 2px 20px rgba(0,0,0,0.95)',
                }}>
                  ALWAYS<br />BE HAPPY.
                </h3>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px' }}>
                  <h3 style={{
                    fontFamily: 'system-ui, sans-serif', fontWeight: 900,
                    fontSize: 'clamp(20px, 2.8vw, 38px)', lineHeight: 1.0,
                    letterSpacing: '-0.01em',
                    background: 'linear-gradient(to right, #FF5500, #FF7700, #FFA000)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  }}>
                    ALWAYS<br />SMILE.
                  </h3>
                  <Smile style={{
                    width: '22px', height: '22px',
                    color: '#FF5500', flexShrink: 0, marginBottom: '4px',
                  }} />
                </div>
                <div style={{
                  width: '80px', height: '3px', marginTop: '4px',
                  background: 'linear-gradient(to left, #FF5500, rgba(255,85,0,0.3), transparent)',
                  borderRadius: '4px', boxShadow: '0 0 10px #FF5500',
                }} />
              </div>

              {/* Portrait — pristine, 100% natural, no face overlay */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: `translateX(-50%) translate3d(${normalizedX * -10}px, ${normalizedY * 8}px, 0)`,
                  height: '90%',
                  display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                  zIndex: 20,
                  transition: 'transform 0.1s linear',
                }}
              >
                <img
                  src={aboutPortraitImg}
                  alt="SHIYAM S"
                  style={{
                    height: '100%',
                    width: 'auto',
                    objectFit: 'contain',
                    objectPosition: 'bottom',
                    filter: 'contrast(1.05)',
                  }}
                  loading="eager"
                />
                {/* Floor blend */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px',
                  background: 'linear-gradient(to top, #050508 0%, rgba(5,5,8,0.7) 50%, transparent 100%)',
                  zIndex: 30, pointerEvents: 'none',
                }} />
              </div>

              {/* Signature callout — bottom right, floating (NO CARD) */}
              <div style={{
                position: 'absolute', bottom: '100px', right: '16px',
                zIndex: 30, textAlign: 'right',
                display: 'flex', flexDirection: 'column',
                alignItems: 'flex-end', gap: '2px',
                pointerEvents: 'none',
              }}>
                <span style={{
                  fontFamily: 'monospace', fontSize: '9px',
                  color: 'rgba(160,160,180,0.6)', letterSpacing: '0.2em',
                  fontWeight: 600, textTransform: 'uppercase',
                }}>
                  CREATIVE <span style={{ color: '#FF5500' }}>DEVELOPER</span>
                </span>
                <div style={{
                  fontFamily: 'Georgia, serif', fontStyle: 'italic',
                  fontSize: 'clamp(28px, 3.5vw, 48px)',
                  color: '#ffffff', fontWeight: 400, lineHeight: 1,
                  letterSpacing: '0.02em',
                }}>
                  Shiyam <span style={{ color: '#FF5500' }}>S.</span>
                </div>
                <span style={{
                  fontFamily: 'monospace', fontSize: '9px',
                  color: 'rgba(160,160,180,0.5)', letterSpacing: '0.2em',
                  fontWeight: 700, textTransform: 'uppercase',
                }}>
                  WEB DEVELOPER • WEB DESIGNER
                </span>
              </div>

            </div>
          </div>

          {/* ── STATS DASHBOARD STRIP ───────────────────────────────────── */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.07)',
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            position: 'relative', zIndex: 10,
          }}>
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: 'clamp(12px, 2vh, 20px) clamp(16px, 2vw, 28px)',
                    borderRight: i < 4 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,85,0,0.07)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <div style={{
                    padding: '8px', borderRadius: '8px',
                    background: 'rgba(255,85,0,0.1)', color: '#FF5500',
                    flexShrink: 0,
                  }}>
                    <Icon size={14} />
                  </div>
                  <div>
                    <div style={{
                      fontFamily: 'system-ui, sans-serif', fontWeight: 900,
                      fontSize: 'clamp(16px, 2vw, 24px)', color: '#FF5500',
                      lineHeight: 1,
                    }}>{s.v}</div>
                    <div style={{
                      fontFamily: 'monospace', fontSize: '7px',
                      color: 'rgba(130,130,150,0.7)', letterSpacing: '0.15em',
                      textTransform: 'uppercase', marginTop: '2px', lineHeight: 1.3,
                    }}>{s.l}</div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
        {/* ── End of About ─────────────────────────────────────────────────── */}

        {/* Top/Bottom blend vignettes */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '64px',
          background: 'linear-gradient(to bottom, #050508, transparent)',
          pointerEvents: 'none', zIndex: 40,
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '64px',
          background: 'linear-gradient(to top, #050508, transparent)',
          pointerEvents: 'none', zIndex: 40,
        }} />

        {/* Scroll phase HUD */}
        <div style={{
          position: 'absolute', bottom: '20px', left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'monospace', fontSize: '9px',
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'rgba(120,120,140,0.5)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '6px',
          pointerEvents: 'none', zIndex: 50,
          opacity: aboutP > 0.5 ? 0 : 1,
          transition: 'opacity 0.3s',
        }}>
          <div style={{
            width: '120px', height: '1px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '2px', overflow: 'hidden',
          }}>
            <div style={{
              height: '100%', background: '#FF5500',
              borderRadius: '2px',
              width: `${p * 100}%`,
            }} />
          </div>
          <span>
            {p < 0.28 ? 'I BUILD...' :
             p < 0.42 ? 'NEVER TRY LATER...' :
             p < 0.56 ? 'DO IT...' :
             p < 0.70 ? 'EVERYTHING HAPPENS FOR A REASON...' :
             p < 0.82 ? 'HOLD.' :
             p < 0.93 ? 'TRANSFORMING...' : 'ABOUT.'}
          </span>
        </div>

      </div>
    </div>
  );
};

export default SceneDoItAndAbout;
