import { useEffect, useState } from "react";
import { useZoraCoin } from "../hooks/useZoraCoin";
import { motion } from "framer-motion";

interface Coin {
  address: string;
  name: string;
  symbol: string;
  marketCap?: string;
}

export function ExpenseTracker() {
  const { getTopGainers, loading, error } = useZoraCoin();
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    async function fetchCoins() {
      const topGainers = await getTopGainers();
      setCoins(topGainers);
    }
    fetchCoins();
  }, [getTopGainers]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto my-8"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Your Expense Coins</h2>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coins.map((coin, index) => (
          <motion.div
            key={coin.address}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-4 rounded-lg shadow-lg"
          >
            <h3 className="text-lg font-semibold">{coin.name}</h3>
            <p className="text-gray-600">Symbol: {coin.symbol}</p>
            <p className="text-gray-600">Market Cap: {coin.marketCap || "N/A"}</p>
            <p className="text-gray-600">Category: {mockAICategorization(coin.name)}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function mockAICategorization(name: string): string {
  if (name.toLowerCase().includes("food")) return "Food & Dining";
  if (name.toLowerCase().includes("travel")) return "Travel";
  if (name.toLowerCase().includes("coffee")) return "Coffee";
  return "Miscellaneous";
}