import { useLanguage } from '../../hooks/useLanguage.js';
import { WHATSAPP } from '../../config/site.config.js';

export default function Hero() {
  const { text, lang } = useLanguage();

  return (
    <section className="hero">
      <div className="hero__bg">
        <img
          src="/images/hero/hc-hero-main.jpg"
          alt="Hispanos Comunidad — comunidad latina Greenville SC"
          className="hero__img"
          loading="eager"
          fetchpriority="high"
          width="1440"
          height="900"
        />
        <div className="hero__overlay" />
      </div>

      <div className="hero__content container">
        <div className="hero__text fade-up visible">
          <span className="eyebrow hero__eyebrow">
            Hispanos Comunidad · Greenville, SC
          </span>

          <h1 className="hero__headline">
            <span className="hero__headline-1">
              {text('No queremos venderte nada.', 'We don\'t want to sell you anything.')}
            </span>
            <span className="hero__headline-2">
              {text('Queremos que lo sientas.', 'We want you to feel it.')}
            </span>
          </h1>

          <p className="hero__body">
            {text(
              'Somos la organización más completa para familias y empresarios latinos en Upstate South Carolina. Préstamos, seguros, tecnología, educación, salud y comunidad — todo en un solo lugar, respaldado por un equipo que te conoce.',
              'We are the most complete organization for Latino families and entrepreneurs in Upstate South Carolina. Loans, insurance, technology, education, health, and community — all in one place, backed by a team that knows you.'
            )}
          </p>

          <div className="hero__actions">
            <a href="#servicios" className="btn btn--brass hero__btn-primary">
              {text('Explorar nuestros servicios', 'Explore our services')}
            </a>
            <a
              href={WHATSAPP.general}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline hero__btn-secondary"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {text('Escríbenos por WhatsApp', 'Message us on WhatsApp')}
            </a>
          </div>

          <div className="hero__trust">
            {[
              { es: 'Sin seguro social', en: 'No SSN required' },
              { es: '100% en español', en: '100% in Spanish' },
              { es: 'Respuesta en 24h', en: '24h response' },
              { es: '13 años de servicio', en: '13 years of service' },
            ].map((item, i) => (
              <span key={i} className="hero__trust-item">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <circle cx="6" cy="6" r="6" fill="var(--hc-brass)" opacity="0.3"/>
                  <path d="M3 6l2 2 4-4" stroke="var(--hc-brass)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {lang === 'es' ? item.es : item.en}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="hero__scroll-indicator" aria-hidden="true">
        <span />
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
        .hero__bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .hero__img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center 30%;
        }
        .hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            rgba(30,26,46,0.88) 0%,
            rgba(30,26,46,0.70) 50%,
            rgba(30,26,46,0.40) 100%
          );
        }
        .hero__content {
          position: relative;
          z-index: 1;
          padding-top: var(--space-xl);
          padding-bottom: var(--space-xl);
        }
        .hero__text { max-width: 640px; }
        .hero__eyebrow { color: var(--hc-brass); margin-bottom: var(--space-sm); }
        .hero__headline {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: var(--space-md);
        }
        .hero__headline-1 {
          font-family: var(--font-heading);
          font-size: clamp(2.4rem, 5vw, 4.2rem);
          font-weight: 300;
          color: var(--hc-ivory);
          line-height: 1.08;
        }
        .hero__headline-2 {
          font-family: var(--font-heading);
          font-size: clamp(2.4rem, 5vw, 4.2rem);
          font-weight: 300;
          font-style: italic;
          color: var(--hc-brass);
          line-height: 1.08;
        }
        .hero__body {
          font-size: 1.05rem;
          color: rgba(253,249,245,0.78);
          line-height: 1.85;
          margin-bottom: var(--space-md);
          max-width: 540px;
        }
        .hero__actions {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-sm);
          margin-bottom: var(--space-md);
        }
        .hero__btn-secondary {
          border-color: rgba(253,249,245,0.5);
          color: var(--hc-ivory);
        }
        .hero__btn-secondary:hover {
          background: rgba(253,249,245,0.1);
          border-color: var(--hc-ivory);
        }
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
          color: rgba(253,249,245,0.6);
          letter-spacing: 0.03em;
        }
        .hero__scroll-indicator {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1;
        }
        .hero__scroll-indicator span {
          display: block;
          width: 1px;
          height: 48px;
          background: linear-gradient(to bottom, transparent, var(--hc-brass));
          animation: scroll-fade 2s ease-in-out infinite;
        }
        @keyframes scroll-fade {
          0%, 100% { opacity: 0; transform: scaleY(0.5); transform-origin: top; }
          50% { opacity: 1; transform: scaleY(1); }
        }
        @media (max-width: 600px) {
          .hero__headline-1, .hero__headline-2 { font-size: clamp(1.9rem, 8vw, 2.8rem); }
          .hero__actions { flex-direction: column; }
          .hero__actions .btn { justify-content: center; }
        }
      `}</style>
    </section>
  );
}
