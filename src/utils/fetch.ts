import { createPublicClient, http } from "viem";
import { deployedContracts } from "../../foundry/deployed-contracts/deployedContracts"; // ABI and address file
import { liskSepolia } from "viem/chains";

export const publicClient = createPublicClient({
  chain: liskSepolia,
  transport: http(),
});

interface UseContractParams {
  contractAddress?: string;
  contractName: string;
  functionName: string;
  args?: any[];
}

function getContractInstance(contractName: string, contractAddress?: string) {
  const contractDetails = deployedContracts[liskSepolia.id]?.[contractName];
  if (!contractDetails) {
    throw new Error(`Contract details for ${contractName} not found.`);
  }

  const abi = contractDetails.abi;
  const address = contractAddress ? contractAddress : contractDetails.address;

  return { abi, address };
}

export const readContractFetch = async ({
  contractName,
  functionName,
  contractAddress,
  args = [],
}: UseContractParams) => {
  try {
    const { address, abi } = getContractInstance(contractName, contractAddress);
    // Create a contract instance
    const data = await publicClient.readContract({
      address,
      abi,
      functionName,
      args,
    });

    return data;
  } catch (error) {
    console.error("Error reading contract:", error);
    throw error;
  }
};
