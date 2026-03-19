import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage.js';
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js';

const SAMPLE_REVIEWS = [
  { name: 'Luis Angel Pacheco', rating: 5, text: 'La atención por parte de Irais es genial, muy cálida y realmente me orientó sobre lo que necesitaba. Explica todo muy bien y ofrece muchas opciones y recomendaciones para mi bienestar como cliente.', source: 'Bonanza Quick Loans', date: '2025' },
  { name: 'Sara Ospina', rating: 5, text: 'Recibimos un servicio muy completo. Leidy fue muy amable y muy paciente con nosotros. Cada pregunta que teníamos fue respondida y aclarada. Quedamos muy felices con el servicio.', source: 'Bonanza Quick Loans', date: '2025' },
  { name: 'Isabel Garrido', rating: 5, text: 'Un trato muy amable y claro para todo el proceso. Me sentí acompañada desde el primer momento. Los recomiendo completamente.', source: 'Zivo Insurance', date: '2025' },
  { name: 'Kaitlyn Vendetti', rating: 5, text: 'I had such an amazing experience here. The help I received was so fast and easy. There is no lengthy process and you are in and out. I will definitely recommend you to everyone.', source: 'Bonanza Quick Loans', date: '2025' },
  { name: 'Ana Garnica', rating: 5, text: 'Muy amable y muy buena atención. El proceso fue rápido y claro. Sin duda los recomiendo a toda mi familia y amigos que necesiten ayuda financiera.', source: 'Bonanza Quick Loans', date: '2025' },
  { name: 'Jenny Cubillos', rating: 5, text: 'Muy buena atención sin duda los recomiendo. Andrea siempre está dispuesta a ayudar y a encontrar la mejor opción para cada cliente. Gracias mil.', source: 'Zivo Insurance', date: '2025' },
];

function StarRating({ count = 5 }) {
  return (
    <div className="stars" aria-label={`${count} de 5 estrellas`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill={i < count ? '#b8893a' : '#e5d9ce'}>
          <path d="M7 1l1.545 3.13L12 4.635l-2.5 2.436.59 3.44L7 8.955l-3.09 1.556.59-3.44L2 4.635l3.455-.505z"/>
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsStrip() {
  const { text } = useLanguage();
  const ref = useScrollAnimation();
  const [active, setActive] = useState(0);

  const next = () => setActive(v => (v + 1) % SAMPLE_REVIEWS.length);
  const prev = () => setActive(v => (v - 1 + SAMPLE_REVIEWS.length) % SAMPLE_REVIEWS.length);

  const visible = [
    SAMPLE_REVIEWS[active],
    SAMPLE_REVIEWS[(active + 1) % SAMPLE_REVIEWS.length],
    SAMPLE_REVIEWS[(active + 2) % SAMPLE_REVIEWS.length],
  ];

  return (
    <section className="reviews section--sm" ref={ref}>
      <div className="container">
        <div className="reviews__header fade-up">
          <div className="reviews__header-left">
            <span className="eyebrow">{text('Lo que dice nuestra comunidad', 'What our community says')}</span>
            <h2 className="display-2 reviews__headline">
              {text('Más de 200 reseñas reales.', 'Over 200 real reviews.')}
            </h2>
          </div>
          <div className="reviews__score">
            <span className="reviews__number">4.9</span>
            <div className="reviews__score-right">
              <StarRating count={5} />
              <span className="reviews__total">
                {text('214 reseñas · Google', '214 reviews · Google')}
              </span>
            </div>
          </div>
        </div>

        <div className="reviews__grid fade-up">
          {visible.map((review, i) => (
            <div key={`${active}-${i}`} className="review-card">
              <div className="review-card__top">
                <StarRating count={review.rating} />
                <span className="review-card__source">{review.source}</span>
              </div>
              <p className="review-card__text">"{review.text}"</p>
              <div className="review-card__footer">
                <div className="review-card__avatar" aria-hidden="true">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <strong className="review-card__name">{review.name}</strong>
                  <span className="review-card__date">{review.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="reviews__nav">
          <button className="reviews__nav-btn" onClick={prev} aria-label="Anterior">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 5l-5 5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div className="reviews__dots">
            {SAMPLE_REVIEWS.map((_, i) => (
              <button key={i} className={`reviews__dot${i === active ? ' reviews__dot--active' : ''}`} onClick={() => setActive(i)} aria-label={`Reseña ${i + 1}`} />
            ))}
          </div>
          <button className="reviews__nav-btn" onClick={next} aria-label="Siguiente">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        <div className="reviews__cta-row">
          <a href="https://www.google.com/search?q=Bonanza+Quick+Loans+Greenville+SC+reviews" target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
            {text('Ver todas las reseñas en Google →', 'View all Google reviews →')}
          </a>
        </div>
      </div>

      <style>{`
        .reviews { background: white; }
        .reviews__header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: var(--space-lg);
          gap: var(--space-md);
          flex-wrap: wrap;
        }
        .reviews__headline { margin: 8px 0 0; }
        .reviews__score { display: flex; align-items: center; gap: var(--space-sm); }
        .reviews__number {
          font-family: var(--font-heading);
          font-size: 3.5rem;
          font-weight: 300;
          color: var(--hc-navy);
          line-height: 1;
        }
        .reviews__score-right { display: flex; flex-direction: column; gap: 4px; }
        .stars { display: flex; gap: 2px; }
        .reviews__total { font-size: 0.78rem; color: var(--hc-soft); }

        .reviews__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-sm);
          margin-bottom: var(--space-md);
        }

        .review-card {
          background: var(--hc-ivory);
          border: 1px solid var(--hc-border);
          border-radius: var(--radius-lg);
          padding: var(--space-md);
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }
        .review-card__top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .review-card__source {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--hc-lilac);
        }
        .review-card__text {
          font-size: 0.9rem;
          line-height: 1.75;
          color: var(--hc-text);
          flex: 1;
          font-style: italic;
        }
        .review-card__footer { display: flex; align-items: center; gap: 10px; }
        .review-card__avatar {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: var(--hc-navy);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 600;
          flex-shrink: 0;
        }
        .review-card__name {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--hc-navy);
        }
        .review-card__date {
          display: block;
          font-size: 0.75rem;
          color: var(--hc-soft);
        }

        .reviews__nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-sm);
          margin-bottom: var(--space-md);
        }
        .reviews__nav-btn {
          width: 40px; height: 40px;
          border-radius: 50%;
          border: 1px solid var(--hc-border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--hc-navy);
          transition: all var(--duration) var(--ease);
        }
        .reviews__nav-btn:hover { background: var(--hc-navy); color: white; border-color: var(--hc-navy); }
        .reviews__dots { display: flex; gap: 6px; }
        .reviews__dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--hc-border);
          transition: background var(--duration) var(--ease), transform var(--duration) var(--ease);
        }
        .reviews__dot--active { background: var(--hc-brass); transform: scale(1.3); }

        .reviews__cta-row { text-align: center; }

        @media (max-width: 768px) {
          .reviews__grid { grid-template-columns: 1fr; }
          .reviews__header { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </section>
  );
}
