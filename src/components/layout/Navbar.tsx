import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { CONTACT_INFO } from '../../config/contact';
import stewardLogo from '../../assets/logos/Steward_Logo.png';
import { trackEvent } from '../../lib/analytics';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const links = useMemo(() => [
    { label: 'Product', href: '/#product' },
    { label: 'About', href: '/#about' },
    { label: 'Features', href: '/#features' },
    { label: 'Pricing', href: '/#pricing' }
  ], []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = links.map(link => link.href.split('#')[1]);
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { root: null, rootMargin: '-30% 0px -60% 0px', threshold: 0 });

    elements.forEach(el => observer.observe(el));
    return () => { elements.forEach(el => observer.unobserve(el)); observer.disconnect(); };
  }, [links]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsMenuOpen(false); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handleKey); };
  }, [isMenuOpen]);

  return (
    <>
      <motion.header
        id="navbar-header"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.15, 0.85, 0.35, 1] as const }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        style={{ paddingTop: isScrolled ? '12px' : '16px' }}
      >
        <nav
          aria-label="Primary Navigation"
          className={`pointer-events-auto flex items-center gap-1 transition-all duration-500 ease-out ${
            isScrolled
              ? 'px-2 py-2 rounded-full border border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.04)]'
              : 'px-6 py-3 rounded-full border border-transparent'
          }`}
          style={{
            backgroundColor: isScrolled ? 'rgba(10, 10, 15, 0.8)' : 'transparent',
            backdropFilter: isScrolled ? 'blur(24px) saturate(1.5)' : 'none',
            WebkitBackdropFilter: isScrolled ? 'blur(24px) saturate(1.5)' : 'none',
          }}
        >
          {/* Logo */}
          <a
            href="/#hero"
            aria-label="Steward Home"
            className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/[0.04] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <img src={stewardLogo} alt="Steward" className="h-7 w-auto object-contain" />
          </a>

          <div className="hidden lg:block w-[1px] h-5 bg-white/[0.08] mx-1" />

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {links.map((link) => {
              const isActive = activeSection === link.href.split('#')[1];
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => trackEvent('navbar_click', { button_text: link.label, destination_url: link.href, section_name: 'navbar' })}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium font-primary transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                      isActive
                        ? 'text-[#0A0A0F]'
                        : 'text-white/60 hover:text-white/90 hover:bg-white/[0.04]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full"
                        style={{ background: '#FFFFFF', boxShadow: '0 0 16px rgba(255, 255, 255, 0.3)' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:block w-[1px] h-5 bg-white/[0.08] mx-1" />

          {/* Desktop CTA */}
          <a
            href={CONTACT_INFO.whatsappUrl}
            onClick={() => trackEvent('whatsapp_click', { button_text: 'Book a Demo', destination_url: CONTACT_INFO.whatsappUrl, section_name: 'navbar' })}
            className="hidden lg:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold font-primary transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            style={{
              background: 'linear-gradient(135deg, #A0A0A0 0%, #404040 50%, #050505 100%)',
              color: '#FFFFFF',
              boxShadow: '0 2px 12px rgba(160, 160, 160, 0.25)',
            }}
          >
            Book a Demo
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-overlay"
            aria-label="Toggle menu"
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full text-white/80 hover:bg-white/[0.06] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              id="mobile-nav-overlay"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation Menu"
              className="fixed top-[80px] left-4 right-4 sm:left-auto sm:right-6 sm:w-[320px] z-50 rounded-2xl border border-white/[0.06]"
              style={{
                backgroundColor: 'rgba(10, 10, 15, 0.9)',
                backdropFilter: 'blur(24px) saturate(1.5)',
                WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
                boxShadow: '0 16px 48px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
              }}
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.15, 0.85, 0.35, 1] as const }}
            >
              <div className="flex flex-col px-3 py-3">
                <ul className="flex flex-col gap-0.5">
                  {links.map((link, i) => {
                    const isActive = activeSection === link.href.split('#')[1];
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 + 0.1, duration: 0.3 }}
                      >
                        <a
                          href={link.href}
                          onClick={() => {
                            setIsMenuOpen(false);
                            trackEvent('navbar_click', { button_text: link.label, destination_url: link.href, section_name: 'navbar_mobile' });
                          }}
                          aria-current={isActive ? 'page' : undefined}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium font-primary transition-all duration-150 hover:bg-white/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                            isActive
                              ? 'font-semibold text-white bg-white/[0.06]'
                              : 'text-white/60'
                          }`}
                        >
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.5)]" aria-hidden="true" />
                          )}
                          <span>{link.label}</span>
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>

              <div className="px-3 pb-3">
                <a
                  href={CONTACT_INFO.whatsappUrl}
                  onClick={() => {
                    setIsMenuOpen(false);
                    trackEvent('whatsapp_click', { button_text: 'Book a Demo', destination_url: CONTACT_INFO.whatsappUrl, section_name: 'navbar_mobile' });
                  }}
                  className="flex items-center justify-center w-full px-6 py-3 font-semibold font-primary rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white transition-all text-sm"
                  style={{
                    background: 'linear-gradient(135deg, #A0A0A0 0%, #404040 50%, #050505 100%)',
                    color: '#FFFFFF',
                    boxShadow: '0 2px 12px rgba(160, 160, 160, 0.25)',
                  }}
                >
                  Book a Demo
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
