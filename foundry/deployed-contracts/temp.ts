export const deployedContracts: DeployedContracts = {
  4202: {
    MockUSDT: {
      address: '0x2e6a4bb23db7991efb4987bbc53753a52a52e991',
      abi: [
        {
          type: 'constructor',
          inputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'allowance',
          inputs: [
            {
              name: 'owner',
              type: 'address',
              internalType: 'address',
            },
            {
              name: 'spender',
              type: 'address',
              internalType: 'address',
            },
          ],
          outputs: [
            {
              name: '',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'approve',
          inputs: [
            {
              name: 'spender',
              type: 'address',
              internalType: 'address',
            },
            {
              name: 'value',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          outputs: [
            {
              name: '',
              type: 'bool',
              internalType: 'bool',
            },
          ],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'balanceOf',
          inputs: [
            {
              name: 'account',
              type: 'address',
              internalType: 'address',
            },
          ],
          outputs: [
            {
              name: '',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'decimals',
          inputs: [],
          outputs: [
            {
              name: '',
              type: 'uint8',
              internalType: 'uint8',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'mint',
          inputs: [
            {
              name: 'account',
              type: 'address',
              internalType: 'address',
            },
            {
              name: 'amount',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'mintFor',
          inputs: [
            {
              name: 'account',
              type: 'address',
              internalType: 'address',
            },
            {
              name: 'amount',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'name',
          inputs: [],
          outputs: [
            {
              name: '',
              type: 'string',
              internalType: 'string',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'owner',
          inputs: [],
          outputs: [
            {
              name: '',
              type: 'address',
              internalType: 'address',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'renounceOwnership',
          inputs: [],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'symbol',
          inputs: [],
          outputs: [
            {
              name: '',
              type: 'string',
              internalType: 'string',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'totalSupply',
          inputs: [],
          outputs: [
            {
              name: '',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'transfer',
          inputs: [
            {
              name: 'to',
              type: 'address',
              internalType: 'address',
            },
            {
              name: 'value',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          outputs: [
            {
              name: '',
              type: 'bool',
              internalType: 'bool',
            },
          ],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'transferFrom',
          inputs: [
            {
              name: 'from',
              type: 'address',
              internalType: 'address',
            },
            {
              name: 'to',
              type: 'address',
              internalType: 'address',
            },
            {
              name: 'value',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          outputs: [
            {
              name: '',
              type: 'bool',
              internalType: 'bool',
            },
          ],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'transferOwnership',
          inputs: [
            {
              name: 'newOwner',
              type: 'address',
              internalType: 'address',
            },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'event',
          name: 'Approval',
          inputs: [
            {
              name: 'owner',
              type: 'address',
              indexed: true,
              internalType: 'address',
            },
            {
              name: 'spender',
              type: 'address',
              indexed: true,
              internalType: 'address',
            },
            {
              name: 'value',
              type: 'uint256',
              indexed: false,
              internalType: 'uint256',
            },
          ],
          anonymous: false,
        },
        {
          type: 'event',
          name: 'OwnershipTransferred',
          inputs: [
            {
              name: 'previousOwner',
              type: 'address',
              indexed: true,
              internalType: 'address',
            },
            {
              name: 'newOwner',
              type: 'address',
              indexed: true,
              internalType: 'address',
            },
          ],
          anonymous: false,
        },
        {
          type: 'event',
          name: 'Transfer',
          inputs: [
            {
              name: 'from',
              type: 'address',
              indexed: true,
              internalType: 'address',
            },
            {
              name: 'to',
              type: 'address',
              indexed: true,
              internalType: 'address',
            },
            {
              name: 'value',
              type: 'uint256',
              indexed: false,
              internalType: 'uint256',
            },
          ],
          anonymous: false,
        },
        {
          type: 'error',
          name: 'ERC20InsufficientAllowance',
          inputs: [
            {
              name: 'spender',
              type: 'address',
              internalType: 'address',
            },
            {
              name: 'allowance',
              type: 'uint256',
              internalType: 'uint256',
            },
            {
              name: 'needed',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
        },
        {
          type: 'error',
          name: 'ERC20InsufficientBalance',
          inputs: [
            {
              name: 'sender',
              type: 'address',
              internalType: 'address',
            },
            {
              name: 'balance',
              type: 'uint256',
              internalType: 'uint256',
            },
            {
              name: 'needed',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
        },
        {
          type: 'error',
          name: 'ERC20InvalidApprover',
          inputs: [
            {
              name: 'approver',
              type: 'address',
              internalType: 'address',
            },
          ],
        },
        {
          type: 'error',
          name: 'ERC20InvalidReceiver',
          inputs: [
            {
              name: 'receiver',
              type: 'address',
              internalType: 'address',
            },
          ],
        },
        {
          type: 'error',
          name: 'ERC20InvalidSender',
          inputs: [
            {
              name: 'sender',
              type: 'address',
              internalType: 'address',
            },
          ],
        },
        {
          type: 'error',
          name: 'ERC20InvalidSpender',
          inputs: [
            {
              name: 'spender',
              type: 'address',
              internalType: 'address',
            },
          ],
        },
        {
          type: 'error',
          name: 'OwnableInvalidOwner',
          inputs: [
            {
              name: 'owner',
              type: 'address',
              internalType: 'address',
            },
          ],
        },
        {
          type: 'error',
          name: 'OwnableUnauthorizedAccount',
          inputs: [
            {
              name: 'account',
              type: 'address',
              internalType: 'address',
            },
          ],
        },
      ],
      inheritedFunctions: {},
    },
    KolektivaOracle: {
      address: '0xb5479eab222051e86370e1d99ad93d304ec7efba',
      abi: [
        {
          type: 'constructor',
          inputs: [
            {
              name: '_owner',
              type: 'address',
              internalType: 'address',
            },
          ],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'PRICE_PRECISION',
          inputs: [],
          outputs: [
            {
              name: '',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'batchUpdateCategoryPrices',
          inputs: [
            {
              name: 'categoryHashes',
              type: 'bytes32[]',
              internalType: 'bytes32[]',
            },
            {
              name: 'newPrices',
              type: 'uint256[]',
              internalType: 'uint256[]',
            },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'categoryPriceData',
          inputs: [
            {
              name: '',
              type: 'bytes32',
              internalType: 'bytes32',
            },
          ],
          outputs: [
            {
              name: 'averagePricePerSqm',
              type: 'uint256',
              internalType: 'uint256',
            },
            {
              name: 'lastUpdateTimestamp',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'getCategoryPrice',
          inputs: [
            {
              name: 'categoryHash',
              type: 'bytes32',
              internalType: 'bytes32',
            },
          ],
          outputs: [
            {
              name: '',
              type: 'uint256',
              internalType: 'uint256',
            },
            {
              name: '',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'getFrequency',
          inputs: [],
          outputs: [
            {
              name: '',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'getPropertyValue',
          inputs: [
            {
              name: 'categoryHash',
              type: 'bytes32',
              internalType: 'bytes32',
            },
            {
              name: 'totalArea',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          outputs: [
            {
              name: '',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'getThreshold',
          inputs: [],
          outputs: [
            {
              name: '',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'owner',
          inputs: [],
          outputs: [
            {
              name: '',
              type: 'address',
              internalType: 'address',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'pause',
          inputs: [],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'paused',
          inputs: [],
          outputs: [
            {
              name: '',
              type: 'bool',
              internalType: 'bool',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'renounceOwnership',
          inputs: [],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'setFrequency',
          inputs: [
            {
              name: 'newFrequency',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'setThreshold',
          inputs: [
            {
              name: 'newThreshold',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'transferOwnership',
          inputs: [
            {
              name: 'newOwner',
              type: 'address',
              internalType: 'address',
            },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'unpause',
          inputs: [],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'updateCategoryPrice',
          inputs: [
            {
              name: '_categoryHash',
              type: 'bytes32',
              internalType: 'bytes32',
            },
            {
              name: '_newAveragePricePerSqm',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'event',
          name: 'CategoryPriceUpdated',
          inputs: [
            {
              name: 'categoryHash',
              type: 'bytes32',
              indexed: true,
              internalType: 'bytes32',
            },
            {
              name: 'newPrice',
              type: 'uint256',
              indexed: false,
              internalType: 'uint256',
            },
            {
              name: 'updateTime',
              type: 'uint256',
              indexed: false,
              internalType: 'uint256',
            },
          ],
          anonymous: false,
        },
        {
          type: 'event',
          name: 'FrequencyChanged',
          inputs: [
            {
              name: 'newFrequency',
              type: 'uint256',
              indexed: false,
              internalType: 'uint256',
            },
          ],
          anonymous: false,
        },
        {
          type: 'event',
          name: 'OwnershipTransferred',
          inputs: [
            {
              name: 'previousOwner',
              type: 'address',
              indexed: true,
              internalType: 'address',
            },
            {
              name: 'newOwner',
              type: 'address',
              indexed: true,
              internalType: 'address',
            },
          ],
          anonymous: false,
        },
        {
          type: 'event',
          name: 'Paused',
          inputs: [
            {
              name: 'account',
              type: 'address',
              indexed: false,
              internalType: 'address',
            },
          ],
          anonymous: false,
        },
        {
          type: 'event',
          name: 'ThresholdChanged',
          inputs: [
            {
              name: 'newThreshold',
              type: 'uint256',
              indexed: false,
              internalType: 'uint256',
            },
          ],
          anonymous: false,
        },
        {
          type: 'event',
          name: 'Unpaused',
          inputs: [
            {
              name: 'account',
              type: 'address',
              indexed: false,
              internalType: 'address',
            },
          ],
          anonymous: false,
        },
        {
          type: 'error',
          name: 'CategoryPriceNotSet',
          inputs: [],
        },
        {
          type: 'error',
          name: 'EnforcedPause',
          inputs: [],
        },
        {
          type: 'error',
          name: 'ExpectedPause',
          inputs: [],
        },
        {
          type: 'error',
          name: 'FrequencyNotMet',
          inputs: [],
        },
        {
          type: 'error',
          name: 'MismatchHashesAndPricesLength',
          inputs: [],
        },
        {
          type: 'error',
          name: 'OwnableInvalidOwner',
          inputs: [
            {
              name: 'owner',
              type: 'address',
              internalType: 'address',
            },
          ],
        },
        {
          type: 'error',
          name: 'OwnableUnauthorizedAccount',
          inputs: [
            {
              name: 'account',
              type: 'address',
              internalType: 'address',
            },
          ],
        },
        {
          type: 'error',
          name: 'PriceAboveThreshold',
          inputs: [],
        },
      ],
      inheritedFunctions: {},
    },
    KolektivaHandler: {
      address: '0x6811b65c31325d0abc0b59ad9be0d8add8299dcf',
      abi: [
        {
          type: 'constructor',
          inputs: [
            {
              name: '_owner',
              type: 'address',
              internalType: 'address',
            },
            {
              name: '_usdtTokenAddress',
              type: 'address',
              internalType: 'address',
            },
          ],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'approveMarketToTransferTokens',
          inputs: [
            {
              name: 'name',
              type: 'string',
              internalType: 'string',
            },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'burnTokens',
          inputs: [
            {
              name: 'name',
              type: 'string',
              internalType: 'string',
            },
            {
              name: 'from',
              type: 'address',
              internalType: 'address',
            },
            {
              name: 'amount',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'checkTokenBalance',
          inputs: [
            {
              name: 'name',
              type: 'string',
              internalType: 'string',
            },
          ],
          outputs: [
            {
              name: '',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'createToken',
          inputs: [
            {
              name: 'name',
              type: 'string',
              internalType: 'string',
            },
            {
              name: 'symbol',
              type: 'string',
              internalType: 'string',
            },
            {
              name: 'propertyType',
              type: 'string',
              internalType: 'string',
            },
            {
              name: 'country',
              type: 'string',
              internalType: 'string',
            },
            {
              name: 'state',
              type: 'string',
              internalType: 'string',
            },
            {
              name: 'city',
              type: 'string',
              internalType: 'string',
            },
            {
              name: 'location',
              type: 'string',
              internalType: 'string',
            },
            {
              name: 'totalSupply',
              type: 'uint256',
              internalType: 'uint256',
            },
            {
              name: 'salePrice',
              type: 'uint256',
              internalType: 'uint256',
            },
            {
              name: 'propertyOwner',
              type: 'address',
              internalType: 'address',
            },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'getTokenNames',
          inputs: [],
          outputs: [
            {
              name: '',
              type: 'string[]',
              internalType: 'string[]',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'marketAddresses',
          inputs: [
            {
              name: 'name',
              type: 'string',
              internalType: 'string',
            },
          ],
          outputs: [
            {
              name: '',
              type: 'address',
              internalType: 'address',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'mintTokens',
          inputs: [
            {
              name: 'name',
              type: 'string',
              internalType: 'string',
            },
            {
              name: 'to',
              type: 'address',
              internalType: 'address',
            },
            {
              name: 'amount',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'owner',
          inputs: [],
          outputs: [
            {
              name: '',
              type: 'address',
              internalType: 'address',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'renounceOwnership',
          inputs: [],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'revokeToken',
          inputs: [
            {
              name: 'name',
              type: 'string',
              internalType: 'string',
            },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'setFeePercentage',
          inputs: [
            {
              name: 'name',
              type: 'string',
              internalType: 'string',
            },
            {
              name: '_newFeePercentage',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'tokenAddresses',
          inputs: [
            {
              name: 'name',
              type: 'string',
              internalType: 'string',
            },
          ],
          outputs: [
            {
              name: '',
              type: 'address',
              internalType: 'address',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'transferOwnership',
          inputs: [
            {
              name: 'newOwner',
              type: 'address',
              internalType: 'address',
            },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'usdtToken',
          inputs: [],
          outputs: [
            {
              name: '',
              type: 'address',
              internalType: 'contract IERC20',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'withdrawFee',
          inputs: [
            {
              name: 'amount',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'withdrawToken',
          inputs: [
            {
              name: 'name',
              type: 'string',
              internalType: 'string',
            },
            {
              name: 'amount',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'event',
          name: 'FeePercentageUpdated',
          inputs: [
            {
              name: 'name',
              type: 'string',
              indexed: false,
              internalType: 'string',
            },
            {
              name: 'newFeePercentage',
              type: 'uint256',
              indexed: false,
              internalType: 'uint256',
            },
          ],
          anonymous: false,
        },
        {
          type: 'event',
          name: 'MarketCreated',
          inputs: [
            {
              name: 'name',
              type: 'string',
              indexed: false,
              internalType: 'string',
            },
            {
              name: 'tokenAddress',
              type: 'address',
              indexed: false,
              internalType: 'address',
            },
            {
              name: 'marketAddress',
              type: 'address',
              indexed: false,
              internalType: 'address',
            },
          ],
          anonymous: false,
        },
        {
          type: 'event',
          name: 'MarketRevoked',
          inputs: [
            {
              name: 'name',
              type: 'string',
              indexed: false,
              internalType: 'string',
            },
            {
              name: 'tokenAddress',
              type: 'address',
              indexed: false,
              internalType: 'address',
            },
            {
              name: 'marketAddress',
              type: 'address',
              indexed: false,
              internalType: 'address',
            },
          ],
          anonymous: false,
        },
        {
          type: 'event',
          name: 'OwnershipTransferred',
          inputs: [
            {
              name: 'previousOwner',
              type: 'address',
              indexed: true,
              internalType: 'address',
            },
            {
              name: 'newOwner',
              type: 'address',
              indexed: true,
              internalType: 'address',
            },
          ],
          anonymous: false,
        },
        {
          type: 'event',
          name: 'TokenCreated',
          inputs: [
            {
              name: 'name',
              type: 'string',
              indexed: false,
              internalType: 'string',
            },
            {
              name: 'tokenAddress',
              type: 'address',
              indexed: false,
              internalType: 'address',
            },
          ],
          anonymous: false,
        },
        {
          type: 'event',
          name: 'TokenRevoked',
          inputs: [
            {
              name: 'name',
              type: 'string',
              indexed: false,
              internalType: 'string',
            },
            {
              name: 'tokenAddress',
              type: 'address',
              indexed: false,
              internalType: 'address',
            },
          ],
          anonymous: false,
        },
        {
          type: 'event',
          name: 'WithdrawnFee',
          inputs: [
            {
              name: 'amount',
              type: 'uint256',
              indexed: false,
              internalType: 'uint256',
            },
          ],
          anonymous: false,
        },
        {
          type: 'event',
          name: 'WithdrawnToken',
          inputs: [
            {
              name: 'name',
              type: 'string',
              indexed: false,
              internalType: 'string',
            },
            {
              name: 'tokenAddress',
              type: 'address',
              indexed: false,
              internalType: 'address',
            },
            {
              name: 'amount',
              type: 'uint256',
              indexed: false,
              internalType: 'uint256',
            },
          ],
          anonymous: false,
        },
        {
          type: 'error',
          name: 'InsufficientBalance',
          inputs: [],
        },
        {
          type: 'error',
          name: 'MarketDoesNotExist',
          inputs: [],
        },
        {
          type: 'error',
          name: 'OwnableInvalidOwner',
          inputs: [
            {
              name: 'owner',
              type: 'address',
              internalType: 'address',
            },
          ],
        },
        {
          type: 'error',
          name: 'OwnableUnauthorizedAccount',
          inputs: [
            {
              name: 'account',
              type: 'address',
              internalType: 'address',
            },
          ],
        },
        {
          type: 'error',
          name: 'TokenAlreadyExist',
          inputs: [],
        },
        {
          type: 'error',
          name: 'TokenDoesNotExist',
          inputs: [],
        },
      ],
      inheritedFunctions: {},
    },
    KolektivaToken: {
      address: '',
      abi: [
        {
          type: 'constructor',
          inputs: [
            { name: 'name', type: 'string', internalType: 'string' },
            { name: 'symbol', type: 'string', internalType: 'string' },
            { name: '_propertyType', type: 'string', internalType: 'string' },
            { name: '_country', type: 'string', internalType: 'string' },
            { name: '_state', type: 'string', internalType: 'string' },
            { name: '_city', type: 'string', internalType: 'string' },
            { name: '_location', type: 'string', internalType: 'string' },
            {
              name: '_totalSupply',
              type: 'uint256',
              internalType: 'uint256',
            },
            {
              name: '_tokenHandler',
              type: 'address',
              internalType: 'address',
            },
          ],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'allowance',
          inputs: [
            { name: 'owner', type: 'address', internalType: 'address' },
            { name: 'spender', type: 'address', internalType: 'address' },
          ],
          outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'approve',
          inputs: [
            { name: 'spender', type: 'address', internalType: 'address' },
            { name: 'value', type: 'uint256', internalType: 'uint256' },
          ],
          outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'availableForSale',
          inputs: [],
          outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'balanceOf',
          inputs: [
            { name: 'account', type: 'address', internalType: 'address' },
          ],
          outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'burn',
          inputs: [
            { name: 'from', type: 'address', internalType: 'address' },
            { name: 'amount', type: 'uint256', internalType: 'uint256' },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'decimals',
          inputs: [],
          outputs: [{ name: '', type: 'uint8', internalType: 'uint8' }],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'getInformation',
          inputs: [],
          outputs: [
            { name: '', type: 'string', internalType: 'string' },
            { name: '', type: 'string', internalType: 'string' },
            { name: '', type: 'string', internalType: 'string' },
            { name: '', type: 'string', internalType: 'string' },
            { name: '', type: 'string', internalType: 'string' },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'lastAppraisalDate',
          inputs: [],
          outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'mint',
          inputs: [
            { name: 'to', type: 'address', internalType: 'address' },
            { name: 'amount', type: 'uint256', internalType: 'uint256' },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'name',
          inputs: [],
          outputs: [{ name: '', type: 'string', internalType: 'string' }],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'owner',
          inputs: [],
          outputs: [{ name: '', type: 'address', internalType: 'address' }],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'propertyValue',
          inputs: [],
          outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'renounceOwnership',
          inputs: [],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'symbol',
          inputs: [],
          outputs: [{ name: '', type: 'string', internalType: 'string' }],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'tokenHandler',
          inputs: [],
          outputs: [{ name: '', type: 'address', internalType: 'address' }],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'totalSupply',
          inputs: [],
          outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'transfer',
          inputs: [
            { name: 'to', type: 'address', internalType: 'address' },
            { name: 'amount', type: 'uint256', internalType: 'uint256' },
          ],
          outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'transferFrom',
          inputs: [
            { name: 'from', type: 'address', internalType: 'address' },
            { name: 'to', type: 'address', internalType: 'address' },
            { name: 'amount', type: 'uint256', internalType: 'uint256' },
          ],
          outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'transferOwnership',
          inputs: [
            { name: 'newOwner', type: 'address', internalType: 'address' },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'event',
          name: 'Approval',
          inputs: [
            {
              name: 'owner',
              type: 'address',
              indexed: true,
              internalType: 'address',
            },
            {
              name: 'spender',
              type: 'address',
              indexed: true,
              internalType: 'address',
            },
            {
              name: 'value',
              type: 'uint256',
              indexed: false,
              internalType: 'uint256',
            },
          ],
          anonymous: false,
        },
        {
          type: 'event',
          name: 'OwnershipTransferred',
          inputs: [
            {
              name: 'previousOwner',
              type: 'address',
              indexed: true,
              internalType: 'address',
            },
            {
              name: 'newOwner',
              type: 'address',
              indexed: true,
              internalType: 'address',
            },
          ],
          anonymous: false,
        },
        {
          type: 'event',
          name: 'Transfer',
          inputs: [
            {
              name: 'from',
              type: 'address',
              indexed: true,
              internalType: 'address',
            },
            {
              name: 'to',
              type: 'address',
              indexed: true,
              internalType: 'address',
            },
            {
              name: 'value',
              type: 'uint256',
              indexed: false,
              internalType: 'uint256',
            },
          ],
          anonymous: false,
        },
        { type: 'error', name: 'CannotBeTransferredYet', inputs: [] },
        {
          type: 'error',
          name: 'ERC20InsufficientAllowance',
          inputs: [
            { name: 'spender', type: 'address', internalType: 'address' },
            { name: 'allowance', type: 'uint256', internalType: 'uint256' },
            { name: 'needed', type: 'uint256', internalType: 'uint256' },
          ],
        },
        {
          type: 'error',
          name: 'ERC20InsufficientBalance',
          inputs: [
            { name: 'sender', type: 'address', internalType: 'address' },
            { name: 'balance', type: 'uint256', internalType: 'uint256' },
            { name: 'needed', type: 'uint256', internalType: 'uint256' },
          ],
        },
        {
          type: 'error',
          name: 'ERC20InvalidApprover',
          inputs: [
            { name: 'approver', type: 'address', internalType: 'address' },
          ],
        },
        {
          type: 'error',
          name: 'ERC20InvalidReceiver',
          inputs: [
            { name: 'receiver', type: 'address', internalType: 'address' },
          ],
        },
        {
          type: 'error',
          name: 'ERC20InvalidSender',
          inputs: [
            { name: 'sender', type: 'address', internalType: 'address' },
          ],
        },
        {
          type: 'error',
          name: 'ERC20InvalidSpender',
          inputs: [
            { name: 'spender', type: 'address', internalType: 'address' },
          ],
        },
        { type: 'error', name: 'ExceedMaxSupply', inputs: [] },
        {
          type: 'error',
          name: 'OwnableInvalidOwner',
          inputs: [{ name: 'owner', type: 'address', internalType: 'address' }],
        },
        {
          type: 'error',
          name: 'OwnableUnauthorizedAccount',
          inputs: [
            { name: 'account', type: 'address', internalType: 'address' },
          ],
        },
      ],
      inheritedFunctions: {},
    },
    KolektivaMarket: {
      address: '',
      abi: [
        {
          type: 'constructor',
          inputs: [
            {
              name: '_kolektivaToken',
              type: 'address',
              internalType: 'address',
            },
            { name: '_usdtToken', type: 'address', internalType: 'address' },
            {
              name: '_propertyOwner',
              type: 'address',
              internalType: 'address',
            },
            { name: '_handler', type: 'address', internalType: 'address' },
            { name: '_salePrice', type: 'uint256', internalType: 'uint256' },
          ],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'FEE_PRECISION',
          inputs: [],
          outputs: [{ name: '', type: 'uint128', internalType: 'uint128' }],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'calculateBuyCost',
          inputs: [
            { name: '_amount', type: 'uint256', internalType: 'uint256' },
          ],
          outputs: [
            { name: 'totalCost', type: 'uint256', internalType: 'uint256' },
            { name: 'fees', type: 'uint256', internalType: 'uint256' },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'calculateSellProceeds',
          inputs: [
            { name: '_amount', type: 'uint256', internalType: 'uint256' },
          ],
          outputs: [
            {
              name: 'totalProceeds',
              type: 'uint256',
              internalType: 'uint256',
            },
            { name: 'fees', type: 'uint256', internalType: 'uint256' },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'cancelOrder',
          inputs: [
            { name: '_index', type: 'uint256', internalType: 'uint256' },
            { name: 'isBuyOrder', type: 'bool', internalType: 'bool' },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'endInitialOffering',
          inputs: [],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'feePercentage',
          inputs: [],
          outputs: [{ name: '', type: 'uint128', internalType: 'uint128' }],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'getBuyOrderByIndex',
          inputs: [{ name: 'index', type: 'uint256', internalType: 'uint256' }],
          outputs: [
            {
              name: '',
              type: 'tuple',
              internalType: 'struct OrderLib.Order',
              components: [
                { name: 'trader', type: 'address', internalType: 'address' },
                { name: 'amount', type: 'uint256', internalType: 'uint256' },
                { name: 'price', type: 'uint256', internalType: 'uint256' },
                { name: 'orderId', type: 'uint256', internalType: 'uint256' },
              ],
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'getBuyOrdersCount',
          inputs: [],
          outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'getSellOrderByIndex',
          inputs: [{ name: 'index', type: 'uint256', internalType: 'uint256' }],
          outputs: [
            {
              name: '',
              type: 'tuple',
              internalType: 'struct OrderLib.Order',
              components: [
                { name: 'trader', type: 'address', internalType: 'address' },
                { name: 'amount', type: 'uint256', internalType: 'uint256' },
                { name: 'price', type: 'uint256', internalType: 'uint256' },
                { name: 'orderId', type: 'uint256', internalType: 'uint256' },
              ],
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'getSellOrdersCount',
          inputs: [],
          outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'handler',
          inputs: [],
          outputs: [{ name: '', type: 'address', internalType: 'address' }],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'initialOfferingActive',
          inputs: [],
          outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'initialOfferingBuy',
          inputs: [
            { name: '_amount', type: 'uint256', internalType: 'uint256' },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'initialOfferingSupply',
          inputs: [],
          outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'instantBuy',
          inputs: [
            { name: '_amount', type: 'uint256', internalType: 'uint256' },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'instantSell',
          inputs: [
            { name: '_amount', type: 'uint256', internalType: 'uint256' },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'kolektivaToken',
          inputs: [],
          outputs: [
            { name: '', type: 'address', internalType: 'contract IERC20' },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'lastTradedPrice',
          inputs: [],
          outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'owner',
          inputs: [],
          outputs: [{ name: '', type: 'address', internalType: 'address' }],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'placeBuyOrder',
          inputs: [
            { name: '_amount', type: 'uint256', internalType: 'uint256' },
            { name: '_price', type: 'uint256', internalType: 'uint256' },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'placeSellOrder',
          inputs: [
            { name: '_amount', type: 'uint256', internalType: 'uint256' },
            { name: '_price', type: 'uint256', internalType: 'uint256' },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'propertyOwner',
          inputs: [],
          outputs: [{ name: '', type: 'address', internalType: 'address' }],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'propertyOwnerBalance',
          inputs: [],
          outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'renounceOwnership',
          inputs: [],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'salePrice',
          inputs: [],
          outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'setFeePercentage',
          inputs: [
            {
              name: '_newFeePercentage',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'transferOwnership',
          inputs: [
            { name: 'newOwner', type: 'address', internalType: 'address' },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'usdtToken',
          inputs: [],
          outputs: [
            { name: '', type: 'address', internalType: 'contract IERC20' },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'withdrawPropertyOwnerFunds',
          inputs: [],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'event',
          name: 'InitialOfferingPurchase',
          inputs: [
            {
              name: 'buyer',
              type: 'address',
              indexed: true,
              internalType: 'address',
            },
            {
              name: 'amount',
              type: 'uint256',
              indexed: false,
              internalType: 'uint256',
            },
            {
              name: 'totalCost',
              type: 'uint256',
              indexed: false,
              internalType: 'uint256',
            },
            {
              name: 'fee',
              type: 'uint256',
              indexed: false,
              internalType: 'uint256',
            },
            {
              name: 'timestamp',
              type: 'uint256',
              indexed: false,
              internalType: 'uint256',
            },
          ],
          anonymous: false,
        },
        {
          type: 'event',
          name: 'InstantTrade',
          inputs: [
            {
              name: 'trader',
              type: 'address',
              indexed: true,
              internalType: 'address',
            },
            {
              name: 'amount',
              type: 'uint256',
              indexed: false,
              internalType: 'uint256',
            },
            {
              name: 'totalPrice',
              type: 'uint256',
              indexed: false,
              internalType: 'uint256',
            },
            {
              name: 'isBuy',
              type: 'bool',
              indexed: false,
              internalType: 'bool',
            },
            {
              name: 'timestamp',
              type: 'uint256',
              indexed: false,
              internalType: 'uint256',
            },
          ],
          anonymous: false,
        },
        {
          type: 'event',
          name: 'OrderCancelled',
          inputs: [
            {
              name: 'trader',
              type: 'address',
              indexed: true,
              internalType: 'address',
            },
            {
              name: 'amount',
              type: 'uint256',
              indexed: false,
              internalType: 'uint256',
            },
            {
              name: 'price',
              type: 'uint256',
              indexed: false,
              internalType: 'uint256',
            },
            {
              name: 'isBuyOrder',
              type: 'bool',
              indexed: false,
              internalType: 'bool',
            },
            {
              name: 'timestamp',
              type: 'uint256',
              indexed: false,
              internalType: 'uint256',
            },
          ],
          anonymous: false,
        },
        {
          type: 'event',
          name: 'OrderFulfilled',
          inputs: [
            {
              name: 'buyer',
              type: 'address',
              indexed: true,
              internalType: 'address',
            },
            {
              name: 'seller',
              type: 'address',
              indexed: true,
              internalType: 'address',
            },
            {
              name: 'amount',
              type: 'uint256',
              indexed: false,
              internalType: 'uint256',
            },
            {
              name: 'price',
              type: 'uint256',
              indexed: false,
              internalType: 'uint256',
            },
            {
              name: 'timestamp',
              type: 'uint256',
              indexed: false,
              internalType: 'uint256',
            },
          ],
          anonymous: false,
        },
        {
          type: 'event',
          name: 'OrderPlaced',
          inputs: [
            {
              name: 'trader',
              type: 'address',
              indexed: true,
              internalType: 'address',
            },
            {
              name: 'amount',
              type: 'uint256',
              indexed: false,
              internalType: 'uint256',
            },
            {
              name: 'price',
              type: 'uint256',
              indexed: false,
              internalType: 'uint256',
            },
            {
              name: 'isBuyOrder',
              type: 'bool',
              indexed: false,
              internalType: 'bool',
            },
            {
              name: 'timestamp',
              type: 'uint256',
              indexed: false,
              internalType: 'uint256',
            },
          ],
          anonymous: false,
        },
        {
          type: 'event',
          name: 'OwnershipTransferred',
          inputs: [
            {
              name: 'previousOwner',
              type: 'address',
              indexed: true,
              internalType: 'address',
            },
            {
              name: 'newOwner',
              type: 'address',
              indexed: true,
              internalType: 'address',
            },
          ],
          anonymous: false,
        },
        {
          type: 'event',
          name: 'PriceUpdated',
          inputs: [
            {
              name: 'newPrice',
              type: 'uint256',
              indexed: false,
              internalType: 'uint256',
            },
          ],
          anonymous: false,
        },
        {
          type: 'event',
          name: 'PropertyOwnerWithdrawal',
          inputs: [
            {
              name: 'owner',
              type: 'address',
              indexed: true,
              internalType: 'address',
            },
            {
              name: 'amount',
              type: 'uint256',
              indexed: false,
              internalType: 'uint256',
            },
          ],
          anonymous: false,
        },
        { type: 'error', name: 'IndexOutOfBounds', inputs: [] },
        { type: 'error', name: 'InitialOfferingEnded', inputs: [] },
        { type: 'error', name: 'InitialOfferingOngoing', inputs: [] },
        {
          type: 'error',
          name: 'InsufficientBalance',
          inputs: [
            { name: 'available', type: 'uint256', internalType: 'uint256' },
            { name: 'required', type: 'uint256', internalType: 'uint256' },
          ],
        },
        { type: 'error', name: 'InsufficientSupply', inputs: [] },
        { type: 'error', name: 'InvalidAmount', inputs: [] },
        { type: 'error', name: 'InvalidOrder', inputs: [] },
        { type: 'error', name: 'NoFundsToWithdraw', inputs: [] },
        {
          type: 'error',
          name: 'OwnableInvalidOwner',
          inputs: [{ name: 'owner', type: 'address', internalType: 'address' }],
        },
        {
          type: 'error',
          name: 'OwnableUnauthorizedAccount',
          inputs: [
            { name: 'account', type: 'address', internalType: 'address' },
          ],
        },
        { type: 'error', name: 'ReentrancyGuardReentrantCall', inputs: [] },
        { type: 'error', name: 'TransferFailed', inputs: [] },
        { type: 'error', name: 'Unauthorized', inputs: [] },
      ],
      inheritedFunctions: {},
    },
  },
};
