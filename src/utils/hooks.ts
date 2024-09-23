import { deployedContracts } from '../../foundry/deployed-contracts/deployedContracts'; // ABI and address file
import { deployedSignatures } from '../../foundry/deployed-contracts/deployedSignatures'; // Event Signatures
import {
  prepareContractCall,
  getContract,
  getContractEvents,
  ThirdwebContract,
  sendTransaction,
  prepareEvent,
  Chain,
} from 'thirdweb';
import { thirdwebClient as client } from '@/commons/thirdweb';
import {
  useReadContract,
  useActiveWallet,
  useActiveWalletChain,
} from 'thirdweb/react';
import { useEffect, useState } from 'react';

interface UseContractParams {
  contractAddress?: string;
  contractName: string;
  functionName: string;
  args?: any[];
}

interface UseContractEventsParams {
  contractAddress?: string;
  contractName: string;
  fromBlock: bigint;
  eventName: string;
}

function getContractInstance(
  chain: Chain,
  contractName: string,
  contractAddress?: string,
): ThirdwebContract<any[]> {
  const contractDetails = deployedContracts[chain?.id]?.[contractName];

  if (!contractDetails) {
    console.error(`Contract details for ${contractName} not found.`);
  }

  const abi = contractDetails?.abi || [];
  const address = contractAddress
    ? contractAddress
    : contractDetails?.address || '';

  return getContract({
    client,
    chain,
    address,
    abi: abi as any[], // Ensure abi is cast to any[]
  });
}

function getPreparedEventInstance(
  chain: Chain,
  contractName: string,
  eventName: string,
) {
  const eventSignature =
    deployedSignatures[chain.id]?.[contractName]?.[eventName];

  if (typeof eventSignature !== 'string') {
    console.error(`Event signature for ${eventName} not found.`);
  }

  return prepareEvent({
    signature: eventSignature as `event ${string}`,
  });
}

export function useReadContractHook({
  contractName,
  functionName,
  args = [],
  contractAddress,
}: UseContractParams) {
  const chain = useActiveWalletChain()!;
  const contract = getContractInstance(chain, contractName, contractAddress);
  const { data, isLoading, error, refetch } = useReadContract({
    contract,
    method: functionName,
    params: args,
  });

  return { data, isLoading, error, refetch };
}

export function useWriteContractHook({
  contractName,
  functionName,
  args = [],
  contractAddress,
}: UseContractParams) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chain = useActiveWalletChain()!;

  const contract = getContractInstance(chain, contractName, contractAddress);
  const wallet = useActiveWallet()!;

  const writeAsync = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const transaction = prepareContractCall({
        contract,
        method: functionName,
        params: args,
        gas: BigInt(500_000),
        // gas: BigInt(100_000),
      });

      const account = await wallet.connect({ client });
      const { transactionHash } = await sendTransaction({
        account,
        transaction,
      });
      return transactionHash;
    } catch (err) {
      setError('Transaction failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return { writeAsync, isLoading, error };
}

export function useContractEventHook({
  contractName,
  eventName,
  fromBlock,
  contractAddress,
}: UseContractEventsParams) {
  const chain = useActiveWalletChain()!;
  const [data, setData] = useState<any[]>([]); // Adjust type based on your event data
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      if (hasFetched) return; // Stop fetching if already fetched

      try {
        const contract = getContractInstance(
          chain,
          contractName,
          contractAddress,
        );
        const event = getPreparedEventInstance(chain, contractName, eventName);

        const eventsData = await getContractEvents({
          contract,
          fromBlock,
          events: [event],
        });

        setData(eventsData);
        setHasFetched(true);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching contract events:', err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [chain, contractName, contractAddress, fromBlock, eventName, hasFetched]);

  return { data, isLoading, error };
}

export function useDeployedContractInfo(contractName: string) {
  const chain = useActiveWalletChain();
  return chain ? deployedContracts[chain.id]?.[contractName] : null;
}
