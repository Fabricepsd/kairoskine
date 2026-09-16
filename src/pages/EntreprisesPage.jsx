import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Building2, Users, Target, CheckCircle, ArrowRight, Briefcase } from 'lucide-react';
import { NAP } from '@/config/nap';

/* ─── Données ─────────────────────────────────────────────────────────────── */

const interventions = [
  {
    icon: Target,
    title: 'Dry needling TMS',
    desc: 'Traitement des points trigger actifs chez vos collaborateurs exposés aux postures contraignantes — nuque, épaules, avant-bras.',
  },
  {
    icon: Users,
    title: 'Atelier gestes & postures',
    desc: 'Session collective de sensibilisation aux bonnes pratiques posturales, adaptée à vos postes de travail réels (écran, bureau, sédentarité).',
  },
  {
    icon: Briefcase,
    title: 'Analyse ergonomique de poste',
    desc: 'Observation des situations de travail, identification des facteurs de risque TMS, recommandations concrètes et actionnables.',
  },
];

const avantages = [
  'Réduction de l\'absentéisme lié aux TMS',
  'Conformité avec la démarche DUERP',
  'Protocole simple : 1 intervention / semaine',
  'Déplacement en entreprise — aucune contrainte logistique',
  'Résultats mesurables dès les premières semaines',
  'Facturation à l\'entreprise',
];

const cibles = [
  { label: 'PME tertiaires lyonnaises', desc: '10 à 250 collaborateurs, sédentaires ou hybrides' },
  { label: 'Startups & scale-ups', desc: 'Métropole lyonnaise — croissance rapide, culture QVT' },
  { label: 'Services & open spaces', desc: 'Environnements exposés aux TMS de bureau' },
];

/* ─── Composant ───────────────────────────────────────────────────────────── */

const EntreprisesPage = () => {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const avantagesRef = useRef(null);
  const ciblesRef = useRef(null);
  const ctaRef = useRef(null);

  const servicesInView = useInView(servicesRef, { once: true, margin: '-80px' });
  const avantagesInView = useInView(avantagesRef, { once: true, margin: '-80px' });
  const ciblesInView = useInView(ciblesRef, { once: true, margin: '-80px' });
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' });

  const mailtoHref = `mailto:${NAP.email}?subject=Prévention%20TMS%20entreprise%20—%20demande%20d'information&body=Bonjour%20Fabrice%2C%0A%0AJe%20souhaite%20en%20savoir%20plus%20sur%20votre%20offre%20de%20prévention%20TMS%20en%20entreprise.%0A%0A`;

  /* ── JSON-LD Service ── */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Prévention TMS en entreprise — KAIROS KINÉ',
    description: 'Intervention hebdomadaire en entreprise : dry needling, ateliers gestes & postures et analyse ergonomique de poste. Offre prévention facturée à l\'entreprise. PME tertiaires et startups lyonnaises.',
    provider: {
      '@type': 'Person',
      name: NAP.practitionerName,
      jobTitle: NAP.practitionerTitle,
      url: NAP.siteUrl,
    },
    areaServed: { '@type': 'Place', name: 'Métropole de Lyon' },
    serviceType: 'Prévention des troubles musculo-squelettiques (TMS)',
    url: `${NAP.siteUrl}/entreprises`,
  };

  return (
    <>
      <Helmet>
        <title>Prévention TMS en entreprise Lyon — KAIROS KINÉ | Saint-Genis-Laval</title>
        <meta
          name="description"
          content="Intervention hebdomadaire en entreprise : dry needling TMS, ateliers gestes & postures, analyse de poste. PME tertiaires et startups lyonnaises. Offre prévention facturée à l'entreprise — Fabrice PONSODA, kinésithérapeute Saint-Genis-Laval."
        />
        <meta
          name="keywords"
          content="prévention TMS entreprise Lyon, kinésithérapeute entreprise Lyon, gestes postures PME Lyon, prévention troubles musculo-squelettiques, QVT Lyon, dry needling entreprise, ergonomie poste travail Lyon"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${NAP.siteUrl}/entreprises`} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Prévention TMS en entreprise — KAIROS KINÉ Lyon" />
        <meta property="og:description" content="Intervention hebdomadaire : dry needling, gestes & postures, analyse de poste. Pour PME et startups lyonnaises. Offre B2B facturée à l'entreprise." />
        <meta property="og:url" content={`${NAP.siteUrl}/entreprises`} />
        <meta property="og:locale" content="fr_FR" />

        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden bg-deep-black pt-24 pb-16"
      >
        {/* Background glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gold/6 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-gold/3 blur-[100px] pointer-events-none" />

        {/* Grid lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <div className="relative z-10 container mx-auto px-6 md:px-8 text-center max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-10"
          >
            <div className="inline-flex items-center gap-3 py-2 px-5 rounded-full glass-gold">
              <Building2 className="size-3.5 text-gold" />
              <span className="text-gold text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase">
                Offre Entreprises — Lyon &amp; Métropole
              </span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight text-off-white mb-6"
          >
            Prévention &amp;{' '}
            <span className="gold-gradient-text-animated block mt-2">
              Santé au travail
            </span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mx-auto mb-8 h-[1px] w-24 bg-gold/50 origin-center"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-base sm:text-lg md:text-xl text-off-white/65 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Intervention hebdomadaire en entreprise pour la prévention des TMS.
            Dry needling, gestes &amp; postures, analyse de poste —
            <strong className="text-off-white/85 font-medium"> facturé à l'entreprise</strong>, pas à vos collaborateurs.
          </motion.p>

          {/* CTA hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href={mailtoHref}
              whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(212,175,55,0.3)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.gtag?.('event', 'cta_entreprises_hero', { event_category: 'conversion', event_label: 'entreprises_page' })}
              className="relative overflow-hidden bg-gold text-deep-black px-8 py-4 font-bold uppercase tracking-[0.12em] text-sm transition-all duration-300 group"
              style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Discutons de votre entreprise
                <ArrowRight className="size-4" />
              </span>
              <motion.span className="absolute inset-0 bg-white" initial={{ x: '-100%' }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }} />
            </motion.a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-4 text-off-white/25 text-[10px] tracking-wider uppercase"
          >
            Offre prévention — pas de soins individuels dans ce cadre
          </motion.p>
        </div>
      </section>

      {/* ── PRESTATIONS ───────────────────────────────────────────────────── */}
      <section
        ref={servicesRef}
        className="py-24 md:py-36 bg-anthracite relative w-full overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="h-[1px] w-12 bg-gold/50" />
              <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-semibold">Prestations</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-off-white mb-4">
              Ce que j'apporte
            </h2>
            <p className="text-off-white/50 font-light text-base max-w-lg">
              Une intervention structurée, hebdomadaire, directement dans vos locaux.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {interventions.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.1 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4 }}
                  className="relative p-7 bg-deep-black border border-white/5 hover:border-gold/20 transition-all duration-500 group"
                  style={{ clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)' }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 65%)' }}
                  />
                  <div className="size-10 bg-anthracite border border-gold/20 flex items-center justify-center mb-5">
                    <Icon className="size-4 text-gold" />
                  </div>
                  <h3 className="text-off-white font-semibold uppercase tracking-wider text-sm mb-3 group-hover:text-gold transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-off-white/50 text-sm leading-relaxed font-light">
                    {item.desc}
                  </p>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/0 group-hover:border-gold/40 transition-colors duration-500" />
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </section>

      {/* ── FORMAT & AVANTAGES ────────────────────────────────────────────── */}
      <section
        ref={avantagesRef}
        className="py-24 md:py-36 bg-deep-black relative w-full overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/4 blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto items-start">

            {/* Format */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={avantagesInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="h-[1px] w-12 bg-gold/50" />
                <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-semibold">Format</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-off-white mb-8">
                1 intervention<br />
                <span className="gold-gradient-text">par semaine</span>
              </h2>

              <div className="space-y-5">
                {[
                  { label: 'Fréquence', value: '1 session hebdomadaire — récurrente' },
                  { label: 'Lieu', value: 'Dans vos locaux' },
                  { label: 'Contenu', value: 'Dry needling TMS + atelier gestes/postures ou analyse de poste (selon semaine)' },
                  { label: 'Facturation', value: 'À l\'entreprise' },
                  { label: 'Positionnement', value: 'Prévention / Traitement' },
                ].map((row, i) => (
                  <div key={i} className="flex items-start gap-4 pb-5 border-b border-white/5 last:border-0 last:pb-0">
                    <span className="text-gold/60 text-[9px] tracking-[0.25em] uppercase font-semibold shrink-0 mt-1 w-24">{row.label}</span>
                    <span className="text-off-white/70 text-sm font-light leading-relaxed">{row.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Avantages */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={avantagesInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="h-[1px] w-12 bg-gold/50" />
                <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-semibold">Bénéfices</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-off-white mb-8">
                Pourquoi<br />
                <span className="gold-gradient-text">agir maintenant</span>
              </h2>

              <div className="space-y-4">
                {avantages.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={avantagesInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="size-4 text-gold mt-0.5 shrink-0" />
                    <span className="text-off-white/70 text-sm font-light leading-relaxed">{item}</span>
                  </motion.div>
                ))}
              </div>

              {/* DUERP note */}
              <div className="mt-8 p-5 bg-gold/5 border border-gold/15">
                <p className="text-off-white/60 text-xs leading-relaxed font-light">
                  <strong className="text-gold text-[10px] tracking-wider uppercase block mb-1.5">
                    Obligation légale
                  </strong>
                  Le Code du travail impose à tout employeur d'évaluer les risques professionnels (DUERP), dont les TMS. Une démarche de prévention active s'inscrit directement dans ce cadre réglementaire.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CIBLES ────────────────────────────────────────────────────────── */}
      <section
        ref={ciblesRef}
        className="py-24 md:py-32 bg-anthracite relative w-full overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ciblesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="h-[1px] w-12 bg-gold/50" />
              <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-semibold">Qui je cible</span>
              <div className="h-[1px] w-12 bg-gold/50" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-off-white">
              Pour quelles entreprises&nbsp;?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {cibles.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={ciblesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="p-7 bg-deep-black border border-white/5 hover:border-gold/20 transition-colors duration-500"
                style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-gold mb-5" />
                <h3 className="text-off-white font-semibold uppercase tracking-wider text-sm mb-2">{item.label}</h3>
                <p className="text-off-white/40 text-sm font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────────────────────── */}
      <section
        ref={ctaRef}
        className="py-24 md:py-36 bg-deep-black relative w-full overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-gold/5 blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-gold/50" />
              <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-semibold">Contact</span>
              <div className="h-[1px] w-12 bg-gold/50" />
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold text-off-white mb-6">
              Discutons de<br />
              <span className="gold-gradient-text">votre entreprise</span>
            </h2>

            <p className="text-off-white/50 font-light mb-10 leading-relaxed">
              Échange sans engagement pour évaluer vos besoins, la faisabilité logistique et le format adapté à vos équipes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* CTA principal — mailto préqualifié */}
              <motion.a
                href={mailtoHref}
                whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(212,175,55,0.3)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => window.gtag?.('event', 'cta_entreprises_bottom', { event_category: 'conversion', event_label: 'entreprises_page' })}
                className="relative overflow-hidden bg-gold text-deep-black px-8 py-4 font-bold uppercase tracking-[0.12em] text-sm transition-all duration-300 group"
                style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Me contacter
                  <ArrowRight className="size-4" />
                </span>
                <motion.span className="absolute inset-0 bg-white" initial={{ x: '-100%' }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }} />
              </motion.a>

              {/* Lien téléphone */}
              <a
                href={`tel:${NAP.phoneRaw}`}
                onClick={() => window.gtag?.('event', 'cta_phone_entreprises', { event_category: 'conversion', event_label: 'entreprises_page' })}
                className="text-off-white/50 hover:text-gold text-sm font-light tracking-wider transition-colors duration-300"
              >
                Ou appeler le {NAP.phoneDisplay}
              </a>
            </div>

            <p className="mt-6 text-off-white/20 text-[10px] tracking-wider uppercase">
              Offre B2B — facturation à l'entreprise · Pas de soins individuels dans ce cadre
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default EntreprisesPage;
