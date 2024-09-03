import { Link } from "@chakra-ui/react";
import { TxInfoData } from "@/types/tx-info";
import React, { useEffect, useRef } from "react";
import { useToast } from "@chakra-ui/react";

interface TxFailureToastProps {
  txInfo: TxInfoData;
  autoCloseDelay?: number; // Optional prop to customize delay
  // conditionMet: boolean; // Prop to trigger the toast when a condition is met
}

const TxFailureToast: React.FC<TxFailureToastProps> = ({
  txInfo,
  autoCloseDelay = 5000, // Default delay set to 9000ms (5 seconds)
}) => {
  const toast = useToast();
  const lastTxHashRef = useRef<string | null>(null);

  useEffect(() => {
    if (
      txInfo.txHash &&
      txInfo.isSuccess === false &&
      txInfo.txHash !== lastTxHashRef.current
    ) {
      const toastId = toast({
        position: "top",
        title: "Transaction Failed!",
        description: (
          <>
            Check for more details:{" "}
            <Link href={txInfo.txUrl} isExternal>
              {`${txInfo.txHash.slice(0, 6)}...${txInfo.txHash.slice(-4)}`}
            </Link>
          </>
        ),
        status: "error",
        duration: autoCloseDelay,
        isClosable: true,
      });

      lastTxHashRef.current = txInfo.txHash;

      const handleClick = () => {
        if (toastId) {
          toast.close(toastId);
        }
      };

      window.addEventListener("click", handleClick);

      return () => {
        window.removeEventListener("click", handleClick);
      };
    }
  }, [txInfo, autoCloseDelay, toast]);

  return null; // This component does not render anything itself
};

export default TxFailureToast;
