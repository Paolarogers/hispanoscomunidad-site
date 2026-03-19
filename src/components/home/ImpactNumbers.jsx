import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage.js';
import { useCountUp } from '../../hooks/useCountUp.js';

const STATS = [
  { value: '20,000+', label_es: 'Familias apoyadas por Bonanza', label_en: 'Families supported by Bonanza', brand: 'bonanza', color: 'var(--bonanza-gold)' },
  { value: '$28.9M',  label_es: 'En préstamos entregados', label_en: 'In loans delivered', brand: 'bonanza', color: 'var(--bonanza-gold)' },
  { value: '5,000+',  label_es: 'Hogares asegurados por Zivo', label_en: 'Households insured by Zivo', brand: 'zivo', color: 'var(--zivo-teal)' },
  { value: '23,000+', label_es: 'Familias servidas por Hispanics United', label_en: 'Families served by Hispanics United', brand: 'unidos', color: 'var(--unidos-green)' },
  { value: '50,000+', label_es: 'Alcance mensual de HC Media', label_en: 'Monthly reach of HC Media', brand: 'media', color: 'var(--media-lilac)' },
  { value: '6',       label_es: 'Oficinas en Upstate SC', label_en: 'Offices in Upstate SC', brand: 'hc', color: 'var(--hc-brass)' },
  { value: '13+',     label_es: 'Años sirviendo a la comunidad', label_en: 'Years serving the community', brand: 'hc', color: 'var(--hc-navy)' },
  { value: '2,000+',  label_es: 'Graduados de talleres y workshops', label_en: 'Workshop and program graduates', brand: 'unidos', color: 'var(--unidos-green)' },
];

function StatItem({ stat, started, lang }) {
  const count = useCountUp(stat.value, 2200, started);
  return (
    <div className="stat-item fade-up" style={{ '--stat-color': stat.color }}>
      <span className="stat-item__value">{started ? count : '0'}</span>
      <span className="stat-item__label">
        {lang === 'es' ? stat.label_es : stat.label_en}
      </span>
    </div>
  );
}

export default function ImpactNumbers() {
  const { text, lang } = useLanguage();
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="impact section" ref={ref}>
      <div className="container">
        <div className="impact__header">
          <span className="eyebrow">{text('13 años de impacto real', '13 years of real impact')}</span>
          <h2 className="display-2 impact__headline">
            {text('Los números que importan.', 'The numbers that matter.')}
          </h2>
          <p className="body-lg impact__body">
            {text(
              'Cada cifra representa una familia apoyada, un negocio lanzado, una vida cambiada.',
              'Every figure represents a family supported, a business launched, a life changed.'
            )}
          </p>
        </div>
        <div className="impact__grid">
          {STATS.map((stat, i) => (
            <StatItem key={i} stat={stat} started={started} lang={lang} />
          ))}
        </div>
      </div>

      <style>{`
        .impact {
          background: var(--hc-navy);
          color: var(--hc-ivory);
        }
        .impact__header {
          max-width: 560px;
          margin-bottom: var(--space-lg);
        }
        .impact__header .eyebrow { color: var(--hc-brass); }
        .impact__headline { color: var(--hc-ivory); margin: 8px 0 var(--space-sm); }
        .impact__body { color: rgba(253,249,245,0.65); }

        .impact__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .stat-item {
          background: var(--hc-navy);
          padding: var(--space-md);
          transition: background var(--duration) var(--ease);
        }
        .stat-item:hover { background: rgba(255,255,255,0.04); }

        .stat-item__value {
          display: block;
          font-family: var(--font-heading);
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 300;
          color: var(--stat-color);
          line-height: 1;
          margin-bottom: var(--space-xs);
        }
        .stat-item__label {
          display: block;
          font-size: 0.82rem;
          color: rgba(253,249,245,0.55);
          line-height: 1.5;
        }

        @media (max-width: 960px) {
          .impact__grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .impact__grid { grid-template-columns: 1fr 1fr; }
          .stat-item { padding: var(--space-sm); }
        }
      `}</style>
    </section>
  );
}
