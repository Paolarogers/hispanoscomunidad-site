import { Link } from 'react-router-dom';
import { PILLARS } from '../../config/brands.config.js';
import { useLanguage } from '../../hooks/useLanguage.js';
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js';

export default function PillarCards() {
  const { text, lang } = useLanguage();
  const ref = useScrollAnimation();

  return (
    <section className="pillars section" id="servicios">
      <div className="container">
        <div className="pillars__header fade-up" ref={ref}>
          <span className="eyebrow">{text('Nuestros cuatro pilares', 'Our four pillars')}</span>
          <h2 className="display-2 pillars__headline">
            {text('Un ecosistema construido para ti.', 'An ecosystem built for you.')}
          </h2>
          <p className="body-lg pillars__body">
            {text(
              'Cada empresa nació para responder a una necesidad real de nuestra comunidad. Juntas, forman el apoyo más completo que un latino puede encontrar en Carolina del Sur.',
              'Each company was born to answer a real need in our community. Together, they form the most complete support system a Latino can find in South Carolina.'
            )}
          </p>
        </div>

        <div className="pillars__grid">
          {PILLARS.map((brand, i) => (
            <Link
              key={brand.id}
              to={brand.route}
              className="pillar-card fade-up"
              style={{ '--brand-color': brand.color, '--brand-light': brand.colorLight, animationDelay: `${i * 80}ms` }}
            >
              <div className="pillar-card__accent" />
              <div className="pillar-card__body">
                <img
                  src={`/images/brands/${brand.id}/${brand.id}-logo.png`}
                  alt={brand.name}
                  className="pillar-card__logo"
                  width="140"
                  height="40"
                  loading="lazy"
                  onError={e => { e.target.style.display = 'none'; }}
                />
                <h3 className="pillar-card__name">{brand.name}</h3>
                <p className="pillar-card__desc">
                  {lang === 'es' ? brand.description_es : brand.description_en}
                </p>
              </div>
              <div className="pillar-card__footer">
                <span className="pillar-card__cta">
                  {text('Conocer más', 'Learn more')}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .pillars__header { max-width: 640px; margin-bottom: var(--space-lg); }
        .pillars__headline { margin: 8px 0 var(--space-sm); }
        .pillars__body { color: var(--hc-soft); }

        .pillars__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-sm);
        }

        .pillar-card {
          display: flex;
          flex-direction: column;
          background: white;
          border: 1px solid var(--hc-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: box-shadow var(--duration) var(--ease), transform var(--duration) var(--ease);
          text-decoration: none;
          color: inherit;
        }
        .pillar-card:hover {
          box-shadow: var(--shadow-lg);
          transform: translateY(-4px);
        }
        .pillar-card:hover .pillar-card__accent {
          transform: scaleX(1);
        }

        .pillar-card__accent {
          height: 4px;
          background: var(--brand-color);
          transform: scaleX(0.3);
          transform-origin: left;
          transition: transform 0.4s var(--ease);
        }
        .pillar-card:hover .pillar-card__accent { transform: scaleX(1); }

        .pillar-card__body {
          flex: 1;
          padding: var(--space-md);
        }
        .pillar-card__logo {
          height: 36px;
          width: auto;
          object-fit: contain;
          object-position: left;
          margin-bottom: var(--space-sm);
        }
        .pillar-card__name {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 300;
          color: var(--hc-navy);
          margin-bottom: var(--space-xs);
        }
        .pillar-card__desc {
          font-size: 0.875rem;
          line-height: 1.7;
          color: var(--hc-soft);
        }
        .pillar-card__footer {
          padding: var(--space-sm) var(--space-md);
          border-top: 1px solid var(--hc-border);
        }
        .pillar-card__cta {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--brand-color);
          transition: gap var(--duration) var(--ease);
        }
        .pillar-card:hover .pillar-card__cta { gap: 10px; }

        @media (max-width: 1024px) {
          .pillars__grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .pillars__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
