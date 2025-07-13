import React, { useState } from 'react';
import { LangContext, translations } from './i18n';

const designs = {
  ru: ['Классика', 'Модерн', 'Минимализм', 'Лофт', 'Кантри'],
  kz: ['Классика', 'Модерн', 'Минимализм', 'Лофт', 'Кантри'],
};
const colors = {
  ru: ['Белый', 'Бежевый', 'Серый', 'Синий', 'Зелёный', 'Бордовый', 'Темно синий'],
  kz: ['Ақ','Қоныр-сарғыш', 'Сұр', 'Көк', 'Жасыл', 'Қызғылт қоңыр', 'Кою көк'],
};
const rooms = {
  ru: ['Гостиная', 'Спальня', 'Кухня', 'Детская', 'Кабинет'],
  kz: ['Қонақ бөлме', 'Жатын бөлме', 'Ас үй', 'Балалар', 'Кабинет'],
};

const products = [
  // id, name, price, design, color, room, desc (все с переводами)
  {
    id: 1,
    name: { ru: 'Шторы Классика', kz: 'Классика перделер' },
    price: 121280,
    design: { ru: 'Классика', kz: 'Классика' },
    color: { ru: 'Бежевый', kz: 'Қоныр-сарғыш' },
    room: { ru: 'Гостиная', kz: 'Қонақ бөлме' },
    desc: {
      ru: 'Классические шторы из плотной ткани, отлично подходят для гостиной.',
      kz: 'Тығыз матадан жасалған классикалық перделер, қонақ бөлмеге өте қолайлы.',
    },
    img: 'https://i.pinimg.com/736x/47/93/3d/47933da6273b0eab2d301c6554a4b39f.jpg',
  },
  { id: 2, name: { ru: 'Шторы Модерн', kz: 'Модерн перделер' }, price: 73280, design: { ru: 'Модерн', kz: 'Модерн' }, color: { ru: 'Серый', kz: 'Сұр' }, room: { ru: 'Спальня', kz: 'Жатын бөлме' }, desc: { ru: 'Современный стиль, легкая ткань, приятный серый оттенок.', kz: 'Қазіргі әлем, жеңіл мата, қолайлы сұр түс.' }, img: 'https://i.pinimg.com/1200x/7b/f3/a6/7bf3a637f51f3a76653b5745da456674.jpg' },
  { id: 3, name: { ru: 'Шторы Минимализм', kz: 'Минимализм перделер' }, price: 41480, design: { ru: 'Минимализм', kz: 'Минимализм' }, color: { ru: 'Белый', kz: 'Ақ' }, room: { ru: 'Кухня', kz: 'Ас үй' }, desc: { ru: 'Минималистичные белые шторы для кухни.', kz: 'Минималистикалық ақ перделер үйде.' }, img: 'https://i.pinimg.com/1200x/8a/90/78/8a9078e46d0062ab5088f36c82ef3b2e.jpg' },
  { id: 4, name: { ru: 'Шторы Лофт', kz: 'Лофт перделер' }, price: 121280, design: { ru: 'Лофт', kz: 'Лофт' }, color: { ru: 'Синий', kz: 'Көк' }, room: { ru: 'Кабинет', kz: 'Кабинет' }, desc: { ru: 'Стиль лофт, глубокий синий цвет, для кабинета.', kz: 'Лофт стилі, терең көк түс, кабинетке қолайлы.' }, img: 'https://i.pinimg.com/736x/23/ac/4e/23ac4eb4141b658a9a3648f19e29a1c7.jpg' },
  { id: 5, name: { ru: 'Шторы Кантри', kz: 'Кантри перделер' }, price: 43480, design: { ru: 'Кантри', kz: 'Кантри' }, color: { ru: 'Зелёный', kz: 'Жасыл' }, room: { ru: 'Детская', kz: 'Балалар' }, desc: { ru: 'Кантри для детской, мягкий зелёный оттенок.', kz: 'Балаларға кантри, қолайлы жасыл түс.' }, img: 'https://i.pinimg.com/736x/5c/58/dc/5c58dcef253a6bc9a390b48759203e9d.jpg' },
  { id: 6, name: { ru: 'Шторы Минимализм', kz: 'Минимализм перделер' }, price: 75000, design: { ru: 'Минимализм', kz: 'Минимализм' }, color: { ru: 'Бордовый', kz: 'Қызғылт қоңыр' }, room: { ru: 'Гостиная', kz: 'Қонақ бөлме' }, desc: { ru: 'Минимализм, бордовый цвет, для гостиной.', kz: 'Минимализм, бордовый түс, қонақ бөлмеге қолайлы.' }, img: 'https://i.pinimg.com/1200x/93/f0/b7/93f0b791193ba56b69d089bbe844d9b7.jpg' },
  { id: 7, name: { ru: 'Шторы Модерн', kz: 'Модерн перделер' }, price: 73300, design: { ru: 'Модерн', kz: 'Модерн' }, color: { ru: 'Бежевый', kz: 'Қоныр-сарғыш' }, room: { ru: 'Кухня', kz: 'Ас үй' }, desc: { ru: 'Модерн, бежевый цвет, для кухни.', kz: 'Модерн, беж түс, үйде қолайлы.' }, img: 'https://i.pinimg.com/736x/22/34/74/223474b88ebb187e1d494d919439e0b2.jpg' },
  { id: 8, name: { ru: 'Шторы Лофт', kz: 'Лофт перделер' }, price: 18000, design: { ru: 'Лофт', kz: 'Лофт' }, color: { ru: 'Серый', kz: 'Сұр' }, room: { ru: 'Спальня', kz: 'Жатын бөлме' }, desc: { ru: 'Лофт, серый цвет, для спальни.', kz: 'Лофт, сұр түс, жатын бөлмеге қолайлы.' }, img: 'https://i.pinimg.com/1200x/19/46/f1/1946f1c86c5999ebcc0258460b300010.jpg' },
  { id: 9, name: { ru: 'Шторы Классика', kz: 'Классика перделер' }, price: 130000, design: { ru: 'Классика', kz: 'Классика' }, color: { ru: 'Темно синий', kz: 'Кою көк' }, room: { ru: 'Гостиная', kz: 'Қонақ бөлме' }, desc: { ru: 'Классический стиль, плотная ткань, элегантные оттенки.', kz: 'Классикалық стиль, тығыз мата, элегантті түс.' }, img: 'https://i.pinimg.com/1200x/85/53/9a/85539adcfbff49c293e03791d4847933.jpg' },
  { id: 10, name: { ru: 'Шторы Классика', kz: 'Классика перделер' }, price: 18000, design: { ru: 'Классика', kz: 'Классика' }, color: { ru: 'Темно синий', kz: 'Кою көк' }, room: { ru: 'Гостиная', kz: 'Қонақ бөлме' }, desc: { ru: 'Классический стиль, плотная ткань, элегантные оттенки.', kz: 'Классикалық стиль, тығыз мата, элегантті түс.' }, img: 'https://i.pinimg.com/1200x/0a/b6/ed/0ab6edf4d15d78ceceb2f2cb348be1fb.jpg' },
  { id: 11, name: { ru: 'Шторы Классика', kz: 'Классика перделер' }, price: 18000, design: { ru: 'Классика', kz: 'Классика' }, color: { ru: 'Темно синий', kz: 'Кою көк' }, room: { ru: 'Гостиная', kz: 'Қонақ бөлме' }, desc: { ru: 'Классический стиль, плотная ткань, элегантные оттенки.', kz: 'Классикалық стиль, тығыз мата, элегантті түс.' }, img: 'https://i.pinimg.com/736x/67/0d/ac/670dac2e4bd0ef55f02f897ff218a15f.jpg' },
  { id: 12, name: { ru: 'Шторы Классика', kz: 'Классика перделер' }, price: 18000, design: { ru: 'Классика', kz: 'Классика' }, color: { ru: 'Темно синий', kz: 'Кою көк' }, room: { ru: 'Гостиная', kz: 'Қонақ бөлме' }, desc: { ru: 'Классический стиль, плотная ткань, элегантные оттенки.', kz: 'Классикалық стиль, тығыз мата, элегантті түс.' }, img: 'https://i.pinimg.com/1200x/5d/55/34/5d55348db2d8d449ec31da3ea46b7187.jpg' },
  { id: 13, name: { ru: 'Шторы Классика', kz: 'Классика перделер' }, price: 18000, design: { ru: 'Классика', kz: 'Классика' }, color: { ru: 'Темно синий', kz: 'Кою көк' }, room: { ru: 'Гостиная', kz: 'Қонақ бөлме' }, desc: { ru: 'Классический стиль, плотная ткань, элегантные оттенки.', kz: 'Классикалық стиль, тығыз мата, элегантті түс.' }, img: 'https://i.pinimg.com/736x/df/54/8a/df548aa57d097da900dfef68ab66b465.jpg' },
  { id: 14, name: { ru: 'Шторы Классика', kz: 'Классика перделер' }, price: 18000, design: { ru: 'Классика', kz: 'Классика' }, color: { ru: 'Темно синий', kz: 'Кою көк' }, room: { ru: 'Гостиная', kz: 'Қонақ бөлме' }, desc: { ru: 'Классический стиль, плотная ткань, элегантные оттенки.', kz: 'Классикалық стиль, тығыз мата, элегантті түс.' }, img: 'https://i.pinimg.com/1200x/d9/7c/b7/d97cb708e5a8639dd30dc909a47cbae8.jpg' },
  { id: 15, name: { ru: 'Шторы Классика', kz: 'Классика перделер' }, price: 18000, design: { ru: 'Классика', kz: 'Классика' }, color: { ru: 'Темно синий', kz: 'Кою көк' }, room: { ru: 'Гостиная', kz: 'Қонақ бөлме' }, desc: { ru: 'Классический стиль, плотная ткань, элегантные оттенки.', kz: 'Классикалық стиль, тығыз мата, элегантті түс.' }, img: 'https://i.pinimg.com/736x/7a/af/15/7aaf153788e7b03eeea120c61ddd2515.jpg' },
  { id: 16, name: { ru: 'Шторы Классика', kz: 'Классика перделер' }, price: 18000, design: { ru: 'Классика', kz: 'Классика' }, color: { ru: 'Темно синий', kz: 'Кою көк' }, room: { ru: 'Гостиная', kz: 'Қонақ бөлме' }, desc: { ru: 'Классический стиль, плотная ткань, элегантные оттенки.', kz: 'Классикалық стиль, тығыз мата, элегантті түс.' }, img: 'https://i.pinimg.com/1200x/32/c6/0f/32c60fa54e50c0ce70e9d71079be5389.jpg' },
  { id: 17, name: { ru: 'Шторы Классика', kz: 'Классика перделер' }, price: 18000, design: { ru: 'Классика', kz: 'Классика' }, color: { ru: 'Темно синий', kz: 'Кою көк' }, room: { ru: 'Гостиная', kz: 'Қонақ бөлме' }, desc: { ru: 'Классический стиль, плотная ткань, элегантные оттенки.', kz: 'Классикалық стиль, тығыз мата, элегантті түс.' }, img: 'https://i.pinimg.com/736x/5b/33/1a/5b331a552f15cdc777fbf4c6db130e07.jpg' },
];

function isMobile() {
  return window.innerWidth <= 700;
}

export default function Catalog() {
  const { lang } = React.useContext(LangContext);
  const t = translations[lang];
  const [filter, setFilter] = useState({ price: '', design: '', color: '', room: '' });
  const [openProduct, setOpenProduct] = useState(null);

  const filtered = products.filter(p => (
    (!filter.price || p.price <= Number(filter.price)) &&
    (!filter.design || p.design[lang] === filter.design) &&
    (!filter.color || p.color[lang] === filter.color) &&
    (!filter.room || p.room[lang] === filter.room)
  ));

  return (
    <>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <input type="number" placeholder={t.priceTo} value={filter.price} onChange={e => setFilter(f => ({ ...f, price: e.target.value }))} style={{ padding: '0.5rem', borderRadius: 6, border: '1px solid #ccc', minWidth: 120 }} />
        <select value={filter.design} onChange={e => setFilter(f => ({ ...f, design: e.target.value }))} style={{ padding: '0.5rem', borderRadius: 6, border: '1px solid #ccc' }}>
          <option value="">{t.design}</option>
          {designs[lang].map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={filter.color} onChange={e => setFilter(f => ({ ...f, color: e.target.value }))} style={{ padding: '0.5rem', borderRadius: 6, border: '1px solid #ccc' }}>
          <option value="">{t.color}</option>
          {colors[lang].map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filter.room} onChange={e => setFilter(f => ({ ...f, room: e.target.value }))} style={{ padding: '0.5rem', borderRadius: 6, border: '1px solid #ccc' }}>
          <option value="">{t.room}</option>
          {rooms[lang].map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>
      <div className="catalog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
        {filtered.length === 0 && <div>{t.noCurtains}</div>}
        {filtered.map(p => (
          <div key={p.id} className="card" style={{ cursor: 'pointer', position: 'relative', minHeight: 120 }} onClick={() => setOpenProduct(p)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img src={p.img} alt={p.name[lang]} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, boxShadow: '0 1px 4px rgba(44,62,80,0.07)' }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: 4 }}>{p.name[lang]}</div>
                <div>{t.design}: {p.design[lang]}</div>
                <div>{t.color}: {p.color[lang]}</div>
                <div>{t.room}: {p.room[lang]}</div>
                <div style={{ marginTop: 4, color: '#3a7bd5', fontWeight: 500 }}>{t.price}: {p.price} тг</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {openProduct && (
        <div className="gallery-modal" onClick={() => setOpenProduct(null)}>
          <div style={{ background: '#fff', borderRadius: 16, maxWidth: isMobile() ? '96vw' : 500, width: '100%', padding: 24, boxShadow: '0 8px 32px rgba(44,62,80,0.13)', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={e => e.stopPropagation()}>
            <img src={openProduct.img} alt={openProduct.name[lang]} style={{ width: '100%', maxWidth: 400, height: 'auto', objectFit: 'contain', borderRadius: 12, marginBottom: 18, background: '#f8fafd' }} />
            <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 8 }}>{openProduct.name[lang]}</div>
            <div style={{ marginBottom: 6 }}>{t.design}: {openProduct.design[lang]}</div>
            <div style={{ marginBottom: 6 }}>{t.color}: {openProduct.color[lang]}</div>
            <div style={{ marginBottom: 6 }}>{t.room}: {openProduct.room[lang]}</div>
            <div style={{ color: '#3a7bd5', fontWeight: 500, marginBottom: 10 }}>{t.price}: {openProduct.price} тг</div>
            <div style={{ color: '#23272f', fontSize: 15, marginBottom: 10 }}>{openProduct.desc[lang]}</div>
            <button onClick={() => setOpenProduct(null)} style={{ marginTop: 8, background: '#eaf1fb', color: '#3a7bd5', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.7rem 1.2rem', fontSize: 16, cursor: 'pointer' }}>Закрыть</button>
          </div>
        </div>
      )}
    </>
  );
} 