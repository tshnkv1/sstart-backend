require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const developerRoutes = require('./routes/developerInfo');
const cors = require('cors');

const app = express();

// Middleware
// Настройка CORS
const corsOptions = {
  origin: ["http://localhost:3000", "https://sstart-frontend.vercel.app"], // Разрешённые источники
  methods: ["GET", "POST", "PUT", "DELETE"], // Разрешённые методы
  allowedHeaders: ["Content-Type", "Authorization"], // Разрешённые заголовки
};

app.use(cors(corsOptions));
app.use(express.json());

// Подключение к MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// auth
app.use('/api/auth', authRoutes);

// developer-info
app.use('/api/developer-info', developerRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;