import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { WHATSAPP } from '../../config/site.config.js';
import { useLanguage } from '../../hooks/useLanguage.js';

const DEPT_WHATSAPP = {
  '/bonanza': WHATSAPP.bonanza,
  '/zivo':    WHATSAPP.zivo,
  '/media':   WHATSAPP.media,
  '/unidos':  WHATSAPP.unidos,
};

export default function FloatingContact() {
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(true);
  const { text } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    const pulseTimer = setTimeout(() => setPulse(false), 6000);
    return () => { clearTimeout(timer); clearTimeout(pulseTimer); };
  }, []);

  const waUrl = DEPT_WHATSAPP[location.pathname] || WHATSAPP.general;

  return (
    <div className={`float-contact${visible ? ' float-contact--visible' : ''}`}>
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`float-contact__btn${pulse ? ' float-contact__btn--pulse' : ''}`}
        aria-label={text('Escríbenos por WhatsApp', 'Message us on WhatsApp')}
      >
        <svg className="float-contact__icon" viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="float-contact__label">
          {text('¿Necesitas ayuda?', 'Need help?')}
        </span>
      </a>

      <style>{`
        .float-contact {
          position: fixed;
          bottom: 28px;
          right: 24px;
          z-index: 90;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s var(--ease), transform 0.5s var(--ease);
          pointer-events: none;
        }
        .float-contact--visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }
        .float-contact__btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #25D366;
          color: white;
          padding: 14px 20px 14px 16px;
          border-radius: 50px;
          box-shadow: 0 4px 20px rgba(37,211,102,0.35);
          transition: transform var(--duration) var(--ease), box-shadow var(--duration) var(--ease);
        }
        .float-contact__btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(37,211,102,0.45);
        }
        .float-contact__label {
          font-size: 0.85rem;
          font-weight: 600;
          white-space: nowrap;
        }
        .float-contact__btn--pulse {
          animation: wa-pulse 2s ease-in-out 3;
        }
        @keyframes wa-pulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(37,211,102,0.35); }
          50% { box-shadow: 0 4px 32px rgba(37,211,102,0.65), 0 0 0 8px rgba(37,211,102,0.12); }
        }
        @media (max-width: 600px) {
          .float-contact { bottom: 20px; right: 16px; }
          .float-contact__label { display: none; }
          .float-contact__btn { padding: 14px; border-radius: 50%; }
        }
      `}</style>
    </div>
  );
}
