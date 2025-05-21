// hooks/useBudgets.js
import { useState, useEffect } from 'react';

export const useBudgets = () => {
  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem('budgets');
    return saved ? JSON.parse(saved) : {
      food: 2000,
      entertainment: 1000,
      travel: 3000
    };
  });

  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets));
  }, [budgets]);

  const updateBudget = (category, amount) => {
    setBudgets(prev => ({
      ...prev,
      [category]: amount
    }));
  };

  return { budgets, updateBudget };
};