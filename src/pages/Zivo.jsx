import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/layout/SEOHead.jsx';
import { WHATSAPP } from '../config/site.config.js';
import { useLanguage } from '../hooks/useLanguage.js';
import { useScrollAnimation } from '../hooks/useScrollAnimation.js';

const PRODUCTS = [
  {
    icon: '🚗',
    title_es: 'Seguro de Auto',
    title_en: 'Auto Insurance',
    tagline_es: 'Tu carro protegido, tu familia segura',
    tagline_en: 'Your car protected, your family safe',
    desc_es: 'Seguro de auto completo para toda la familia. Con licencia internacional, ITIN o pasaporte. Sin seguro social. Planes desde el básico hasta el más completo.',
    desc_en: 'Complete auto insurance for the whole family. With international license, ITIN or passport. No social security. Plans from basic to comprehensive.',
    features_es: ['Sin seguro social requerido', 'Licencia internacional aceptada', 'ITIN o pasaporte válido', 'Cotización en minutos'],
    features_en: ['No social security required', 'International license accepted', 'ITIN or passport valid', 'Quote in minutes'],
    color: 'var(--zivo-teal)',
  },
  {
    icon: '🏠',
    title_es: 'Seguro de Hogar',
    title_en: 'Home Insurance',
    tagline_es: 'Tu casa es más que paredes',
    tagline_en: 'Your home is more than walls',
    desc_es: 'Protege el lugar donde crece tu familia. Seguros para hogares adaptados a tu situación, con atención cálida y personalizada en español.',
    desc_en: 'Protect the place where your family grows. Home insurance adapted to your situation, with warm personalized service in Spanish.',
    features_es: ['Cobertura personalizada', 'Explicado paso a paso', 'Sin cobros escondidos', 'Renovación fácil'],
    features_en: ['Personalized coverage', 'Explained step by step', 'No hidden charges', 'Easy renewal'],
    color: 'var(--zivo-teal)',
  },
  {
    icon: '🏢',
    title_es: 'Seguro Comercial',
    title_en: 'Commercial Insurance',
    tagline_es: 'Cuida lo que tanto te ha costado construir',
    tagline_en: 'Protect what you have worked so hard to build',
    desc_es: 'Para tu tiendita, tu restaurante, tu negocio de construcción, o tu empresa de servicio. Cobertura real para emprendedores latinos.',
    desc_en: 'For your shop, your restaurant, your construction business, or your service company. Real coverage for Latino entrepreneurs.',
    features_es: ['Responsabilidad general', 'Equipos y propiedades', 'Compensación de trabajadores', 'Asesoría dedicada'],
    features_en: ['General liability', 'Equipment and property', 'Workers compensation', 'Dedicated guidance'],
    color: 'var(--zivo-teal)',
  },
  {
    icon: '❤️',
    title_es: 'Seguro de Vida',
    title_en: 'Life Insurance',
    tagline_es: 'Tener un plan no es solo para unos pocos',
    tagline_en: 'Having a plan is not just for some',
    desc_es: 'Cuida el futuro de los tuyos sin importar tu estatus migratorio. Porque tu vida y tus sueños también merecen estar asegurados.',
    desc_en: 'Care for your loved ones\' future regardless of your immigration status. Because your life and dreams also deserve to be insured.',
    features_es: ['Sin importar tu estatus', 'Planes accesibles', 'Beneficiarios a tu elección', 'Proceso sencillo'],
    features_en: ['Regardless of your status', 'Accessible plans', 'Beneficiaries of your choice', 'Simple process'],
    color: 'var(--zivo-teal)',
  },
];

const CARRIERS = [
  { name: 'Progressive', note_es: 'Diamond Partner', note_en: 'Diamond Partner' },
  { name: 'Trexis', note_es: 'Socio autorizado', note_en: 'Authorized partner' },
  { name: 'Gainsco', note_es: 'Socio autorizado', note_en: 'Authorized partner' },
];

const FAQ = [
  {
    q_es: '¿Puedo asegurarme con licencia extranjera?',
    q_en: 'Can I get insured with a foreign license?',
    a_es: 'Sí. En Zivo trabajamos con licencias internacionales, ITIN y pasaporte todos los días. Tu estatus migratorio no es un obstáculo.',
    a_en: 'Yes. At Zivo we work with international licenses, ITIN, and passport every day. Your immigration status is not an obstacle.',
  },
  {
    q_es: '¿Necesito seguro social para asegurar mi auto?',
    q_en: 'Do I need a social security number to insure my car?',
    a_es: 'No. Trabajamos con documentación flexible. Tu licencia de conducir, ITIN o pasaporte son suficientes para activar tu seguro hoy.',
    a_en: 'No. We work with flexible documentation. Your driver\'s license, ITIN, or passport are sufficient to activate your insurance today.',
  },
  {
    q_es: '¿Cuánto tiempo tarda en activarse mi seguro?',
    q_en: 'How long does it take to activate my insurance?',
    a_es: 'En solo unos minutos puedes tener tu seguro activo. Completamos el proceso contigo en persona o por teléfono, rápido y sin complicaciones.',
    a_en: 'In just a few minutes you can have your insurance active. We complete the process with you in person or by phone, fast and without complications.',
  },
  {
    q_es: '¿Operan en Carolina del Norte también?',
    q_en: 'Do you operate in North Carolina as well?',
    a_es: 'Sí. Zivo está autorizado en SC y NC desde 2018. Atendemos clientes en ambos estados con la misma calidad y atención personalizada.',
    a_en: 'Yes. Zivo has been authorized in SC and NC since 2018. We serve clients in both states with the same quality and personalized service.',
  },
  {
    q_es: '¿Qué compañías de seguros representan?',
    q_en: 'Which insurance companies do you represent?',
    a_es: 'Trabajamos con Progressive (estatus Diamond), Trexis y Gainsco. Esto nos permite ofrecer precios competitivos y cobertura sólida para nuestra comunidad.',
    a_en: 'We work with Progressive (Diamond status), Trexis, and Gainsco. This allows us to offer competitive prices and solid coverage for our community.',
  },
  {
    q_es: '¿Tienen seguro para mi negocio?',
    q_en: 'Do you have insurance for my business?',
    a_es: 'Sí. Ofrecemos seguros comerciales para negocios de todos los tamaños — desde una tienda pequeña hasta una empresa de construcción. Hablemos.',
    a_en: 'Yes. We offer commercial insurance for businesses of all sizes — from a small shop to a construction company. Let\'s talk.',
  },
];

const REVIEWS = [
  { name: 'Isabel Garrido', text_es: 'Adriana Alarcón me ofreció excelente servicio. Es una persona muy atenta y amable, escucha y responde todas las preguntas. Busca el precio más flexible para poder pagar. Muy recomendada.', text_en: 'Adriana Alarcón offered me excellent service. She is very attentive and kind, listens and answers all questions. She looks for the most flexible price. Highly recommended.', stars: 5 },
  { name: 'Jenny Cubillos', text_es: 'Muy buena atención sin duda los recomiendo. Andrea siempre está dispuesta a ayudar y a encontrar la mejor opción para cada cliente.', text_en: 'Very good service, I definitely recommend them. Andrea is always willing to help and find the best option for each client.', stars: 5 },
  { name: 'Comunidad HC', text_es: 'Si pudiera dar más de 5 estrellas lo haría. Andrea fue muy paciente y me ayudó muchísimo. Es la mejor agente de seguros que he conocido en los Estados Unidos. 100% recomendada.', text_en: 'If I could give more than 5 stars I would. Andrea was very patient and helped me a lot. She is the best insurance agent I have met in the United States. 100% recommended.', stars: 5 },
  { name: 'Cliente Zivo', text_es: 'Andres nos ayudó a encontrar un seguro de auto que se ajusta perfectamente a nosotros. Muy conocedor de todos los productos que tienen. Muy satisfechos.', text_en: 'He helped us find an auto insurance that fits us perfectly. Very knowledgeable about all the products they have. Very satisfied.', stars: 5 },
];

function Stars({ count }) {
  return <span className="stars-row">{Array.from({length:5},(_,i)=><svg key={i} width="14" height="14" viewBox="0 0 14 14" fill={i<count?'#1D9E75':'#e5d9ce'}><path d="M7 1l1.545 3.13L12 4.635l-2.5 2.436.59 3.44L7 8.955l-3.09 1.556.59-3.44L2 4.635l3.455-.505z"/></svg>)}</span>;
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

export default function Zivo() {
  const { lang, text } = useLanguage();
  const ref1 = useScrollAnimation();
  const ref2 = useScrollAnimation();
  const ref3 = useScrollAnimation();

  return (
    <>
      <SEOHead lang={lang} />
      <main className="zivo-page">

        {/* ── HERO ── */}
        <section className="z-hero">
          <div className="z-hero__bg">
            <img src="/images/brands/zivo/zivo-hero.jpg"
              alt="Zivo Insurance — Seguro sin seguro social Greenville SC"
              className="z-hero__img" loading="eager" fetchpriority="high"
              width="1440" height="900"
              onError={e=>{e.target.style.display='none';}}/>
            <div className="z-hero__overlay"/>
          </div>
          <div className="z-hero__content container">
            <div className="z-hero__left">
              <span className="eyebrow z-hero__eyebrow">Zivo Insurance · SC & NC</span>
              <h1 className="z-hero__headline">
                {text('Seguro que entiendes.', 'Insurance you understand.')}<br/>
                <em>{text('Protección que mereces.', 'Protection you deserve.')}</em>
              </h1>
              <p className="z-hero__body">
                {text(
                  'Como inmigrantes, sabemos lo que es escuchar "no" una y otra vez. Por eso creamos Zivo: para que nunca más tengas que explicar por qué mereces protección. Tu historia nos importa.',
                  'As immigrants, we know what it is like to hear "no" over and over. That is why we created Zivo: so you never have to explain again why you deserve protection. Your story matters to us.'
                )}
              </p>
              <div className="z-hero__badges">
                {[
                  {es:'Sin seguro social', en:'No SSN required'},
                  {es:'Licencia extranjera OK', en:'Foreign license OK'},
                  {es:'SC y NC', en:'SC and NC'},
                  {es:'Diamond Progressive', en:'Diamond Progressive'},
                ].map((b,i)=>(
                  <span key={i} className="z-hero__badge">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="6" fill="#1D9E75" opacity="0.3"/><path d="M3 6l2 2 4-4" stroke="#1D9E75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {lang==='es'?b.es:b.en}
                  </span>
                ))}
              </div>
              <div className="z-hero__actions">
                <a href={WHATSAPP.zivo} target="_blank" rel="noopener noreferrer" className="btn z-btn--primary">
                  {text('Cotizar mi seguro', 'Get my quote')}
                </a>
                <a href={WHATSAPP.zivoCommercial} target="_blank" rel="noopener noreferrer" className="btn z-btn--outline">
                  {text('Seguro comercial', 'Commercial insurance')}
                </a>
              </div>
            </div>
            <div className="z-hero__avatars">
              <img src="/images/team/avatars/dayana-car.png"
                alt="Dayana — Zivo Insurance"
                className="z-hero__dayana" width="360" height="420" loading="eager"
                onError={e=>{e.target.style.display='none';}}/>
            </div>
          </div>
        </section>

        {/* ── TRUST BAND ── */}
        <section className="z-trust">
          <div className="container">
            <div className="z-trust__grid" ref={ref1}>
              {[
                {val:'2018', label_es:'Año de fundación en SC', label_en:'Founded in SC'},
                {val:'SC + NC', label_es:'Estados autorizados', label_en:'Licensed states'},
                {val:'5,000+', label_es:'Hogares asegurados', label_en:'Households insured'},
                {val:'Diamond', label_es:'Estatus con Progressive', label_en:'Status with Progressive'},
                {val:'3', label_es:'Aseguradoras: Progressive · Trexis · Gainsco', label_en:'Carriers: Progressive · Trexis · Gainsco'},
                {val:'100%', label_es:'Atención en español', label_en:'Service in Spanish'},
              ].map((s,i)=>(
                <div key={i} className="z-trust__item fade-up">
                  <span className="z-trust__val">{s.val}</span>
                  <span className="z-trust__label">{lang==='es'?s.label_es:s.label_en}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRODUCTS ── */}
        <section className="z-products section" id="coberturas" ref={ref2}>
          <div className="container">
            <div className="z-products__header fade-up">
              <span className="eyebrow">{text('Coberturas disponibles', 'Available coverage')}</span>
              <h2 className="display-2">
                {text('Todo lo que necesitas.', 'Everything you need.')}<br/>
                <em style={{fontStyle:'italic',color:'var(--zivo-teal)'}}>
                  {text('Sin letra pequeña.', 'No fine print.')}
                </em>
              </h2>
              <p className="body-lg" style={{color:'var(--hc-soft)',maxWidth:560}}>
                {text(
                  'Ofrecemos seguros de auto, hogar, comercial y vida. Todo explicado paso a paso, sin cobros escondidos, en tu idioma.',
                  'We offer auto, home, commercial, and life insurance. Everything explained step by step, no hidden charges, in your language.'
                )}
              </p>
            </div>
            <div className="z-products__grid fade-up">
              {PRODUCTS.map((p,i)=>(
                <div key={i} className="z-product-card">
                  <div className="z-product-card__icon" aria-hidden="true">{p.icon}</div>
                  <h3 className="z-product-card__title">{lang==='es'?p.title_es:p.title_en}</h3>
                  <p className="z-product-card__tagline">"{lang==='es'?p.tagline_es:p.tagline_en}"</p>
                  <p className="z-product-card__desc">{lang==='es'?p.desc_es:p.desc_en}</p>
                  <ul className="z-product-card__features">
                    {(lang==='es'?p.features_es:p.features_en).map((f,j)=>(
                      <li key={j}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="var(--zivo-teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href={WHATSAPP.zivo} target="_blank" rel="noopener noreferrer" className="btn z-btn--primary z-product-card__cta">
                    {text('Cotizar ahora', 'Get quote now')}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="z-process section--sm">
          <div className="container container--narrow">
            <div className="fade-up">
              <span className="eyebrow">{text('Proceso simple', 'Simple process')}</span>
              <h2 className="display-2" style={{marginBottom:'var(--space-lg)'}}>
                {text('Rápido, claro, sin complicaciones.', 'Fast, clear, no complications.')}
              </h2>
              <div className="z-steps">
                {[
                  {num:'01', title_es:'Llena tus datos', title_en:'Fill in your info', desc_es:'Nombre, dirección y tipo de vehículo o propiedad. Toma menos de dos minutos.', desc_en:'Name, address, and vehicle or property type. Takes less than two minutes.'},
                  {num:'02', title_es:'Recibe tu cotización', title_en:'Receive your quote', desc_es:'Te enviamos opciones al instante. Sin esperas, sin citas innecesarias.', desc_en:'We send you options instantly. No waiting, no unnecessary appointments.'},
                  {num:'03', title_es:'Habla con tu asesor', title_en:'Talk to your advisor', desc_es:'Andrea o Adriana te explican todo en español. Sin tecnicismos, sin confusión.', desc_en:'Andrea or Adriana explain everything in Spanish. No jargon, no confusion.'},
                  {num:'04', title_es:'Activa tu seguro hoy', title_en:'Activate your insurance today', desc_es:'Firma, paga y listo. Tu cobertura comienza el mismo día.', desc_en:'Sign, pay and done. Your coverage starts the same day.'},
                ].map((s,i)=>(
                  <div key={i} className="z-step">
                    <div className="z-step__num">{s.num}</div>
                    <div className="z-step__content">
                      <strong className="z-step__title">{lang==='es'?s.title_es:s.title_en}</strong>
                      <p className="z-step__desc">{lang==='es'?s.desc_es:s.desc_en}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{marginTop:'var(--space-lg)',textAlign:'center'}}>
                <a href={WHATSAPP.zivo} target="_blank" rel="noopener noreferrer" className="btn z-btn--primary">
                  {text('Empezar mi cotización', 'Start my quote')}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── CARRIERS ── */}
        <section className="z-carriers section--sm">
          <div className="container">
            <div className="fade-up" style={{textAlign:'center'}}>
              <span className="eyebrow">{text('Nuestras aseguradoras', 'Our carriers')}</span>
              <h2 className="display-2" style={{marginBottom:'var(--space-md)'}}>
                {text('Respaldo de marcas reconocidas.', 'Backed by recognized brands.')}
              </h2>
              <p className="body-lg" style={{color:'var(--hc-soft)',maxWidth:540,margin:'0 auto var(--space-lg)'}}>
                {text(
                  'Trabajamos con compañías reconocidas para ofrecerte precios justos, respaldo sólido y cobertura real adaptada a ti.',
                  'We work with recognized companies to offer you fair prices, solid backing, and real coverage adapted to you.'
                )}
              </p>
              <div className="z-carriers__grid">
                {CARRIERS.map((c,i)=>(
                  <div key={i} className="z-carrier-card">
                    <strong className="z-carrier-card__name">{c.name}</strong>
                    <span className="z-carrier-card__note">{lang==='es'?c.note_es:c.note_en}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── ANDREA FEATURE ── */}
        <section className="z-andrea">
          <div className="container">
            <div className="z-andrea__inner">
              <div className="z-andrea__content">
                <span className="eyebrow" style={{color:'var(--zivo-light)'}}>
                  {text('El equipo detrás de Zivo', 'The team behind Zivo')}
                </span>
                <h2 className="display-2" style={{color:'var(--hc-ivory)'}}>
                  {text('No eres un número de póliza.', 'You are not a policy number.')}<br/>
                  <em style={{color:'var(--zivo-teal)',fontStyle:'italic'}}>
                    {text('Eres parte de nuestra comunidad.', 'You are part of our community.')}
                  </em>
                </h2>
                <p style={{color:'rgba(253,249,245,0.75)',fontSize:'1.05rem',lineHeight:1.85,marginBottom:'var(--space-md)'}}>
                  {text(
                    'Andrea y su equipo de asesores conocen tu historia, hablan tu idioma, y se preocupan genuinamente por que estés protegido. No te damos una póliza y desaparecemos. Estamos aquí cuando más nos necesitas.',
                    'Andrea and her team of advisors know your story, speak your language, and genuinely care that you are protected. We don\'t give you a policy and disappear. We are here when you need us most.'
                  )}
                </p>
                <div className="z-andrea__team">
                  <div className="z-andrea__member">
                    <img src="/images/team/avatars/andrea-portrait.png" alt="Andrea — Zivo Insurance"
                      width="80" height="90" loading="lazy"
                      onError={e=>{e.target.style.display='none';}}/>
                    <div>
                      <strong style={{color:'var(--hc-ivory)',display:'block',fontSize:'0.9rem'}}>Andrea</strong>
                      <span style={{color:'var(--zivo-teal)',fontSize:'0.75rem',letterSpacing:'0.1em',textTransform:'uppercase'}}>
                        {text('Líder de Seguros', 'Insurance Leader')}
                      </span>
                    </div>
                  </div>
                  <div className="z-andrea__member">
                    <img src="/images/team/avatars/dayana-car.png" alt="Dayana — Zivo Insurance"
                      width="80" height="90" loading="lazy"
                      onError={e=>{e.target.style.display='none';}}/>
                    <div>
                      <strong style={{color:'var(--hc-ivory)',display:'block',fontSize:'0.9rem'}}>Dayana</strong>
                      <span style={{color:'var(--zivo-teal)',fontSize:'0.75rem',letterSpacing:'0.1em',textTransform:'uppercase'}}>
                        CEO
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="z-andrea__image">
                <img src="/images/team/avatars/andrea-portrait.png"
                  alt="Andrea — Zivo Insurance Leader"
                  className="z-andrea__avatar" width="380" height="460" loading="lazy"
                  onError={e=>{e.target.style.display='none';}}/>
              </div>
            </div>
          </div>
        </section>

        {/* ── REVIEWS ── */}
        <section className="z-reviews section--sm" ref={ref3}>
          <div className="container">
            <div className="z-reviews__header fade-up">
              <span className="eyebrow">{text('Lo que dicen nuestros clientes', 'What our clients say')}</span>
              <h2 className="display-2">{text('La comunidad habla por nosotros.', 'The community speaks for us.')}</h2>
            </div>
            <div className="grid-2 fade-up" style={{gap:'var(--space-sm)',marginTop:'var(--space-md)'}}>
              {REVIEWS.map((r,i)=>(
                <div key={i} className="card">
                  <Stars count={r.stars}/>
                  <p style={{fontSize:'0.9rem',lineHeight:1.75,color:'var(--hc-text)',margin:'var(--space-xs) 0',fontStyle:'italic'}}>
                    "{lang==='es'?r.text_es:r.text_en}"
                  </p>
                  <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                    <div style={{width:32,height:32,borderRadius:'50%',background:'var(--zivo-teal)',color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.8rem',fontWeight:600,flexShrink:0}}>{r.name.charAt(0)}</div>
                    <strong style={{fontSize:'0.85rem',color:'var(--hc-navy)'}}>{r.name}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="z-faq section--sm">
          <div className="container container--narrow">
            <div className="fade-up">
              <span className="eyebrow">{text('Preguntas frecuentes', 'Frequently asked questions')}</span>
              <h2 className="display-2" style={{marginBottom:'var(--space-md)'}}>
                {text('Lo que más nos preguntan.', 'What people ask us most.')}
              </h2>
              <div className="b-faq__list">
                {FAQ.map((item,i)=><FAQItem key={i} item={item} lang={lang}/>)}
              </div>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="z-cta">
          <div className="container">
            <div className="z-cta__inner">
              <div className="z-cta__text">
                <h2 className="display-2" style={{color:'var(--hc-ivory)'}}>
                  {text('Tu tranquilidad empieza hoy.', 'Your peace of mind starts today.')}
                </h2>
                <p style={{color:'rgba(253,249,245,0.7)',fontSize:'1.05rem',marginTop:'var(--space-sm)'}}>
                  {text(
                    'Obtén tu cotización en minutos. Sin papeleos largos, sin sorpresas. Solo protección real para lo que más importa.',
                    'Get your quote in minutes. No lengthy paperwork, no surprises. Just real protection for what matters most.'
                  )}
                </p>
              </div>
              <div className="z-cta__actions">
                <a href={WHATSAPP.zivo} target="_blank" rel="noopener noreferrer" className="btn z-btn--primary">
                  {text('Cotizar por WhatsApp', 'Quote via WhatsApp')}
                </a>
                <a href="tel:8647770003" className="btn z-btn--outline-light">
                  (864) 777-0003
                </a>
                <Link to="/bonanza" className="btn z-btn--ghost">
                  {text('¿También necesitas un préstamo? →', 'Also need a loan? →')}
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      <style>{`
        .zivo-page { --brand: var(--zivo-teal); }
        .stars-row { display:inline-flex; gap:2px; }

        /* Hero */
        .z-hero { position:relative; min-height:100vh; display:flex; align-items:center; padding-top:var(--nav-height); overflow:hidden; }
        .z-hero__bg { position:absolute; inset:0; z-index:0; }
        .z-hero__img { width:100%; height:100%; object-fit:cover; object-position:center 30%; }
        .z-hero__overlay { position:absolute; inset:0; background:linear-gradient(105deg,rgba(4,52,44,0.93) 0%,rgba(15,110,86,0.75) 50%,rgba(4,52,44,0.45) 100%); }
        .z-hero__content { position:relative; z-index:1; display:grid; grid-template-columns:1fr auto; gap:var(--space-lg); align-items:center; padding-top:var(--space-xl); padding-bottom:var(--space-xl); }
        .z-hero__eyebrow { color:var(--zivo-light); margin-bottom:var(--space-sm); }
        .z-hero__headline { font-family:var(--font-heading); font-size:clamp(2.4rem,5vw,4.2rem); font-weight:300; color:var(--hc-ivory); line-height:1.08; margin-bottom:var(--space-sm); }
        .z-hero__headline em { color:var(--zivo-teal); font-style:italic; }
        .z-hero__body { font-size:1.05rem; color:rgba(253,249,245,0.8); line-height:1.85; margin-bottom:var(--space-md); max-width:540px; }
        .z-hero__badges { display:flex; flex-wrap:wrap; gap:var(--space-sm); margin-bottom:var(--space-md); }
        .z-hero__badge { display:flex; align-items:center; gap:6px; font-size:0.78rem; font-weight:500; color:rgba(253,249,245,0.65); }
        .z-hero__actions { display:flex; flex-wrap:wrap; gap:var(--space-sm); }
        .z-hero__dayana { width:300px; height:auto; object-fit:contain; filter:drop-shadow(0 20px 40px rgba(0,0,0,0.4)); }

        /* Buttons */
        .z-btn--primary { background:var(--zivo-teal); color:white; }
        .z-btn--primary:hover { background:var(--zivo-mid); }
        .z-btn--outline { border:1.5px solid rgba(253,249,245,0.5); color:var(--hc-ivory); }
        .z-btn--outline:hover { background:rgba(253,249,245,0.1); }
        .z-btn--outline-light { border:1.5px solid rgba(253,249,245,0.4); color:var(--hc-ivory); }
        .z-btn--outline-light:hover { background:rgba(253,249,245,0.1); }
        .z-btn--ghost { color:var(--zivo-light); padding-left:0; padding-right:0; }
        .z-btn--ghost:hover { color:white; }

        /* Trust band */
        .z-trust { background:var(--zivo-dark); padding:var(--space-lg) 0; }
        .z-trust__grid { display:grid; grid-template-columns:repeat(6,1fr); gap:1px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.06); border-radius:var(--radius-lg); overflow:hidden; }
        .z-trust__item { background:var(--zivo-dark); padding:var(--space-md); text-align:center; }
        .z-trust__val { display:block; font-family:var(--font-heading); font-size:clamp(1.4rem,2.5vw,2rem); font-weight:300; color:var(--zivo-teal); line-height:1; margin-bottom:var(--space-xs); }
        .z-trust__label { display:block; font-size:0.75rem; color:rgba(255,255,255,0.5); line-height:1.5; }

        /* Products */
        .z-products { background:var(--hc-ivory); }
        .z-products__header { max-width:640px; margin-bottom:var(--space-lg); }
        .z-products__grid { display:grid; grid-template-columns:repeat(4,1fr); gap:var(--space-sm); }
        .z-product-card { background:white; border:1px solid var(--hc-border); border-radius:var(--radius-lg); padding:var(--space-md); display:flex; flex-direction:column; gap:var(--space-xs); border-top:3px solid var(--zivo-teal); transition:box-shadow var(--duration) var(--ease),transform var(--duration) var(--ease); }
        .z-product-card:hover { box-shadow:var(--shadow-lg); transform:translateY(-3px); }
        .z-product-card__icon { font-size:2rem; line-height:1; margin-bottom:4px; }
        .z-product-card__title { font-family:var(--font-heading); font-size:1.3rem; font-weight:400; color:var(--hc-navy); }
        .z-product-card__tagline { font-size:0.85rem; color:var(--zivo-teal); font-style:italic; }
        .z-product-card__desc { font-size:0.875rem; color:var(--hc-soft); line-height:1.7; flex:1; }
        .z-product-card__features { list-style:none; display:flex; flex-direction:column; gap:6px; margin-bottom:var(--space-sm); }
        .z-product-card__features li { display:flex; align-items:center; gap:8px; font-size:0.82rem; color:var(--hc-text); }
        .z-product-card__cta { margin-top:auto; justify-content:center; }

        /* Process */
        .z-process { background:white; }
        .z-steps { display:flex; flex-direction:column; gap:var(--space-sm); }
        .z-step { display:grid; grid-template-columns:60px 1fr; gap:var(--space-md); align-items:start; padding:var(--space-md); background:var(--hc-ivory); border-radius:var(--radius-lg); border-left:3px solid var(--zivo-teal); }
        .z-step__num { font-family:var(--font-heading); font-size:2rem; font-weight:300; color:var(--zivo-teal); line-height:1; }
        .z-step__title { display:block; font-size:0.95rem; font-weight:600; color:var(--hc-navy); margin-bottom:4px; }
        .z-step__desc { font-size:0.875rem; color:var(--hc-soft); line-height:1.7; }

        /* Carriers */
        .z-carriers { background:var(--hc-ivory); }
        .z-carriers__grid { display:flex; justify-content:center; gap:var(--space-md); flex-wrap:wrap; }
        .z-carrier-card { display:flex; flex-direction:column; align-items:center; gap:6px; padding:var(--space-md) var(--space-lg); background:white; border:1px solid var(--hc-border); border-radius:var(--radius-lg); min-width:180px; transition:all var(--duration) var(--ease); }
        .z-carrier-card:hover { border-color:var(--zivo-teal); box-shadow:var(--shadow-md); }
        .z-carrier-card__name { font-size:1.2rem; font-weight:600; color:var(--hc-navy); }
        .z-carrier-card__note { font-size:0.75rem; color:var(--zivo-teal); font-weight:500; letter-spacing:0.08em; text-transform:uppercase; }

        /* Andrea feature */
        .z-andrea { background:var(--zivo-dark); padding:var(--space-xl) 0; }
        .z-andrea__inner { display:grid; grid-template-columns:1fr auto; gap:var(--space-xl); align-items:center; }
        .z-andrea__team { display:flex; gap:var(--space-md); margin-top:var(--space-md); }
        .z-andrea__member { display:flex; align-items:center; gap:var(--space-sm); }
        .z-andrea__member img { width:56px; height:64px; object-fit:cover; object-position:top; border-radius:var(--radius-md); background:rgba(255,255,255,0.1); }
        .z-andrea__avatar { width:320px; height:auto; object-fit:contain; filter:drop-shadow(0 20px 40px rgba(0,0,0,0.4)); }

        /* Reviews */
        .z-reviews { background:var(--hc-ivory); }
        .z-reviews__header { margin-bottom:0; }

        /* FAQ */
        .z-faq { background:white; }
        .b-faq__list { display:flex; flex-direction:column; gap:1px; background:var(--hc-border); border:1px solid var(--hc-border); border-radius:var(--radius-lg); overflow:hidden; }
        .faq-item { background:white; }
        .faq-item__q { width:100%; display:flex; justify-content:space-between; align-items:center; gap:var(--space-md); padding:var(--space-md); font-size:0.95rem; font-weight:500; color:var(--hc-navy); text-align:left; cursor:pointer; transition:background var(--duration) var(--ease); }
        .faq-item__q:hover { background:var(--hc-ivory); }
        .faq-item__icon { flex-shrink:0; transition:transform var(--duration) var(--ease); }
        .faq-item--open .faq-item__icon { transform:rotate(180deg); }
        .faq-item__a { padding:0 var(--space-md) var(--space-md); font-size:0.9rem; line-height:1.8; color:var(--hc-soft); border-top:1px solid var(--hc-border); padding-top:var(--space-sm); }

        /* Final CTA */
        .z-cta { background:var(--zivo-mid); padding:var(--space-xl) 0; }
        .z-cta__inner { display:grid; grid-template-columns:1fr auto; gap:var(--space-xl); align-items:center; }
        .z-cta__actions { display:flex; flex-direction:column; gap:var(--space-sm); flex-shrink:0; }

        /* Responsive */
        @media(max-width:1100px) { .z-products__grid{grid-template-columns:1fr 1fr;} .z-trust__grid{grid-template-columns:repeat(3,1fr);} }
        @media(max-width:900px) { .z-hero__content{grid-template-columns:1fr;} .z-hero__avatars{display:none;} .z-andrea__inner{grid-template-columns:1fr;} .z-andrea__image{display:none;} .z-cta__inner{grid-template-columns:1fr;} }
        @media(max-width:600px) { .z-products__grid{grid-template-columns:1fr;} .z-trust__grid{grid-template-columns:repeat(2,1fr);} }
      `}</style>
    </>
  );
}
