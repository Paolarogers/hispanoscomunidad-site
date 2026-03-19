import { Link } from 'react-router-dom';
import { SITE, WHATSAPP } from '../../config/site.config.js';
import { LOCATIONS } from '../../config/locations.config.js';
import { useLanguage } from '../../hooks/useLanguage.js';

export default function Footer() {
  const { text, lang } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__hu-band">
        <div className="container">
          <p className="footer__hu-text">
            {text(
              'Cada transacción apoya a Hispanics United of SC — autofinanciada desde el primer día por Bonanza, Zivo y HC Business & Media.',
              'Every transaction supports Hispanics United of SC — self-funded since day one by Bonanza, Zivo, and HC Business & Media.'
            )}
            {' '}
            <Link to="/unidos" className="footer__hu-link">
              {text('Conoce más →', 'Learn more →')}
            </Link>
          </p>
        </div>
      </div>

      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">

            {/* Brand column */}
            <div className="footer__col footer__col--brand">
              <img src="/images/brands/hc-logo-white.png" alt="Hispanos Comunidad" width="140" height="38" loading="lazy" />
              <p className="footer__tagline">
                {text('Más que servicios, somos comunidad.', 'More than services. We are community.')}
              </p>
              <div className="footer__social">
                <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href={SITE.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>

            {/* Services column */}
            <div className="footer__col">
              <h4 className="footer__col-title">{text('Servicios', 'Services')}</h4>
              <ul className="footer__links">
                <li><Link to="/bonanza">{text('Bonanza Quick Loans', 'Bonanza Quick Loans')}</Link></li>
                <li><Link to="/zivo">{text('Zivo Insurance', 'Zivo Insurance')}</Link></li>
                <li><Link to="/media">{text('HC Business & Media', 'HC Business & Media')}</Link></li>
                <li><Link to="/media#orbita">{text('HC Business 360', 'HC Business 360')}</Link></li>
                <li><Link to="/media#ruta">{text('Ruta Empresarial', 'Ruta Empresarial')}</Link></li>
                <li><Link to="/unidos">{text('Hispanics United SC', 'Hispanics United SC')}</Link></li>
              </ul>
            </div>

            {/* Community column */}
            <div className="footer__col">
              <h4 className="footer__col-title">{text('Comunidad', 'Community')}</h4>
              <ul className="footer__links">
                <li><Link to="/eventos">{text('Eventos', 'Events')}</Link></li>
                <li><Link to="/blog">{text('Blog', 'Blog')}</Link></li>
                <li><Link to="/shows">{text('Programas y Shows', 'Shows & Programs')}</Link></li>
                <li><Link to="/galeria">{text('Galería', 'Gallery')}</Link></li>
                <li><Link to="/nosotros">{text('Nosotros', 'About Us')}</Link></li>
                <li><Link to="/seguridad">{text('Seguridad de datos', 'Data security')}</Link></li>
              </ul>
            </div>

            {/* Locations column */}
            <div className="footer__col">
              <h4 className="footer__col-title">{text('Nuestras oficinas', 'Our offices')}</h4>
              <ul className="footer__locations">
                {LOCATIONS.map(loc => (
                  <li key={loc.id}>
                    <a href={loc.mapUrl} target="_blank" rel="noopener noreferrer" className="footer__location">
                      <strong>{loc.name}</strong>
                      <span>{loc.city}, {loc.state}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <a href={`tel:${SITE.phone.replace(/\D/g,'')}`} className="footer__phone">
                {SITE.phone}
              </a>
            </div>

          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p className="footer__legal">
            © {year} Hispanos Comunidad · Bonanza Quick Loans · Zivo Insurance · HC Business & Media · Hispanics United of SC.
            {' '}{text('Todos los derechos reservados.', 'All rights reserved.')}
          </p>
          <div className="footer__bottom-links">
            <Link to="/seguridad">{text('Privacidad', 'Privacy')}</Link>
            <span>·</span>
            <Link to="/terminos">{text('Términos', 'Terms')}</Link>
            <span>·</span>
            <a href={WHATSAPP.general} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .footer { background: var(--hc-navy); color: var(--hc-ivory); }

        .footer__hu-band {
          background: var(--hc-brass);
          padding: 14px 0;
        }
        .footer__hu-text {
          font-size: 0.85rem;
          color: white;
          text-align: center;
          line-height: 1.6;
        }
        .footer__hu-link {
          font-weight: 600;
          color: white;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .footer__main { padding: var(--space-xl) 0 var(--space-lg); }

        .footer__grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: var(--space-lg);
        }

        .footer__col-title {
          font-family: var(--font-body);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--hc-lilac);
          margin-bottom: var(--space-sm);
        }

        .footer__col--brand img { margin-bottom: var(--space-sm); }

        .footer__tagline {
          font-size: 0.95rem;
          color: rgba(253,249,245,0.6);
          margin-bottom: var(--space-md);
          font-style: italic;
          font-family: var(--font-heading);
          font-size: 1.05rem;
        }

        .footer__social {
          display: flex;
          gap: var(--space-sm);
        }
        .footer__social a {
          color: rgba(253,249,245,0.5);
          transition: color var(--duration) var(--ease);
        }
        .footer__social a:hover { color: var(--hc-brass); }

        .footer__links {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer__links a {
          font-size: 0.875rem;
          color: rgba(253,249,245,0.65);
          transition: color var(--duration) var(--ease);
        }
        .footer__links a:hover { color: var(--hc-ivory); }

        .footer__locations {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: var(--space-sm);
        }
        .footer__location {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .footer__location strong {
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(253,249,245,0.75);
          transition: color var(--duration) var(--ease);
        }
        .footer__location:hover strong { color: var(--hc-brass); }
        .footer__location span {
          font-size: 0.75rem;
          color: rgba(253,249,245,0.45);
        }

        .footer__phone {
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--hc-brass);
          margin-top: var(--space-sm);
          display: block;
          transition: color var(--duration) var(--ease);
        }
        .footer__phone:hover { color: var(--hc-ivory); }

        .footer__bottom {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: var(--space-md) 0;
        }
        .footer__bottom .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--space-md);
          flex-wrap: wrap;
        }
        .footer__legal {
          font-size: 0.75rem;
          color: rgba(253,249,245,0.35);
          line-height: 1.6;
        }
        .footer__bottom-links {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          font-size: 0.75rem;
          color: rgba(253,249,245,0.4);
        }
        .footer__bottom-links a {
          color: rgba(253,249,245,0.5);
          transition: color var(--duration) var(--ease);
        }
        .footer__bottom-links a:hover { color: var(--hc-ivory); }

        @media (max-width: 960px) {
          .footer__grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .footer__grid { grid-template-columns: 1fr; }
          .footer__bottom .container { flex-direction: column; text-align: center; }
        }
      `}</style>
    </footer>
  );
}
