import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, Database, UserCheck, ShieldCheck, Mail } from 'lucide-react';
import { Helmet } from 'react-helmet';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Database,
      title: "Collecte des données",
      content: (
        <p>
          Nous collectons uniquement les données strictement nécessaires au bon fonctionnement de nos services et à la gestion de la relation patient. Cela inclut notamment : nom, prénom, coordonnées (email, téléphone) lors de la prise de rendez-vous ou de la prise de contact.
        </p>
      )
    },
    {
      icon: Eye,
      title: "Finalités du traitement",
      content: (
        <div className="space-y-2">
          <p>Les données collectées sont utilisées pour :</p>
          <ul className="list-disc pl-5 space-y-1 text-off-white/70">
            <li>La gestion et la confirmation de vos rendez-vous.</li>
            <li>La communication d'informations relatives à vos soins ou au fonctionnement du cabinet.</li>
            <li>L'amélioration de nos services et de votre expérience utilisateur.</li>
          </ul>
        </div>
      )
    },
    {
      icon: Lock,
      title: "Conservation des données",
      content: (
        <p>
          Vos données personnelles sont conservées uniquement le temps nécessaire à la réalisation des finalités pour lesquelles elles ont été collectées, et dans le respect des obligations légales en vigueur applicables aux professionnels de santé.
        </p>
      )
    },
    {
      icon: UserCheck,
      title: "Vos Droits (RGPD)",
      content: (
        <div className="space-y-2">
          <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :</p>
          <ul className="list-disc pl-5 space-y-1 text-off-white/70">
            <li>Droit d'accès et de rectification de vos données.</li>
            <li>Droit à l'effacement ("droit à l'oubli").</li>
            <li>Droit à la limitation du traitement.</li>
            <li>Droit à la portabilité de vos données.</li>
          </ul>
        </div>
      )
    },
    {
      icon: ShieldCheck,
      title: "Sécurité et Partage",
      content: (
        <div className="space-y-2">
          <p className="font-medium text-gold">Confidentialité absolue :</p>
          <p>
            Nous nous engageons formellement à ne jamais vendre, louer ou partager vos données personnelles à des tiers à des fins commerciales.
          </p>
          <p>
            Des mesures de sécurité techniques et organisationnelles sont mises en œuvre pour protéger vos données contre tout accès non autorisé, perte ou altération.
          </p>
        </div>
      )
    },
    {
      icon: Mail,
      title: "Contact",
      content: (
        <p>
          Pour exercer vos droits ou pour toute question relative à notre politique de confidentialité, vous pouvez nous contacter directement par email à l'adresse suivante : <a href="mailto:ponsoda.fabrice@gmail.com" className="text-gold hover:underline">ponsoda.fabrice@gmail.com</a>
        </p>
      )
    }
  ];

  return (
    <>
      <Helmet>
        <title>Politique de Confidentialité - KAIROS KINE</title>
        <meta name="description" content="Politique de confidentialité de KAIROS KINE. Détails sur la collecte, le traitement et la protection de vos données personnelles." />
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
              Politique de Confidentialité
            </h1>
            <div className="h-1 w-24 bg-gold mx-auto rounded-full"></div>
            <p className="mt-6 text-off-white/60 font-light">
              Votre confiance est notre priorité. Voici comment nous protégeons vos données.
            </p>
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

export default PrivacyPolicy;