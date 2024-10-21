import { createPublicClient, http } from 'viem';
import { deployedContracts } from '../../foundry/deployed-contracts/deployedContracts'; // ABI and address file
import { Chain } from 'thirdweb';
import { thirdwebChains, viemChains } from '@/commons/networks';

interface UseContractParams {
  chainId: string;
  contractAddress?: string;
  contractName: string;
  functionName: string;
  args?: any[];
}

function getContractInstance(
  chainId: string,
  contractName: string,
  contractAddress?: string,
) {
  const contractDetails = deployedContracts[chainId]?.[contractName];
  if (!contractDetails) {
    throw new Error(`Contract details for ${contractName} not found.`);
  }

  const abi = contractDetails.abi;
  const address = contractAddress ? contractAddress : contractDetails.address;

  return { abi, address };
}

export const readContractFetch = async ({
  chainId,
  contractName,
  functionName,
  contractAddress,
  args = [],
}: UseContractParams) => {
  try {
    const { address, abi } = getContractInstance(
      chainId,
      contractName,
      contractAddress,
    );
    const publicClient = createPublicClient({
      chain: viemChains[chainId.toString()],
      transport: http(),
    });
    const data = await publicClient.readContract({
      address,
      abi,
      functionName,
      args,
    });

    return data;
  } catch (error) {
    console.error('Error reading contract:', error);
    throw error;
  }
};
