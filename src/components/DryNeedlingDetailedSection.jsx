import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Check } from 'lucide-react';

const benefits = [
  'Perturbation mécanique des tissus contractés',
  'Stimulation nerveuse inhibant la douleur',
  'Lavage des substances inflammatoires',
  'Restauration de la vascularisation locale',
  'Normalisation de l\'activité électrique',
  'Gain immédiat d\'amplitude articulaire',
];

const DryNeedlingDetailedSection = () => {
  const ref = useRef(null);
  const imgRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section
      id="dry-needling"
      ref={ref}
      className="py-24 md:py-40 bg-deep-black relative w-full overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* Large background text */}
      <div className="absolute inset-0 flex items-center justify-start pointer-events-none overflow-hidden pl-4">
        <span className="font-display text-[160px] md:text-[220px] font-bold uppercase leading-none select-none"
          style={{ WebkitTextStroke: '1px rgba(212,175,55,0.04)', color: 'transparent' }}>
          NEEDLING
        </span>
      </div>

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-8 bg-gold/60" />
              <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-semibold">Technique Invasive</span>
            </div>

            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-off-white mb-8 leading-tight">
              Puncture <span className="gold-gradient-text">Sèche</span>
            </h2>

            <p className="text-off-white/65 text-lg leading-relaxed mb-10 font-light">
              Une approche neurophysiologique précise pour désactiver les points trigger myofasciaux. Contrairement à l'acupuncture, nous ciblons directement la structure musculaire en dysfonction.
            </p>

            <div className="h-[1px] bg-gradient-to-r from-gold/40 to-transparent mb-10" />

            <div>
              <h3 className="text-xs font-semibold text-off-white/40 uppercase tracking-[0.25em] mb-6">
                Mécanisme d'action
              </h3>
              <ul className="space-y-4">
                {benefits.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
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

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative w-full"
          >
            <div className="absolute -inset-4 border border-gold/8 pointer-events-none" />

            <div className="relative overflow-hidden" style={{ clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))' }}>
              {/* Wipe reveal */}
              <motion.div
                initial={{ x: '0%' }}
                animate={isInView ? { x: '100%' } : {}}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 bg-deep-black z-10"
              />

              <motion.div style={{ y: imgY }} ref={imgRef} className="will-change-transform">
                <img
                  src="https://images.unsplash.com/photo-1598555763574-dca77e10427e"
                  alt="Séance de puncture sèche"
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: '4/5', objectFit: 'cover' }}
                />
              </motion.div>

              <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 via-transparent to-transparent pointer-events-none z-[1]" />

              <div className="absolute bottom-6 left-6 right-6 z-[2]">
                <div className="h-[1px] bg-gold/30 mb-4" />
                <p className="text-off-white/80 text-sm font-medium tracking-wider uppercase">Précision & Efficacité</p>
                <p className="text-off-white/40 text-xs mt-1">Traitement des zones profondes</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DryNeedlingDetailedSection;