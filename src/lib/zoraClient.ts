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
    category?: string; // e.g., "Groceries", "Rent"
  },
  account: Account
) {
  const validUri = params.uri.startsWith('https://') || params.uri.startsWith('ipfs://')
    ? params.uri
    : `https://metadata.zora.co/${params.name}`;
  const result = await createCoin(
    {
      ...params,
      uri: validUri,
      chainId: base.id,
      currency: DeployCurrency.ZORA,
    },
    { ...walletClient, account },
    publicClient,
    { gasMultiplier: 120 }
  );
  return { ...result, category: params.category };
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
  const coins = response.data?.exploreList?.edges?.map((edge: any) => ({
    ...edge.node,
    category: edge.node.name.includes('Stable') || edge.node.symbol.includes('USD')
      ? 'Budget-Friendly'
      : edge.node.name.includes('Utility') ? 'Utility' : 'Investment',
  })) || [];
  // Filter out irrelevant tokens (e.g., meme coins like amps.fun)
  return coins.filter((coin: any) => !coin.name.toLowerCase().includes('amps.fun'));
}

export async function getBudgetAdvice(coins: string[]) {
  const data = await Promise.all(coins.map(addr => fetchCoinDetails(addr)));
  const response = await fetch('https://x.ai/api/analyze', {
    method: 'POST',
    body: JSON.stringify({ spending: data }),
    headers: { 'Authorization': `Bearer ${process.env.REACT_APP_XAI_API_KEY}` },
  }).then(res => res.json());
  return response.advice || [];
}

export async function getTutorialSteps() {
  const response = await fetch('https://x.ai/api/tutorial', {
    method: 'POST',
    body: JSON.stringify({ context: 'expense-tracker' }),
    headers: { 'Authorization': `Bearer ${process.env.REACT_APP_XAI_API_KEY}` },
  }).then(res => res.json());
  return response.steps || [];
}