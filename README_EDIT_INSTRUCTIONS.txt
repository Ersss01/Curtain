# Инструкция по изменению сайта "Продажа штор"

## 1. Как изменить товары в каталоге
- Открой файл `src/Catalog.js`
- Найди массив `products` (каждый товар — это объект)
- Чтобы добавить товар, скопируй любой объект и измени значения (название, цену, цвет, ссылку на фото и т.д.)
- Чтобы изменить фото, поменяй ссылку в поле `img`

## 2. Как изменить галерею
- Открой файл `src/Gallery.js`
- Найди массив `images`
- Добавь или удали ссылки на фото по своему желанию

## 3. Как изменить отзывы
- Отзывы можно добавлять прямо на сайте через форму
- Чтобы удалить или изменить отзыв вручную, открой файл `server/reviews.json` и отредактируй его (каждый отзыв — это объект)

## 4. Как изменить дизайн
- Открой файл `src/App.css`
- Меняй цвета, шрифты, отступы, стили кнопок и блоков
- Для более сложных изменений — редактируй компоненты в папке `src` (`App.js`, `Catalog.js`, `OrderForm.js` и т.д.)

## 5. Как запустить сайт
### Фронтенд (React)
1. Открой терминал в папке `curtains-shop`
2. Выполни команду:
   npm start
3. Открой сайт в браузере: http://localhost:3000

### Сервер (backend)
1. Открой терминал в папке `curtains-shop/server`
2. Выполни команду:
   node index.js
3. Сервер должен запуститься на порту 5000

## 6. Если что-то не работает
- Проверь, что оба сервера (React и backend) запущены
- Проверь, что файлы сохранены
- Если появляется ошибка — скопируй её и обратись за помощью

---

**Если хочешь добавить новые функции, изменить структуру или дизайн — просто напиши, и я помогу!** 