import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const BrignaisAbout = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id="brignais-about" className="py-24 md:py-40 bg-anthracite relative w-full overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold/5 blur-[100px] pointer-events-none" />

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="font-display text-[200px] md:text-[280px] font-bold text-white/[0.015] select-none whitespace-nowrap">
          BRIGNAIS
        </span>
      </div>

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-[420px]">
              <div className="absolute inset-0 rounded-full blur-[60px] bg-gold/10 scale-150 pointer-events-none" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-16px] rounded-full pointer-events-none"
                style={{ border: '1px dashed rgba(212,175,55,0.25)' }}
              />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative overflow-hidden"
              >
                <motion.div
                  initial={{ x: '0%' }}
                  animate={isInView ? { x: '100%' } : {}}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 bg-anthracite z-10"
                />
                <img
                  src="/photofab-opt.png"
                  alt="Fabrice PONSODA — Kinésithérapeute spécialisé Brignais"
                  className="w-full h-auto relative z-[1]"
                  style={{ display: 'block', maxHeight: '640px', objectFit: 'contain', objectPosition: 'bottom center', mixBlendMode: 'multiply' }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="absolute -bottom-2 -left-2 size-3 rounded-full bg-gold"
                style={{ boxShadow: '0 0 12px rgba(212,175,55,0.6)' }}
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-gold/50" />
              <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-semibold">Qui je suis</span>
            </div>

            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-off-white mb-2 leading-tight">
              Fabrice
            </h2>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold gold-gradient-text mb-6 leading-tight">
              PONSODA
            </h2>

            <p className="text-off-white/40 text-xs tracking-[0.25em] uppercase mb-10 font-medium">
              Kinésithérapeute — Thérapie manuelle structurelle & Dry Needling
            </p>

            <div className="space-y-5 text-off-white/65 leading-relaxed font-light text-base md:text-lg">
              <p>
                Kinésithérapeute diplômé, titulaire d'un <strong className="text-off-white/90 font-medium">Master en Thérapie Manuelle Structurelle</strong> (Université Catholique de Louvain, Belgique).
              </p>
              <p>
                Spécialisé en <strong className="text-off-white/90 font-medium">dry needling</strong> et <strong className="text-off-white/90 font-medium">thérapie manuelle structurelle</strong>.
              </p>

              <blockquote className="border-l-2 border-gold/50 pl-6 my-8">
                <p className="font-display text-xl md:text-2xl italic text-off-white/80 leading-snug">
                  "Prise en charge individuelle. Protocole court. Résultat mesurable."
                </p>
              </blockquote>
            </div>

            {/* Location badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-10 inline-flex items-center gap-3 glass-gold px-4 py-3"
            >
              <svg className="w-4 h-4 text-gold shrink-0" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
              </svg>
              <span className="text-off-white/80 text-xs tracking-wider">
                Cabinet de consultation — Brignais (69530)
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
};

export default BrignaisAbout;
