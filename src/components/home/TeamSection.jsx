import { Link } from 'react-router-dom';
import { TEAM } from '../../config/team.config.js';
import { useLanguage } from '../../hooks/useLanguage.js';
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js';

const AVATAR_MAP = {
  paola:   '/images/team/avatars/paola-green-skirt.png',
  dayana:  '/images/team/avatars/dayana-portrait.png',
  adriana: '/images/team/avatars/adriana-office.png',
  andrea:  '/images/team/avatars/andrea-portrait.png',
  amili:   '/images/team/avatars/amili-portrait.png',
  dollys:  '/images/team/avatars/dollys-desk.png',
};

export default function TeamSection() {
  const { text, lang } = useLanguage();
  const ref = useScrollAnimation();

  return (
    <section className="team section" ref={ref}>
      <div className="container">
        <div className="team__header fade-up">
          <span className="eyebrow">{text('Las personas detrás de todo', 'The people behind everything')}</span>
          <h2 className="display-2 team__headline">
            {text('No trabajas con software.', 'You don\'t work with software.')}
            <br />
            {text('Trabajas con nosotros.', 'You work with us.')}
          </h2>
          <p className="body-lg team__body">
            {text(
              'Seis personas comprometidas con tu éxito. Te conocemos por nombre, conocemos tu negocio, y nos preocupamos genuinamente por lo que estás construyendo.',
              'Six people committed to your success. We know you by name, know your business, and genuinely care about what you are building.'
            )}
          </p>
        </div>

        <div className="team__grid fade-up">
          {TEAM.map((member, i) => (
            <div key={member.id} className="team-card" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="team-card__avatar-wrap">
                <img
                  src={AVATAR_MAP[member.id] || '/images/team/avatars/placeholder.png'}
                  alt={member.name}
                  className="team-card__avatar"
                  width="200"
                  height="220"
                  loading="lazy"
                  onError={e => {
                    e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='220' fill='%23e5d9ce'%3E%3Crect width='200' height='220'/%3E%3C/svg%3E`;
                  }}
                />
              </div>
              <div className="team-card__info">
                <strong className="team-card__name">{member.name}</strong>
                <span className="team-card__role">
                  {lang === 'es' ? member.role_es : member.role_en}
                </span>
                <p className="team-card__bio">
                  {lang === 'es' ? member.bio_es : member.bio_en}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="team__cta fade-up">
          <Link to="/nosotros" className="btn btn--outline">
            {text('Conocer al equipo completo', 'Meet the full team')}
          </Link>
        </div>
      </div>

      <style>{`
        .team { background: var(--hc-navy); }
        .team__header { max-width: 600px; margin-bottom: var(--space-lg); }
        .team__header .eyebrow { color: var(--hc-brass); }
        .team__headline { color: var(--hc-ivory); margin: 8px 0 var(--space-sm); }
        .team__body { color: rgba(253,249,245,0.65); }

        .team__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-sm);
          margin-bottom: var(--space-lg);
        }

        .team-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: background var(--duration) var(--ease), transform var(--duration) var(--ease);
        }
        .team-card:hover {
          background: rgba(255,255,255,0.08);
          transform: translateY(-3px);
        }

        .team-card__avatar-wrap {
          height: 220px;
          overflow: hidden;
          background: rgba(255,255,255,0.06);
        }
        .team-card__avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          transition: transform 0.5s var(--ease);
        }
        .team-card:hover .team-card__avatar { transform: scale(1.03); }

        .team-card__info { padding: var(--space-sm) var(--space-md) var(--space-md); }
        .team-card__name {
          display: block;
          font-size: 1rem;
          font-weight: 600;
          color: var(--hc-ivory);
          margin-bottom: 3px;
        }
        .team-card__role {
          display: block;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--hc-lilac);
          margin-bottom: var(--space-xs);
        }
        .team-card__bio {
          font-size: 0.85rem;
          line-height: 1.65;
          color: rgba(253,249,245,0.55);
        }

        .team__cta { text-align: center; }
        .team__cta .btn--outline {
          border-color: rgba(253,249,245,0.3);
          color: var(--hc-ivory);
        }
        .team__cta .btn--outline:hover {
          background: rgba(253,249,245,0.1);
          border-color: var(--hc-ivory);
        }

        @media (max-width: 900px) { .team__grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 540px) { .team__grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
