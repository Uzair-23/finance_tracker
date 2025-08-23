import React, { useState } from 'react';
import { useData } from '../context/DataContext.jsx';

const AddTransaction = () => {
  const { addTransaction } = useData();
  const [type, setType] = useState('income');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10));

  const submit = (e) => {
    e.preventDefault();
    if (!category || !amount || !date) return;
    addTransaction({ type, category, amount: Number(amount), date });
    setCategory('');
    setAmount('');
    alert('Transaction added');
  };

  return (
    <div className="content">
      <div className="card form-card">
        <h3>Add Transaction</h3>
        <form onSubmit={submit} className="form">
          <label>Type</label>
          <select value={type} onChange={e=>setType(e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <label>Category</label>
          <input value={category} onChange={e=>setCategory(e.target.value)} placeholder="e.g., Salary, Rent, Food" required />

          <label>Amount</label>
          <input type="number" step="0.01" value={amount} onChange={e=>setAmount(e.target.value)} required />

          <label>Date</label>
          <input type="date" value={date} onChange={e=>setDate(e.target.value)} required />

          <button type="submit" className="btn primary">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
