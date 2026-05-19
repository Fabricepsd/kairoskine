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

          {/* Doctolib widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="border border-white/5 relative overflow-hidden bg-white"
            style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))' }}
          >
            <iframe
              id="doctolib-widget"
              src="https://www.doctolib.fr/masseur-kinesitherapeute/lyon/fabrice-ponsoda?pid=practice-749098"
              width="100%"
              height="500"
              style={{ border: 'none', display: 'block' }}
              title="Prendre rendez-vous avec Fabrice Ponsoda — Doctolib"
              loading="lazy"
              allow="payment"
            />
            <div className="bg-deep-black p-3 text-center">
              <a
                href="https://www.doctolib.fr/masseur-kinesitherapeute/lyon/fabrice-ponsoda"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.gtag?.('event', 'cta_doctolib', { event_category: 'conversion', event_label: 'booking_section' })}
                className="text-gold hover:text-gold-light text-xs uppercase tracking-wider font-medium transition-colors duration-300"
              >
                Ouvrir sur Doctolib →
              </a>
            </div>
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
