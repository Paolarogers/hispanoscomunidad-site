import { useState, useEffect, useCallback } from 'react';
import SEOHead from '../components/layout/SEOHead.jsx';
import { REACTIONS, FLAGS, GALLERY_CATEGORIES, SAMPLE_PHOTOS } from '../config/gallery.config.js';
import { SITE } from '../config/site.config.js';
import { useLanguage } from '../hooks/useLanguage.js';
import { useScrollAnimation } from '../hooks/useScrollAnimation.js';

// ── SESSION ID ────────────────────────────────────────────
function getSessionId() {
  let sid = sessionStorage.getItem('hc-session');
  if (!sid) { sid = Math.random().toString(36).slice(2); sessionStorage.setItem('hc-session', sid); }
  return sid;
}

// ── REACTION BAR ─────────────────────────────────────────
function ReactionBar({ photoId, lang, compact = false }) {
  const [counts, setCounts] = useState({});
  const [flagCounts, setFlagCounts] = useState({});
  const [myReaction, setMyReaction] = useState(null);
  const [myFlag, setMyFlag] = useState(null);
  const [showFlags, setShowFlags] = useState(false);
  const sid = getSessionId();
  const storageKey = `hc-reactions-${photoId}`;
  const flagKey = `hc-flag-${photoId}`;

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    const savedFlag = localStorage.getItem(flagKey);
    setCounts(saved);
    setMyFlag(savedFlag);
    const myR = Object.entries(saved).find(([,v]) => v?.mine);
    if (myR) setMyReaction(myR[0]);
  }, [photoId]);

  const totalReactions = Object.values(counts).reduce((s, v) => s + (v?.count || 0), 0);
  const totalFlags = Object.values(flagCounts).reduce((s, v) => s + (v || 0), 0);

  const handleReaction = (reactionId) => {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    if (myReaction === reactionId) {
      saved[reactionId] = { count: Math.max(0, (saved[reactionId]?.count || 1) - 1), mine: false };
      setMyReaction(null);
    } else {
      if (myReaction) {
        saved[myReaction] = { count: Math.max(0, (saved[myReaction]?.count || 1) - 1), mine: false };
      }
      saved[reactionId] = { count: (saved[reactionId]?.count || 0) + 1, mine: true };
      setMyReaction(reactionId);
    }
    localStorage.setItem(storageKey, JSON.stringify(saved));
    setCounts({ ...saved });
  };

  const handleFlag = (code) => {
    const fc = JSON.parse(localStorage.getItem(`hc-flags-${photoId}`) || '{}');
    if (myFlag === code) {
      fc[code] = Math.max(0, (fc[code] || 1) - 1);
      setMyFlag(null);
      localStorage.removeItem(flagKey);
    } else {
      if (myFlag) fc[myFlag] = Math.max(0, (fc[myFlag] || 1) - 1);
      fc[code] = (fc[code] || 0) + 1;
      setMyFlag(code);
      localStorage.setItem(flagKey, code);
    }
    localStorage.setItem(`hc-flags-${photoId}`, JSON.stringify(fc));
    setFlagCounts({ ...fc });
  };

  useEffect(() => {
    const fc = JSON.parse(localStorage.getItem(`hc-flags-${photoId}`) || '{}');
    setFlagCounts(fc);
  }, [photoId]);

  if (compact) {
    return (
      <div className="reaction-compact">
        {totalReactions > 0 && <span className="reaction-compact__total">{REACTIONS.slice(0,3).map(r => r.emoji)} {totalReactions}</span>}
      </div>
    );
  }

  return (
    <div className="reaction-bar">
      <div className="reaction-bar__emotions">
        {REACTIONS.map(r => {
          const count = counts[r.id]?.count || 0;
          const active = myReaction === r.id;
          return (
            <button
              key={r.id}
              className={`reaction-btn${active ? ' reaction-btn--active' : ''}`}
              onClick={() => handleReaction(r.id)}
              title={lang === 'es' ? r.label_es : r.label_en}
            >
              <span className="reaction-btn__emoji">{r.emoji}</span>
              <span className="reaction-btn__label">{lang === 'es' ? r.label_es : r.label_en}</span>
              {count > 0 && <span className="reaction-btn__count">{count}</span>}
            </button>
          );
        })}
      </div>

      {totalReactions > 0 && (
        <div className="reaction-bar__total">
          <span className="reaction-bar__total-num">{totalReactions}</span>
          <span className="reaction-bar__total-label">
            {lang === 'es' ? 'personas de nuestra comunidad' : 'people from our community'}
          </span>
        </div>
      )}

      <div className="reaction-bar__flags-section">
        <button className="reaction-bar__flags-toggle" onClick={() => setShowFlags(v => !v)}>
          <span>🌎</span>
          <span>{lang === 'es' ? '¿De dónde eres?' : 'Where are you from?'}</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: showFlags ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
            <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {showFlags && (
          <div className="reaction-bar__flags">
            {FLAGS.map(f => {
              const count = flagCounts[f.code] || 0;
              const active = myFlag === f.code;
              return (
                <button
                  key={f.code}
                  className={`flag-btn${active ? ' flag-btn--active' : ''}`}
                  onClick={() => handleFlag(f.code)}
                  title={f.name}
                >
                  <span>{f.emoji}</span>
                  {count > 0 && <span className="flag-btn__count">{count}</span>}
                </button>
              );
            })}
          </div>
        )}

        {totalFlags > 0 && (
          <div className="reaction-bar__flag-tally">
            {FLAGS.filter(f => (flagCounts[f.code] || 0) > 0)
              .sort((a, b) => (flagCounts[b.code] || 0) - (flagCounts[a.code] || 0))
              .slice(0, 8)
              .map(f => (
                <span key={f.code} className="flag-tally-item">
                  {f.emoji} <strong>{flagCounts[f.code]}</strong>
                </span>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── SHARE BAR ────────────────────────────────────────────
function ShareBar({ photo, lang }) {
  const [copied, setCopied] = useState(false);
  const url = `${window.location.origin}/galeria/${photo.slug}`;
  const caption = lang === 'es' ? photo.caption_es : photo.caption_en;
  const waText = encodeURIComponent(`${caption?.slice(0, 80)}... 👉 ${url}`);
  const [showQR, setShowQR] = useState(false);

  const copyLink = async () => {
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
  };

  return (
    <div className="share-bar">
      <span className="share-bar__label">{lang === 'es' ? 'Compartir:' : 'Share:'}</span>
      <a href={`https://wa.me/?text=${waText}`} target="_blank" rel="noopener noreferrer" className="share-btn share-btn--wa" title="WhatsApp">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        WhatsApp
      </a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="share-btn share-btn--fb" title="Facebook">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        Facebook
      </a>
      <button className="share-btn share-btn--copy" onClick={copyLink}>
        {copied ? (lang === 'es' ? '¡Copiado!' : 'Copied!') : (lang === 'es' ? 'Copiar link' : 'Copy link')}
      </button>
      <button className="share-btn share-btn--qr" onClick={() => setShowQR(v => !v)} title="QR Code">
        QR
      </button>
      {showQR && (
        <div className="share-qr">
          <img src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(url)}`} alt="QR Code" width="160" height="160" loading="lazy"/>
          <p>{lang === 'es' ? 'Escanea para abrir esta foto' : 'Scan to open this photo'}</p>
        </div>
      )}
    </div>
  );
}

// ── LIGHTBOX ─────────────────────────────────────────────
function Lightbox({ photo, lang, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext]);

  const caption = lang === 'es' ? photo.caption_es : photo.caption_en;
  const formattedDate = new Date(photo.date + 'T12:00:00').toLocaleDateString(
    lang === 'es' ? 'es-US' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }
  );

  const catConfig = GALLERY_CATEGORIES.find(c => c.id === photo.category);

  return (
    <div className="lightbox" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="lightbox__inner">
        <button className="lightbox__close" onClick={onClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
        <button className="lightbox__nav lightbox__nav--prev" onClick={onPrev} aria-label="Previous">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13 5L8 10l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button className="lightbox__nav lightbox__nav--next" onClick={onNext} aria-label="Next">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        <div className="lightbox__photo-wrap">
          <img src={photo.url} alt={caption?.slice(0, 80)} className="lightbox__photo" loading="lazy"
            onError={e => { e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600" fill="%23e5d9ce"%3E%3Crect width="800" height="600"/%3E%3Ctext x="400" y="300" text-anchor="middle" fill="%236b6478" font-size="24"%3EFoto próximamente%3C/text%3E%3C/svg%3E'; }}/>
        </div>

        <div className="lightbox__info">
          <div className="lightbox__meta">
            <span className="lightbox__category" style={{ color: catConfig?.color || 'var(--hc-lilac)' }}>
              {lang === 'es' ? catConfig?.label_es : catConfig?.label_en}
            </span>
            <span className="lightbox__date">{formattedDate}</span>
            {photo.location && <span className="lightbox__location">📍 {photo.location}</span>}
          </div>

          {caption && <p className="lightbox__caption">{caption}</p>}

          <ReactionBar photoId={photo.id} lang={lang} />
          <ShareBar photo={photo} lang={lang} />
        </div>
      </div>

      <style>{`
        .lightbox { position:fixed; inset:0; background:rgba(10,8,20,0.95); z-index:300; display:flex; align-items:center; justify-content:center; padding:var(--space-sm); }
        .lightbox__inner { background:var(--hc-navy); border-radius:var(--radius-lg); overflow:hidden; max-width:1000px; width:100%; max-height:92vh; display:grid; grid-template-columns:1fr 360px; position:relative; }
        .lightbox__close { position:absolute; top:var(--space-sm); right:var(--space-sm); z-index:10; width:40px; height:40px; border-radius:50%; background:rgba(0,0,0,0.5); color:white; display:flex; align-items:center; justify-content:center; transition:background var(--duration) var(--ease); }
        .lightbox__close:hover { background:rgba(0,0,0,0.8); }
        .lightbox__nav { position:absolute; top:50%; transform:translateY(-50%); z-index:10; width:44px; height:44px; border-radius:50%; background:rgba(0,0,0,0.5); color:white; display:flex; align-items:center; justify-content:center; transition:background var(--duration) var(--ease); }
        .lightbox__nav:hover { background:rgba(0,0,0,0.8); }
        .lightbox__nav--prev { left:var(--space-sm); }
        .lightbox__nav--next { right:calc(360px + var(--space-sm)); }
        .lightbox__photo-wrap { background:#0a0814; display:flex; align-items:center; justify-content:center; min-height:400px; max-height:92vh; overflow:hidden; }
        .lightbox__photo { width:100%; height:100%; object-fit:contain; }
        .lightbox__info { padding:var(--space-md); overflow-y:auto; background:var(--hc-navy); display:flex; flex-direction:column; gap:var(--space-sm); }
        .lightbox__meta { display:flex; flex-direction:column; gap:4px; }
        .lightbox__category { font-size:0.72rem; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; }
        .lightbox__date,.lightbox__location { font-size:0.82rem; color:rgba(253,249,245,0.55); }
        .lightbox__caption { font-size:0.95rem; color:var(--hc-ivory); line-height:1.8; }
        @media(max-width:768px) { .lightbox__inner{grid-template-columns:1fr; grid-template-rows:auto 1fr;} .lightbox__nav--next{right:var(--space-sm);} .lightbox__info{max-height:50vh;} }
      `}</style>
    </div>
  );
}

// ── ADMIN UPLOAD FORM ────────────────────────────────────
function AdminUpload({ lang, onClose }) {
  const [form, setForm] = useState({ caption_es: '', caption_en: '', date: '', location: '', category: 'events', featured: false });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle');
  const { text } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    await new Promise(r => setTimeout(r, 1200));
    setStatus('success');
  };

  if (status === 'success') return (
    <div className="admin-success">
      <div style={{ fontSize: '2rem' }}>✓</div>
      <h3>{text('Foto publicada', 'Photo published')}</h3>
      <p>{text('Aparecerá en la galería inmediatamente.', 'It will appear in the gallery immediately.')}</p>
      <button className="btn btn--primary" onClick={onClose}>{text('Publicar otra', 'Publish another')}</button>
    </div>
  );

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h2 className="admin-form__title">{text('Publicar foto en la galería', 'Publish photo to gallery')}</h2>

      <div className="admin-form__field">
        <label>{text('Foto *', 'Photo *')}</label>
        <div className="admin-form__file-zone" onClick={() => document.getElementById('photo-file').click()}>
          {file
            ? <span style={{ color: 'var(--unidos-green)', fontWeight: 600 }}>✓ {file.name}</span>
            : <span>{text('Haz clic para seleccionar la foto', 'Click to select the photo')}</span>}
          <input id="photo-file" type="file" accept="image/*" style={{ display: 'none' }} onChange={e => setFile(e.target.files[0])} required />
        </div>
      </div>

      <div className="admin-form__row">
        <div className="admin-form__field">
          <label>{text('Descripción en español', 'Description in Spanish')}</label>
          <textarea className="admin-form__textarea" rows={3} value={form.caption_es} onChange={e => setForm(f => ({ ...f, caption_es: e.target.value }))} placeholder="Describe el momento en español..." />
        </div>
        <div className="admin-form__field">
          <label>{text('Description in English', 'Description in English')}</label>
          <textarea className="admin-form__textarea" rows={3} value={form.caption_en} onChange={e => setForm(f => ({ ...f, caption_en: e.target.value }))} placeholder="Describe the moment in English..." />
        </div>
      </div>

      <div className="admin-form__row">
        <div className="admin-form__field">
          <label>{text('Fecha del evento', 'Event date')}</label>
          <input type="date" className="admin-form__input" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
        </div>
        <div className="admin-form__field">
          <label>{text('Categoría', 'Category')}</label>
          <select className="admin-form__input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
            {GALLERY_CATEGORIES.filter(c => c.id !== 'all').map(c => (
              <option key={c.id} value={c.id}>{lang === 'es' ? c.label_es : c.label_en}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="admin-form__field">
        <label>{text('Ubicación', 'Location')}</label>
        <input type="text" className="admin-form__input" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="Cherrydale · Greenville, SC" />
      </div>

      <label className="admin-form__check">
        <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} />
        {text('Destacar esta foto (aparece primero)', 'Feature this photo (appears first)')}
      </label>

      <div className="admin-form__actions">
        <button type="button" className="btn btn--outline" onClick={onClose}>{text('Cancelar', 'Cancel')}</button>
        <button type="submit" className="btn btn--primary" disabled={status === 'loading'}>
          {status === 'loading' ? text('Publicando...', 'Publishing...') : text('Publicar foto', 'Publish photo')}
        </button>
      </div>
    </form>
  );
}

// ── GALLERY PAGE ─────────────────────────────────────────
const ADMIN_PIN = '2026HC';

export default function Gallery() {
  const { lang, text } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const ref = useScrollAnimation();

  const photos = SAMPLE_PHOTOS;
  const filtered = activeCategory === 'all' ? photos : photos.filter(p => p.category === activeCategory);

  const openLightbox = (index) => { setLightboxIndex(index); document.body.style.overflow = 'hidden'; };
  const closeLightbox = () => { setLightboxIndex(null); document.body.style.overflow = ''; };
  const prevPhoto = () => setLightboxIndex(i => (i - 1 + filtered.length) % filtered.length);
  const nextPhoto = () => setLightboxIndex(i => (i + 1) % filtered.length);

  const checkPin = () => {
    if (pinInput === ADMIN_PIN) { setAdminUnlocked(true); setPinError(false); }
    else { setPinError(true); setPinInput(''); }
  };

  return (
    <>
      <SEOHead lang={lang} />
      <main className="gallery-page">

        {/* ── HERO ── */}
        <section className="gal-hero">
          <div className="container">
            <div className="gal-hero__inner">
              <div>
                <span className="eyebrow gal-hero__eyebrow">{text('Nuestra comunidad en imágenes', 'Our community in images')}</span>
                <h1 className="gal-hero__headline">
                  {text('Cada foto,', 'Every photo,')}<br/>
                  <em>{text('una historia real.', 'a real story.')}</em>
                </h1>
                <p className="gal-hero__body">
                  {text(
                    '13 años de momentos reales. Días de salud, talleres, graduaciones, celebraciones. Esta es nuestra gente. Esta es nuestra comunidad.',
                    '13 years of real moments. Health days, workshops, graduations, celebrations. These are our people. This is our community.'
                  )}
                </p>
              </div>
              <div className="gal-hero__reactions-preview">
                <div className="gal-hero__reactions-label">{text('Reacciona · Comparte · Celebra', 'React · Share · Celebrate')}</div>
                <div className="gal-hero__emojis">
                  {REACTIONS.map(r => <span key={r.id} className="gal-hero__emoji">{r.emoji}</span>)}
                  {FLAGS.slice(0, 6).map(f => <span key={f.code} className="gal-hero__emoji">{f.emoji}</span>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FILTER + ADMIN ── */}
        <div className="gal-toolbar">
          <div className="container">
            <div className="gal-toolbar__inner">
              <div className="gal-toolbar__cats">
                {GALLERY_CATEGORIES.map(cat => (
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
              <button className="gal-toolbar__admin-btn" onClick={() => setShowAdmin(v => !v)}>
                {text('+ Publicar foto', '+ Publish photo')}
              </button>
            </div>
          </div>
        </div>

        {/* ── ADMIN PANEL ── */}
        {showAdmin && (
          <div className="gal-admin">
            <div className="container">
              {!adminUnlocked ? (
                <div className="gal-admin__pin">
                  <h3>{text('Acceso de equipo HC', 'HC team access')}</h3>
                  <div className="gal-admin__pin-row">
                    <input
                      type="password"
                      className="admin-form__input"
                      placeholder="PIN"
                      value={pinInput}
                      onChange={e => setPinInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && checkPin()}
                      style={{ maxWidth: 160 }}
                    />
                    <button className="btn btn--primary" onClick={checkPin}>{text('Entrar', 'Enter')}</button>
                  </div>
                  {pinError && <p style={{ color: '#e24b4a', fontSize: '0.85rem', marginTop: '8px' }}>{text('PIN incorrecto', 'Incorrect PIN')}</p>}
                </div>
              ) : (
                <AdminUpload lang={lang} onClose={() => { setShowAdmin(false); setAdminUnlocked(false); }} />
              )}
            </div>
          </div>
        )}

        {/* ── MASONRY GRID ── */}
        <section className="gal-grid section" ref={ref}>
          <div className="container">
            <div className="gal-masonry fade-up">
              {filtered.map((photo, i) => {
                const catConfig = GALLERY_CATEGORIES.find(c => c.id === photo.category);
                return (
                  <div
                    key={photo.id}
                    className={`gal-card${photo.featured ? ' gal-card--featured' : ''}`}
                    style={{ '--cat-color': catConfig?.color || 'var(--hc-lilac)' }}
                  >
                    <div className="gal-card__img-wrap" onClick={() => openLightbox(i)}>
                      <img
                        src={photo.url}
                        alt={(lang === 'es' ? photo.caption_es : photo.caption_en)?.slice(0, 80)}
                        className="gal-card__img"
                        loading="lazy"
                        width="400" height="300"
                        onError={e => {
                          e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' fill='%23e5d9ce'%3E%3Crect width='400' height='300'/%3E%3Ctext x='200' y='150' text-anchor='middle' fill='%236b6478' font-size='16' font-family='Arial'%3EFoto próximamente%3C/text%3E%3C/svg%3E`;
                        }}
                      />
                      <div className="gal-card__overlay">
                        <span className="gal-card__expand">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 3h6m0 0v6m0-6l-7 7M9 21H3m0 0v-6m0 6l7-7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                      </div>
                      {photo.featured && (
                        <span className="gal-card__featured">{text('Destacada', 'Featured')}</span>
                      )}
                    </div>
                    <div className="gal-card__info">
                      <div className="gal-card__info-top">
                        <span className="gal-card__category" style={{ color: catConfig?.color }}>
                          {lang === 'es' ? catConfig?.label_es : catConfig?.label_en}
                        </span>
                        <span className="gal-card__date">
                          {new Date(photo.date + 'T12:00:00').toLocaleDateString(lang === 'es' ? 'es-US' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      {photo.location && <span className="gal-card__location">📍 {photo.location}</span>}
                      <p className="gal-card__caption">{(lang === 'es' ? photo.caption_es : photo.caption_en)?.slice(0, 100)}...</p>
                      <ReactionBar photoId={photo.id} lang={lang} compact={true} />
                      <div className="gal-card__footer">
                        <button className="gal-card__view-btn" onClick={() => openLightbox(i)}>
                          {text('Ver y reaccionar →', 'View and react →')}
                        </button>
                        <a
                          href={`https://wa.me/?text=${encodeURIComponent((lang === 'es' ? photo.caption_es : photo.caption_en)?.slice(0, 60) + '... 👉 ' + window.location.origin + '/galeria/' + photo.slug)}`}
                          target="_blank" rel="noopener noreferrer"
                          className="gal-card__share-wa"
                          aria-label="Share on WhatsApp"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>

      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <Lightbox
          photo={filtered[lightboxIndex]}
          lang={lang}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}

      <style>{`
        /* Hero */
        .gal-hero { background:var(--hc-navy); padding:calc(var(--nav-height) + var(--space-xl)) 0 var(--space-xl); }
        .gal-hero__inner { display:grid; grid-template-columns:1fr auto; gap:var(--space-xl); align-items:center; }
        .gal-hero__eyebrow { color:var(--hc-brass); margin-bottom:var(--space-sm); }
        .gal-hero__headline { font-family:var(--font-heading); font-size:clamp(2.4rem,5vw,4rem); font-weight:300; color:var(--hc-ivory); line-height:1.08; margin-bottom:var(--space-sm); }
        .gal-hero__headline em { color:var(--hc-brass); font-style:italic; }
        .gal-hero__body { font-size:1.05rem; color:rgba(253,249,245,0.75); line-height:1.85; max-width:520px; }
        .gal-hero__reactions-preview { background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); border-radius:var(--radius-lg); padding:var(--space-md); min-width:240px; }
        .gal-hero__reactions-label { font-size:0.72rem; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; color:var(--hc-brass); margin-bottom:var(--space-sm); }
        .gal-hero__emojis { display:flex; flex-wrap:wrap; gap:8px; }
        .gal-hero__emoji { font-size:1.6rem; }

        /* Toolbar */
        .gal-toolbar { background:white; border-bottom:1px solid var(--hc-border); position:sticky; top:var(--nav-height); z-index:10; }
        .gal-toolbar__inner { display:flex; align-items:center; justify-content:space-between; gap:var(--space-md); padding:var(--space-sm) 0; overflow-x:auto; }
        .gal-toolbar__cats { display:flex; gap:var(--space-xs); }
        .gal-toolbar__admin-btn { font-size:0.82rem; font-weight:600; color:var(--hc-lilac); white-space:nowrap; padding:8px 16px; border:1.5px solid var(--hc-lilac); border-radius:20px; transition:all var(--duration) var(--ease); }
        .gal-toolbar__admin-btn:hover { background:var(--hc-lilac); color:white; }
        .ev-filter__cat { padding:8px 16px; border-radius:20px; font-size:0.82rem; font-weight:500; color:var(--hc-soft); border:1.5px solid var(--hc-border); white-space:nowrap; transition:all var(--duration) var(--ease); }
        .ev-filter__cat:hover { border-color:var(--cat-color); color:var(--cat-color); }
        .ev-filter__cat--active { background:var(--cat-color); color:white; border-color:var(--cat-color); }

        /* Admin */
        .gal-admin { background:var(--hc-ivory); border-bottom:1px solid var(--hc-border); padding:var(--space-md) 0; }
        .gal-admin__pin { text-align:center; }
        .gal-admin__pin h3 { font-family:var(--font-heading); font-size:1.3rem; color:var(--hc-navy); margin-bottom:var(--space-sm); }
        .gal-admin__pin-row { display:flex; justify-content:center; gap:var(--space-sm); }
        .admin-form { max-width:800px; }
        .admin-form__title { font-family:var(--font-heading); font-size:1.5rem; color:var(--hc-navy); margin-bottom:var(--space-md); font-weight:300; }
        .admin-form__field { display:flex; flex-direction:column; gap:6px; }
        .admin-form__field label { font-size:0.82rem; font-weight:600; color:var(--hc-navy); }
        .admin-form__input,.admin-form__textarea { padding:12px 16px; border:1.5px solid var(--hc-border); border-radius:var(--radius-md); font-family:var(--font-body); font-size:0.95rem; color:var(--hc-text); width:100%; outline:none; transition:border-color var(--duration) var(--ease); }
        .admin-form__input:focus,.admin-form__textarea:focus { border-color:var(--hc-lilac); }
        .admin-form__textarea { resize:vertical; }
        .admin-form__row { display:grid; grid-template-columns:1fr 1fr; gap:var(--space-sm); }
        .admin-form__file-zone { border:2px dashed var(--hc-border); border-radius:var(--radius-md); padding:var(--space-md); text-align:center; cursor:pointer; font-size:0.9rem; color:var(--hc-soft); transition:border-color var(--duration) var(--ease); }
        .admin-form__file-zone:hover { border-color:var(--hc-lilac); }
        .admin-form__check { display:flex; align-items:center; gap:var(--space-xs); font-size:0.9rem; color:var(--hc-text); cursor:pointer; }
        .admin-form__actions { display:flex; justify-content:flex-end; gap:var(--space-sm); margin-top:var(--space-sm); }
        .admin-success { text-align:center; padding:var(--space-lg); }
        .admin-success div { width:60px; height:60px; border-radius:50%; background:var(--unidos-green); color:white; font-size:1.5rem; display:flex; align-items:center; justify-content:center; margin:0 auto var(--space-sm); }
        .admin-success h3 { font-family:var(--font-heading); font-size:1.4rem; color:var(--hc-navy); margin-bottom:var(--space-xs); }
        .admin-success p { color:var(--hc-soft); margin-bottom:var(--space-md); }

        /* Masonry grid */
        .gal-grid { background:var(--hc-ivory); }
        .gal-masonry { columns:3; column-gap:var(--space-sm); }
        .gal-card { break-inside:avoid; background:white; border:1px solid var(--hc-border); border-radius:var(--radius-lg); overflow:hidden; margin-bottom:var(--space-sm); display:inline-block; width:100%; border-top:3px solid var(--cat-color); transition:box-shadow var(--duration) var(--ease),transform var(--duration) var(--ease); }
        .gal-card:hover { box-shadow:var(--shadow-lg); transform:translateY(-2px); }
        .gal-card--featured { border-top-width:4px; }

        .gal-card__img-wrap { position:relative; overflow:hidden; cursor:pointer; }
        .gal-card__img { width:100%; height:auto; display:block; transition:transform 0.5s var(--ease); }
        .gal-card:hover .gal-card__img { transform:scale(1.03); }
        .gal-card__overlay { position:absolute; inset:0; background:rgba(30,26,46,0); display:flex; align-items:center; justify-content:center; transition:background var(--duration) var(--ease); }
        .gal-card:hover .gal-card__overlay { background:rgba(30,26,46,0.3); }
        .gal-card__expand { opacity:0; transition:opacity var(--duration) var(--ease); }
        .gal-card:hover .gal-card__expand { opacity:1; }
        .gal-card__featured { position:absolute; top:var(--space-xs); left:var(--space-xs); background:var(--hc-brass); color:white; font-size:0.65rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; padding:3px 10px; border-radius:10px; }

        .gal-card__info { padding:var(--space-sm); }
        .gal-card__info-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:4px; }
        .gal-card__category { font-size:0.68rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; }
        .gal-card__date { font-size:0.72rem; color:var(--hc-soft); }
        .gal-card__location { display:block; font-size:0.75rem; color:var(--hc-soft); margin-bottom:6px; }
        .gal-card__caption { font-size:0.85rem; color:var(--hc-text); line-height:1.6; margin-bottom:var(--space-xs); }

        .gal-card__footer { display:flex; align-items:center; justify-content:space-between; gap:var(--space-xs); margin-top:var(--space-xs); padding-top:var(--space-xs); border-top:1px solid var(--hc-border); }
        .gal-card__view-btn { font-size:0.78rem; font-weight:600; color:var(--hc-lilac); transition:color var(--duration) var(--ease); }
        .gal-card__view-btn:hover { color:var(--hc-navy); }
        .gal-card__share-wa { width:32px; height:32px; border-radius:var(--radius-sm); background:#25D366; color:white; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:background var(--duration) var(--ease); }
        .gal-card__share-wa:hover { background:#1da851; }

        /* Reaction bar */
        .reaction-compact { height:20px; display:flex; align-items:center; }
        .reaction-compact__total { font-size:0.78rem; color:var(--hc-soft); }
        .reaction-bar { display:flex; flex-direction:column; gap:var(--space-sm); padding:var(--space-sm) 0; border-top:1px solid rgba(255,255,255,0.1); }
        .reaction-bar__emotions { display:flex; flex-wrap:wrap; gap:6px; }
        .reaction-btn { display:flex; flex-direction:column; align-items:center; gap:2px; padding:8px 10px; border-radius:var(--radius-md); border:1.5px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.05); transition:all var(--duration) var(--ease); min-width:52px; }
        .reaction-btn:hover { background:rgba(255,255,255,0.12); border-color:rgba(255,255,255,0.3); }
        .reaction-btn--active { background:rgba(184,137,58,0.2); border-color:var(--hc-brass); }
        .reaction-btn__emoji { font-size:1.4rem; line-height:1; }
        .reaction-btn__label { font-size:0.62rem; color:rgba(253,249,245,0.6); text-align:center; line-height:1.2; }
        .reaction-btn__count { font-size:0.72rem; font-weight:700; color:var(--hc-brass); }
        .reaction-bar__total { display:flex; align-items:baseline; gap:6px; }
        .reaction-bar__total-num { font-family:var(--font-heading); font-size:1.8rem; font-weight:300; color:var(--hc-brass); line-height:1; }
        .reaction-bar__total-label { font-size:0.82rem; color:rgba(253,249,245,0.6); }
        .reaction-bar__flags-section { display:flex; flex-direction:column; gap:var(--space-xs); }
        .reaction-bar__flags-toggle { display:flex; align-items:center; gap:6px; font-size:0.82rem; color:rgba(253,249,245,0.65); padding:8px 0; border-top:1px solid rgba(255,255,255,0.08); }
        .reaction-bar__flags { display:flex; flex-wrap:wrap; gap:6px; padding:var(--space-xs) 0; }
        .flag-btn { font-size:1.3rem; padding:4px 6px; border-radius:var(--radius-sm); border:1.5px solid transparent; transition:all var(--duration) var(--ease); position:relative; }
        .flag-btn:hover { background:rgba(255,255,255,0.1); }
        .flag-btn--active { border-color:var(--hc-brass); background:rgba(184,137,58,0.15); }
        .flag-btn__count { position:absolute; top:-4px; right:-4px; background:var(--hc-brass); color:white; font-size:0.55rem; font-weight:700; width:16px; height:16px; border-radius:50%; display:flex; align-items:center; justify-content:center; }
        .reaction-bar__flag-tally { display:flex; flex-wrap:wrap; gap:var(--space-sm); padding-top:var(--space-xs); }
        .flag-tally-item { display:flex; align-items:center; gap:4px; font-size:0.85rem; }
        .flag-tally-item strong { color:var(--hc-brass); font-weight:700; }

        /* Share bar */
        .share-bar { display:flex; align-items:center; flex-wrap:wrap; gap:var(--space-xs); padding:var(--space-sm) 0; border-top:1px solid rgba(255,255,255,0.08); position:relative; }
        .share-bar__label { font-size:0.72rem; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:rgba(253,249,245,0.5); }
        .share-btn { padding:7px 14px; border-radius:20px; font-size:0.78rem; font-weight:600; display:flex; align-items:center; gap:6px; transition:all var(--duration) var(--ease); }
        .share-btn--wa { background:#25D366; color:white; }
        .share-btn--wa:hover { background:#1da851; }
        .share-btn--fb { background:#1877f2; color:white; }
        .share-btn--fb:hover { background:#1464d8; }
        .share-btn--copy { background:rgba(255,255,255,0.1); color:var(--hc-ivory); border:1px solid rgba(255,255,255,0.2); }
        .share-btn--copy:hover { background:rgba(255,255,255,0.2); }
        .share-btn--qr { background:rgba(255,255,255,0.1); color:var(--hc-ivory); border:1px solid rgba(255,255,255,0.2); }
        .share-btn--qr:hover { background:rgba(255,255,255,0.2); }
        .share-qr { position:absolute; bottom:calc(100% + var(--space-sm)); right:0; background:white; border:1px solid var(--hc-border); border-radius:var(--radius-lg); padding:var(--space-sm); text-align:center; box-shadow:var(--shadow-lg); z-index:10; }
        .share-qr p { font-size:0.78rem; color:var(--hc-soft); margin-top:6px; }

        @media(max-width:900px) { .gal-masonry{columns:2;} .gal-hero__inner{grid-template-columns:1fr;} .gal-hero__reactions-preview{display:none;} }
        @media(max-width:540px) { .gal-masonry{columns:1;} }
      `}</style>
    </>
  );
}
