import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';

const BrignaisBooking = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="brignais-booking" ref={ref} className="py-24 md:py-40 bg-anthracite relative w-full overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-gold/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-[1px] w-12 bg-gold/50" />
            <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-semibold">Rendez-vous</span>
            <div className="h-[1px] w-12 bg-gold/50" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-off-white mb-4">
            Prendre rendez-vous
          </h2>
          <p className="text-off-white/50 font-light max-w-lg mx-auto">
            Prenez rendez-vous directement via Doctolib ou par téléphone.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

          {/* Doctolib CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="border border-white/5 relative overflow-hidden bg-deep-black flex flex-col items-center justify-center p-10"
            style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))' }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(0,127,242,0.08) 0%, transparent 60%)' }} />

            {/* Doctolib logo */}
            <div className="relative z-10 mb-8">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-[#107ACA] flex items-center justify-center shadow-lg shadow-[#107ACA]/20">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-white">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M9 15l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            <h3 className="relative z-10 text-off-white font-display text-2xl font-bold mb-2 text-center">
              Réservez en ligne
            </h3>
            <p className="relative z-10 text-off-white/40 text-sm font-light mb-8 text-center max-w-xs">
              Choisissez votre créneau directement sur Doctolib. Consultation individuelle de 30 minutes.
            </p>

            <motion.a
              href="https://www.doctolib.fr/masseur-kinesitherapeute/lyon/fabrice-ponsoda"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(0,127,242,0.3)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.gtag?.('event', 'cta_doctolib', { event_category: 'conversion', event_label: 'booking_section' })}
              className="relative z-10 inline-flex items-center gap-3 bg-[#107ACA] text-white px-8 py-4 font-bold uppercase tracking-[0.12em] text-sm transition-all duration-300 hover:bg-[#0D6AB6]"
              style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              Prendre rendez-vous
            </motion.a>

            <p className="relative z-10 text-off-white/20 text-[10px] mt-4 tracking-wider uppercase">via Doctolib</p>
          </motion.div>

          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-5"
          >
            {/* Address */}
            <div className="p-6 bg-deep-black border border-white/5 hover:border-gold/20 transition-colors duration-500"
              style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)' }}
            >
              <div className="flex items-start gap-4">
                <div className="size-10 bg-anthracite border border-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="size-4 text-gold" />
                </div>
                <div>
                  <p className="text-gold/60 text-[9px] tracking-[0.3em] uppercase font-semibold mb-2">Adresse</p>
                  <p className="text-off-white/80 text-sm font-light leading-relaxed">
                    163 rue du Général de Gaulle<br />
                    69530 Brignais
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="p-6 bg-deep-black border border-white/5 hover:border-gold/20 transition-colors duration-500"
              style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)' }}
            >
              <div className="flex items-start gap-4">
                <div className="size-10 bg-anthracite border border-white/5 flex items-center justify-center shrink-0">
                  <Phone className="size-4 text-gold" />
                </div>
                <div>
                  <p className="text-gold/60 text-[9px] tracking-[0.3em] uppercase font-semibold mb-2">Téléphone</p>
                  <a href="tel:+33695703906" onClick={() => window.gtag?.('event', 'cta_phone', { event_category: 'conversion', event_label: 'booking_section' })} className="text-off-white/80 text-sm font-light hover:text-gold transition-colors duration-300">
                    06 95 70 39 06
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="p-6 bg-deep-black border border-white/5 hover:border-gold/20 transition-colors duration-500"
              style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)' }}
            >
              <div className="flex items-start gap-4">
                <div className="size-10 bg-anthracite border border-white/5 flex items-center justify-center shrink-0">
                  <Clock className="size-4 text-gold" />
                </div>
                <div>
                  <p className="text-gold/60 text-[9px] tracking-[0.3em] uppercase font-semibold mb-2">Horaires</p>
                  <p className="text-off-white/80 text-sm font-light leading-relaxed">
                    Sur rendez-vous uniquement<br />
                    <span className="text-off-white/40 text-xs">Horaires flexibles selon disponibilité</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Mutuelle info */}
            <div className="p-5 bg-gold/5 border border-gold/15">
              <p className="text-off-white/60 text-xs leading-relaxed font-light">
                <strong className="text-gold text-[10px] tracking-wider uppercase block mb-1.5">Mutuelle & remboursement</strong>
                La part conventionnée (~17 €) est remboursée par la Sécurité sociale. Le dépassement de 30 € peut être pris en charge par votre mutuelle selon votre contrat.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrignaisBooking;
