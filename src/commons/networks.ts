import { defineChain, Chain as ThirdwebChain } from 'thirdweb/chains';
import {
  Chain as ViemChain,
  anvil,
  lisk,
  liskSepolia,
  baseSepolia,
  base,
} from 'viem/chains';

export const BaseMainnet = defineChain({
  id: 8453,
  name: 'Base',
  rpc: 'https://mainnet.base.org',
  icon: {
    url: '/chain-logo/base-logo-in-blue.svg',
    width: 32,
    height: 32,
    format: 'svg',
  },
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  blockExplorers: [
    {
      name: 'Base BlockScout Explorer',
      url: 'https://base.blockscout.com',
      apiUrl: 'https://base.blockscout.com/api/v2',
    },
  ],
});

export const BaseSepoliaTestnet = defineChain({
  id: 84532,
  name: 'Base Sepolia',
  rpc: 'https://base-sepolia.blockpi.network/v1/rpc/public',
  icon: {
    url: '/chain-logo/base-logo-in-blue.svg',
    width: 32,
    height: 32,
    format: 'svg',
  },
  nativeCurrency: { name: 'Base Sepolia Ether', symbol: 'ETH', decimals: 18 },
  blockExplorers: [
    {
      name: 'Base Sepolia BlockScout Explorer',
      url: 'https://base-sepolia.blockscout.com',
      apiUrl: 'https://base-sepolia.blockscout.com/api/v2',
    },
  ],
  testnet: true,
});

export const LiskSepoliaTestnet = defineChain({
  id: 4202,
  name: 'Lisk Sepolia Testnet',
  rpc: 'https://rpc.sepolia-api.lisk.com',
  icon: {
    url: '/chain-logo/lisk-logo.svg',
    width: 32,
    height: 32,
    format: 'svg',
  },
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
  rpc: 'https://rpc.api.lisk.com',
  icon: {
    url: '/chain-logo/lisk-logo.svg',
    width: 32,
    height: 32,
    format: 'svg',
  },
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
  rpc: 'http://localhost:8545',
  icon: {
    url: 'https://fakeimg.pl/350x300?text=logo&font=bebas',
    width: 350,
    height: 300,
    format: 'png',
  },
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorers: [
    {
      name: 'Localnet Block Explorer',
      url: 'http://localhost:8545',
      apiUrl: 'http://localhost:8545/api',
    },
  ],
});

export const viemChains: { [chainId: string]: ViemChain } = {
  [BaseMainnet.id]: base,
  [BaseSepoliaTestnet.id]: baseSepolia,
  [LiskMainnet.id]: lisk,
  [LiskSepoliaTestnet.id]: liskSepolia,
  [Localnet.id]: anvil,
};

export const thirdwebChains: { [chainId: string]: ThirdwebChain } = {
  [BaseMainnet.id]: BaseMainnet,
  [BaseSepoliaTestnet.id]: BaseSepoliaTestnet,
  [LiskMainnet.id]: LiskMainnet,
  [LiskSepoliaTestnet.id]: LiskSepoliaTestnet,
  [Localnet.id]: Localnet,
};

export const chainLogos: { [chainId: string]: string } = {
  [BaseMainnet.id]: '/chain-logo/base-logo-in-blue.svg',
  [BaseSepoliaTestnet.id]: '/chain-logo/base-logo-in-blue.svg',
  [LiskMainnet.id]: '/chain-logo/lisk-logo.svg',
  [LiskSepoliaTestnet.id]: '/chain-logo/lisk-logo.svg',
  [Localnet.id]: 'https://fakeimg.pl/350x300?text=logo&font=bebas',
};

export const validChainIds = [
  BaseMainnet.id,
  BaseSepoliaTestnet.id,
  LiskMainnet.id,
  LiskSepoliaTestnet.id,
  Localnet.id,
];
