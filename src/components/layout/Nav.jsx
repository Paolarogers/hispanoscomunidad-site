import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage.js';
import { WHATSAPP } from '../../config/site.config.js';

const NAV_LINKS = [
  {
    label_es: 'Servicios',
    label_en: 'Services',
    dropdown: [
      { label_es: 'Bonanza Quick Loans', label_en: 'Bonanza Quick Loans', path: '/bonanza', color: 'var(--bonanza-gold)' },
      { label_es: 'Zivo Insurance',      label_en: 'Zivo Insurance',      path: '/zivo',    color: 'var(--zivo-teal)' },
      { label_es: 'HC Business & Media', label_en: 'HC Business & Media', path: '/media',   color: 'var(--media-lilac)' },
      { label_es: 'Hispanics United SC', label_en: 'Hispanics United SC', path: '/unidos',  color: 'var(--unidos-green)' },
    ],
  },
  { label_es: 'Comunidad',  label_en: 'Community', path: '/unidos' },
  { label_es: 'Eventos',    label_en: 'Events',    path: '/eventos' },
  { label_es: 'Blog',       label_en: 'Blog',       path: '/blog' },
  { label_es: 'Galería',    label_en: 'Gallery',    path: '/galeria' },
  { label_es: 'Nosotros',   label_en: 'About',      path: '/nosotros' },
];

export default function Nav() {
  const { lang, setLang, text } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setOpen(false); setDropdown(false); }, [location.pathname]);

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}${open ? ' nav--open' : ''}`} role="navigation">
      <div className="nav__inner container">

        {/* Logo */}
        <Link to="/" className="nav__logo" aria-label="Hispanos Comunidad — inicio">
          <img
            src="/images/logos/hc-logo-horizontal.png"
            alt="Hispanos Comunidad"
            className="nav__logo-img"
            width="160" height="40"
            onError={e => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <span className="nav__logo-fallback" style={{ display: 'none' }}>
            <span className="nav__logo-hc">HC</span>
            <span className="nav__logo-text">Hispanos<br/>Comunidad</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="nav__links">
          {NAV_LINKS.map((link, i) => (
            link.dropdown ? (
              <div key={i} className="nav__dropdown-wrap"
                onMouseEnter={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}>
                <button className="nav__link nav__link--dropdown">
                  {lang === 'es' ? link.label_es : link.label_en}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {dropdown && (
                  <div className="nav__dropdown">
                    {link.dropdown.map((item, j) => (
                      <Link key={j} to={item.path} className="nav__dropdown-item">
                        <span className="nav__dropdown-dot" style={{ background: item.color }}/>
                        {lang === 'es' ? item.label_es : item.label_en}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={i}
                to={link.path}
                className={`nav__link${location.pathname === link.path ? ' nav__link--active' : ''}`}
              >
                {lang === 'es' ? link.label_es : link.label_en}
              </Link>
            )
          ))}
        </div>

        {/* Right actions */}
        <div className="nav__actions">
          <button className="nav__lang" onClick={() => setLang(lang === 'es' ? 'en' : 'es')} aria-label="Cambiar idioma">
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <a href={WHATSAPP.general} target="_blank" rel="noopener noreferrer" className="btn nav__cta">
            {text('Contáctanos', 'Contact us')}
          </a>
          <button className="nav__burger" onClick={() => setOpen(v => !v)} aria-label="Menu" aria-expanded={open}>
            <span/><span/><span/>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="nav__mobile">
          {NAV_LINKS.map((link, i) => (
            link.dropdown ? (
              <div key={i}>
                <span className="nav__mobile-section">{lang === 'es' ? link.label_es : link.label_en}</span>
                {link.dropdown.map((item, j) => (
                  <Link key={j} to={item.path} className="nav__mobile-link" style={{ paddingLeft: 32 }}>
                    {lang === 'es' ? item.label_es : item.label_en}
                  </Link>
                ))}
              </div>
            ) : (
              <Link key={i} to={link.path} className="nav__mobile-link">
                {lang === 'es' ? link.label_es : link.label_en}
              </Link>
            )
          ))}
          <a href={WHATSAPP.general} target="_blank" rel="noopener noreferrer" className="btn btn--primary nav__mobile-cta">
            {text('Contáctanos por WhatsApp', 'Contact us on WhatsApp')}
          </a>
        </div>
      )}

      <style>{`
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          height: var(--nav-height);
          background: transparent;
          transition: background var(--duration) var(--ease), box-shadow var(--duration) var(--ease);
        }
        .nav--scrolled {
          background: rgba(31,66,104,0.97);
          backdrop-filter: blur(12px);
          box-shadow: 0 2px 20px rgba(31,66,104,0.2);
        }
        .nav--open { background: var(--hc-navy); }
        .nav__inner {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-md);
        }
        .nav__logo { display: flex; align-items: center; text-decoration: none; flex-shrink: 0; }
        .nav__logo-img { height: 36px; width: auto; object-fit: contain; filter: brightness(0) invert(1); }
        .nav__logo-fallback { display: flex; align-items: center; gap: 8px; }
        .nav__logo-hc {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--hc-gold);
          letter-spacing: -0.02em;
        }
        .nav__logo-text {
          font-family: var(--font-heading);
          font-size: 0.6rem;
          font-weight: 600;
          color: white;
          line-height: 1.3;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .nav__links {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          flex: 1;
          justify-content: center;
        }
        .nav__link {
          font-family: var(--font-body);
          font-size: 0.82rem;
          font-weight: 500;
          color: rgba(255,255,255,0.8);
          padding: 6px 10px;
          border-radius: var(--radius-sm);
          transition: color var(--duration) var(--ease), background var(--duration) var(--ease);
          display: flex; align-items: center; gap: 4px;
          white-space: nowrap;
        }
        .nav__link:hover, .nav__link--active { color: white; background: rgba(255,255,255,0.1); }
        .nav__link--dropdown { cursor: pointer; }

        .nav__dropdown-wrap { position: relative; }
        .nav__dropdown {
          position: absolute; top: calc(100% + 8px); left: 0;
          background: white;
          border: 1px solid var(--hc-border);
          border-radius: var(--radius-md);
          padding: var(--space-xs);
          min-width: 220px;
          box-shadow: var(--shadow-lg);
          z-index: 200;
        }
        .nav__dropdown-item {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px;
          border-radius: var(--radius-sm);
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--hc-text);
          text-decoration: none;
          transition: background var(--duration) var(--ease);
        }
        .nav__dropdown-item:hover { background: var(--hc-ivory); }
        .nav__dropdown-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

        .nav__actions { display: flex; align-items: center; gap: var(--space-xs); flex-shrink: 0; }
        .nav__lang {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.7);
          padding: 6px 10px;
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: var(--radius-sm);
          transition: all var(--duration) var(--ease);
        }
        .nav__lang:hover { color: white; border-color: rgba(255,255,255,0.5); }
        .nav__cta {
          background: var(--hc-gold);
          color: var(--hc-navy);
          font-size: 0.78rem;
          font-weight: 600;
          padding: 8px 18px;
        }
        .nav__cta:hover { background: #f0c040; }

        .nav__burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          padding: 8px;
          cursor: pointer;
        }
        .nav__burger span {
          display: block;
          width: 22px;
          height: 2px;
          background: white;
          border-radius: 2px;
          transition: all var(--duration) var(--ease);
        }

        .nav__mobile {
          background: var(--hc-navy);
          padding: var(--space-md);
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .nav__mobile-section {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          padding: var(--space-sm) 0 4px;
        }
        .nav__mobile-link {
          font-size: 1rem;
          font-weight: 500;
          color: rgba(255,255,255,0.85);
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          text-decoration: none;
        }
        .nav__mobile-cta { margin-top: var(--space-sm); justify-content: center; width: 100%; }

        @media (max-width: 900px) {
          .nav__links { display: none; }
          .nav__burger { display: flex; }
          .nav__cta { display: none; }
        }
      `}</style>
    </nav>
  );
}
