import { useZoraCoin } from '../hooks/useZoraCoin';
import { useState } from 'react';

const NFTDisplay = () => {
  const { mintBudgetNFT } = useZoraCoin();
  const [nft, setNft] = useState(null);

  const mint = async () => {
    const result = await mintBudgetNFT('0x0000000000000000000000000000000000000000' as Address, 'Budget Milestone');
    setNft(result);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Budget NFTs</h2>
      <button
        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        onClick={mint}
      >
        Mint NFT
      </button>
      {nft && <img src={nft.image} alt="NFT Reward" className="mt-4" />}
    </div>
  );
};

export default NFTDisplay;