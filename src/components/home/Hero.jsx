import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage.js';
import { WHATSAPP } from '../../config/site.config.js';

export default function Hero() {
  const { lang, text } = useLanguage();

  const brands = [
    {
      path: '/bonanza',
      logo: '/images/logos/bonanza/bql-horizontal.png',
      label_es: 'Préstamos',
      label_en: 'Loans',
      desc_es: 'Préstamos personales, sobre título y negocios. Sin SSN.',
      desc_en: 'Personal, title & business loans. No SSN required.',
    },
    {
      path: '/zivo',
      logo: '/images/logos/zivo/zivo-horizontal.png',
      label_es: 'Seguros',
      label_en: 'Insurance',
      desc_es: 'Auto, comercial, hogar y vida. Sin número de seguro social.',
      desc_en: 'Auto, commercial, home & life. No social security needed.',
    },
    {
      path: '/media',
      logo: '/images/logos/media/media-logo-horizontal.png',
      label_es: 'Negocios',
      label_en: 'Business',
      desc_es: 'Marketing, tecnología, consultoría y educación empresarial.',
      desc_en: 'Marketing, technology, consulting & business education.',
    },
    {
      path: '/unidos',
      logo: '/images/logos/unidos/unidos-logo-horizontal.png',
      label_es: 'Comunidad',
      label_en: 'Community',
      desc_es: 'Organización sin fines de lucro. Recursos para familias latinas.',
      desc_en: 'Nonprofit supporting Latino families in South Carolina.',
    },
  ];

  return (
    <section className="hero">
      <div className="hero__bg">
        <img
          src="/images/hero/hc-hero-family.png"
          alt=""
          className="hero__family-bg"
          aria-hidden="true"
          loading="eager"
          fetchpriority="high"
        />
        <div className="hero__overlay"/>
      </div>

      <div className="hero__content">

        <div className="hero__eyebrow-wrap">
          <img
            src="/images/logos/hc-logo-seal-transparent.png"
            alt="HC"
            className="hero__seal"
            onError={e => { e.target.style.display = 'none'; }}
          />
          <span className="hero__eyebrow">
            Hispanos Comunidad · Greenville, SC
          </span>
        </div>

        <h1 className="hero__headline">
          {text('Todo lo que tu familia', 'Everything your family')}<br/>
          {text('necesita para prosperar.', 'needs to thrive.')}<br/>
          <em>{text('En un solo lugar.', 'In one place.')}</em>
        </h1>

        <p className="hero__tagline">
          {text('Servicios Esenciales para la Comunidad Latina', 'Essential Services for the Latino Community')}
        </p>

        <p className="hero__body">
          {text(
            'Préstamos, seguros, educación empresarial, y tecnología — sin barreras de idioma, sin discriminación por documentación.',
            'Loans, insurance, business education, and technology — without language barriers, without documentation discrimination.'
          )}
        </p>

        {/* Brand cards — logo + short descriptor */}
        <div className="hero__brands">
          {brands.map((b, i) => (
            <Link key={i} to={b.path} className="hero__brand-card">
              <div className="hero__brand-logo-wrap">
                <img
                  src={b.logo}
                  alt={lang === 'es' ? b.label_es : b.label_en}
                  className="hero__brand-logo"
                  onError={e => { e.target.style.display = 'none'; }}
                />
              </div>
              <p className="hero__brand-desc">
                {lang === 'es' ? b.desc_es : b.desc_en}
              </p>
            </Link>
          ))}
        </div>

        <div className="hero__actions">
          <a href={WHATSAPP.general} target="_blank" rel="noopener noreferrer" className="hero__btn-primary">
            {text('Hablar con nosotros', 'Talk to us')}
          </a>
          <Link to="/nosotros" className="hero__btn-outline">
            {text('Conocer al equipo', 'Meet the team')}
          </Link>
        </div>

        <div className="hero__trust">
          {[
            { es: '20,000+ préstamos', en: '20,000+ loans' },
            { es: '5,000+ familias aseguradas', en: '5,000+ insured families' },
            { es: '13 años en SC', en: '13 years in SC' },
            { es: '100% en español', en: '100% in Spanish' },
          ].map((t, i) => (
            <span key={i} className="hero__trust-item">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="6" fill="#e2af30" opacity="0.3"/>
                <path d="M3 6l2 2 4-4" stroke="#e2af30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {lang === 'es' ? t.es : t.en}
            </span>
          ))}
        </div>

      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: var(--nav-height);
          overflow: hidden;
          background: linear-gradient(135deg, #0d1e30 0%, #1a3560 100%);
        }

        .hero__bg { position: absolute; inset: 0; pointer-events: none; }

        .hero__family-bg {
          position: absolute;
          top: var(--nav-height);
          right: 0;
          height: calc(100% - var(--nav-height));
          width: auto;
          object-fit: contain;
          object-position: right top;
        }

        .hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(13,30,48,1.0)  0%,
            rgba(13,30,48,1.0)  28%,
            rgba(13,30,48,0.82) 42%,
            rgba(13,30,48,0.22) 60%,
            rgba(13,30,48,0.0)  74%
          );
          z-index: 1;
        }

        /* ── Content column ── */
        .hero__content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: var(--space-xl) 48px var(--space-xl) max(32px, calc((100vw - 1280px) / 2 + 32px));
          min-height: calc(100vh - var(--nav-height));
          width: min(52%, 680px);
        }

        /* Eyebrow */
        .hero__eyebrow-wrap {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
        }
        .hero__seal {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: white;
          padding: 4px;
          flex-shrink: 0;
          object-fit: contain;
        }
        .hero__eyebrow {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #e2af30;
        }

        /* Headline */
        .hero__headline {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 3.2vw, 3.4rem);
          font-weight: 700;
          color: #fdfaf5;
          line-height: 1.08;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }
        .hero__headline em {
          color: #e2af30;
          font-style: normal;
          font-weight: 300;
          white-space: nowrap;
        }

        .hero__tagline {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 12px;
        }

        .hero__body {
          font-size: 0.9rem;
          color: rgba(253,249,245,0.68);
          line-height: 1.8;
          margin-bottom: 28px;
          max-width: 420px;
        }

        /* ── Brand cards ── */
        .hero__brands {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          margin-bottom: 28px;
        }
        .hero__brand-card {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 12px 10px 14px;
          background: rgba(255,255,255,0.10);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 10px;
          text-decoration: none;
          transition: transform 0.2s ease, background 0.2s ease;
        }
        .hero__brand-card:hover {
          transform: translateY(-3px);
          background: rgba(255,255,255,0.16);
        }
        .hero__brand-logo-wrap {
          height: 34px;
          display: flex;
          align-items: center;
        }
        .hero__brand-logo {
          height: 100%;
          width: auto;
          max-width: 100%;
          object-fit: contain;
          object-position: left center;
        }
        .hero__brand-desc {
          font-size: 0.61rem;
          color: rgba(255,255,255,0.68);
          line-height: 1.55;
          margin: 0;
        }

        /* ── CTA buttons ── */
        .hero__actions {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .hero__btn-primary {
          display: inline-flex;
          align-items: center;
          background: #e2af30;
          color: #1f4268;
          font-weight: 800;
          font-size: 0.72rem;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          padding: 13px 26px;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.2s;
        }
        .hero__btn-primary:hover { background: #f0c040; }
        .hero__btn-outline {
          display: inline-flex;
          align-items: center;
          border: 1.5px solid rgba(255,255,255,0.28);
          color: #fdfaf5;
          font-size: 0.8rem;
          padding: 13px 26px;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.2s;
        }
        .hero__btn-outline:hover { background: rgba(255,255,255,0.08); }

        /* ── Trust bar — single row ── */
        .hero__trust {
          display: flex;
          gap: 18px;
          flex-wrap: nowrap;
          overflow-x: auto;
        }
        .hero__trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.7rem;
          font-weight: 500;
          color: rgba(255,255,255,0.45);
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* ── Mobile ── */
        @media (max-width: 900px) {
          .hero__content { width: 100%; padding: 48px 24px; }
          .hero__family-bg { opacity: 0.18; width: 100%; object-fit: cover; }
          .hero__overlay { background: rgba(13,30,48,0.9); }
          .hero__brands { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .hero__brands { grid-template-columns: 1fr 1fr; }
          .hero__trust { flex-wrap: wrap; gap: 10px; }
        }
      `}</style>
    </section>
  );
}
