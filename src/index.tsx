import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WagmiProvider } from 'wagmi';
import { createConfig, http } from 'wagmi';
import { base } from 'viem/chains';

const config = createConfig({
  chains: [base],
  transports: { [base.id]: http(process.env.REACT_APP_RPC_URL) },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <App />
    </WagmiProvider>
  </React.StrictMode>
);