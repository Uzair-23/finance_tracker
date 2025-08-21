// src/utils/formatters.js
export const formatCurrency = (amount, currency = 'USD') => {
  const currencySymbols = {
    USD: '
    ,
    EUR: '€',
    GBP: '£',
    INR: '₹',
    JPY: '¥',
    CAD: 'C
    ,
    AUD: 'A
    ,
  };

  const symbol = currencySymbols[currency] || '
    ;
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount).replace(/[A-Z]{3}/, symbol);
};

export const formatDate = (date, format = 'short') => {
  const options = {
    short: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
    relative: { dateStyle: 'medium' },
  };

  return new Intl.DateTimeFormat('en-US', options[format]).format(new Date(date));
};

export const formatPercentage = (value, decimals = 1) => {
  return `${(value * 100).toFixed(decimals)}%`;
};

export const truncateText = (text, maxLength = 50) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};