const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./Models/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Finance Tracker API is running!' });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Risk evaluation endpoint
// Body: { salary: number, savings: number }
// Rule: savings should be at least 20% of salary
app.post('/api/risk/evaluate', (req, res) => {
  const salary = Number(req.body?.salary || 0);
  const savings = Number(req.body?.savings || 0);

  if (!Number.isFinite(salary) || salary <= 0) {
    return res.status(400).json({ error: 'Invalid or missing salary' });
  }

  if (!Number.isFinite(savings) || savings < 0) {
    return res.status(400).json({ error: 'Invalid or missing savings' });
  }

  const requiredSavings = Math.round(salary * 0.2 * 100) / 100;
  const ratio = salary > 0 ? Math.round((savings / salary) * 10000) / 100 : 0;
  const inRisk = savings < requiredSavings;
  const shortfall = inRisk ? Math.round((requiredSavings - savings) * 100) / 100 : 0;

  const message = inRisk
    ? `Savings below 20% threshold. Increase savings by ₹${shortfall.toFixed(2)} to reach ₹${requiredSavings.toFixed(2)}.`
    : 'Savings meet the recommended 20% of income. Good job!';

  return res.json({
    salary,
    savings,
    requiredSavings,
    ratioPercent: ratio,
    inRisk,
    shortfall,
    message
  });
});

// Investment suggestions endpoint (stubbed "market trends")
app.get('/api/investments/suggestions', (req, res) => {
  // In a real implementation, fetch market data and personalize based on user profile.
  // For now we return a curated list with simple trend flags.
  const suggestions = [
    {
      id: 'index-funds',
      name: 'Broad-Market Index Funds',
      riskLevel: 'Moderate',
      horizon: '3-5y',
      trend: 'Uptrend',
      weight: 40,
      rationale: 'Low-cost diversification with steady long-term performance.'
    },
    {
      id: 'short-term-debt',
      name: 'Short-Term Debt Funds',
      riskLevel: 'Low',
      horizon: '6-18m',
      trend: 'Stable',
      weight: 20,
      rationale: 'Preserve capital with better yield than savings accounts.'
    },
    {
      id: 'sector-tech',
      name: 'Technology Sector ETF',
      riskLevel: 'High',
      horizon: '5y+',
      trend: 'Volatile Uptrend',
      weight: 20,
      rationale: 'AI and cloud tailwinds; allocate only if risk appetite allows.'
    },
    {
      id: 'gold',
      name: 'Gold (Sovereign/ETF)',
      riskLevel: 'Low-Moderate',
      horizon: '2-5y',
      trend: 'Hedge',
      weight: 10,
      rationale: 'Hedge against inflation and equity drawdowns.'
    },
    {
      id: 'emergency',
      name: 'Emergency Fund',
      riskLevel: 'Very Low',
      horizon: 'Liquid',
      trend: 'Essential',
      weight: 10,
      rationale: '3-6 months expenses in high-liquidity instruments before investing.'
    }
  ];

  res.json({
    asOf: new Date().toISOString(),
    baseCurrency: 'INR',
    suggestions
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

