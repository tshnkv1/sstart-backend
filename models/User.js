const mongoose = require('mongoose');

// Определение схемы пользователя
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Создание модели на основе схемы
const User = mongoose.model('User', userSchema);

// Экспорт модели
module.exports = User;
