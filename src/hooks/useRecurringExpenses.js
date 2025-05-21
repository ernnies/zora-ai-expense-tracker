// hooks/useRecurringExpenses.js
import { useState, useEffect } from 'react';

export const useRecurringExpenses = () => {
  const [recurringExpenses, setRecurringExpenses] = useState(() => {
    const saved = localStorage.getItem('recurringExpenses');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('recurringExpenses', JSON.stringify(recurringExpenses));
  }, [recurringExpenses]);

  const addRecurringExpense = (expense) => {
    setRecurringExpenses(prev => [...prev, {
      ...expense,
      id: Date.now()
    }]);
  };

  const removeRecurringExpense = (id) => {
    setRecurringExpenses(prev => prev.filter(e => e.id !== id));
  };

  return { recurringExpenses, addRecurringExpense, removeRecurringExpense };
};