// src/components/dashboard/BudgetOverview.js
import React from 'react';
import { Target, AlertTriangle, CheckCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { useAuth } from '../../context/AuthContext';

const BudgetOverview = ({ budgets, currentSpending }) => {
  const { user } = useAuth();

  const getBudgetStatus = (budget, spending) => {
    const percentage = (spending / budget.amount) * 100;
    if (percentage >= 90) return 'danger';
    if (percentage >= 70) return 'warning';
    return 'success';
  };

  if (budgets.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Overview</h3>
        <p className="text-gray-500">No budgets set up yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Overview</h3>
      
      <div className="space-y-4">
        {budgets.map((budget) => {
          const percentage = Math.min((currentSpending / budget.amount) * 100, 100);
          const status = getBudgetStatus(budget, currentSpending);
          const remaining = budget.amount - currentSpending;
          
          const statusConfig = {
            success: { color: 'bg-green-500', icon: CheckCircle, textColor: 'text-green-600' },
            warning: { color: 'bg-yellow-500', icon: AlertTriangle, textColor: 'text-yellow-600' },
            danger: { color: 'bg-red-500', icon: AlertTriangle, textColor: 'text-red-600' },
          };
          
          const config = statusConfig[status];
          const Icon = config.icon;

          return (
            <div key={budget._id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Target className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="font-medium text-gray-900">{budget.category}</span>
                </div>
                <Icon className={`h-5 w-5 ${config.textColor}`} />
              </div>
              
              <div className="mb-2">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{formatCurrency(currentSpending, user?.currency)} spent</span>
                  <span>{formatCurrency(budget.amount, user?.currency)} budget</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${config.color}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
              
              <p className={`text-sm ${config.textColor}`}>
                {remaining > 0 
                  ? `${formatCurrency(remaining, user?.currency)} remaining`
                  : `${formatCurrency(Math.abs(remaining), user?.currency)} over budget`
                }
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetOverview; 