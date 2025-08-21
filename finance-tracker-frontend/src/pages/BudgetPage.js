// src/pages/BudgetPage.js
import React, { useState } from 'react';
import { PlusCircle, Target, TrendingUp, AlertCircle } from 'lucide-react';
import { useExpenses } from '../context/ExpenseContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import BudgetForm from '../components/budget/BudgetForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { formatCurrency, formatDate } from '../utils/formatters';

const BudgetPage = () => {
  const [isBudgetFormOpen, setIsBudgetFormOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const { budgets, expenses, loading, fetchBudgets } = useExpenses();
  const { user } = useAuth();

  const handleEditBudget = (budget) => {
    setEditingBudget(budget);
    setIsBudgetFormOpen(true);
  };

  const handleFormClose = () => {
    setIsBudgetFormOpen(false);
    setEditingBudget(null);
  };

  const handleFormSuccess = () => {
    fetchBudgets();
  };

  // Calculate budget vs actual spending
  const getBudgetAnalysis = (budget) => {
    const relevantExpenses = expenses.filter(expense => 
      expense.category === budget.category &&
      new Date(expense.date) >= new Date(budget.startDate) &&
      new Date(expense.date) <= new Date(budget.endDate)
    );

    const totalSpent = relevantExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const percentage = (totalSpent / budget.amount) * 100;
    const remaining = budget.amount - totalSpent;

    return {
      totalSpent,
      percentage: Math.min(percentage, 100),
      remaining,
      status: percentage >= 90 ? 'over' : percentage >= 70 ? 'warning' : 'good'
    };
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner size="lg" text="Loading budgets..." />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Budget Management</h1>
            <p className="text-gray-600 mt-2">Set and track your spending limits</p>
          </div>
          <Button
            onClick={() => setIsBudgetFormOpen(true)}
            className="flex items-center"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Add Budget
          </Button>
        </div>
      </div>

      {/* Budget Cards */}
      {budgets.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <Target className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No budgets yet</h3>
          <p className="text-gray-600 mb-4">Create your first budget to start tracking your spending</p>
          <Button onClick={() => setIsBudgetFormOpen(true)}>
            Create Budget
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map((budget) => {
            const analysis = getBudgetAnalysis(budget);
            const statusColors = {
              good: 'bg-green-500',
              warning: 'bg-yellow-500',
              over: 'bg-red-500'
            };

            return (
              <div key={budget._id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 capitalize">
                      {budget.category}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {formatDate(budget.startDate)} - {formatDate(budget.endDate)}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditBudget(budget)}
                    >
                      Edit
                    </Button>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl font-bold text-gray-900">
                      {formatCurrency(budget.amount, user?.currency)}
                    </span>
                    {analysis.status === 'over' && (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div
                      className={`h-3 rounded-full ${statusColors[analysis.status]}`}
                      style={{ width: `${analysis.percentage}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{formatCurrency(analysis.totalSpent, user?.currency)} spent</span>
                    <span>{analysis.percentage.toFixed(1)}%</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Remaining:</span>
                    <span className={`text-sm font-semibold ${
                      analysis.remaining >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {analysis.remaining >= 0 ? '+' : ''}
                      {formatCurrency(analysis.remaining, user?.currency)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Budget Form Modal */}
      <BudgetForm
        isOpen={isBudgetFormOpen}
        onClose={handleFormClose}
        onSuccess={handleFormSuccess}
        editBudget={editingBudget}
      />
    </div>
  );
};

export default BudgetPage;
