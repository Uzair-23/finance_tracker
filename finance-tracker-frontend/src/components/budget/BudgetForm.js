// src/components/budget/BudgetForm.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DollarSign, Calendar, Target } from 'lucide-react';
import toast from 'react-hot-toast';
import { budgetSchema } from '../../utils/validation';
import { EXPENSE_CATEGORIES, BUDGET_PERIODS } from '../../utils/constants';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import Modal from '../common/Modal';
import api from '../../utils/api';

const BudgetForm = ({ isOpen, onClose, onSuccess, editBudget = null }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(budgetSchema),
    defaultValues: editBudget || {
      category: '',
      amount: '',
      period: 'monthly',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
  });

  const selectedPeriod = watch('period');
  const startDate = watch('startDate');

  // Auto-calculate end date based on period
  React.useEffect(() => {
    if (startDate && selectedPeriod && !editBudget) {
      const start = new Date(startDate);
      let end;

      switch (selectedPeriod) {
        case 'weekly':
          end = new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000);
          break;
        case 'monthly':
          end = new Date(start.getFullYear(), start.getMonth() + 1, start.getDate());
          break;
        case 'quarterly':
          end = new Date(start.getFullYear(), start.getMonth() + 3, start.getDate());
          break;
        case 'yearly':
          end = new Date(start.getFullYear() + 1, start.getMonth(), start.getDate());
          break;
        default:
          end = new Date(start.getTime() + 30 * 24 * 60 * 60 * 1000);
      }

      // Update the form with calculated end date
      reset(prev => ({
        ...prev,
        endDate: end.toISOString().split('T')[0]
      }));
    }
  }, [selectedPeriod, startDate, reset, editBudget]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const endpoint = editBudget 
        ? `/budgets/${editBudget._id}` 
        : '/budgets';
      const method = editBudget ? 'put' : 'post';
      
      await api[method](endpoint, {
        ...data,
        amount: parseFloat(data.amount),
      });

      toast.success(
        editBudget 
          ? 'Budget updated successfully!' 
          : 'Budget created successfully!'
      );
      
      reset();
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to save budget'
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
    <Modal isOpen={isOpen} onClose={handleClose} title={editBudget ? 'Edit Budget' : 'Create New Budget'}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Select
          {...register('category')}
          placeholder="Select category"
          options={EXPENSE_CATEGORIES}
          icon={<Target className="h-5 w-5" />}
          error={errors.category?.message}
        />

        <Input
          {...register('amount')}
          type="number"
          step="0.01"
          placeholder="Budget amount"
          icon={<DollarSign className="h-5 w-5" />}
          error={errors.amount?.message}
        />

        <Select
          {...register('period')}
          placeholder="Budget period"
          options={BUDGET_PERIODS}
          error={errors.period?.message}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            {...register('startDate')}
            type="date"
            label="Start Date"
            icon={<Calendar className="h-5 w-5" />}
            error={errors.startDate?.message}
          />

          <Input
            {...register('endDate')}
            type="date"
            label="End Date"
            icon={<Calendar className="h-5 w-5" />}
            error={errors.endDate?.message}
          />
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
            {editBudget ? 'Update' : 'Create'} Budget
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default BudgetForm;
