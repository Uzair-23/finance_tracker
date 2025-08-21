// src/pages/ForecastPage.js
import React, { useState, useEffect } from 'react';
import { TrendingUp, Brain, AlertTriangle, Lightbulb } from 'lucide-react';
import { useExpenses } from '../context/ExpenseContext';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/formatters';
import LoadingSpinner from "../components/common/LoadingSpinner";


const ForecastPage = () => {
  const [forecast, setForecast] = useState(null);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const { expenses } = useExpenses();
  const { user } = useAuth();

  useEffect(() => {
    generateForecast();
  }, [expenses]);

  const generateForecast = async () => {
    setLoading(true);
    
    // Simple forecasting logic (in a real app, this would call your ML API)
    try {
      // Calculate monthly averages
      const monthlyData = {};
      expenses.forEach(expense => {
        const date = new Date(expense.date);
        const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
        
        if (!monthlyData[monthKey]) {
          monthlyData[monthKey] = { total: 0, count: 0, categories: {} };
        }
        
        monthlyData[monthKey].total += expense.amount;
        monthlyData[monthKey].count += 1;
        
        if (!monthlyData[monthKey].categories[expense.category]) {
          monthlyData[monthKey].categories[expense.category] = 0;
        }
        monthlyData[monthKey].categories[expense.category] += expense.amount;
      });

      const monthlyTotals = Object.values(monthlyData).map(month => month.total);
      const avgMonthlySpending = monthlyTotals.reduce((sum, total) => sum + total, 0) / monthlyTotals.length || 0;
      
      // Generate next 3 months forecast
      const nextMonths = [];
      const currentDate = new Date();
      
      for (let i = 1; i <= 3; i++) {
        const futureDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
        const monthName = futureDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        
        // Add some variance based on historical data
        const variance = monthlyTotals.length > 1 ? 
          Math.random() * (Math.max(...monthlyTotals) - Math.min(...monthlyTotals)) * 0.1 : 0;
        
        nextMonths.push({
          month: monthName,
          predicted: avgMonthlySpending + (Math.random() - 0.5) * variance,
          confidence: Math.min(95, 60 + (monthlyTotals.length * 5))
        });
      }

      setForecast({
        avgMonthlySpending,
        nextMonths,
        totalDataPoints: expenses.length,
        historicalMonths: Object.keys(monthlyData).length
      });

      // Generate insights
      generateInsights(monthlyData, avgMonthlySpending);
      
    } catch (error) {
      console.error('Forecast generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateInsights = (monthlyData, avgSpending) => {
    const insights = [];
    
    // Trend analysis
    const months = Object.keys(monthlyData).sort();
    if (months.length >= 2) {
      const recentSpending = monthlyData[months[months.length - 1]].total;
      const previousSpending = monthlyData[months[months.length - 2]].total;
      
      if (recentSpending > previousSpending * 1.1) {
        insights.push({
          type: 'warning',
          icon: AlertTriangle,
          title: 'Increasing Spending Trend',
          message: `Your spending increased by ${((recentSpending - previousSpending) / previousSpending * 100).toFixed(1)}% last month.`
        });
      } else if (recentSpending < previousSpending * 0.9) {
        insights.push({
          type: 'positive',
          icon: TrendingUp,
          title: 'Great Progress!',
          message: `You reduced spending by ${((previousSpending - recentSpending) / previousSpending * 100).toFixed(1)}% last month.`
        });
      }
    }

    // Category insights
    const allCategories = {};
    Object.values(monthlyData).forEach(month => {
      Object.entries(month.categories).forEach(([category, amount]) => {
        if (!allCategories[category]) allCategories[category] = [];
        allCategories[category].push(amount);
      });
    });

    const topCategory = Object.entries(allCategories)
      .map(([category, amounts]) => ({
        category,
        avg: amounts.reduce((sum, amount) => sum + amount, 0) / amounts.length
      }))
      .sort((a, b) => b.avg - a.avg)[0];

    if (topCategory) {
      insights.push({
        type: 'tip',
        icon: Lightbulb,
        title: 'Top Spending Category',
        message: `${topCategory.category} is your highest spending category. Consider setting a specific budget for this area.`
      });
    }

    setInsights(insights);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner size="lg" text="Generating forecast..." />
      </div>
    );
  }

  if (!forecast) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <Brain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Not enough data</h3>
          <p className="text-gray-600">Add more expenses to generate AI-powered forecasts</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Budget Forecast</h1>
        <p className="text-gray-600 mt-2">AI-powered spending predictions and insights</p>
      </div>

      {/* Forecast Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Brain className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Average Monthly</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(forecast.avgMonthlySpending, user?.currency)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Data Points</p>
              <p className="text-2xl font-bold text-gray-900">{forecast.totalDataPoints}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-yellow-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Historical Months</p>
              <p className="text-2xl font-bold text-gray-900">{forecast.historicalMonths}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Forecasts */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Next 3 Months Forecast</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {forecast.nextMonths.map((month, index) => (
            <div key={month.month} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">{month.month}</h4>
              <p className="text-2xl font-bold text-blue-600 mb-2">
                {formatCurrency(month.predicted, user?.currency)}
              </p>
              <div className="flex items-center">
                <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${month.confidence}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600">{month.confidence.toFixed(0)}%</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Confidence Level</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Insights & Tips</h3>
        {insights.length === 0 ? (
          <p className="text-gray-500">Keep adding expenses to unlock personalized insights!</p>
        ) : (
          <div className="space-y-4">
            {insights.map((insight, index) => {
              const Icon = insight.icon;
              const colors = {
                warning: 'bg-red-50 border-red-200 text-red-800',
                positive: 'bg-green-50 border-green-200 text-green-800',
                tip: 'bg-blue-50 border-blue-200 text-blue-800'
              };

              return (
                <div key={index} className={`border rounded-lg p-4 ${colors[insight.type]}`}>
                  <div className="flex items-start">
                    <Icon className="h-5 w-5 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">{insight.title}</h4>
                      <p className="text-sm">{insight.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForecastPage;
