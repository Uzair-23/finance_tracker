// src/components/expense/ExpenseForm.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CalendarDays, DollarSign, Tag, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';
import { expenseSchema } from '../../utils/validation';
import { EXPENSE_CATEGORIES, PAYMENT_METHODS } from '../../utils/constants';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import Modal from '../common/Modal';
import api from '../../utils/api';

const ExpenseForm = ({ isOpen, onClose, onSuccess, editExpense = null }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(expenseSchema),
    defaultValues: editExpense || {
      title: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      paymentMethod: '',
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const endpoint = editExpense 
        ? `/expenses/${editExpense._id}` 
        : '/expenses';
      const method = editExpense ? 'put' : 'post';
      
      await api[method](endpoint, {
        ...data,
        amount: parseFloat(data.amount),
      });

      toast.success(
        editExpense 
          ? 'Expense updated successfully!' 
          : 'Expense added successfully!'
      );
      
      reset();
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to save expense'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={editExpense ? 'Edit Expense' : 'Add New Expense'}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          {...register('title')}
          placeholder="Expense title"
          icon={<Tag className="h-5 w-5" />}
          error={errors.title?.message}
        />

        <Input
          {...register('amount')}
          type="number"
          step="0.01"
          placeholder="Amount"
          icon={<DollarSign className="h-5 w-5" />}
          error={errors.amount?.message}
        />

        <Select
          {...register('category')}
          placeholder="Select category"
          options={EXPENSE_CATEGORIES}
          error={errors.category?.message}
        />

        <Input
          {...register('date')}
          type="date"
          icon={<CalendarDays className="h-5 w-5" />}
          error={errors.date?.message}
        />

        <Select
          {...register('paymentMethod')}
          placeholder="Payment method"
          options={PAYMENT_METHODS}
          icon={<CreditCard className="h-5 w-5" />}
          error={errors.paymentMethod?.message}
        />

        <div>
          <textarea
            {...register('description')}
            placeholder="Description (optional)"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div className="flex space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isSubmitting}
            className="flex-1"
          >
            {editExpense ? 'Update' : 'Add'} Expense
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ExpenseForm;