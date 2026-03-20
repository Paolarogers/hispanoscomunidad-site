import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage.js';
import { WHATSAPP } from '../../config/site.config.js';

export default function Hero() {
  const { lang, text } = useLanguage();

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
        <div className="hero__text">

          <div className="hero__eyebrow-wrap">
            <img
              src="/images/logos/hc-logo-seal-transparent.png"
              alt="HC"
              className="hero__seal"
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

          {/* Pillar pills — single row with arrow */}
          <div className="hero__pillars">
            {[
              { path: '/bonanza', label_es: 'Préstamos',  label_en: 'Loans',     color: '#1a3568', logo: '/images/logos/bonanza/bql-transparent.png' },
              { path: '/zivo',    label_es: 'Seguros',    label_en: 'Insurance', color: '#00477b', logo: '/images/logos/zivo/zivo-transparent.png' },
              { path: '/media',   label_es: 'Negocios',   label_en: 'Business',  color: '#132f5e', logo: null },
              { path: '/unidos',  label_es: 'Comunidad',  label_en: 'Community', color: '#017640', logo: null },
            ].map((p, i, arr) => (
              <span key={i} className="hero__pillar-wrap">
                <Link to={p.path} className="hero__pillar" style={{ background: p.color }}>
                  {p.logo ? (
                    <img src={p.logo} alt={lang === 'es' ? p.label_es : p.label_en}
                      className="hero__pillar-logo"
                      onError={e => { e.target.style.display = 'none'; }}/>
                  ) : (
                    <span className="hero__pillar-label">{lang === 'es' ? p.label_es : p.label_en}</span>
                  )}
                </Link>
                {i < arr.length - 1 && (
                  <svg className="hero__pillar-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 7h8M8 4l3 3-3 3" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </span>
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

          {/* Trust bar — single row, no wrapping */}
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
          display: flex;
          align-items: center;
          padding-top: var(--nav-height);
          overflow: hidden;
          background: linear-gradient(135deg, #0d1e30 0%, #1a3560 100%);
        }

        .hero__bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        /* Full family photo — anchored top-right, no crop */
        .hero__family-bg {
          position: absolute;
          top: var(--nav-height);
          right: 0;
          height: calc(100% - var(--nav-height));
          width: auto;
          object-fit: contain;
          object-position: right top;
        }

        /* Navy solid left → fades to transparent right */
        .hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(13,30,48,1.0)  0%,
            rgba(13,30,48,1.0)  30%,
            rgba(13,30,48,0.82) 44%,
            rgba(13,30,48,0.22) 62%,
            rgba(13,30,48,0.0)  76%
          );
          z-index: 1;
        }

        .hero__content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: var(--space-xl);
          padding-bottom: var(--space-xl);
          padding-right: var(--space-lg);
          padding-left: max(24px, calc((100vw - 1280px) / 2 + 24px));
          min-height: calc(100vh - var(--nav-height));
          max-width: 560px;
        }

        /* Eyebrow — larger seal */
        .hero__eyebrow-wrap {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: var(--space-md);
        }
        .hero__seal {
          width: 68px;
          height: 68px;
          object-fit: contain;
          border-radius: 50%;
          background: white;
          padding: 4px;
          flex-shrink: 0;
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
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: var(--space-sm);
        }

        .hero__body {
          font-size: 0.95rem;
          color: rgba(253,249,245,0.72);
          line-height: 1.85;
          margin-bottom: var(--space-md);
          max-width: 460px;
        }

        /* Pills — always one row with arrows between */
        .hero__pillars {
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          gap: 6px;
          margin-bottom: var(--space-md);
          overflow-x: auto;
        }
        .hero__pillar-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }
        .hero__pillar {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 7px 13px;
          border-radius: var(--radius-md);
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.15);
          transition: all var(--duration) var(--ease);
          min-height: 40px;
          flex-shrink: 0;
        }
        .hero__pillar:hover { transform: translateY(-2px); opacity: 0.85; }
        .hero__pillar-logo {
          height: 22px;
          width: auto;
          max-width: 110px;
          object-fit: contain;
          filter: brightness(0) invert(1);
        }
        .hero__pillar-label {
          font-size: 0.65rem;
          font-weight: 700;
          color: white;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .hero__pillar-arrow {
          flex-shrink: 0;
          opacity: 0.6;
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

        /* Trust bar — single row, no wrap */
        .hero__trust {
          display: flex;
          flex-wrap: nowrap;
          gap: 20px;
          overflow-x: auto;
        }
        .hero__trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          font-weight: 500;
          color: rgba(255,255,255,0.5);
          white-space: nowrap;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .hero__family-bg {
            top: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center top;
            opacity: 0.2;
          }
          .hero__overlay { background: rgba(13,30,48,0.88); }
          .hero__content {
            max-width: 100%;
            padding-left: 24px;
            padding-right: 24px;
          }
          .hero__pillars { flex-wrap: wrap; }
          .hero__trust { flex-wrap: wrap; gap: 12px; }
        }
      `}</style>
    </section>
  );
}
