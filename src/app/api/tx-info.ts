import axios from "axios";
import { getTxRoutes } from "../constants/api-routes";
import { Chain } from "thirdweb";

interface TransactionDetails {
  txHash: string;
  status: string;
  txUrl: string;
  isSuccess: boolean;
}

const delay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getTransactionInfo = async (
  chain: Chain,
  txHash: string,
  retries: number = 3,
  retryDelay: number = 5000
): Promise<TransactionDetails> => {
  let { txApiUrl, txUrl } = getTxRoutes(chain);
  txApiUrl = `${txApiUrl}/${txHash}`;
  txUrl = `${txUrl}/${txHash}`;

  // Wait for the initial delay
  await delay(retryDelay);
  console.log(retryDelay, "Fetching transaction from:", apiUrl);

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Accept: "application/json",
        },
      });
      console.log("response", response);

      return {
        txHash,
        txUrl,
        status: response.data.status,
        isSuccess: response.data.status === "ok",
      };
    } catch (error) {
      console.error(
        `Attempt ${attempt} - Error fetching transaction details:`,
        error
      );

      if (attempt < retries) {
        console.log(`Retrying in ${retryDelay}ms...`);
        await delay(retryDelay);
      } else {
        console.error("All retry attempts failed.");
        throw error;
      }
    }
  }

  // Fallback in case the loop doesn't return (which shouldn't happen)
  throw new Error(
    "Failed to fetch transaction details after multiple attempts."
  );
};
