import React, { useState, useContext } from 'react';
import { LangContext, translations } from './i18n';

export default function OrderForm() {
  const [form, setForm] = useState({ name: '', phone: '', comment: '', ownDesign: false });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const { lang } = useContext(LangContext);
  const t = translations[lang];

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('https://curtain-on9z.onrender.com/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Ошибка отправки');
      setSent(true);
    } catch (e) {
      setError('Не удалось отправить заявку. Попробуйте позже.');
    }
  };

  if (sent) {
    return <div style={{ color: '#3a7bd5', fontWeight: 600, fontSize: 20, textAlign: 'center', marginTop: 32 }}>{t.thankYou}</div>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 420, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.2rem', background: '#f8fafd', borderRadius: 14, boxShadow: '0 2px 12px rgba(44,62,80,0.06)', padding: '2rem 1.2rem' }}>
      <input
        name="name"
        type="text"
        placeholder={t.name}
        value={form.name}
        onChange={handleChange}
        required
        style={{ padding: '0.9rem', borderRadius: 8, border: '1.5px solid #dbeafe', fontSize: 16, outline: 'none', transition: 'border 0.2s' }}
      />
      <input
        name="phone"
        type="tel"
        placeholder={t.phone}
        value={form.phone}
        onChange={handleChange}
        required
        style={{ padding: '0.9rem', borderRadius: 8, border: '1.5px solid #dbeafe', fontSize: 16, outline: 'none', transition: 'border 0.2s' }}
      />
      <textarea
        name="comment"
        placeholder={t.comment}
        value={form.comment}
        onChange={handleChange}
        rows={3}
        style={{ padding: '0.9rem', borderRadius: 8, border: '1.5px solid #dbeafe', fontSize: 16, outline: 'none', resize: 'vertical', transition: 'border 0.2s' }}
      />
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 16 }}>
        <input
          name="ownDesign"
          type="checkbox"
          checked={form.ownDesign}
          onChange={handleChange}
          style={{ width: 18, height: 18 }}
        />
        {t.ownDesign}
      </label>
      <button type="submit" style={{ background: 'linear-gradient(90deg, #3a7bd5 0%, #00d2ff 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '1.1rem', fontWeight: 700, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px rgba(44,62,80,0.07)', transition: 'background 0.2s, box-shadow 0.2s, transform 0.1s' }}>
        {t.submit}
      </button>
      {error && <div style={{ color: 'red', marginTop: 8, textAlign: 'center' }}>{t.error}</div>}
    </form>
  );
} 