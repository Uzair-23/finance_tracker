// src/context/ExpenseContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from './AuthContext';

const ExpenseContext = createContext();

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    dateFrom: '',
    dateTo: '',
    paymentMethod: '',
  });

  const { isAuthenticated } = useAuth();

  const fetchExpenses = async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    try {
      const response = await api.get('/expenses', { params: filters });
      setExpenses(response.data);
    } catch (error) {
      console.error('Failed to fetch expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBudgets = async () => {
    if (!isAuthenticated) return;
    
    try {
      const response = await api.get('/budgets');
      setBudgets(response.data);
    } catch (error) {
      console.error('Failed to fetch budgets:', error);
    }
  };

  const addExpense = async (expenseData) => {
    try {
      const response = await api.post('/expenses', expenseData);
      setExpenses(prev => [response.data, ...prev]);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  };

  const updateExpense = async (id, expenseData) => {
    try {
      const response = await api.put(`/expenses/${id}`, expenseData);
      setExpenses(prev => 
        prev.map(expense => 
          expense._id === id ? response.data : expense
        )
      );
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  };

  const deleteExpense = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      setExpenses(prev => prev.filter(expense => expense._id !== id));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchExpenses();
      fetchBudgets();
    }
  }, [isAuthenticated, filters]);

  const value = {
    expenses,
    budgets,
    loading,
    filters,
    setFilters,
    fetchExpenses,
    fetchBudgets,
    addExpense,
    updateExpense,
    deleteExpense,
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};