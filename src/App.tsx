import { useEffect } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "./components/Header";
import { CoinCreator } from "./components/CoinCreator";
import { CoinTrader } from "./components/CoinTrader";
import { ExpenseTracker } from "./components/ExpenseTracker";
import { AIPredictions } from "./components/AIPredictions";
import { injected } from "wagmi/connectors";

const queryClient = new QueryClient();

const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(process.env.REACT_APP_RPC_URL),
  },
  connectors: [injected()],
});

function AppContent() {
  useEffect(() => {
    document.title = "Zora AI Expense Tracker";
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main>
        <CoinCreator />
        <CoinTrader />
        <ExpenseTracker />
        <AIPredictions />
      </main>
      <footer className="bg-gray-800 text-white text-center py-4 mt-8">
        <p>Built for Wavehack/Buildathon with Zora Coins Protocol</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;