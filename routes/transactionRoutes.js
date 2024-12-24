const express = require('express');
const Transaction = require('../models/Transaction');

const router = express.Router();

// Создание новой транзакции
router.post('/', async (req, res) => {
    const { amount, description, date, category, userId } = req.body;

    const newTransaction = new Transaction({
        amount,
        description,
        date,
        category,
        userId,
    });

    try {
        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Получение всех транзакций
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
