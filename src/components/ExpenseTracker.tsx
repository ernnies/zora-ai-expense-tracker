import { useZoraCoin } from '../hooks/useZoraCoin';
import { useState, useEffect } from 'react';

const ExpenseTracker = () => {
  const { getCoinDetails } = useZoraCoin();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const coinAddresses = ['0x0000000000000000000000000000000000000000']; // Replace with user’s coin addresses
      const expenseData = await Promise.all(
        coinAddresses.map(addr => getCoinDetails(addr))
      );
      setExpenses(expenseData.filter(Boolean));
    };
    fetchExpenses();
  }, [getCoinDetails]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Expenses</h2>
      <ul className="space-y-2">
        {expenses.map((expense: any) => (
          <li key={expense.address} className="p-2 bg-white rounded shadow">
            {expense.name}: {expense.balance} {expense.symbol}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseTracker;