import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const DataContext = createContext(undefined);

export const DataProvider = ({ children }) => {
  const [month, setMonth] = useState(new Date().getMonth() + 1); // 1..12
  const [transactions, setTransactions] = useState([]);
  const [assets, setAssets] = useState([]);
  const [goal, setGoal] = useState(0);

  useEffect(() => {
    setTransactions(JSON.parse(localStorage.getItem('ft_transactions') || '[]'));
    setAssets(JSON.parse(localStorage.getItem('ft_assets') || '[]'));
    setGoal(Number(localStorage.getItem('ft_goal') || 0));
  }, []);

  useEffect(() => {
    localStorage.setItem('ft_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('ft_assets', JSON.stringify(assets));
  }, [assets]);

  useEffect(() => {
    localStorage.setItem('ft_goal', String(goal || 0));
  }, [goal]);

  const addTransaction = (t) => {
    // t: {type: 'income'|'expense', amount: number, category: string, date: 'YYYY-MM-DD'}
    const d = new Date(t.date);
    const m = d.getMonth() + 1;
    setTransactions(prev => [...prev, { ...t, month: m }]);
  };

  const addAsset = (a) => {
    // a: {name, amount}
    setAssets(prev => [...prev, a]);
  };

  const removeTransaction = (idx) => {
    setTransactions(prev => prev.filter((_, i) => i !== idx));
  };

  const removeAsset = (idx) => {
    setAssets(prev => prev.filter((_, i) => i !== idx));
  };

  const clearAll = () => {
    setTransactions([]);
    setAssets([]);
    setGoal(0);
  };

  const filteredTx = useMemo(() => transactions.filter(t => t.month === month), [transactions, month]);
  const income = useMemo(() => filteredTx.filter(t => t.type === 'income').reduce((s,t)=>s + Number(t.amount||0), 0), [filteredTx]);
  const expenses = useMemo(() => filteredTx.filter(t => t.type === 'expense').reduce((s,t)=>s + Number(t.amount||0), 0), [filteredTx]);
  const balance = income - expenses;
  const netWorth = useMemo(() => assets.reduce((s,a)=>s + Number(a.amount||0), 0), [assets]);

  // Previous month metrics for trends
  const prevMonth = useMemo(() => (month === 1 ? 12 : month - 1), [month]);
  const prevTx = useMemo(() => transactions.filter(t => t.month === prevMonth), [transactions, prevMonth]);
  const prevIncome = useMemo(() => prevTx.filter(t => t.type === 'income').reduce((s,t)=>s + Number(t.amount||0), 0), [prevTx]);
  const prevExpenses = useMemo(() => prevTx.filter(t => t.type === 'expense').reduce((s,t)=>s + Number(t.amount||0), 0), [prevTx]);
  const prevBalance = prevIncome - prevExpenses;
  const savingsRate = income > 0 ? (balance / income) * 100 : 0;
  const prevSavingsRate = prevIncome > 0 ? (prevBalance / prevIncome) * 100 : 0;

  const incomeBreakdown = useMemo(() => {
    const map = {};
    filteredTx.filter(t => t.type === 'income').forEach(t => {
      map[t.category] = (map[t.category] || 0) + Number(t.amount || 0);
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [filteredTx]);

  const expenseByCategory = useMemo(() => {
    const map = {};
    filteredTx.filter(t => t.type === 'expense').forEach(t => {
      map[t.category] = (map[t.category] || 0) + Number(t.amount || 0);
    });
    return Object.entries(map).map(([category, amount]) => ({ category, amount }));
  }, [filteredTx]);

  return (
    <DataContext.Provider
      value={{
        month, setMonth,
        transactions, addTransaction, removeTransaction,
        assets, addAsset, removeAsset,
        goal, setGoal,
        income, expenses, balance, netWorth,
        prevIncome, prevExpenses, prevBalance,
        savingsRate, prevSavingsRate,
        incomeBreakdown, expenseByCategory,
        filteredTx, clearAll
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
