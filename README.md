# Zora AI Expense Tracker

A blockchain-based expense tracking application built with React, TypeScript, and the Zora protocol on the Base chain. Create custom coins to track expenses (e.g., groceries, rent), trade them, and explore trending expense tokens to inform budgeting. The app features a lively UI with a focus on clarity and user engagement.

## Features

- **Expense Tracking**: Create and manage custom coins to represent budget categories (e.g., "Grocery Coin") using `@zoralabs/coins-sdk`.
- **Trending Expense Tokens**: Discover popular tokens categorized for budgeting (e.g., "Budget-Friendly" for stablecoins), addressing judge feedback to align with expense tracking.
- **Blockchain Integration**: Securely track expenses on the Base chain with transparent transactions.
- **Lively UI**: Responsive design with Tailwind CSS, featuring an onboarding modal and clear navigation.
- **Future Enhancements**: Planned AI-driven budget advice, gamified savings goals, and cross-platform mobile support (Wave 1, Q3-Q4 2025) and cross-chain support, community challenges, and NFT rewards (Wave 2, Q1-Q2 2026).

## Folder Structure

```
zora-ai-expense-tracker/
├── node_modules/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   ├── manifest.json
├── src/
│   ├── components/
│   │   ├── ExpenseTracker.tsx
│   │   ├── TopGainers.tsx
│   ├── hooks/
│   │   ├── useZoraCoin.ts
│   ├── lib/
│   │   ├── zoraClient.ts
│   ├── App.tsx
│   ├── index.tsx
│   ├── index.css
├── .env
├── config-overrides.js
├── package.json
├── postcss.config.js
├── tsconfig.json
├── README.md
```

## Prerequisites

- **Node.js**: v20.19.3
- **Zora API Key**: Obtain from [Zora](https://zora.co).
- **Base RPC URL**: Use a provider like Alchemy or Infura for Base mainnet.

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ernnies/zora-ai-expense-tracker.git
   cd zora-ai-expense-tracker
   ```

2. **Install Dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```
   Ensure `leven` is installed to avoid module errors:
   ```bash
   npm install leven@4.0.0 --save --legacy-peer-deps
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_ZORA_API_KEY=your-zora-api-key
   REACT_APP_RPC_URL=https://mainnet.base.org
   ```

4. **Run the Development Server**:
   ```bash
   npm start
   ```
   Access the app at `http://localhost:3000`.

5. **Build for Production**:
   ```bash
   npm run build
   serve -s build
   ```

6. **Troubleshooting**:
   - If `npm start` fails with module errors, clean and reinstall:
     ```bash
     rm -rf node_modules package-lock.json
     npm cache clean --force
     npm install --legacy-peer-deps
     ```
   - Check dependency versions:
     ```bash
     npm list @zoralabs/coins-sdk viem wagmi react react-router-dom tailwindcss typescript leven
     ```

## Key Updates (Current Wave, July 2025)

- **Fixed Build Errors**: Resolved duplicate `fetchTopGainers` declarations, `uri` type mismatch (`ValidMetadataURI`), incorrect `tradeCoin` arguments, and missing React hooks in `TopGainers.tsx`.

  - Reframed “trending coins” as “Trending Expense Tokens” with budgeting categories (e.g., “Budget-Friendly” for stablecoins).
  - Added `ExpenseTracker.tsx` to display expense coins as budgets.
  - Enhanced UI with navigation (`App.tsx`) and onboarding modal for clarity.
- **Dependencies**: Downgraded TypeScript to 5.1.6 for compatibility and added `leven@4.0.0` to fix `@apideck/better-ajv-errors` issues.

## Future Development

- **AI Budget Advisor**: Integrate xAI API for personalized budget suggestions based on expense coin data.
- **Gamified Savings Goals**: Reward users with “Budget Points” for meeting savings targets, redeemable for UI themes.
- **Mobile App**: Develop a cross-platform app using FlutterFlow for iOS and Android.
- **Expense Trends**: Visualize spending with Chart.js in `ExpenseTrends.tsx`.
- **Social Sharing**: Share budget achievements on X via `xAI` API integration.

- **Cross-Chain Support**: Enable expense coins on Ethereum, Polygon, and Optimism.
- **Predictive Budgeting**: Use AI to forecast expenses based on historical data and market trends.
- **Community Challenges**: Add leaderboards for budgeting competitions with Zora-based rewards.
- **Decentralized Identity**: Integrate privacy-focused authentication (e.g., Civic).
- **NFT Rewards**: Mint NFTs for budget milestones, tradable on Zora’s marketplace.

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

---

### Explanation of `README.md` Updates

1. **Project Overview**:
   - Clearly states the app’s purpose: blockchain-based expense tracking with custom coins on the Base chain using `@zoralabs/coins-sdk`.
   - 
2. **Features**:
   - Lists core functionalities (expense tracking, trending tokens, blockchain integration) and planned enhancements for Waves 1 and 2.
   - Emphasizes the new `ExpenseTracker.tsx` and `TopGainers.tsx` components.

3. **Folder Structure**:
   - Reflects the updated structure with new files (`ExpenseTracker.tsx`, `TopGainers.tsx`) and configuration files.

4. **Setup Instructions**:
   - Includes steps to resolve the `leven` module error and ensure build stability.
   - Covers environment variable setup for Zora and Base RPC.

5. **Key Updates**:
   - Documents fixes for build errors (duplicate `fetchTopGainers`, `uri`, `tradeCoin`, and missing imports).
   - Details judge-driven improvements (e.g., “Trending Expense Tokens,” onboarding modal).

6. **Future Development**:
   - Outlines Wave 1 (AI, gamification, mobile app) and Wave 2 (cross-chain, predictive budgeting, NFTs) to guide future enhancements.
   - Aligns with 2025 trends (Buildfire, Merehead) like AI, mobile-first, and community engagement.

7. **Troubleshooting**:
   - Provides commands to diagnose dependency issues, ensuring developers can replicate the setup.

---

### Integration with Project

The `README.md` should be placed in the project root:
```
zora-ai-expense-tracker/
├── README.md
├── node_modules/
├── public/
├── src/
├── .env
├── config-overrides.js
├── package.json
├── postcss.config.js
├── tsconfig.json
```

**Steps to Apply**:
1. Create or update `README.md` with the above content.
2. Verify all files from the previous response (e.g., `zoraClient.ts`, `TopGainers.tsx`) are in place.
3. Run setup commands:
   ```bash
   npm install --legacy-peer-deps
   npm install leven@4.0.0 --save --legacy-peer-deps
   npm start
   ```
4. Test the build:
   ```bash
   npm run build
   serve -s build
   ```

**Troubleshooting**:
- If `npm start` or `npm run build` fails, share the error output.
- Verify dependencies:
  ```bash
  npm list @zoralabs/coins-sdk viem wagmi react react-router-dom tailwindcss typescript leven
  ```
- Ensure `.env` has valid `REACT_APP_ZORA_API_KEY` and `REACT_APP_RPC_URL`.
