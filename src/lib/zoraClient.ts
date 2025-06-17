import { setApiKey, createCoin, tradeCoin, getCoin, getCoinsTopGainers } from "@zoralabs/coins-sdk";
import { createPublicClient, createWalletClient, http, Address, Account } from "viem";
import { base } from "viem/chains";
import { DeployCurrency } from "@zoralabs/coins-sdk";

setApiKey(process.env.REACT_APP_ZORA_API_KEY || "");

const publicClient = createPublicClient({
  chain: base,
  transport: http(process.env.REACT_APP_RPC_URL),
});

const walletClient = createWalletClient({
  chain: base,
  transport: http(process.env.REACT_APP_RPC_URL),
});

export async function createExpenseCoin(
  params: {
    name: string;
    symbol: string;
    uri: string;
    payoutRecipient: Address;
    platformReferrer?: Address;
  },
  account: Account
) {
  const result = await createCoin(
    {
      ...params,
      chainId: base.id,
      currency: DeployCurrency.ZORA,
    },
    { ...walletClient, account },
    publicClient,
    { gasMultiplier: 120 }
  );
  return result;
}

export async function tradeExpenseCoin(
  params: {
    direction: "buy" | "sell";
    target: Address;
    recipient: Address;
    orderSize: bigint;
    minAmountOut?: bigint;
    tradeReferrer?: Address;
  },
  account: Account
) {
  const result = await tradeCoin(
    {
      direction: params.direction,
      target: params.target,
      args: {
        recipient: params.recipient,
        orderSize: params.orderSize,
        minAmountOut: params.minAmountOut,
        tradeReferrer: params.tradeReferrer,
      },
    },
    { ...walletClient, account },
    publicClient
  );
  return result;
}

export async function fetchCoinDetails(address: string) {
  const response = await getCoin({ address, chain: base.id });
  return response.data?.zora20Token;
}

export async function fetchTopGainers() {
  const response = await getCoinsTopGainers({ count: 10 });
  return response.data?.exploreList?.edges?.map((edge: any) => edge.node) || [];
}