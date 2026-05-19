import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CONSENT_KEY = 'kairos_cookie_consent';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      // Show banner after 1.5s delay (less intrusive)
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    } else if (consent === 'accepted') {
      enableAnalytics();
    }
    // If 'declined', analytics stay disabled
  }, []);

  const enableAnalytics = () => {
    // GA4 is already loaded in index.html, we just allow it to track
    window.gtag?.('consent', 'update', {
      analytics_storage: 'granted',
    });
  };

  const disableAnalytics = () => {
    window.gtag?.('consent', 'update', {
      analytics_storage: 'denied',
    });
  };

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    enableAnalytics();
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    disableAnalytics();
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6"
        >
          <div
            className="max-w-3xl mx-auto bg-anthracite/98 backdrop-blur-lg border border-white/10 p-5 md:p-6 shadow-2xl"
            style={{ clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))' }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <p className="text-off-white/80 text-sm font-light leading-relaxed">
                  Ce site utilise des cookies pour mesurer l'audience (Google Analytics) et améliorer votre expérience.{' '}
                  <a href="/confidentialite" className="text-gold hover:text-gold-light underline underline-offset-2 transition-colors">
                    Politique de confidentialité
                  </a>
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={handleDecline}
                  className="px-4 py-2 text-off-white/40 hover:text-off-white/70 text-xs uppercase tracking-wider font-medium transition-colors duration-300"
                >
                  Refuser
                </button>
                <button
                  onClick={handleAccept}
                  className="px-5 py-2.5 bg-gold text-deep-black text-xs uppercase tracking-[0.1em] font-bold hover:bg-gold-light transition-colors duration-300"
                  style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}
                >
                  Accepter
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
