import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, User, Target, RotateCcw } from 'lucide-react';

const steps = [
  {
    icon: Clock,
    number: '01',
    title: 'Bilan initial',
    subtitle: '1re séance — 30 min',
    items: [
      'Anamnèse + examen clinique ciblé',
      'Diagnostic kinésithérapique',
      '1er traitement si possible',
      'Plan annoncé : 5-8 séances',
      'Information tarifaire confirmée',
    ]
  },
  {
    icon: User,
    number: '02',
    title: 'Suivi intensif',
    subtitle: 'Séances 2 à 5 — 30 min',
    items: [
      'Réévaluation rapide',
      'Thérapie manuelle structurelle',
      'Dry needling si indiqué',
      'Ajustement exercices ciblés',
    ]
  },
  {
    icon: Target,
    number: '03',
    title: 'Réévaluation',
    subtitle: 'Séance 5 ou 6',
    items: [
      '> 70% amélioration → fin de prise en charge',
      '30-70% → 2-3 séances supplémentaires',
      '< 30% → réorientation (imagerie, spécialiste)',
    ]
  },
];

const BrignaisApproach = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id="brignais-approach" className="py-24 md:py-40 bg-anthracite relative w-full overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="font-display text-[180px] md:text-[250px] font-bold text-white/[0.015] select-none whitespace-nowrap">
          MÉTHODE
        </span>
      </div>

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={isInView ? { opacity: 1, letterSpacing: '0.3em' } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-gold text-[10px] font-semibold tracking-[0.3em] uppercase block mb-4"
          >
            Mon approche
          </motion.span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-off-white mb-6">
            5 à 8 séances. <span className="gold-gradient-text">Pas plus.</span>
          </h2>
          <div className="space-y-4 text-base sm:text-lg text-off-white/60 font-light leading-relaxed max-w-2xl mx-auto">
            <p>
              Chaque consultation : <strong className="text-off-white/80 font-medium">30 minutes dédiées exclusivement</strong> à votre prise en charge.
              Thérapie manuelle, dry needling si indiqué, exercices ciblés.
            </p>
            <p>
              Si après 5 séances il n'y a pas d'amélioration significative, je vous réoriente.
            </p>
          </div>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
                animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <div
                  className="h-full p-8 bg-deep-black border border-white/5 hover:border-gold/20 transition-colors duration-500 relative overflow-hidden"
                  style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: 'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)' }}
                  />

                  {/* Number */}
                  <div className="font-display text-5xl font-bold gold-gradient-text opacity-30 group-hover:opacity-60 transition-opacity duration-500 mb-4 select-none">
                    {step.number}
                  </div>

                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="size-4 text-gold" />
                    <h3 className="text-off-white font-semibold uppercase tracking-wider text-sm group-hover:text-gold transition-colors duration-300">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gold/50 text-xs tracking-wider mb-5">{step.subtitle}</p>

                  <ul className="space-y-2.5">
                    {step.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-off-white/50 text-sm font-light group-hover:text-off-white/70 transition-colors duration-300">
                        <span className="w-1 h-1 rounded-full bg-gold/50 mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/20 group-hover:border-gold/60 transition-colors duration-500" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
};

export default BrignaisApproach;
