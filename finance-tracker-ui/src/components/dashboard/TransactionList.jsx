import React from 'react';
import './TransactionList.css'; // Create this file next

const TransactionList = ({ transactions, onDelete }) => {
  if (transactions.length === 0) {
    return <p>No transactions yet.</p>;
  }

  return (
    <ul className="transaction-list">
      {transactions.map((t) => (
        <li key={t._id} className={`transaction-item ${t.type}`}>
          <div className="transaction-details">
            <span className="transaction-description">{t.description}</span>
            <span className="transaction-category">{t.category}</span>
          </div>
          <div className="transaction-actions">
            <span className={`transaction-amount ${t.type === 'income' ? 'income-text' : 'expense-text'}`}>
              {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
            </span>
            <button onClick={() => onDelete(t._id)} className="delete-btn">X</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;