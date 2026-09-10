import React, { useEffect, useRef, useState } from 'react';

interface CubeTransitionProps {
  onComplete?: () => void;
}

/**
 * SceneCubeTransition
 *
 * A real CSS 3D cube that scroll-drives the ID CARD → ABOUT transition.
 *
 * Scroll timeline:
 *   0.00–0.15  — ID Card exits normally
 *   0.15–0.40  — Black void opens; cube EMERGES from depth (scale 0 → 1, tz -2000 → 0)
 *   0.40–0.65  — Cube ROTATES dramatically (X + Y axes), showing multiple faces
 *   0.65–0.85  — Cube SPLITS open — 6 faces fly apart to form portal
 *   0.85–1.00  — About content fades through the portal; cube dissolves
 */
export const SceneCubeTransition: React.FC<CubeTransitionProps> = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const winH = window.innerHeight;
      // progress: 0 = top of wrapper at bottom of viewport → 1 = bottom of wrapper at top of viewport
      const raw = (winH - rect.top) / (winH + rect.height);
      setProgress(Math.max(0, Math.min(1, raw)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ─── Phase helpers ──────────────────────────────────────────────────────────
  const phaseProgress = (start: number, end: number) =>
    Math.max(0, Math.min(1, (progress - start) / (end - start)));

  const ease = (t: number, power = 3) => 1 - Math.pow(1 - t, power);
  const easeIn = (t: number, power = 2) => Math.pow(t, power);

  // Phase 1: Cube emerges from the void  (0.10 → 0.40)
  const emergeP = ease(phaseProgress(0.10, 0.40));

  // Phase 2: Cube rotates dramatically   (0.35 → 0.65)
  const rotateP = ease(phaseProgress(0.35, 0.65));

  // Phase 3: Cube splits open            (0.60 → 0.82)
  const splitP = ease(phaseProgress(0.60, 0.82));

  // Phase 4: Content reveal / dissolve   (0.80 → 1.00)
  const dissolveP = ease(phaseProgress(0.80, 1.00));

  // Background void darkness
  const voidOpacity = ease(phaseProgress(0.05, 0.30));

  // ─── Cube geometry ───────────────────────────────────────────────────────────
  const HALF = 220; // half-size of cube in px (cube is 440px × 440px)

  // Overall cube rotation in degrees
  const cubeRotX = rotateP * 55;   // tilt forward
  const cubeRotY = rotateP * 220;  // spin around Y

  // Emerge: start from far back (tz = -2400) and zoom in; scale 0.3 → 1
  const emergeZ = -2400 + emergeP * 2400;
  const cubeScale = 0.3 + emergeP * 0.7;

  // Opacity of the whole cube
  const cubeOpacity = emergeP < 0.05 ? 0 : Math.max(0, 1 - dissolveP * 1.5);

  // ─── Face split offsets (phase 3) ────────────────────────────────────────────
  const SPLIT = splitP * 420;
  const faceData = [
    // [translateX, translateY, translateZ, rotateX, rotateY, rotateZ, label]
    { tx: 0,      ty: -SPLIT, tz: HALF,   rx: 0,   ry: 0,   rz: 0,   label: 'I BUILD.' },          // front
    { tx: 0,      ty:  SPLIT, tz: -HALF,  rx: 180, ry: 0,   rz: 0,   label: 'DO IT.' },             // back
    { tx: SPLIT,  ty: 0,      tz: 0,      rx: 0,   ry: 90,  rz: 0,   label: 'ALWAYS\nBE HAPPY.' }, // right
    { tx: -SPLIT, ty: 0,      tz: 0,      rx: 0,   ry: -90, rz: 0,   label: 'ALWAYS\nSMILE.' },    // left
    { tx: 0,      ty: 0,      tz: SPLIT,  rx: -90, ry: 0,   rz: 0,   label: 'WHO IS\nSHIYAM S' }, // top
    { tx: 0,      ty: 0,      tz: -SPLIT, rx: 90,  ry: 0,   rz: 0,   label: 'NEVER TRY\nLATER.' }, // bottom
  ];

  // Orange particle flare positions (deterministic)
  const sparks = [
    { x: 12, y: 22, delay: 0 }, { x: 80, y: 15, delay: 0.3 },
    { x: 55, y: 78, delay: 0.6 }, { x: 25, y: 65, delay: 0.1 },
    { x: 90, y: 50, delay: 0.8 }, { x: 40, y: 10, delay: 0.5 },
    { x: 70, y: 88, delay: 0.2 }, { x: 5,  y: 45, delay: 0.7 },
    { x: 60, y: 35, delay: 0.4 }, { x: 32, y: 90, delay: 0.9 },
  ];

  const isActive = progress > 0.05 && progress < 0.99;

  return (
    <div
      ref={wrapperRef}
      className="relative w-full z-30"
      // 200vh of scrollable space for the transition timeline
      style={{ height: '200vh' }}
    >
      {/* Sticky container — stays fixed in viewport while user scrolls through the 200vh */}
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: '100vh' }}
      >

        {/* ── Deep Black Void Opening ───────────────────────────────────────── */}
        <div
          className="absolute inset-0 bg-[#050508] z-0 pointer-events-none"
          style={{ opacity: voidOpacity }}
        />

        {/* ── Volumetric orange back-light ─────────────────────────────────── */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-1"
          style={{ opacity: emergeP * (1 - dissolveP) }}
        >
          <div
            className="w-[600px] h-[600px] rounded-full blur-[140px]"
            style={{
              background: 'radial-gradient(circle, rgba(255,85,0,0.28) 0%, rgba(255,85,0,0.08) 50%, transparent 75%)',
              transform: `scale(${0.6 + rotateP * 0.8})`,
            }}
          />
        </div>

        {/* ── Orange Spark Particles ───────────────────────────────────────── */}
        {isActive && (
          <div className="absolute inset-0 pointer-events-none z-2">
            {sparks.map((s, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  width: `${3 + (i % 3)}px`,
                  height: `${3 + (i % 3)}px`,
                  background: '#FF5500',
                  opacity: emergeP * (0.3 + (i % 3) * 0.2) * (1 - dissolveP * 0.8),
                  boxShadow: '0 0 8px 3px rgba(255,85,0,0.5)',
                  transform: `scale(${0.5 + splitP * 1.5})`,
                  transition: `transform ${0.3 + s.delay}s ease`,
                  filter: 'blur(0.5px)',
                }}
              />
            ))}
          </div>
        )}

        {/* ── Horizontal orange light trails (edge glow lines) ─────────────── */}
        {isActive && (
          <div className="absolute inset-0 pointer-events-none z-2 flex flex-col justify-center items-center">
            {[0.25, 0.45, 0.55, 0.75].map((pos, i) => (
              <div
                key={i}
                className="absolute w-full"
                style={{
                  top: `${pos * 100}%`,
                  height: '1px',
                  background: i % 2 === 0
                    ? 'linear-gradient(to right, transparent 0%, rgba(255,85,0,0.15) 20%, rgba(255,85,0,0.4) 50%, rgba(255,85,0,0.15) 80%, transparent 100%)'
                    : 'linear-gradient(to right, transparent 0%, rgba(255,120,0,0.1) 30%, rgba(255,120,0,0.25) 50%, rgba(255,120,0,0.1) 70%, transparent 100%)',
                  opacity: rotateP * (1 - dissolveP),
                  transform: `scaleX(${rotateP})`,
                }}
              />
            ))}
          </div>
        )}

        {/* ── THE 3D CUBE ──────────────────────────────────────────────────── */}
        {isActive && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
            style={{ perspective: '1200px', perspectiveOrigin: '50% 50%' }}
          >
            <div
              style={{
                width: `${HALF * 2}px`,
                height: `${HALF * 2}px`,
                transformStyle: 'preserve-3d',
                transform: `
                  translateZ(${emergeZ}px)
                  scale(${cubeScale})
                  rotateX(${cubeRotX}deg)
                  rotateY(${cubeRotY}deg)
                `,
                opacity: cubeOpacity,
                willChange: 'transform, opacity',
              }}
            >
              {faceData.map((face, idx) => {
                // Each face base position (6-face cube)
                const basePositions = [
                  { tx: 0,     ty: 0,     tz: HALF,   rx: 0,   ry: 0   }, // front
                  { tx: 0,     ty: 0,     tz: -HALF,  rx: 0,   ry: 180 }, // back
                  { tx: HALF,  ty: 0,     tz: 0,      rx: 0,   ry: 90  }, // right
                  { tx: -HALF, ty: 0,     tz: 0,      rx: 0,   ry: -90 }, // left
                  { tx: 0,     ty: -HALF, tz: 0,      rx: 90,  ry: 0   }, // top
                  { tx: 0,     ty: HALF,  tz: 0,      rx: -90, ry: 0   }, // bottom
                ];
                const bp = basePositions[idx];

                // During split phase, each face flies away in its own direction
                const splitOffset = {
                  tx: face.tx - bp.tx,
                  ty: face.ty - bp.ty,
                  tz: face.tz - bp.tz,
                };

                const finalTx = bp.tx + splitOffset.tx * splitP;
                const finalTy = bp.ty + splitOffset.ty * splitP;
                const finalTz = bp.tz + splitOffset.tz * splitP;

                // Face color — alternating dark tones with subtle orange tint
                const faceColors = [
                  'linear-gradient(135deg, #0d0d10 0%, #1a0a00 100%)',   // front — deep orange-dark
                  'linear-gradient(135deg, #080810 0%, #0d0d12 100%)',   // back
                  'linear-gradient(135deg, #0a0810 0%, #100800 100%)',   // right — slight orange
                  'linear-gradient(135deg, #0c0c12 0%, #0a0804 100%)',   // left
                  'linear-gradient(135deg, #0e0904 0%, #1a0d00 100%)',   // top — warmest
                  'linear-gradient(135deg, #090912 0%, #0c0c12 100%)',   // bottom
                ];

                const isTopFace = idx === 4;

                return (
                  <div
                    key={idx}
                    style={{
                      position: 'absolute',
                      width: `${HALF * 2}px`,
                      height: `${HALF * 2}px`,
                      top: 0,
                      left: 0,
                      background: faceColors[idx],
                      border: '1px solid rgba(255,85,0,0.35)',
                      boxShadow: isTopFace
                        ? 'inset 0 0 40px rgba(255,85,0,0.15), 0 0 60px rgba(255,85,0,0.2)'
                        : 'inset 0 0 30px rgba(255,85,0,0.08)',
                      transform: `
                        translate3d(${finalTx}px, ${finalTy}px, ${finalTz}px)
                        rotateY(${bp.ry}deg)
                        rotateX(${bp.rx}deg)
                      `,
                      transformStyle: 'preserve-3d',
                      willChange: 'transform',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backfaceVisibility: 'visible',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Face inner edge glow frame */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        border: '1px solid rgba(255,85,0,0.12)',
                        margin: '8px',
                        pointerEvents: 'none',
                      }}
                    />

                    {/* Orange corner accents */}
                    {[
                      'top-0 left-0 border-t-2 border-l-2',
                      'top-0 right-0 border-t-2 border-r-2',
                      'bottom-0 left-0 border-b-2 border-l-2',
                      'bottom-0 right-0 border-b-2 border-r-2',
                    ].map((cls, ci) => (
                      <div
                        key={ci}
                        className={`absolute w-6 h-6 ${cls} border-[#FF5500]`}
                        style={{ opacity: 0.6 }}
                      />
                    ))}

                    {/* Face label typography */}
                    <div
                      style={{
                        textAlign: 'center',
                        fontFamily: 'system-ui, sans-serif',
                        fontWeight: 900,
                        letterSpacing: '-0.02em',
                        lineHeight: 1.0,
                        whiteSpace: 'pre-line',
                        userSelect: 'none',
                      }}
                    >
                      {idx === 0 && (
                        // Front face: "I BUILD." outlined
                        <span
                          style={{
                            fontSize: '56px',
                            WebkitTextStroke: '2px #FF5500',
                            color: 'transparent',
                            filter: 'drop-shadow(0 0 20px rgba(255,85,0,0.5))',
                          }}
                        >
                          I BUILD.
                        </span>
                      )}
                      {idx === 1 && (
                        <span
                          style={{
                            fontSize: '52px',
                            color: '#FF5500',
                            textShadow: '0 0 30px rgba(255,85,0,0.7)',
                          }}
                        >
                          DO IT.
                        </span>
                      )}
                      {idx === 2 && (
                        <span
                          style={{
                            fontSize: '28px',
                            color: '#ffffff',
                            textShadow: '0 0 20px rgba(255,85,0,0.3)',
                          }}
                        >
                          {`ALWAYS\nBE HAPPY.`}
                        </span>
                      )}
                      {idx === 3 && (
                        <span
                          style={{
                            fontSize: '28px',
                            color: '#FF5500',
                            textShadow: '0 0 20px rgba(255,85,0,0.5)',
                          }}
                        >
                          {`ALWAYS\nSMILE. :)`}
                        </span>
                      )}
                      {idx === 4 && (
                        <span
                          style={{
                            fontSize: '22px',
                            color: 'rgba(255,255,255,0.85)',
                            textShadow: '0 0 10px rgba(255,85,0,0.3)',
                          }}
                        >
                          {`WHO IS\nSHIYAM S`}
                        </span>
                      )}
                      {idx === 5 && (
                        <span
                          style={{
                            fontSize: '22px',
                            color: 'rgba(200,200,210,0.7)',
                          }}
                        >
                          {`NEVER TRY\nLATER.`}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Edge vignette to blend into both sections ────────────────────── */}
        <div
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050508] to-transparent pointer-events-none z-20"
          style={{ opacity: Math.max(0, 1 - emergeP * 2) }}
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050508] to-transparent pointer-events-none z-20" />

        {/* ── Scroll progress HUD ──────────────────────────────────────────── */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.25em] uppercase z-30 flex flex-col items-center space-y-2 pointer-events-none"
          style={{ opacity: isActive ? 0.6 : 0 }}
        >
          <div className="w-[160px] h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FF5500] rounded-full shadow-[0_0_8px_#FF5500]"
              style={{ width: `${progress * 100}%`, transition: 'width 0.1s linear' }}
            />
          </div>
          <span className="text-neutral-500">
            {progress < 0.40 ? 'CUBE EMERGING...' : progress < 0.65 ? 'ROTATING...' : progress < 0.82 ? 'SPLITTING...' : 'ASSEMBLING...'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SceneCubeTransition;
