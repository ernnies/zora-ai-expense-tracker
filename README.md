# Zora AI Expense Tracker 🚀💰

[![Built with Zora Coins SDK](https://img.shields.io/badge/Powered%20by-Zora%20Coins%20Protocol-6E56F7)](https://docs.zora.co/coins)
[![Base L2](https://img.shields.io/badge/Network-Base_L2-0052FF)](https://base.org)
[![AI-Powered](https://img.shields.io/badge/AI-Predictive_Analytics-FF6D00)]()


A decentralized web application built on the **Base** blockchain, leveraging **Zora’s Coins SDK** to create, trade, and track expense-related cryptocurrency tokens with **AI-driven categorization**. This dApp offers a user-friendly interface for managing personal finance transparently on-chain — designed for the Web3 ecosystem.

Transform personal finance into a dynamic, tradable experience with on-chain tokenization. This dapp converts expenses into ERC-20 tokens ($FOOD, $TRAVEL) using Zora's Coins Protocol, enhanced by AI-driven insights.
 

## 🚀 Features

* **🔐 Wallet Integration:** Connect wallets (e.g., MetaMask) using `wagmi` to manage expense tokens.
* **💰 Expense Token Management:** Create, trade, and view custom tokens representing categories like Dining, Travel, and more.
* **🧠 AI Categorization:** (Mock) AI categorizes tokens based on metadata — extensible with real AI models.
* **📊 Real-Time Data:** Displays top-gaining expense tokens with market cap and trading metrics.
* **📱 Responsive UI:** Built with React, styled using Tailwind CSS and animated with Framer Motion.
* **⚡ Built on Base:** Low-cost, scalable transactions using Coinbase’s Base L2 blockchain.

---

## 🧑‍💻 Tech Stack

* **Frontend:** React, Tailwind CSS, Framer Motion
* **Blockchain Integration:** Base chain, Zora Coins SDK, wagmi, viem
* **Languages:** TypeScript, JavaScript
* **Build Tools:** Webpack (via `react-app-rewired`), PostCSS
* **Key Dependencies:**

  ```
  typescript@5.5.4  
  wagmi@2.x  
  viem@2.x  
  @zoralabs/coins-sdk@0.2.x  
  tailwindcss@3.4.17  
  @tailwindcss/postcss@4.x  
  ```

---

## 🧰 Prerequisites

* Node.js v16+
* npm v8+
* A Web3 wallet (e.g., MetaMask)
* Zora API Key (from [Zora Developer Portal](https://zora.co))
* Base RPC URL (e.g., `https://rpc.base.org`)

---

## ⚙️ Installation

```bash
git clone https://github.com/ernnies/zora-ai-expense-tracker
cd zora-ai-expense-tracker
npm install --legacy-peer-deps
```

Create a `.env` file in the root directory:

```env
REACT_APP_ZORA_API_KEY=your-zora-api-key
REACT_APP_RPC_URL=https://rpc.base.org
```

Start the dev server:

```bash
npm start
```

> The app runs at **[http://localhost:3000](http://localhost:3000)**

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx             # Wallet connect UI
│   └── ExpenseTracker.tsx     # Dashboard of top expense tokens
├── hooks/
│   └── useZoraCoin.ts         # Custom hook for Zora token actions
├── lib/
│   └── zoraClient.ts          # API and smart contract interactions
├── index.css                  # Tailwind CSS directives
config-overrides.js            # Custom Webpack config
postcss.config.js              # PostCSS setup
tailwind.config.js             # Tailwind config
tsconfig.json                  # TypeScript config
.env                           # Environment variables
```

---

## 🧪 Usage

### ✅ Connect Wallet

* Click “**Connect Wallet**” in the header to link your MetaMask or supported wallet.
* Wallet address and disconnect button appear after connection.

### 📊 View Expense Tokens

* Dashboard shows top gainers with:

  * Token name, symbol
  * Market cap
  * Mock AI-generated category (e.g., “Food & Dining”)

### 💸 Create / Trade Tokens

Use the `useZoraCoin` hook to:

* Create expense tokens (e.g., “Coffee” token)
* Trade tokens with on-chain interactions

---

## 🔗 Zora Technology Integration

Implemented in `zoraClient.ts` using Zora’s Coins SDK:

* **createExpenseCoin:** Mint custom tokens with metadata.
* **tradeExpenseCoin:** Execute on-chain trades of tokens.
* **fetchCoinDetails / fetchTopGainers:** Retrieve token metadata and rankings.

---

## 📌 Relevance to Base & Web3

* **Transparency:** Tracks expenses on-chain for immutable, verifiable financial data.
* **Scalability:** Base’s low fees enable frequent interactions.
* **AI Simplification:** Categorization reduces cognitive load on users.
* **DeFi Utility:** Enables decentralized budgeting and expense analytics for crypto-native users.

---

## 🛠 Development Notes

* **Resolve Errors:**

  * Install specific AJV versions:

    ```bash
    npm install ajv@8.17.1 ajv-keywords@5.1.0 --save
    ```
  * Use `--legacy-peer-deps` during install to avoid `react-scripts` issues.
* **Suppress Warnings:**

  * `config-overrides.js` prevents source map clutter from `@reown`, `superstruct`.
* **Run TypeScript Smoothly:**

  * Target: `ES2020` (supports `BigInt`, optional chaining, etc.)

---

## 🧯 Troubleshooting

### Build Errors

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

Ensure `postcss.config.js` includes:

```js
module.exports = {
  plugins: [require('tailwindcss'), require('autoprefixer')],
};
```

### API Key Issues

* Confirm `REACT_APP_ZORA_API_KEY` is valid and properly loaded in `.env`.

### Dependency Conflicts

Check:

```bash
npm list wagmi viem @zoralabs/coins-sdk tailwindcss @tailwindcss/postcss typescript ajv ajv-keywords
```

## 🤝 Contributing

We welcome contributions!

1. Fork this repo
2. Create a new branch: `git checkout -b feature/my-feature`
3. Commit and push changes
4. Open a pull request

---

## 📜 License

MIT License. See `LICENSE` file for details.
