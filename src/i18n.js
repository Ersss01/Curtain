import React, { createContext, useState } from 'react';

export const translations = {
  ru: {
    name: 'Ваше имя',
    phone: 'Телефон',
    comment: 'Комментарий (например, какие шторы интересуют)',
    ownDesign: 'Хочу свой дизайн (индивидуальный проект)',
    submit: 'Отправить заявку',
    thankYou: 'Спасибо! Мы свяжемся с вами в ближайшее время.',
    error: 'Не удалось отправить заявку. Попробуйте позже.',
    lang: 'Русский',
    switch: 'KZ',
    catalog: 'Каталог',
    gallery: 'Галерея',
    reviews: 'Отзывы',
    order: 'Заказ',
    catalogTitle: 'Каталог штор',
    galleryTitle: 'Галерея',
    reviewsTitle: 'Отзывы',
    orderTitle: 'Заказать шторы',
    priceTo: 'Цена до, тг',
    design: 'Дизайн',
    color: 'Цвет',
    room: 'Комната',
    price: 'Цена',
    noCurtains: 'Нет подходящих штор',
    clickToCollapse: 'Нажмите ещё раз, чтобы свернуть',
    color_bordo: 'Бордовый',
    color_beige: 'Бежевый',
  },
  kz: {
    name: 'Атыңыз',
    phone: 'Телефон',
    comment: 'Пікір (мысалы, қандай перде қызықтырады)',
    ownDesign: 'Өз дизайнымды қалаймын (жеке жоба)',
    submit: 'Өтінімді жіберу',
    thankYou: 'Рақмет! Біз сізбен жақын арада хабарласамыз.',
    error: 'Өтінімді жіберу мүмкін болмады. Кейінірек қайталап көріңіз.',
    lang: 'Қазақша',
    switch: 'RU',
    catalog: 'Каталог',
    gallery: 'Галерея',
    reviews: 'Пікірлер',
    order: 'Тапсырыс',
    catalogTitle: 'Перде каталогы',
    galleryTitle: 'Галерея',
    reviewsTitle: 'Пікірлер',
    orderTitle: 'Перде тапсырыс беру',
    priceTo: 'Бағасы, тг дейін',
    design: 'Дизайн',
    color: 'Түс',
    room: 'Бөлме',
    price: 'Бағасы',
    noCurtains: 'Сәйкес перде табылмады',
    clickToCollapse: 'Жабу үшін қайта басыңыз',
    color_bordo: 'Қызғылт қоңыр',
    color_beige: 'Қоныр-сарғыш',
  },
};

export const LangContext = createContext({ lang: 'ru', setLang: () => {} });

export function LangProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'ru');
  const changeLang = l => {
    setLang(l);
    localStorage.setItem('lang', l);
  };
  return (
    <LangContext.Provider value={{ lang, setLang: changeLang }}>
      {children}
    </LangContext.Provider>
  );
} 