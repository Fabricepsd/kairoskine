import React from 'react';
import { Instagram, MapPin, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NAP } from '@/config/nap';

const Footer = () => {
  return (
    <footer className="bg-anthracite relative w-full overflow-hidden">
      {/* Top gold separator */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Background decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full bg-gold/5 blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-8 py-16 md:py-20 relative z-10">

        {/* Logo centered */}
        <div className="text-center mb-14">
          <div className="flex flex-col items-center gap-3">
            <img
              src="/logo-kairos.jpg"
              alt="KAIROS KINÉ logo"
              className="h-16 w-16 rounded-full object-cover shadow-[0_0_20px_rgba(212,175,55,0.15)]"
            />
            <div>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-off-white tracking-[0.1em] uppercase mb-0.5">
                KAIROS KINÉ
              </h3>
              <p className="text-gold/60 text-[10px] tracking-[0.4em] uppercase font-sans">
                {NAP.city}
              </p>
            </div>
          </div>
          <div className="mx-auto mt-6 h-[1px] w-16 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        </div>

        {/* Info grid */}
        <div className="grid md:grid-cols-3 gap-10 md:gap-6 mb-14 text-center md:text-left">

          {/* Location */}
          <div className="flex flex-col md:items-start items-center gap-3">
            <div className="flex items-center gap-2 text-gold text-[10px] tracking-[0.25em] uppercase font-semibold mb-2">
              <div className="h-[1px] w-6 bg-gold/50" />
              Localisation
            </div>
            <div className="flex items-start gap-3 text-off-white/50">
              <MapPin className="size-4 text-gold mt-0.5 shrink-0" />
              <span className="text-sm font-light leading-relaxed">
                {NAP.streetAddress}<br />
                {NAP.postalCode} {NAP.city}
              </span>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col md:items-start items-center gap-3">
            <div className="flex items-center gap-2 text-gold text-[10px] tracking-[0.25em] uppercase font-semibold mb-2">
              <div className="h-[1px] w-6 bg-gold/50" />
              Contact
            </div>
            <a
              href={`mailto:${NAP.email}`}
              className="flex items-center gap-3 text-off-white/50 hover:text-gold transition-colors duration-300 group"
            >
              <Mail className="size-4 text-gold shrink-0" />
              <span className="text-sm font-light break-all">{NAP.email}</span>
            </a>
            <a
              href={`tel:${NAP.phoneRaw}`}
              className="flex items-center gap-3 text-off-white/50 hover:text-gold transition-colors duration-300"
            >
              <Phone className="size-4 text-gold shrink-0" />
              <span className="text-sm font-light">{NAP.phoneDisplay}</span>
            </a>
          </div>

          {/* Social + Blog */}
          <div className="flex flex-col md:items-start items-center gap-3">
            <div className="flex items-center gap-2 text-gold text-[10px] tracking-[0.25em] uppercase font-semibold mb-2">
              <div className="h-[1px] w-6 bg-gold/50" />
              Réseaux
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.instagram.com/kairos.kine?igsh=anh5ejNkZDQ2NjM%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-off-white/50 hover:text-gold transition-colors duration-300 group"
              >
                <Instagram className="size-4 text-gold shrink-0" />
                <span className="text-sm font-light">@kairos.kine</span>
              </a>
              <Link
                to="/blog"
                className="flex items-center gap-3 text-off-white/50 hover:text-gold transition-colors duration-300"
              >
                <span className="size-4 text-gold shrink-0 text-center text-xs font-bold">✎</span>
                <span className="text-sm font-light">Blog</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
          <p className="text-white/20 text-xs tracking-wider font-light">
            © {new Date().getFullYear()} KAIROS KINÉ. Tous droits réservés.
          </p>
          <div className="flex gap-6 flex-wrap justify-center">
            <Link to="/entreprises" className="text-gold/40 hover:text-gold text-xs transition-colors duration-300 tracking-wider font-medium">
              Entreprises
            </Link>
            <Link to="/blog" className="text-white/25 hover:text-gold text-xs transition-colors duration-300 tracking-wider">
              Blog
            </Link>
            <Link to="/mentions-legales" className="text-white/25 hover:text-gold text-xs transition-colors duration-300 tracking-wider">
              Mentions légales
            </Link>
            <Link to="/confidentialite" className="text-white/25 hover:text-gold text-xs transition-colors duration-300 tracking-wider">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;