import { defineChain } from 'thirdweb';
import { Chain, anvil, lisk, liskSepolia } from 'viem/chains';

export const LiskSepoliaTestnet = defineChain({
  id: 4202,
  name: 'Lisk Sepolia Testnet',
  nativeCurrency: {
    name: 'Lisk Sepolia Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorers: [
    {
      name: 'Lisk Sepolia BlockScout Explorer',
      url: 'https://sepolia-blockscout.lisk.com',
      apiUrl: 'https://sepolia-blockscout.lisk.com/api/v2',
    },
  ],
  testnet: true,
});

export const LiskMainnet = defineChain({
  id: 1135,
  name: 'Lisk',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorers: [
    {
      name: 'Lisk BlockScout Explorer',
      url: 'https://blockscout.lisk.com',
      apiUrl: 'https://blockscout.lisk.com/api/v2',
    },
  ],
});

export const Localnet = defineChain({
  id: 31337,
  name: 'Anvil Localnet',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorers: [
    {
      name: 'Localnet Block Explorer',
      url: 'http://localhost:8545', // Adjust based on your local environment
      apiUrl: 'http://localhost:8545/api', // Adjust accordingly
    },
  ],
});

export const viemChains: { [chainId: string]: Chain } = {
  [LiskMainnet.id]: lisk,
  [LiskSepoliaTestnet.id]: liskSepolia,
  [Localnet.id]: anvil,
};

export const validChainIds = [
  LiskMainnet.id,
  LiskSepoliaTestnet.id,
  Localnet.id,
];
