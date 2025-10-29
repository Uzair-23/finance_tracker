import React, { useEffect, useMemo, useState } from 'react';
// Re-enabling the REAL DataContext import and removing the mock
import { useData } from '../context/DataContext.jsx';
import './Dashboard.css'; 
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const COLORS = ['#10B981', '#EF4444', '#3B82F6', '#F59E0B', '#8B5CF6', '#EC4899']; // Green, Red, Blue...

// Helper function to format currency
const formatCurrency = (amount) => `₹${Number(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

const Dashboard = () => {
  // This hook will now pull REAL data from your context
  const { income, expenses, balance, netWorth, goal, setGoal, filteredTx, expenseByCategory, prevIncome, prevExpenses, prevBalance, savingsRate, prevSavingsRate } = useData();
  
  const [salary, setSalary] = useState(0); // Kept component state
  const [savings, setSavings] = useState(0); // Kept component state
  const [risk, setRisk] = useState(null);
  const [loadingRisk, setLoadingRisk] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSug, setLoadingSug] = useState(false);

  // Restore the backendUrl logic
  const backendUrl = useMemo(() => (
    import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'
  ), []);

  useEffect(() => {
    // Update local state when real context data changes
    setSalary(income);
    setSavings(Math.max(0, balance));
  }, [income, balance]);

  // Restore original API call logic
  const evaluateRisk = async () => {
    try {
      setLoadingRisk(true);
      
      // Check if current savings are below the user's defined goal
      if (savings < goal) {
         setRisk({
            inRisk: true,
            message: `⚠️ **Warning:** Your submitted monthly savings (₹${savings.toLocaleString()}) is less than your Savings Goal (₹${goal.toLocaleString()}). Adjust your budget or increase savings.`
         });
         setLoadingRisk(false);
         return; // Stop evaluation if they fail their own goal
      }
      
      // Proceed with API call if they meet their goal
      const res = await fetch(`${backendUrl}/api/risk/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ salary: Number(salary), savings: Number(savings) })
      });
      const data = await res.json();
      
      // Combine API result with goal check (if API logic is generic)
      // Or just use the API response
      setRisk(data); 

    } catch (e) {
      setRisk({ error: 'Failed to evaluate risk. Please try again.' });
    } finally {
      setLoadingRisk(false);
    }
  };

  // Restore original API call logic
  const fetchSuggestions = async () => {
    try {
      setLoadingSug(true);
      const res = await fetch(`${backendUrl}/api/investments/suggestions`);
      const data = await res.json();
      setSuggestions(data?.suggestions || []);
    } catch (e) {
      setSuggestions([]);
    } finally {
      setLoadingSug(false);
    }
  };

  // Function to handle the Savings Goal button click
  const handleSetGoal = () => {
    const newGoal = window.prompt('Enter your new monthly savings goal (₹):', goal.toString());
    if (newGoal !== null && !isNaN(Number(newGoal))) {
      setGoal(Math.max(0, Number(newGoal))); // This will update the shared context
    }
  };

  const pieData = [
    { name: 'Income', value: income || 0 }, // Add fallback for initial render
    { name: 'Expenses', value: expenses || 0 } // Add fallback for initial render
  ];

  const hasData = filteredTx && filteredTx.length > 0;

  useEffect(() => {
    // Preload suggestions for better UX
    fetchSuggestions();
  }, []);

  // Custom label for Pie Chart for a cleaner look
  const renderCustomizedLabel = ({ percent }) => {
    if (!percent || percent === 0) return null;
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <div className="dashboard-container">
      <h1 className="main-title">Finance Dashboard</h1>

      {/* 1. KPI Cards Section: Arranged in 5 columns */}
      <section className="kpi-cards-grid">
            {/* Income Card */}
            <div className="card stat-card">
              <p className="stat-label">Income</p>
              <h2 className="stat-value income-color">{formatCurrency(income)}</h2>
              <div className={`kpi-change ${income - prevIncome >= 0 ? 'kpi-up' : 'kpi-down'}`}>
                {income - prevIncome >= 0 ? '+' : ''}{(income - prevIncome).toFixed(0)} vs prev
              </div>
            </div>

            {/* Spendings Card */}
            <div className="card stat-card">
              <p className="stat-label">Spendings</p>
              <h2 className="stat-value expense-color">{formatCurrency(expenses)}</h2>
              <div className={`kpi-change ${prevExpenses - expenses >= 0 ? 'kpi-up' : 'kpi-down'}`}>
                {prevExpenses - expenses >= 0 ? '-' : '+'}{Math.abs(expenses - prevExpenses).toFixed(0)} vs prev
              </div>
            </div>

            {/* Balance Card */}
            <div className="card stat-card">
              <p className="stat-label">Balance</p>
              <h1 className="stat-value balance-value">{formatCurrency(balance)}</h1>
              <div className={`kpi-change ${balance - prevBalance >= 0 ? 'kpi-up' : 'kpi-down'}`}>
                {balance - prevBalance >= 0 ? '+' : ''}{(balance - prevBalance).toFixed(0)} vs prev
              </div>
            </div>

            {/* Savings Rate Card */}
            <div className="card stat-card savings-rate-group">
              <p className="stat-label">Savings Rate</p>
              <h2 className={`stat-value ${savingsRate >= 20 ? 'income-color' : 'expense-color'}`}>{savingsRate.toFixed(1)}%</h2>
              <div className="kpi-detail">
                Target 20% • Prev {prevSavingsRate.toFixed(1)}%
              </div>
            </div>

            {/* Savings Goal Card - Now a Button/Interactive Card */}
            <div className="card stat-card goal-card">
              <p className="stat-label">Savings Goal</p>
              <button className="goal-button" onClick={handleSetGoal}>
                  <span className="goal-value">{formatCurrency(goal)}</span>
                  <span className="goal-helper-text">Set/Change Goal</span>
              </button>
            </div>
      </section>

      {!hasData && (
        <div className="empty-state-card">
          <h2 className="section-title">📊 Welcome to your Dashboard</h2>
          <p>Please add your first transaction to see beautiful charts and reports.</p>
        </div>
      )}
      
      {hasData && (
        <>
          {/* 2. Charts Section: Adjusted to 1 column for the Pie Chart (Spending by Category removed) */}
          <section className="charts-grid-row single-chart-grid">
            <div className="card chart-card">
              <h3 className="chart-title">Income vs Expenses Overview</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={3}
                    dataKey="value"
                    labelLine={false}
                    label={renderCustomizedLabel} 
                  >
                    {/* Income (Green) and Expenses (Red) */}
                    {pieData.map((d, i) => <Cell key={`cell-${i}`} fill={COLORS[i % 2]} />)}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* 3. Tools & Suggestions Grid (Risk Evaluator and Investment Suggestions) */}
          <section className="tools-suggestions-grid-row">
            <div className="card tool-card">
              <h3 className="section-title">💸 Financial Risk Evaluator</h3>
              <div className="form-layout-grid"> 
                <div className="input-group">
                  <label>Monthly Salary (₹)</label>
                  <input type="number" value={salary} onChange={e => setSalary(Math.max(0, Number(e.target.value || 0)))} className="form-input" />
                </div>
                <div className="input-group">
                  <label>Monthly Savings (₹)</label>
                  <input type="number" value={savings} onChange={e => setSavings(Math.max(0, Number(e.target.value || 0)))} className="form-input" />
                </div>
              </div>
              <button className="btn btn-primary full-width" onClick={evaluateRisk} disabled={loadingRisk}>
                {loadingRisk ? 'Evaluating...' : 'Evaluate Financial Risk'}
              </button>
              {risk && (
                <div className={`alert ${risk.inRisk ? 'alert-danger' : 'alert-success'}`} style={{ marginTop: 15 }}>
                  <p style={{margin: 0}} dangerouslySetInnerHTML={{__html: risk.error ? risk.error : risk.message}} />
                </div>
              )}
            </div>

            <div className="card list-card">
              <div className="list-header-group">
                <h3 className="section-title">🚀 Investment Suggestions</h3>
                <button className="btn btn-secondary" onClick={fetchSuggestions} disabled={loadingSug}>
                  {loadingSug ? 'Loading...' : 'Refresh List'}
                </button>
              </div>
              <ul className="suggestion-list">
                <li className="list-item header-row">
                    <span>Risk</span>
                    <span>Investment</span>
                    <span>Trend</span>
                    <span>Horizon</span>
                </li>
                {suggestions && suggestions.map((s, index) => (
                  <li key={index} className="list-item">
                    <span className={`badge risk-level-${s.riskLevel.toLowerCase()}`}>{s.riskLevel}</span>
                    <span className="investment-name">{s.name}</span>
                    <span className={`trend-indicator trend-${s.trend.toLowerCase().replace(' ', '-')}`}>{s.trend}</span>
                    <span className="horizon-text">{s.horizon}</span>
                  </li>
                ))}
                {(!suggestions || suggestions.length === 0) && (
                  <li className="empty-list-item"><span style={{gridColumn: '1 / span 4'}}>No suggestions loaded. Click Refresh List.</span></li>
                )}
              </ul>
            </div>
          </section>
          
          {/* 4. Recent Transactions Section (Full Width) */}
          <section className="card list-card large-list">
            <h3 className="section-title">📝 Recent Transactions</h3>
            <ul className="transaction-list">
                <li className="list-item header-row">
                    <span>Type</span>
                    <span>Category</span>
                    <span>Amount</span>
                    <span>Date</span>
                </li>
              {/* Limiting to top 10 for better scannability */}
              {filteredTx.slice().reverse().slice(0, 10).map((t, i) => (
                <li key={i} className="list-item">
                  <span className={t.type === 'income' ? 'badge income-badge' : 'badge expense-badge'}>{t.type}</span>
                  <span className="transaction-category">{t.category}</span>
                  <span className="transaction-amount">{formatCurrency(t.amount)}</span>
                  <span className="transaction-date">{t.date}</span>
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

