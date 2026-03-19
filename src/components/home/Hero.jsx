import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage.js';
import { WHATSAPP } from '../../config/site.config.js';

export default function Hero() {
  const { lang, text } = useLanguage();

  return (
    <section className="hero">
      {/* Background gradient — no photo to interfere */}
      <div className="hero__bg"/>

      <div className="hero__content container">
        <div className="hero__text">

          <div className="hero__eyebrow-wrap">
            <img
              src="/images/logos/hc-logo-seal.png"
              alt="HC Servicios Esenciales"
              className="hero__seal"
              width="48" height="48"
              onError={e => { e.target.style.display = 'none'; }}
            />
            <span className="eyebrow hero__eyebrow">
              Hispanos Comunidad · Greenville, SC
            </span>
          </div>

          <h1 className="hero__headline">
            {text(
              'Todo lo que tu familia\nnecesita para prosperar.',
              'Everything your family\nneeds to thrive.'
            ).split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br/>}</span>
            ))}
            <br/>
            <em>{text('En un solo lugar.', 'In one place.')}</em>
          </h1>

          <p className="hero__tagline">
            {text('Servicios Esenciales para la Comunidad Latina', 'Essential Services for the Latino Community')}
          </p>

          <p className="hero__body">
            {text(
              'Préstamos, seguros, educación empresarial, y tecnología — sin barreras de idioma, sin discriminación por documentación. El ecosistema completo para que tu familia y tu negocio crezcan en Upstate South Carolina.',
              'Loans, insurance, business education, and technology — without language barriers, without documentation discrimination. The complete ecosystem for your family and business to grow in Upstate South Carolina.'
            )}
          </p>

          <div className="hero__pillars">
            {[
              { path: '/bonanza', label_es: 'Préstamos',  label_en: 'Loans',      color: '#e2af30', icon: '💰' },
              { path: '/zivo',    label_es: 'Seguros',    label_en: 'Insurance',  color: '#017640', icon: '🛡️' },
              { path: '/media',   label_es: 'Negocios',   label_en: 'Business',   color: '#1f4268', icon: '📱' },
              { path: '/unidos',  label_es: 'Comunidad',  label_en: 'Community',  color: '#017640', icon: '🤝' },
            ].map((p, i) => (
              <Link key={i} to={p.path} className="hero__pillar" style={{ '--pillar-color': p.color }}>
                <span className="hero__pillar-icon">{p.icon}</span>
                <span className="hero__pillar-label">{lang === 'es' ? p.label_es : p.label_en}</span>
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

        {/* Family photo — right column, large */}
        <div className="hero__photo-col">
          <img
            src="/images/hero/hc-hero-family.png"
            alt="Familia latina — Hispanos Comunidad Greenville SC"
            className="hero__family"
            width="700" height="600"
            loading="eager"
            fetchpriority="high"
            onError={e => { e.target.style.display = 'none'; }}
          />
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
          background: linear-gradient(135deg, #0d1e30 0%, #1f4268 55%, #163355 100%);
        }

        .hero__bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 70% 50%, rgba(226,175,48,0.08) 0%, transparent 60%);
          pointer-events: none;
        }

        .hero__content {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-lg);
          align-items: center;
          padding-top: var(--space-xl);
          padding-bottom: var(--space-xl);
          min-height: calc(100vh - var(--nav-height));
        }

        .hero__eyebrow-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: var(--space-md);
        }
        .hero__seal {
          width: 44px;
          height: 44px;
          object-fit: contain;
          border-radius: 50%;
        }
        .hero__eyebrow { color: #e2af30; margin-bottom: 0; }

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
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
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
          gap: 8px;
          padding: 10px 16px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-bottom: 2px solid var(--pillar-color);
          border-radius: var(--radius-md);
          text-decoration: none;
          font-family: var(--font-heading);
          font-size: 0.7rem;
          font-weight: 500;
          color: rgba(255,255,255,0.85);
          letter-spacing: 0.05em;
          transition: all var(--duration) var(--ease);
        }
        .hero__pillar:hover {
          background: rgba(255,255,255,0.12);
          color: white;
          transform: translateY(-2px);
        }
        .hero__pillar-icon { font-size: 1rem; }

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

        /* Right column — big family photo */
        .hero__photo-col {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          height: 100%;
          padding-bottom: 0;
        }
        .hero__family {
          width: 100%;
          max-width: 640px;
          height: auto;
          object-fit: contain;
          object-position: bottom center;
          filter: drop-shadow(-20px 0 60px rgba(226,175,48,0.12));
        }

        @media (max-width: 900px) {
          .hero__content { grid-template-columns: 1fr; }
          .hero__photo-col { display: none; }
        }
      `}</style>
    </section>
  );
}
