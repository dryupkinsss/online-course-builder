const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/course-builder');

// Модель курса
const Course = mongoose.model('Course', {
  title: String,
  description: String,
  author: String,
});

// Создание курса
app.post('/courses', async (req, res) => {
  const { title, description, author } = req.body;
  const course = new Course({ title, description, author });
  await course.save();
  res.json({ message: 'Курс создан', course });
});

// Получение списка курсов
app.get('/courses', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервис управления курсами запущен на http://localhost:${port}`);
});