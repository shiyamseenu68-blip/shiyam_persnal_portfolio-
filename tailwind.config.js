/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#050508',
          void: '#08090E',
          card: 'rgba(18, 20, 30, 0.85)',
          'dark-orange': '#D95300',
          'dark-orange-deep': '#992B00',
          'dark-rust': '#C84200',
          'dark-amber': '#B33600',
          'orange-glow': 'rgba(217, 83, 0, 0.3)',
          platinum: '#F3F4F6',
          muted: '#9CA3AF',
        }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'dark-orange-gradient': 'linear-gradient(135deg, #D95300 0%, #992B00 100%)',
        'rust-gradient': 'linear-gradient(135deg, #C84200 0%, #7A1A00 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(217, 83, 0, 0.05) 100%)',
      },
      boxShadow: {
        'dark-orange-glow': '0 0 35px rgba(217, 83, 0, 0.45)',
        'dark-orange-sm': '0 0 20px rgba(217, 83, 0, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
    },
  },
  plugins: [],
}
