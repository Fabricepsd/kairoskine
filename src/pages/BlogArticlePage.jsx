import React, { useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion, useInView } from 'framer-motion';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Clock, ArrowLeft, ArrowRight, Tag, User, Calendar, BookOpen, ExternalLink, FlaskConical } from 'lucide-react';
import blogArticles from '@/data/blogArticles';

// Renders markdown-like bold text (**text**)
const RichText = ({ children }) => {
  if (!children) return null;
  const parts = children.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    // Bold
    const boldMatch = part.match(/^\*\*(.+)\*\*$/);
    if (boldMatch) return <strong key={i} className="text-off-white/90 font-medium">{boldMatch[1]}</strong>;
    // Internal link
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, text, url] = linkMatch;
      return (
        <Link key={i} to={url} className="text-gold hover:text-gold-light underline underline-offset-2 decoration-gold/30 hover:decoration-gold/60 transition-colors duration-300">
          {text}
        </Link>
      );
    }
    return <span key={i}>{part}</span>;
  });
};

const SectionRenderer = ({ section }) => {
  switch (section.type) {
    case 'intro':
      return (
        <div className="text-lg md:text-xl text-off-white/70 font-light leading-relaxed mb-10 border-l-2 border-gold/30 pl-6">
          <RichText>{section.content}</RichText>
        </div>
      );

    case 'heading':
      if (section.level === 2) {
        return (
          <h2 className="font-display text-3xl md:text-4xl font-bold text-off-white mt-14 mb-6 leading-tight">
            {section.content}
          </h2>
        );
      }
      return (
        <h3 className="font-display text-2xl font-bold text-off-white mt-10 mb-4">
          {section.content}
        </h3>
      );

    case 'paragraph':
      return (
        <p className="text-off-white/60 text-base leading-relaxed mb-6 font-light">
          <RichText>{section.content}</RichText>
        </p>
      );

    case 'list':
      return (
        <ul className="space-y-3 mb-8">
          {section.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-off-white/60 text-sm leading-relaxed font-light">
              <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
              <span><RichText>{item}</RichText></span>
            </li>
          ))}
        </ul>
      );

    case 'callout':
      return (
        <div className="my-8 p-6 bg-anthracite border border-gold/15 relative overflow-hidden"
          style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(212,175,55,0.06) 0%, transparent 50%)' }} />
          <div className="relative z-10">
            <span className="text-2xl mr-2">{section.icon}</span>
            <span className="text-off-white/70 text-sm leading-relaxed font-light">
              <RichText>{section.content}</RichText>
            </span>
          </div>
        </div>
      );

    case 'evidence':
      return (
        <div className="my-8 p-6 bg-deep-black border border-emerald-500/15 relative overflow-hidden"
          style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(16,185,129,0.04) 0%, transparent 50%)' }} />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <FlaskConical className="size-4 text-emerald-400" />
              <span className="text-emerald-400 text-[10px] tracking-[0.2em] uppercase font-semibold">{section.title}</span>
            </div>
            <p className="text-off-white/60 text-sm leading-relaxed font-light">
              <RichText>{section.content}</RichText>
            </p>
          </div>
        </div>
      );

    case 'comparison':
      return (
        <div className="my-8 space-y-3">
          {section.items.map((item, i) => (
            <div
              key={i}
              className={`p-5 border ${item.highlight ? 'bg-anthracite border-gold/25' : 'bg-deep-black border-white/5'} flex flex-col sm:flex-row sm:items-center justify-between gap-3`}
            >
              <div>
                <p className={`font-semibold text-sm uppercase tracking-wider ${item.highlight ? 'text-gold' : 'text-off-white/60'}`}>{item.label}</p>
                <p className="text-off-white/40 text-xs mt-1">{item.detail}</p>
              </div>
              <span className={`font-display text-2xl font-bold ${item.highlight ? 'text-gold' : 'text-off-white/50'}`}>{item.total}</span>
            </div>
          ))}
          {section.conclusion && (
            <p className="text-off-white/60 text-sm font-light leading-relaxed mt-4 pl-4 border-l border-gold/20">
              <RichText>{section.conclusion}</RichText>
            </p>
          )}
        </div>
      );

    case 'image':
      return (
        <figure className="my-10">
          <div className="relative overflow-hidden" style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}>
            <img
              src={section.src}
              alt={section.alt}
              className="w-full h-auto object-cover"
              loading="lazy"
              width="800"
              height="500"
            />
          </div>
          {section.caption && (
            <figcaption className="mt-3 text-off-white/30 text-xs text-center italic">
              {section.caption}
            </figcaption>
          )}
        </figure>
      );

    default:
      return null;
  }
};

const BlogArticlePage = () => {
  const { slug } = useParams();
  const article = blogArticles.find(a => a.slug === slug);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  if (!article) return <Navigate to="/blog" replace />;

  const relatedPosts = article.relatedArticles
    ?.map(id => blogArticles.find(a => a.id === id))
    .filter(Boolean) || [];

  return (
    <>
      <Helmet>
        <title>{article.metaTitle}</title>
        <meta name="description" content={article.metaDescription} />
        <meta name="keywords" content={article.metaKeywords} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content={article.author} />
        <link rel="canonical" href={`https://kairoskine.fr/blog/${article.slug}`} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.metaDescription} />
        <meta property="og:url" content={`https://kairoskine.fr/blog/${article.slug}`} />
        <meta property="og:image" content={article.heroImage} />
        <meta property="og:locale" content="fr_FR" />
        <meta property="article:published_time" content={article.date} />
        <meta property="article:author" content={article.author} />

        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": article.title,
          "description": article.metaDescription,
          "image": article.heroImage,
          "datePublished": article.date,
          "author": {
            "@type": "Person",
            "name": article.author,
            "jobTitle": "Kinésithérapeute — Thérapie Manuelle & Dry Needling"
          },
          "publisher": {
            "@type": "Organization",
            "name": "KAIROS KINÉ",
            "url": "https://kairoskine.fr"
          },
          "mainEntityOfPage": `https://kairoskine.fr/blog/${article.slug}`
        })}</script>
      </Helmet>

      {/* Hero */}
      <section ref={ref} className="relative pt-28 md:pt-36 pb-0 bg-deep-black overflow-hidden">
        {/* Hero image */}
        <div className="absolute inset-0">
          <img
            src={article.heroImage}
            alt={article.heroAlt}
            className="w-full h-full object-cover opacity-20"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-black/60 via-deep-black/90 to-deep-black" />
        </div>

        <div className="container mx-auto px-6 md:px-8 relative z-10 pb-16 md:pb-24">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Link to="/blog" className="inline-flex items-center gap-2 text-off-white/40 hover:text-gold text-xs tracking-[0.15em] uppercase transition-colors duration-300 mb-8">
              <ArrowLeft className="size-3.5" />
              Retour au blog
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gold/10 border border-gold/20 text-gold text-[10px] tracking-[0.2em] uppercase font-semibold">
                <BookOpen className="size-3" />
                {article.category}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-off-white mb-6 leading-tight">
              {article.title}
            </h1>

            <p className="text-off-white/50 text-lg font-light leading-relaxed mb-8">
              {article.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-off-white/30 text-xs">
              <span className="flex items-center gap-2">
                <User className="size-3.5" />
                {article.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="size-3.5" />
                {new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="size-3.5" />
                {article.readTime} de lecture
              </span>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </section>

      {/* Article body */}
      <article className="py-12 md:py-20 bg-deep-black">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto">
            {article.sections.map((section, i) => (
              <SectionRenderer key={i} section={section} />
            ))}
          </div>
        </div>
      </article>

      {/* Tags */}
      <section className="pb-12 bg-deep-black">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="h-[1px] bg-gradient-to-r from-gold/20 to-transparent mb-8" />
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-anthracite border border-white/5 text-off-white/40 text-[10px] tracking-wider uppercase">
                  <Tag className="size-2.5" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related articles */}
      {relatedPosts.length > 0 && (
        <section className="py-16 md:py-24 bg-anthracite relative">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
          <div className="container mx-auto px-6 md:px-8">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-[1px] w-8 bg-gold/50" />
              <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-semibold">Articles liés</span>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
              {relatedPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group p-6 bg-deep-black border border-white/5 hover:border-gold/20 transition-all duration-500"
                  style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)' }}
                >
                  <span className="text-[9px] text-gold/60 tracking-[0.2em] uppercase font-semibold">{post.category}</span>
                  <h3 className="font-display text-xl font-bold text-off-white group-hover:text-gold transition-colors duration-300 mt-2 mb-3 leading-tight">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 text-gold/60 text-xs group-hover:text-gold group-hover:gap-3 transition-all duration-300">
                    Lire <ArrowRight className="size-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-deep-black relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 60%)' }} />
        <div className="container mx-auto px-6 md:px-8 text-center relative z-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-off-white mb-4">
            Besoin d'un <span className="gold-gradient-text">avis clinique</span> ?
          </h2>
          <p className="text-off-white/50 font-light mb-8 max-w-md mx-auto text-sm">
            Chaque douleur est unique. Prenez rendez-vous pour un bilan individuel de 30 minutes au cabinet de Brignais.
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

export default BlogArticlePage;
