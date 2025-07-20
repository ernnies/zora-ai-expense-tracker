import { useState, useEffect } from 'react';
import { useZoraCoin } from '../hooks/useZoraCoin';
import { createExpenseCoin } from '../lib/zoraClient';
import { Address, Account } from 'viem';

const TopGainers = () => {
  const { getTopGainers, loading, error } = useZoraCoin();
  const [coins, setCoins] = useState([]);
  const [tooltip, setTooltip] = useState<string | null>(null);

  useEffect(() => {
    getTopGainers().then(setCoins);
  }, [getTopGainers]);

  const handleCreateCoin = async (coin: any) => {
    try {
      const account: Account = {
        address: '0x0000000000000000000000000000000000000000' as Address, // Replace with user address
        type: 'json-rpc',
      };
      await createExpenseCoin(
        {
          name: coin.name,
          symbol: coin.symbol,
          uri: `https://metadata.zora.co/${coin.address}`,
          payoutRecipient: account.address,
          category: coin.category,
        },
        account
      );
    } catch (err: any) {
      console.error('Failed to create coin:', err.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Trending Expense Tokens</h2>
      <p className="mb-4 text-gray-600">
        These tokens are trending for budgeting. Create one to track a new expense category.
      </p>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <ul className="space-y-2">
        {coins.map((coin: any) => (
          <li key={coin.address} className="p-2 bg-white rounded shadow relative">
            <span
              onMouseEnter={() => setTooltip(`Use ${coin.name} as a template for a ${coin.category} budget`)}
              onMouseLeave={() => setTooltip(null)}
            >
              {coin.name} ({coin.symbol}) - {coin.category}
            </span>
            {tooltip && (
              <div className="absolute bg-gray-800 text-white text-sm p-2 rounded shadow-lg">
                {tooltip}
              </div>
            )}
            <button
              className="ml-4 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              onClick={() => handleCreateCoin(coin)}
            >
              Create for Budget
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopGainers;