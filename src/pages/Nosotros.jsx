import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/layout/SEOHead.jsx';
import { TEAM, TEAM_ASSETS } from '../config/team.config.js';
import { WHATSAPP } from '../config/site.config.js';
import { useLanguage } from '../hooks/useLanguage.js';
import { useScrollAnimation } from '../hooks/useScrollAnimation.js';

const AVATAR_MAP = {
  paola:   { scene: '/images/team/avatars/paola-green-skirt.png',   portrait: '/images/team/avatars/paola-denim-portrait.png' },
  dayana:  { scene: '/images/team/avatars/dayana-car.png',          portrait: '/images/team/avatars/dayana-portrait.png' },
  adriana: { scene: '/images/team/avatars/adriana-office.png',      portrait: '/images/team/avatars/adriana-office.png' },
  andrea:  { scene: '/images/team/avatars/andrea-portrait.png',     portrait: '/images/team/avatars/andrea-portrait.png' },
  amili:   { scene: '/images/team/avatars/amili-portrait.png',      portrait: '/images/team/avatars/amili-portrait.png' },
  dollys:  { scene: '/images/team/avatars/dollys-desk.png',         portrait: '/images/team/avatars/dollys-desk.png' },
};

const BRAND_MAP = {
  bonanza: { label: 'Bonanza Quick Loans', color: 'var(--bonanza-gold)',  path: '/bonanza' },
  zivo:    { label: 'Zivo Insurance',      color: 'var(--zivo-teal)',     path: '/zivo' },
  media:   { label: 'HC Business & Media', color: 'var(--media-lilac)',   path: '/media' },
  hc:      { label: 'Hispanos Comunidad',  color: 'var(--hc-brass)',      path: '/' },
};

const VALUES = [
  {
    icon: '🤝',
    title_es: 'Comunidad primero',
    title_en: 'Community first',
    desc_es: 'Cada decisión que tomamos comienza con una pregunta: ¿cómo le sirve esto a la comunidad latina de Upstate SC?',
    desc_en: 'Every decision we make starts with one question: how does this serve the Latino community of Upstate SC?',
  },
  {
    icon: '🌱',
    title_es: 'Crecimiento real',
    title_en: 'Real growth',
    desc_es: 'No prometemos atajos. Construimos con pasos sólidos — capital, protección, educación y tecnología — en ese orden.',
    desc_en: 'We do not promise shortcuts. We build with solid steps — capital, protection, education, and technology — in that order.',
  },
  {
    icon: '🔍',
    title_es: 'Transparencia total',
    title_en: 'Total transparency',
    desc_es: 'Sin letra pequeña, sin cobros escondidos, sin promesas vacías. Lo que decimos es lo que hacemos.',
    desc_en: 'No fine print, no hidden charges, no empty promises. What we say is what we do.',
  },
  {
    icon: '💡',
    title_es: 'Innovación con propósito',
    title_en: 'Innovation with purpose',
    desc_es: 'Usamos tecnología no para reemplazar el contacto humano, sino para llegar a más personas con el mismo calor.',
    desc_en: 'We use technology not to replace human connection, but to reach more people with the same warmth.',
  },
];

const MILESTONES = [
  { year: '2010', event_es: 'Paola Rogers funda Bonanza Quick Loans en Greenville, SC. Primera sucursal en Laurens Road.', event_en: 'Paola Rogers founds Bonanza Quick Loans in Greenville, SC. First branch on Laurens Road.' },
  { year: '2013', event_es: 'Se abre la segunda sucursal. Más de 1,000 préstamos entregados en los primeros 3 años.', event_en: 'Second branch opens. Over 1,000 loans delivered in the first 3 years.' },
  { year: '2016', event_es: 'Nace Zivo Insurance para cubrir una necesidad urgente de la comunidad: seguros sin barreras de documentación.', event_en: 'Zivo Insurance is born to address an urgent community need: insurance without documentation barriers.' },
  { year: '2018', event_es: 'Se funda Hispanics United of SC como satélite sin fines de lucro. El modelo de autofinanciamiento entra en vigor.', event_en: 'Hispanics United of SC is founded as a nonprofit satellite. The self-funding model takes effect.' },
  { year: '2020', event_es: 'En plena pandemia, HC distribuye 100 bolsas de alimentos por semana durante un año completo sin interrupciones.', event_en: 'In the middle of the pandemic, HC distributes 100 food bags per week for an entire year without interruption.' },
  { year: '2022', event_es: 'Se lanza HC Business & Media con Ruta Empresarial, los programas de shows, y la plataforma digital.', event_en: 'HC Business & Media launches with Ruta Empresarial, show programming, and the digital platform.' },
  { year: '2024', event_es: 'Más de 20,000 préstamos entregados. 5,000+ familias aseguradas. 50,000+ oyentes mensuales en medios.', event_en: 'Over 20,000 loans delivered. 5,000+ families insured. 50,000+ monthly media listeners.' },
  { year: '2026', event_es: 'Se lanza hispanoscomunidad.com — la sede digital completa del ecosistema HC.', event_en: 'hispanoscomunidad.com launches — the complete digital headquarters of the HC ecosystem.' },
];

function TeamCard({ member, lang }) {
  const [hovered, setHovered] = useState(false);
  const avatars = AVATAR_MAP[member.id];
  const brand = BRAND_MAP[member.brand];

  return (
    <div
      className="ns-member-card"
      style={{ '--member-color': member.brandColor }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="ns-member-card__avatar-wrap">
        <img
          src={hovered && avatars?.portrait !== avatars?.scene ? avatars?.portrait : avatars?.scene}
          alt={member.name}
          className="ns-member-card__avatar"
          width="240" height="280"
          loading="lazy"
          onError={e => {
            e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='280' fill='%23e5d9ce'%3E%3Crect width='240' height='280'/%3E%3C/svg%3E`;
          }}
        />
        <div className="ns-member-card__brand-badge" style={{ background: member.brandColor }}>
          {brand?.label}
        </div>
      </div>
      <div className="ns-member-card__info">
        <strong className="ns-member-card__name">{member.name}</strong>
        <span className="ns-member-card__role">
          {lang === 'es' ? member.role_es : member.role_en}
        </span>
        <p className="ns-member-card__bio">
          {lang === 'es' ? member.bio_es : member.bio_en}
        </p>
        {brand?.path && (
          <Link to={brand.path} className="ns-member-card__link" style={{ color: member.brandColor }}>
            {lang === 'es' ? `Ver ${brand.label} →` : `See ${brand.label} →`}
          </Link>
        )}
      </div>
    </div>
  );
}

export default function Nosotros() {
  const { lang, text } = useLanguage();
  const ref1 = useScrollAnimation();
  const ref2 = useScrollAnimation();
  const ref3 = useScrollAnimation();

  return (
    <>
      <SEOHead lang={lang} />
      <main className="nosotros-page">

        {/* ── HERO ── */}
        <section className="ns-hero">
          <div className="container">
            <div className="ns-hero__inner">
              <div className="ns-hero__text">
                <span className="eyebrow ns-hero__eyebrow">
                  {text('El equipo detrás de todo', 'The team behind everything')}
                </span>
                <h1 className="ns-hero__headline">
                  {text('No trabajas con una empresa.', 'You don\'t work with a company.')}<br/>
                  <em>{text('Trabajas con nosotros.', 'You work with us.')}</em>
                </h1>
                <p className="ns-hero__body">
                  {text(
                    'Seis personas comprometidas con tu éxito. Te conocemos por nombre, conocemos tu historia, y nos importa genuinamente lo que estás construyendo. Esta es nuestra historia.',
                    'Six people committed to your success. We know you by name, we know your story, and we genuinely care about what you are building. This is our story.'
                  )}
                </p>
                <div className="ns-hero__actions">
                  <a href={WHATSAPP.general} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                    {text('Hablar con el equipo', 'Talk to the team')}
                  </a>
                  <Link to="/contacto" className="btn btn--outline ns-hero__outline">
                    {text('Ver todos los contactos', 'See all contacts')}
                  </Link>
                </div>
              </div>
              <div className="ns-hero__group">
                <img
                  src="/images/team/avatars/team-group.png"
                  alt={text('Equipo Hispanos Comunidad', 'Hispanos Comunidad Team')}
                  className="ns-hero__group-img"
                  width="500" height="380" loading="eager"
                  onError={e => { e.target.style.display = 'none'; }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── TEAM GRID ── */}
        <section className="ns-team section" ref={ref1}>
          <div className="container">
            <div className="ns-team__header fade-up">
              <span className="eyebrow">{text('Nuestro equipo', 'Our team')}</span>
              <h2 className="display-2">
                {text('Seis personas. Un ecosistema.', 'Six people. One ecosystem.')}
              </h2>
              <p className="body-lg" style={{ color: 'var(--hc-soft)', maxWidth: 520 }}>
                {text(
                  'Cada miembro del equipo lidera una parte del ecosistema — y juntos cubrimos todo lo que una familia o empresa latina puede necesitar.',
                  'Each team member leads a part of the ecosystem — and together we cover everything a Latino family or business could need.'
                )}
              </p>
            </div>
            <div className="ns-team__grid fade-up">
              {TEAM.map(member => (
                <TeamCard key={member.id} member={member} lang={lang} />
              ))}
            </div>
          </div>
        </section>

        {/* ── PAOLA STORY ── */}
        <section className="ns-paola section--sm" ref={ref2}>
          <div className="container">
            <div className="ns-paola__inner fade-up">
              <div className="ns-paola__avatars">
                <img src="/images/team/avatars/paola-teaching.png"
                  alt="Paola Rogers — enseñando en Ruta Empresarial"
                  className="ns-paola__img ns-paola__img--main"
                  width="340" height="400" loading="lazy"
                  onError={e => { e.target.style.display = 'none'; }}/>
                <img src="/images/team/avatars/paola-presenting.png"
                  alt="Paola Rogers — presentando crecimiento"
                  className="ns-paola__img ns-paola__img--secondary"
                  width="240" height="280" loading="lazy"
                  onError={e => { e.target.style.display = 'none'; }}/>
              </div>
              <div className="ns-paola__content">
                <span className="eyebrow">{text('La fundadora', 'The founder')}</span>
                <h2 className="display-2" style={{ margin: '8px 0 var(--space-sm)' }}>
                  {text('Paola Rogers', 'Paola Rogers')}
                </h2>
                <p className="ns-paola__bio">
                  {text(
                    'Paola llegó a Upstate South Carolina con una visión clara: que la comunidad latina merecía acceso a los mismos servicios financieros, educativos y tecnológicos que cualquier otra comunidad — sin barreras de idioma, sin discriminación por documentación, y sin tener que caminar sola.',
                    'Paola came to Upstate South Carolina with a clear vision: that the Latino community deserved access to the same financial, educational, and technological services as any other community — without language barriers, without documentation discrimination, and without having to walk alone.'
                  )}
                </p>
                <p className="ns-paola__bio">
                  {text(
                    'En 2010 fundó Bonanza Quick Loans. Luego Zivo Insurance. Luego Hispanics United. Luego HC Business & Media. No como cuatro negocios separados — sino como un ecosistema diseñado para que cada parte refuerce a las demás y reinvierta en la comunidad que las sostiene.',
                    'In 2010 she founded Bonanza Quick Loans. Then Zivo Insurance. Then Hispanics United. Then HC Business & Media. Not as four separate businesses — but as an ecosystem designed so each part reinforces the others and reinvests in the community that sustains them.'
                  )}
                </p>
                <blockquote className="ns-paola__quote">
                  {text(
                    '"Cuando un latino prospera, toda la comunidad prospera. Ese es el único modelo de negocio que tiene sentido para mí."',
                    '"When a Latino prospers, the whole community prospers. That is the only business model that makes sense to me."'
                  )}
                  <cite>— Paola Rogers</cite>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="ns-values section--sm">
          <div className="container">
            <div className="fade-up">
              <span className="eyebrow">{text('Lo que nos guía', 'What guides us')}</span>
              <h2 className="display-2" style={{ margin: '8px 0 var(--space-lg)' }}>
                {text('Cuatro valores. Sin excepción.', 'Four values. No exceptions.')}
              </h2>
              <div className="ns-values__grid">
                {VALUES.map((v, i) => (
                  <div key={i} className="ns-value">
                    <span className="ns-value__icon">{v.icon}</span>
                    <strong className="ns-value__title">{lang === 'es' ? v.title_es : v.title_en}</strong>
                    <p className="ns-value__desc">{lang === 'es' ? v.desc_es : v.desc_en}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section className="ns-timeline section" ref={ref3}>
          <div className="container container--narrow">
            <div className="fade-up">
              <span className="eyebrow">{text('Nuestra historia', 'Our history')}</span>
              <h2 className="display-2" style={{ margin: '8px 0 var(--space-lg)' }}>
                {text('14 años construyendo un ecosistema.', '14 years building an ecosystem.')}
              </h2>
              <div className="ns-timeline__list">
                {MILESTONES.map((m, i) => (
                  <div key={i} className="ns-milestone">
                    <div className="ns-milestone__year">{m.year}</div>
                    <div className="ns-milestone__dot"/>
                    <div className="ns-milestone__event">
                      {lang === 'es' ? m.event_es : m.event_en}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CLOSING CTA ── */}
        <section className="ns-cta">
          <div className="container">
            <div className="ns-cta__inner">
              <h2 className="display-2" style={{ color: 'var(--hc-ivory)' }}>
                {text('¿Listo para conocernos en persona?', 'Ready to meet us in person?')}
              </h2>
              <p style={{ color: 'rgba(253,249,245,0.7)', fontSize: '1.05rem', marginTop: 'var(--space-xs)' }}>
                {text(
                  'Visítanos en cualquiera de nuestras 6 oficinas en Upstate SC. O escríbenos y agendamos una llamada.',
                  'Visit us at any of our 6 offices in Upstate SC. Or write to us and we will schedule a call.'
                )}
              </p>
              <div className="ns-cta__actions">
                <a href={WHATSAPP.general} target="_blank" rel="noopener noreferrer" className="btn btn--brass">
                  {text('Escribirnos por WhatsApp', 'Message us on WhatsApp')}
                </a>
                <Link to="/contacto" className="btn btn--outline" style={{ borderColor: 'rgba(253,249,245,0.4)', color: 'var(--hc-ivory)' }}>
                  {text('Ver todas las oficinas', 'See all offices')}
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      <style>{`
        .nosotros-page {}

        /* Hero */
        .ns-hero { background:var(--hc-navy); padding:calc(var(--nav-height) + var(--space-xl)) 0 var(--space-xl); }
        .ns-hero__inner { display:grid; grid-template-columns:1fr auto; gap:var(--space-xl); align-items:center; }
        .ns-hero__eyebrow { color:var(--hc-brass); margin-bottom:var(--space-sm); }
        .ns-hero__headline { font-family:var(--font-heading); font-size:clamp(2.4rem,5vw,4rem); font-weight:300; color:var(--hc-ivory); line-height:1.08; margin-bottom:var(--space-sm); }
        .ns-hero__headline em { color:var(--hc-brass); font-style:italic; }
        .ns-hero__body { font-size:1.05rem; color:rgba(253,249,245,0.78); line-height:1.85; max-width:520px; margin-bottom:var(--space-md); }
        .ns-hero__actions { display:flex; flex-wrap:wrap; gap:var(--space-sm); }
        .ns-hero__outline { border-color:rgba(253,249,245,0.4); color:var(--hc-ivory); }
        .ns-hero__outline:hover { background:rgba(253,249,245,0.1); }
        .ns-hero__group-img { width:420px; height:auto; object-fit:contain; filter:drop-shadow(0 20px 40px rgba(0,0,0,0.4)); }

        /* Team grid */
        .ns-team { background:var(--hc-ivory); }
        .ns-team__header { max-width:560px; margin-bottom:var(--space-lg); }
        .ns-team__grid { display:grid; grid-template-columns:repeat(3,1fr); gap:var(--space-sm); }

        .ns-member-card { background:white; border:1px solid var(--hc-border); border-radius:var(--radius-lg); overflow:hidden; border-top:3px solid var(--member-color); transition:box-shadow var(--duration) var(--ease),transform var(--duration) var(--ease); }
        .ns-member-card:hover { box-shadow:var(--shadow-lg); transform:translateY(-3px); }
        .ns-member-card__avatar-wrap { position:relative; height:260px; overflow:hidden; background:var(--hc-ivory); }
        .ns-member-card__avatar { width:100%; height:100%; object-fit:cover; object-position:top center; transition:transform 0.5s var(--ease); }
        .ns-member-card:hover .ns-member-card__avatar { transform:scale(1.03); }
        .ns-member-card__brand-badge { position:absolute; bottom:0; left:0; right:0; padding:6px 12px; font-size:0.65rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:white; text-align:center; }
        .ns-member-card__info { padding:var(--space-sm) var(--space-md) var(--space-md); }
        .ns-member-card__name { display:block; font-size:1.05rem; font-weight:600; color:var(--hc-navy); margin-bottom:3px; }
        .ns-member-card__role { display:block; font-size:0.72rem; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:var(--member-color); margin-bottom:var(--space-xs); }
        .ns-member-card__bio { font-size:0.85rem; line-height:1.7; color:var(--hc-soft); margin-bottom:var(--space-xs); }
        .ns-member-card__link { font-size:0.78rem; font-weight:600; transition:opacity var(--duration) var(--ease); }
        .ns-member-card__link:hover { opacity:0.7; }

        /* Paola story */
        .ns-paola { background:white; }
        .ns-paola__inner { display:grid; grid-template-columns:auto 1fr; gap:var(--space-xl); align-items:start; }
        .ns-paola__avatars { position:relative; width:360px; flex-shrink:0; }
        .ns-paola__img--main { width:100%; height:auto; border-radius:var(--radius-lg); object-fit:cover; object-position:top; }
        .ns-paola__img--secondary { position:absolute; bottom:-20px; right:-20px; width:160px; height:auto; border-radius:var(--radius-lg); border:4px solid white; box-shadow:var(--shadow-lg); object-fit:cover; object-position:top; }
        .ns-paola__bio { font-size:1.05rem; line-height:1.9; color:var(--hc-text); margin-bottom:var(--space-md); }
        .ns-paola__quote { border-left:4px solid var(--hc-brass); padding-left:var(--space-md); margin:var(--space-md) 0; font-family:var(--font-heading); font-size:1.25rem; font-weight:300; color:var(--hc-navy); line-height:1.6; font-style:italic; }
        .ns-paola__quote cite { display:block; font-size:0.82rem; color:var(--hc-soft); font-style:normal; font-family:var(--font-body); margin-top:8px; }

        /* Values */
        .ns-values { background:var(--hc-navy); }
        .ns-values .eyebrow { color:var(--hc-brass); }
        .ns-values .display-2 { color:var(--hc-ivory); }
        .ns-values__grid { display:grid; grid-template-columns:repeat(4,1fr); gap:var(--space-sm); }
        .ns-value { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); border-radius:var(--radius-lg); padding:var(--space-md); display:flex; flex-direction:column; gap:var(--space-xs); transition:background var(--duration) var(--ease); }
        .ns-value:hover { background:rgba(255,255,255,0.09); }
        .ns-value__icon { font-size:2rem; }
        .ns-value__title { font-size:1rem; font-weight:600; color:var(--hc-ivory); }
        .ns-value__desc { font-size:0.875rem; color:rgba(253,249,245,0.6); line-height:1.7; }

        /* Timeline */
        .ns-timeline { background:var(--hc-ivory); }
        .ns-timeline__list { display:flex; flex-direction:column; position:relative; padding-left:80px; }
        .ns-timeline__list::before { content:''; position:absolute; left:40px; top:8px; bottom:8px; width:2px; background:var(--hc-border); }
        .ns-milestone { display:grid; grid-template-columns:0 auto 1fr; align-items:start; gap:var(--space-sm); padding:var(--space-sm) 0; position:relative; }
        .ns-milestone__year { position:absolute; left:-80px; width:64px; text-align:right; font-family:var(--font-heading); font-size:1.1rem; font-weight:300; color:var(--hc-brass); line-height:1.6; }
        .ns-milestone__dot { position:absolute; left:-47px; top:8px; width:14px; height:14px; border-radius:50%; background:white; border:3px solid var(--hc-brass); flex-shrink:0; }
        .ns-milestone__event { font-size:0.95rem; line-height:1.75; color:var(--hc-text); padding-bottom:var(--space-sm); border-bottom:1px solid var(--hc-border); }
        .ns-milestone:last-child .ns-milestone__event { border-bottom:none; }

        /* CTA */
        .ns-cta { background:var(--hc-navy); padding:var(--space-xl) 0; }
        .ns-cta__inner { max-width:640px; }
        .ns-cta__actions { display:flex; flex-wrap:wrap; gap:var(--space-sm); margin-top:var(--space-md); }

        @media(max-width:1100px) { .ns-values__grid{grid-template-columns:1fr 1fr;} }
        @media(max-width:900px) { .ns-hero__inner{grid-template-columns:1fr;} .ns-hero__group{display:none;} .ns-team__grid{grid-template-columns:1fr 1fr;} .ns-paola__inner{grid-template-columns:1fr;} .ns-paola__avatars{width:100%;max-width:400px;} }
        @media(max-width:600px) { .ns-team__grid{grid-template-columns:1fr;} .ns-values__grid{grid-template-columns:1fr;} }
      `}</style>
    </>
  );
}
