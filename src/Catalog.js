import React, { useState } from 'react';
import { LangContext, translations } from './i18n';

const designs = {
  ru: ['Классика', 'Модерн', 'Минимализм', 'Лофт', 'Кантри'],
  kz: ['Классика', 'Модерн', 'Минимализм', 'Лофт', 'Кантри'],
};
const colors = {
  ru: ['Белый', 'Бежевый', 'Серый', 'Синий', 'Зелёный', 'Бордовый', 'Темно синий', 'Серо-голубой'],
  kz: ['Ақ','Қоныр-сарғыш', 'Сұр', 'Көк', 'Жасыл', 'Қызғылт қоңыр', 'Кою көк', 'Сұр-көк'],
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
  { id: 10, name: { ru: 'Шторы Минимализм', kz: 'Минимализм перделер' }, price: 18500, design: { ru: 'Минимализм', kz: 'Минимализм' }, color: { ru: 'Бежевый', kz: 'Қоңыр-сарғыш' }, room: { ru: 'Кухня', kz: 'Ас үй' }, desc: { ru: 'Шторы идеально вписываются в просторное помещение с мягкой мебелью,создают атмосферу уюта и света.', kz: 'Перделер жұмсақ жиһаздары бар кең бөлмеге керемет үйлеседі,жайлылық пен жарықтың атмосферасын жасайды.' }, img: 'https://i.pinimg.com/1200x/0a/b6/ed/0ab6edf4d15d78ceceb2f2cb348be1fb.jpg' },
  { id: 11, name: { ru: 'Шторы Классика', kz: 'Классика перделер' }, price: 180000, design: { ru: 'Классика', kz: 'Классика' }, color: { ru: 'Серо-голубой', kz: 'сұр-көк' }, room: { ru: 'Гостиная', kz: 'Қонақ бөлме' }, desc: { ru: 'Идеально для гостиной - создает уют, торжественность и визуальное утяжеление интерьера.', kz: 'Қонақ бөлме үшін өте қолайлы - интерьердің жайлылығын,салтанатты және көрнекті етіп көрсетеді.' }, img: 'https://i.pinimg.com/736x/67/0d/ac/670dac2e4bd0ef55f02f897ff218a15f.jpg' },
  { id: 12, name: { ru: 'Шторы Модерн', kz: 'Модерн перделер' }, price: 73280, design: { ru: 'Модерн', kz: 'модерн' }, color: { ru: 'Молочный', kz: 'Сүтті' }, room: { ru: 'Спальный,Гостиная', kz: 'Жатын бөлме,Қонақ бөлме' }, desc: { ru: 'Подчеркивают высоту потолка, делают помещение торжественным, но легким.', kz: 'Төбенің биіктігін айқындайды,бөлмені салтанатты бірақ,жеңіл етіп көрсетеді.' }, img: 'https://i.pinimg.com/1200x/5d/55/34/5d55348db2d8d449ec31da3ea46b7187.jpg' },
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
  // Мультивыбор: массивы для каждого фильтра
  const [filter, setFilter] = useState({ price: '', designs: [], colors: [], rooms: [] });
  const [openProduct, setOpenProduct] = useState(null);

  // Фильтрация с мультивыбором
  const filtered = products.filter(p => (
    (!filter.price || p.price <= Number(filter.price)) &&
    (filter.designs.length === 0 || filter.designs.includes(p.design[lang])) &&
    (filter.colors.length === 0 || filter.colors.includes(p.color[lang])) &&
    (filter.rooms.length === 0 || filter.rooms.includes(p.room[lang]))
  ));

  // Обработчики чекбоксов
  const handleCheckbox = (type, value) => {
    setFilter(f => {
      const arr = f[type];
      return {
        ...f,
        [type]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value]
      };
    });
  };

  // Сброс фильтров
  const resetFilters = () => setFilter({ price: '', designs: [], colors: [], rooms: [] });

  return (
    <>
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ minWidth: 140 }}>
          <input type="number" placeholder={t.priceTo} value={filter.price} onChange={e => setFilter(f => ({ ...f, price: e.target.value }))} style={{ padding: '0.5rem', borderRadius: 6, border: '1px solid #ccc', width: '100%' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>{t.design}</div>
          {designs[lang].map(d => (
            <label key={d} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 15 }}>
              <input type="checkbox" checked={filter.designs.includes(d)} onChange={() => handleCheckbox('designs', d)} />
              {d}
            </label>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>{t.color}</div>
          {colors[lang].map(c => (
            <label key={c} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 15 }}>
              <input type="checkbox" checked={filter.colors.includes(c)} onChange={() => handleCheckbox('colors', c)} />
              {c}
            </label>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>{t.room}</div>
          {rooms[lang].map(r => (
            <label key={r} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 15 }}>
              <input type="checkbox" checked={filter.rooms.includes(r)} onChange={() => handleCheckbox('rooms', r)} />
              {r}
            </label>
          ))}
        </div>
        <button onClick={resetFilters} style={{ height: 40, alignSelf: 'flex-end', background: '#f5f7fa', color: '#3a7bd5', border: '1px solid #c3d0e8', borderRadius: 8, padding: '0 18px', fontWeight: 600, cursor: 'pointer', marginLeft: 12 }}>Сбросить</button>
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
          <div style={{ background: '#fff', borderRadius: 16, maxWidth: isMobile() ? '96vw' : 500, width: '100%', padding: 24, boxShadow: '0 8px 32px rgba(44,62,80,0.13)', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', maxHeight: isMobile() ? '90vh' : 600, overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <img src={openProduct.img} alt={openProduct.name[lang]} style={{ width: '100%', maxWidth: 400, height: 'auto', maxHeight: 300, objectFit: 'contain', borderRadius: 12, marginBottom: 18, background: '#f8fafd' }} />
            <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 8 }}>{openProduct.name[lang]}</div>
            <div style={{ marginBottom: 6 }}>{t.design}: {openProduct.design[lang]}</div>
            <div style={{ marginBottom: 6 }}>{t.color}: {openProduct.color[lang]}</div>
            <div style={{ marginBottom: 6 }}>{t.room}: {openProduct.room[lang]}</div>
            <div style={{ color: '#3a7bd5', fontWeight: 500, marginBottom: 10 }}>{t.price}: {openProduct.price} тг</div>
            <div style={{ color: '#23272f', fontSize: 15, marginBottom: 24 }}>{openProduct.desc[lang]}</div>
            <button onClick={() => setOpenProduct(null)} style={{ marginTop: 'auto', background: '#eaf1fb', color: '#3a7bd5', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.7rem 1.2rem', fontSize: 16, cursor: 'pointer' }}>Закрыть</button>
          </div>
        </div>
      )}
    </>
  );
} 