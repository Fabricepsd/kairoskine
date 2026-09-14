/**
 * NAP — Name, Address, Phone
 * Source unique de vérité pour les données du cabinet.
 *
 * Pour changer l'adresse, modifiez UNIQUEMENT ce fichier.
 *
 * ⚠️  Exception : src/data/blogArticles.js mentionne l'ancienne adresse dans le
 *     corps d'un article existant. Ce fichier est figé (contenu éditorial validé) ;
 *     mettre à jour manuellement l'occurrence si nécessaire après une relocalisation.
 */

export const NAP = {
  // Identité
  brandName: 'KAIROS KINÉ',
  practitionerName: 'Fabrice PONSODA',
  practitionerTitle: 'Kinésithérapeute',

  // Adresse
  streetAddress: '50 avenue Chanoine Cartellier',
  postalCode: '69230',
  city: 'Saint-Genis-Laval',
  country: 'FR',
  region: 'Auvergne-Rhône-Alpes',

  // Coordonnées géographiques (Saint-Genis-Laval)
  geoLat: 45.6936,
  geoLng: 4.7896,

  // Contact
  phoneRaw: '+33695703906',       // format E.164 (tel: href, JSON-LD)
  phoneDisplay: '06 95 70 39 06', // format affiché
  email: 'ponsoda.fabrice@gmail.com',

  // Web
  siteUrl: 'https://www.kairoskine.fr',
  doctolibUrl: 'https://www.doctolib.fr/masseur-kinesitherapeute/lyon/fabrice-ponsoda',
  instagramHandle: '@kairos.kine',
  instagramUrl: 'https://www.instagram.com/kairos.kine?igsh=anh5ejNkZDQ2NjM%3D&utm_source=qr',

  // Tarifs
  conventionFee: '~17 €',
  overrunFee: '30 €',
  totalFee: '~47-50 €',
};

/** Adresse complète sur une ligne (UI + aria-label) */
export const NAP_ADDRESS_INLINE = `${NAP.streetAddress}, ${NAP.postalCode} ${NAP.city}`;

/** Objet PostalAddress pour JSON-LD */
export const NAP_POSTAL_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: NAP.streetAddress,
  addressLocality: NAP.city,
  postalCode: NAP.postalCode,
  addressCountry: NAP.country,
  addressRegion: NAP.region,
};
