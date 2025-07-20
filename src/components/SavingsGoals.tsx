import { useZoraCoin } from '../hooks/useZoraCoin';

const SavingsGoals = () => {
  const { trackSavings, budgetPoints } = useZoraCoin();

  return (
    <div className="p-4 bg-green-100 rounded">
      <h2 className="text-xl font-bold mb-2">Savings Goals</h2>
      <p className="mb-4 text-gray-600">Earn Budget Points by staying under budget!</p>
      <p>Points: {budgetPoints}</p>
      <button
        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        onClick={() => trackSavings('0x0000000000000000000000000000000000000000', '0.1')}
      >
        Check Grocery Savings
      </button>
    </div>
  );
};

export default SavingsGoals;