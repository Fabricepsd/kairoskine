import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Scale, FileText, Server, Shield, AlertCircle } from 'lucide-react';
import { Helmet } from 'react-helmet';

const LegalNotices = () => {
  const sections = [
    {
      icon: FileText,
      title: "Informations Légales",
      content: (
        <div className="space-y-2">
          <p><span className="text-gold font-medium">Nom commercial :</span> Fabrice PONSODA</p>
          <p><span className="text-gold font-medium">Statut :</span> Entrepreneur individuel (Auto-entrepreneur)</p>
          <p><span className="text-gold font-medium">Activité :</span> Kinésithérapeute libéral</p>
          <p><span className="text-gold font-medium">Adresse :</span> LE QG CROSSFIT, ZA TAUPINIERE, Le Diamant, 97223</p>
          <p><span className="text-gold font-medium">Email :</span> ponsoda.fabrice@gmail.com</p>
        </div>
      )
    },
    {
      icon: Shield,
      title: "Responsable de la publication",
      content: (
        <p>
          Le responsable de la publication du site est <span className="text-white font-medium">Fabrice PONSODA</span>, en sa qualité de propriétaire et gestionnaire de l'activité.
        </p>
      )
    },
    {
      icon: Server,
      title: "Hébergement",
      content: (
        <p>
          Ce site est hébergé par une plateforme de services cloud tiers (Vercel / Netlify ou équivalent selon déploiement), dont les serveurs sont situés dans le respect des normes de sécurité en vigueur.
        </p>
      )
    },
    {
      icon: Scale,
      title: "Propriété Intellectuelle",
      content: (
        <div className="space-y-4">
          <p>
            L'ensemble des éléments figurant sur ce site (textes, images, logos, charte graphique) est la propriété exclusive de Fabrice PONSODA ou fait l'objet d'une autorisation d'utilisation.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable.
          </p>
        </div>
      )
    },
    {
      icon: AlertCircle,
      title: "Responsabilité",
      content: (
        <div className="space-y-4">
          <p>
            Fabrice PONSODA s'efforce de fournir sur ce site des informations aussi précises que possible. Toutefois, il ne pourra être tenu responsable des oublis, des inexactitudes et des carences dans la mise à jour.
          </p>
          <p>
            Les informations données sur ce site le sont à titre indicatif et ne remplacent en aucun cas une consultation médicale ou l'avis d'un professionnel de santé.
          </p>
        </div>
      )
    }
  ];

  return (
    <>
      <Helmet>
        <title>Mentions Légales - KAIROS KINE</title>
        <meta name="description" content="Mentions légales du site KAIROS KINE. Informations sur l'éditeur, l'hébergement et la propriété intellectuelle." />
      </Helmet>

      <div className="bg-deep-black min-h-screen pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-gold uppercase tracking-wide mb-6">
              Mentions Légales
            </h1>
            <div className="h-1 w-24 bg-gold mx-auto rounded-full"></div>
          </motion.div>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-anthracite/50 border border-white/5 rounded-lg p-6 md:p-8 hover:border-gold/30 transition-colors duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-deep-black p-3 rounded-full border border-white/10 text-gold shrink-0">
                    <section.icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide pt-2">
                    {section.title}
                  </h2>
                </div>
                <div className="pl-0 md:pl-[4.5rem] text-off-white/80 font-light leading-relaxed">
                  {section.content}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LegalNotices;