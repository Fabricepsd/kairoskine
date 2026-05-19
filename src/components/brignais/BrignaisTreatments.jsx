import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const treatments = [
  { icon: '🔹', title: 'Cervicalgies & Torticolis', desc: 'Douleurs cervicales aiguës et subaiguës, raideurs du cou.' },
  { icon: '🔹', title: 'Névralgies cervico-brachiales', desc: 'NCB — douleurs irradiant du cou vers le bras.' },
  { icon: '🔹', title: 'Tendinopathies', desc: 'Y compris résistantes au traitement classique et chroniques.' },
  { icon: '🔹', title: 'Sciatiques', desc: 'Douleurs irradiant dans le membre inférieur, d\'origine lombaire.' },
  { icon: '🔹', title: 'Lombalgies aiguës', desc: 'Douleurs lombaires invalidantes, blocages du bas du dos.' },
  { icon: '🔹', title: 'Raideurs post-blessure', desc: 'Récupération de mobilité après blessure musculo-squelettique.' },
];

const notTreated = [
  'Post-opératoire / Pré-opératoire',
  'Neurologie',
  'Respiratoire',
  'Enfants',
  'Fibromyalgie',
  'Douleurs chroniques diffuses',
  'Entorses (phase aiguë)',
  'Rééducation périnéale / pelvi-périnéologie',
  'Kinésithérapie vestibulaire (vertiges)',
];

const BrignaisTreatments = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id="brignais-treatments" className="py-24 md:py-40 bg-deep-black relative w-full overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="h-[1px] w-12 bg-gold/50" />
            <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-semibold">Spécialisation</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-off-white mb-4">
            Ce que je traite
          </h2>
          <p className="text-off-white/50 font-light text-base max-w-lg">
            Prise en charge ciblée des douleurs musculo-squelettiques aiguës et résistantes.
          </p>
        </motion.div>

        {/* Treatment cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {treatments.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="relative p-7 bg-anthracite border border-white/5 hover:border-gold/20 transition-all duration-500 group"
              style={{ clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)' }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 65%)' }}
              />
              <div className="text-gold text-lg mb-3">{item.icon}</div>
              <h3 className="text-off-white font-semibold uppercase tracking-wider text-sm mb-3 group-hover:text-gold transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-off-white/50 text-sm leading-relaxed font-light group-hover:text-off-white/70 transition-colors duration-300">
                {item.desc}
              </p>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/0 group-hover:border-gold/40 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>

        {/* What I don't treat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-anthracite/50 border border-white/5 p-8"
            style={{ clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))' }}
          >
            <h3 className="text-off-white/60 text-xs tracking-[0.25em] uppercase font-semibold mb-5">
              Ce que je ne prends pas en charge
            </h3>
            <div className="flex flex-wrap gap-2">
              {notTreated.map((item, i) => (
                <span key={i} className="text-off-white/30 text-xs px-3 py-1.5 border border-white/5 font-light tracking-wide">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrignaisTreatments;
