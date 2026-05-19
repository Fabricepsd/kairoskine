import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { Helmet } from 'react-helmet';

/**
 * Breadcrumb component with JSON-LD schema for SEO.
 * items: [{ label: string, to?: string }]
 * The last item is the current page (no link).
 */
const Breadcrumbs = ({ items }) => {
  const schemaItems = items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.label,
    ...(item.to ? { "item": `https://www.kairoskine.fr${item.to}` } : {}),
  }));

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": schemaItems,
        })}</script>
      </Helmet>

      <nav aria-label="Fil d'Ariane" className="flex items-center gap-1.5 text-[11px] text-off-white/30 flex-wrap">
        {items.map((item, index) => (
          <span key={index} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight className="size-3 text-off-white/15" />}
            {index === 0 && <Home className="size-3" />}
            {item.to && index < items.length - 1 ? (
              <Link
                to={item.to}
                className="hover:text-gold transition-colors duration-300 tracking-wider uppercase"
              >
                {item.label}
              </Link>
            ) : (
              <span className={index === items.length - 1 ? 'text-off-white/50 tracking-wider uppercase' : 'tracking-wider uppercase'}>
                {item.label}
              </span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
};

export default Breadcrumbs;
