import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage.js';
import { WHATSAPP } from '../../config/site.config.js';

export default function Hero() {
  const { lang, text } = useLanguage();

  return (
    <section className="hero">
      {/* Family photo as full background */}
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
        <div className="hero__text">

          <div className="hero__eyebrow-wrap">
            <img
              src="/images/logos/hc-logo-seal-transparent.png"
              alt="HC"
              className="hero__seal"
              width="56" height="56"
              onError={e => { e.target.style.display = 'none'; }}
            />
            <span className="eyebrow hero__eyebrow">
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

          {/* Pillar pills with real logos */}
          <div className="hero__pillars">
            {[
              { path: '/bonanza', label_es: 'Préstamos',  label_en: 'Loans',     color: '#1a3568', logo: '/images/logos/bonanza/bql-transparent.png' },
              { path: '/zivo',    label_es: 'Seguros',    label_en: 'Insurance', color: '#00477b', logo: '/images/logos/zivo/zivo-transparent.png' },
              { path: '/media',   label_es: 'Negocios',   label_en: 'Business',  color: '#1f4268', logo: null },
              { path: '/unidos',  label_es: 'Comunidad',  label_en: 'Community', color: '#017640', logo: null },
            ].map((p, i) => (
              <Link key={i} to={p.path} className="hero__pillar" style={{ '--pillar-color': p.color, background: p.color }}>
                {p.logo ? (
                  <img src={p.logo} alt={p.label_es} className="hero__pillar-logo"
                    onError={e => { e.target.style.display = 'none'; }}/>
                ) : (
                  <span className="hero__pillar-label">{lang === 'es' ? p.label_es : p.label_en}</span>
                )}
              </Link>
            ))}
          </div>

          <div className="hero__actions">
            <a href={WHATSAPP.general} target="_blank" rel="noopener noreferrer" className="btn hero__btn-primary">
              {text('Hablar con nosotros', 'Talk to us')}
            </a>
            <Link to="/nosotros" className="btn hero__btn-outline">
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
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding-top: var(--nav-height);
          overflow: hidden;
          background: linear-gradient(135deg, #0d1e30 0%, #1a3560 100%);
        }

        .hero__bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(13,30,48,1.0)  0%,
            rgba(13,30,48,1.0)  35%,
            rgba(13,30,48,0.75) 50%,
            rgba(13,30,48,0.20) 65%,
            rgba(13,30,48,0.0)  78%
          );
          z-index: 1;
        }

        .hero__family-bg {
          position: absolute;
          top: 0;
          right: 0;
          width: 75%;
          height: 100%;
          object-fit: cover;
          object-position: 15% center;
        }

        .hero__content {
          position: relative;
          z-index: 2;
          grid-column: 1 / 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: var(--space-xl);
          padding-bottom: var(--space-xl);
          padding-right: var(--space-lg);
          padding-left: max(24px, calc((100vw - 1280px) / 2 + 24px));
          min-height: calc(100vh - var(--nav-height));
          max-width: 620px;
        }

        .hero__eyebrow-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: var(--space-md);
        }
        .hero__seal {
          width: 52px;
          height: 52px;
          object-fit: contain;
          border-radius: 50%;
          background: white;
          padding: 4px;
        }
        .hero__eyebrow { color: #e2af30; margin-bottom: 0; font-size: 0.78rem; }

        .hero__headline {
          font-family: var(--font-heading);
          font-size: clamp(2.2rem, 4vw, 3.8rem);
          font-weight: 600;
          color: #fdfaf5;
          line-height: 1.1;
          margin-bottom: var(--space-sm);
          letter-spacing: -0.02em;
        }
        .hero__headline em {
          color: #e2af30;
          font-style: normal;
          font-weight: 300;
        }

        .hero__tagline {
          font-family: var(--font-heading);
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: var(--space-md);
        }

        .hero__body {
          font-size: 1rem;
          color: rgba(253,249,245,0.72);
          line-height: 1.85;
          margin-bottom: var(--space-lg);
          max-width: 480px;
        }

        .hero__pillars {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: var(--space-lg);
        }
        .hero__pillar {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px 14px;
          border-radius: var(--radius-md);
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.15);
          transition: all var(--duration) var(--ease);
          min-height: 44px;
        }
        .hero__pillar:hover { transform: translateY(-2px); opacity: 0.85; }
        .hero__pillar-logo {
          height: 28px;
          width: auto;
          max-width: 140px;
          object-fit: contain;
          filter: brightness(0) invert(1);
        }
        .hero__pillar-label {
          font-family: var(--font-heading);
          font-size: 0.68rem;
          font-weight: 600;
          color: white;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .hero__actions {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-sm);
          margin-bottom: var(--space-md);
        }
        .hero__btn-primary {
          background: #e2af30;
          color: #1f4268;
          font-weight: 700;
          font-family: var(--font-heading);
          font-size: 0.75rem;
          letter-spacing: 0.05em;
          padding: 14px 28px;
          border-radius: var(--radius-md);
        }
        .hero__btn-primary:hover { background: #f0c040; }
        .hero__btn-outline {
          border: 1.5px solid rgba(255,255,255,0.3);
          color: #fdfaf5;
          font-size: 0.82rem;
          padding: 14px 28px;
          border-radius: var(--radius-md);
        }
        .hero__btn-outline:hover { background: rgba(255,255,255,0.1); }

        .hero__trust {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-sm);
        }
        .hero__trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 500;
          color: rgba(255,255,255,0.5);
        }

        @media (max-width: 768px) {
          .hero {
            grid-template-columns: 1fr;
          }
          .hero__family-bg {
            width: 100%;
            height: 50%;
            top: auto;
            bottom: 0;
            object-position: center top;
            opacity: 0.35;
          }
          .hero__overlay {
            background: linear-gradient(
              180deg,
              rgba(13,30,48,0.95) 50%,
              rgba(13,30,48,0.7) 100%
            );
          }
          .hero__content {
            grid-column: 1;
            max-width: 100%;
            padding-left: 24px;
            padding-right: 24px;
          }
        }
      `}</style>
    </section>
  );
}
