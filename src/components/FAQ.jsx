import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ChevronDown } from 'lucide-react';

const faqData = [
  {
    question: "Quelle est la différence entre un kiné classique et votre approche ?",
    answer: "En cabinet classique, le kiné traite souvent 3-4 patients simultanément sur des séances de 20 minutes. Chez KAIROS KINÉ, chaque séance dure 30 minutes en individuel — un seul patient à la fois. J'utilise des techniques spécialisées (thérapie manuelle structurelle, dry needling) pour des résultats plus rapides, en 5 à 8 séances maximum.",
  },
  {
    question: "Qu'est-ce que le dry needling ?",
    answer: "Le dry needling (puncture sèche) consiste à insérer de fines aiguilles dans les points trigger musculaires — ces nœuds douloureux qui provoquent des douleurs locales ou projetées. Ce n'est pas de l'acupuncture : c'est une technique basée sur la neurophysiologie moderne, validée scientifiquement pour traiter les douleurs musculo-squelettiques.",
  },
  {
    question: "Est-ce que les séances sont remboursées ?",
    answer: "Oui, partiellement. La part conventionnée (~17 €) est remboursée par la Sécurité Sociale. Le dépassement de 30 € (hors nomenclature) couvre les techniques spécialisées et le temps de consultation individuelle. Ce dépassement peut être pris en charge par votre mutuelle — vérifiez votre contrat avant la première séance.",
  },
  {
    question: "Combien de séances sont nécessaires ?",
    answer: "En moyenne, 5 à 8 séances suffisent. À la 5ème séance, si l'amélioration est inférieure à 30%, je vous réoriente vers un spécialiste ou une imagerie. L'objectif est un traitement court et efficace, pas un suivi à rallonge.",
  },
  {
    question: "Faut-il une ordonnance pour consulter ?",
    answer: "Oui, une ordonnance de votre médecin est nécessaire pour bénéficier du remboursement par la Sécurité Sociale. Sans ordonnance, la séance reste possible mais ne sera pas prise en charge par la CPAM (uniquement par la mutuelle si votre contrat le prévoit).",
  },
  {
    question: "Quelles pathologies prenez-vous en charge ?",
    answer: "Je traite les douleurs musculo-squelettiques aiguës et résistantes : cervicalgies, torticolis, lombalgies, sciatiques, névralgies cervico-brachiales (NCB), tendinopathies, raideurs post-blessure. Je ne prends pas en charge : le post-opératoire, la neurologie, la rééducation respiratoire, la pelvi-périnéologie, ni les enfants.",
  },
  {
    question: "Comment prendre rendez-vous ?",
    answer: "Rendez-vous directement sur Doctolib ou par téléphone au 06 95 70 39 06. Les créneaux sont disponibles du lundi au vendredi.",
  },
];

const FaqItem = ({ item, index, isOpen, onToggle }) => {
  return (
    <div
      className="border-b border-white/5 last:border-b-0"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 px-1 text-left group"
      >
        <span className={`text-sm sm:text-base font-medium transition-colors duration-300 pr-4 ${isOpen ? 'text-gold' : 'text-off-white/80 group-hover:text-off-white'}`}>
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          <ChevronDown className={`size-4 transition-colors duration-300 ${isOpen ? 'text-gold' : 'text-off-white/30'}`} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-off-white/50 text-sm font-light leading-relaxed pb-5 px-1">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section id="faq" className="py-20 md:py-32 bg-deep-black relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="h-[1px] w-12 bg-gold/50" />
              <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-semibold">FAQ</span>
              <div className="h-[1px] w-12 bg-gold/50" />
            </div>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-off-white mb-4">
              Questions <span className="gold-gradient-text">fréquentes</span>
            </h2>
            <p className="text-off-white/50 font-light max-w-lg mx-auto">
              Tout ce que vous devez savoir avant votre première consultation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto bg-anthracite border border-white/5 p-6 md:p-8"
            style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}
          >
            {faqData.map((item, index) => (
              <FaqItem
                key={index}
                item={item}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
