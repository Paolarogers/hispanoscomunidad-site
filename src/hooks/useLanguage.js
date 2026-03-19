import { useState, useCallback } from 'react';

export function useLanguage() {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('hc-lang') || 'es';
    }
    return 'es';
  });

  const toggle = useCallback(() => {
    const next = lang === 'es' ? 'en' : 'es';
    setLang(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hc-lang', next);
      document.documentElement.setAttribute('lang', next);
    }
  }, [lang]);

  const t = useCallback((obj, key) => {
    if (!obj) return '';
    const val = obj[key];
    if (typeof val === 'string') return val;
    if (val && typeof val === 'object') {
      return val[lang] || val['es'] || '';
    }
    return '';
  }, [lang]);

  const text = useCallback((es, en) => {
    return lang === 'es' ? es : (en || es);
  }, [lang]);

  return { lang, toggle, t, text };
}
