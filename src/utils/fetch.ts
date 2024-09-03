import { createPublicClient, http } from "viem";
import { deployedContracts } from "../../foundry/deployed-contracts/deployedContracts"; // ABI and address file
import { Chain } from "thirdweb";
import { viemChains } from "@/commons/networks";

interface UseContractParams {
  chain: Chain;
  contractAddress?: string;
  contractName: string;
  functionName: string;
  args?: any[];
}

function getContractInstance(
  chain: Chain,
  contractName: string,
  contractAddress?: string
) {
  const contractDetails = deployedContracts[chain.id]?.[contractName];
  if (!contractDetails) {
    throw new Error(`Contract details for ${contractName} not found.`);
  }

  const abi = contractDetails.abi;
  const address = contractAddress ? contractAddress : contractDetails.address;

  return { abi, address };
}

export const readContractFetch = async ({
  chain,
  contractName,
  functionName,
  contractAddress,
  args = [],
}: UseContractParams) => {
  try {
    const { address, abi } = getContractInstance(
      chain,
      contractName,
      contractAddress
    );
    const publicClient = createPublicClient({
      chain: viemChains[chain.id.toString()],
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
    console.error("Error reading contract:", error);
    throw error;
  }
};
