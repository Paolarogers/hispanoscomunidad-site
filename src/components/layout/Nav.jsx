import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SITE, WHATSAPP } from '../../config/site.config.js';
import { useLanguage } from '../../hooks/useLanguage.js';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggle, text } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  }, [location]);

  const toggleMenu = () => {
    setMenuOpen(v => {
      document.body.style.overflow = !v ? 'hidden' : '';
      return !v;
    });
  };

  const navLinks = [
    { to: '/#servicios',  label_es: 'Servicios',   label_en: 'Services'   },
    { to: '/media',       label_es: 'HC Business & Media', label_en: 'HC Business & Media' },
    { to: '/unidos',      label_es: 'Comunidad',   label_en: 'Community'  },
    { to: '/eventos',     label_es: 'Eventos',     label_en: 'Events'     },
    { to: '/blog',        label_es: 'Blog',        label_en: 'Blog'       },
    { to: '/contacto',    label_es: 'Contáctanos', label_en: 'Contact'    },
  ];

  return (
    <>
      <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
        <div className="nav__inner container">

          <Link to="/" className="nav__logo" aria-label="Hispanos Comunidad">
            <img
              src="/images/brands/hc-logo.png"
              alt="Hispanos Comunidad"
              width="160"
              height="44"
              loading="eager"
            />
          </Link>

          <nav className="nav__links" aria-label="Main navigation">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav__link${location.pathname === link.to ? ' nav__link--active' : ''}`}
              >
                {lang === 'es' ? link.label_es : link.label_en}
              </Link>
            ))}
          </nav>

          <div className="nav__actions">
            <button
              className="nav__lang"
              onClick={toggle}
              aria-label={`Switch to ${lang === 'es' ? 'English' : 'Español'}`}
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>

            <a
              href={WHATSAPP.general}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--brass nav__cta"
            >
              {text('¡Quiero empezar!', 'Get started!')}
            </a>

            <button
              className={`nav__burger${menuOpen ? ' nav__burger--open' : ''}`}
              onClick={toggleMenu}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`nav__mobile${menuOpen ? ' nav__mobile--open' : ''}`} aria-hidden={!menuOpen}>
        <nav className="nav__mobile-links">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} className="nav__mobile-link">
              {lang === 'es' ? link.label_es : link.label_en}
            </Link>
          ))}
          <div className="nav__mobile-brands">
            <Link to="/bonanza" className="nav__mobile-brand nav__mobile-brand--bonanza">Bonanza Quick Loans</Link>
            <Link to="/zivo" className="nav__mobile-brand nav__mobile-brand--zivo">Zivo Insurance</Link>
          </div>
          <a href={WHATSAPP.general} target="_blank" rel="noopener noreferrer" className="btn btn--brass nav__mobile-cta">
            {text('¡Quiero empezar!', 'Get started!')}
          </a>
          <button className="nav__lang-mobile" onClick={toggle}>
            {lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          </button>
        </nav>
      </div>

      <style>{`
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          height: var(--nav-height);
          transition: background var(--duration) var(--ease), box-shadow var(--duration) var(--ease);
        }
        .nav--scrolled {
          background: var(--hc-navy);
          box-shadow: 0 2px 20px rgba(30,26,46,0.18);
        }
        .nav__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          gap: var(--space-md);
        }
        .nav__logo img { height: 40px; width: auto; }
        .nav__links {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
        }
        .nav__link {
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: rgba(253,249,245,0.75);
          padding: 6px 10px;
          border-radius: var(--radius-sm);
          transition: color var(--duration) var(--ease);
          white-space: nowrap;
        }
        .nav__link:hover, .nav__link--active { color: var(--hc-ivory); }
        .nav__actions {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
        }
        .nav__lang {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: rgba(253,249,245,0.6);
          padding: 6px 10px;
          border: 1px solid rgba(253,249,245,0.2);
          border-radius: var(--radius-sm);
          transition: all var(--duration) var(--ease);
        }
        .nav__lang:hover { color: var(--hc-ivory); border-color: rgba(253,249,245,0.5); }
        .nav__cta { padding: 10px 22px; font-size: 0.75rem; }
        .nav__burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          padding: 8px;
          width: 36px;
        }
        .nav__burger span {
          display: block;
          height: 2px;
          background: var(--hc-ivory);
          border-radius: 2px;
          transition: all var(--duration) var(--ease);
          transform-origin: center;
        }
        .nav__burger--open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .nav__burger--open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .nav__burger--open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        .nav__mobile {
          position: fixed;
          top: var(--nav-height);
          left: 0; right: 0; bottom: 0;
          background: var(--hc-navy);
          z-index: 99;
          transform: translateX(100%);
          transition: transform 0.35s var(--ease);
          overflow-y: auto;
          padding: var(--space-md);
        }
        .nav__mobile--open { transform: translateX(0); }
        .nav__mobile-links {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
          padding-top: var(--space-sm);
        }
        .nav__mobile-link {
          font-size: 1.3rem;
          font-family: var(--font-heading);
          font-weight: 300;
          color: var(--hc-ivory);
          padding: var(--space-sm) 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .nav__mobile-brands {
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
          margin-top: var(--space-sm);
        }
        .nav__mobile-brand {
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          padding: 10px 16px;
          border-radius: var(--radius-md);
        }
        .nav__mobile-brand--bonanza { background: var(--bonanza-gold); color: white; }
        .nav__mobile-brand--zivo { background: var(--zivo-teal); color: white; }
        .nav__mobile-cta { width: 100%; justify-content: center; margin-top: var(--space-md); }
        .nav__lang-mobile {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.5);
          text-align: center;
          margin-top: var(--space-sm);
          letter-spacing: 0.08em;
        }

        @media (max-width: 960px) {
          .nav__links { display: none; }
          .nav__burger { display: flex; }
          .nav__cta { display: none; }
        }
        @media (min-width: 961px) {
          .nav__mobile { display: none; }
        }
      `}</style>
    </>
  );
}
