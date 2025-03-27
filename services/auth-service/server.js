const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/course-builder');

// Модель пользователя
const User = mongoose.model('User', {
  username: String,
  password: String,
});

// Регистрация пользователя
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.json({ message: 'Пользователь зарегистрирован', username });
});

// Аутентификация пользователя
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: 'Пользователь не найден' });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Неверный пароль' });
  }
  const token = jwt.sign({ username: user.username }, 'secret_key', { expiresIn: '1h' });
  res.json({ message: 'Успешный вход', token });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервис авторизации запущен на http://localhost:${port}`);
});