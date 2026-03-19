import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/layout/SEOHead.jsx';
import { SITE, WHATSAPP } from '../config/site.config.js';
import { LOCATIONS } from '../config/locations.config.js';
import { useLanguage } from '../hooks/useLanguage.js';
import { useScrollAnimation } from '../hooks/useScrollAnimation.js';

const DEPARTMENTS = [
  {
    id: 'bonanza',
    title_es: 'Bonanza Quick Loans',
    title_en: 'Bonanza Quick Loans',
    desc_es: 'Préstamos personales, sobre título, para negocio, o consolidación de deudas. Sin SSN requerido.',
    desc_en: 'Personal, title, business loans, or debt consolidation. No SSN required.',
    color: 'var(--bonanza-gold)',
    dark: 'var(--bonanza-dark)',
    avatar: '/images/team/avatars/adriana-office.png',
    lead: 'Adriana',
    wa: WHATSAPP?.bonanza,
    zohoTag: 'web-bonanza',
  },
  {
    id: 'zivo',
    title_es: 'Zivo Insurance',
    title_en: 'Zivo Insurance',
    desc_es: 'Seguros de auto, hogar, comercial y vida. Con licencia extranjera, ITIN o pasaporte.',
    desc_en: 'Auto, home, commercial, and life insurance. With foreign license, ITIN, or passport.',
    color: 'var(--zivo-teal)',
    dark: 'var(--zivo-dark)',
    avatar: '/images/team/avatars/andrea-portrait.png',
    lead: 'Andrea',
    wa: WHATSAPP?.zivo,
    zohoTag: 'web-zivo',
  },
  {
    id: 'media',
    title_es: 'HC Business & Media',
    title_en: 'HC Business & Media',
    desc_es: 'Marketing, tecnología, Ruta Empresarial, HC Business 360. Servicios para tu empresa.',
    desc_en: 'Marketing, technology, Ruta Empresarial, HC Business 360. Services for your business.',
    color: 'var(--media-lilac)',
    dark: 'var(--media-mid)',
    avatar: '/images/team/avatars/amili-portrait.png',
    lead: 'Amili',
    wa: WHATSAPP?.media,
    zohoTag: 'web-media',
  },
  {
    id: 'unidos',
    title_es: 'Hispanics United SC',
    title_en: 'Hispanics United SC',
    desc_es: 'Alianzas corporativas, programas comunitarios, salud, y voluntariado.',
    desc_en: 'Corporate partnerships, community programs, health, and volunteering.',
    color: 'var(--unidos-green)',
    dark: 'var(--unidos-dark)',
    avatar: '/images/team/avatars/paola-green-skirt.png',
    lead: 'Paola',
    wa: WHATSAPP?.unidos,
    zohoTag: 'web-unidos',
  },
];

function ContactForm({ dept, lang, onSuccess }) {
  const { text } = useLanguage();
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '', lang });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    // In production this POSTs to a Netlify function that creates a Zoho CRM lead
    await new Promise(r => setTimeout(r, 900));
    setStatus('success');
    onSuccess?.();
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form__row">
        <div className="contact-form__field">
          <label className="contact-form__label">{text('Nombre completo', 'Full name')} *</label>
          <input type="text" required className="contact-form__input"
            placeholder={text('Tu nombre y apellido', 'Your first and last name')}
            value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}/>
        </div>
        <div className="contact-form__field">
          <label className="contact-form__label">{text('Teléfono', 'Phone')} *</label>
          <input type="tel" required className="contact-form__input"
            placeholder="(864) 000-0000"
            value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}/>
        </div>
      </div>
      <div className="contact-form__field">
        <label className="contact-form__label">{text('Correo electrónico', 'Email')} ({text('opcional', 'optional')})</label>
        <input type="email" className="contact-form__input"
          placeholder="tu@correo.com"
          value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}/>
      </div>
      <div className="contact-form__field">
        <label className="contact-form__label">{text('¿En qué te podemos ayudar?', 'How can we help you?')}</label>
        <textarea className="contact-form__textarea" rows={4}
          placeholder={text('Cuéntanos brevemente lo que necesitas...', 'Tell us briefly what you need...')}
          value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}/>
      </div>
      {status === 'success' ? (
        <div className="contact-form__success">
          <span>✓</span>
          <p>{text(`¡Gracias! ${dept?.lead} te contactará pronto.`, `Thank you! ${dept?.lead} will contact you soon.`)}</p>
        </div>
      ) : (
        <button type="submit" className="btn btn--primary contact-form__submit" disabled={status === 'loading'}
          style={{ background: dept?.color }}>
          {status === 'loading' ? text('Enviando...', 'Sending...') : text('Enviar mensaje', 'Send message')}
        </button>
      )}
    </form>
  );
}

export default function Contacto() {
  const { lang, text } = useLanguage();
  const [activeDept, setActiveDept] = useState('bonanza');
  const [formSent, setFormSent] = useState(false);
  const ref = useScrollAnimation();
  const dept = DEPARTMENTS.find(d => d.id === activeDept);

  return (
    <>
      <SEOHead lang={lang} />
      <main className="contacto-page">

        {/* ── HERO ── */}
        <section className="ct-hero">
          <div className="container">
            <div className="ct-hero__inner">
              <div>
                <span className="eyebrow ct-hero__eyebrow">
                  {text('Estamos aquí para ti', 'We are here for you')}
                </span>
                <h1 className="ct-hero__headline">
                  {text('Hablemos.', 'Let\'s talk.')}<br/>
                  <em>{text('En tu idioma, a tu ritmo.', 'In your language, at your pace.')}</em>
                </h1>
                <p className="ct-hero__body">
                  {text(
                    'Elige el departamento que necesitas y conéctate directamente con la persona que puede ayudarte. Sin robots, sin esperas largas, sin confusión.',
                    'Choose the department you need and connect directly with the person who can help you. No robots, no long waits, no confusion.'
                  )}
                </p>
                <div className="ct-hero__quick">
                  <a href={`tel:${SITE.phone.replace(/\D/g,'')}`} className="ct-hero__quick-btn">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M16.5 12.75a1.5 1.5 0 01-1.5 1.5A13.5 13.5 0 013.75 3 1.5 1.5 0 015.25 1.5h2.25a1.5 1.5 0 011.5 1.275c.12.9.345 1.785.67 2.625a1.5 1.5 0 01-.338 1.575L8.085 7.92a12 12 0 005.495 5.495l.945-1.245a1.5 1.5 0 011.575-.338c.84.325 1.725.55 2.625.67A1.5 1.5 0 0116.5 13.5v-.75z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {SITE.phone}
                  </a>
                  <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="ct-hero__quick-btn ct-hero__quick-btn--wa">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp
                  </a>
                </div>
              </div>
              <div className="ct-hero__avatar-wrap">
                <img src="/images/team/avatars/dollys-desk.png"
                  alt="Dollys — HC Client Solutions"
                  className="ct-hero__dollys" width="300" height="360" loading="eager"
                  onError={e => { e.target.style.display = 'none'; }}/>
              </div>
            </div>
          </div>
        </section>

        {/* ── DEPARTMENT ROUTING ── */}
        <section className="ct-routing section" ref={ref}>
          <div className="container">
            <div className="ct-routing__header fade-up">
              <span className="eyebrow">{text('Selecciona el departamento', 'Select the department')}</span>
              <h2 className="display-2">
                {text('¿Con quién necesitas hablar?', 'Who do you need to speak with?')}
              </h2>
            </div>

            <div className="ct-routing__tabs fade-up">
              {DEPARTMENTS.map(d => (
                <button
                  key={d.id}
                  className={`ct-tab${activeDept === d.id ? ' ct-tab--active' : ''}`}
                  style={{ '--tab-color': d.color }}
                  onClick={() => { setActiveDept(d.id); setFormSent(false); }}
                >
                  <img src={`/images/team/avatars/${d.id === 'bonanza' ? 'adriana-office' : d.id === 'zivo' ? 'andrea-portrait' : d.id === 'media' ? 'amili-portrait' : 'paola-green-skirt'}.png`}
                    alt={d.lead} className="ct-tab__avatar" width="48" height="56" loading="lazy"
                    onError={e => { e.target.style.display = 'none'; }}/>
                  <div className="ct-tab__info">
                    <strong className="ct-tab__lead">{d.lead}</strong>
                    <span className="ct-tab__dept">{lang === 'es' ? d.title_es : d.title_en}</span>
                  </div>
                </button>
              ))}
            </div>

            {dept && (
              <div className="ct-routing__panel fade-up" style={{ '--dept-color': dept.color, '--dept-dark': dept.dark }}>
                <div className="ct-routing__panel-left">
                  <div className="ct-routing__panel-header">
                    <img src={dept.avatar} alt={dept.lead}
                      className="ct-routing__panel-avatar" width="120" height="140" loading="lazy"
                      onError={e => { e.target.style.display = 'none'; }}/>
                    <div>
                      <h3 className="ct-routing__panel-title">{lang === 'es' ? dept.title_es : dept.title_en}</h3>
                      <p className="ct-routing__panel-desc">{lang === 'es' ? dept.desc_es : dept.desc_en}</p>
                      <div className="ct-routing__direct">
                        <a href={dept.wa} target="_blank" rel="noopener noreferrer" className="btn ct-btn--wa">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                          {text('WhatsApp directo', 'Direct WhatsApp')}
                        </a>
                        <a href={`tel:${SITE.phone.replace(/\D/g,'')}`} className="btn ct-btn--call">
                          <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M16.5 12.75a1.5 1.5 0 01-1.5 1.5A13.5 13.5 0 013.75 3 1.5 1.5 0 015.25 1.5h2.25a1.5 1.5 0 011.5 1.275c.12.9.345 1.785.67 2.625a1.5 1.5 0 01-.338 1.575L8.085 7.92a12 12 0 005.495 5.495l.945-1.245a1.5 1.5 0 011.575-.338c.84.325 1.725.55 2.625.67A1.5 1.5 0 0116.5 13.5v-.75z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          {text('Llamar ahora', 'Call now')}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="ct-routing__divider">
                    <span>{text('O déjanos un mensaje', 'Or leave us a message')}</span>
                  </div>
                  <ContactForm dept={dept} lang={lang} onSuccess={() => setFormSent(true)} />
                </div>

                <div className="ct-routing__panel-right">
                  <div className="ct-routing__hours">
                    <h4 className="ct-routing__hours-title">{text('Horario de atención', 'Business hours')}</h4>
                    {[
                      { day_es: 'Lunes — Viernes', day_en: 'Monday — Friday', hours: '9:00 AM – 6:00 PM' },
                      { day_es: 'Sábado', day_en: 'Saturday', hours: '10:00 AM – 3:00 PM' },
                      { day_es: 'Domingo', day_en: 'Sunday', hours_es: 'Cerrado', hours_en: 'Closed' },
                    ].map((h, i) => (
                      <div key={i} className="ct-routing__hour-row">
                        <span>{lang === 'es' ? h.day_es : h.day_en}</span>
                        <span>{h.hours_es ? (lang === 'es' ? h.hours_es : h.hours_en) : h.hours}</span>
                      </div>
                    ))}
                  </div>
                  <div className="ct-routing__note">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7" stroke="var(--dept-color)" strokeWidth="1"/>
                      <path d="M8 5v4M8 11v.5" stroke="var(--dept-color)" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <p>{text(
                      'Por WhatsApp respondemos hasta las 8 PM en días de semana.',
                      'Via WhatsApp we respond until 8 PM on weekdays.'
                    )}</p>
                  </div>
                  <div className="ct-routing__response">
                    <strong>{text('Tiempo de respuesta:', 'Response time:')}</strong>
                    <span>{text('Menos de 2 horas en horario de oficina.', 'Less than 2 hours during office hours.')}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── LOCATIONS ── */}
        <section className="ct-locations section--sm">
          <div className="container">
            <span className="eyebrow">{text('Visítanos en persona', 'Visit us in person')}</span>
            <h2 className="display-2" style={{ margin: '8px 0 var(--space-lg)' }}>
              {text('6 oficinas en Upstate SC.', '6 offices in Upstate SC.')}
            </h2>
            <div className="ct-locations__grid">
              {LOCATIONS.map(loc => (
                <a key={loc.id} href={loc.mapUrl} target="_blank" rel="noopener noreferrer" className="ct-location">
                  {loc.isHQ && <span className="ct-location__hq">{text('Sede Principal', 'Main Office')}</span>}
                  <strong className="ct-location__name">{loc.name}</strong>
                  <span className="ct-location__addr">{loc.address}</span>
                  <span className="ct-location__city">{loc.city}, {loc.state} {loc.zip}</span>
                  {loc.note_es && <span className="ct-location__note">{text(loc.note_es, loc.note_en)}</span>}
                  <span className="ct-location__hours">{loc.hours}</span>
                  <span className="ct-location__map">{text('Ver en mapa →', 'View on map →')}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

      </main>

      <style>{`
        .contacto-page {}

        /* Hero */
        .ct-hero { background:var(--hc-navy); padding:calc(var(--nav-height) + var(--space-xl)) 0 var(--space-xl); }
        .ct-hero__inner { display:grid; grid-template-columns:1fr auto; gap:var(--space-xl); align-items:center; }
        .ct-hero__eyebrow { color:var(--hc-brass); margin-bottom:var(--space-sm); }
        .ct-hero__headline { font-family:var(--font-heading); font-size:clamp(2.4rem,5vw,4rem); font-weight:300; color:var(--hc-ivory); line-height:1.08; margin-bottom:var(--space-sm); }
        .ct-hero__headline em { color:var(--hc-brass); font-style:italic; }
        .ct-hero__body { font-size:1.05rem; color:rgba(253,249,245,0.78); line-height:1.85; max-width:520px; margin-bottom:var(--space-md); }
        .ct-hero__quick { display:flex; flex-wrap:wrap; gap:var(--space-sm); }
        .ct-hero__quick-btn { display:flex; align-items:center; gap:8px; padding:12px 20px; border-radius:var(--radius-md); background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); color:var(--hc-ivory); font-size:0.9rem; font-weight:500; transition:all var(--duration) var(--ease); }
        .ct-hero__quick-btn:hover { background:rgba(255,255,255,0.15); }
        .ct-hero__quick-btn--wa { background:rgba(37,211,102,0.15); border-color:rgba(37,211,102,0.3); color:#4ade80; }
        .ct-hero__quick-btn--wa:hover { background:rgba(37,211,102,0.25); }
        .ct-hero__dollys { width:260px; height:auto; object-fit:contain; filter:drop-shadow(0 20px 40px rgba(0,0,0,0.4)); }

        /* Routing */
        .ct-routing { background:var(--hc-ivory); }
        .ct-routing__header { max-width:560px; margin-bottom:var(--space-lg); }
        .ct-routing__tabs { display:grid; grid-template-columns:repeat(4,1fr); gap:var(--space-sm); margin-bottom:var(--space-md); }
        .ct-tab { display:flex; align-items:center; gap:var(--space-sm); padding:var(--space-sm) var(--space-md); background:white; border:1.5px solid var(--hc-border); border-radius:var(--radius-lg); text-align:left; transition:all var(--duration) var(--ease); cursor:pointer; }
        .ct-tab:hover { border-color:var(--tab-color); box-shadow:var(--shadow-sm); }
        .ct-tab--active { border-color:var(--tab-color); border-width:2px; box-shadow:0 0 0 3px color-mix(in srgb,var(--tab-color) 15%,transparent); }
        .ct-tab__avatar { width:40px; height:48px; object-fit:cover; object-position:top; border-radius:var(--radius-sm); background:var(--hc-ivory); flex-shrink:0; }
        .ct-tab__lead { display:block; font-size:0.9rem; font-weight:600; color:var(--hc-navy); }
        .ct-tab__dept { display:block; font-size:0.72rem; color:var(--hc-soft); line-height:1.4; }

        .ct-routing__panel { background:white; border:1.5px solid var(--dept-color); border-radius:var(--radius-lg); overflow:hidden; display:grid; grid-template-columns:1fr 280px; }
        .ct-routing__panel-left { padding:var(--space-lg); }
        .ct-routing__panel-header { display:grid; grid-template-columns:auto 1fr; gap:var(--space-md); align-items:start; margin-bottom:var(--space-md); }
        .ct-routing__panel-avatar { width:90px; height:104px; object-fit:cover; object-position:top; border-radius:var(--radius-md); background:var(--hc-ivory); }
        .ct-routing__panel-title { font-family:var(--font-heading); font-size:1.4rem; font-weight:300; color:var(--hc-navy); margin-bottom:6px; }
        .ct-routing__panel-desc { font-size:0.875rem; color:var(--hc-soft); line-height:1.7; margin-bottom:var(--space-sm); }
        .ct-routing__direct { display:flex; flex-wrap:wrap; gap:var(--space-xs); }
        .ct-btn--wa { background:#25D366; color:white; padding:10px 16px; font-size:0.82rem; display:flex; align-items:center; gap:6px; border-radius:var(--radius-md); font-weight:600; transition:background var(--duration) var(--ease); }
        .ct-btn--wa:hover { background:#1da851; }
        .ct-btn--call { background:var(--dept-color); color:white; padding:10px 16px; font-size:0.82rem; display:flex; align-items:center; gap:6px; border-radius:var(--radius-md); font-weight:600; transition:opacity var(--duration) var(--ease); }
        .ct-btn--call:hover { opacity:0.85; }
        .ct-routing__divider { display:flex; align-items:center; gap:var(--space-sm); margin:var(--space-md) 0; }
        .ct-routing__divider::before,.ct-routing__divider::after { content:''; flex:1; height:1px; background:var(--hc-border); }
        .ct-routing__divider span { font-size:0.78rem; color:var(--hc-soft); white-space:nowrap; }

        .ct-routing__panel-right { background:var(--hc-ivory); border-left:1px solid var(--hc-border); padding:var(--space-lg); display:flex; flex-direction:column; gap:var(--space-md); }
        .ct-routing__hours-title { font-size:0.78rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:var(--hc-soft); margin-bottom:var(--space-sm); }
        .ct-routing__hour-row { display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid var(--hc-border); font-size:0.85rem; color:var(--hc-text); }
        .ct-routing__hour-row:last-child { border-bottom:none; }
        .ct-routing__note { display:flex; align-items:flex-start; gap:8px; padding:var(--space-sm); background:white; border-radius:var(--radius-md); }
        .ct-routing__note p { font-size:0.82rem; color:var(--hc-soft); line-height:1.6; }
        .ct-routing__response { display:flex; flex-direction:column; gap:4px; padding:var(--space-sm); background:color-mix(in srgb,var(--dept-color) 10%,white); border-radius:var(--radius-md); border:1px solid color-mix(in srgb,var(--dept-color) 25%,transparent); }
        .ct-routing__response strong { font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:var(--dept-color); }
        .ct-routing__response span { font-size:0.85rem; color:var(--hc-text); }

        /* Contact form */
        .contact-form { display:flex; flex-direction:column; gap:var(--space-sm); }
        .contact-form__row { display:grid; grid-template-columns:1fr 1fr; gap:var(--space-sm); }
        .contact-form__field { display:flex; flex-direction:column; gap:6px; }
        .contact-form__label { font-size:0.82rem; font-weight:600; color:var(--hc-navy); }
        .contact-form__input,.contact-form__textarea { padding:12px 16px; border:1.5px solid var(--hc-border); border-radius:var(--radius-md); font-family:var(--font-body); font-size:0.95rem; color:var(--hc-text); outline:none; transition:border-color var(--duration) var(--ease); width:100%; }
        .contact-form__input:focus,.contact-form__textarea:focus { border-color:var(--dept-color,var(--hc-lilac)); }
        .contact-form__textarea { resize:vertical; }
        .contact-form__submit { width:100%; justify-content:center; }
        .contact-form__submit:disabled { opacity:0.6; cursor:not-allowed; }
        .contact-form__success { display:flex; align-items:center; gap:var(--space-sm); padding:var(--space-sm); background:color-mix(in srgb,var(--unidos-green) 10%,white); border-radius:var(--radius-md); border:1px solid color-mix(in srgb,var(--unidos-green) 25%,transparent); }
        .contact-form__success span { width:32px; height:32px; border-radius:50%; background:var(--unidos-green); color:white; display:flex; align-items:center; justify-content:center; font-weight:700; flex-shrink:0; font-size:0.9rem; }
        .contact-form__success p { font-size:0.9rem; color:var(--hc-text); }

        /* Locations */
        .ct-locations { background:white; }
        .ct-locations__grid { display:grid; grid-template-columns:repeat(3,1fr); gap:var(--space-sm); }
        .ct-location { display:flex; flex-direction:column; gap:4px; padding:var(--space-md); border:1px solid var(--hc-border); border-radius:var(--radius-lg); text-decoration:none; color:inherit; position:relative; transition:all var(--duration) var(--ease); }
        .ct-location:hover { border-color:var(--hc-brass); box-shadow:var(--shadow-md); transform:translateY(-2px); }
        .ct-location__hq { position:absolute; top:-1px; right:var(--space-sm); background:var(--hc-brass); color:white; font-size:0.65rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; padding:3px 10px; border-radius:0 0 var(--radius-sm) var(--radius-sm); }
        .ct-location__name { font-size:0.95rem; font-weight:600; color:var(--hc-navy); }
        .ct-location__addr,.ct-location__city { font-size:0.8rem; color:var(--hc-soft); }
        .ct-location__note { font-size:0.78rem; color:var(--unidos-green); font-style:italic; }
        .ct-location__hours { font-size:0.78rem; color:var(--hc-soft); }
        .ct-location__map { font-size:0.78rem; font-weight:600; color:var(--hc-brass); margin-top:auto; padding-top:var(--space-xs); }

        @media(max-width:1024px) { .ct-routing__tabs{grid-template-columns:1fr 1fr;} .ct-routing__panel{grid-template-columns:1fr;} .ct-routing__panel-right{border-left:none;border-top:1px solid var(--hc-border);} }
        @media(max-width:900px) { .ct-hero__inner{grid-template-columns:1fr;} .ct-hero__avatar-wrap{display:none;} .ct-locations__grid{grid-template-columns:1fr 1fr;} }
        @media(max-width:600px) { .ct-routing__tabs{grid-template-columns:1fr 1fr;} .ct-locations__grid{grid-template-columns:1fr;} .contact-form__row{grid-template-columns:1fr;} }
      `}</style>
    </>
  );
}
