import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage.js';
import { WHATSAPP } from '../../config/site.config.js';

export default function Hero() {
  const { lang, text } = useLanguage();

  const brands = [
    {
      path: '/bonanza',
      logo: '/images/logos/bonanza/bql-horizontal-transparent.png',
      color: '#1a3568',
      desc_es: 'Préstamos personales, sobre título y negocios. Sin SSN.',
      desc_en: 'Personal, title & business loans. No SSN required.',
    },
    {
      path: '/zivo',
      logo: '/images/logos/zivo/zivo-horizontal-transparent.png',
      color: '#005a8e',
      desc_es: 'Auto, comercial, hogar y vida. Sin número de seguro social.',
      desc_en: 'Auto, commercial, home & life. No social security needed.',
    },
    {
      path: '/media',
      logo: '/images/logos/media/media-logo-horizontal.png',
      color: '#132f5e',
      desc_es: 'Marketing, tecnología, consultoría y educación empresarial.',
      desc_en: 'Marketing, technology, consulting & business education.',
    },
    {
      path: '/unidos',
      logo: '/images/logos/unidos/unidos-logo-horizontal.png',
      color: '#015371',
      desc_es: 'Organización sin fines de lucro. Recursos para familias latinas.',
      desc_en: 'Nonprofit supporting Latino families in South Carolina.',
    },
  ];

  const trust = [
    { es: '20,000+ préstamos', en: '20,000+ loans' },
    { es: '5,000+ familias aseguradas', en: '5,000+ families insured' },
    { es: '13 años en SC', en: '13 years in SC' },
    { es: '100% en español', en: '100% in Spanish' },
  ];

  const openChat = () => {
    if (window.$zoho?.salesiq?.floatwindow) {
      window.$zoho.salesiq.floatwindow.visible('show');
    }
  };

  return (
    <section className="hero">
      <div className="hero__bg">
        <img src="/images/hero/hc-hero-family.png" alt="" className="hero__family-bg"
          aria-hidden="true" loading="eager" fetchpriority="high" />
        <div className="hero__overlay"/>
      </div>

      <div className="hero__content">

        {/* ── TOP: eyebrow + headline + body ── */}
        <div className="hero__top">
          <div className="hero__eyebrow-wrap">
            <img src="/images/logos/hc-logo-seal-transparent.png" alt="HC"
              className="hero__seal" onError={e => { e.target.style.display='none'; }} />
            <span className="hero__eyebrow">Hispanos Comunidad · Greenville, SC</span>
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
        </div>

        {/* ── MIDDLE: brand cards ── */}
        <div className="hero__brands">
          {brands.map((b, i) => (
            <Link key={i} to={b.path} className="hero__brand-card" style={{'--bc': b.color}}>
              <div className="hero__brand-logo-wrap">
                <img src={b.logo} alt="" className="hero__brand-logo"
                  onError={e => { e.target.style.display='none'; }} />
              </div>
              <p className="hero__brand-desc">{lang === 'es' ? b.desc_es : b.desc_en}</p>
            </Link>
          ))}
        </div>

        {/* ── BOTTOM: CTAs + trust + chat ── */}
        <div className="hero__bottom">
          <div className="hero__actions">
            <a href={WHATSAPP.general} target="_blank" rel="noopener noreferrer"
              className="hero__btn-primary">
              {text('Hablar con nosotros', 'Talk to us')}
            </a>
            <Link to="/nosotros" className="hero__btn-outline">
              {text('Conocer al equipo', 'Meet the team')}
            </Link>
          </div>

          <div className="hero__trust-row">
            {trust.map((t, i) => (
              <span key={i} className="hero__trust-item">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="6" fill="#e2af30" opacity="0.3"/>
                  <path d="M3 6l2 2 4-4" stroke="#e2af30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {lang === 'es' ? t.es : t.en}
              </span>
            ))}
            <button className="hero__chat-btn" onClick={openChat}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm4 11H8a1 1 0 010-2h8a1 1 0 010 2zm-2-3H8a1 1 0 010-2h6a1 1 0 010 2z"/>
              </svg>
              {text('¿Necesitas ayuda?', 'Need help?')}
            </button>
          </div>
        </div>

      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: stretch;
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
          position: absolute; inset: 0;
          background: linear-gradient(90deg,
            rgba(13,30,48,1.0) 0%, rgba(13,30,48,1.0) 28%,
            rgba(13,30,48,0.82) 42%, rgba(13,30,48,0.22) 60%,
            rgba(13,30,48,0.0) 74%);
          z-index: 1;
        }

        /* Content column — centered, tight grouping */
        .hero__content {
          position: relative; z-index: 2;
          display: flex; flex-direction: column;
          justify-content: center;
          gap: 28px;
          padding: 44px 48px 44px max(32px, calc((100vw - 1280px) / 2 + 32px));
          min-height: calc(100vh - var(--nav-height));
          width: min(58%, 760px);
        }

        /* TOP */
        .hero__top { display: flex; flex-direction: column; gap: 0; }
        .hero__eyebrow-wrap { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
        .hero__seal {
          width: 64px; height: 64px; border-radius: 50%;
          background: white; padding: 4px; flex-shrink: 0; object-fit: contain;
        }
        .hero__eyebrow {
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase; color: #e2af30;
        }
        .hero__headline {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 3.2vw, 3.5rem);
          font-weight: 700; color: #fdfaf5;
          line-height: 1.08; margin-bottom: 14px; letter-spacing: -0.02em;
        }
        .hero__headline em {
          color: #e2af30; font-style: normal;
          font-weight: 300; white-space: nowrap;
        }
        .hero__tagline {
          font-size: 0.6rem; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(255,255,255,0.35); margin-bottom: 10px;
        }
        .hero__body {
          font-size: 0.88rem; color: rgba(253,249,245,0.68);
          line-height: 1.8; max-width: 440px; margin: 0;
        }

        /* BRAND CARDS — brand color bg, white logos */
        .hero__brands {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 10px; width: 100%;
        }
        .hero__brand-card {
          display: flex; flex-direction: column; gap: 10px;
          padding: 14px 12px;
          background: var(--bc);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 10px; text-decoration: none;
          transition: transform 0.2s, filter 0.2s;
          box-shadow: 0 2px 14px rgba(0,0,0,0.28);
        }
        .hero__brand-card:hover { transform: translateY(-3px); filter: brightness(1.14); }
        .hero__brand-logo-wrap { height: 36px; display: flex; align-items: center; }
        .hero__brand-logo {
          height: 100%; width: auto; max-width: 100%;
          object-fit: contain; object-position: left center;
          filter: brightness(0) invert(1);
        }
        .hero__brand-desc {
          font-size: 0.59rem; color: rgba(255,255,255,0.80);
          line-height: 1.5; margin: 0; font-weight: 500;
        }

        /* BOTTOM — tight group */
        .hero__bottom { display: flex; flex-direction: column; gap: 14px; }
        .hero__actions { display: flex; gap: 12px; align-items: center; }
        .hero__btn-primary {
          display: inline-flex; align-items: center;
          background: #e2af30; color: #1f4268;
          font-weight: 800; font-size: 0.72rem;
          letter-spacing: 0.07em; text-transform: uppercase;
          padding: 14px 28px; border-radius: 8px;
          text-decoration: none; white-space: nowrap;
          transition: background 0.2s;
        }
        .hero__btn-primary:hover { background: #f0c040; }
        .hero__btn-outline {
          display: inline-flex; align-items: center;
          border: 1.5px solid rgba(255,255,255,0.28);
          color: #fdfaf5; font-size: 0.82rem; font-weight: 600;
          padding: 13px 28px; border-radius: 8px;
          text-decoration: none; white-space: nowrap;
          transition: background 0.2s;
        }
        .hero__btn-outline:hover { background: rgba(255,255,255,0.08); }

        /* TRUST ROW */
        .hero__trust-row {
          display: flex; align-items: center;
          gap: 18px; flex-wrap: nowrap; overflow: hidden;
        }
        .hero__trust-item {
          display: flex; align-items: center; gap: 5px;
          font-size: 0.68rem; font-weight: 500;
          color: rgba(255,255,255,0.42); white-space: nowrap; flex-shrink: 0;
        }
        .hero__chat-btn {
          display: inline-flex; align-items: center; gap: 7px;
          background: none; border: none; cursor: pointer;
          color: rgba(255,255,255,0.45); font-size: 0.68rem;
          font-weight: 600; white-space: nowrap; flex-shrink: 0;
          padding: 0; margin-left: auto;
          transition: color 0.2s;
        }
        .hero__chat-btn:hover { color: #e2af30; }

        @media (max-width: 900px) {
          .hero__content { width: 100%; padding: 40px 24px; }
          .hero__family-bg { opacity: 0.18; width: 100%; object-fit: cover; }
          .hero__overlay { background: rgba(13,30,48,0.9); }
          .hero__brands { grid-template-columns: repeat(2,1fr); }
          .hero__trust-row { flex-wrap: wrap; gap: 10px; }
        }
      `}</style>
    </section>
  );
}
