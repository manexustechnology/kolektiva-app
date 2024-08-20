import {
  LISK_SEPOLIA_TX_HASH_ROUTE,
  LISK_SEPOLIA_TX_HASH_URL,
} from "@/app/constants/api-routes";
import axios from "axios";

interface TransactionDetails {
  txHash: string;
  status: string;
  txUrl: string;
}

export const getTransactionStatus = async (
  txHash: string
): Promise<TransactionDetails> => {
  const apiUrl = `${LISK_SEPOLIA_TX_HASH_ROUTE}/${txHash}`;
  const txUrl = `${LISK_SEPOLIA_TX_HASH_URL}/${txHash}`;
  try {
    const response = await axios.get(apiUrl);
    return {
      txHash,
      status: response.data.status,
      txUrl,
    };
  } catch (error) {
    console.error("Error fetching transaction details:", error);
    throw error;
  }
};
