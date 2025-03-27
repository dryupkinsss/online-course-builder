const express = require('express');
const app = express();
const port = 3000;

// Пример маршрута
app.get('/', (req, res) => {
  res.send('Привет, мир!');
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});