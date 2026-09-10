import React from 'react';

interface LogoProps {
  className?: string;
}

// 1. Official React Brand Logo SVG
export const ReactLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
    <g stroke="#61DAFB" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

// 2. Official JavaScript Brand Logo SVG
export const JSLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <rect width="128" height="128" fill="#F7DF1E" rx="16" />
    <path
      d="M67.31 104.57c3.48 5.75 8.1 9.61 16.48 9.61 6.96 0 11.45-3.36 11.45-8.23 0-5.75-4.63-7.85-12.39-11.23l-4.29-1.85c-12.39-5.32-20.61-11.97-20.61-26.06 0-12.98 9.87-22.95 25.13-22.95 10.96 0 18.84 3.93 24.16 13.06l-11.23 7.17c-3.12-5.43-6.48-7.52-12.73-7.52-6.13 0-10.18 3.36-10.18 7.64 0 5.43 3.82 7.52 11.34 10.76l4.29 1.85c14.7 6.25 21.87 12.38 21.87 26.64 0 15.28-11.8 24.53-28.75 24.53-15.04 0-24.88-6.13-30.09-16.14l11.55-7.28zM24.71 103.88c2.43 4.28 5.79 7.98 11.69 7.98 5.9 0 9.61-2.9 9.61-14.35V45.24h16.26v52.65c0 20.25-11.69 28.12-27.42 28.12-13.08 0-21.75-6.6-25.57-15.62l15.43-6.51z"
      fill="#000000"
    />
  </svg>
);

// 3. Official Node.js Brand Logo SVG
export const NodeLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 256 274" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M128 0L0 74v148l128 74 128-74V74L128 0zm0 30.7l97.8 56.5v113.1L128 256.7 30.2 200.3V87.2L128 30.7z"
      fill="#339933"
    />
    <path
      d="M128 65.5l-63.5 36.7v73.3L128 212.2l63.5-36.7v-73.3L128 65.5zm0 18.4l47.6 27.5v55L128 193.9l-47.6-27.5v-55L128 83.9z"
      fill="#66CC33"
    />
  </svg>
);

// 4. Official Python Brand Logo SVG
export const PythonLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M54.2 1.5c-27.4 0-25.7 11.9-25.7 11.9v12.3h26.2v3.7H17.8s-16.3-1.8-16.3 26.2c0 28 14.2 27 14.2 27h8.5V70.2s-.5-14.2 14.2-14.2h24.4s13.8.2 13.8-13.3V14.7S95.3 1.5 54.2 1.5zm-14 8.4c2.6 0 4.7 2.1 4.7 4.7s-2.1 4.7-4.7 4.7-4.7-2.1-4.7-4.7 2.1-4.7 4.7-4.7z"
      fill="#3776AB"
    />
    <path
      d="M55.8 108.5c27.4 0 25.7-11.9 25.7-11.9V84.3H55.3v-3.7H92.2s16.3 1.8 16.3-26.2c0-28-14.2-27-14.2-27h-8.5v12.4s.5 14.2-14.2 14.2H67.2s-13.8-.2-13.8 13.3v28c.1 0-2.7 13.2 38.4 13.2zm14-8.4c-2.6 0-4.7-2.1-4.7-4.7s2.1-4.7 4.7-4.7 4.7 2.1 4.7 4.7-2.1 4.7-4.7 4.7z"
      fill="#FFD43B"
    />
  </svg>
);

// 5. Official TypeScript Brand Logo SVG
export const TSLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <rect width="128" height="128" fill="#3178C6" rx="16" />
    <path
      d="M71.74 54.89h18.32v6.64H80.9v48.64h-7.85V61.53h-9.16v-6.64zm22.4 39.54c2.81 3.52 7.02 5.68 12.01 5.68 4.41 0 7.22-1.78 7.22-4.59 0-3.14-3.14-4.22-8.56-5.78l-2.92-.81c-8.6-2.43-13.9-6.38-13.9-14.54 0-9.08 7.57-15.03 18.98-15.03 7.73 0 13.63 2.76 17.57 7.73l-5.08 4.76c-3.14-3.57-7.24-5.35-12.33-5.35-4.43 0-6.92 1.84-6.92 4.43 0 3.03 2.92 4.06 8.33 5.57l2.87.81c9.46 2.65 14.28 6.76 14.28 14.87 0 9.57-7.79 15.41-19.85 15.41-8.71 0-15.52-3.19-19.85-8.87l5.15-4.29z"
      fill="#FFFFFF"
    />
  </svg>
);

// 6. Official Git Brand Logo SVG
export const GitLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M123.77 56.45L71.55 4.23c-5.64-5.64-14.78-5.64-20.42 0L3.9 51.45c-5.64 5.64-5.64 14.78 0 20.42l52.22 52.22c5.64 5.64 14.78 5.64 20.42 0l47.23-47.23c5.64-5.63 5.64-14.77 0-20.41z"
      fill="#F05032"
    />
    <path
      d="M62.66 79.16c-3.17-1.74-5.32-5.14-5.32-9.04 0-2.45.86-4.71 2.3-6.49l-11.4-11.4c-1.78 1.44-4.04 2.3-6.49 2.3-5.7 0-10.33-4.63-10.33-10.33 0-5.7 4.63-10.33 10.33-10.33 5.7 0 10.33 4.63 10.33 10.33 0 2.45-.86 4.71-2.3 6.49l11.08 11.08c1.78-1.44 4.04-2.3 6.49-2.3 5.7 0 10.33 4.63 10.33 10.33 0 1.25-.22 2.45-.63 3.56l11.4 11.4c1.11-.41 2.31-.63 3.56-.63 5.7 0 10.33 4.63 10.33 10.33 0 5.7-4.63 10.33-10.33 10.33-5.7 0-10.33-4.63-10.33-10.33 0-1.25.22-2.45.63-3.56L62.66 79.16z"
      fill="#FFFFFF"
    />
  </svg>
);
