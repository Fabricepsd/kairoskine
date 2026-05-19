import React, { useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Tag, BookOpen } from 'lucide-react';
import blogArticles from '@/data/blogArticles';
import Breadcrumbs from '@/components/Breadcrumbs';

const ArticleCard = ({ article, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, filter: 'blur(6px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/blog/${article.slug}`}
        className="group block relative bg-anthracite border border-white/5 hover:border-gold/25 transition-all duration-500 overflow-hidden"
        style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))' }}
      >
        {/* Hero image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={article.heroImage}
            alt={article.heroAlt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            width="600"
            height="400"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-anthracite via-anthracite/40 to-transparent" />

          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-deep-black/70 backdrop-blur-sm border border-gold/20 text-gold text-[10px] tracking-[0.2em] uppercase font-semibold">
              <BookOpen className="size-3" />
              {article.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-4 text-off-white/30 text-xs mb-4">
            <span>{new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span className="w-1 h-1 rounded-full bg-gold/40" />
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {article.readTime}
            </span>
          </div>

          <h2 className="font-display text-2xl md:text-3xl font-bold text-off-white group-hover:text-gold transition-colors duration-300 mb-3 leading-tight">
            {article.title}
          </h2>

          <p className="text-off-white/50 text-sm font-light leading-relaxed mb-6 line-clamp-2">
            {article.subtitle}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.slice(0, 4).map((tag, i) => (
              <span key={i} className="inline-flex items-center gap-1 px-2 py-1 bg-white/[0.03] border border-white/5 text-off-white/30 text-[10px] tracking-wider uppercase">
                <Tag className="size-2.5" />
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 text-gold text-sm font-medium tracking-wider uppercase group-hover:gap-4 transition-all duration-300">
            Lire l'article
            <ArrowRight className="size-4" />
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-gold/0 group-hover:border-gold/40 transition-colors duration-500" />

        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 65%)' }}
        />
      </Link>
    </motion.div>
  );
};

const BlogPage = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      <Helmet>
        <title>Blog kinésithérapie Lyon & Saint-Genis-Laval — Thérapie manuelle, Dry Needling | KAIROS KINÉ</title>
        <meta
          name="description"
          content="Articles et conseils de votre kinésithérapeute à Brignais : thérapie manuelle, dry needling, dépassement d'honoraires. Informations fiables et basées sur la science pour les patients de Lyon et Saint-Genis-Laval."
        />
        <meta
          name="keywords"
          content="blog kiné Lyon, kinésithérapeute blog Saint-Genis-Laval, thérapie manuelle articles, dry needling explication, dépassement honoraires kiné, kiné Brignais blog"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Fabrice PONSODA — KAIROS KINÉ" />
        <link rel="canonical" href="https://kairoskine.fr/blog" />

        <meta property="og:type" content="blog" />
        <meta property="og:title" content="Blog — KAIROS KINÉ Brignais" />
        <meta property="og:description" content="Articles sur la kinésithérapie : thérapie manuelle, dry needling, tarifs et dépassements. Proche Lyon et Saint-Genis-Laval." />
        <meta property="og:url" content="https://kairoskine.fr/blog" />
        <meta property="og:locale" content="fr_FR" />

        {/* Blog structured data */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Blog KAIROS KINÉ",
          "description": "Articles de kinésithérapie : thérapie manuelle, dry needling, tarifs. Cabinet à Brignais, proche Lyon.",
          "url": "https://kairoskine.fr/blog",
          "author": {
            "@type": "Person",
            "name": "Fabrice PONSODA",
            "jobTitle": "Kinésithérapeute"
          },
          "publisher": {
            "@type": "Organization",
            "name": "KAIROS KINÉ"
          },
          "blogPost": blogArticles.map(a => ({
            "@type": "BlogPosting",
            "headline": a.title,
            "description": a.metaDescription,
            "datePublished": a.date,
            "author": { "@type": "Person", "name": a.author },
            "url": `https://kairoskine.fr/blog/${a.slug}`
          }))
        })}</script>
      </Helmet>

      {/* Hero */}
      <section ref={heroRef} className="pt-32 md:pt-40 pb-16 md:pb-24 bg-deep-black relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span
            className="font-display text-[140px] md:text-[220px] font-bold uppercase leading-none select-none"
            style={{ WebkitTextStroke: '1px rgba(212,175,55,0.03)', color: 'transparent' }}
          >
            BLOG
          </span>
        </div>

        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <Breadcrumbs items={[
                { label: 'Accueil', to: '/' },
                { label: 'Blog' },
              ]} />
              <div className="h-[1px] w-12 bg-gold/50" />
              <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-semibold">
                Expertise & Savoir
              </span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-off-white mb-6 leading-tight">
              Le <span className="gold-gradient-text">Blog</span>
            </h1>
            <p className="text-off-white/50 text-lg font-light leading-relaxed max-w-xl">
              Articles basés sur les données scientifiques actuelles.
              Comprendre vos douleurs, vos traitements, vos droits.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </section>

      {/* Articles grid */}
      <section className="py-16 md:py-24 bg-deep-black relative">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogArticles.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 md:py-32 bg-anthracite relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 60%)' }} />
        <div className="container mx-auto px-6 md:px-8 text-center relative z-10">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-off-white mb-6">
            Une question sur votre <span className="gold-gradient-text">douleur</span> ?
          </h2>
          <p className="text-off-white/50 font-light mb-10 max-w-lg mx-auto">
            Chaque situation est unique. Prenez rendez-vous pour un bilan individuel de 30 minutes.
          </p>
          <Link
            to="/#brignais-booking"
            className="inline-block bg-gold text-deep-black px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] hover:bg-gold-light transition-colors duration-300"
            style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}
          >
            Prendre Rendez-vous
          </Link>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
