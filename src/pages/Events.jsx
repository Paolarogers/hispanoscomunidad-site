import { useState } from 'react';
import SEOHead from '../components/layout/SEOHead.jsx';
import { SAMPLE_EVENTS, EVENTS_CONFIG } from '../config/events.config.js';
import { SITE, WHATSAPP } from '../config/site.config.js';
import { useLanguage } from '../hooks/useLanguage.js';
import { useScrollAnimation } from '../hooks/useScrollAnimation.js';

function formatDate(dateStr, lang) {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString(lang === 'es' ? 'es-US' : 'en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
}

function formatDateShort(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  return {
    month: d.toLocaleDateString('es-US', { month: 'short' }).toUpperCase(),
    day: d.getDate(),
    weekday: d.toLocaleDateString('es-US', { weekday: 'short' }),
  };
}

function getCategoryColor(catId) {
  const cat = EVENTS_CONFIG.categories.find(c => c.id === catId);
  return cat?.color || 'var(--hc-navy)';
}

function getCategoryLabel(catId, lang) {
  const cat = EVENTS_CONFIG.categories.find(c => c.id === catId);
  return lang === 'es' ? cat?.label_es : cat?.label_en;
}

// ── RSVP MODAL ──────────────────────────────────────────────
function RSVPModal({ event, lang, onClose }) {
  const { text } = useLanguage();
  const [form, setForm] = useState({ name: '', phone: '', email: '', lang });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/.netlify/functions/rsvp-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          eventId: event.id,
          eventTitle: lang === 'es' ? event.title_es : event.title_en,
          eventDate: formatDate(event.date, lang),
          eventLocation: event.location_short,
        }),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const waUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    lang === 'es' ? event.whatsapp_msg_es : event.whatsapp_msg_en
  )}`;

  return (
    <div className="rsvp-backdrop" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="rsvp-modal">
        <button className="rsvp-modal__close" onClick={onClose} aria-label="Cerrar">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>

        <div className="rsvp-modal__event">
          <span className="rsvp-modal__category" style={{ color: getCategoryColor(event.category) }}>
            {getCategoryLabel(event.category, lang)}
          </span>
          <h2 className="rsvp-modal__title">{lang === 'es' ? event.title_es : event.title_en}</h2>
          <div className="rsvp-modal__meta">
            <span>📅 {formatDate(event.date, lang)}</span>
            <span>🕐 {lang === 'es' ? event.time_es : event.time_en}</span>
            <span>📍 {event.location_short}</span>
          </div>
        </div>

        {status === 'success' ? (
          <div className="rsvp-modal__success">
            <div className="rsvp-modal__success-icon">✓</div>
            <h3>{text('¡Tu lugar está reservado!', 'Your spot is reserved!')}</h3>
            <p>{text(
              'Te enviaremos una confirmación por WhatsApp o SMS. ¡Nos vemos ahí!',
              'We will send you a confirmation via WhatsApp or SMS. See you there!'
            )}</p>
            <button className="btn btn--primary" onClick={onClose}>
              {text('Ver más eventos', 'See more events')}
            </button>
          </div>
        ) : (
          <>
            <form className="rsvp-modal__form" onSubmit={handleSubmit}>
              <div className="rsvp-modal__field">
                <label className="rsvp-modal__label">{text('Tu nombre completo', 'Your full name')} *</label>
                <input
                  type="text"
                  required
                  className="rsvp-modal__input"
                  placeholder={text('Nombre y apellido', 'First and last name')}
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div className="rsvp-modal__field">
                <label className="rsvp-modal__label">{text('Teléfono (para confirmación)', 'Phone (for confirmation)')} *</label>
                <input
                  type="tel"
                  required
                  className="rsvp-modal__input"
                  placeholder="(864) 000-0000"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                />
              </div>
              <div className="rsvp-modal__field">
                <label className="rsvp-modal__label">{text('Correo electrónico (opcional)', 'Email (optional)')}</label>
                <input
                  type="email"
                  className="rsvp-modal__input"
                  placeholder="tu@correo.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div className="rsvp-modal__field">
                <label className="rsvp-modal__label">{text('Idioma preferido', 'Preferred language')}</label>
                <div className="rsvp-modal__lang-toggle">
                  <button type="button" className={`rsvp-modal__lang-btn${form.lang === 'es' ? ' active' : ''}`} onClick={() => setForm(f => ({...f, lang: 'es'}))}>Español</button>
                  <button type="button" className={`rsvp-modal__lang-btn${form.lang === 'en' ? ' active' : ''}`} onClick={() => setForm(f => ({...f, lang: 'en'}))}>English</button>
                </div>
              </div>

              {status === 'error' && (
                <p className="rsvp-modal__error">
                  {text('Hubo un error. Por favor escríbenos por WhatsApp.', 'There was an error. Please message us on WhatsApp.')}
                </p>
              )}

              <button type="submit" className="btn btn--primary rsvp-modal__submit" disabled={status === 'loading'}>
                {status === 'loading'
                  ? text('Reservando...', 'Reserving...')
                  : text('Reservar mi lugar', 'Reserve my spot')}
              </button>
            </form>

            <div className="rsvp-modal__divider">
              <span>{text('O regístrate directamente por', 'Or register directly via')}</span>
            </div>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="rsvp-modal__wa">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
          </>
        )}
      </div>

      <style>{`
        .rsvp-backdrop { position:fixed; inset:0; background:rgba(30,26,46,0.7); z-index:200; display:flex; align-items:center; justify-content:center; padding:var(--space-md); backdrop-filter:blur(4px); }
        .rsvp-modal { background:white; border-radius:var(--radius-lg); padding:var(--space-lg); width:100%; max-width:520px; max-height:90vh; overflow-y:auto; position:relative; }
        .rsvp-modal__close { position:absolute; top:var(--space-sm); right:var(--space-sm); width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--hc-soft); transition:all var(--duration) var(--ease); }
        .rsvp-modal__close:hover { background:var(--hc-ivory); color:var(--hc-navy); }
        .rsvp-modal__event { margin-bottom:var(--space-md); padding-bottom:var(--space-md); border-bottom:1px solid var(--hc-border); }
        .rsvp-modal__category { font-size:0.72rem; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; display:block; margin-bottom:6px; }
        .rsvp-modal__title { font-family:var(--font-heading); font-size:1.5rem; font-weight:300; color:var(--hc-navy); margin-bottom:var(--space-xs); }
        .rsvp-modal__meta { display:flex; flex-direction:column; gap:4px; }
        .rsvp-modal__meta span { font-size:0.85rem; color:var(--hc-soft); }
        .rsvp-modal__form { display:flex; flex-direction:column; gap:var(--space-sm); }
        .rsvp-modal__field { display:flex; flex-direction:column; gap:6px; }
        .rsvp-modal__label { font-size:0.82rem; font-weight:600; color:var(--hc-navy); }
        .rsvp-modal__input { padding:12px 16px; border:1.5px solid var(--hc-border); border-radius:var(--radius-md); font-family:var(--font-body); font-size:0.95rem; color:var(--hc-text); transition:border-color var(--duration) var(--ease); outline:none; }
        .rsvp-modal__input:focus { border-color:var(--hc-lilac); }
        .rsvp-modal__lang-toggle { display:flex; border:1.5px solid var(--hc-border); border-radius:var(--radius-md); overflow:hidden; }
        .rsvp-modal__lang-btn { flex:1; padding:10px; font-size:0.85rem; font-weight:500; color:var(--hc-soft); transition:all var(--duration) var(--ease); }
        .rsvp-modal__lang-btn.active { background:var(--hc-navy); color:white; }
        .rsvp-modal__error { font-size:0.85rem; color:#e24b4a; padding:10px; background:#fcebeb; border-radius:var(--radius-sm); }
        .rsvp-modal__submit { width:100%; justify-content:center; margin-top:var(--space-xs); }
        .rsvp-modal__submit:disabled { opacity:0.6; cursor:not-allowed; }
        .rsvp-modal__divider { display:flex; align-items:center; gap:var(--space-sm); margin:var(--space-md) 0 var(--space-sm); }
        .rsvp-modal__divider::before,.rsvp-modal__divider::after { content:''; flex:1; height:1px; background:var(--hc-border); }
        .rsvp-modal__divider span { font-size:0.78rem; color:var(--hc-soft); white-space:nowrap; }
        .rsvp-modal__wa { display:flex; align-items:center; justify-content:center; gap:10px; width:100%; padding:14px; background:#25D366; color:white; border-radius:var(--radius-md); font-weight:600; font-size:0.9rem; transition:background var(--duration) var(--ease); }
        .rsvp-modal__wa:hover { background:#1da851; }
        .rsvp-modal__success { text-align:center; padding:var(--space-md) 0; }
        .rsvp-modal__success-icon { width:64px; height:64px; border-radius:50%; background:var(--unidos-green); color:white; font-size:1.8rem; display:flex; align-items:center; justify-content:center; margin:0 auto var(--space-sm); }
        .rsvp-modal__success h3 { font-family:var(--font-heading); font-size:1.5rem; color:var(--hc-navy); margin-bottom:var(--space-xs); }
        .rsvp-modal__success p { color:var(--hc-soft); margin-bottom:var(--space-md); }
      `}</style>
    </div>
  );
}

// ── EVENTS PAGE ─────────────────────────────────────────────
export default function Events() {
  const { lang, text } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const ref = useScrollAnimation();

  const filtered = activeCategory === 'all'
    ? SAMPLE_EVENTS
    : SAMPLE_EVENTS.filter(e => e.category === activeCategory);

  const upcoming = filtered.filter(e => new Date(e.date) >= new Date());
  const past = filtered.filter(e => new Date(e.date) < new Date());

  return (
    <>
      <SEOHead lang={lang} />
      <main className="events-page">

        {/* ── HERO ── */}
        <section className="ev-hero">
          <div className="container">
            <div className="ev-hero__inner">
              <div>
                <span className="eyebrow ev-hero__eyebrow">{text('Comunidad · Eventos · Talleres', 'Community · Events · Workshops')}</span>
                <h1 className="ev-hero__headline">
                  {text('Tu lugar en', 'Your place in')}<br/>
                  <em>{text('la comunidad.', 'the community.')}</em>
                </h1>
                <p className="ev-hero__body">
                  {text(
                    'Talleres de negocios, días de salud, networking, y celebraciones. Todo gratuito, todo en español, todo abierto para ti y tu familia.',
                    'Business workshops, health days, networking, and celebrations. All free, all in Spanish, all open for you and your family.'
                  )}
                </p>
                <div className="ev-hero__stats">
                  {[
                    { val: '6+', label_es: 'Eventos por mes', label_en: 'Events per month' },
                    { val: '100%', label_es: 'Gratuitos', label_en: 'Free' },
                    { val: '6', label_es: 'Ubicaciones en SC', label_en: 'Locations in SC' },
                  ].map((s, i) => (
                    <div key={i} className="ev-hero__stat">
                      <strong>{s.val}</strong>
                      <span>{lang === 'es' ? s.label_es : s.label_en}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="ev-hero__avatar-wrap">
                <img src="/images/team/avatars/adriana-bus.png"
                  alt="Adriana — Hispanos Comunidad eventos"
                  className="ev-hero__avatar" width="420" height="380" loading="eager"
                  onError={e => { e.target.style.display = 'none'; }}/>
              </div>
            </div>
          </div>
        </section>

        {/* ── FILTER BAR ── */}
        <div className="ev-filter">
          <div className="container">
            <div className="ev-filter__inner">
              <span className="ev-filter__label">{text('Filtrar por:', 'Filter by:')}</span>
              <div className="ev-filter__cats">
                {EVENTS_CONFIG.categories.map(cat => (
                  <button
                    key={cat.id}
                    className={`ev-filter__cat${activeCategory === cat.id ? ' ev-filter__cat--active' : ''}`}
                    style={{ '--cat-color': cat.color }}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    {lang === 'es' ? cat.label_es : cat.label_en}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── UPCOMING EVENTS ── */}
        <section className="ev-list section" ref={ref}>
          <div className="container">
            <span className="eyebrow">{text('Próximos eventos', 'Upcoming events')}</span>
            <h2 className="display-2 ev-list__headline" style={{ marginBottom: 'var(--space-lg)' }}>
              {upcoming.length > 0
                ? text('Reserva tu lugar hoy.', 'Reserve your spot today.')
                : text('Próximamente nuevos eventos.', 'New events coming soon.')}
            </h2>

            {upcoming.length > 0 && (
              <div className="ev-grid fade-up">
                {upcoming.map((event, i) => {
                  const d = formatDateShort(event.date);
                  const catColor = getCategoryColor(event.category);
                  return (
                    <div key={event.id} className="ev-card" style={{ '--ev-color': catColor }}>
                      <div className="ev-card__header">
                        <div className="ev-card__date-box">
                          <span className="ev-card__month">{d.month}</span>
                          <span className="ev-card__day">{d.day}</span>
                          <span className="ev-card__weekday">{d.weekday}</span>
                        </div>
                        <div className="ev-card__meta">
                          <span className="ev-card__category" style={{ color: catColor }}>
                            {getCategoryLabel(event.category, lang)}
                          </span>
                          {event.free && (
                            <span className="ev-card__free">{text('Gratis', 'Free')}</span>
                          )}
                          {event.partner && (
                            <span className="ev-card__partner">{text('con', 'with')} {event.partner}</span>
                          )}
                        </div>
                      </div>

                      <div className="ev-card__image-wrap">
                        <img src={event.image} alt={lang === 'es' ? event.title_es : event.title_en}
                          className="ev-card__image" width="400" height="200" loading="lazy"
                          onError={e => { e.target.parentElement.style.display = 'none'; }}/>
                      </div>

                      <div className="ev-card__body">
                        <h3 className="ev-card__title">{lang === 'es' ? event.title_es : event.title_en}</h3>
                        <p className="ev-card__desc">{lang === 'es' ? event.desc_es : event.desc_en}</p>
                        <div className="ev-card__details">
                          <span className="ev-card__detail">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="var(--hc-soft)" strokeWidth="1"/><path d="M7 4v3l2 2" stroke="var(--hc-soft)" strokeWidth="1" strokeLinecap="round"/></svg>
                            {lang === 'es' ? event.time_es : event.time_en}
                          </span>
                          <span className="ev-card__detail">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1C4.791 1 3 2.791 3 5c0 3.063 4 8 4 8s4-4.937 4-8c0-2.209-1.791-4-4-4zm0 5.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" fill="var(--hc-soft)"/></svg>
                            {event.location_short}
                          </span>
                          {event.capacity && (
                            <span className="ev-card__detail">
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="5" cy="4" r="2" stroke="var(--hc-soft)" strokeWidth="1"/><circle cx="9" cy="4" r="2" stroke="var(--hc-soft)" strokeWidth="1"/><path d="M1 11c0-2 1.8-3 4-3s4 1 4 3" stroke="var(--hc-soft)" strokeWidth="1" strokeLinecap="round"/><path d="M10 8c1.5.3 3 1.2 3 3" stroke="var(--hc-soft)" strokeWidth="1" strokeLinecap="round"/></svg>
                              {text(`Hasta ${event.capacity} personas`, `Up to ${event.capacity} people`)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="ev-card__actions">
                        <button
                          className="btn btn--primary ev-card__rsvp"
                          onClick={() => setSelectedEvent(event)}
                        >
                          {text('Reservar mi lugar', 'Reserve my spot')}
                        </button>
                        <a
                          href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(lang === 'es' ? event.whatsapp_msg_es : event.whatsapp_msg_en)}`}
                          target="_blank" rel="noopener noreferrer"
                          className="ev-card__wa"
                          aria-label="WhatsApp"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ── SUBSCRIBE BAND ── */}
        <section className="ev-subscribe">
          <div className="container">
            <div className="ev-subscribe__inner">
              <div>
                <h2 className="display-2" style={{ color: 'var(--hc-ivory)' }}>
                  {text('No te pierdas ningún evento.', 'Don\'t miss any event.')}
                </h2>
                <p style={{ color: 'rgba(253,249,245,0.7)', marginTop: 'var(--space-xs)' }}>
                  {text(
                    'Recibe la agenda mensual directamente en tu WhatsApp.',
                    'Receive the monthly schedule directly in your WhatsApp.'
                  )}
                </p>
              </div>
              <a href={WHATSAPP.events} target="_blank" rel="noopener noreferrer" className="btn btn--brass">
                {text('Suscribirme por WhatsApp', 'Subscribe via WhatsApp')}
              </a>
            </div>
          </div>
        </section>

      </main>

      {selectedEvent && (
        <RSVPModal
          event={selectedEvent}
          lang={lang}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      <style>{`
        .events-page {}

        /* Hero */
        .ev-hero { background:var(--hc-navy); padding:calc(var(--nav-height) + var(--space-xl)) 0 var(--space-xl); }
        .ev-hero__inner { display:grid; grid-template-columns:1fr auto; gap:var(--space-lg); align-items:center; }
        .ev-hero__eyebrow { color:var(--hc-brass); margin-bottom:var(--space-sm); }
        .ev-hero__headline { font-family:var(--font-heading); font-size:clamp(2.4rem,5vw,4rem); font-weight:300; color:var(--hc-ivory); line-height:1.08; margin-bottom:var(--space-sm); }
        .ev-hero__headline em { color:var(--hc-brass); font-style:italic; }
        .ev-hero__body { font-size:1.05rem; color:rgba(253,249,245,0.75); line-height:1.85; max-width:520px; margin-bottom:var(--space-md); }
        .ev-hero__stats { display:flex; gap:var(--space-lg); }
        .ev-hero__stat { display:flex; flex-direction:column; }
        .ev-hero__stat strong { font-family:var(--font-heading); font-size:2rem; font-weight:300; color:var(--hc-brass); line-height:1; }
        .ev-hero__stat span { font-size:0.78rem; color:rgba(253,249,245,0.55); }
        .ev-hero__avatar { width:360px; height:auto; object-fit:contain; filter:drop-shadow(0 20px 40px rgba(0,0,0,0.4)); }

        /* Filter */
        .ev-filter { background:white; border-bottom:1px solid var(--hc-border); position:sticky; top:var(--nav-height); z-index:10; }
        .ev-filter__inner { display:flex; align-items:center; gap:var(--space-md); padding:var(--space-sm) 0; overflow-x:auto; }
        .ev-filter__label { font-size:0.78rem; font-weight:600; color:var(--hc-soft); white-space:nowrap; letter-spacing:0.06em; text-transform:uppercase; }
        .ev-filter__cats { display:flex; gap:var(--space-xs); flex-wrap:nowrap; }
        .ev-filter__cat { padding:8px 16px; border-radius:20px; font-size:0.82rem; font-weight:500; color:var(--hc-soft); border:1.5px solid var(--hc-border); white-space:nowrap; transition:all var(--duration) var(--ease); }
        .ev-filter__cat:hover { border-color:var(--cat-color); color:var(--cat-color); }
        .ev-filter__cat--active { background:var(--cat-color); color:white; border-color:var(--cat-color); }

        /* Events grid */
        .ev-list { background:var(--hc-ivory); }
        .ev-list__headline { margin-top:8px; }
        .ev-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:var(--space-sm); }

        .ev-card { background:white; border:1px solid var(--hc-border); border-radius:var(--radius-lg); overflow:hidden; display:flex; flex-direction:column; border-top:3px solid var(--ev-color); transition:box-shadow var(--duration) var(--ease),transform var(--duration) var(--ease); }
        .ev-card:hover { box-shadow:var(--shadow-lg); transform:translateY(-3px); }

        .ev-card__header { display:flex; align-items:flex-start; gap:var(--space-sm); padding:var(--space-sm) var(--space-sm) 0; }
        .ev-card__date-box { display:flex; flex-direction:column; align-items:center; min-width:52px; padding:8px; background:var(--hc-ivory); border-radius:var(--radius-md); border:1px solid var(--hc-border); }
        .ev-card__month { font-size:0.62rem; font-weight:700; letter-spacing:0.1em; color:var(--ev-color); }
        .ev-card__day { font-family:var(--font-heading); font-size:1.6rem; font-weight:300; color:var(--hc-navy); line-height:1; }
        .ev-card__weekday { font-size:0.62rem; color:var(--hc-soft); text-transform:capitalize; }

        .ev-card__meta { display:flex; flex-direction:column; gap:4px; padding-top:4px; }
        .ev-card__category { font-size:0.68rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; }
        .ev-card__free { font-size:0.68rem; font-weight:600; color:var(--unidos-green); background:var(--unidos-light); padding:2px 8px; border-radius:10px; display:inline-block; width:fit-content; }
        .ev-card__partner { font-size:0.72rem; color:var(--hc-soft); }

        .ev-card__image-wrap { height:160px; overflow:hidden; }
        .ev-card__image { width:100%; height:100%; object-fit:cover; transition:transform 0.5s var(--ease); }
        .ev-card:hover .ev-card__image { transform:scale(1.04); }

        .ev-card__body { padding:var(--space-sm) var(--space-sm) 0; flex:1; }
        .ev-card__title { font-family:var(--font-heading); font-size:1.15rem; font-weight:400; color:var(--hc-navy); margin-bottom:6px; }
        .ev-card__desc { font-size:0.85rem; color:var(--hc-soft); line-height:1.65; margin-bottom:var(--space-sm); }
        .ev-card__details { display:flex; flex-direction:column; gap:5px; }
        .ev-card__detail { display:flex; align-items:center; gap:6px; font-size:0.78rem; color:var(--hc-soft); }

        .ev-card__actions { display:flex; align-items:center; gap:var(--space-xs); padding:var(--space-sm); border-top:1px solid var(--hc-border); margin-top:var(--space-sm); }
        .ev-card__rsvp { flex:1; justify-content:center; padding:10px; font-size:0.82rem; }
        .ev-card__wa { width:40px; height:40px; border-radius:var(--radius-md); background:#25D366; color:white; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:background var(--duration) var(--ease); }
        .ev-card__wa:hover { background:#1da851; }

        /* Subscribe band */
        .ev-subscribe { background:var(--hc-navy); padding:var(--space-lg) 0; }
        .ev-subscribe__inner { display:flex; justify-content:space-between; align-items:center; gap:var(--space-lg); flex-wrap:wrap; }

        @media(max-width:900px) { .ev-grid{grid-template-columns:1fr 1fr;} .ev-hero__inner{grid-template-columns:1fr;} .ev-hero__avatar-wrap{display:none;} }
        @media(max-width:600px) { .ev-grid{grid-template-columns:1fr;} .ev-subscribe__inner{flex-direction:column;text-align:center;} }
      `}</style>
    </>
  );
}
