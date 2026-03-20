import { useState, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage.js';

export default function FloatingContact() {
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(true);
  const [open, setOpen] = useState(false);
  const { text } = useLanguage();

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 1500);
    const t2 = setTimeout(() => setPulse(false), 6000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Trigger Zoho SalesIQ if available, otherwise fallback to toggle panel
  const handleClick = () => {
    if (window.$zoho && window.$zoho.salesiq && window.$zoho.salesiq.floatwindow) {
      window.$zoho.salesiq.floatwindow.visible('show');
    } else {
      setOpen(o => !o);
    }
  };

  return (
    <div className={`float-chat${visible ? ' float-chat--visible' : ''}`}>

      {/* Fallback mini chat panel — shown only when Zoho SalesIQ is not loaded */}
      {open && (
        <div className="float-chat__panel">
          <div className="float-chat__panel-header">
            <img src="/images/logos/hc-logo-seal-transparent.png" alt="HC" width="28" height="28"
              style={{ borderRadius: '50%', background: 'white', padding: '2px' }}
              onError={e => e.target.style.display = 'none'} />
            <div>
              <p className="float-chat__panel-name">Hispanos Comunidad</p>
              <p className="float-chat__panel-status">
                <span className="float-chat__dot"/> {text('En línea ahora', 'Online now')}
              </p>
            </div>
            <button className="float-chat__close" onClick={() => setOpen(false)} aria-label="Cerrar">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <div className="float-chat__panel-body">
            <p>{text('Hola! ¿En qué podemos ayudarte hoy?', 'Hello! How can we help you today?')}</p>
          </div>
          <div className="float-chat__panel-footer">
            <a
              href="https://wa.me/18642014433"
              target="_blank"
              rel="noopener noreferrer"
              className="float-chat__wa-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {text('Escribirnos por WhatsApp', 'Message us on WhatsApp')}
            </a>
          </div>
        </div>
      )}

      <button
        className={`float-chat__btn${pulse ? ' float-chat__btn--pulse' : ''}`}
        onClick={handleClick}
        aria-label={text('Abrir chat de ayuda', 'Open help chat')}
      >
        {/* Chat bubble icon */}
        <svg className="float-chat__icon" width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.95 7.95 0 01-4.054-1.112l-.29-.173-2.868.853.853-2.868-.173-.29A7.95 7.95 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8zm4-6H8a1 1 0 010-2h8a1 1 0 010 2zm-2-3H8a1 1 0 010-2h6a1 1 0 010 2z"/>
        </svg>
        <span className="float-chat__label">
          {text('¿Necesitas ayuda?', 'Need help?')}
        </span>
      </button>

      <style>{`
        .float-chat {
          position: fixed;
          bottom: 180px;
          right: 24px;
          z-index: 90;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
        }
        .float-chat--visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }

        /* Main button */
        .float-chat__btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #1f4268;
          color: white;
          padding: 13px 20px 13px 16px;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(31,66,104,0.4);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .float-chat__btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(31,66,104,0.5);
          background: #2a5a8a;
        }
        .float-chat__label {
          font-size: 0.84rem;
          font-weight: 600;
          white-space: nowrap;
        }
        .float-chat__btn--pulse {
          animation: chat-pulse 2s ease-in-out 3;
        }
        @keyframes chat-pulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(31,66,104,0.4); }
          50% { box-shadow: 0 4px 32px rgba(31,66,104,0.7), 0 0 0 8px rgba(31,66,104,0.12); }
        }

        /* Fallback panel */
        .float-chat__panel {
          width: 300px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 12px 48px rgba(0,0,0,0.18);
          overflow: hidden;
        }
        .float-chat__panel-header {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #1f4268;
          padding: 14px 16px;
        }
        .float-chat__panel-name {
          font-size: 0.82rem;
          font-weight: 700;
          color: white;
          margin: 0;
        }
        .float-chat__panel-status {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.68rem;
          color: rgba(255,255,255,0.7);
          margin: 2px 0 0;
        }
        .float-chat__dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #4ade80;
          display: inline-block;
        }
        .float-chat__close {
          margin-left: auto;
          background: none;
          border: none;
          color: rgba(255,255,255,0.7);
          cursor: pointer;
          padding: 4px;
          line-height: 1;
        }
        .float-chat__close:hover { color: white; }
        .float-chat__panel-body {
          padding: 20px 16px;
          font-size: 0.88rem;
          color: #333;
          line-height: 1.6;
        }
        .float-chat__panel-footer {
          padding: 0 16px 16px;
        }
        .float-chat__wa-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          background: #25D366;
          color: white;
          padding: 11px 16px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 0.82rem;
          font-weight: 600;
          justify-content: center;
        }
        .float-chat__wa-btn:hover { background: #1da851; }

        @media (max-width: 600px) {
          .float-chat { bottom: 20px; right: 16px; }
          .float-chat__label { display: none; }
          .float-chat__btn { padding: 14px; border-radius: 50%; }
          .float-chat__panel { width: calc(100vw - 32px); }
        }
      `}</style>
    </div>
  );
}
