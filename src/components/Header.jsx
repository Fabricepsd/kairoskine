import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isBlogPage = location.pathname.startsWith('/blog');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    if (location.pathname !== '/' && location.pathname !== '/brignais') {
      navigate('/', { state: { scrollTo: id } });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Qui je suis', id: 'brignais-about' },
    { name: 'Pathologies', id: 'brignais-treatments' },
    { name: 'Puncture Sèche', id: 'dry-needling' },
    { name: 'Thérapie Manuelle', id: 'manual-therapy' },
    { name: 'Tarifs', id: 'brignais-pricing' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${isScrolled
        ? 'glass-panel shadow-2xl border-b border-white/5'
        : 'bg-transparent'
        }`}
    >
      {/* Top gold line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent origin-left"
      />

      <div className="container mx-auto px-4 w-full max-w-full">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link
            to="/"
            className="group flex flex-col items-start relative"
          >
            <span className="font-display text-xl md:text-2xl font-bold text-off-white tracking-[0.15em] uppercase group-hover:text-gold transition-colors duration-300">
              KAIROS
            </span>
            <span className="text-[9px] tracking-[0.35em] text-gold/70 uppercase font-sans font-medium mt-[-2px]">
              BRIGNAIS
            </span>
            <span className="absolute -bottom-1 left-0 h-[1px] bg-gold w-0 group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                onMouseEnter={() => setActiveLink(link.id)}
                onMouseLeave={() => setActiveLink(null)}
                className="relative text-off-white/70 hover:text-off-white text-xs lg:text-sm font-medium tracking-[0.08em] uppercase transition-colors duration-300 py-1"
              >
                {link.name}
                <span className={`absolute -bottom-0.5 left-0 h-[1px] bg-gold transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeLink === link.id ? 'w-full' : 'w-0'
                  }`} />
              </button>
            ))}

            {/* Blog link */}
            <Link
              to="/blog"
              onMouseEnter={() => setActiveLink('blog')}
              onMouseLeave={() => setActiveLink(null)}
              className={`relative text-xs lg:text-sm font-medium tracking-[0.08em] uppercase transition-colors duration-300 py-1 ${isBlogPage ? 'text-gold' : 'text-off-white/70 hover:text-off-white'}`}
            >
              Blog
              <span className={`absolute -bottom-0.5 left-0 h-[1px] bg-gold transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeLink === 'blog' || isBlogPage ? 'w-full' : 'w-0'
                }`} />
            </Link>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection('brignais-booking')}
              className="relative overflow-hidden bg-gold text-deep-black px-5 lg:px-7 py-2.5 text-xs lg:text-sm font-bold uppercase tracking-[0.1em] transition-all duration-300 group"
              style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
            >
              <span className="relative z-10">Prendre Rendez-vous</span>
              <motion.span
                className="absolute inset-0 bg-white"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 -mr-2 text-off-white hover:text-gold transition-colors"
            aria-label="Menu"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="size-6" />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="size-6" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden glass-panel border-t border-white/5 overflow-hidden w-full absolute left-0 right-0 shadow-2xl"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => scrollToSection(link.id)}
                  className="text-off-white/80 hover:text-gold font-display text-2xl font-light italic text-left transition-colors"
                >
                  {link.name}
                </motion.button>
              ))}

              {/* Blog mobile link */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.07 }}
              >
                <Link
                  to="/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-display text-2xl font-light italic transition-colors ${isBlogPage ? 'text-gold' : 'text-off-white/80 hover:text-gold'}`}
                >
                  Blog
                </Link>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => scrollToSection('brignais-booking')}
                className="bg-gold text-deep-black w-full px-6 py-4 text-center font-bold uppercase tracking-[0.12em] text-sm hover:bg-gold-light transition-colors mt-2"
              >
                Prendre Rendez-vous
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;