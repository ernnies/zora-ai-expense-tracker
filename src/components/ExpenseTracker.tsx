import { useZoraCoin } from '../hooks/useZoraCoin';
import { useState, useEffect } from 'react';

const ExpenseTracker = () => {
  const { getCoinDetails, tradeCoin, shareAchievement } = useZoraCoin();
  const [expenses, setExpenses] = useState([]);
  const [tooltip, setTooltip] = useState<string | null>(null);

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
      <p className="mb-4 text-gray-600">
        Each expense coin represents a budget category (e.g., groceries). Trade coins to spend or reallocate funds.
      </p>
      <ul className="space-y-2">
        {expenses.map((expense: any) => (
          <li key={expense.address} className="p-2 bg-white rounded shadow relative flex items-center">
            <span
              onMouseEnter={() => setTooltip(`Trade ${expense.name} to spend or reallocate funds`)}
              onMouseLeave={() => setTooltip(null)}
            >
              {expense.name}: {expense.balance} {expense.symbol} {expense.category ? `(${expense.category})` : ''}
            </span>
            {tooltip && (
              <div className="tooltip">
                {tooltip}
              </div>
            )}
            <button
              className="ml-4 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              onClick={() => tradeCoin('sell', expense.address, '0.1')}
            >
              Spend
            </button>
            <button
              className="ml-2 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
              onClick={() => shareAchievement({ name: expense.name })}
            >
              Share on X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseTracker;