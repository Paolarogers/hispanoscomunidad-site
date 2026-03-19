import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/layout/SEOHead.jsx';
import { WHATSAPP, SITE } from '../config/site.config.js';
import { useLanguage } from '../hooks/useLanguage.js';
import { useScrollAnimation } from '../hooks/useScrollAnimation.js';
import { useCountUp } from '../hooks/useCountUp.js';

const PROGRAMS = [
  {
    num: '01',
    title_es: 'Programa 10 Pasos',
    title_en: '10 Steps Program',
    desc_es: 'Un camino práctico para familias y empresarios hispanos. Los participantes salen con presupuestos reales, planes de negocio concretos, y estrategias claras — no solo inspiración.',
    desc_en: 'A practical pathway for Hispanic families and entrepreneurs. Participants leave with real budgets, concrete business plans, and clear strategies — not just inspiration.',
    impact_es: 'Más de 2,000 graduados desde 2018',
    impact_en: 'Over 2,000 graduates since 2018',
    image: '/images/community/workshops/ruta-empresarial.jpg',
    color: 'var(--media-lilac)',
  },
  {
    num: '02',
    title_es: 'Salud y Alianzas Comunitarias',
    title_en: 'Health & Community Partnerships',
    desc_es: 'Junto a Bon Secours St. Francis Health System, facilitamos mamografías gratuitas, vacunaciones y educación de salud bilingüe en Upstate SC.',
    desc_en: 'Together with Bon Secours St. Francis Health System, we facilitate free mammograms, vaccinations, and bilingual health education across Upstate SC.',
    impact_es: 'Más de 5,000 exámenes de salud realizados',
    impact_en: 'Over 5,000 health screenings provided',
    image: '/images/community/health-days/bon-secours-blue-bus.jpg',
    color: 'var(--unidos-green)',
  },
  {
    num: '03',
    title_es: 'Respuesta en Crisis',
    title_en: 'Crisis Response',
    desc_es: 'Durante la pandemia de COVID-19, distribuimos 100 bolsas de alimentos cada semana durante un año completo. Cuando la comunidad lo necesitó, estuvimos ahí.',
    desc_en: 'During the COVID-19 pandemic, we distributed 100 food bags every week for an entire year. When the community needed it, we were there.',
    impact_es: '5,200 familias alimentadas durante 2020-2021',
    impact_en: '5,200 families fed during 2020-2021',
    image: '/images/community/events/celebracion-comunidad.jpg',
    color: 'var(--bonanza-gold)',
  },
  {
    num: '04',
    title_es: 'Orientación para Empresarios',
    title_en: 'Entrepreneur Guidance',
    desc_es: 'Consultoría empresarial personalizada y gratuita para startups y negocios pequeños hispanos. Desde planes de negocio hasta orientación fiscal y estrategia de crecimiento.',
    desc_en: 'Free personalized business consulting for Hispanic startups and small businesses. From business plans to tax guidance and growth strategy.',
    impact_es: 'Más de 500 empresarios orientados personalmente. 100% gratuito.',
    impact_en: 'Over 500 entrepreneurs coached personally. 100% free.',
    image: '/images/community/workshops/ruta-marketing.jpg',
    color: 'var(--zivo-teal)',
  },
  {
    num: '05',
    title_es: 'Alcance a través de HC Media',
    title_en: 'Reach through HC Media',
    desc_es: 'A través de Hispanos Comunidad Media, llegamos a más de 50,000 oyentes mensuales con historias de confianza, educación empresarial y oportunidades locales.',
    desc_en: 'Through Hispanos Comunidad Media, we reach 50,000+ monthly listeners with trusted stories, business education, and local opportunities.',
    impact_es: 'Más de 50,000 de alcance mensual. Programación diaria en español.',
    impact_en: '50,000+ monthly reach. Daily Spanish-language programming.',
    image: '/images/community/office/equipo-hc.jpg',
    color: 'var(--hc-lilac)',
  },
];

const PARTNERSHIPS = [
  {
    id: 'bonsecours',
    name: 'Bon Secours St. Francis',
    type_es: 'Alianza de Salud',
    type_en: 'Health Alliance',
    desc_es: 'Nuestra alianza con Bon Secours nos permite llevar consultas médicas gratuitas, el Blue Bus de medicina general, mamografías, vacunas y orientación de salud a comunidades latinas en Greenville y Spartanburg.',
    desc_en: 'Our alliance with Bon Secours allows us to bring free medical consultations, the general medicine Blue Bus, mammograms, vaccines, and health guidance to Latino communities in Greenville and Spartanburg.',
    logo: '/images/brands/unidos/bonsecours-logo.png',
    color: 'var(--unidos-green)',
  },
  {
    id: 'anderson',
    name: 'Anderson School District',
    type_es: 'Alianza Educativa',
    type_en: 'Educational Alliance',
    desc_es: 'Trabajamos directamente con Anderson School District para apoyar a estudiantes y familias latinas — desde orientación educativa hasta talleres para padres y conexión con recursos comunitarios.',
    desc_en: 'We work directly with Anderson School District to support Latino students and families — from educational guidance to parent workshops and community resource connection.',
    logo: '/images/brands/unidos/anderson-logo.png',
    color: 'var(--bonanza-gold)',
  },
];

const PARTNERSHIP_PACKAGES = [
  {
    title_es: 'Patrocinio de Taller',
    title_en: 'Workshop Sponsorship',
    desc_es: 'Patrocina el Programa 10 Pasos para empresarios hispanos — una vía probada hacia la claridad financiera, la planificación empresarial y el crecimiento sostenible.',
    desc_en: 'Sponsor the 10 Steps Program for Hispanic entrepreneurs — a proven pathway to financial clarity, business planning, and sustainable growth.',
    gets_es: ['Acceso directo a 50-150 empresarios por cohorte', 'Visibilidad de marca durante todo el programa', 'Oportunidad de presentar tus servicios', 'Métricas post-taller: asistencia, tasas de finalización'],
    gets_en: ['Direct access to 50-150 entrepreneurs per cohort', 'Brand visibility throughout the program', 'Opportunity to present your services', 'Post-workshop metrics: attendance, completion rates'],
    example_es: 'Un socio de servicios financieros se conectó con 120 dueños de negocios. Resultado: 34 clientes calificados, 12 nuevos clientes.',
    example_en: 'A financial services partner connected with 120 business owners. Result: 34 qualified leads, 12 new clients.',
    color: 'var(--media-lilac)',
  },
  {
    title_es: 'Eventos de Salud',
    title_en: 'Health Events',
    desc_es: 'Co-organiza exámenes de salud bilingües, campañas de vacunación o eventos de educación comunitaria que llegan a cientos de familias hispanas.',
    desc_en: 'Co-host bilingual health screenings, vaccination drives, or community education events reaching hundreds of Hispanic families.',
    gets_es: ['Impacto medible alineado con metas de CSR y DEI', 'Asociación de marca con acceso a atención médica', 'Cobertura mediática a través de HC Media (50K+ alcance)', 'Datos de seguimiento: participantes atendidos, citas programadas'],
    gets_en: ['Measurable community impact aligned with CSR and DEI goals', 'Brand association with trusted healthcare access', 'Media coverage through HC Media (50K+ reach)', 'Follow-up data: participants served, appointments scheduled'],
    example_es: 'Un socio del sector salud atendió a 1,200 familias. Resultado: 89% de seguimiento en citas, mejoras documentadas de salud.',
    example_en: 'A healthcare partner served 1,200 families. Result: 89% appointment follow-through, documented health improvements.',
    color: 'var(--unidos-green)',
  },
  {
    title_es: 'Visibilidad en Medios',
    title_en: 'Media Visibility',
    desc_es: 'Presenta tu organización en Hispanos Comunidad Media — llegando a más de 50,000 oyentes mensuales con validación auténtica de la comunidad, no publicidad tradicional.',
    desc_en: 'Feature your organization on Hispanos Comunidad Media — reaching 50,000+ monthly listeners with authentic community validation, not traditional advertising.',
    gets_es: ['Plataforma de confianza con audiencia hispana establecida', 'Entrevistas, reportajes, anuncios comunitarios', 'Amplificación digital y en redes sociales', 'Métricas de participación y retroalimentación'],
    gets_en: ['Trusted platform with established Hispanic audience', 'Interview opportunities, program spotlights, community announcements', 'Digital and social media amplification', 'Listener engagement metrics and feedback'],
    example_es: 'Un socio de seguros fue destacado en una serie de 4 partes. Resultado: más de 200 consultas, aumento medible de marca.',
    example_en: 'An insurance partner was featured in a 4-part series. Result: 200+ inquiries, measurable brand lift.',
    color: 'var(--hc-lilac)',
  },
];

function StatItem({ value, label, started }) {
  const count = useCountUp(value, 2000, started);
  return (
    <div className="hu-stat">
      <span className="hu-stat__value">{started ? count : '0'}</span>
      <span className="hu-stat__label">{label}</span>
    </div>
  );
}

function StatsGrid({ lang }) {
  const [started, setStarted] = useState(false);
  const ref = useScrollAnimation();

  const stats = [
    { value: '23000+', label_es: 'Familias empoderadas', label_en: 'Families empowered' },
    { value: '3000+',  label_es: 'Clientes activos diarios', label_en: 'Active clients daily' },
    { value: '14',     label_es: 'Años de servicio', label_en: 'Years of service' },
    { value: '50000+', label_es: 'Alcance mediático mensual', label_en: 'Monthly media reach' },
    { value: '100',    label_es: '% autofinanciada', label_en: '% self-funded' },
    { value: '2000+',  label_es: 'Graduados de talleres', label_en: 'Workshop graduates' },
  ];

  return (
    <div className="hu-stats" ref={ref} onLoad={() => setStarted(true)}>
      {stats.map((s, i) => (
        <StatItem key={i} value={s.value} label={lang === 'es' ? s.label_es : s.label_en} started={true} />
      ))}
    </div>
  );
}

export default function Unidos() {
  const { lang, text } = useLanguage();
  const ref1 = useScrollAnimation();
  const ref2 = useScrollAnimation();
  const ref3 = useScrollAnimation();

  return (
    <>
      <SEOHead lang={lang} />
      <main className="unidos-page">

        {/* ── HERO ── */}
        <section className="hu-hero">
          <div className="hu-hero__bg">
            <img src="/images/team/avatars/adriana-bus.png"
              alt="Hispanics United SC — comunidad latina Greenville"
              className="hu-hero__bus-img" width="1200" height="600" loading="eager"
              onError={e => { e.target.style.display = 'none'; }}/>
            <div className="hu-hero__overlay"/>
          </div>
          <div className="hu-hero__content container">
            <div className="hu-hero__text">
              <span className="eyebrow hu-hero__eyebrow">Hispanics United of SC</span>
              <h1 className="hu-hero__headline">
                {text('Construido por la comunidad.', 'Built by the community.')}<br/>
                <em>{text('Financiado por cada transacción.', 'Funded by every transaction.')}</em>
              </h1>
              <p className="hu-hero__body">
                {text(
                  'No esperamos donaciones ni subvenciones para actuar. Cada préstamo de Bonanza, cada póliza de Zivo, cada contrato de HC Business & Media — una parte llega directamente aquí. Así hemos operado desde el primer día.',
                  'We do not wait for donations or grants to act. Every Bonanza loan, every Zivo policy, every HC Business & Media contract — a portion comes directly here. That is how we have operated since day one.'
                )}
              </p>
              <div className="hu-hero__badges">
                <span className="hu-hero__badge hu-hero__badge--green">
                  {text('100% autofinanciada', '100% self-funded')}
                </span>
                <span className="hu-hero__badge">
                  {text('14 años de impacto', '14 years of impact')}
                </span>
                <span className="hu-hero__badge">
                  {text('Organización sin fines de lucro', 'Nonprofit organization')}
                </span>
              </div>
              <div className="hu-hero__actions">
                <a href={WHATSAPP.unidos} target="_blank" rel="noopener noreferrer" className="btn hu-btn--primary">
                  {text('Ser socio estratégico', 'Become a strategic partner')}
                </a>
                <a href="#programas" className="btn hu-btn--outline">
                  {text('Ver nuestros programas', 'See our programs')}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── FUNDING MODEL ── */}
        <section className="hu-funding">
          <div className="container">
            <div className="hu-funding__inner fade-up" ref={ref1}>
              <div className="hu-funding__content">
                <span className="eyebrow hu-funding__eyebrow">
                  {text('El modelo que nos hace únicos', 'The model that makes us unique')}
                </span>
                <h2 className="display-2" style={{ color: 'var(--hc-ivory)', margin: '8px 0 var(--space-sm)' }}>
                  {text('No pagas más.', 'You don\'t pay more.')}<br/>
                  <em style={{ color: 'var(--unidos-green)', fontStyle: 'italic' }}>
                    {text('Solo eliges con conciencia.', 'You simply choose with intention.')}
                  </em>
                </h2>
                <p style={{ color: 'rgba(253,249,245,0.75)', fontSize: '1.05rem', lineHeight: 1.85, maxWidth: 520 }}>
                  {text(
                    'Cuando eliges Bonanza para un préstamo, Zivo para tu seguro, o HC Business & Media para tu empresa — parte de esa transacción va directamente a Hispanics United. Sin donaciones adicionales. Sin formularios de caridad. Solo una elección consciente que cambia vidas.',
                    'When you choose Bonanza for a loan, Zivo for your insurance, or HC Business & Media for your business — part of that transaction goes directly to Hispanics United. No additional donations. No charity forms. Just a conscious choice that changes lives.'
                  )}
                </p>
              </div>
              <div className="hu-funding__flow">
                {[
                  { brand: 'Bonanza Quick Loans', color: 'var(--bonanza-gold)', icon: '💰' },
                  { brand: 'Zivo Insurance', color: 'var(--zivo-teal)', icon: '🛡️' },
                  { brand: 'HC Business & Media', color: 'var(--media-lilac)', icon: '📱' },
                ].map((b, i) => (
                  <div key={i} className="hu-funding__flow-item">
                    <div className="hu-funding__flow-brand" style={{ borderColor: b.color }}>
                      <span style={{ fontSize: '1.4rem' }}>{b.icon}</span>
                      <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--hc-ivory)' }}>{b.brand}</span>
                    </div>
                    <div className="hu-funding__flow-arrow">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 3v14M5 13l5 5 5-5" stroke={b.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span style={{ fontSize: '0.7rem', color: b.color, fontWeight: 700 }}>5%</span>
                    </div>
                  </div>
                ))}
                <div className="hu-funding__flow-destination">
                  <span style={{ fontSize: '1.6rem' }}>🏛️</span>
                  <strong style={{ color: 'var(--hc-ivory)', fontSize: '0.9rem' }}>Hispanics United SC</strong>
                  <span style={{ color: 'var(--unidos-green)', fontSize: '0.75rem' }}>
                    {text('Programas · Salud · Educación', 'Programs · Health · Education')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="hu-stats-section section--sm">
          <div className="container">
            <div className="fade-up">
              <span className="eyebrow">{text('14 años de impacto verificable', '14 years of verifiable impact')}</span>
              <h2 className="display-2" style={{ margin: '8px 0 var(--space-lg)' }}>
                {text('Los números que nos respaldan.', 'The numbers that back us up.')}
              </h2>
              <StatsGrid lang={lang} />
            </div>
          </div>
        </section>

        {/* ── PROGRAMS ── */}
        <section className="hu-programs section" id="programas" ref={ref2}>
          <div className="container">
            <div className="hu-programs__header fade-up">
              <span className="eyebrow">{text('Lo que hacemos', 'What we do')}</span>
              <h2 className="display-2">
                {text('Programas que generan cambio real.', 'Programs that generate real change.')}
              </h2>
              <p className="body-lg" style={{ color: 'var(--hc-soft)', maxWidth: 560 }}>
                {text(
                  'Hands-on. Medible. Liderado por la comunidad.',
                  'Hands-on. Measurable. Community-led.'
                )}
              </p>
            </div>
            <div className="hu-programs__list fade-up">
              {PROGRAMS.map((prog, i) => (
                <div key={i} className="hu-program" style={{ '--prog-color': prog.color }}>
                  <div className="hu-program__img-wrap">
                    <img src={prog.image} alt={lang === 'es' ? prog.title_es : prog.title_en}
                      className="hu-program__img" width="480" height="300" loading="lazy"
                      onError={e => { e.target.parentElement.style.background = 'var(--hc-ivory)'; e.target.style.display = 'none'; }}/>
                  </div>
                  <div className="hu-program__content">
                    <div className="hu-program__num">{prog.num}</div>
                    <h3 className="hu-program__title">
                      {lang === 'es' ? prog.title_es : prog.title_en}
                    </h3>
                    <p className="hu-program__desc">
                      {lang === 'es' ? prog.desc_es : prog.desc_en}
                    </p>
                    <div className="hu-program__impact">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7l3 3 7-7" stroke="var(--unidos-green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <strong>{lang === 'es' ? prog.impact_es : prog.impact_en}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PARTNERS ── */}
        <section className="hu-partners section--sm">
          <div className="container">
            <span className="eyebrow">{text('Alianzas estratégicas', 'Strategic alliances')}</span>
            <h2 className="display-2" style={{ margin: '8px 0 var(--space-lg)' }}>
              {text('No solo nos asociamos. Probamos el impacto juntos.', 'We do not just partner. We prove impact together.')}
            </h2>
            <div className="hu-partners__grid">
              {PARTNERSHIPS.map((partner, i) => (
                <div key={i} className="hu-partner-card" style={{ '--partner-color': partner.color }}>
                  <div className="hu-partner-card__logo-wrap">
                    <img src={partner.logo} alt={partner.name} width="160" height="60" loading="lazy"
                      onError={e => { e.target.style.display = 'none'; }}/>
                    <strong className="hu-partner-card__name">{partner.name}</strong>
                  </div>
                  <span className="hu-partner-card__type">{lang === 'es' ? partner.type_es : partner.type_en}</span>
                  <p className="hu-partner-card__desc">{lang === 'es' ? partner.desc_es : partner.desc_en}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PARTNERSHIP PACKAGES ── */}
        <section className="hu-packages section" ref={ref3}>
          <div className="container">
            <div className="hu-packages__header fade-up">
              <span className="eyebrow">{text('Alianzas corporativas', 'Corporate partnerships')}</span>
              <h2 className="display-2">
                {text('Cada alianza es personalizada.', 'Every partnership is customized.')}<br/>
                <em style={{ fontStyle: 'italic', color: 'var(--unidos-green)' }}>
                  {text('Cada resultado, medido.', 'Every result, measured.')}
                </em>
              </h2>
              <p className="body-lg" style={{ color: 'var(--hc-soft)', maxWidth: 580 }}>
                {text(
                  'No ofrecemos paquetes genéricos. Diseñamos cada alianza alrededor de tus metas, tu audiencia, y tu definición de éxito — y luego medimos lo que importa.',
                  'We do not offer generic packages. We design every partnership around your goals, your audience, and your definition of success — then we measure what matters.'
                )}
              </p>
            </div>
            <div className="hu-packages__grid fade-up">
              {PARTNERSHIP_PACKAGES.map((pkg, i) => (
                <div key={i} className="hu-pkg-card" style={{ '--pkg-color': pkg.color }}>
                  <h3 className="hu-pkg-card__title">
                    {lang === 'es' ? pkg.title_es : pkg.title_en}
                  </h3>
                  <p className="hu-pkg-card__desc">
                    {lang === 'es' ? pkg.desc_es : pkg.desc_en}
                  </p>
                  <div className="hu-pkg-card__gets-label">
                    {text('Lo que obtienes:', 'What you get:')}
                  </div>
                  <ul className="hu-pkg-card__gets">
                    {(lang === 'es' ? pkg.gets_es : pkg.gets_en).map((item, j) => (
                      <li key={j}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="var(--pkg-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="hu-pkg-card__example">
                    <strong>{text('Ejemplo real:', 'Real example:')}</strong>
                    <p>{lang === 'es' ? pkg.example_es : pkg.example_en}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="hu-packages__cta fade-up">
              <div className="hu-packages__cta-inner">
                <div>
                  <h3 className="display-2" style={{ color: 'var(--hc-ivory)' }}>
                    {text('¿Listo para construir el próximo puente juntos?', 'Ready to build the next bridge together?')}
                  </h3>
                  <p style={{ color: 'rgba(253,249,245,0.7)', marginTop: 'var(--space-xs)', fontSize: '1.05rem' }}>
                    {text(
                      'Empieza con una conversación de 30 minutos. Sin compromiso. Solo posibilidad.',
                      'Start with a 30-minute conversation. No commitment. Just possibility.'
                    )}
                  </p>
                </div>
                <a href={WHATSAPP.unidos} target="_blank" rel="noopener noreferrer" className="btn hu-btn--primary">
                  {text('Agendar conversación', 'Schedule conversation')}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY PARTNERS CHOOSE HU ── */}
        <section className="hu-why section--sm">
          <div className="container container--narrow">
            <span className="eyebrow">{text('Por qué los socios eligen Hispanics United', 'Why partners choose Hispanics United')}</span>
            <h2 className="display-2" style={{ margin: '8px 0 var(--space-lg)' }}>
              {text('La conexión sin resultados medibles es solo conversación.', 'Connection without measurable results is just talk.')}
            </h2>
            <div className="hu-why__grid">
              {[
                { icon: '🤝', title_es: 'Acceso auténtico', title_en: 'Authentic access', desc_es: '14 años de confianza comunitaria integrada — no alcance superficial.', desc_en: '14 years of embedded community trust — not surface-level outreach.' },
                { icon: '📊', title_es: 'Impacto probado', title_en: 'Proven impact', desc_es: 'Datos transparentes, seguimiento de resultados, reportes post-programa.', desc_en: 'Transparent data, outcome tracking, and post-program reporting.' },
                { icon: '🎯', title_es: 'Alineación CSR y DEI', title_en: 'CSR & DEI alignment', desc_es: 'Convierte los compromisos corporativos en progreso visible y verificable.', desc_en: 'Turn corporate commitments into visible, verified progress.' },
                { icon: '🔄', title_es: 'Modelo sostenible', title_en: 'Sustainable model', desc_es: '100% autofinanciada desde el inicio — independiente, consistente, responsable.', desc_en: '100% self-funded since inception — independent, consistent, accountable.' },
                { icon: '📻', title_es: 'Alcance en medios', title_en: 'Media reach', desc_es: 'Audiencia de 50,000+ mensuales a través de Hispanos Comunidad Media.', desc_en: '50,000+ monthly audience through Hispanos Comunidad Media.' },
                { icon: '🌱', title_es: 'Impacto duradero', title_en: 'Lasting impact', desc_es: 'Cada programa crea cambios reales que perduran más allá del evento.', desc_en: 'Each program creates real changes that last beyond the event.' },
              ].map((item, i) => (
                <div key={i} className="hu-why__item">
                  <span className="hu-why__icon">{item.icon}</span>
                  <strong className="hu-why__title">{lang === 'es' ? item.title_es : item.title_en}</strong>
                  <p className="hu-why__desc">{lang === 'es' ? item.desc_es : item.desc_en}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CLOSING CTA ── */}
        <section className="hu-closing">
          <div className="container">
            <div className="hu-closing__inner">
              <img src="/images/team/avatars/paola-green-skirt.png" alt="Paola Rogers — Hispanos Comunidad"
                className="hu-closing__paola" width="200" height="240" loading="lazy"
                onError={e => { e.target.style.display = 'none'; }}/>
              <div className="hu-closing__text">
                <p className="hu-closing__quote">
                  {text(
                    '"No buscamos caridad. Invitamos a socios estratégicos que ven la inversión comunitaria como crecimiento, no como gasto. Nuestro historial demuestra que cuando el compromiso encuentra a la comunidad, el progreso llega. Sigamos construyendo el futuro de Carolina del Sur — inclusivo, innovador, y unido."',
                    '"We are not seeking charity. We are inviting strategic partners who see community investment as growth, not expense. Our record proves that when commitment meets community, progress follows. Let us continue building South Carolina\'s future — inclusive, innovative, and united."'
                  )}
                </p>
                <div className="hu-closing__author">
                  <strong>Paola Rogers</strong>
                  <span>{text('Fundadora · Hispanos Comunidad · Hispanics United SC', 'Founder · Hispanos Comunidad · Hispanics United SC')}</span>
                </div>
                <div className="hu-closing__actions">
                  <a href={WHATSAPP.unidos} target="_blank" rel="noopener noreferrer" className="btn hu-btn--primary">
                    {text('Construir juntos →', 'Build together →')}
                  </a>
                  <Link to="/bonanza" className="btn hu-btn--ghost">
                    {text('Conocer Bonanza Quick Loans', 'Learn about Bonanza Quick Loans')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <style>{`
        .unidos-page {}

        /* Hero */
        .hu-hero { position:relative; min-height:85vh; display:flex; align-items:center; padding-top:var(--nav-height); overflow:hidden; }
        .hu-hero__bg { position:absolute; inset:0; z-index:0; }
        .hu-hero__bus-img { width:100%; height:100%; object-fit:cover; object-position:center 20%; opacity:0.35; }
        .hu-hero__overlay { position:absolute; inset:0; background:linear-gradient(105deg,rgba(23,52,4,0.96) 0%,rgba(59,109,17,0.80) 50%,rgba(23,52,4,0.70) 100%); }
        .hu-hero__content { position:relative; z-index:1; padding-top:var(--space-xl); padding-bottom:var(--space-xl); }
        .hu-hero__text { max-width:680px; }
        .hu-hero__eyebrow { color:var(--unidos-light); margin-bottom:var(--space-sm); }
        .hu-hero__headline { font-family:var(--font-heading); font-size:clamp(2.4rem,5vw,4rem); font-weight:300; color:var(--hc-ivory); line-height:1.08; margin-bottom:var(--space-sm); }
        .hu-hero__headline em { color:var(--unidos-green); font-style:italic; }
        .hu-hero__body { font-size:1.05rem; color:rgba(253,249,245,0.78); line-height:1.85; margin-bottom:var(--space-md); max-width:580px; }
        .hu-hero__badges { display:flex; flex-wrap:wrap; gap:var(--space-xs); margin-bottom:var(--space-md); }
        .hu-hero__badge { padding:6px 14px; border-radius:20px; font-size:0.78rem; font-weight:600; border:1px solid rgba(255,255,255,0.25); color:rgba(253,249,245,0.75); }
        .hu-hero__badge--green { background:var(--unidos-green); color:white; border-color:var(--unidos-green); }
        .hu-hero__actions { display:flex; flex-wrap:wrap; gap:var(--space-sm); }
        .hu-btn--primary { background:var(--unidos-green); color:white; }
        .hu-btn--primary:hover { background:var(--unidos-mid); }
        .hu-btn--outline { border:1.5px solid rgba(253,249,245,0.4); color:var(--hc-ivory); }
        .hu-btn--outline:hover { background:rgba(253,249,245,0.1); }
        .hu-btn--ghost { color:var(--unidos-light); padding-left:0; padding-right:0; }
        .hu-btn--ghost:hover { color:white; }

        /* Funding */
        .hu-funding { background:var(--unidos-dark); padding:var(--space-xl) 0; }
        .hu-funding__inner { display:grid; grid-template-columns:1fr auto; gap:var(--space-xl); align-items:center; }
        .hu-funding__eyebrow { color:var(--unidos-green); }
        .hu-funding__flow { display:flex; flex-direction:column; gap:var(--space-sm); align-items:center; min-width:260px; }
        .hu-funding__flow-item { display:flex; flex-direction:column; align-items:center; gap:4px; width:100%; }
        .hu-funding__flow-brand { display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.06); border:1.5px solid; border-radius:var(--radius-md); padding:12px 20px; width:100%; }
        .hu-funding__flow-arrow { display:flex; flex-direction:column; align-items:center; gap:2px; }
        .hu-funding__flow-destination { display:flex; flex-direction:column; align-items:center; gap:4px; background:rgba(59,109,17,0.25); border:2px solid var(--unidos-green); border-radius:var(--radius-lg); padding:var(--space-sm) var(--space-md); width:100%; text-align:center; }

        /* Stats */
        .hu-stats-section { background:var(--hc-ivory); }
        .hu-stats { display:grid; grid-template-columns:repeat(6,1fr); gap:1px; background:var(--hc-border); border:1px solid var(--hc-border); border-radius:var(--radius-lg); overflow:hidden; }
        .hu-stat { background:white; padding:var(--space-md); text-align:center; }
        .hu-stat__value { display:block; font-family:var(--font-heading); font-size:clamp(1.6rem,3vw,2.4rem); font-weight:300; color:var(--unidos-green); line-height:1; margin-bottom:var(--space-xs); }
        .hu-stat__label { display:block; font-size:0.78rem; color:var(--hc-soft); line-height:1.5; }

        /* Programs */
        .hu-programs { background:white; }
        .hu-programs__header { max-width:640px; margin-bottom:var(--space-lg); }
        .hu-programs__list { display:flex; flex-direction:column; gap:var(--space-sm); }
        .hu-program { display:grid; grid-template-columns:360px 1fr; gap:0; border:1px solid var(--hc-border); border-radius:var(--radius-lg); overflow:hidden; border-left:4px solid var(--prog-color); transition:box-shadow var(--duration) var(--ease); }
        .hu-program:hover { box-shadow:var(--shadow-md); }
        .hu-program__img-wrap { overflow:hidden; }
        .hu-program__img { width:100%; height:100%; object-fit:cover; transition:transform 0.5s var(--ease); }
        .hu-program:hover .hu-program__img { transform:scale(1.03); }
        .hu-program__content { padding:var(--space-md); display:flex; flex-direction:column; gap:var(--space-xs); }
        .hu-program__num { font-family:var(--font-heading); font-size:2.5rem; font-weight:300; color:var(--prog-color); opacity:0.3; line-height:1; }
        .hu-program__title { font-family:var(--font-heading); font-size:1.4rem; font-weight:400; color:var(--hc-navy); }
        .hu-program__desc { font-size:0.95rem; color:var(--hc-text); line-height:1.8; flex:1; }
        .hu-program__impact { display:flex; align-items:center; gap:8px; font-size:0.85rem; color:var(--unidos-green); }
        .hu-program__impact strong { font-weight:600; }

        /* Partners */
        .hu-partners { background:var(--hc-ivory); }
        .hu-partners__grid { display:grid; grid-template-columns:1fr 1fr; gap:var(--space-md); }
        .hu-partner-card { background:white; border:1px solid var(--hc-border); border-radius:var(--radius-lg); padding:var(--space-lg); border-top:3px solid var(--partner-color); }
        .hu-partner-card__logo-wrap { display:flex; align-items:center; gap:var(--space-sm); margin-bottom:var(--space-xs); }
        .hu-partner-card__logo-wrap img { height:40px; width:auto; object-fit:contain; }
        .hu-partner-card__name { font-size:1.1rem; font-weight:600; color:var(--hc-navy); }
        .hu-partner-card__type { font-size:0.72rem; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:var(--partner-color); display:block; margin-bottom:var(--space-sm); }
        .hu-partner-card__desc { font-size:0.9rem; color:var(--hc-soft); line-height:1.75; }

        /* Packages */
        .hu-packages { background:var(--hc-ivory); }
        .hu-packages__header { max-width:640px; margin-bottom:var(--space-lg); }
        .hu-packages__grid { display:grid; grid-template-columns:repeat(3,1fr); gap:var(--space-sm); margin-bottom:var(--space-lg); }
        .hu-pkg-card { background:white; border:1px solid var(--hc-border); border-radius:var(--radius-lg); padding:var(--space-md); display:flex; flex-direction:column; gap:var(--space-sm); border-top:3px solid var(--pkg-color); }
        .hu-pkg-card__title { font-family:var(--font-heading); font-size:1.3rem; font-weight:400; color:var(--hc-navy); }
        .hu-pkg-card__desc { font-size:0.875rem; color:var(--hc-soft); line-height:1.7; }
        .hu-pkg-card__gets-label { font-size:0.75rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:var(--hc-soft); }
        .hu-pkg-card__gets { list-style:none; display:flex; flex-direction:column; gap:6px; flex:1; }
        .hu-pkg-card__gets li { display:flex; align-items:flex-start; gap:8px; font-size:0.82rem; color:var(--hc-text); line-height:1.5; }
        .hu-pkg-card__example { background:var(--hc-ivory); border-radius:var(--radius-sm); padding:var(--space-sm); border-left:3px solid var(--pkg-color); }
        .hu-pkg-card__example strong { font-size:0.72rem; text-transform:uppercase; letter-spacing:0.08em; color:var(--hc-soft); display:block; margin-bottom:4px; }
        .hu-pkg-card__example p { font-size:0.82rem; color:var(--hc-text); line-height:1.6; font-style:italic; }
        .hu-packages__cta { background:var(--unidos-dark); border-radius:var(--radius-lg); padding:var(--space-lg); }
        .hu-packages__cta-inner { display:flex; justify-content:space-between; align-items:center; gap:var(--space-lg); flex-wrap:wrap; }

        /* Why */
        .hu-why { background:white; }
        .hu-why__grid { display:grid; grid-template-columns:repeat(3,1fr); gap:var(--space-md); }
        .hu-why__item { display:flex; flex-direction:column; gap:8px; padding:var(--space-md); background:var(--hc-ivory); border-radius:var(--radius-lg); }
        .hu-why__icon { font-size:1.8rem; }
        .hu-why__title { font-size:0.95rem; font-weight:600; color:var(--hc-navy); }
        .hu-why__desc { font-size:0.875rem; color:var(--hc-soft); line-height:1.7; }

        /* Closing */
        .hu-closing { background:var(--unidos-dark); padding:var(--space-xl) 0; }
        .hu-closing__inner { display:grid; grid-template-columns:auto 1fr; gap:var(--space-xl); align-items:center; }
        .hu-closing__paola { width:160px; height:auto; object-fit:contain; filter:drop-shadow(0 10px 30px rgba(0,0,0,0.4)); }
        .hu-closing__quote { font-family:var(--font-heading); font-size:1.25rem; font-style:italic; color:var(--hc-ivory); line-height:1.7; margin-bottom:var(--space-md); font-weight:300; }
        .hu-closing__author { display:flex; flex-direction:column; margin-bottom:var(--space-md); }
        .hu-closing__author strong { color:var(--hc-ivory); font-size:0.95rem; }
        .hu-closing__author span { color:rgba(253,249,245,0.55); font-size:0.78rem; }
        .hu-closing__actions { display:flex; flex-wrap:wrap; gap:var(--space-sm); }

        @media(max-width:1024px) { .hu-packages__grid{grid-template-columns:1fr 1fr;} .hu-stats{grid-template-columns:repeat(3,1fr);} }
        @media(max-width:900px) { .hu-funding__inner{grid-template-columns:1fr;} .hu-program{grid-template-columns:1fr;} .hu-program__img-wrap{height:200px;} .hu-closing__inner{grid-template-columns:1fr;} .hu-closing__paola{display:none;} .hu-why__grid{grid-template-columns:1fr 1fr;} }
        @media(max-width:600px) { .hu-packages__grid{grid-template-columns:1fr;} .hu-partners__grid{grid-template-columns:1fr;} .hu-stats{grid-template-columns:repeat(2,1fr);} .hu-why__grid{grid-template-columns:1fr;} }
      `}</style>
    </>
  );
}
