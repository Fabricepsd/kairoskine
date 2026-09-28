import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const BrignaisCabinet = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={ref} id="brignais-cabinet" className="py-24 md:py-40 bg-deep-black relative w-full overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] -translate-y-1/2 rounded-full bg-gold/5 blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Photo */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: prefersReducedMotion ? 0.4 : 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative overflow-hidden"
              style={{ clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))' }}
            >
              <img
                src="/cabinet-salle.jpg"
                alt="Salle de consultation KAIROS KINÉ — Saint-Genis-Laval"
                loading="lazy"
                decoding="async"
                width="1400"
                height="1123"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(10,10,10,0) 60%, rgba(10,10,10,0.35) 100%)' }} />
            </div>
            <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b border-r border-gold/40" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: prefersReducedMotion ? 0.4 : 0.9, delay: prefersReducedMotion ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-gold/50" />
              <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-semibold">Le cabinet</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-off-white mb-6 leading-tight">
              Un espace pensé pour <span className="gold-gradient-text">la prise en charge individuelle</span>
            </h2>

            <p className="text-off-white/60 text-base sm:text-lg font-light leading-relaxed mb-4">
              Un seul patient à la fois, dans un cadre calme et équipé pour la thérapie manuelle et le dry needling — pas de salle commune, pas de rendez-vous chevauchés.
            </p>
            <p className="text-off-white/40 text-sm font-light leading-relaxed">
              Cabinet situé à Saint-Genis-Laval, à quelques minutes de Lyon, Oullins et Brignais.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrignaisCabinet;
