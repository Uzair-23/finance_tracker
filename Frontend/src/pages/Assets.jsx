import React, { useState } from 'react';
import { useData } from '../context/DataContext.jsx';

const Assets = () => {
  const { assets, addAsset, removeAsset } = useData();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!name || !amount) return;
    addAsset({ name, amount: Number(amount) });
    setName('');
    setAmount('');
  };

  return (
    <div className="content">
      <div className="grid-2">
        <div className="card form-card">
          <h3>Add Asset</h3>
          <form onSubmit={submit} className="form">
            <label>Name</label>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g., Savings, Stocks" required />
            <label>Amount</label>
            <input type="number" step="0.01" value={amount} onChange={e=>setAmount(e.target.value)} required />
            <button className="btn primary" type="submit">Add Asset</button>
          </form>
        </div>

        <div className="card list">
          <h3>Assets</h3>
          {assets.length === 0 ? (
            <p>No assets added yet.</p>
          ) : (
            <ul>
              {assets.map((a, i) => (
                <li key={i}>
                  <span className="pill neutral">ASSET</span>
                  <span>{a.name}</span>
                  <span>₹{Number(a.amount).toFixed(2)}</span>
                  <button className="btn danger sm" onClick={()=>removeAsset(i)}>Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assets;
