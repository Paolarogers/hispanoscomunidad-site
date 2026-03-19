import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SEOHead from '../components/layout/SEOHead.jsx';
import { BLOG_POSTS, BLOG_CATEGORIES } from '../config/blog.config.js';
import { SITE, WHATSAPP } from '../config/site.config.js';
import { useLanguage } from '../hooks/useLanguage.js';
import { useScrollAnimation } from '../hooks/useScrollAnimation.js';

// ── SUBSCRIBE FORM ───────────────────────────────────────
function SubscribeForm({ lang }) {
  const { text } = useLanguage();
  const [channel, setChannel] = useState('whatsapp');
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    await new Promise(r => setTimeout(r, 800));
    setStatus('success');
  };

  if (status === 'success') return (
    <div className="subscribe-success">
      <span>✓</span>
      <p>{text('¡Suscrito! Recibirás los próximos artículos directamente.', 'Subscribed! You will receive the next articles directly.')}</p>
    </div>
  );

  return (
    <form className="subscribe-form" onSubmit={handleSubmit}>
      <div className="subscribe-form__channels">
        {[
          { id: 'whatsapp', label: 'WhatsApp' },
          { id: 'sms',      label: 'SMS' },
          { id: 'email',    label: 'Email' },
        ].map(ch => (
          <button
            key={ch.id}
            type="button"
            className={`subscribe-form__ch${channel === ch.id ? ' active' : ''}`}
            onClick={() => setChannel(ch.id)}
          >
            {ch.label}
          </button>
        ))}
      </div>
      <div className="subscribe-form__row">
        <input
          type={channel === 'email' ? 'email' : 'tel'}
          required
          className="subscribe-form__input"
          placeholder={channel === 'email' ? 'tu@correo.com' : '(864) 000-0000'}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button type="submit" className="btn btn--brass subscribe-form__btn" disabled={status === 'loading'}>
          {status === 'loading' ? '...' : text('Suscribirme', 'Subscribe')}
        </button>
      </div>
    </form>
  );
}

// ── POST CARD ────────────────────────────────────────────
function PostCard({ post, lang, featured = false }) {
  const cat = BLOG_CATEGORIES.find(c => c.id === post.category);
  const title = lang === 'es' ? post.title_es : post.title_en;
  const excerpt = lang === 'es' ? post.excerpt_es : post.excerpt_en;
  const formattedDate = new Date(post.date + 'T12:00:00').toLocaleDateString(
    lang === 'es' ? 'es-US' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <Link to={`/blog/${post.slug}`} className={`post-card${featured ? ' post-card--featured' : ''}`} style={{ '--cat-color': cat?.color || 'var(--hc-lilac)' }}>
      <div className="post-card__img-wrap">
        <img src={post.image} alt={title} className="post-card__img" loading="lazy" width="600" height="340"
          onError={e => { e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='340' fill='%23e5d9ce'%3E%3Crect width='600' height='340'/%3E%3C/svg%3E`; }}/>
        <span className="post-card__category" style={{ background: cat?.color }}>{lang === 'es' ? cat?.label_es : cat?.label_en}</span>
      </div>
      <div className="post-card__body">
        <div className="post-card__meta">
          <span className="post-card__author">{post.author}</span>
          <span className="post-card__sep">·</span>
          <span className="post-card__date">{formattedDate}</span>
          <span className="post-card__sep">·</span>
          <span className="post-card__read">{post.readTime} min</span>
        </div>
        <h2 className="post-card__title">{title}</h2>
        <p className="post-card__excerpt">{excerpt}</p>
        <span className="post-card__cta">{lang === 'es' ? 'Leer artículo →' : 'Read article →'}</span>
      </div>
    </Link>
  );
}

// ── BLOG INDEX ───────────────────────────────────────────
function BlogIndex() {
  const { lang, text } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const ref = useScrollAnimation();

  const filtered = activeCategory === 'all'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.category === activeCategory);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      <SEOHead lang={lang} />
      <main className="blog-page">

        {/* Hero */}
        <section className="blog-hero">
          <div className="container">
            <span className="eyebrow blog-hero__eyebrow">
              {text('Recursos · Noticias · Guías', 'Resources · News · Guides')}
            </span>
            <h1 className="blog-hero__headline">
              {text('Contenido hecho para ti.', 'Content made for you.')}
            </h1>
            <p className="blog-hero__body">
              {text(
                'Finanzas, seguros, negocios, y comunidad — en español y en inglés. Todo lo que necesitas saber para tomar mejores decisiones.',
                'Finance, insurance, business, and community — in Spanish and English. Everything you need to know to make better decisions.'
              )}
            </p>
            <div className="blog-hero__subscribe">
              <p className="blog-hero__subscribe-label">
                {text('Recibe cada nuevo artículo directamente:', 'Receive each new article directly:')}
              </p>
              <SubscribeForm lang={lang} />
            </div>
          </div>
        </section>

        {/* Filter */}
        <div className="ev-filter">
          <div className="container">
            <div className="ev-filter__inner">
              <span className="ev-filter__label">{text('Categoría:', 'Category:')}</span>
              <div className="ev-filter__cats">
                {BLOG_CATEGORIES.map(cat => (
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

        {/* Posts */}
        <section className="blog-list section" ref={ref}>
          <div className="container">
            {featured && (
              <div className="blog-featured fade-up">
                <PostCard post={featured} lang={lang} featured={true} />
              </div>
            )}
            {rest.length > 0 && (
              <div className="blog-grid fade-up">
                {rest.map(post => <PostCard key={post.id} post={post} lang={lang} />)}
              </div>
            )}
            {filtered.length === 0 && (
              <p style={{ color: 'var(--hc-soft)', textAlign: 'center', padding: 'var(--space-xl) 0' }}>
                {text('No hay artículos en esta categoría aún.', 'No articles in this category yet.')}
              </p>
            )}
          </div>
        </section>

      </main>

      <style>{`
        .blog-page {}
        .blog-hero { background:var(--hc-navy); padding:calc(var(--nav-height) + var(--space-xl)) 0 var(--space-xl); }
        .blog-hero__eyebrow { color:var(--hc-brass); margin-bottom:var(--space-sm); }
        .blog-hero__headline { font-family:var(--font-heading); font-size:clamp(2.4rem,5vw,4rem); font-weight:300; color:var(--hc-ivory); line-height:1.08; margin-bottom:var(--space-sm); }
        .blog-hero__body { font-size:1.05rem; color:rgba(253,249,245,0.75); line-height:1.85; max-width:580px; margin-bottom:var(--space-lg); }
        .blog-hero__subscribe { background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); border-radius:var(--radius-lg); padding:var(--space-md); max-width:520px; }
        .blog-hero__subscribe-label { font-size:0.85rem; color:rgba(253,249,245,0.65); margin-bottom:var(--space-sm); }

        .subscribe-form__channels { display:flex; gap:var(--space-xs); margin-bottom:var(--space-sm); }
        .subscribe-form__ch { padding:6px 16px; border-radius:20px; font-size:0.82rem; font-weight:500; color:rgba(253,249,245,0.6); border:1px solid rgba(255,255,255,0.2); transition:all var(--duration) var(--ease); }
        .subscribe-form__ch.active { background:var(--hc-brass); color:white; border-color:var(--hc-brass); }
        .subscribe-form__row { display:flex; gap:var(--space-xs); }
        .subscribe-form__input { flex:1; padding:12px 16px; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); border-radius:var(--radius-md); color:white; font-family:var(--font-body); font-size:0.9rem; outline:none; }
        .subscribe-form__input::placeholder { color:rgba(255,255,255,0.4); }
        .subscribe-form__input:focus { border-color:var(--hc-brass); }
        .subscribe-form__btn { white-space:nowrap; }
        .subscribe-success { display:flex; align-items:center; gap:var(--space-sm); }
        .subscribe-success span { width:32px; height:32px; border-radius:50%; background:var(--unidos-green); color:white; display:flex; align-items:center; justify-content:center; font-weight:700; flex-shrink:0; }
        .subscribe-success p { font-size:0.9rem; color:rgba(253,249,245,0.8); }

        .blog-list { background:var(--hc-ivory); }
        .blog-featured { margin-bottom:var(--space-lg); }
        .blog-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:var(--space-sm); }

        .post-card { display:block; background:white; border:1px solid var(--hc-border); border-radius:var(--radius-lg); overflow:hidden; text-decoration:none; color:inherit; border-top:3px solid var(--cat-color); transition:box-shadow var(--duration) var(--ease),transform var(--duration) var(--ease); }
        .post-card:hover { box-shadow:var(--shadow-lg); transform:translateY(-3px); }
        .post-card--featured { display:grid; grid-template-columns:1.4fr 1fr; }
        .post-card__img-wrap { position:relative; overflow:hidden; }
        .post-card__img { width:100%; height:240px; object-fit:cover; transition:transform 0.5s var(--ease); }
        .post-card--featured .post-card__img { height:100%; min-height:320px; }
        .post-card:hover .post-card__img { transform:scale(1.03); }
        .post-card__category { position:absolute; top:var(--space-sm); left:var(--space-sm); color:white; font-size:0.65rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; padding:4px 10px; border-radius:10px; }
        .post-card__body { padding:var(--space-md); display:flex; flex-direction:column; gap:var(--space-xs); }
        .post-card__meta { display:flex; align-items:center; gap:6px; font-size:0.75rem; color:var(--hc-soft); flex-wrap:wrap; }
        .post-card__sep { color:var(--hc-border); }
        .post-card__title { font-family:var(--font-heading); font-size:1.25rem; font-weight:400; color:var(--hc-navy); line-height:1.3; }
        .post-card--featured .post-card__title { font-size:1.6rem; }
        .post-card__excerpt { font-size:0.875rem; color:var(--hc-soft); line-height:1.7; flex:1; }
        .post-card__cta { font-size:0.82rem; font-weight:600; color:var(--cat-color); margin-top:auto; }

        .ev-filter { background:white; border-bottom:1px solid var(--hc-border); position:sticky; top:var(--nav-height); z-index:10; }
        .ev-filter__inner { display:flex; align-items:center; gap:var(--space-md); padding:var(--space-sm) 0; overflow-x:auto; }
        .ev-filter__label { font-size:0.78rem; font-weight:600; color:var(--hc-soft); white-space:nowrap; letter-spacing:0.06em; text-transform:uppercase; }
        .ev-filter__cats { display:flex; gap:var(--space-xs); flex-wrap:nowrap; }
        .ev-filter__cat { padding:8px 16px; border-radius:20px; font-size:0.82rem; font-weight:500; color:var(--hc-soft); border:1.5px solid var(--hc-border); white-space:nowrap; transition:all var(--duration) var(--ease); }
        .ev-filter__cat:hover { border-color:var(--cat-color); color:var(--cat-color); }
        .ev-filter__cat--active { background:var(--cat-color); color:white; border-color:var(--cat-color); }

        @media(max-width:900px) { .blog-grid{grid-template-columns:1fr 1fr;} .post-card--featured{grid-template-columns:1fr;} }
        @media(max-width:600px) { .blog-grid{grid-template-columns:1fr;} }
      `}</style>
    </>
  );
}

// ── INDIVIDUAL POST ──────────────────────────────────────
function BlogPost() {
  const { slug } = useParams();
  const { lang, text } = useLanguage();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return (
      <main style={{ padding: '160px 24px 80px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--hc-navy)' }}>
          {text('Artículo no encontrado', 'Article not found')}
        </h1>
        <Link to="/blog" className="btn btn--primary" style={{ marginTop: '24px', display: 'inline-flex' }}>
          {text('Volver al blog', 'Back to blog')}
        </Link>
      </main>
    );
  }

  const cat = BLOG_CATEGORIES.find(c => c.id === post.category);
  const title = lang === 'es' ? post.title_es : post.title_en;
  const body = lang === 'es' ? post.body_es : post.body_en;
  const formattedDate = new Date(post.date + 'T12:00:00').toLocaleDateString(
    lang === 'es' ? 'es-US' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }
  );
  const related = BLOG_POSTS.filter(p => p.id !== post.id && p.category === post.category).slice(0, 3);
  const pageUrl = `${SITE.url}/blog/${post.slug}`;
  const waShareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' 👉 ' + pageUrl)}`;

  const renderBody = (text) => {
    return text.split('\n\n').map((block, i) => {
      if (block.startsWith('**') && block.endsWith('**')) {
        return <h3 key={i} className="post-h3">{block.slice(2, -2)}</h3>;
      }
      if (block.startsWith('- ')) {
        const items = block.split('\n').filter(l => l.startsWith('- '));
        return <ul key={i} className="post-list">{items.map((item, j) => <li key={j}>{item.slice(2)}</li>)}</ul>;
      }
      const formatted = block.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return <p key={i} className="post-p" dangerouslySetInnerHTML={{ __html: formatted }} />;
    });
  };

  return (
    <>
      <SEOHead
        lang={lang}
        customTitle={`${title} | Hispanos Comunidad`}
        customDescription={lang === 'es' ? post.excerpt_es : post.excerpt_en}
        customImage={post.image}
      />
      <main className="post-page">

        {/* Header */}
        <section className="post-header">
          <div className="container container--narrow">
            <button className="post-back" onClick={() => navigate('/blog')}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {text('Volver al blog', 'Back to blog')}
            </button>
            <div className="post-header__meta">
              <span className="post-header__cat" style={{ color: cat?.color }}>{lang === 'es' ? cat?.label_es : cat?.label_en}</span>
              <span className="post-header__sep">·</span>
              <span className="post-header__date">{formattedDate}</span>
              <span className="post-header__sep">·</span>
              <span className="post-header__read">{post.readTime} {text('min de lectura', 'min read')}</span>
            </div>
            <h1 className="post-header__title">{title}</h1>
            <div className="post-header__author">
              <img src="/images/team/avatars/paola-green-skirt.png" alt={post.author}
                width="40" height="46" className="post-header__avatar"
                onError={e => { e.target.style.display = 'none'; }}/>
              <div>
                <strong className="post-header__author-name">{post.author}</strong>
                <span className="post-header__author-role">{text('Fundadora · Hispanos Comunidad', 'Founder · Hispanos Comunidad')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Hero image */}
        <div className="post-hero-img">
          <img src={post.image} alt={title} width="1200" height="600" loading="eager"
            style={{ width: '100%', maxHeight: '480px', objectFit: 'cover', display: 'block' }}
            onError={e => { e.target.style.display = 'none'; }}/>
        </div>

        {/* Body */}
        <section className="post-body-section">
          <div className="container container--narrow">
            <div className="post-body">
              {renderBody(body)}
            </div>

            {/* Share */}
            <div className="post-share">
              <span className="post-share__label">{text('Comparte este artículo:', 'Share this article:')}</span>
              <a href={waShareUrl} target="_blank" rel="noopener noreferrer" className="share-btn share-btn--wa">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`} target="_blank" rel="noopener noreferrer" className="share-btn share-btn--fb">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
              </a>
            </div>

            {/* Subscribe CTA */}
            <div className="post-subscribe-cta">
              <h3>{text('¿Te gustó este artículo?', 'Did you like this article?')}</h3>
              <p>{text('Recibe el próximo directamente en tu WhatsApp o correo.', 'Receive the next one directly in your WhatsApp or email.')}</p>
              <SubscribeForm lang={lang} />
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="post-related section--sm">
            <div className="container">
              <span className="eyebrow">{text('También te puede interesar', 'You may also like')}</span>
              <div className="blog-grid" style={{ marginTop: 'var(--space-md)' }}>
                {related.map(p => <PostCard key={p.id} post={p} lang={lang} />)}
              </div>
            </div>
          </section>
        )}

      </main>

      <style>{`
        .post-page {}
        .post-header { background:var(--hc-navy); padding:calc(var(--nav-height) + var(--space-lg)) 0 var(--space-lg); }
        .post-back { display:flex; align-items:center; gap:6px; font-size:0.82rem; color:rgba(253,249,245,0.6); margin-bottom:var(--space-md); transition:color var(--duration) var(--ease); }
        .post-back:hover { color:var(--hc-ivory); }
        .post-header__meta { display:flex; align-items:center; gap:8px; margin-bottom:var(--space-sm); flex-wrap:wrap; }
        .post-header__cat { font-size:0.72rem; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; }
        .post-header__sep { color:rgba(255,255,255,0.3); }
        .post-header__date,.post-header__read { font-size:0.78rem; color:rgba(253,249,245,0.55); }
        .post-header__title { font-family:var(--font-heading); font-size:clamp(1.8rem,4vw,3rem); font-weight:300; color:var(--hc-ivory); line-height:1.2; margin-bottom:var(--space-md); }
        .post-header__author { display:flex; align-items:center; gap:var(--space-sm); }
        .post-header__avatar { width:40px; height:46px; object-fit:cover; object-position:top; border-radius:var(--radius-md); background:rgba(255,255,255,0.1); }
        .post-header__author-name { display:block; font-size:0.9rem; font-weight:600; color:var(--hc-ivory); }
        .post-header__author-role { display:block; font-size:0.75rem; color:rgba(253,249,245,0.55); }

        .post-body-section { background:white; padding:var(--space-xl) 0; }
        .post-body { max-width:680px; margin:0 auto; }
        .post-p { font-size:1.05rem; line-height:1.9; color:var(--hc-text); margin-bottom:var(--space-md); }
        .post-h3 { font-family:var(--font-heading); font-size:1.5rem; font-weight:400; color:var(--hc-navy); margin:var(--space-lg) 0 var(--space-sm); }
        .post-list { list-style:none; margin-bottom:var(--space-md); padding-left:var(--space-md); }
        .post-list li { position:relative; font-size:1.05rem; line-height:1.85; color:var(--hc-text); margin-bottom:var(--space-xs); padding-left:var(--space-sm); }
        .post-list li::before { content:'—'; position:absolute; left:0; color:var(--hc-brass); }

        .post-share { display:flex; align-items:center; flex-wrap:wrap; gap:var(--space-xs); padding:var(--space-md) 0; border-top:1px solid var(--hc-border); margin-top:var(--space-lg); max-width:680px; margin-left:auto; margin-right:auto; }
        .post-share__label { font-size:0.78rem; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:var(--hc-soft); }
        .share-btn { padding:8px 16px; border-radius:20px; font-size:0.82rem; font-weight:600; display:flex; align-items:center; gap:6px; transition:all var(--duration) var(--ease); }
        .share-btn--wa { background:#25D366; color:white; }
        .share-btn--wa:hover { background:#1da851; }
        .share-btn--fb { background:#1877f2; color:white; }
        .share-btn--fb:hover { background:#1464d8; }

        .post-subscribe-cta { background:var(--hc-navy); border-radius:var(--radius-lg); padding:var(--space-lg); margin-top:var(--space-xl); max-width:680px; margin-left:auto; margin-right:auto; }
        .post-subscribe-cta h3 { font-family:var(--font-heading); font-size:1.4rem; font-weight:300; color:var(--hc-ivory); margin-bottom:6px; }
        .post-subscribe-cta p { font-size:0.9rem; color:rgba(253,249,245,0.65); margin-bottom:var(--space-md); }

        .post-related { background:var(--hc-ivory); }
        .blog-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:var(--space-sm); }

        @media(max-width:900px) { .blog-grid{grid-template-columns:1fr 1fr;} }
        @media(max-width:600px) { .blog-grid{grid-template-columns:1fr;} }
      `}</style>
    </>
  );
}

// ── ROUTER ───────────────────────────────────────────────
export default function Blog() {
  const { slug } = useParams();
  return slug ? <BlogPost /> : <BlogIndex />;
}
