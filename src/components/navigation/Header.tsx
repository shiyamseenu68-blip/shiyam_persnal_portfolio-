import React, { useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import smLogoImg from '@/assets/shiyam-sm-logo.png';

interface HeaderProps {
  activeSection?: string;
  onNavigate?: (sectionId: string) => void;
  isVisible?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ activeSection = 'home', onNavigate, isVisible = true }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'id-card', label: 'ID PASS' },
    { id: 'about', label: 'ABOUT' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'stack', label: 'STACK' },
    { id: 'journey', label: 'JOURNEY' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isCinematic = activeSection === 'cinematic-climax';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-16 transition-all duration-700 pointer-events-auto bg-[#050508]/70 backdrop-blur-md border-b border-white/5 ${
      isCinematic || !isVisible ? 'opacity-0 -translate-y-full pointer-events-none' : 'opacity-100 translate-y-0'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Official SM Personal Brand Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="group flex items-center space-x-3 select-none"
        >
          <div className="relative w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <img
              src={smLogoImg}
              alt="SHIYAM S"
              className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(255,85,0,0.4)]"
            />
          </div>

          <span className="font-display text-xl font-black tracking-wider text-white">
            SHIYAM<span className="text-[#FF5500]">.S</span>
          </span>
        </a>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-xs font-mono tracking-widest uppercase transition-all relative py-1 ${
                  isActive
                    ? 'text-white font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF5500] shadow-[0_0_10px_#FF5500]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Theme Toggle Switch Pill */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-1 rounded-full bg-[#0B0D14] border border-white/15 flex items-center space-x-1.5 text-neutral-400 hover:text-white transition-colors shadow-lg"
            title="Toggle theme"
          >
            <div className={`p-1.5 rounded-full transition-colors ${isDarkMode ? 'bg-[#FF5500] text-black font-bold' : 'text-neutral-400'}`}>
              <Sun className="w-3.5 h-3.5" />
            </div>
            <div className={`p-1.5 rounded-full transition-colors ${!isDarkMode ? 'bg-[#FF5500] text-black font-bold' : 'text-neutral-400'}`}>
              <Moon className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-2xl bg-[#0B0D14] border border-white/15 text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-4 top-20 p-6 rounded-3xl bg-[#090A0F]/95 border border-[#FF5500]/40 backdrop-blur-2xl shadow-2xl flex flex-col space-y-3 z-50">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="text-left px-4 py-3 rounded-xl font-mono text-xs tracking-widest text-neutral-200 hover:text-white hover:bg-[#FF5500]/20 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
