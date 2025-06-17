import { useState } from "react";
import { useZoraCoin } from "../hooks/useZoraCoin";
import { motion } from "framer-motion";

export function CoinCreator() {
  const { createCoin, loading, error } = useZoraCoin();
  const [form, setForm] = useState({ name: "", symbol: "", uri: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await createCoin(form.name, form.symbol, form.uri);
    if (result) {
      alert(`Coin created at ${result.address}`);
      setForm({ name: "", symbol: "", uri: "" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto my-8"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Create Expense Coin</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g., Food Expense"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Symbol</label>
          <input
            type="text"
            value={form.symbol}
            onChange={(e) => setForm({ ...form, symbol: e.target.value })}
            placeholder="e.g., FOOD"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Metadata URI</label>
          <input
            type="text"
            value={form.uri}
            onChange={(e) => setForm({ ...form, uri: e.target.value })}
            placeholder="e.g., ipfs://metadata-hash"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300"
        >
          {loading ? "Creating..." : "Create Coin"}
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </motion.div>
  );
}