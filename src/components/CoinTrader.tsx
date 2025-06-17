import { useState } from "react";
import { useZoraCoin } from "../hooks/useZoraCoin";
import { motion } from "framer-motion";
import { Address } from "viem";

export function CoinTrader() {
  const { tradeCoin, loading, error } = useZoraCoin();
  const [form, setForm] = useState({
    coinAddress: "",
    amount: "",
    direction: "buy" as "buy" | "sell",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await tradeCoin(
      form.direction,
      form.coinAddress as Address,
      form.amount
    );
    if (result) {
      alert(`Trade successful: ${result.hash}`);
      setForm({ coinAddress: "", amount: "", direction: "buy" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto my-8"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Trade Expense Coin</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Coin Address</label>
          <input
            type="text"
            value={form.coinAddress}
            onChange={(e) => setForm({ ...form, coinAddress: e.target.value })}
            placeholder="0x..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount (ETH)</label>
          <input
            type="number"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            placeholder="0.1"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Trade Type</label>
          <select
            value={form.direction}
            onChange={(e) => setForm({ ...form, direction: e.target.value as "buy" | "sell" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300"
        >
          {loading ? "Trading..." : `Execute ${form.direction}`}
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </motion.div>
  );
}