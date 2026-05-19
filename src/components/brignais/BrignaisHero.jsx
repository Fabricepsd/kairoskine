import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const BrignaisHero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const scrollToBooking = () => {
    const el = document.getElementById('brignais-booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const titleWords = ['Une', 'prise', 'en', 'charge', 'ciblée'];
  const titleWordGold = 'de vos douleurs musculo-squelettiques';

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
    visible: {
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section ref={ref} id="brignais-hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-deep-black" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gold/8 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gold/4 blur-[100px] pointer-events-none" />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute inset-0 bg-deep-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-black/90 via-deep-black/40 to-deep-black/95" />
      </div>

      {/* Floating glows */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 right-[10%] w-64 h-64 rounded-full bg-gold/5 blur-3xl z-[1] pointer-events-none"
      />

      {/* Grid lines */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 w-full container mx-auto px-6 md:px-8 text-center max-w-5xl py-32"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex items-center gap-3 py-2 px-5 rounded-full glass-gold">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-ring" />
            <span className="text-gold text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase">
              Kinésithérapeute spécialisé — Brignais
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mb-6">
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight">
            <span className="flex flex-wrap justify-center gap-x-4 text-off-white">
              {titleWords.map((word, i) => (
                <motion.span key={i} variants={wordVariants}>{word}</motion.span>
              ))}
            </span>
            <motion.span variants={wordVariants} className="block gold-gradient-text-animated mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              {titleWordGold}
            </motion.span>
          </h1>
        </motion.div>

        {/* Separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-8 h-[1px] w-24 bg-gold/50 origin-left"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-base sm:text-lg md:text-xl text-off-white/70 mb-12 font-light max-w-2xl mx-auto leading-relaxed tracking-wide"
        >
          Thérapie manuelle ostéo-articulaire & Dry Needling — résultats rapides, prise en charge individuelle.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(212,175,55,0.3)' }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToBooking}
            className="relative overflow-hidden bg-gold text-deep-black px-8 py-4 font-bold uppercase tracking-[0.12em] text-sm transition-all duration-300 group"
            style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}
          >
            <span className="relative z-10">Prendre rendez-vous</span>
            <motion.span className="absolute inset-0 bg-white" initial={{ x: '-100%' }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('brignais-about')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-off-white/60 hover:text-gold text-sm uppercase tracking-[0.15em] font-medium flex items-center gap-2 transition-colors duration-300"
          >
            Découvrir
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="translate-y-[1px]">
              <path d="M5 12H19M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[9px] text-white/30 uppercase tracking-[0.4em]">Défiler</span>
        <div className="relative w-[1px] h-14 overflow-hidden">
          <div className="absolute inset-0 bg-white/10" />
          <motion.div
            className="absolute inset-x-0 top-0 h-full bg-gold"
            animate={{ y: ['−100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default BrignaisHero;
