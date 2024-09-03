import { defineChain } from "thirdweb";
import { Chain, lisk, liskSepolia } from "viem/chains";

export const LiskSepoliaTestnet = defineChain({
  id: 4202,
  name: "Lisk Sepolia Testnet",
  nativeCurrency: {
    name: "Lisk Sepolia Ether",
    symbol: "ETH",
    decimals: 18,
  },
  blockExplorers: [
    {
      name: "Lisk Sepolia BlockScout Explorer",
      url: "https://sepolia-blockscout.lisk.com",
      apiUrl: "https://sepolia-blockscout.lisk.com/api/v2",
    },
  ],
  testnet: true,
});

export const LiskMainnet = defineChain({
  id: 1135,
  name: "Lisk",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  blockExplorers: [
    {
      name: "Lisk BlockScout Explorer",
      url: "https://blockscout.lisk.com",
      apiUrl: "https://blockscout.lisk.com/api/v2",
    },
  ],
});

export const viemChains: { [chainId: string]: Chain } = {
  1135: lisk,
  4202: liskSepolia,
};

export const validChainIds = [4202, 1135];
