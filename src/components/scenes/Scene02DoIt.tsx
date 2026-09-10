import React, { useEffect, useRef, useState } from 'react';

interface Props {
  onNavigate: (id: string) => void;
}

/**
 * Scene02DoIt — Cinematic 4-Panel DO IT Experience
 *
 * 350vh sticky scroll-driven section.
 * Four large physical panels enter from different directions and
 * assemble to reveal the DO IT chapter, ending with:
 * "EVERYTHING HAPPENS FOR A REASON."
 *
 * At scroll progress = 1.0, all panels are FULLY ASSEMBLED and VISIBLE.
 * No exit animation here — section exits naturally as user scrolls to next.
 *
 * Scroll phases:
 *   0.00–0.08  Void opens
 *   0.06–0.30  Panel 1 (top-left, "I BUILD.") enters from upper-left
 *   0.24–0.48  Panel 2 (top-right, "NEVER TRY LATER.") enters from upper-right
 *   0.42–0.65  Panel 3 (bottom, "DO IT.") rises from below
 *   0.63–0.85  "EVERYTHING HAPPENS FOR A REASON." emerges
 *   0.85–1.00  Full assembly held, scene complete
 */
export const Scene02DoIt: React.FC<Props> = () => {
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

  // Easing
  const easeOut = (t: number, exp = 3) => 1 - Math.pow(1 - Math.max(0, Math.min(1, t)), exp);
  const phase = (s: number, e: number) =>
    easeOut((p - s) / (e - s));

  const p1 = phase(0.06, 0.30); // Panel 1: I BUILD.
  const p2 = phase(0.24, 0.48); // Panel 2: NEVER TRY LATER.
  const p3 = phase(0.42, 0.65); // Panel 3: DO IT.
  const pr = phase(0.63, 0.85); // EVERYTHING HAPPENS FOR A REASON.

  // Panel 1 — "I BUILD." — enters from upper-left with 3D rotation
  const panel1: React.CSSProperties = {
    position: 'absolute',
    top: 0, left: 0,
    width: '58%', height: '54%',
    background: 'linear-gradient(135deg, #0a0a0e 0%, #0f0c11 60%, #0c0900 100%)',
    borderRight: '1px solid rgba(255,85,0,0.18)',
    borderBottom: '1px solid rgba(255,85,0,0.10)',
    boxShadow: '6px 6px 50px rgba(0,0,0,0.8), inset -2px -2px 40px rgba(255,85,0,0.04)',
    transform: `translate3d(${(1-p1)*-62}vw, ${(1-p1)*-50}vh, 0) rotateY(${(1-p1)*30}deg) rotateX(${(1-p1)*-15}deg) scale(${0.65+p1*0.35})`,
    opacity: p1,
    willChange: 'transform, opacity',
    zIndex: 10,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    padding: 'clamp(20px,4vw,56px)',
    transformStyle: 'preserve-3d' as const,
  };

  // Panel 2 — "NEVER TRY LATER." — enters from upper-right
  const panel2: React.CSSProperties = {
    position: 'absolute',
    top: 0, right: 0,
    width: '44%', height: '54%',
    background: 'linear-gradient(225deg, #0c0c14 0%, #09090f 50%, #0e0a06 100%)',
    borderLeft: '1px solid rgba(255,85,0,0.14)',
    borderBottom: '1px solid rgba(255,85,0,0.10)',
    boxShadow: '-6px 6px 50px rgba(0,0,0,0.8), inset 2px -2px 40px rgba(255,85,0,0.03)',
    transform: `translate3d(${(1-p2)*65}vw, ${(1-p2)*-45}vh, 0) rotateY(${(1-p2)*-32}deg) rotateX(${(1-p2)*-10}deg) scale(${0.65+p2*0.35})`,
    opacity: p2,
    willChange: 'transform, opacity',
    zIndex: 11,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: 'clamp(20px,4vw,56px)',
    transformStyle: 'preserve-3d' as const,
  };

  // Panel 3 — "DO IT." — rises from below, full width
  const panel3: React.CSSProperties = {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    height: '48%',
    background: 'linear-gradient(0deg, #050508 0%, #0c0900 100%)',
    borderTop: `2px solid rgba(255,85,0,${0.2 + p3 * 0.4})`,
    boxShadow: `0 -8px 80px rgba(255,85,0,${p3 * 0.18}), inset 0 6px 60px rgba(255,85,0,${p3 * 0.10})`,
    transform: `translate3d(0, ${(1-p3)*85}vh, 0) rotateX(${(1-p3)*22}deg) scale(${0.8+p3*0.2})`,
    opacity: p3,
    willChange: 'transform, opacity',
    zIndex: 12,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0 clamp(24px,5vw,80px)',
    transformStyle: 'preserve-3d' as const,
  };

  // Spark embers
  const embers = [
    [8,25],[82,18],[55,8],[92,72],[12,85],[65,92],[38,15],[78,55],[22,42]
  ];

  return (
    <div
      ref={wrapperRef}
      id="do-it"
      style={{ height: '350vh', position: 'relative', width: '100%' }}
    >
      {/* Sticky cinematic stage */}
      <div
        style={{
          position: 'sticky', top: 0, width: '100%', height: '100vh',
          overflow: 'hidden', background: '#050508',
          perspective: '1800px', perspectiveOrigin: '50% 50%',
        }}
      >
        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(255,85,0,0.05) 1px, transparent 1px)',
          backgroundSize: '34px 34px', opacity: 0.28,
        }} />

        {/* Volumetric orange ambient — grows with Panel 3 */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none', zIndex: 1,
        }}>
          <div style={{
            width: '800px', height: '800px', borderRadius: '50%',
            background: `radial-gradient(circle, rgba(255,85,0,${0.03 + p3*0.22}) 0%, rgba(255,60,0,${p3*0.06}) 40%, transparent 70%)`,
            filter: 'blur(70px)',
          }} />
        </div>

        {/* Horizontal light trails (Panel 3 phase) */}
        {p3 > 0.25 && (
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }}>
            {[0.53, 0.55].map((pos, i) => (
              <div key={i} style={{
                position: 'absolute', top: `${pos*100}%`, left: 0, right: 0, height: '1px',
                background: 'linear-gradient(to right, transparent 0%, rgba(255,85,0,0.18) 25%, rgba(255,85,0,0.5) 50%, rgba(255,85,0,0.18) 75%, transparent 100%)',
                opacity: Math.min(1, (p3-0.25)/0.75),
                transform: `scaleX(${p3})`,
              }} />
            ))}
          </div>
        )}

        {/* Ember sparks */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 2 }}>
          {embers.map(([x, y], i) => (
            <div key={i} style={{
              position: 'absolute', left: `${x}%`, top: `${y}%`,
              width: '3px', height: '3px', borderRadius: '50%',
              background: '#FF5500', boxShadow: '0 0 6px 3px rgba(255,85,0,0.4)',
              opacity: Math.min(p1, 0.5), filter: 'blur(0.5px)',
            }} />
          ))}
        </div>

        {/* Section label */}
        <div style={{
          position: 'absolute', top: '24px', left: '32px', zIndex: 40,
          display: 'flex', alignItems: 'center', gap: '8px',
          fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.2em',
          color: 'rgba(120,120,140,0.65)', textTransform: 'uppercase',
          pointerEvents: 'none',
        }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#FF5500', boxShadow: '0 0 8px #FF5500',
          }} />
          02 DO IT
        </div>

        {/* ── PANEL 1: I BUILD. ─────────────────────────────────────────── */}
        <div style={panel1}>
          {/* Corner accents */}
          <div style={{ position:'absolute', top:0, left:0, width:'40px', height:'40px', borderTop:'2px solid #FF5500', borderLeft:'2px solid #FF5500' }} />
          <div style={{ position:'absolute', bottom:0, right:0, width:'20px', height:'20px', borderBottom:'1px solid rgba(255,85,0,0.35)', borderRight:'1px solid rgba(255,85,0,0.35)' }} />
          <div style={{
            position:'absolute', top:'14px', right:'18px',
            fontFamily:'monospace', fontSize:'9px', letterSpacing:'0.22em',
            color:'rgba(255,85,0,0.45)', textTransform:'uppercase',
          }}>01 / IDENTITY</div>

          {/* "I BUILD." */}
          <h2 style={{
            fontFamily: 'system-ui, sans-serif', fontWeight: 900,
            fontSize: 'clamp(48px,10vw,150px)', lineHeight: 0.9,
            letterSpacing: '-0.03em',
            WebkitTextStroke: '2px #FF5500',
            color: 'transparent',
            filter: `drop-shadow(0 0 ${p1*28}px rgba(255,85,0,0.35))`,
            userSelect: 'none',
          }}>I BUILD.</h2>

          {/* Keywords */}
          <div style={{
            position:'absolute', right:'20px', bottom:'20px',
            display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'3px',
          }}>
            {['WEBSITES','DESIGN','CODE','IDEAS'].map(kw => (
              <span key={kw} style={{ fontFamily:'monospace', fontSize:'9px', letterSpacing:'0.18em', color:'rgba(180,180,200,0.4)', fontWeight:700 }}>• {kw}</span>
            ))}
          </div>
        </div>

        {/* ── PANEL 2: NEVER TRY LATER. ──────────────────────────────────── */}
        <div style={panel2}>
          <div style={{ position:'absolute', top:0, right:0, width:'40px', height:'40px', borderTop:'2px solid rgba(255,85,0,0.5)', borderRight:'2px solid rgba(255,85,0,0.5)' }} />
          <div style={{ position:'absolute', bottom:'14px', left:'18px', fontFamily:'monospace', fontSize:'9px', letterSpacing:'0.22em', color:'rgba(255,85,0,0.4)', textTransform:'uppercase' }}>02 / MINDSET</div>
          {/* Left accent line */}
          <div style={{ position:'absolute', left:0, top:'20%', width:'2px', height:'50%', background:'linear-gradient(to bottom, rgba(255,85,0,0.5), transparent)' }} />

          <h2 style={{
            fontFamily:'system-ui, sans-serif', fontWeight:900,
            fontSize:'clamp(24px,4.2vw,68px)', lineHeight:1.0,
            letterSpacing:'-0.02em', color:'#ffffff',
            textShadow:'0 0 40px rgba(255,255,255,0.06)',
            userSelect:'none', textAlign:'right',
          }}>NEVER<br/>TRY<br/>LATER.</h2>
        </div>

        {/* ── PANEL 3: DO IT. ──────────────────────────────────────────────── */}
        <div style={panel3}>
          <div style={{ position:'absolute', bottom:0, left:0, width:'40px', height:'40px', borderBottom:'2px solid rgba(255,85,0,0.6)', borderLeft:'2px solid rgba(255,85,0,0.6)' }} />
          <div style={{ position:'absolute', bottom:0, right:0, width:'40px', height:'40px', borderBottom:'2px solid rgba(255,85,0,0.6)', borderRight:'2px solid rgba(255,85,0,0.6)' }} />
          <div style={{ position:'absolute', top:'12px', right:'22px', fontFamily:'monospace', fontSize:'9px', letterSpacing:'0.22em', color:'rgba(255,85,0,0.55)', textTransform:'uppercase' }}>03 / ACTION</div>

          <h2 style={{
            fontFamily:'system-ui, sans-serif', fontWeight:900,
            fontSize:'clamp(60px,16vw,220px)', lineHeight:0.85,
            letterSpacing:'-0.04em', color:'#FF5500',
            filter:`drop-shadow(0 0 ${p3*80}px rgba(255,85,0,0.85))`,
            userSelect:'none',
          }}>DO IT.</h2>

          <div style={{ position:'absolute', right:'22px', bottom:'16px', textAlign:'right' }}>
            <p style={{ fontFamily:'monospace', fontSize:'10px', color:'rgba(180,180,200,0.35)', letterSpacing:'0.16em', lineHeight:1.6 }}>
              START NOW.<br/>NOT TOMORROW.
            </p>
          </div>
        </div>

        {/* ── "EVERYTHING HAPPENS FOR A REASON." ────────────────────────── */}
        <div style={{
          position:'absolute', top:'53%', left:0, right:0, zIndex:20,
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
          padding:'0 clamp(24px,5vw,80px)',
          opacity: Math.max(0, pr),
          transform:`translate3d(0, ${(1-pr)*36}px, 0)`,
          willChange:'transform, opacity',
          pointerEvents:'none',
        }}>
          <div style={{ width:'56px', height:'2px', background:'linear-gradient(to right, transparent, #FF5500, transparent)', marginBottom:'14px' }} />
          <h3 style={{
            fontFamily:'system-ui, sans-serif', fontWeight:900,
            fontSize:'clamp(20px,3.8vw,60px)', letterSpacing:'-0.02em',
            lineHeight:1.05, textAlign:'center', color:'#ffffff', userSelect:'none',
          }}>
            EVERYTHING{' '}
            <span style={{ WebkitTextStroke:'1.5px rgba(255,85,0,0.75)', color:'transparent' }}>HAPPENS</span>
            <br/>FOR A{' '}
            <span style={{ color:'#FF5500' }}>REASON.</span>
          </h3>
          <p style={{
            fontFamily:'monospace', fontSize:'clamp(9px,1.1vw,12px)',
            letterSpacing:'0.2em', color:'rgba(150,150,170,0.55)',
            marginTop:'12px', textAlign:'center',
            opacity: Math.max(0, (pr-0.35)/0.65),
          }}>
            EVERY LINE OF CODE. EVERY PROJECT. EVERY FAILURE. EVERY WIN.
          </p>
        </div>

        {/* Scroll phase HUD */}
        <div style={{
          position:'absolute', bottom:'20px', left:'50%',
          transform:'translateX(-50%)',
          fontFamily:'monospace', fontSize:'9px',
          letterSpacing:'0.22em', textTransform:'uppercase',
          color:'rgba(100,100,120,0.55)',
          display:'flex', flexDirection:'column', alignItems:'center', gap:'5px',
          pointerEvents:'none', zIndex:50,
        }}>
          <div style={{ width:'100px', height:'1px', background:'rgba(255,255,255,0.08)', borderRadius:'2px', overflow:'hidden' }}>
            <div style={{ height:'100%', background:'#FF5500', width:`${p*100}%` }} />
          </div>
          <span>
            {p<0.30?'I BUILD...': p<0.48?'NEVER TRY LATER...': p<0.65?'DO IT...': p<0.85?'EVERYTHING HAPPENS...': 'COMPLETE.'}
          </span>
        </div>

        {/* Top/bottom vignette */}
        <div style={{ position:'absolute', top:0, left:0, right:0, height:'56px', background:'linear-gradient(to bottom, #050508, transparent)', pointerEvents:'none', zIndex:40 }} />
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'56px', background:'linear-gradient(to top, #050508, transparent)', pointerEvents:'none', zIndex:40 }} />
      </div>
    </div>
  );
};

export default Scene02DoIt;
