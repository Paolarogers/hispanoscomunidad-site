import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/layout/SEOHead.jsx';
import { WHATSAPP, SITE } from '../config/site.config.js';
import { useLanguage } from '../hooks/useLanguage.js';
import { useScrollAnimation } from '../hooks/useScrollAnimation.js';

// ── APP WORLDS ───────────────────────────────────────────
const APP_WORLDS = [
  { id: 'spa',          num: '01', emoji: '💆', title: 'SPA & Beauty Bar',       trade_es: 'Estética',            trade_en: 'Aesthetics',         color: '#c8717a', bg: '#fff5f6' },
  { id: 'nail',         num: '02', emoji: '💅', title: 'Nail Art Studio',         trade_es: 'Uñas',               trade_en: 'Nails',              color: '#b078c0', bg: '#fdf5ff' },
  { id: 'hair',         num: '03', emoji: '✂️', title: 'Hair Studio',             trade_es: 'Salón de cabello',    trade_en: 'Hair salon',         color: '#a07850', bg: '#fff8f2' },
  { id: 'retail',       num: '04', emoji: '🛍️', title: 'Retail Pro',             trade_es: 'Cualquier inventario', trade_en: 'Any inventory',     color: '#c07840', bg: '#fff8f0' },
  { id: 'realestate',   num: '05', emoji: '🏡', title: 'Real Estate',             trade_es: 'Agentes inmobiliarios', trade_en: 'Real estate agents', color: '#5080b0', bg: '#f0f5ff' },
  { id: 'taxes',        num: '06', emoji: '📋', title: 'Taxes & Immigration',     trade_es: 'Servicios legales',   trade_en: 'Legal services',     color: '#2d8a60', bg: '#f0fff8' },
  { id: 'construction', num: '07', emoji: '🏗️', title: 'Construction Pro',       trade_es: 'Construcción',        trade_en: 'Construction',       color: '#808090', bg: '#f5f5f8' },
  { id: 'assistant',    num: '08', emoji: '🤖', title: 'Mi 24/7 Assistant',       trade_es: 'Asistente personal',  trade_en: 'Personal assistant', color: '#5860b8', bg: '#f4f4ff' },
];

const APP_FEATURES = [
  { icon: '💬', label_es: 'Chat HC interno', label_en: 'HC internal chat' },
  { icon: '📧', label_es: 'API: Email / SMS', label_en: 'API: Email / SMS' },
  { icon: '📱', label_es: 'WhatsApp API', label_en: 'WhatsApp API' },
  { icon: '🌐', label_es: 'Sitio web conectado', label_en: 'Connected website' },
  { icon: '📊', label_es: 'Dashboard en tiempo real', label_en: 'Real-time dashboard' },
  { icon: '🔒', label_es: 'Datos siempre seguros', label_en: 'Data always secure' },
];

// ── SHOWS ────────────────────────────────────────────────
const SHOWS = [
  { id: 'hqi',        title: 'Hispanos que Inspiran',  desc_es: 'Historias de comunidad · Inspiración', desc_en: 'Community stories · Inspiration', color: '#b8893a', emoji: '⭐' },
  { id: 'queonda',    title: 'Qué Onda GVL',           desc_es: 'Noticias locales · Cultura',           desc_en: 'Local news · Culture',           color: '#1D9E75', emoji: '📰' },
  { id: 'recalcul',   title: 'Recalculando Ruta',       desc_es: 'Finanzas · Educación empresarial',     desc_en: 'Finance · Business education',   color: '#8b7bb5', emoji: '🧭' },
  { id: 'parranda',   title: 'La Parranda',             desc_es: 'Música · Entretenimiento',             desc_en: 'Music · Entertainment',          color: '#e05050', emoji: '🎵' },
  { id: 'cotorreo',   title: 'El Cotorreo',             desc_es: 'Conversación · Comunidad',             desc_en: 'Conversation · Community',       color: '#c07840', emoji: '🗣️' },
  { id: 'cafe',       title: 'Un Café con Paola',       desc_es: 'Estrategia · Negocios · Vida',         desc_en: 'Strategy · Business · Life',     color: '#1e1a2e', emoji: '☕' },
  { id: 'conectado',  title: 'Conectado',               desc_es: 'Tecnología · Digital · Futuro',        desc_en: 'Technology · Digital · Future',  color: '#5060c0', emoji: '🔗' },
];

// ── PACKAGES ─────────────────────────────────────────────
const PACKAGES = [
  {
    id: 'esencial',
    title_es: 'Esencial',
    title_en: 'Essential',
    price_es: 'Desde $297/mes',
    price_en: 'From $297/mo',
    desc_es: 'Para el negocio que quiere ordenarse y crecer con las herramientas correctas.',
    desc_en: 'For the business that wants to get organized and grow with the right tools.',
    includes_es: ['App HC Business 360 (1 mundo)', 'Sitio web conectado', 'Chat interno HC', 'Soporte mensual 2h con Amili', 'Dashboard básico de métricas'],
    includes_en: ['HC Business 360 app (1 world)', 'Connected website', 'HC internal chat', 'Monthly 2h support with Amili', 'Basic metrics dashboard'],
    color: 'var(--media-lilac)',
    cta_es: 'Empezar con Esencial',
    cta_en: 'Start with Essential',
  },
  {
    id: 'crecimiento',
    title_es: 'Crecimiento',
    title_en: 'Growth',
    price_es: 'Desde $597/mes',
    price_en: 'From $597/mo',
    desc_es: 'Para el negocio que quiere más clientes, mejor visibilidad, y una operación profesional.',
    desc_en: 'For the business that wants more clients, better visibility, and professional operations.',
    includes_es: ['Todo en Esencial', 'Marketing digital mensual', 'Gestión de redes sociales', 'Email/SMS campaigns', 'Soporte mensual 5h + estrategia'],
    includes_en: ['Everything in Essential', 'Monthly digital marketing', 'Social media management', 'Email/SMS campaigns', 'Monthly 5h support + strategy'],
    color: 'var(--media-mid)',
    featured: true,
    cta_es: 'Empezar con Crecimiento',
    cta_en: 'Start with Growth',
  },
  {
    id: 'completo',
    title_es: '360 Completo',
    title_en: '360 Complete',
    price_es: 'Precio personalizado',
    price_en: 'Custom pricing',
    desc_es: 'El ecosistema HC completo trabajando para tu empresa. Para negocios listos para escalar en serio.',
    desc_en: 'The complete HC ecosystem working for your business. For businesses ready to scale seriously.',
    includes_es: ['Todo en Crecimiento', 'Todos los mundos de HC Business 360', 'Producción de contenido y video', 'Aparición en programas HC Media', 'Sesión estratégica mensual con Paola'],
    includes_en: ['Everything in Growth', 'All HC Business 360 worlds', 'Content and video production', 'Feature on HC Media programs', 'Monthly strategy session with Paola'],
    color: 'var(--hc-navy)',
    cta_es: 'Agendar conversación',
    cta_en: 'Schedule conversation',
  },
];

export default function Media() {
  const { lang, text } = useLanguage();
  const [activeWorld, setActiveWorld] = useState(null);
  const ref1 = useScrollAnimation();
  const ref2 = useScrollAnimation();
  const ref3 = useScrollAnimation();

  return (
    <>
      <SEOHead lang={lang} />
      <main className="media-page">

        {/* ── HERO ── */}
        <section className="md-hero">
          <div className="md-hero__bg">
            <div className="md-hero__gradient"/>
          </div>
          <div className="md-hero__content container">
            <div className="md-hero__text">
              <span className="eyebrow md-hero__eyebrow">HC Business & Media</span>
              <h1 className="md-hero__headline">
                {text('Estrategia, tecnología', 'Strategy, technology')}<br/>
                {text('y marketing —', 'and marketing —')}<br/>
                <em>{text('para el negocio latino.', 'for the Latino business.')}</em>
              </h1>
              <p className="md-hero__body">
                {text(
                  'No solo te damos herramientas. Te damos el equipo. Marketing, tecnología, educación empresarial, y medios — todo bajo un mismo techo, diseñado específicamente para negocios latinos en crecimiento.',
                  'We do not just give you tools. We give you the team. Marketing, technology, business education, and media — all under one roof, designed specifically for growing Latino businesses.'
                )}
              </p>
              <div className="md-hero__pillars">
                {[
                  { icon: '📱', label_es: 'HC Business 360', label_en: 'HC Business 360' },
                  { icon: '🗺️', label_es: 'Ruta Empresarial', label_en: 'Ruta Empresarial' },
                  { icon: '📻', label_es: '7 programas', label_en: '7 shows' },
                  { icon: '🎯', label_es: 'Marketing digital', label_en: 'Digital marketing' },
                  { icon: '🤝', label_es: 'CLARITY consulting', label_en: 'CLARITY consulting' },
                ].map((p, i) => (
                  <span key={i} className="md-hero__pillar">
                    <span>{p.icon}</span>
                    <span>{lang === 'es' ? p.label_es : p.label_en}</span>
                  </span>
                ))}
              </div>
              <div className="md-hero__actions">
                <a href={WHATSAPP.media} target="_blank" rel="noopener noreferrer" className="btn md-btn--primary">
                  {text('Hablar con Amili', 'Talk to Amili')}
                </a>
                <a href="#orbita" className="btn md-btn--outline">
                  {text('Ver HC Business 360', 'See HC Business 360')}
                </a>
              </div>
            </div>
            <div className="md-hero__avatars">
              <img src="/images/team/avatars/amili-portrait.png"
                alt="Amili — HC Business & Media"
                className="md-hero__amili" width="300" height="360" loading="eager"
                onError={e => { e.target.style.display = 'none'; }}/>
              <img src="/images/team/avatars/paola-navy-blazer.png"
                alt="Paola Rogers — HC Business & Media"
                className="md-hero__paola" width="200" height="240" loading="eager"
                onError={e => { e.target.style.display = 'none'; }}/>
            </div>
          </div>
        </section>

        {/* ── TRUST BAND ── */}
        <section className="md-trust">
          <div className="container">
            <div className="md-trust__grid" ref={ref1}>
              {[
                { val: '50K+',  label_es: 'Alcance mensual en medios',   label_en: 'Monthly media reach' },
                { val: '7',     label_es: 'Programas activos',            label_en: 'Active shows' },
                { val: '8',     label_es: 'Mundos en HC Business 360',    label_en: 'Worlds in HC Business 360' },
                { val: '2K+',   label_es: 'Graduados de Ruta Empresarial', label_en: 'Ruta Empresarial graduates' },
                { val: '100%',  label_es: 'En español e inglés',          label_en: 'In Spanish and English' },
                { val: '1',     label_es: 'Ecosistema. Todo conectado.',   label_en: 'Ecosystem. All connected.' },
              ].map((s, i) => (
                <div key={i} className="md-trust__item fade-up">
                  <span className="md-trust__val">{s.val}</span>
                  <span className="md-trust__label">{lang === 'es' ? s.label_es : s.label_en}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HC BUSINESS 360 / ORBITA ── */}
        <section className="md-orbita section" id="orbita" ref={ref2}>
          <div className="container">
            <div className="md-orbita__header fade-up">
              <span className="eyebrow">{text('HC Business 360 · Plataforma Órbita', 'HC Business 360 · Órbita Platform')}</span>
              <h2 className="display-2">
                {text('Tu negocio, su propio universo.', 'Your business, its own universe.')}<br/>
                <em style={{ fontStyle: 'italic', color: 'var(--media-lilac)' }}>
                  {text('Administrado por el equipo HC.', 'Managed by the HC team.')}
                </em>
              </h2>
              <p className="body-lg" style={{ color: 'var(--hc-soft)', maxWidth: 600 }}>
                {text(
                  'Cada tipo de negocio tiene su propio mundo dentro de la plataforma Órbita — con su paleta de colores, su equipo virtual ilustrado, sus funciones específicas, y el equipo real de HC detrás de cada operación.',
                  'Each type of business has its own world within the Órbita platform — with its own color palette, its illustrated virtual team, its specific functions, and the real HC team behind every operation.'
                )}
              </p>
            </div>

            <div className="md-orbita__worlds fade-up">
              {APP_WORLDS.map(world => (
                <div
                  key={world.id}
                  className={`md-world${activeWorld === world.id ? ' md-world--active' : ''}`}
                  style={{ '--world-color': world.color, '--world-bg': world.bg }}
                  onClick={() => setActiveWorld(activeWorld === world.id ? null : world.id)}
                >
                  <div className="md-world__top">
                    <span className="md-world__num">{world.num}</span>
                    <span className="md-world__emoji">{world.emoji}</span>
                  </div>
                  <strong className="md-world__title">{world.title}</strong>
                  <span className="md-world__trade">
                    {lang === 'es' ? world.trade_es : world.trade_en}
                  </span>
                </div>
              ))}
            </div>

            <div className="md-orbita__features fade-up">
              <p className="md-orbita__features-label">
                {text('Funciones presentes en todos los mundos:', 'Functions present in all worlds:')}
              </p>
              <div className="md-orbita__features-grid">
                {APP_FEATURES.map((f, i) => (
                  <div key={i} className="md-orbita__feature">
                    <span>{f.icon}</span>
                    <span>{lang === 'es' ? f.label_es : f.label_en}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="md-orbita__trust fade-up">
              {[
                { icon: '🔒', label_es: 'Tus datos, siempre tuyos', label_en: 'Your data, always yours' },
                { icon: '👥', label_es: 'La app no se vende sola — equipo HC incluido', label_en: 'App never sold alone — HC team included' },
                { icon: '🤝', label_es: 'No eres un ticket de soporte. Eres un cliente HC.', label_en: 'You are not a support ticket. You are an HC client.' },
              ].map((t, i) => (
                <div key={i} className="md-orbita__trust-item">
                  <span>{t.icon}</span>
                  <span>{lang === 'es' ? t.label_es : t.label_en}</span>
                </div>
              ))}
            </div>

            <div className="md-orbita__cta fade-up">
              <a href={WHATSAPP.media} target="_blank" rel="noopener noreferrer" className="btn md-btn--primary">
                {text('Ver demo de Órbita', 'See Órbita demo')}
              </a>
            </div>
          </div>
        </section>

        {/* ── RUTA EMPRESARIAL ── */}
        <section className="md-ruta section--sm">
          <div className="container">
            <div className="md-ruta__inner fade-up">
              <div className="md-ruta__content">
                <span className="eyebrow md-ruta__eyebrow">{text('Programa educativo', 'Educational program')}</span>
                <h2 className="display-2" style={{ color: 'var(--hc-ivory)', margin: '8px 0 var(--space-sm)' }}>
                  {text('Ruta Empresarial', 'Ruta Empresarial')}
                </h2>
                <p style={{ color: 'rgba(253,249,245,0.78)', fontSize: '1.05rem', lineHeight: 1.85, marginBottom: 'var(--space-md)', maxWidth: 520 }}>
                  {text(
                    'El programa de educación empresarial para emprendedores latinos de Upstate SC. Finanzas, marketing, operaciones, y estrategia — en talleres prácticos con el equipo HC, no en salones de clase.',
                    'The business education program for Latino entrepreneurs in Upstate SC. Finance, marketing, operations, and strategy — in practical workshops with the HC team, not in classrooms.'
                  )}
                </p>
                <div className="md-ruta__modules">
                  {[
                    { es: 'Flujo de caja y presupuesto',       en: 'Cash flow and budgeting' },
                    { es: 'Marketing digital para tu negocio', en: 'Digital marketing for your business' },
                    { es: 'Cómo leer tus números',             en: 'How to read your numbers' },
                    { es: 'Estructura legal y fiscal',         en: 'Legal and tax structure' },
                    { es: 'Acceso a capital y crédito',        en: 'Access to capital and credit' },
                    { es: 'Plan de negocio ejecutable',        en: 'Executable business plan' },
                  ].map((m, i) => (
                    <div key={i} className="md-ruta__module">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7l3 3 7-7" stroke="var(--media-lilac)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {lang === 'es' ? m.es : m.en}
                    </div>
                  ))}
                </div>
                <div className="md-ruta__stats">
                  <div><strong>2,000+</strong><span>{text('graduados', 'graduates')}</span></div>
                  <div><strong>100%</strong><span>{text('gratuito', 'free')}</span></div>
                  <div><strong>6</strong><span>{text('módulos prácticos', 'practical modules')}</span></div>
                </div>
                <div className="md-ruta__actions">
                  <a href={WHATSAPP.ruta} target="_blank" rel="noopener noreferrer" className="btn md-btn--primary">
                    {text('Inscribirme en Ruta Empresarial', 'Enroll in Ruta Empresarial')}
                  </a>
                  <Link to="/eventos" className="btn md-btn--outline">
                    {text('Ver próximos talleres', 'See upcoming workshops')}
                  </Link>
                </div>
              </div>
              <div className="md-ruta__image">
                <img src="/images/team/avatars/paola-teaching.png"
                  alt="Paola Rogers — Ruta Empresarial"
                  className="md-ruta__avatar" width="380" height="460" loading="lazy"
                  onError={e => { e.target.style.display = 'none'; }}/>
              </div>
            </div>
          </div>
        </section>

        {/* ── SHOWS ── */}
        <section className="md-shows section--sm" ref={ref3}>
          <div className="container">
            <div className="md-shows__header fade-up">
              <span className="eyebrow">{text('Programas y Shows', 'Programs & Shows')}</span>
              <h2 className="display-2">
                {text('50,000+ oyentes mensuales.', '50,000+ monthly listeners.')}<br/>
                <em style={{ fontStyle: 'italic', color: 'var(--media-lilac)' }}>
                  {text('Contenido real para la comunidad real.', 'Real content for the real community.')}
                </em>
              </h2>
              <p className="body-lg" style={{ color: 'var(--hc-soft)', maxWidth: 560 }}>
                {text(
                  'Siete programas en español cobriendo noticias locales, finanzas, entretenimiento, negocios, y conversación comunitaria — en podcast, video, y redes sociales.',
                  'Seven Spanish-language programs covering local news, finance, entertainment, business, and community conversation — in podcast, video, and social media.'
                )}
              </p>
            </div>
            <div className="md-shows__grid fade-up">
              {SHOWS.map(show => (
                <div key={show.id} className="md-show-card" style={{ '--show-color': show.color }}>
                  <span className="md-show-card__emoji">{show.emoji}</span>
                  <strong className="md-show-card__title">{show.title}</strong>
                  <p className="md-show-card__desc">
                    {lang === 'es' ? show.desc_es : show.desc_en}
                  </p>
                  <span className="md-show-card__cta">
                    {text('Ver episodios →', 'See episodes →')}
                  </span>
                </div>
              ))}
            </div>
            <div className="md-shows__media-cta fade-up">
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 300, color: 'var(--hc-navy)', marginBottom: 6 }}>
                  {text('¿Quieres aparecer en nuestros programas?', 'Want to appear on our programs?')}
                </h3>
                <p style={{ color: 'var(--hc-soft)', fontSize: '0.9rem' }}>
                  {text(
                    'Nuestros shows están siempre abiertos a voces de la comunidad. Empresarios, expertos, y líderes locales.',
                    'Our shows are always open to community voices. Entrepreneurs, experts, and local leaders.'
                  )}
                </p>
              </div>
              <a href={WHATSAPP.media} target="_blank" rel="noopener noreferrer" className="btn btn--outline" style={{ flexShrink: 0 }}>
                {text('Ser invitado', 'Be a guest')}
              </a>
            </div>
          </div>
        </section>

        {/* ── PACKAGES ── */}
        <section className="md-packages section">
          <div className="container">
            <div className="md-packages__header fade-up">
              <span className="eyebrow">{text('Paquetes HC Business & Media', 'HC Business & Media packages')}</span>
              <h2 className="display-2">
                {text('Elige tu punto de entrada.', 'Choose your entry point.')}<br/>
                <em style={{ fontStyle: 'italic', color: 'var(--media-lilac)' }}>
                  {text('Escala cuando estés listo.', 'Scale when you are ready.')}
                </em>
              </h2>
              <p className="body-lg" style={{ color: 'var(--hc-soft)', maxWidth: 560 }}>
                {text(
                  'Todos los paquetes incluyen el equipo HC real — no un chatbot, no una base de datos de respuestas. Personas que conocen tu negocio.',
                  'All packages include the real HC team — not a chatbot, not a database of answers. People who know your business.'
                )}
              </p>
            </div>
            <div className="md-packages__grid fade-up">
              {PACKAGES.map(pkg => (
                <div key={pkg.id} className={`md-pkg${pkg.featured ? ' md-pkg--featured' : ''}`}
                  style={{ '--pkg-color': pkg.color }}>
                  {pkg.featured && (
                    <div className="md-pkg__featured-badge">
                      {text('Más popular', 'Most popular')}
                    </div>
                  )}
                  <h3 className="md-pkg__title">{lang === 'es' ? pkg.title_es : pkg.title_en}</h3>
                  <div className="md-pkg__price">{lang === 'es' ? pkg.price_es : pkg.price_en}</div>
                  <p className="md-pkg__desc">{lang === 'es' ? pkg.desc_es : pkg.desc_en}</p>
                  <ul className="md-pkg__includes">
                    {(lang === 'es' ? pkg.includes_es : pkg.includes_en).map((item, j) => (
                      <li key={j}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="var(--pkg-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a href={WHATSAPP.media} target="_blank" rel="noopener noreferrer"
                    className={`btn md-pkg__cta${pkg.featured ? ' md-btn--primary' : ' md-btn--outline-dark'}`}>
                    {lang === 'es' ? pkg.cta_es : pkg.cta_en}
                  </a>
                </div>
              ))}
            </div>
            <p className="md-packages__note fade-up">
              {text(
                '¿No estás seguro cuál paquete es el correcto para ti? Hablemos 30 minutos y lo descubrimos juntos. Sin compromiso.',
                'Not sure which package is right for you? Let\'s talk 30 minutes and find out together. No commitment.'
              )}
              <a href={WHATSAPP.media} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--media-lilac)', fontWeight: 600, marginLeft: 6 }}>
                {text('Agendar llamada →', 'Schedule call →')}
              </a>
            </p>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="md-cta">
          <div className="container">
            <div className="md-cta__inner">
              <img src="/images/team/avatars/paola-presenting.png"
                alt="Paola Rogers — HC Business & Media"
                className="md-cta__avatar" width="240" height="280" loading="lazy"
                onError={e => { e.target.style.display = 'none'; }}/>
              <div className="md-cta__text">
                <h2 className="display-2" style={{ color: 'var(--hc-ivory)' }}>
                  {text('Tu negocio merece el mismo ecosistema que construimos para 20,000 familias.', 'Your business deserves the same ecosystem we built for 20,000 families.')}
                </h2>
                <p style={{ color: 'rgba(253,249,245,0.7)', marginTop: 'var(--space-sm)', fontSize: '1.05rem' }}>
                  {text(
                    'Una conversación de 30 minutos con Amili. Sin costo, sin compromiso. Solo posibilidades.',
                    'A 30-minute conversation with Amili. No cost, no commitment. Just possibilities.'
                  )}
                </p>
                <div className="md-cta__actions">
                  <a href={WHATSAPP.media} target="_blank" rel="noopener noreferrer" className="btn md-btn--primary">
                    {text('Hablar con Amili por WhatsApp', 'Talk to Amili on WhatsApp')}
                  </a>
                  <Link to="/bonanza" className="btn md-btn--ghost">
                    {text('¿También necesitas un préstamo? →', 'Also need a loan? →')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <style>{`
        .media-page {}

        /* Hero */
        .md-hero { position:relative; min-height:100vh; display:flex; align-items:center; padding-top:var(--nav-height); overflow:hidden; }
        .md-hero__bg { position:absolute; inset:0; z-index:0; }
        .md-hero__gradient { width:100%; height:100%; background:linear-gradient(135deg,#1e1a2e 0%,#3d2b6e 40%,#2d1e5e 70%,#1e1a2e 100%); }
        .md-hero__content { position:relative; z-index:1; display:grid; grid-template-columns:1fr auto; gap:var(--space-xl); align-items:center; padding-top:var(--space-xl); padding-bottom:var(--space-xl); }
        .md-hero__eyebrow { color:var(--media-lilac); margin-bottom:var(--space-sm); }
        .md-hero__headline { font-family:var(--font-heading); font-size:clamp(2.2rem,4.5vw,3.8rem); font-weight:300; color:var(--hc-ivory); line-height:1.1; margin-bottom:var(--space-sm); }
        .md-hero__headline em { color:var(--media-lilac); font-style:italic; }
        .md-hero__body { font-size:1.05rem; color:rgba(253,249,245,0.78); line-height:1.85; margin-bottom:var(--space-md); max-width:540px; }
        .md-hero__pillars { display:flex; flex-wrap:wrap; gap:var(--space-xs); margin-bottom:var(--space-md); }
        .md-hero__pillar { display:flex; align-items:center; gap:6px; padding:6px 14px; background:rgba(139,123,181,0.15); border:1px solid rgba(139,123,181,0.3); border-radius:20px; font-size:0.78rem; font-weight:500; color:rgba(253,249,245,0.8); }
        .md-hero__actions { display:flex; flex-wrap:wrap; gap:var(--space-sm); }
        .md-hero__avatars { position:relative; width:320px; height:400px; flex-shrink:0; }
        .md-hero__amili { position:absolute; right:0; bottom:0; width:260px; height:auto; object-fit:contain; filter:drop-shadow(0 20px 40px rgba(0,0,0,0.5)); }
        .md-hero__paola { position:absolute; left:0; top:0; width:160px; height:auto; object-fit:contain; filter:drop-shadow(0 10px 30px rgba(0,0,0,0.4)); opacity:0.85; }

        /* Buttons */
        .md-btn--primary { background:var(--media-lilac); color:white; }
        .md-btn--primary:hover { background:var(--media-mid); }
        .md-btn--outline { border:1.5px solid rgba(253,249,245,0.4); color:var(--hc-ivory); }
        .md-btn--outline:hover { background:rgba(253,249,245,0.1); }
        .md-btn--outline-dark { border:1.5px solid var(--hc-border); color:var(--hc-navy); }
        .md-btn--outline-dark:hover { background:var(--hc-ivory); }
        .md-btn--ghost { color:var(--media-lilac); padding-left:0; padding-right:0; }
        .md-btn--ghost:hover { color:white; }

        /* Trust band */
        .md-trust { background:var(--hc-navy); padding:var(--space-lg) 0; }
        .md-trust__grid { display:grid; grid-template-columns:repeat(6,1fr); gap:1px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.06); border-radius:var(--radius-lg); overflow:hidden; }
        .md-trust__item { background:var(--hc-navy); padding:var(--space-md); text-align:center; }
        .md-trust__val { display:block; font-family:var(--font-heading); font-size:clamp(1.4rem,2.5vw,2rem); font-weight:300; color:var(--media-lilac); line-height:1; margin-bottom:var(--space-xs); }
        .md-trust__label { display:block; font-size:0.75rem; color:rgba(255,255,255,0.5); line-height:1.5; }

        /* Órbita */
        .md-orbita { background:var(--hc-ivory); }
        .md-orbita__header { max-width:680px; margin-bottom:var(--space-lg); }
        .md-orbita__worlds { display:grid; grid-template-columns:repeat(4,1fr); gap:var(--space-sm); margin-bottom:var(--space-lg); }
        .md-world { background:var(--world-bg); border:1.5px solid transparent; border-radius:var(--radius-lg); padding:var(--space-md); cursor:pointer; transition:all var(--duration) var(--ease); }
        .md-world:hover { border-color:var(--world-color); box-shadow:var(--shadow-md); transform:translateY(-2px); }
        .md-world--active { border-color:var(--world-color); box-shadow:0 0 0 3px color-mix(in srgb,var(--world-color) 20%,transparent); }
        .md-world__top { display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-xs); }
        .md-world__num { font-family:var(--font-heading); font-size:1.6rem; font-weight:300; color:var(--world-color); opacity:0.4; line-height:1; }
        .md-world__emoji { font-size:1.8rem; }
        .md-world__title { display:block; font-size:0.95rem; font-weight:600; color:var(--hc-navy); margin-bottom:4px; }
        .md-world__trade { font-size:0.78rem; color:var(--world-color); font-weight:500; }

        .md-orbita__features { background:white; border:1px solid var(--hc-border); border-radius:var(--radius-lg); padding:var(--space-md); margin-bottom:var(--space-md); }
        .md-orbita__features-label { font-size:0.78rem; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:var(--hc-soft); margin-bottom:var(--space-sm); }
        .md-orbita__features-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:var(--space-sm); }
        .md-orbita__feature { display:flex; align-items:center; gap:8px; font-size:0.875rem; color:var(--hc-text); }
        .md-orbita__feature span:first-child { font-size:1.2rem; }

        .md-orbita__trust { display:flex; flex-wrap:wrap; gap:var(--space-sm); margin-bottom:var(--space-md); }
        .md-orbita__trust-item { display:flex; align-items:center; gap:8px; padding:8px 16px; background:white; border:1px solid var(--hc-border); border-radius:20px; font-size:0.82rem; color:var(--hc-text); }
        .md-orbita__trust-item span:first-child { font-size:1rem; }
        .md-orbita__cta { text-align:center; }

        /* Ruta Empresarial */
        .md-ruta { background:var(--hc-navy); }
        .md-ruta__eyebrow { color:var(--media-lilac); }
        .md-ruta__inner { display:grid; grid-template-columns:1fr auto; gap:var(--space-xl); align-items:center; }
        .md-ruta__modules { display:grid; grid-template-columns:1fr 1fr; gap:var(--space-xs); margin-bottom:var(--space-md); }
        .md-ruta__module { display:flex; align-items:center; gap:8px; font-size:0.875rem; color:rgba(253,249,245,0.8); }
        .md-ruta__stats { display:flex; gap:var(--space-lg); margin-bottom:var(--space-md); }
        .md-ruta__stats div { display:flex; flex-direction:column; }
        .md-ruta__stats strong { font-family:var(--font-heading); font-size:1.8rem; font-weight:300; color:var(--media-lilac); line-height:1; }
        .md-ruta__stats span { font-size:0.75rem; color:rgba(253,249,245,0.55); }
        .md-ruta__actions { display:flex; flex-wrap:wrap; gap:var(--space-sm); }
        .md-ruta__avatar { width:320px; height:auto; object-fit:contain; filter:drop-shadow(0 20px 40px rgba(0,0,0,0.4)); }

        /* Shows */
        .md-shows { background:white; }
        .md-shows__header { max-width:640px; margin-bottom:var(--space-lg); }
        .md-shows__grid { display:grid; grid-template-columns:repeat(4,1fr); gap:var(--space-sm); margin-bottom:var(--space-md); }
        .md-show-card { background:var(--hc-ivory); border:1px solid var(--hc-border); border-radius:var(--radius-lg); padding:var(--space-md); display:flex; flex-direction:column; gap:var(--space-xs); border-top:3px solid var(--show-color); transition:all var(--duration) var(--ease); cursor:pointer; }
        .md-show-card:hover { box-shadow:var(--shadow-md); transform:translateY(-2px); border-color:var(--show-color); }
        .md-show-card__emoji { font-size:1.8rem; }
        .md-show-card__title { font-size:0.95rem; font-weight:600; color:var(--hc-navy); }
        .md-show-card__desc { font-size:0.8rem; color:var(--hc-soft); line-height:1.5; flex:1; }
        .md-show-card__cta { font-size:0.75rem; font-weight:600; color:var(--show-color); margin-top:auto; }
        .md-shows__media-cta { display:flex; justify-content:space-between; align-items:center; gap:var(--space-lg); padding:var(--space-md); background:var(--hc-ivory); border-radius:var(--radius-lg); border:1px solid var(--hc-border); flex-wrap:wrap; }

        /* Packages */
        .md-packages { background:var(--hc-ivory); }
        .md-packages__header { max-width:640px; margin-bottom:var(--space-lg); }
        .md-packages__grid { display:grid; grid-template-columns:repeat(3,1fr); gap:var(--space-sm); margin-bottom:var(--space-md); }
        .md-pkg { background:white; border:1.5px solid var(--hc-border); border-radius:var(--radius-lg); padding:var(--space-lg); display:flex; flex-direction:column; gap:var(--space-sm); border-top:3px solid var(--pkg-color); position:relative; transition:box-shadow var(--duration) var(--ease); }
        .md-pkg:hover { box-shadow:var(--shadow-lg); }
        .md-pkg--featured { border-color:var(--pkg-color); border-width:2px; box-shadow:0 0 0 4px color-mix(in srgb,var(--pkg-color) 12%,transparent); }
        .md-pkg__featured-badge { position:absolute; top:-1px; right:var(--space-md); background:var(--pkg-color); color:white; font-size:0.65rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; padding:4px 12px; border-radius:0 0 var(--radius-sm) var(--radius-sm); }
        .md-pkg__title { font-family:var(--font-heading); font-size:1.5rem; font-weight:300; color:var(--hc-navy); }
        .md-pkg__price { font-size:1.1rem; font-weight:600; color:var(--pkg-color); }
        .md-pkg__desc { font-size:0.875rem; color:var(--hc-soft); line-height:1.7; }
        .md-pkg__includes { list-style:none; display:flex; flex-direction:column; gap:8px; flex:1; }
        .md-pkg__includes li { display:flex; align-items:flex-start; gap:8px; font-size:0.85rem; color:var(--hc-text); line-height:1.5; }
        .md-pkg__cta { margin-top:auto; justify-content:center; }
        .md-packages__note { font-size:0.9rem; color:var(--hc-soft); text-align:center; }

        /* Final CTA */
        .md-cta { background:var(--hc-navy); padding:var(--space-xl) 0; background:linear-gradient(135deg,#1e1a2e 0%,#3d2b6e 60%,#1e1a2e 100%); }
        .md-cta__inner { display:grid; grid-template-columns:auto 1fr; gap:var(--space-xl); align-items:center; }
        .md-cta__avatar { width:200px; height:auto; object-fit:contain; filter:drop-shadow(0 10px 30px rgba(0,0,0,0.5)); }
        .md-cta__actions { display:flex; flex-wrap:wrap; gap:var(--space-sm); margin-top:var(--space-md); }

        @media(max-width:1100px) { .md-orbita__worlds{grid-template-columns:repeat(4,1fr);} .md-shows__grid{grid-template-columns:repeat(3,1fr);} .md-trust__grid{grid-template-columns:repeat(3,1fr);} }
        @media(max-width:900px) { .md-hero__content{grid-template-columns:1fr;} .md-hero__avatars{display:none;} .md-ruta__inner{grid-template-columns:1fr;} .md-ruta__image{display:none;} .md-cta__inner{grid-template-columns:1fr;} .md-cta__avatar{display:none;} .md-packages__grid{grid-template-columns:1fr;} .md-orbita__worlds{grid-template-columns:repeat(2,1fr);} .md-shows__grid{grid-template-columns:1fr 1fr;} }
        @media(max-width:600px) { .md-orbita__worlds{grid-template-columns:1fr 1fr;} .md-shows__grid{grid-template-columns:1fr;} .md-trust__grid{grid-template-columns:repeat(2,1fr);} .md-ruta__modules{grid-template-columns:1fr;} .md-orbita__features-grid{grid-template-columns:1fr 1fr;} }
      `}</style>
    </>
  );
}
