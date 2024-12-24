const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Получаем токен из заголовка

  if (!token) {
    return res.status(401).json({ message: 'Нет авторизации' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Сохраняем информацию о пользователе
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Неверный токен' });
  }
};

module.exports = auth;
