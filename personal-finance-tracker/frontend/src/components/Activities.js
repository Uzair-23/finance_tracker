import React from 'react';

const Activities = ({ transactions }) => {
    return (
        <div className="activities">
            <h2>Latest Transactions</h2>
            <ul>
                {transactions.map((transaction, index) => (
                    <li key={index} className={`transaction ${transaction.type}`}>
                        <span>{transaction.date}</span>
                        <span>{transaction.description}</span>
                        <span>${transaction.amount.toFixed(2)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Activities;