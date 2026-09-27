import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const BrignaisPricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={ref} id="brignais-pricing" className="py-24 md:py-40 bg-deep-black relative w-full overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: prefersReducedMotion ? 0.4 : 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="h-[1px] w-12 bg-gold/50" />
            <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-semibold">Investissement</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-off-white mb-4">
            Tarifs
          </h2>
          <p className="text-off-white/50 font-light text-base max-w-lg">
            Conventionné + dépassement pour actes hors nomenclature.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

          {/* Tarif card */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: prefersReducedMotion ? 0.4 : 0.7, delay: prefersReducedMotion ? 0 : 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={prefersReducedMotion ? undefined : { y: -6 }}
            className="relative p-8 bg-anthracite border border-gold/20 transition-all duration-500"
            style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)' }}
          >
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(150, 165, 117,0.08) 0%, transparent 65%)' }}
            />

            <div className="text-[9px] text-gold/60 tracking-[0.3em] uppercase font-semibold mb-4">
              Séance individuelle — 30 min
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-end justify-between">
                <span className="text-off-white/40 text-xs tracking-wider uppercase">Part conventionnée</span>
                <span className="font-display text-2xl font-bold text-off-white/60 leading-none">~17 €</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-off-white/40 text-xs tracking-wider uppercase">Dépassement HN</span>
                <span className="font-display text-4xl font-bold text-gold leading-none">30 €</span>
              </div>
              <div className="h-[1px] bg-gradient-to-r from-gold/20 to-transparent" />
              <div className="flex items-end justify-between">
                <span className="text-off-white/60 text-xs tracking-wider uppercase font-medium">Total séance</span>
                <span className="font-display text-3xl font-bold text-off-white leading-none">~47-50 €</span>
              </div>
            </div>

            <div className="space-y-3 text-sm text-off-white/55 font-light leading-relaxed">
              <p>Le dépassement couvre les techniques spécialisées et le temps de consultation individuelle.</p>
              <p className="text-xs text-gold/60 italic border-l border-gold/30 pl-3">
                Ce dépassement peut être pris en charge par votre mutuelle. Renseignez-vous avant votre 1re consultation.
              </p>
            </div>

            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/40" />
          </motion.div>

          {/* Comparison card */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: prefersReducedMotion ? 0.4 : 0.7, delay: prefersReducedMotion ? 0.1 : 0.25, ease: [0.16, 1, 0.3, 1] }}
            whileHover={prefersReducedMotion ? undefined : { y: -6 }}
            className="group relative p-8 bg-anthracite border border-white/5 hover:border-gold/20 transition-all duration-500"
            style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}
          >
            <div className="text-[9px] text-gold/60 tracking-[0.3em] uppercase font-semibold mb-6">
              Pourquoi 30 € et pas 5 € ?
            </div>

            <motion.div
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.12, delayChildren: prefersReducedMotion ? 0 : 0.5 } },
              }}
              className="space-y-5 mb-8"
            >
              {[
                { label: 'Prise en charge individuelle', desc: 'Pas 3 patients à la fois' },
                { label: 'Techniques spécialisées', desc: 'Dry needling, thérapie manuelle, exercices ciblés' },
                { label: 'Protocole court', desc: '3–5 séances au lieu de 15–20' },
                { label: 'Formation spécialisée', desc: 'Master UCL Thérapie Manuelle, 2 ans supplémentaires' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -12 },
                    visible: { opacity: 1, x: 0, transition: { duration: prefersReducedMotion ? 0.2 : 0.45, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  className="flex items-start gap-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                  <div>
                    <p className="text-off-white/80 text-sm font-medium">{item.label}</p>
                    <p className="text-off-white/40 text-xs font-light">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Le calcul patient */}
            <div className="bg-deep-black border border-white/5 p-5">
              <p className="text-gold/70 text-[10px] tracking-[0.2em] uppercase font-semibold mb-3">Le calcul réel</p>
              <div className="space-y-3 text-xs text-off-white/50 font-light">
                <div className="flex justify-between items-center">
                  <span>Kiné standard : 15–20 séances × 22 €</span>
                  <span className="text-off-white/70 font-medium">330–440 € total</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Chez moi : 3–5 séances × 47 €</span>
                  <span className="text-gold font-medium">141–235 € total</span>
                </div>
                <div className="h-[1px] bg-white/5" />
                <p className="text-off-white/60 text-xs leading-relaxed">
                  <strong className="text-gold">150 € d'économies</strong> en moyenne, plus <strong className="text-off-white/80">10–15 séances et 1–2 mois de moins.</strong>
                </p>
              </div>
            </div>

            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/0 group-hover:border-gold/40 transition-colors duration-500" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrignaisPricing;
