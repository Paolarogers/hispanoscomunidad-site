import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/layout/SEOHead.jsx';
import { WHATSAPP } from '../config/site.config.js';
import { LOCATIONS } from '../config/locations.config.js';
import { useLanguage } from '../hooks/useLanguage.js';
import { useScrollAnimation } from '../hooks/useScrollAnimation.js';
import { useCountUp } from '../hooks/useCountUp.js';

// ── LOAN PRODUCTS ──────────────────────────────────────────
const PRODUCTS = [
  {
    num: '01',
    title_es: 'Préstamo sobre Título',
    title_en: 'Title Loan',
    tagline_es: 'Cuando tu auto vale más que una preocupación',
    tagline_en: 'When your car is worth more than a worry',
    desc_es: 'Usa tu vehículo como aval y recibe efectivo en minutos. Sin SSN, sin historial de crédito, sin complicaciones.',
    desc_en: 'Use your vehicle as collateral and receive cash in minutes. No SSN, no credit history, no complications.',
    features_es: ['Aprobación express en minutos', 'Montos desde $601 hasta $35,000', 'Efectivo en menos de 24 horas', 'Sin seguro social ni ITIN'],
    features_en: ['Express approval in minutes', 'Amounts from $601 to $35,000', 'Cash in less than 24 hours', 'No social security or ITIN'],
    color: 'var(--bonanza-gold)',
  },
  {
    num: '02',
    title_es: 'Préstamo Personal',
    title_en: 'Personal Loan',
    tagline_es: 'Para eso que aparece de la nada',
    tagline_en: 'For what appears out of nowhere',
    desc_es: 'Dinero rápido para reparar imprevistos, emergencias médicas, o ese viaje que no puede esperar. Requisitos mínimos.',
    desc_en: 'Fast money for emergencies, medical expenses, or that trip that cannot wait. Minimum requirements.',
    features_es: ['Solo identificación válida', 'Comprobante de ingresos', 'Uso libre del dinero', 'Desembolso inmediato'],
    features_en: ['Valid ID only', 'Proof of income', 'Use money freely', 'Immediate disbursement'],
    color: 'var(--bonanza-gold)',
  },
  {
    num: '03',
    title_es: 'Préstamo para Negocio',
    title_en: 'Business Loan',
    tagline_es: 'Haz crecer tu idea con capital inteligente',
    tagline_en: 'Grow your idea with smart capital',
    desc_es: 'Capital y plazos a la medida de tu proyecto. Con asesoría experta en cada paso del camino.',
    desc_en: 'Capital and terms tailored to your project. With expert guidance at every step of the way.',
    features_es: ['Planes personalizados', 'Asesoría dedicada', 'Fondos en 24 horas', 'Construye tu historial'],
    features_en: ['Customized plans', 'Dedicated guidance', 'Funds in 24 hours', 'Build your credit history'],
    color: 'var(--bonanza-gold)',
  },
  {
    num: '04',
    title_es: 'Consolidación de Deudas',
    title_en: 'Debt Consolidation',
    tagline_es: 'Un solo pago, menos preocupaciones',
    tagline_en: 'One payment, fewer worries',
    desc_es: 'Agrupa tus deudas en una sola cuota competitiva. Reduce tus intereses y simplifica tus finanzas de una vez.',
    desc_en: 'Group your debts into one competitive payment. Reduce your interest and simplify your finances once and for all.',
    features_es: ['Una sola cuota mensual', 'Reduce tu tasa efectiva', 'Sin múltiples vencimientos', 'Control total'],
    features_en: ['One monthly payment', 'Reduce your effective rate', 'No multiple due dates', 'Total control'],
    color: 'var(--bonanza-gold)',
  },
];

const FAQ = [
  {
    q_es: '¿Necesito seguro social o ITIN para solicitar?',
    q_en: 'Do I need a social security number or ITIN to apply?',
    a_es: 'No. Con tu identificación oficial y comprobante de ingresos es suficiente. Atendemos a toda la comunidad sin importar tu estatus migratorio.',
    a_en: 'No. Your official ID and proof of income are sufficient. We serve the entire community regardless of immigration status.',
  },
  {
    q_es: '¿Cuánto tarda la aprobación y el desembolso?',
    q_en: 'How long does approval and disbursement take?',
    a_es: 'Aprobamos y entregamos tu dinero en menos de 24 horas. Trabajamos al ritmo de tu urgencia.',
    a_en: 'We approve and deliver your money in less than 24 hours. We work at the pace your urgency requires.',
  },
  {
    q_es: '¿Reportan a burós de crédito?',
    q_en: 'Do you report to credit bureaus?',
    a_es: 'Reportamos solo si tienes SSN o ITIN. Si no cuentas con ninguno, tu préstamo no se refleja en el buró.',
    a_en: 'We only report if you have an SSN or ITIN. If you have neither, your loan does not appear in the bureau.',
  },
  {
    q_es: '¿Puedo pagar antes de tiempo?',
    q_en: 'Can I pay early?',
    a_es: '¡Claro! Nos encanta cuando pagas por adelantado, porque así ahorras en intereses. Sin penalidades por pago anticipado.',
    a_en: 'Of course! We love when you pay ahead of time because you save on interest. No early payment penalties.',
  },
  {
    q_es: '¿Cuánto puedo pedir prestado?',
    q_en: 'How much can I borrow?',
    a_es: 'Nuestros préstamos van desde $601 hasta $35,000 dependiendo del tipo de préstamo y tu situación. Hablemos y te orientamos.',
    a_en: 'Our loans range from $601 to $35,000 depending on the loan type and your situation. Let\'s talk and we will guide you.',
  },
  {
    q_es: '¿Tienen sucursales cerca de mí?',
    q_en: 'Do you have branches near me?',
    a_es: 'Contamos con 6 oficinas en Upstate South Carolina: Greenville (Laurens, White Horse, Taylors, Cherrydale), Easley y Spartanburg.',
    a_en: 'We have 6 offices in Upstate South Carolina: Greenville (Laurens, White Horse, Taylors, Cherrydale), Easley and Spartanburg.',
  },
];

const REVIEWS = [
  { name: 'Luis Angel Pacheco', text_es: 'La atención por parte de Irais es genial, muy cálida y realmente me orientó sobre lo que necesitaba. Explica todo muy bien y ofrece muchas opciones.', text_en: 'The service from Irais is great, very warm and she really guided me on what I needed. She explains everything very well and offers many options.', stars: 5 },
  { name: 'Sara Ospina', text_es: 'Recibimos un servicio muy completo y Leidy fue muy amable y muy paciente con nosotros. Cada pregunta fue respondida y aclarada. Quedamos muy felices.', text_en: 'We received very complete service and Leidy was very kind and very patient with us. Every question was answered and clarified. We were very happy.', stars: 5 },
  { name: 'Kaitlyn Vendetti', text_es: 'Tuve una experiencia increíble. La ayuda fue rápida y fácil. No hay un proceso largo. ¡Definitivamente los recomendaré a todos!', text_en: 'I had such an amazing experience. The help I received was so fast and easy. There is no lengthy process. I will definitely recommend you to everyone!', stars: 5 },
  { name: 'Ana Garnica', text_es: 'Muy amable y muy buena atención. El proceso fue rápido y claro. Sin duda los recomiendo a toda mi familia y amigos.', text_en: 'Very friendly and very good service. The process was fast and clear. I definitely recommend them to all my family and friends.', stars: 5 },
];

function Stars({ count }) {
  return <span className="stars-row">{Array.from({length:5},(_,i)=><svg key={i} width="14" height="14" viewBox="0 0 14 14" fill={i<count?'#b8893a':'#e5d9ce'}><path d="M7 1l1.545 3.13L12 4.635l-2.5 2.436.59 3.44L7 8.955l-3.09 1.556.59-3.44L2 4.635l3.455-.505z"/></svg>)}</span>;
}

function FAQItem({ item, lang }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open?' faq-item--open':''}`}>
      <button className="faq-item__q" onClick={()=>setOpen(v=>!v)}>
        <span>{lang==='es'?item.q_es:item.q_en}</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="faq-item__icon">
          <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && <p className="faq-item__a">{lang==='es'?item.a_es:item.a_en}</p>}
    </div>
  );
}

export default function Bonanza() {
  const { lang, text } = useLanguage();
  const ref1 = useScrollAnimation();
  const ref2 = useScrollAnimation();
  const ref3 = useScrollAnimation();
  const ref4 = useScrollAnimation();
  const bonanzaLocations = LOCATIONS.filter(l => l.brand === 'bonanza');

  return (
    <>
      <SEOHead lang={lang} />
      <main className="bonanza-page">

        {/* ── HERO ── */}
        <section className="b-hero">
          <div className="b-hero__bg">
            <img src="/images/brands/bonanza/bonanza-hero.jpg" alt="Bonanza Quick Loans — Greenville SC"
              className="b-hero__img" loading="eager" fetchpriority="high" width="1440" height="900"
              onError={e => { e.target.style.display='none'; }}/>
            <div className="b-hero__overlay"/>
          </div>
          <div className="b-hero__content container">
            <div className="b-hero__left">
              <span className="eyebrow b-hero__eyebrow">Bonanza Quick Loans · Greenville, SC</span>
              <h1 className="b-hero__headline">
                {text('Tu préstamo fácil.', 'Your fast loan.')}<br/>
                <em>{text('En menos de 24 horas.', 'In less than 24 hours.')}</em>
              </h1>
              <p className="b-hero__body">
                {text(
                  'Sin seguro social. Sin historial de crédito. Sin complicaciones. En tu idioma, en tu comunidad, con el equipo que te conoce.',
                  'No social security. No credit history. No complications. In your language, in your community, with the team that knows you.'
                )}
              </p>
              <div className="b-hero__range">
                <span className="b-hero__range-label">{text('Préstamos desde', 'Loans from')}</span>
                <span className="b-hero__range-amount">$601 — $35,000</span>
              </div>
              <div className="b-hero__actions">
                <a href={WHATSAPP.bonanza} target="_blank" rel="noopener noreferrer" className="btn btn--brass">
                  {text('Solicitar mi préstamo', 'Apply for my loan')}
                </a>
                <a href="#productos" className="btn btn--outline b-hero__outline">
                  {text('Ver opciones', 'See options')}
                </a>
              </div>
              <div className="b-hero__trust">
                {[
                  {es:'Sin SSN ni ITIN', en:'No SSN or ITIN'},
                  {es:'100% en español', en:'100% in Spanish'},
                  {es:'Aprobación en 24h', en:'Approval in 24h'},
                  {es:'6 sucursales SC', en:'6 branches SC'},
                ].map((t,i) => (
                  <span key={i} className="b-hero__trust-item">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="6" fill="#b8893a" opacity="0.3"/><path d="M3 6l2 2 4-4" stroke="#b8893a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {lang==='es'?t.es:t.en}
                  </span>
                ))}
              </div>
            </div>
            <div className="b-hero__avatar">
              <img src="/images/team/avatars/adriana-office.png" alt="Adriana — Bonanza Quick Loans"
                className="b-hero__adriana" width="380" height="480" loading="eager"
                onError={e=>{e.target.style.display='none';}}/>
            </div>
          </div>
        </section>

        {/* ── IMPACT NUMBERS ── */}
        <section className="b-stats">
          <div className="container">
            <div className="b-stats__grid" ref={ref1}>
              {[
                {value:'20,000+', label_es:'Préstamos entregados en 13 años', label_en:'Loans delivered in 13 years'},
                {value:'$28.9M', label_es:'En capital entregado a la comunidad', label_en:'In capital delivered to the community'},
                {value:'24h', label_es:'Tiempo máximo de aprobación', label_en:'Maximum approval time'},
                {value:'6', label_es:'Sucursales en Upstate SC', label_en:'Branches in Upstate SC'},
                {value:'13+', label_es:'Años sirviendo sin parar', label_en:'Years serving nonstop'},
                {value:'5%', label_es:'De ganancias a Hispanics United', label_en:'Of profits to Hispanics United'},
              ].map((s,i) => (
                <div key={i} className="b-stat fade-up">
                  <span className="b-stat__value">{s.value}</span>
                  <span className="b-stat__label">{lang==='es'?s.label_es:s.label_en}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRODUCTS ── */}
        <section className="b-products section" id="productos" ref={ref2}>
          <div className="container">
            <div className="b-products__header fade-up">
              <span className="eyebrow">{text('Nuestros productos', 'Our products')}</span>
              <h2 className="display-2">{text('Distintas soluciones, una sola meta:', 'Different solutions, one goal:')}<br/><em style={{fontStyle:'italic',color:'var(--bonanza-gold)'}}>{text('tu tranquilidad financiera.', 'your financial peace of mind.')}</em></h2>
            </div>
            <div className="b-products__grid fade-up">
              {PRODUCTS.map((p,i) => (
                <div key={i} className="b-product-card">
                  <div className="b-product-card__num">{p.num}</div>
                  <h3 className="b-product-card__title">{lang==='es'?p.title_es:p.title_en}</h3>
                  <p className="b-product-card__tagline">"{lang==='es'?p.tagline_es:p.tagline_en}"</p>
                  <p className="b-product-card__desc">{lang==='es'?p.desc_es:p.desc_en}</p>
                  <ul className="b-product-card__features">
                    {(lang==='es'?p.features_es:p.features_en).map((f,j) => (
                      <li key={j}><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="var(--bonanza-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>{f}</li>
                    ))}
                  </ul>
                  <a href={WHATSAPP.bonanza} target="_blank" rel="noopener noreferrer" className="btn btn--brass b-product-card__cta">
                    {text('Solicitar ahora', 'Apply now')}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ADRIANA + COMMUNITY BAND ── */}
        <section className="b-community">
          <div className="container">
            <div className="b-community__inner">
              <div className="b-community__image">
                <img src="/images/team/avatars/adriana-bus.png" alt="Adriana — Comunidad Hispanos"
                  className="b-community__avatar" width="480" height="400" loading="lazy"
                  onError={e=>{e.target.style.display='none';}}/>
              </div>
              <div className="b-community__content">
                <span className="eyebrow">{text('Más que un préstamo', 'More than a loan')}</span>
                <h2 className="display-2" style={{color:'var(--hc-ivory)'}}>
                  {text('Cuando tú avanzas,', 'When you move forward,')}<br/>
                  <em style={{color:'var(--bonanza-gold)',fontStyle:'italic'}}>{text('toda la comunidad avanza.', 'the whole community moves forward.')}</em>
                </h2>
                <p style={{color:'rgba(253,249,245,0.75)',fontSize:'1.05rem',lineHeight:1.85,marginBottom:'var(--space-md)'}}>
                  {text(
                    'El 5% de las ganancias de Bonanza se destina directamente a Hispanics United of SC — clínicas de salud gratuitas, talleres empresariales, y apoyo para familias que lo necesitan. No pagas más. Solo eliges con conciencia.',
                    '5% of Bonanza\'s profits go directly to Hispanics United of SC — free health clinics, business workshops, and support for families in need. You don\'t pay more. You simply choose with intention.'
                  )}
                </p>
                <Link to="/unidos" className="btn btn--outline" style={{borderColor:'rgba(253,249,245,0.4)',color:'var(--hc-ivory)'}}>
                  {text('Conoce Hispanics United →', 'Learn about Hispanics United →')}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── REVIEWS ── */}
        <section className="b-reviews section--sm" ref={ref3}>
          <div className="container">
            <div className="b-reviews__header fade-up">
              <span className="eyebrow">{text('Lo que dice nuestra gente', 'What our people say')}</span>
              <h2 className="display-2">{text('214 reseñas. Todas reales.', '214 reviews. All real.')}</h2>
              <div className="b-reviews__score">
                <span className="b-reviews__number">4.9</span>
                <div><Stars count={5}/><span className="body-sm">{text('en Google', 'on Google')}</span></div>
              </div>
            </div>
            <div className="grid-2 fade-up" style={{gap:'var(--space-sm)',marginTop:'var(--space-md)'}}>
              {REVIEWS.map((r,i) => (
                <div key={i} className="card">
                  <Stars count={r.stars}/>
                  <p style={{fontSize:'0.9rem',lineHeight:1.75,color:'var(--hc-text)',margin:'var(--space-xs) 0',fontStyle:'italic'}}>
                    "{lang==='es'?r.text_es:r.text_en}"
                  </p>
                  <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                    <div style={{width:32,height:32,borderRadius:'50%',background:'var(--hc-navy)',color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.8rem',fontWeight:600,flexShrink:0}}>{r.name.charAt(0)}</div>
                    <strong style={{fontSize:'0.85rem',color:'var(--hc-navy)'}}>{r.name}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="b-faq section--sm" ref={ref4}>
          <div className="container container--narrow">
            <div className="fade-up">
              <span className="eyebrow">{text('Preguntas frecuentes', 'Frequently asked questions')}</span>
              <h2 className="display-2" style={{marginBottom:'var(--space-md)'}}>
                {text('Todo lo que necesitas saber.', 'Everything you need to know.')}
              </h2>
              <div className="b-faq__list">
                {FAQ.map((item,i) => <FAQItem key={i} item={item} lang={lang}/>)}
              </div>
            </div>
          </div>
        </section>

        {/* ── LOCATIONS ── */}
        <section className="b-locations section--sm">
          <div className="container">
            <span className="eyebrow">{text('Nuestras sucursales', 'Our branches')}</span>
            <h2 className="display-2" style={{marginBottom:'var(--space-md)'}}>
              {text('Estamos cerca de ti.', 'We are close to you.')}
            </h2>
            <div className="b-locations__grid">
              {bonanzaLocations.map(loc => (
                <a key={loc.id} href={loc.mapUrl} target="_blank" rel="noopener noreferrer" className="b-location-card">
                  {loc.isHQ && <span className="b-location-card__hq">{text('Sede Principal','Main Office')}</span>}
                  <strong className="b-location-card__name">{loc.name}</strong>
                  <span className="b-location-card__address">{loc.address}</span>
                  <span className="b-location-card__city">{loc.city}, {loc.state} {loc.zip}</span>
                  {loc.note_es && <span className="b-location-card__note">{text(loc.note_es,loc.note_en)}</span>}
                  <span className="b-location-card__hours">{loc.hours}</span>
                  <span className="b-location-card__map">{text('Ver en mapa →','View on map →')}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="b-cta">
          <div className="container">
            <div className="b-cta__inner">
              <h2 className="display-2" style={{color:'var(--hc-ivory)'}}>
                {text('¿Listo para dar el siguiente paso?', 'Ready to take the next step?')}
              </h2>
              <p style={{color:'rgba(253,249,245,0.7)',fontSize:'1.05rem',marginBottom:'var(--space-md)',maxWidth:500}}>
                {text(
                  'Una conversación sin costo, sin compromiso. Solo dinos qué necesitas y encontramos la solución correcta para ti.',
                  'A free conversation, no commitment. Just tell us what you need and we find the right solution for you.'
                )}
              </p>
              <div style={{display:'flex',gap:'var(--space-sm)',flexWrap:'wrap'}}>
                <a href={WHATSAPP.bonanza} target="_blank" rel="noopener noreferrer" className="btn btn--brass">
                  {text('Escríbenos por WhatsApp', 'Message us on WhatsApp')}
                </a>
                <a href="tel:8647770003" className="btn btn--outline" style={{borderColor:'rgba(253,249,245,0.4)',color:'var(--hc-ivory)'}}>
                  (864) 777-0003
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      <style>{`
        .bonanza-page { --brand: var(--bonanza-gold); --brand-dark: var(--bonanza-dark); --brand-light: var(--bonanza-light); }

        /* Hero */
        .b-hero { position:relative; min-height:100vh; display:flex; align-items:center; padding-top:var(--nav-height); overflow:hidden; }
        .b-hero__bg { position:absolute; inset:0; z-index:0; }
        .b-hero__img { width:100%; height:100%; object-fit:cover; object-position:center 30%; }
        .b-hero__overlay { position:absolute; inset:0; background:linear-gradient(105deg,rgba(30,26,46,0.92) 0%,rgba(30,26,46,0.75) 50%,rgba(30,26,46,0.4) 100%); }
        .b-hero__content { position:relative; z-index:1; display:grid; grid-template-columns:1fr auto; gap:var(--space-lg); align-items:center; padding-top:var(--space-xl); padding-bottom:var(--space-xl); }
        .b-hero__eyebrow { color:var(--bonanza-gold); margin-bottom:var(--space-sm); }
        .b-hero__headline { font-family:var(--font-heading); font-size:clamp(2.4rem,5vw,4.2rem); font-weight:300; color:var(--hc-ivory); line-height:1.08; margin-bottom:var(--space-sm); }
        .b-hero__headline em { color:var(--bonanza-gold); font-style:italic; }
        .b-hero__body { font-size:1.05rem; color:rgba(253,249,245,0.78); line-height:1.85; margin-bottom:var(--space-sm); max-width:520px; }
        .b-hero__range { display:inline-flex; flex-direction:column; background:rgba(184,137,58,0.15); border:1px solid rgba(184,137,58,0.3); border-radius:var(--radius-md); padding:12px 20px; margin-bottom:var(--space-md); }
        .b-hero__range-label { font-size:0.72rem; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; color:var(--bonanza-gold); }
        .b-hero__range-amount { font-family:var(--font-heading); font-size:2rem; font-weight:300; color:var(--hc-ivory); line-height:1.2; }
        .b-hero__actions { display:flex; flex-wrap:wrap; gap:var(--space-sm); margin-bottom:var(--space-md); }
        .b-hero__outline { border-color:rgba(253,249,245,0.5); color:var(--hc-ivory); }
        .b-hero__outline:hover { background:rgba(253,249,245,0.1); border-color:var(--hc-ivory); }
        .b-hero__trust { display:flex; flex-wrap:wrap; gap:var(--space-sm); }
        .b-hero__trust-item { display:flex; align-items:center; gap:6px; font-size:0.78rem; font-weight:500; color:rgba(253,249,245,0.6); }
        .b-hero__adriana { width:320px; height:auto; object-fit:contain; object-position:bottom; filter:drop-shadow(0 20px 40px rgba(0,0,0,0.3)); }

        /* Stats */
        .b-stats { background:var(--bonanza-dark); padding:var(--space-lg) 0; }
        .b-stats__grid { display:grid; grid-template-columns:repeat(6,1fr); gap:1px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.08); border-radius:var(--radius-lg); overflow:hidden; }
        .b-stat { background:var(--bonanza-dark); padding:var(--space-md); text-align:center; }
        .b-stat__value { display:block; font-family:var(--font-heading); font-size:clamp(1.6rem,3vw,2.4rem); font-weight:300; color:var(--bonanza-gold); line-height:1; margin-bottom:var(--space-xs); }
        .b-stat__label { display:block; font-size:0.78rem; color:rgba(255,255,255,0.5); line-height:1.5; }

        /* Products */
        .b-products { background:var(--hc-ivory); }
        .b-products__header { max-width:640px; margin-bottom:var(--space-lg); }
        .b-products__grid { display:grid; grid-template-columns:repeat(4,1fr); gap:var(--space-sm); }
        .b-product-card { background:white; border:1px solid var(--hc-border); border-radius:var(--radius-lg); padding:var(--space-md); display:flex; flex-direction:column; gap:var(--space-xs); border-top:3px solid var(--bonanza-gold); transition:box-shadow var(--duration) var(--ease),transform var(--duration) var(--ease); }
        .b-product-card:hover { box-shadow:var(--shadow-lg); transform:translateY(-3px); }
        .b-product-card__num { font-family:var(--font-heading); font-size:2.5rem; font-weight:300; color:var(--hc-border); line-height:1; }
        .b-product-card__title { font-family:var(--font-heading); font-size:1.3rem; font-weight:400; color:var(--hc-navy); }
        .b-product-card__tagline { font-size:0.85rem; color:var(--bonanza-gold); font-style:italic; }
        .b-product-card__desc { font-size:0.875rem; color:var(--hc-soft); line-height:1.7; flex:1; }
        .b-product-card__features { list-style:none; display:flex; flex-direction:column; gap:6px; margin-bottom:var(--space-sm); }
        .b-product-card__features li { display:flex; align-items:center; gap:8px; font-size:0.82rem; color:var(--hc-text); }
        .b-product-card__cta { margin-top:auto; justify-content:center; }

        /* Community band */
        .b-community { background:var(--hc-navy); padding:var(--space-xl) 0; }
        .b-community__inner { display:grid; grid-template-columns:auto 1fr; gap:var(--space-xl); align-items:center; }
        .b-community__avatar { width:420px; height:auto; object-fit:contain; }

        /* Reviews */
        .b-reviews { background:white; }
        .b-reviews__header { margin-bottom:0; }
        .b-reviews__score { display:flex; align-items:center; gap:var(--space-sm); margin-top:var(--space-xs); }
        .b-reviews__number { font-family:var(--font-heading); font-size:3rem; font-weight:300; color:var(--hc-navy); line-height:1; }
        .stars-row { display:inline-flex; gap:2px; }

        /* FAQ */
        .b-faq { background:var(--hc-ivory); }
        .b-faq__list { display:flex; flex-direction:column; gap:1px; background:var(--hc-border); border:1px solid var(--hc-border); border-radius:var(--radius-lg); overflow:hidden; }
        .faq-item { background:white; }
        .faq-item__q { width:100%; display:flex; justify-content:space-between; align-items:center; gap:var(--space-md); padding:var(--space-md); font-size:0.95rem; font-weight:500; color:var(--hc-navy); text-align:left; cursor:pointer; transition:background var(--duration) var(--ease); }
        .faq-item__q:hover { background:var(--hc-ivory); }
        .faq-item__icon { flex-shrink:0; transition:transform var(--duration) var(--ease); }
        .faq-item--open .faq-item__icon { transform:rotate(180deg); }
        .faq-item__a { padding:0 var(--space-md) var(--space-md); font-size:0.9rem; line-height:1.8; color:var(--hc-soft); border-top:1px solid var(--hc-border); padding-top:var(--space-sm); }

        /* Locations */
        .b-locations { background:white; }
        .b-locations__grid { display:grid; grid-template-columns:repeat(3,1fr); gap:var(--space-sm); }
        .b-location-card { display:flex; flex-direction:column; gap:4px; padding:var(--space-md); border:1px solid var(--hc-border); border-radius:var(--radius-lg); text-decoration:none; color:inherit; position:relative; transition:all var(--duration) var(--ease); }
        .b-location-card:hover { border-color:var(--bonanza-gold); box-shadow:var(--shadow-md); transform:translateY(-2px); }
        .b-location-card__hq { position:absolute; top:-1px; right:var(--space-sm); background:var(--bonanza-gold); color:white; font-size:0.65rem; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; padding:3px 10px; border-radius:0 0 var(--radius-sm) var(--radius-sm); }
        .b-location-card__name { font-size:0.95rem; font-weight:600; color:var(--hc-navy); }
        .b-location-card__address,.b-location-card__city { font-size:0.8rem; color:var(--hc-soft); }
        .b-location-card__note { font-size:0.78rem; color:var(--unidos-green); font-style:italic; }
        .b-location-card__hours { font-size:0.78rem; color:var(--hc-soft); }
        .b-location-card__map { font-size:0.78rem; font-weight:600; color:var(--bonanza-gold); margin-top:auto; padding-top:var(--space-xs); }

        /* Final CTA */
        .b-cta { background:var(--bonanza-dark); padding:var(--space-xl) 0; }
        .b-cta__inner { max-width:640px; }

        /* Responsive */
        @media(max-width:1100px) { .b-products__grid{grid-template-columns:1fr 1fr;} .b-stats__grid{grid-template-columns:repeat(3,1fr);} }
        @media(max-width:900px) { .b-hero__content{grid-template-columns:1fr;} .b-hero__avatar{display:none;} .b-community__inner{grid-template-columns:1fr;} .b-community__image{display:none;} .b-locations__grid{grid-template-columns:1fr 1fr;} }
        @media(max-width:600px) { .b-products__grid{grid-template-columns:1fr;} .b-locations__grid{grid-template-columns:1fr;} .b-stats__grid{grid-template-columns:repeat(2,1fr);} }
      `}</style>
    </>
  );
}
