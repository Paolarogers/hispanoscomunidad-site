import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SEO, buildTitle, buildDescription, buildCanonical } from '../../config/seo.config.js';
import { SITE } from '../../config/site.config.js';
import { LOCATIONS } from '../../config/locations.config.js';
import { BRANDS } from '../../config/brands.config.js';

function buildLocalBusinessSchema(brand, locations) {
  if (!locations || locations.length === 0) return null;
  return locations.map(loc => ({
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: brand.name,
    url: `https://${brand.domain}`,
    telephone: loc.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: loc.address,
      addressLocality: loc.city,
      addressRegion: loc.state,
      postalCode: loc.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: loc.lat,
      longitude: loc.lng,
    },
    openingHours: 'Mo-Fr 09:00-18:00',
    areaServed: { '@type': 'State', name: 'South Carolina' },
    sameAs: [SITE.instagram, SITE.facebook, SITE.youtube],
  }));
}

function buildOrgSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Hispanos Comunidad',
    url: SITE.url,
    logo: `${SITE.url}/images/brands/hc-logo.png`,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1415 Laurens Road, Suite B',
      addressLocality: 'Greenville',
      addressRegion: 'SC',
      postalCode: '29609',
      addressCountry: 'US',
    },
    sameAs: [SITE.instagram, SITE.facebook, SITE.youtube],
    description: 'La organización más completa para familias y empresarios latinos en Upstate South Carolina.',
  };
}

export default function SEOHead({ lang = 'es', customTitle, customDescription, customImage }) {
  const location = useLocation();
  const route = location.pathname;

  const title = customTitle || buildTitle(route, lang);
  const description = customDescription || buildDescription(route, lang);
  const canonical = buildCanonical(route);
  const image = customImage || (SEO[route]?.image) || '/images/hero/hc-hero-main.jpg';

  const isBonanza = route.startsWith('/bonanza');
  const isOrg = route === '/';

  const schemas = [];
  if (isOrg) schemas.push(buildOrgSchema());
  if (isBonanza) {
    const bonanzaSchemas = buildLocalBusinessSchema(BRANDS.bonanza, LOCATIONS);
    if (bonanzaSchemas) schemas.push(...bonanzaSchemas);
  }

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Hreflang */}
      <link rel="alternate" hreflang="es" href={`${SITE.url}/es${route}`} />
      <link rel="alternate" hreflang="en" href={`${SITE.url}/en${route}`} />
      <link rel="alternate" hreflang="x-default" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={`${SITE.url}${image}`} />
      <meta property="og:locale" content={lang === 'es' ? 'es_US' : 'en_US'} />
      <meta property="og:locale:alternate" content={lang === 'es' ? 'en_US' : 'es_US'} />
      <meta property="og:site_name" content="Hispanos Comunidad" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE.url}${image}`} />

      {/* Schema.org JSON-LD */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
