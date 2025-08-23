import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import TransactionForm from '../components/dashboard/TransactionForm';
import TransactionList from '../components/dashboard/TransactionList';
import { getTransactions, addTransaction, deleteTransaction } from '../services/api';
import './DashboardPage.css'; // We will create this file

const DashboardPage = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const response = await getTransactions();
      setTransactions(response.data);
    } catch (err) {
      toast.error('Could not fetch transactions.');
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAddTransaction = async (transaction) => {
    try {
      await addTransaction(transaction);
      fetchTransactions(); // Re-fetch to update the list
      toast.success('Transaction added!');
    } catch (err) {
      toast.error('Failed to add transaction.');
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await deleteTransaction(id);
      fetchTransactions(); // Re-fetch to update the list
      toast.success('Transaction deleted!');
    } catch (err) {
      toast.error('Failed to delete transaction.');
    }
  };

  // Calculate totals for summary
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);
  
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);
    
  const balance = totalIncome - totalExpense;

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="summary-cards">
        <div className="card income-card">
          <h3>Total Income</h3>
          <p className="income-text">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="card expense-card">
          <h3>Total Expense</h3>
          <p className="expense-text">${totalExpense.toFixed(2)}</p>
        </div>
        <div className="card balance-card">
          <h3>Balance</h3>
          <p>${balance.toFixed(2)}</p>
        </div>
      </div>
      <div className="dashboard-main">
        <div className="transaction-form-container">
          <h3>Add New Transaction</h3>
          <TransactionForm onSubmit={handleAddTransaction} />
        </div>
        <div className="transaction-list-container">
          <h3>Transaction History</h3>
          <TransactionList transactions={transactions} onDelete={handleDeleteTransaction} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;