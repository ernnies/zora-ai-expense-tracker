import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "@wagmi/connectors"; // Correct import
import { motion } from "framer-motion";

export function Header() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 shadow-lg"
    >
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Zora AI Expense Tracker</h1>
        <nav>
          {isConnected ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
              <button
                onClick={() => disconnect()}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={() => connect({ connector: injected() })}
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
            >
              Connect Wallet
            </button>
          )}
        </nav>
      </div>
    </motion.header>
  );
}