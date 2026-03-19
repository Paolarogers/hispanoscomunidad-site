import { LOCATIONS } from '../../config/locations.config.js';
import { useLanguage } from '../../hooks/useLanguage.js';
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js';
import { SITE } from '../../config/site.config.js';

export default function LocationsMap() {
  const { text } = useLanguage();
  const ref = useScrollAnimation();

  return (
    <section className="locations section" ref={ref}>
      <div className="container">
        <div className="locations__header fade-up">
          <span className="eyebrow">{text('Estamos cerca de ti', 'We are close to you')}</span>
          <h2 className="display-2 locations__headline">
            {text('Seis oficinas en Upstate SC.', 'Six offices in Upstate SC.')}
          </h2>
          <p className="body-lg locations__body">
            {text(
              'Atendemos en tu idioma, en persona, en la sucursal más cercana a ti.',
              'We serve you in your language, in person, at the nearest branch to you.'
            )}
          </p>
        </div>

        <div className="locations__grid fade-up">
          {LOCATIONS.map((loc, i) => (
            <a
              key={loc.id}
              href={loc.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`location-card${loc.isHQ ? ' location-card--hq' : ''}`}
            >
              {loc.isHQ && (
                <span className="location-card__hq-badge">
                  {text('Sede Principal', 'Main Office')}
                </span>
              )}
              <div className="location-card__icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2C7.239 2 5 4.239 5 7c0 4.375 5 11 5 11s5-6.625 5-11c0-2.761-2.239-5-5-5zm0 7a2 2 0 110-4 2 2 0 010 4z" fill="currentColor"/>
                </svg>
              </div>
              <div className="location-card__info">
                <strong className="location-card__name">{loc.name}</strong>
                <span className="location-card__address">{loc.address}</span>
                <span className="location-card__city">{loc.city}, {loc.state}</span>
                {loc.note_es && (
                  <span className="location-card__note">{text(loc.note_es, loc.note_en)}</span>
                )}
                <span className="location-card__hours">{loc.hours}</span>
              </div>
              <span className="location-card__map-cta">
                {text('Ver en mapa →', 'View on map →')}
              </span>
            </a>
          ))}
        </div>

        <div className="locations__contact fade-up">
          <div className="locations__contact-item">
            <span className="locations__contact-label">{text('Teléfono general', 'General phone')}</span>
            <a href={`tel:${SITE.phone.replace(/\D/g,'')}`} className="locations__contact-value">
              {SITE.phone}
            </a>
          </div>
          <div className="locations__contact-item">
            <span className="locations__contact-label">{text('Correo', 'Email')}</span>
            <a href={`mailto:${SITE.email}`} className="locations__contact-value">
              {SITE.email}
            </a>
          </div>
          <div className="locations__contact-item">
            <span className="locations__contact-label">{text('Horario general', 'General hours')}</span>
            <span className="locations__contact-value">
              {text('Lun–Vie 9am–6pm · Sáb 10am–3pm', 'Mon–Fri 9am–6pm · Sat 10am–3pm')}
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .locations { background: white; }
        .locations__header { max-width: 560px; margin-bottom: var(--space-lg); }
        .locations__headline { margin: 8px 0 var(--space-xs); }
        .locations__body { color: var(--hc-soft); }

        .locations__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-sm);
          margin-bottom: var(--space-lg);
        }

        .location-card {
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
          padding: var(--space-md);
          border: 1px solid var(--hc-border);
          border-radius: var(--radius-lg);
          text-decoration: none;
          color: inherit;
          position: relative;
          transition: box-shadow var(--duration) var(--ease), transform var(--duration) var(--ease), border-color var(--duration) var(--ease);
        }
        .location-card:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
          border-color: var(--hc-brass);
        }
        .location-card--hq {
          border-color: var(--hc-brass);
          background: #fffdf7;
        }

        .location-card__hq-badge {
          position: absolute;
          top: -1px;
          right: var(--space-sm);
          background: var(--hc-brass);
          color: white;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 0 0 var(--radius-sm) var(--radius-sm);
        }

        .location-card__icon {
          color: var(--hc-brass);
          margin-bottom: 2px;
        }
        .location-card__name {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--hc-navy);
        }
        .location-card__address,
        .location-card__city {
          font-size: 0.82rem;
          color: var(--hc-soft);
          line-height: 1.5;
        }
        .location-card__note {
          font-size: 0.78rem;
          color: var(--unidos-green);
          font-style: italic;
          line-height: 1.4;
        }
        .location-card__hours {
          font-size: 0.78rem;
          color: var(--hc-soft);
          margin-top: 2px;
        }
        .location-card__map-cta {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--hc-brass);
          margin-top: auto;
          padding-top: var(--space-xs);
          transition: color var(--duration) var(--ease);
        }
        .location-card:hover .location-card__map-cta { color: var(--hc-navy); }

        .locations__contact {
          display: flex;
          gap: var(--space-xl);
          padding: var(--space-md) 0;
          border-top: 1px solid var(--hc-border);
          flex-wrap: wrap;
        }
        .locations__contact-item { display: flex; flex-direction: column; gap: 4px; }
        .locations__contact-label {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--hc-lilac);
        }
        .locations__contact-value {
          font-size: 0.95rem;
          color: var(--hc-navy);
          font-weight: 500;
          transition: color var(--duration) var(--ease);
        }
        a.locations__contact-value:hover { color: var(--hc-brass); }

        @media (max-width: 900px) { .locations__grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 540px) { .locations__grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
