import { REACTIONS, COUNTRY_FLAGS } from '../../config/gallery.config.js';
import { useReactions } from '../../hooks/useGallery.js';
import { useLanguage } from '../../hooks/useLanguage.js';

function formatCount(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

export default function ReactionsBar({ photoId }) {
  const { text, lang } = useLanguage();
  const {
    reactions, flags, myReactions, myFlags,
    toggleReaction, toggleFlag, totalReactions
  } = useReactions(photoId);

  const activeFlags = COUNTRY_FLAGS.filter(f => (flags[f.id] || 0) > 0);

  return (
    <div className="reactions">

      {totalReactions > 0 && (
        <div className="reactions__total">
          <span className="reactions__total-number">{formatCount(totalReactions)}</span>
          <span className="reactions__total-label">
            {text('personas de nuestra comunidad reaccionaron', 'people from our community reacted')}
          </span>
        </div>
      )}

      <div className="reactions__main">
        <div className="reactions__label">
          {text('¿Cómo te hace sentir esto?', 'How does this make you feel?')}
        </div>
        <div className="reactions__buttons">
          {REACTIONS.map(r => {
            const count = reactions[r.id] || 0;
            const active = myReactions.has(r.id);
            return (
              <button
                key={r.id}
                className={`reaction-btn${active ? ' reaction-btn--active' : ''}`}
                onClick={() => toggleReaction(r.id)}
                title={lang === 'es' ? r.label_es : r.label_en}
                aria-label={`${lang === 'es' ? r.label_es : r.label_en}${count > 0 ? ` · ${count}` : ''}`}
                aria-pressed={active}
              >
                <span className="reaction-btn__emoji">{r.emoji}</span>
                <span className="reaction-btn__label">
                  {lang === 'es' ? r.label_es : r.label_en}
                </span>
                {count > 0 && (
                  <span className="reaction-btn__count">{formatCount(count)}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="reactions__flags">
        <div className="reactions__label">
          {text('¿De dónde eres?', 'Where are you from?')}
        </div>
        <div className="reactions__flag-buttons">
          {COUNTRY_FLAGS.map(f => {
            const count = flags[f.id] || 0;
            const active = myFlags.has(f.id);
            return (
              <button
                key={f.id}
                className={`flag-btn${active ? ' flag-btn--active' : ''}`}
                onClick={() => toggleFlag(f.id)}
                title={lang === 'es' ? f.name_es : f.name_en}
                aria-label={`${lang === 'es' ? f.name_es : f.name_en}${count > 0 ? ` · ${count}` : ''}`}
                aria-pressed={active}
              >
                <span className="flag-btn__emoji">{f.emoji}</span>
                {count > 0 && (
                  <span className="flag-btn__count">{formatCount(count)}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {activeFlags.length > 0 && (
        <div className="reactions__flag-tally">
          <span className="reactions__flag-tally-label">
            {text('Representados aquí', 'Represented here')} ·
          </span>
          {activeFlags
            .sort((a, b) => (flags[b.id] || 0) - (flags[a.id] || 0))
            .map(f => (
              <span key={f.id} className="reactions__flag-tally-item">
                {f.emoji} <strong>{formatCount(flags[f.id])}</strong>
              </span>
            ))}
        </div>
      )}

      <style>{`
        .reactions {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          padding: var(--space-md) 0;
          border-top: 1px solid var(--hc-border);
        }

        .reactions__total {
          display: flex;
          align-items: baseline;
          gap: 8px;
          padding-bottom: var(--space-sm);
          border-bottom: 1px solid var(--hc-border);
        }
        .reactions__total-number {
          font-family: var(--font-heading);
          font-size: 2.8rem;
          font-weight: 300;
          color: var(--hc-brass);
          line-height: 1;
        }
        .reactions__total-label {
          font-size: 0.875rem;
          color: var(--hc-soft);
          line-height: 1.4;
          max-width: 200px;
        }

        .reactions__label {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--hc-lilac);
          margin-bottom: var(--space-xs);
        }

        .reactions__buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .reaction-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border: 1.5px solid var(--hc-border);
          border-radius: 40px;
          background: white;
          transition: all 200ms ease;
          cursor: pointer;
        }
        .reaction-btn:hover {
          border-color: var(--hc-brass);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(184,137,58,0.15);
        }
        .reaction-btn--active {
          border-color: var(--hc-brass);
          background: var(--bonanza-light);
        }
        .reaction-btn--active:hover { transform: translateY(-1px); }

        .reaction-btn__emoji {
          font-size: 1.3rem;
          line-height: 1;
          transition: transform 200ms ease;
        }
        .reaction-btn:hover .reaction-btn__emoji,
        .reaction-btn--active .reaction-btn__emoji {
          transform: scale(1.25);
        }
        .reaction-btn__label {
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--hc-text);
          white-space: nowrap;
        }
        .reaction-btn__count {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--hc-brass);
          background: rgba(184,137,58,0.1);
          padding: 1px 6px;
          border-radius: 10px;
        }

        .reactions__flag-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .flag-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border: 1.5px solid var(--hc-border);
          border-radius: var(--radius-md);
          background: white;
          transition: all 200ms ease;
          cursor: pointer;
        }
        .flag-btn:hover {
          border-color: var(--hc-lilac);
          transform: translateY(-2px) scale(1.1);
          box-shadow: 0 4px 12px rgba(139,123,181,0.2);
          z-index: 1;
        }
        .flag-btn--active {
          border-color: var(--hc-lilac);
          background: var(--media-light);
        }

        .flag-btn__emoji {
          font-size: 1.5rem;
          line-height: 1;
        }
        .flag-btn__count {
          position: absolute;
          top: -6px;
          right: -6px;
          background: var(--hc-lilac);
          color: white;
          font-size: 0.6rem;
          font-weight: 700;
          padding: 1px 5px;
          border-radius: 10px;
          min-width: 16px;
          text-align: center;
        }

        .reactions__flag-tally {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          padding: var(--space-sm) var(--space-md);
          background: var(--hc-navy);
          border-radius: var(--radius-md);
        }
        .reactions__flag-tally-label {
          font-size: 0.75rem;
          color: rgba(253,249,245,0.5);
          letter-spacing: 0.06em;
        }
        .reactions__flag-tally-item {
          font-size: 0.85rem;
          color: var(--hc-ivory);
          display: flex;
          align-items: center;
          gap: 3px;
        }
        .reactions__flag-tally-item strong {
          color: var(--hc-brass);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
