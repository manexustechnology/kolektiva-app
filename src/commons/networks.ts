import { defineChain } from "thirdweb";

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
