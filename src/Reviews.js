import React, { useEffect, useState } from 'react';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: '', text: '' });
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [altPressed, setAltPressed] = useState(false); // для скрытой кнопки удаления

  useEffect(() => {
    fetch('https://curtain-production.up.railway.app/api/reviews')
      .then(r => r.json())
      .then(data => { setReviews(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // Слежение за нажатием Alt
  useEffect(() => {
    const handleDown = e => { if (e.altKey) setAltPressed(true); };
    const handleUp = e => { if (!e.altKey) setAltPressed(false); };
    window.addEventListener('keydown', handleDown);
    window.addEventListener('keyup', handleUp);
    return () => {
      window.removeEventListener('keydown', handleDown);
      window.removeEventListener('keyup', handleUp);
    };
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setSending(true);
    try {
      const res = await fetch('https://curtain-production.up.railway.app/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Ошибка отправки');
      const newReview = await res.json();
      setReviews(r => [newReview, ...r]);
      setForm({ name: '', text: '' });
      setSuccess(true);
    } catch {
      setError('Не удалось отправить отзыв. Попробуйте позже.');
    }
    setSending(false);
  };

  // Удаление отзыва
  const handleDelete = async (id) => {
    if (!window.confirm('Удалить этот отзыв?')) return;
    try {
      const res = await fetch(`https://curtain-production.up.railway.app/api/reviews/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Ошибка удаления');
      setReviews(r => r.filter(rv => rv.id !== id));
    } catch {
      alert('Не удалось удалить отзыв.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <form onSubmit={handleSubmit} style={{ maxWidth: 420, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#f8fafd', borderRadius: 14, boxShadow: '0 2px 12px rgba(44,62,80,0.06)', padding: '1.5rem 1.2rem' }}>
        <input
          name="name"
          type="text"
          placeholder="Ваше имя"
          value={form.name}
          onChange={handleChange}
          required
          style={{ padding: '0.8rem', borderRadius: 8, border: '1.5px solid #dbeafe', fontSize: 16, outline: 'none' }}
        />
        <textarea
          name="text"
          placeholder="Ваш отзыв"
          value={form.text}
          onChange={handleChange}
          required
          rows={3}
          style={{ padding: '0.8rem', borderRadius: 8, border: '1.5px solid #dbeafe', fontSize: 16, outline: 'none', resize: 'vertical' }}
        />
        <button type="submit" disabled={sending} style={{ background: 'linear-gradient(90deg, #3a7bd5 0%, #00d2ff 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '1rem', fontWeight: 700, fontSize: 17, cursor: 'pointer', boxShadow: '0 2px 8px rgba(44,62,80,0.07)' }}>
          {sending ? 'Отправка...' : 'Оставить отзыв'}
        </button>
        {error && <div style={{ color: 'red', marginTop: 8, textAlign: 'center' }}>{error}</div>}
        {success && <div style={{ color: '#3a7bd5', marginTop: 8, textAlign: 'center' }}>Спасибо за ваш отзыв!</div>}
      </form>
      {loading ? <div>Загрузка отзывов...</div> : reviews.map((r, i) => (
        <div key={r.id || i} className="card" style={{ position: 'relative' }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>{r.name}</div>
          <div style={{ color: '#555', marginBottom: 6 }}>{r.text}</div>
          <div style={{ fontSize: 12, color: '#888' }}>{r.date}</div>
          {altPressed && (
            <button
              onClick={() => handleDelete(r.id)}
              style={{ position: 'absolute', top: 10, right: 10, background: '#fff0f0', color: '#d32f2f', border: '1px solid #d32f2f', borderRadius: 6, padding: '0.3rem 0.7rem', fontWeight: 600, fontSize: 14, cursor: 'pointer', zIndex: 2 }}
            >
              Удалить
            </button>
          )}
        </div>
      ))}
    </div>
  );
} 