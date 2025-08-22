const express = require('express');
const router = express.Router();
const financeController = require('../controllers/financeController');

// Route to get all transactions
router.get('/transactions', financeController.getAllTransactions);

// Route to create a new transaction
router.post('/transactions', financeController.createTransaction);

// Route to get all budgets
router.get('/budgets', financeController.getAllBudgets);

// Route to create a new budget
router.post('/budgets', financeController.createBudget);

// Route to get a specific transaction by ID
router.get('/transactions/:id', financeController.getTransactionById);

// Route to update a specific transaction by ID
router.put('/transactions/:id', financeController.updateTransactionById);

// Route to delete a specific transaction by ID
router.delete('/transactions/:id', financeController.deleteTransactionById);

module.exports = router;