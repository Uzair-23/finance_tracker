// src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import { PlusCircle, TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react';
import { useExpenses } from '../context/ExpenseContext';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/formatters';
import Button from '../components/common/Button';
import ExpenseForm from '../components/expense/ExpenseForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ExpenseChart from '../components/dashboard/ExpenseChart';
import RecentExpenses from '../components/dashboard/RecentExpenses';
import BudgetOverview from '../components/dashboard/BudgetOverview';

const DashboardPage = () => {
  const [isExpenseFormOpen, setIsExpenseFormOpen] = useState(false);
  const { expenses, budgets, loading } = useExpenses();
  const { user } = useAuth();

  // Calculate dashboard statistics
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const thisMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth && 
           expenseDate.getFullYear() === currentYear;
  });

  const lastMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    return expenseDate.getMonth() === lastMonth && 
           expenseDate.getFullYear() === lastMonthYear;
  });

  const totalThisMonth = thisMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalLastMonth = lastMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const monthlyChange = totalLastMonth === 0 ? 0 : ((totalThisMonth - totalLastMonth) / totalLastMonth) * 100;

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);
  const budgetUsed = (totalThisMonth / totalBudget) * 100;

  const stats = [
    {
      name: 'This Month Spending',
      value: formatCurrency(totalThisMonth, user?.currency),
      change: `${monthlyChange >= 0 ? '+' : ''}${monthlyChange.toFixed(1)}%`,
      changeType: monthlyChange >= 0 ? 'increase' : 'decrease',
      icon: DollarSign,
    },
    {
      name: 'Budget Used',
      value: `${budgetUsed.toFixed(1)}%`,
      change: `${formatCurrency(totalBudget - totalThisMonth, user?.currency)} remaining`,
      changeType: budgetUsed > 80 ? 'increase' : 'decrease',
      icon: Target,
    },
    {
      name: 'Total Expenses',
      value: expenses.length.toString(),
      change: `${thisMonthExpenses.length} this month`,
      changeType: 'neutral',
      icon: TrendingUp,
    },
  ];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.firstName}!
            </h1>
            <p className="text-gray-600 mt-2">
              Here's an overview of your financial activity
            </p>
          </div>
          <Button
            onClick={() => setIsExpenseFormOpen(true)}
            className="flex items-center"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Add Expense
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${
                    stat.changeType === 'increase' ? 'text-red-600' :
                    stat.changeType === 'decrease' ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {stat.change}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <ExpenseChart expenses={thisMonthExpenses} />
        </div>
        <div>
          <BudgetOverview budgets={budgets} currentSpending={totalThisMonth} />
        </div>
      </div>

      {/* Recent Expenses */}
      <RecentExpenses expenses={expenses.slice(0, 5)} />

      {/* Add Expense Modal */}
      <ExpenseForm
        isOpen={isExpenseFormOpen}
        onClose={() => setIsExpenseFormOpen(false)}
        onSuccess={() => {}}
      />
    </div>
  );
};

export default DashboardPage;