import { SITE } from './site.config.js';

export const SEO = {
  '/': {
    title_es: 'Hispanos Comunidad — Préstamos, Seguros, Tecnología y Comunidad en Greenville SC',
    title_en: 'Hispanos Comunidad — Loans, Insurance, Technology & Community in Greenville SC',
    description_es: 'La organización más completa para familias y empresarios latinos en Upstate South Carolina. Bonanza Quick Loans, Zivo Insurance, HC Business & Media, e Hispanics United.',
    description_en: 'The most complete organization for Latino families and entrepreneurs in Upstate South Carolina. Bonanza Quick Loans, Zivo Insurance, HC Business & Media, and Hispanics United.',
    schema: 'Organization',
    image: '/images/hero/hc-hero-main.jpg',
  },
  '/bonanza': {
    title_es: 'Bonanza Quick Loans — Préstamos Rápidos Sin SSN en Greenville SC',
    title_en: 'Bonanza Quick Loans — Fast Loans No SSN Required Greenville SC',
    description_es: 'Préstamos personales, sobre título y para negocios desde $601 hasta $35,000. Aprobación en menos de 24 horas. Sin seguro social. 6 oficinas en Upstate SC.',
    description_en: 'Personal, title, and business loans from $601 to $35,000. Approval in less than 24 hours. No social security number. 6 offices in Upstate SC.',
    schema: 'FinancialService',
    image: '/images/brands/bonanza/og-image.jpg',
    keywords_es: 'préstamos Greenville SC, préstamos sin SSN Carolina del Sur, préstamo sobre título Greenville, préstamos latinos South Carolina',
    keywords_en: 'loans Greenville SC, loans no SSN South Carolina, title loans Greenville, Latino loans South Carolina',
  },
  '/zivo': {
    title_es: 'Zivo Insurance — Seguro de Auto y Comercial Sin Seguro Social SC y NC',
    title_en: 'Zivo Insurance — Auto and Commercial Insurance No Social Security SC and NC',
    description_es: 'Seguros de auto, hogar, comercial y vida para inmigrantes. Con licencia internacional, ITIN o pasaporte. Autorizado en SC y NC. Estatus Diamond con Progressive.',
    description_en: 'Auto, home, commercial and life insurance for immigrants. With international license, ITIN or passport. Licensed in SC and NC. Diamond status with Progressive.',
    schema: 'InsuranceAgency',
    image: '/images/brands/zivo/og-image.jpg',
    keywords_es: 'seguro sin seguro social Greenville, seguro auto inmigrante SC, Zivo Insurance, seguro latino South Carolina',
    keywords_en: 'insurance no social security Greenville, immigrant auto insurance SC, Zivo Insurance, Latino insurance South Carolina',
  },
  '/media': {
    title_es: 'HC Business & Media — Marketing, Tecnología y Educación para Negocios Latinos',
    title_en: 'HC Business & Media — Marketing, Technology and Education for Latino Businesses',
    description_es: 'Agencia de marketing digital, estudio de producción, plataforma HC Business 360, talleres Ruta Empresarial y consultoría CLARITY para empresarios latinos.',
    description_en: 'Digital marketing agency, production studio, HC Business 360 platform, Ruta Empresarial workshops, and CLARITY consulting for Latino entrepreneurs.',
    schema: 'MarketingAgency',
    image: '/images/brands/media/og-image.jpg',
  },
  '/unidos': {
    title_es: 'Hispanics United of SC — Organización Sin Fines de Lucro para la Comunidad Latina',
    title_en: 'Hispanics United of SC — Nonprofit Organization for the Latino Community',
    description_es: 'Autofinanciada desde el primer día. 23,000+ familias servidas, 5,000+ exámenes de salud, 2,000+ graduados de talleres. Socio de Bon Secours y Anderson School District.',
    description_en: 'Self-funded from day one. 23,000+ families served, 5,000+ health screenings, 2,000+ workshop graduates. Partner of Bon Secours and Anderson School District.',
    schema: 'NGO',
    image: '/images/brands/unidos/og-image.jpg',
  },
};

export function buildTitle(route, lang = 'es') {
  const page = SEO[route] || SEO['/'];
  return lang === 'es' ? page.title_es : page.title_en;
}

export function buildDescription(route, lang = 'es') {
  const page = SEO[route] || SEO['/'];
  return lang === 'es' ? page.description_es : page.description_en;
}

export function buildCanonical(route) {
  return `${SITE.url}${route}`;
}
