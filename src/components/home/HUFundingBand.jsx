import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage.js';
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js';

export default function HUFundingBand() {
  const { text } = useLanguage();
  const ref = useScrollAnimation();

  return (
    <section className="hu-band" ref={ref}>
      <div className="container">
        <div className="hu-band__inner fade-up">
          <div className="hu-band__icon" aria-hidden="true">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="23" stroke="var(--hc-brass)" strokeWidth="1" opacity="0.4"/>
              <path d="M24 14c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10S29.523 14 24 14z" fill="none" stroke="var(--hc-brass)" strokeWidth="1.5"/>
              <path d="M24 20v4l3 3" stroke="var(--hc-brass)" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M17 34c1.8-1.2 4.2-2 7-2s5.2.8 7 2" stroke="var(--hc-brass)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="hu-band__content">
            <span className="eyebrow hu-band__eyebrow">
              {text('Hispanics United of SC', 'Hispanics United of SC')}
            </span>
            <p className="hu-band__statement">
              {text(
                'Cada préstamo que cerramos, cada póliza que vendemos, cada contrato que firmamos — una parte va directamente a Hispanics United. No pagas más. No haces donaciones. Solo eliges con conciencia.',
                'Every loan we close, every policy we sell, every contract we sign — a portion goes directly to Hispanics United. You don\'t pay more. You don\'t make a donation. You simply choose with intention.'
              )}
            </p>
            <Link to="/unidos" className="hu-band__link">
              {text('Conoce el impacto →', 'See the impact →')}
            </Link>
          </div>
          <div className="hu-band__stats">
            <div className="hu-band__stat">
              <strong>23,000+</strong>
              <span>{text('familias servidas', 'families served')}</span>
            </div>
            <div className="hu-band__stat">
              <strong>100%</strong>
              <span>{text('autofinanciada', 'self-funded')}</span>
            </div>
            <div className="hu-band__stat">
              <strong>14</strong>
              <span>{text('años de impacto', 'years of impact')}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hu-band {
          background: #f5f0e8;
          border-top: 1px solid var(--hc-border);
          border-bottom: 1px solid var(--hc-border);
          padding: var(--space-lg) 0;
        }
        .hu-band__inner {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: var(--space-md) var(--space-lg);
          align-items: center;
        }
        .hu-band__icon { flex-shrink: 0; }
        .hu-band__eyebrow { color: var(--unidos-green); margin-bottom: var(--space-xs); }
        .hu-band__statement {
          font-size: 1rem;
          line-height: 1.8;
          color: var(--hc-text);
          margin-bottom: var(--space-sm);
          max-width: 560px;
        }
        .hu-band__link {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--unidos-green);
          letter-spacing: 0.04em;
          transition: color var(--duration) var(--ease);
        }
        .hu-band__link:hover { color: var(--hc-navy); }
        .hu-band__stats {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
          flex-shrink: 0;
        }
        .hu-band__stat {
          display: flex;
          flex-direction: column;
          text-align: right;
        }
        .hu-band__stat strong {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 300;
          color: var(--unidos-green);
          line-height: 1;
        }
        .hu-band__stat span {
          font-size: 0.75rem;
          color: var(--hc-soft);
          letter-spacing: 0.04em;
        }
        @media (max-width: 900px) {
          .hu-band__inner { grid-template-columns: 1fr; }
          .hu-band__icon { display: none; }
          .hu-band__stats { flex-direction: row; gap: var(--space-md); text-align: left; }
          .hu-band__stat { text-align: left; }
        }
      `}</style>
    </section>
  );
}
