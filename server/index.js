const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;

// Вставь сюда свой токен Telegram-бота и chat_id (куда отправлять заявки)
const TELEGRAM_TOKEN = '7857320725:AAGXrR03oYoktLmxX-3NgfyRTdHJWiO1Vfg';
const TELEGRAM_CHAT_ID = '-1002770049811';

const REVIEWS_PATH = path.join(__dirname, 'reviews.json');

const upload = multer({ dest: path.join(__dirname, 'uploads') });

const uri = 'mongodb+srv://etursynbek326:erasyl011206@erasyl.2jus818.mongodb.net/curtains?retryWrites=true&w=majority&appName=Erasyl';
let reviewsCollection;

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
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await reviewsCollection.find().sort({ _id: -1 }).toArray();
    res.json(reviews.map(r => ({ ...r, id: r._id })));
  } catch (err) {
    res.status(500).json({ error: 'Ошибка чтения отзывов' });
  }
});

// Добавить новый отзыв с поддержкой фото и рейтинга
app.post('/api/reviews', upload.single('image'), async (req, res) => {
  const { name, text, rating } = req.body;
  if (!name || !text) return res.status(400).json({ error: 'Имя и текст обязательны' });
  let image = null;
  if (req.file) {
    image = '/uploads/' + req.file.filename;
  }
  const newReview = {
    name,
    text,
    date: new Date().toLocaleDateString(),
    image,
    rating: rating ? Number(rating) : null
  };
  try {
    const result = await reviewsCollection.insertOne(newReview);
    res.json({ ...newReview, id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сохранения' });
  }
});

// Раздача загруженных файлов
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Удалить отзыв по id
app.delete('/api/reviews/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await reviewsCollection.deleteOne({ _id: new ObjectId(id) });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка удаления' });
  }
});

MongoClient.connect(uri, { useUnifiedTopology: true })
  .then(client => {
    const db = client.db('curtains');
    reviewsCollection = db.collection('reviews');
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }); 