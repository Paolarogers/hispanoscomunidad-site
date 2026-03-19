import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage.js';
import { WHATSAPP } from '../../config/site.config.js';

export default function Hero() {
  const { lang, text } = useLanguage();

  return (
    <section className="hero">
      <div className="hero__bg">
        <div className="hero__gradient"/>
        <img
          src="/images/hero/hc-hero-main.jpg"
          alt="Hispanos Comunidad — Greenville SC"
          className="hero__img"
          loading="eager"
          fetchpriority="high"
          width="1440" height="900"
          onError={e => { e.target.style.display = 'none'; }}
        />
        <div className="hero__overlay"/>
      </div>

      <div className="hero__content container">
        <div className="hero__text">

          <div className="hero__eyebrow-wrap">
            <img src="/images/logos/hc-logo-seal.png" alt="HC" className="hero__seal"
              width="56" height="56"
              onError={e => { e.target.style.display = 'none'; }}/>
            <span className="eyebrow hero__eyebrow">
              Hispanos Comunidad · Greenville, SC
            </span>
          </div>

          <h1 className="hero__headline">
            {text(
              <>Todo lo que tu familia<br/>necesita para prosperar.<br/><em>En un solo lugar.</em></>,
              <>Everything your family<br/>needs to thrive.<br/><em>In one place.</em></>
            )}
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

          {/* Four pillars */}
          <div className="hero__pillars">
            {[
              { path: '/bonanza', label_es: 'Préstamos',  label_en: 'Loans',      color: 'var(--bonanza-gold)', icon: '💰' },
              { path: '/zivo',    label_es: 'Seguros',    label_en: 'Insurance',  color: 'var(--zivo-teal)',    icon: '🛡️' },
              { path: '/media',   label_es: 'Negocios',   label_en: 'Business',   color: 'var(--media-lilac)',  icon: '📱' },
              { path: '/unidos',  label_es: 'Comunidad',  label_en: 'Community',  color: 'var(--unidos-green)', icon: '🤝' },
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
              { es: '5,000+ familias aseguradas', en: '5,000+ families insured' },
              { es: '13 años en SC', en: '13 years in SC' },
              { es: '100% en español', en: '100% in Spanish' },
            ].map((t, i) => (
              <span key={i} className="hero__trust-item">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="6" fill="var(--hc-gold)" opacity="0.3"/>
                  <path d="M3 6l2 2 4-4" stroke="var(--hc-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {lang === 'es' ? t.es : t.en}
              </span>
            ))}
          </div>
        </div>

        <div className="hero__avatar-col">
          <img
            src="/images/hero/hc-hero-family.png"
            alt="Familia latina — Hispanos Comunidad"
            className="hero__paola"
            width="340" height="420"
            loading="eager"
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
        }
        .hero__bg { position: absolute; inset: 0; z-index: 0; }
        .hero__gradient {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, #0d1e30 0%, #1f4268 50%, #163355 100%);
        }
        .hero__img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0.15;
        }
        .hero__overlay {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, rgba(13,30,48,0.85) 0%, rgba(13,30,48,0.4) 60%, rgba(13,30,48,0.1) 100%);
        }

        .hero__content {
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: var(--space-xl);
          align-items: center;
          padding-top: var(--space-xl);
          padding-bottom: var(--space-xl);
        }

        .hero__eyebrow-wrap {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          margin-bottom: var(--space-sm);
        }
        .hero__seal {
          width: 48px; height: 48px;
          object-fit: contain;
          filter: drop-shadow(0 2px 8px rgba(226,175,48,0.4));
        }
        .hero__eyebrow { color: var(--hc-gold); margin-bottom: 0; }

        .hero__headline {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 4.5vw, 3.8rem);
          font-weight: 400;
          color: var(--hc-ivory);
          line-height: 1.15;
          margin-bottom: var(--space-sm);
          letter-spacing: -0.02em;
        }
        .hero__headline em {
          color: var(--hc-gold);
          font-style: normal;
          font-weight: 300;
        }

        .hero__tagline {
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          margin-bottom: var(--space-md);
        }

        .hero__body {
          font-size: 1.05rem;
          color: rgba(253,249,245,0.75);
          line-height: 1.85;
          max-width: 520px;
          margin-bottom: var(--space-lg);
        }

        .hero__pillars {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-xs);
          margin-bottom: var(--space-lg);
        }
        .hero__pillar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-bottom: 2px solid var(--pillar-color);
          border-radius: var(--radius-md);
          text-decoration: none;
          font-family: var(--font-heading);
          font-size: 0.72rem;
          font-weight: 500;
          color: rgba(255,255,255,0.85);
          letter-spacing: 0.06em;
          transition: all var(--duration) var(--ease);
        }
        .hero__pillar:hover {
          background: rgba(255,255,255,0.12);
          color: white;
          transform: translateY(-2px);
        }
        .hero__pillar-icon { font-size: 1.1rem; }

        .hero__actions {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-sm);
          margin-bottom: var(--space-md);
        }
        .hero__btn-primary {
          background: var(--hc-gold);
          color: var(--hc-navy);
          font-weight: 700;
          font-family: var(--font-heading);
          font-size: 0.78rem;
          letter-spacing: 0.05em;
          padding: 14px 28px;
        }
        .hero__btn-primary:hover { background: #f0c040; }
        .hero__btn-outline {
          border: 1.5px solid rgba(255,255,255,0.35);
          color: var(--hc-ivory);
          font-size: 0.82rem;
          padding: 14px 28px;
        }
        .hero__btn-outline:hover { background: rgba(255,255,255,0.1); border-color: white; }

        .hero__trust {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-sm);
        }
        .hero__trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 500;
          color: rgba(255,255,255,0.55);
        }

        .hero__paola {
          width: 320px;
          height: auto;
          object-fit: contain;
          object-position: bottom;
          filter: drop-shadow(0 20px 60px rgba(0,0,0,0.4));
        }

        @media (max-width: 900px) {
          .hero__content { grid-template-columns: 1fr; }
          .hero__avatar-col { display: none; }
        }
      `}</style>
    </section>
  );
}
