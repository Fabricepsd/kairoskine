import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-deep-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/4 right-[20%] w-[400px] h-[400px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[10%] w-[300px] h-[300px] rounded-full bg-gold/3 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* 404 */}
          <h1 className="font-display text-[120px] sm:text-[160px] md:text-[200px] font-bold leading-none tracking-tight gold-gradient-text mb-2">
            404
          </h1>

          <p className="text-off-white/50 text-lg md:text-xl font-light mb-2">
            Cette page n'existe pas.
          </p>
          <p className="text-off-white/30 text-sm font-light mb-10 max-w-md mx-auto">
            La page que vous cherchez a peut-être été déplacée ou supprimée.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-gold text-deep-black px-8 py-4 font-bold uppercase tracking-[0.12em] text-sm transition-all duration-300 hover:bg-gold-light"
              style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}
            >
              <Home className="size-4" />
              Retour à l'accueil
            </Link>

            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-off-white/50 hover:text-gold text-sm uppercase tracking-[0.15em] font-medium transition-colors duration-300"
            >
              <ArrowLeft className="size-4" />
              Voir le blog
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NotFoundPage;
