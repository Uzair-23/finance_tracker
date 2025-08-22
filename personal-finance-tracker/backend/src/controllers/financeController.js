import Finance from '../models/financeModel.js';

export const getTransactions = async (req, res) => {
    try {
        const transactions = await Finance.find({});
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addTransaction = async (req, res) => {
    const transaction = new Finance(req.body);
    try {
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getBudgets = async (req, res) => {
    try {
        const budgets = await Finance.find({ type: 'budget' });
        res.status(200).json(budgets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBudget = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedBudget = await Finance.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedBudget);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};