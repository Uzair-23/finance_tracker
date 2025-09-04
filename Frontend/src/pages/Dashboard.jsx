import React from 'react';
import { useData } from '../context/DataContext.jsx';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const COLORS = ['#4CAF50', '#F44336', '#2196F3', '#FF9800', '#9C27B0', '#00BCD4'];

const Dashboard = () => {
  const { income, expenses, balance, netWorth, goal, setGoal, filteredTx, incomeBreakdown, expenseByCategory } = useData();

  const pieData = [
    { name: 'Income', value: income },
    { name: 'Expenses', value: expenses }
  ];

  const hasData = filteredTx.length > 0;

  return (
    <div className="content">
      {!hasData && (
        <div className="empty">
          <h2>No data yet</h2>
          <p>Please add transactions to see your dashboard.</p>
        </div>
      )}

      {hasData && (
        <>
          <section className="cards">
            <div className="card stat">
              <div className="stat-title">Income</div>
              <div className="stat-value">₹{income.toFixed(2)}</div>
            </div>
            <div className="card stat">
              <div className="stat-title">Spendings</div>
              <div className="stat-value">₹{expenses.toFixed(2)}</div>
            </div>
            <div className="card stat">
              <div className="stat-title">Balance</div>
              <div className="stat-value">₹{balance.toFixed(2)}</div>
            </div>
            <div className="card stat">
              <div className="stat-title">Total Net Worth</div>
              <div className="stat-value">₹{netWorth.toFixed(2)}</div>
            </div>
            <div className="card goal">
              <div className="stat-title">Savings Goal</div>
              <input
                className="goal-input"
                type="number"
                placeholder="Set monthly goal"
                value={goal || ''}
                onChange={(e)=>setGoal(Number(e.target.value || 0))}
              />
            </div>
          </section>

          <section className="grid-2">
            <div className="card chart">
              <h3>Income vs Expenses</h3>
              <PieChart width={360} height={260}>
                <Pie data={pieData} cx={180} cy={120} innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>

            <div className="card chart">
              <h3>Spending by Category</h3>
              <BarChart width={480} height={260} data={expenseByCategory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" />
              </BarChart>
            </div>
          </section>

          <section className="card list">
            <h3>Recent Transactions</h3>
            <ul>
              {filteredTx.slice().reverse().map((t, i) => (
                <li key={i}>
                  <span className={t.type === 'income' ? 'pill income' : 'pill expense'}>{t.type}</span>
                  <span>{t.category}</span>
                  <span>₹{Number(t.amount).toFixed(2)}</span>
                  <span>{t.date}</span>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
};

export default Dashboard;
