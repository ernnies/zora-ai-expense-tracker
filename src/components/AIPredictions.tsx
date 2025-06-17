import { motion } from "framer-motion";

export function AIPredictions() {
  const predictions = [
    { coin: "$FOOD", action: "Buy", confidence: 0.85, time: "Next 24h" },
    { coin: "$TRAVEL", action: "Sell", confidence: 0.78, time: "Next 12h" },
    { coin: "$COFFEE", action: "Hold", confidence: 0.92, time: "Next 48h" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto my-8"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">AI Trading Predictions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {predictions.map((pred, index) => (
          <motion.div
            key={pred.coin}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-4 rounded-lg shadow-lg"
          >
            <h3 className="text-lg font-semibold">{pred.coin}</h3>
            <p className="text-gray-600">Action: <span className={pred.action === "Buy" ? "text-green-500" : pred.action === "Sell" ? "text-red-500" : "text-yellow-500"}>{pred.action}</span></p>
            <p className="text-gray-600">Confidence: {(pred.confidence * 100).toFixed(1)}%</p>
            <p className="text-gray-600">Timeframe: {pred.time}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}