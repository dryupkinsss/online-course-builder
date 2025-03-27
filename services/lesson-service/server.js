const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3003;

app.use(cors());
app.use(express.json());

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/course-builder');

// Модель урока
const Lesson = mongoose.model('Lesson', {
  title: String,
  content: String,
  courseId: String,
});

// Создание урока
app.post('/lessons', async (req, res) => {
  const { title, content, courseId } = req.body;
  const lesson = new Lesson({ title, content, courseId });
  await lesson.save();
  res.json({ message: 'Урок создан', lesson });
});

// Получение уроков по ID курса
app.get('/lessons/:courseId', async (req, res) => {
  const lessons = await Lesson.find({ courseId: req.params.courseId });
  res.json(lessons);
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервис управления уроками запущен на http://localhost:${port}`);
});