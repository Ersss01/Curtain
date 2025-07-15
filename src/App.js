import React, { useContext } from 'react';
import './App.css';
import Gallery from './Gallery';
import Reviews from './Reviews';
import OrderForm from './OrderForm';
import Catalog from './Catalog';
import { LangContext, translations } from './i18n';

function scrollToSection(e, id) {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

function App() {
  const { lang } = useContext(LangContext);
  const t = translations[lang];
  return (
    <div className="App">
      {/* Hero-секция */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">{t.heroTitle || 'Шторы для уюта и стиля вашего дома'}</h1>
          <div className="hero-subtitle">{t.heroSubtitle || 'Большой выбор, индивидуальный подход, быстрая доставка по Казахстану.'}</div>
          <button className="hero-btn" onClick={e => scrollToSection(e, 'catalog')}>
            {t.heroBtn || 'Перейти в каталог'}
          </button>
        </div>
      </section>
      {/* Блок преимуществ */}
      <section className="benefits-section">
        <div className="benefits-list">
          <div className="benefit-item">
            <span className="benefit-icon" role="img" aria-label="measure">📏</span>
            <span className="benefit-text">Бесплатный замер</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon" role="img" aria-label="delivery">🚚</span>
            <span className="benefit-text">Доставка по Казахстану</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon" role="img" aria-label="quality">✅</span>
            <span className="benefit-text">Гарантия качества</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon" role="img" aria-label="design">🎨</span>
            <span className="benefit-text">Индивидуальный дизайн</span>
          </div>
        </div>
      </section>
      <nav className="App-nav">
        <ul>
          <li><a href="#catalog" onClick={e => scrollToSection(e, 'catalog')}>{t.catalog}</a></li>
          <li><a href="#gallery" onClick={e => scrollToSection(e, 'gallery')}>{t.gallery}</a></li>
          <li><a href="#reviews" onClick={e => scrollToSection(e, 'reviews')}>{t.reviews}</a></li>
          <li><a href="#order" onClick={e => scrollToSection(e, 'order')}>{t.order}</a></li>
        </ul>
      </nav>
      {/* Здесь будут разделы сайта */}
      <section id="catalog">
        <h2>{t.catalogTitle}</h2>
        <Catalog />
      </section>
      <section id="gallery">
        <h2>{t.galleryTitle}</h2>
        <Gallery />
      </section>
      <section id="reviews">
        <h2>{t.reviewsTitle}</h2>
        <Reviews />
      </section>
      <section id="order">
        <h2>{t.orderTitle}</h2>
        <OrderForm />
      </section>
    </div>
  );
}

export default App;
