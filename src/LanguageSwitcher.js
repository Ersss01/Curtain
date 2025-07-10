import React, { useContext } from 'react';
import { LangContext, translations } from './i18n';

export default function LanguageSwitcher() {
  const { lang, setLang } = useContext(LangContext);
  const nextLang = lang === 'ru' ? 'kz' : 'ru';
  return (
    <button
      onClick={() => setLang(nextLang)}
      style={{ position: 'absolute', top: 18, right: 18, padding: '0.5rem 1.2rem', borderRadius: 8, border: '1.5px solid #3a7bd5', background: '#fff', color: '#3a7bd5', fontWeight: 700, fontSize: 16, cursor: 'pointer', transition: 'background 0.2s, color 0.2s' }}
      aria-label={translations[nextLang].lang}
    >
      {translations[lang].switch}
    </button>
  );
} 