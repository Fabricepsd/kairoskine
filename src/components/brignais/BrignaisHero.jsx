import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useSpring, useMotionTemplate } from 'framer-motion';

const BrignaisHero = () => {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const slatScroll = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  // The slatted wall opens as you scroll past it — leaving the threshold and
  // entering the practice, literally. A single hairline pattern whose repeat
  // interval widens as you scroll (the slats spreading apart), with a soft
  // glow growing behind it — the scroll position IS the door opening, drawn
  // as one clean texture rather than stacked elements.
  const slatUnit = useTransform(slatScroll, [0, 1], prefersReducedMotion ? [44, 44] : [44, 86]);
  const slatsBg = useMotionTemplate`repeating-linear-gradient(90deg, rgba(150,165,117,0.16) 0px, rgba(150,165,117,0.16) 1.5px, transparent 1.5px, transparent ${slatUnit}px)`;
  const slatsOpacity = useTransform(slatScroll, [0, 0.9], prefersReducedMotion ? [1, 1] : [1, 0.4]);
  const glowOpacity = useTransform(slatScroll, [0.15, 1], prefersReducedMotion ? [0, 0] : [0, 0.14]);
  const contentY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ['0%', '0%'] : ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], prefersReducedMotion ? [1, 1] : [1, 0]);

  const scrollToBooking = () => {
    const el = document.getElementById('brignais-booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const titleWords = ['Une', 'prise', 'en', 'charge', 'ciblée'];
  const titleWordGold = 'de vos douleurs musculo-squelettiques';

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: prefersReducedMotion ? 0.04 : 0.1, delayChildren: prefersReducedMotion ? 0.1 : 0.3 } }
  };

  const wordVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 40, filter: 'blur(8px)' },
    visible: {
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { duration: prefersReducedMotion ? 0.3 : 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section ref={ref} id="brignais-hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-deep-black">
        <img
          src="/hero-slats-bg.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute top-[-100px] right-[-100px] w-[800px] h-[800px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(150, 165, 117,0.08) 0%, rgba(0,0,0,0) 60%)' }} />
        <div className="absolute bottom-[-100px] left-[-100px] w-[600px] h-[600px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(150, 165, 117,0.04) 0%, rgba(0,0,0,0) 60%)' }} />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute inset-0 bg-deep-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-black/90 via-deep-black/40 to-deep-black/95" />
      </div>

      {/* Floating glows */}
      <motion.div
        animate={prefersReducedMotion ? { opacity: 0.4 } : { opacity: [0.3, 0.6, 0.3] }}
        transition={prefersReducedMotion ? undefined : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 right-[10%] w-[400px] h-[400px] z-[1] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(150, 165, 117,0.06) 0%, rgba(0,0,0,0) 50%)' }}
      />

      {/* Background — the treatment room's slatted wall, opening as you enter.
          At rest it's a fine hairline pattern (the closed wall). Scroll past
          the Hero — moving from the doorway into the practice — and the
          lines spread apart while a soft glow grows behind them, as if
          light from the room beyond were reaching through as the wall
          opens. One clean texture, not stacked pieces; the scroll position
          IS the opening, nothing loops on a timer. Reduced motion keeps the
          wall closed and static — still legible as the room, at rest. */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(circle at 50% 50%, rgba(150,165,117,0.35) 0%, rgba(0,0,0,0) 65%)', opacity: glowOpacity }}
        />
        <motion.div className="absolute inset-0" style={{ backgroundImage: slatsBg, opacity: slatsOpacity }} />
      </div>

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
              Kinésithérapeute spécialisé — Saint-Genis-Laval, Lyon
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
          Dry needling, thérapie manuelle et rééducation ciblée, combinés dans un protocole court : l'objectif n'est pas de vous revoir 15 fois. Prise en charge individuelle 30 minutes.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(150, 165, 117,0.3)' }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToBooking}
            className="relative overflow-hidden bg-gold text-deep-black px-8 py-4 font-bold uppercase tracking-[0.12em] text-sm transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-black"
            style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}
          >
            <span className="relative z-10">Prendre rendez-vous</span>
            <motion.span className="absolute inset-0 bg-white" initial={{ x: '-100%' }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('brignais-about')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-off-white/60 hover:text-gold text-sm uppercase tracking-[0.15em] font-medium flex items-center gap-2 transition-colors duration-300 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-black"
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
          {prefersReducedMotion ? (
            <div className="absolute inset-x-0 top-0 h-1/3 bg-gold" />
          ) : (
            <motion.div
              className="absolute inset-x-0 top-0 h-full bg-gold"
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default BrignaisHero;
