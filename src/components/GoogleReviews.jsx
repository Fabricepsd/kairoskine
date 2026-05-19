import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star } from 'lucide-react';

/**
 * Real Google Reviews — Fabrice PONSODA, kinésithérapeute
 * All 5-star reviews from Google Business Profile
 */
const GOOGLE_RATING = 5.0;
const GOOGLE_REVIEW_COUNT = 24;
const GOOGLE_PLACE_URL = 'https://search.google.com/local/writereview?placeid=ChIJN1t_tDEL0kcRmXm4xGqKBQQ'; // Update with your real Place ID

const reviews = [
  {
    name: 'Adam Marcel',
    rating: 5,
    date: 'Septembre 2025',
    text: "Excellent kinésithérapeute. Grâce à Monsieur Ponsoda, j'ai pu considérablement réduire des douleurs chroniques d'origine musculo-squelettique. Son accompagnement a vraiment amélioré ma qualité de vie, je recommande vivement pour sa sympathie et son professionnalisme.",
  },
  {
    name: 'Kristin Colard',
    rating: 5,
    date: 'Octobre 2023',
    text: "Je suis athlète de haut niveau et Fabrice me suit depuis un an maintenant. J'apprécie beaucoup Fabrice pour son professionnalisme et sa bonne humeur. Il est à l'écoute et me donne des conseils, c'est ce dont j'ai besoin.",
  },
  {
    name: 'Marie Hérault',
    rating: 5,
    date: 'Mars 2024',
    text: "C'est mon kinésithérapeute depuis 2 ans. Il est compétent, gentil, patient et possède un certain magnétisme. Je le recommande sans hésiter. Je suis soulagée et peux diminuer les anti-douleurs.",
  },
  {
    name: 'Mayt Guna',
    rating: 5,
    date: 'Octobre 2023',
    text: "Fabrice a contribué à l'amélioration de mon dos (hernie discale au niveau des lombaires). Grâce à sa méthode, pédagogie et surtout ses encouragements (et sa bonne humeur 😊) j'ai repris le sport.",
  },
  {
    name: 'Christiane Dujet',
    rating: 5,
    date: 'Octobre 2023',
    text: "Fabrice est un kinésithérapeute qui se donne à fond à son travail et à son patient. Outre son empathie naturelle, il obtient des résultats car sa démarche est d'une remarquable efficacité, et il sait stimuler le patient.",
  },
  {
    name: 'Bastien Darbois',
    rating: 5,
    date: 'Avril 2024',
    text: "Merci Fabrice pour l'accompagnement ! Super kiné ! Très professionnel. Il m'a accompagné dans ma rééducation de hanche vers un retour au sport. Je recommande fortement.",
  },
  {
    name: 'Myriam Fraine',
    rating: 5,
    date: 'Juillet 2024',
    text: "Je viens de découvrir Fabrice et sa technique de dry needling, un rdv parfait à l'écoute, disponible et efficace. Ravi d'avoir pu te connaître et merci encore 😊",
  },
  {
    name: 'Anne Marie',
    rating: 5,
    date: 'Octobre 2023',
    text: "Kinésithérapeute très à l'écoute, sympa et professionnel. À chaque séance c'est un vrai soulagement de douleur. Je recommande vivement sans hésiter.",
  },
  {
    name: 'Jules May',
    rating: 5,
    date: 'Octobre 2025',
    text: "Excellente compréhension du problème et un accompagnement personnalisé au top !",
  },
];

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`size-3.5 ${i < rating ? 'fill-amber-400 text-amber-400' : 'fill-white/10 text-white/10'}`}
      />
    ))}
  </div>
);

const ReviewCard = ({ review, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="p-6 bg-deep-black border border-white/5 hover:border-gold/15 transition-all duration-500 flex flex-col"
      style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold text-sm font-semibold">
            {review.name.charAt(0)}
          </div>
          <div>
            <p className="text-off-white/90 text-sm font-medium">{review.name}</p>
            <p className="text-off-white/30 text-[10px]">{review.date}</p>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>

      {/* Review text */}
      <p className="text-off-white/50 text-sm font-light leading-relaxed flex-1">
        "{review.text}"
      </p>

      {/* Google badge */}
      <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-white/5">
        <svg viewBox="0 0 24 24" className="size-3.5" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        <span className="text-off-white/25 text-[9px] tracking-wider uppercase">Avis Google</span>
      </div>
    </motion.div>
  );
};

const GoogleReviews = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="avis" className="py-20 md:py-32 bg-anthracite relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-gold/4 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-[1px] w-12 bg-gold/50" />
            <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-semibold">Témoignages</span>
            <div className="h-[1px] w-12 bg-gold/50" />
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-off-white mb-6">
            Ce que disent nos <span className="gold-gradient-text">patients</span>
          </h2>

          {/* Google aggregate rating */}
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-deep-black/50 border border-white/5 rounded-full">
            <svg viewBox="0 0 24 24" className="size-5" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-off-white font-display text-xl font-bold">{GOOGLE_RATING}</span>
            <StarRating rating={Math.round(GOOGLE_RATING)} />
            <span className="text-off-white/40 text-xs font-light">({GOOGLE_REVIEW_COUNT} avis)</span>
          </div>
        </motion.div>

        {/* Reviews grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} index={index} />
          ))}
        </div>

        {/* CTA to leave a review */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href={GOOGLE_PLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => window.gtag?.('event', 'cta_google_review', { event_category: 'engagement', event_label: 'reviews_section' })}
            className="inline-flex items-center gap-2 text-off-white/40 hover:text-gold text-xs uppercase tracking-[0.15em] font-medium transition-colors duration-300"
          >
            Laisser un avis sur Google
            <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default GoogleReviews;
