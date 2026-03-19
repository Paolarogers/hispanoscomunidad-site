import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage.js';
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js';
import { WHATSAPP } from '../../config/site.config.js';

const SAMPLE_EVENTS = [
  {
    id: 1,
    title_es: 'Día de Salud con Bon Secours',
    title_en: 'Health Day with Bon Secours',
    desc_es: 'Consultas médicas gratuitas, vacunas y orientación de salud. Sin importar tu estatus migratorio.',
    desc_en: 'Free medical consultations, vaccines, and health guidance. Regardless of immigration status.',
    date: '2026-04-05',
    time: '9:00 AM – 2:00 PM',
    location: 'Cherrydale · 2327 N Pleasantburg Dr',
    type: 'health',
    color: 'var(--unidos-green)',
    free: true,
  },
  {
    id: 2,
    title_es: 'Ruta Empresarial — Taller de Finanzas',
    title_en: 'Ruta Empresarial — Finance Workshop',
    desc_es: 'Aprende a manejar el flujo de caja, crear un presupuesto real y entender tus números de negocio.',
    desc_en: 'Learn to manage cash flow, create a real budget, and understand your business numbers.',
    date: '2026-04-12',
    time: '10:00 AM – 1:00 PM',
    location: 'Sede Principal · 1415 Laurens Rd',
    type: 'workshop',
    color: 'var(--media-lilac)',
    free: true,
  },
  {
    id: 3,
    title_es: 'Networking Empresarial HC',
    title_en: 'HC Business Networking',
    desc_es: 'Conecta con otros empresarios latinos de Upstate SC. Presenta tu negocio y construye alianzas reales.',
    desc_en: 'Connect with other Latino entrepreneurs in Upstate SC. Present your business and build real alliances.',
    date: '2026-04-18',
    time: '6:00 PM – 9:00 PM',
    location: 'Sede Principal · 1415 Laurens Rd',
    type: 'networking',
    color: 'var(--bonanza-gold)',
    free: true,
  },
];

function formatDate(dateStr, lang) {
  const date = new Date(dateStr + 'T12:00:00');
  return date.toLocaleDateString(lang === 'es' ? 'es-US' : 'en-US', {
    weekday: 'short', month: 'short', day: 'numeric'
  });
}

export default function EventsPreview() {
  const { text, lang } = useLanguage();
  const ref = useScrollAnimation();

  return (
    <section className="events section" ref={ref}>
      <div className="container">
        <div className="events__header fade-up">
          <div>
            <span className="eyebrow">{text('Próximos eventos', 'Upcoming events')}</span>
            <h2 className="display-2 events__headline">
              {text('Tu lugar en la comunidad.', 'Your place in the community.')}
            </h2>
            <p className="body-lg events__body">
              {text(
                'Talleres, eventos de salud, networking y más — abiertos a toda la comunidad, sin costo.',
                'Workshops, health events, networking and more — open to the entire community, at no cost.'
              )}
            </p>
          </div>
          <Link to="/eventos" className="btn btn--outline events__see-all">
            {text('Ver calendario completo', 'View full calendar')}
          </Link>
        </div>

        <div className="events__list fade-up">
          {SAMPLE_EVENTS.map(event => (
            <div key={event.id} className="event-item" style={{ '--event-color': event.color }}>
              <div className="event-item__date-col">
                <div className="event-item__date-box">
                  <span className="event-item__month">
                    {new Date(event.date + 'T12:00:00').toLocaleDateString(lang === 'es' ? 'es-US' : 'en-US', { month: 'short' }).toUpperCase()}
                  </span>
                  <span className="event-item__day">
                    {new Date(event.date + 'T12:00:00').getDate()}
                  </span>
                </div>
              </div>
              <div className="event-item__content">
                <div className="event-item__meta">
                  <span className="event-item__time">{event.time}</span>
                  {event.free && (
                    <span className="event-item__free">
                      {text('Gratis', 'Free')}
                    </span>
                  )}
                </div>
                <h3 className="event-item__title">
                  {lang === 'es' ? event.title_es : event.title_en}
                </h3>
                <p className="event-item__desc">
                  {lang === 'es' ? event.desc_es : event.desc_en}
                </p>
                <span className="event-item__location">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M6 1C4.067 1 2.5 2.567 2.5 4.5c0 2.625 3.5 6.5 3.5 6.5s3.5-3.875 3.5-6.5C9.5 2.567 7.933 1 6 1zm0 4.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" fill="var(--hc-soft)"/>
                  </svg>
                  {event.location}
                </span>
              </div>
              <div className="event-item__action">
                <a
                  href={WHATSAPP.events}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary event-item__rsvp"
                >
                  {text('Reservar lugar', 'RSVP')}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .events { background: var(--hc-ivory); }
        .events__header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: var(--space-lg);
          gap: var(--space-md);
          flex-wrap: wrap;
        }
        .events__headline { margin: 8px 0 var(--space-xs); }
        .events__body { color: var(--hc-soft); max-width: 480px; }
        .events__see-all { flex-shrink: 0; align-self: flex-end; }

        .events__list {
          display: flex;
          flex-direction: column;
          gap: 1px;
          background: var(--hc-border);
          border: 1px solid var(--hc-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .event-item {
          display: grid;
          grid-template-columns: 80px 1fr auto;
          gap: var(--space-md);
          align-items: center;
          background: white;
          padding: var(--space-md);
          border-left: 4px solid var(--event-color);
          transition: background var(--duration) var(--ease);
        }
        .event-item:hover { background: var(--hc-ivory); }

        .event-item__date-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: var(--radius-md);
          background: var(--event-color);
          opacity: 0.12;
          position: relative;
        }
        .event-item__date-col { position: relative; }
        .event-item__month,
        .event-item__day {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          color: var(--hc-navy);
          font-weight: 600;
          line-height: 1;
        }
        .event-item__month { top: 10px; font-size: 0.65rem; letter-spacing: 0.1em; }
        .event-item__day { bottom: 10px; font-size: 1.3rem; font-family: var(--font-heading); font-weight: 300; }

        .event-item__content { flex: 1; }
        .event-item__meta {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          margin-bottom: 4px;
        }
        .event-item__time { font-size: 0.78rem; color: var(--hc-soft); }
        .event-item__free {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--unidos-green);
          background: var(--unidos-light);
          padding: 2px 8px;
          border-radius: 20px;
        }
        .event-item__title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 400;
          color: var(--hc-navy);
          margin-bottom: 4px;
        }
        .event-item__desc {
          font-size: 0.875rem;
          color: var(--hc-soft);
          line-height: 1.6;
          margin-bottom: 6px;
        }
        .event-item__location {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.78rem;
          color: var(--hc-soft);
        }
        .event-item__rsvp { padding: 10px 20px; font-size: 0.78rem; white-space: nowrap; }

        @media (max-width: 768px) {
          .event-item { grid-template-columns: 56px 1fr; }
          .event-item__action { grid-column: 1 / -1; }
          .event-item__rsvp { width: 100%; justify-content: center; }
        }
        @media (max-width: 480px) {
          .events__header { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </section>
  );
}
