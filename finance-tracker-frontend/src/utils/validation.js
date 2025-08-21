// src/utils/validation.js
import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = yup.object({
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .matches(/^[a-zA-Z\s]*$/, 'First name can only contain letters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .matches(/^[a-zA-Z\s]*$/, 'Last name can only contain letters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      'Password must contain uppercase, lowercase, number, and special character'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  currency: yup
    .string()
    .required('Please select your preferred currency'),
});

export const expenseSchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .min(2, 'Title must be at least 2 characters')
    .max(100, 'Title must be less than 100 characters'),
  amount: yup
    .number()
    .required('Amount is required')
    .positive('Amount must be positive')
    .max(1000000, 'Amount cannot exceed 1,000,000'),
  category: yup
    .string()
    .required('Please select a category'),
  date: yup
    .date()
    .required('Date is required')
    .max(new Date(), 'Date cannot be in the future'),
  description: yup
    .string()
    .max(500, 'Description must be less than 500 characters'),
  paymentMethod: yup
    .string()
    .required('Please select a payment method'),
});

export const budgetSchema = yup.object({
  category: yup
    .string()
    .required('Please select a category'),
  amount: yup
    .number()
    .required('Budget amount is required')
    .positive('Budget amount must be positive')
    .max(1000000, 'Budget amount cannot exceed 1,000,000'),
  period: yup
    .string()
    .required('Please select a budget period'),
  startDate: yup
    .date()
    .required('Start date is required'),
  endDate: yup
    .date()
    .required('End date is required')
    .min(yup.ref('startDate'), 'End date must be after start date'),
});