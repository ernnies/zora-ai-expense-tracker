import { useState, useCallback } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { Address, parseEther, Account } from "viem";
import { createExpenseCoin, tradeExpenseCoin, fetchCoinDetails, fetchTopGainers } from "../lib/zoraClient";

interface Coin {
  address: string;
  name: string;
  symbol: string;
  marketCap?: string;
}

export function useZoraCoin() {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCoin = useCallback(
    async (name: string, symbol: string, uri: string) => {
      if (!address || !walletClient) return;
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
      if (!address || !walletClient) return;
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

  return { createCoin, tradeCoin, getCoinDetails, getTopGainers, loading, error };
}