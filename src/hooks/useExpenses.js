// hooks/useExpenses.js
import { useState, useEffect } from 'react';

export const useExpenses = (initialBalance = 5000) => {
  const [balance, setBalance] = useState(initialBalance);
  const [expenses, setExpenses] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const savedBalance = localStorage.getItem('balance');
    const savedExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    
    setBalance(savedBalance ? Number(savedBalance) : initialBalance);
    setExpenses(savedExpenses);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('balance', balance);
      localStorage.setItem('expenses', JSON.stringify(expenses));
    }
  }, [balance, expenses, isMounted]);

  const addExpense = (expense) => {
    if (balance < expense.price) {
      throw new Error('Insufficient balance');
    }
    setBalance(prev => prev - expense.price);
    setExpenses(prev => [{ ...expense, id: Date.now() }, ...prev]);
  };

  const editExpense = (id, updatedExpense) => {
    const originalExpense = expenses.find(e => e.id === id);
    if (!originalExpense) return;

    const priceDifference = originalExpense.price - updatedExpense.price;
    
    setBalance(prev => prev + priceDifference);
    setExpenses(prev => 
      prev.map(e => e.id === id ? { ...updatedExpense, id } : e)
    );
  };

  const deleteExpense = (id) => {
    const expenseToDelete = expenses.find(e => e.id === id);
    if (!expenseToDelete) return;

    setBalance(prev => prev + expenseToDelete.price);
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  const addIncome = (amount) => {
    if (amount <= 0) {
      throw new Error('Amount must be positive');
    }
    setBalance(prev => prev + amount);
  };

  return {
    balance,
    expenses,
    addExpense,
    editExpense,
    deleteExpense,
    addIncome,
    totalExpenses: expenses.reduce((sum, e) => sum + e.price, 0),
    categorySpends: calculateCategorySpends(expenses),
    categoryCount: calculateCategoryCount(expenses)
  };
};

// Helper functions
function calculateCategorySpends(expenses) {
  // ... implementation
}

function calculateCategoryCount(expenses) {
  // ... implementation
}