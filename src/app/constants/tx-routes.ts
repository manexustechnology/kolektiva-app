import { Chain } from "thirdweb";

interface BlockExplorer {
  name: string;
  url: string;
  apiUrl?: string;
}

interface TxUrlParams {
  [chainId: string]: {
    getTxUrl: (blockExplorer: BlockExplorer) => {
      txApiUrl: string;
      txUrl: string;
    };
  };
}

const txRoute: TxUrlParams = {
  4202: {
    getTxUrl: (blockExplorer: BlockExplorer) => ({
      txApiUrl: `${blockExplorer.apiUrl}/transactions`,
      txUrl: `${blockExplorer.url}/tx`,
    }),
  },
};

export const getTxRoutes = (chain: Chain) => {
  const chainId = chain.id.toString();
  const blockExplorer: BlockExplorer | null = chain.blockExplorers
    ? chain.blockExplorers[0]
    : null;
  if (!blockExplorer) {
    throw new Error("Block explorer not found.");
  }
  if (!txRoute.hasOwnProperty(chainId)) {
    throw new Error(`API route not found for chain ID: ${chainId}`);
  }
  return txRoute[chainId].getTxUrl(blockExplorer);
};
