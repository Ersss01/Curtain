import React, { useEffect, useState, useRef, useContext } from 'react';
import { LangContext, translations } from './i18n';

function StarRating({ value, onChange, disabled }) {
  return (
    <div style={{ display: 'flex', gap: 2, marginBottom: 8 }}>
      {[1,2,3,4,5].map(star => (
        <span
          key={star}
          style={{
            fontSize: 22,
            color: star <= value ? '#f7b500' : '#dbeafe',
            cursor: disabled ? 'default' : 'pointer',
            transition: 'color 0.2s',
            userSelect: 'none',
          }}
          onClick={() => !disabled && onChange(star)}
        >★</span>
      ))}
    </div>
  );
}

export default function Reviews() {
  const { lang } = useContext(LangContext);
  const t = translations[lang];
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: '', text: '', rating: 0 });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [altPressed, setAltPressed] = useState(false); // для скрытой кнопки удаления
  const fileInputRef = useRef();

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

  const handleImageChange = e => {
    setImage(e.target.files[0] || null);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setSending(true);
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('text', form.text);
      formData.append('rating', form.rating);
      if (image) formData.append('image', image);
      const res = await fetch('https://curtain-production.up.railway.app/api/reviews', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Ошибка отправки');
      const newReview = await res.json();
      setReviews(r => [newReview, ...r]);
      setForm({ name: '', text: '', rating: 0 });
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setSuccess(true);
    } catch {
      setError(t.error || 'Не удалось отправить отзыв. Попробуйте позже.');
    }
    setSending(false);
  };

  // Удаление отзыва
  const handleDelete = async (id) => {
    if (!window.confirm(t.deleteConfirm || 'Удалить этот отзыв?')) return;
    try {
      const res = await fetch(`https://curtain-production.up.railway.app/api/reviews/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Ошибка удаления');
      setReviews(r => r.filter(rv => rv.id !== id));
    } catch {
      alert(t.deleteError || 'Не удалось удалить отзыв.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <form onSubmit={handleSubmit} style={{ maxWidth: 420, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#f8fafd', borderRadius: 14, boxShadow: '0 2px 12px rgba(44,62,80,0.06)', padding: '1.5rem 1.2rem' }}>
        <input
          name="name"
          type="text"
          placeholder={t.name}
          value={form.name}
          onChange={handleChange}
          required
          style={{ padding: '0.8rem', borderRadius: 8, border: '1.5px solid #dbeafe', fontSize: 16, outline: 'none' }}
        />
        <textarea
          name="text"
          placeholder={t.reviewText}
          value={form.text}
          onChange={handleChange}
          required
          rows={3}
          style={{ padding: '0.8rem', borderRadius: 8, border: '1.5px solid #dbeafe', fontSize: 16, outline: 'none', resize: 'vertical' }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <label style={{ fontWeight: 500, fontSize: 15 }}>{t.yourRating}:</label>
          <StarRating value={form.rating} onChange={r => setForm(f => ({ ...f, rating: r }))} disabled={sending} />
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          style={{ fontSize: 15, borderRadius: 8, border: '1.5px solid #dbeafe', padding: '0.5rem' }}
          placeholder={t.chooseFile}
        />
        <button type="submit" disabled={sending} style={{ background: 'linear-gradient(90deg, #3a7bd5 0%, #00d2ff 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '1rem', fontWeight: 700, fontSize: 17, cursor: 'pointer', boxShadow: '0 2px 8px rgba(44,62,80,0.07)' }}>
          {sending ? (t.sending || 'Отправка...') : (t.leaveReview || 'Оставить отзыв')}
        </button>
        {error && <div style={{ color: 'red', marginTop: 8, textAlign: 'center' }}>{error}</div>}
        {success && <div style={{ color: '#3a7bd5', marginTop: 8, textAlign: 'center' }}>{t.thankYou || 'Спасибо за ваш отзыв!'}</div>}
      </form>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {loading ? <div>{t.reviewsLoading || 'Загрузка отзывов...'}</div> : reviews.map((r, i) => (
          <div
            key={r.id || i}
            className="card review-card-anim"
            style={{ position: 'relative', display: 'flex', gap: 18, alignItems: 'flex-start', animation: `fadeInUp 0.7s cubic-bezier(0.4,0,0.2,1) both`, animationDelay: `${i * 0.07}s` }}
          >
            {/* Аватарка */}
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#eaf1fb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 22, color: '#3a7bd5', flexShrink: 0 }}>
              {r.name ? r.name[0].toUpperCase() : '?'}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, marginBottom: 2, fontSize: 17 }}>{r.name}</div>
              <div style={{ color: '#555', marginBottom: 6, fontSize: 15 }}>{r.text}</div>
              {/* Звёзды */}
              {r.rating ? (
                <div style={{ display: 'flex', gap: 2, marginBottom: 4 }}>
                  {[1,2,3,4,5].map(star => (
                    <span key={star} style={{ fontSize: 18, color: star <= r.rating ? '#f7b500' : '#dbeafe', userSelect: 'none' }}>★</span>
                  ))}
                </div>
              ) : null}
              {/* Фото */}
              {r.image && (
                <img src={r.image.startsWith('http') ? r.image : `https://curtain-production.up.railway.app${r.image}`} alt="Фото отзыва" style={{ maxWidth: 120, maxHeight: 120, borderRadius: 10, margin: '6px 0' }} />
              )}
              <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{r.date}</div>
            </div>
            {altPressed && (
              <button
                onClick={() => handleDelete(r.id)}
                style={{ position: 'absolute', top: 10, right: 10, background: '#fff0f0', color: '#d32f2f', border: '1px solid #d32f2f', borderRadius: 6, padding: '0.3rem 0.7rem', fontWeight: 600, fontSize: 14, cursor: 'pointer', zIndex: 2 }}
              >
                {t.delete || 'Удалить'}
              </button>
            )}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
} 