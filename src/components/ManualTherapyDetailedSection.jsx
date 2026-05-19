import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Check } from 'lucide-react';

const TiltImageTM = ({ isInView }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <div ref={ref} className="relative w-full max-w-[480px]">
      {/* Very soft ambient glow — barely perceptible */}
      <div className="absolute inset-0 blur-[90px] bg-gold/6 scale-125 pointer-events-none" />

      {/* Image */}
      <div className="relative overflow-hidden">
        {/* Wipe reveal */}
        <motion.div
          initial={{ x: '100%' }}
          animate={isInView ? { x: '-100%' } : {}}
          transition={{ duration: 1.3, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-anthracite z-10"
        />

        <motion.div style={{ y: imgY }} className="will-change-transform">
          <img
            src="/TM-opt.jpg"
            alt="Thérapie manuelle — Fabrice PONSODA"
            className="w-full h-auto"
            style={{ display: 'block', mixBlendMode: 'multiply', maxHeight: '600px', objectFit: 'contain' }}
          />
        </motion.div>
      </div>

      {/* Single thin gold line — bottom left, static */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 w-16 h-[1px] bg-gold/40 origin-left"
      />
    </div>
  );
};

const techniques = [
  'Mobilisations articulaires rythmiques',
  'Manipulations haute vélocité (HVLA)',
  'Relâchement myofascial profond',
  'Techniques neuro-dynamiques',
  'Correction de la biomécanique',
  'Restauration du jeu articulaire',
];

const ManualTherapyDetailedSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section
      id="manual-therapy"
      ref={ref}
      className="py-24 md:py-40 bg-anthracite relative w-full overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Large background text */}
      <div className="absolute inset-0 flex items-center justify-end pointer-events-none overflow-hidden pr-4">
        <span className="font-display text-[160px] md:text-[220px] font-bold uppercase leading-none select-none"
          style={{ WebkitTextStroke: '1px rgba(212,175,55,0.04)', color: 'transparent' }}>
          MANUELLE
        </span>
      </div>

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image — order 2 on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 lg:order-1 relative w-full flex justify-center"
          >
            <TiltImageTM isInView={isInView} />
          </motion.div>

          {/* Content — order 1 on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-8 bg-gold/60" />
              <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-semibold">Approche clinique</span>
            </div>

            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-off-white mb-8 leading-tight">
              Thérapie <span className="gold-gradient-text">Manuelle</span>
            </h2>

            <p className="text-off-white/65 text-lg leading-relaxed mb-10 font-light">
              La main reste l'outil le plus sophistiqué pour diagnostiquer et traiter. Nous rétablissons l'homéostasie articulaire pour permettre un mouvement sans contrainte ni douleur.
            </p>

            <div className="h-[1px] bg-gradient-to-r from-gold/40 to-transparent mb-10" />

            <div>
              <h3 className="text-xs font-semibold text-off-white/40 uppercase tracking-[0.25em] mb-6">
                Techniques employées
              </h3>
              <ul className="space-y-4">
                {techniques.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                    className="flex items-start gap-4 group"
                  >
                    <span className="mt-0.5 size-5 bg-gold/10 border border-gold/20 rounded flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors duration-300">
                      <Check className="size-2.5 text-gold" />
                    </span>
                    <span className="text-off-white/60 text-sm leading-relaxed group-hover:text-off-white/80 transition-colors duration-300">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ManualTherapyDetailedSection;