const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Регистрация
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Проверка существования пользователя
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'Пользователь уже существует' });
  }

  // Хеширование пароля
  const hashedPassword = await bcrypt.hash(password, 10);

  // Создание нового пользователя
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
});

// Вход
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Поиск пользователя
  const user = await User.findOne({ username });
  if (!user) {
    return res
      .status(400)
      .json({ message: 'Неверное имя пользователя или пароль' });
  }

  // Проверка пароля
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ message: 'Неверное имя пользователя или пароль' });
  }

  // Создание JWT
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ token });
});

module.exports = router;
