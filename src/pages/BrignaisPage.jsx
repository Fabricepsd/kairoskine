import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import BrignaisHero from '@/components/brignais/BrignaisHero';
import BrignaisAbout from '@/components/brignais/BrignaisAbout';
import BrignaisTreatments from '@/components/brignais/BrignaisTreatments';
import DryNeedlingDetailedSection from '@/components/DryNeedlingDetailedSection';
import ManualTherapyDetailedSection from '@/components/ManualTherapyDetailedSection';
import BrignaisApproach from '@/components/brignais/BrignaisApproach';
import BrignaisPricing from '@/components/brignais/BrignaisPricing';
import GoogleReviews from '@/components/GoogleReviews';
import FAQ from '@/components/FAQ';
import BrignaisBooking from '@/components/brignais/BrignaisBooking';

const BrignaisPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      }
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <title>Kinésithérapeute Brignais, Lyon & Saint-Genis-Laval — Thérapie manuelle & Dry Needling | KAIROS KINÉ</title>
        <meta
          name="description"
          content="Kinésithérapeute spécialisé à Brignais, proche Lyon et Saint-Genis-Laval. Thérapie manuelle structurelle, dry needling. Traitement court 5-8 séances. Conventionné + dépassement HN. RDV en ligne."
        />
        <meta
          name="keywords"
          content="kinésithérapeute, kiné, brignais, Lyon, Saint-Genis-Laval, douleurs musculo-squelettiques, dry needling, thérapie manuelle, cervicalgie, sciatique, lombalgie, tendinopathie, NCB, dépassement honoraires, Fabrice Ponsoda, KAIROS"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Fabrice PONSODA — KAIROS KINÉ" />
        <link rel="canonical" href="https://kairoskine.fr" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="KAIROS KINÉ — Kinésithérapeute Brignais, Lyon & Saint-Genis-Laval" />
        <meta property="og:description" content="Thérapie manuelle, dry needling. Traitement court 5-8 séances. Prise en charge individuelle 30 min. Brignais, proche Lyon." />
        <meta property="og:url" content="https://kairoskine.fr" />
        <meta property="og:locale" content="fr_FR" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="KAIROS KINÉ — Kinésithérapeute Brignais & Lyon" />
        <meta name="twitter:description" content="Thérapie manuelle, dry needling. Traitement court 5-8 séances. Brignais, proche Lyon et Saint-Genis-Laval." />

        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["LocalBusiness", "HealthAndBeautyBusiness"],
          "name": "KAIROS KINÉ — Brignais",
          "description": "Cabinet de kinésithérapie spécialisé en thérapie manuelle structurelle et dry needling à Brignais, proche Lyon et Saint-Genis-Laval. Traitement court et intensif des douleurs musculo-squelettiques. Prise en charge individuelle 30 minutes.",
          "url": "https://kairoskine.fr",
          "telephone": "+33695703906",
          "priceRange": "€€",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "163 rue du Général de Gaulle",
            "addressLocality": "Brignais",
            "postalCode": "69530",
            "addressCountry": "FR",
            "addressRegion": "Auvergne-Rhône-Alpes"
          },
          "openingHours": "Mo-Fr 08:00-19:00",
          "sameAs": [
            "https://www.instagram.com/kairos.kine"
          ],
          "employee": {
            "@type": "Person",
            "name": "Fabrice PONSODA",
            "jobTitle": "Kinésithérapeute — Thérapie Manuelle Structurelle & Dry Needling",
            "description": "Kinésithérapeute diplômé, Master en Thérapie Manuelle Structurelle (UCL Louvain). Spécialisé en dry needling et thérapie manuelle.",
            "knowsAbout": [
              "kinésithérapie", "thérapie manuelle structurelle", "dry needling",
              "cervicalgie", "sciatique", "lombalgie", "tendinopathie", "NCB"
            ]
          },
          "serviceArea": [
            { "@type": "Place", "name": "Brignais, Rhône" },
            { "@type": "Place", "name": "Lyon" },
            { "@type": "Place", "name": "Saint-Genis-Laval" },
            { "@type": "Place", "name": "Oullins" },
            { "@type": "Place", "name": "Pierre-Bénite" },
            { "@type": "Place", "name": "Vourles" }
          ]
        })}</script>
      </Helmet>

      <BrignaisHero />
      <BrignaisAbout />
      <BrignaisTreatments />
      <DryNeedlingDetailedSection />
      <ManualTherapyDetailedSection />
      <BrignaisApproach />
      <BrignaisPricing />
      <GoogleReviews />
      <FAQ />
      <BrignaisBooking />
    </>
  );
};

export default BrignaisPage;
