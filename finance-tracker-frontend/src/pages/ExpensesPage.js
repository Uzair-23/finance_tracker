// src/pages/ExpensesPage.js
import React, { useState } from 'react';
import { PlusCircle, Filter, Search } from 'lucide-react';
import { useExpenses } from '../context/ExpenseContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import ExpenseForm from '../components/expense/ExpenseForm';
import ExpenseList from '../components/expense/ExpenseList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { EXPENSE_CATEGORIES, PAYMENT_METHODS } from '../utils/constants';

const ExpensesPage = () => {
  const [isExpenseFormOpen, setIsExpenseFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const { expenses, loading, filters, setFilters, fetchExpenses } = useExpenses();

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      dateFrom: '',
      dateTo: '',
      paymentMethod: '',
    });
    setSearchTerm('');
  };

  const filteredExpenses = expenses.filter(expense =>
    expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setIsExpenseFormOpen(true);
  };

  const handleFormClose = () => {
    setIsExpenseFormOpen(false);
    setEditingExpense(null);
  };

  const handleFormSuccess = () => {
    fetchExpenses();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner size="lg" text="Loading expenses..." />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Expenses</h1>
          <Button
            onClick={() => setIsExpenseFormOpen(true)}
            className="flex items-center"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Add Expense
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="h-5 w-5" />}
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
              <Select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                placeholder="All Categories"
                options={EXPENSE_CATEGORIES}
              />
              
              <Select
                value={filters.paymentMethod}
                onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
                placeholder="All Payment Methods"
                options={PAYMENT_METHODS}
              />
              
              <Input
                type="date"
                placeholder="From Date"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              />
              
              <Input
                type="date"
                placeholder="To Date"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              />
              
              <div className="md:col-span-4">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  size="sm"
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Expenses List */}
      <ExpenseList 
        expenses={filteredExpenses} 
        onEdit={handleEditExpense}
      />

      {/* Add/Edit Expense Modal */}
      <ExpenseForm
        isOpen={isExpenseFormOpen}
        onClose={handleFormClose}
        onSuccess={handleFormSuccess}
        editExpense={editingExpense}
      />
    </div>
  );
};

export default ExpensesPage;