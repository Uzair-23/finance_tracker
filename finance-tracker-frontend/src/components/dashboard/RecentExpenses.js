// src/components/dashboard/RecentExpenses.js
import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { useAuth } from '../../context/AuthContext';
import { EXPENSE_CATEGORIES } from '../../utils/constants';

const RecentExpenses = ({ expenses }) => {
  const { user } = useAuth();

  const getCategoryInfo = (categoryValue) => {
    return EXPENSE_CATEGORIES.find(cat => cat.value === categoryValue) || 
           { label: categoryValue, icon: '📦' };
  };

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Expenses</h3>
        </div>
        <p className="text-gray-500">No recent expenses found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Expenses</h3>
        <Link 
          to="/expenses" 
          className="text-blue-600 hover:text-blue-700 flex items-center text-sm font-medium"
        >
          View all
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      
      <div className="space-y-4">
        {expenses.map((expense) => {
          const categoryInfo = getCategoryInfo(expense.category);
          return (
            <div key={expense._id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="text-2xl mr-3">{categoryInfo.icon}</div>
                <div>
                  <p className="font-medium text-gray-900">{expense.title}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(expense.date)}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  {formatCurrency(expense.amount, user?.currency)}
                </p>
                <p className="text-sm text-gray-500">{categoryInfo.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentExpenses;
