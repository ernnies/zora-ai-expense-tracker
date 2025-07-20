import { useState, useCallback } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { Address, parseEther, Account } from "viem";
import { createExpenseCoin, tradeExpenseCoin, fetchCoinDetails, fetchTopGainers, getBudgetAdvice, getTutorialSteps } from "../lib/zoraClient";

interface Coin {
  address: string;
  name: string;
  symbol: string;
  marketCap?: string;
  category?: string;
}

export function useZoraCoin() {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [budgetPoints, setBudgetPoints] = useState(0);

  const createCoin = useCallback(
    async (name: string, symbol: string, uri: string, category?: string) => {
      if (!address || !walletClient) {
        setError("Wallet not connected");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const account: Account = { address: address as Address, type: "json-rpc" };
        const result = await createExpenseCoin(
          {
            name,
            symbol,
            uri,
            payoutRecipient: address as Address,
            platformReferrer: "0x0000000000000000000000000000000000000000" as Address,
            category,
          },
          account
        );
        return result;
      } catch (err: any) {
        setError(err.message || "Failed to create coin");
      } finally {
        setLoading(false);
      }
    },
    [address, walletClient]
  );

  const tradeCoin = useCallback(
    async (direction: "buy" | "sell", target: Address, amount: string) => {
      if (!address || !walletClient) {
        setError("Wallet not connected");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const account: Account = { address: address as Address, type: "json-rpc" };
        const result = await tradeExpenseCoin(
          {
            direction,
            target,
            recipient: address as Address,
            orderSize: parseEther(amount),
            minAmountOut: BigInt(0),
            tradeReferrer: "0x0000000000000000000000000000000000000000" as Address,
          },
          account
        );
        return result;
      } catch (err: any) {
        setError(err.message || `Failed to ${direction} coin`);
      } finally {
        setLoading(false);
      }
    },
    [address, walletClient]
  );

  const getCoinDetails = useCallback(
    async (address: string) => {
      setLoading(true);
      setError(null);
      try {
        const coin = await fetchCoinDetails(address);
        return coin;
      } catch (err: any) {
        setError(err.message || "Failed to fetch coin details");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getTopGainers = useCallback(async (): Promise<Coin[]> => {
    setLoading(true);
    setError(null);
    try {
      const coins = await fetchTopGainers();
      return coins as Coin[];
    } catch (err: any) {
      setError(err.message || "Failed to fetch top gainers");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getBudgetAdvice = useCallback(async (coinAddresses: string[]) => {
    setLoading(true);
    setError(null);
    try {
      const advice = await getBudgetAdvice(coinAddresses);
      return advice;
    } catch (err: any) {
      setError(err.message || "Failed to fetch budget advice");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getTutorial = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const steps = await getTutorialSteps();
      return steps;
    } catch (err: any) {
      setError(err.message || "Failed to fetch tutorial steps");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const trackSavings = useCallback(async (coinAddress: string, target: string) => {
    setLoading(true);
    setError(null);
    try {
      const coin = await getCoinDetails(coinAddress);
      if (Number(coin.balance) <= parseEther(target)) {
        setBudgetPoints(prev => prev + 10);
      }
    } catch (err: any) {
      setError(err.message || "Failed to track savings");
    } finally {
      setLoading(false);
    }
  }, []);

  const shareAchievement = useCallback(async (coin: { name: string }) => {
    setLoading(true);
    setError(null);
    try {
      const message = `Saved on my ${coin.name} budget with Zora AI Expense Tracker! #Budgeting`;
      await fetch('https://x.ai/api/post', {
        method: 'POST',
        body: JSON.stringify({ content: message, userId: address }),
      });
    } catch (err: any) {
      setError(err.message || "Failed to share achievement");
    } finally {
      setLoading(false);
    }
  }, [address]);

  return {
    createCoin,
    tradeCoin,
    getCoinDetails,
    getTopGainers,
    getBudgetAdvice,
    getTutorial,
    trackSavings,
    shareAchievement,
    budgetPoints,
    loading,
    error,
  };
}