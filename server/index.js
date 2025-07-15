const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;

// Вставь сюда свой токен Telegram-бота и chat_id (куда отправлять заявки)
const TELEGRAM_TOKEN = '7857320725:AAGXrR03oYoktLmxX-3NgfyRTdHJWiO1Vfg';
const TELEGRAM_CHAT_ID = '-1002770049811';

const REVIEWS_PATH = path.join(__dirname, 'reviews.json');

const upload = multer({ dest: path.join(__dirname, 'uploads') });

app.use(cors());
app.use(express.json());

app.post('/api/order', async (req, res) => {
  const { name, phone, comment, ownDesign } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: 'Имя и телефон обязательны' });
  }
  let text = `🛒 Новая заявка на шторы!\nИмя: ${name}\nТелефон: ${phone}\nКомментарий: ${comment || '-'}\n`;
  if (ownDesign) {
    text += 'Услуга: Свой дизайн (индивидуальный проект)\n';
  }
  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text,
    });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'Ошибка отправки в Telegram' });
  }
});

// Получить все отзывы
app.get('/api/reviews', (req, res) => {
  fs.readFile(REVIEWS_PATH, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Ошибка чтения отзывов' });
    try {
      const reviews = JSON.parse(data);
      res.json(reviews);
    } catch {
      res.json([]);
    }
  });
});

// Добавить новый отзыв с поддержкой фото и рейтинга
app.post('/api/reviews', upload.single('image'), (req, res) => {
  const { name, text, rating } = req.body;
  if (!name || !text) return res.status(400).json({ error: 'Имя и текст обязательны' });
  fs.readFile(REVIEWS_PATH, 'utf8', (err, data) => {
    let reviews = [];
    if (!err) {
      try { reviews = JSON.parse(data); } catch {}
    }
    let image = null;
    if (req.file) {
      image = '/uploads/' + req.file.filename;
    }
    const newReview = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      name,
      text,
      date: new Date().toLocaleDateString(),
      image,
      rating: rating ? Number(rating) : null
    };
    reviews.unshift(newReview);
    fs.writeFile(REVIEWS_PATH, JSON.stringify(reviews, null, 2), err2 => {
      if (err2) return res.status(500).json({ error: 'Ошибка сохранения' });
      res.json(newReview);
    });
  });
});

// Раздача загруженных файлов
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Удалить отзыв по id
app.delete('/api/reviews/:id', (req, res) => {
  const id = req.params.id;
  fs.readFile(REVIEWS_PATH, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Ошибка чтения отзывов' });
    let reviews = [];
    try { reviews = JSON.parse(data); } catch {}
    const newReviews = reviews.filter(r => String(r.id) !== String(id));
    fs.writeFile(REVIEWS_PATH, JSON.stringify(newReviews, null, 2), err2 => {
      if (err2) return res.status(500).json({ error: 'Ошибка сохранения' });
      res.json({ success: true });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
}); 