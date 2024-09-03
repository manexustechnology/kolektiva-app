"use client";

import { AnimatePresence, motion } from "framer-motion";
import SellStep1 from "./SellStep1";
import SellStep2 from "./SellStep2";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Checkbox, ModalBody, ModalFooter } from "@chakra-ui/react";
import { Divider } from "antd";
import { SellOrderData } from "@/types/order";
import { useReadContractHook, useWriteContractHook } from "@/utils/hooks";
import { useActiveAccount, useActiveWalletChain } from "thirdweb/react";
import { getTransactionInfo } from "@/app/api/tx-info";
import { PropertyData } from "@/types/property";
import { formatUSDTBalance, parseUSDTBalance } from "@/utils/formatter";
import { Spinner } from "@chakra-ui/react";
import { TxInfoData } from "@/types/tx-info";
import TxFailureToast from "../modals/TxFailureToast";

interface SellFormWizardProps {
  propertyData: PropertyData;
  onTxUpdate: (tx: TxInfoData) => void;
  currentStep: number;
  onSubmitButtonClick: (formData: SellOrderData) => void;
}

const steps = [
  { id: 1, component: (props: any) => <SellStep1 {...props} /> },
  { id: 2, component: (props: any) => <SellStep2 {...props} /> },
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const SellFormWizard: React.FC<SellFormWizardProps> = ({
  propertyData,
  onTxUpdate,
  currentStep,
  onSubmitButtonClick,
}) => {
  const [formData, setFormData] = useState<SellOrderData>({
    type: "market",
    qtyToken: 1,
    pricePerToken: 0,
    orderExpiration: 0,
    totalProceeds: 0,
    fee: 0,
  });
  const [txInfo, setTxInfo] = useState<TxInfoData>({
    txHash: "",
    status: "",
    txUrl: "",
    isSuccess: false,
  });
  const [buttonText, setButtonText] = useState("Loading...");
  const [isLoading, setIsLoading] = useState(false);

  const activeAccount = useActiveAccount();
  const chain = useActiveWalletChain()!;
  const address = activeAccount?.address;
  const prevStep = useRef(currentStep);
  const direction = currentStep > prevStep.current ? 1 : -1;

  const { writeAsync: marketSell } = useWriteContractHook({
    contractName: "KolektivaMarket",
    functionName: "instantSell",
    contractAddress: propertyData.marketAddress,
    args: [formData.qtyToken],
  });

  const { writeAsync: limitSell } = useWriteContractHook({
    contractName: "KolektivaMarket",
    functionName: "placeSellOrder",
    contractAddress: propertyData.marketAddress,
    args: [formData.qtyToken, formData.pricePerToken],
  });

  useEffect(() => {
    prevStep.current = currentStep;
  }, [currentStep]);

  const {
    data: allowanceUsdtData,
    isLoading: isLoadingAllowanceUsdt,
    refetch: refetchAllowanceUsdt,
  } = useReadContractHook({
    contractName: "MockUSDT",
    functionName: "allowance",
    args: [address, propertyData.marketAddress],
  });

  const { writeAsync: approveUsdt } = useWriteContractHook({
    contractName: "MockUSDT",
    functionName: "approve",
    args: [propertyData.marketAddress, formData.fee],
  });

  const {
    data: allowanceTokenData,
    isLoading: isLoadingAllowanceToken,
    refetch: refetchAllowanceToken,
  } = useReadContractHook({
    contractName: "KolektivaToken",
    functionName: "allowance",
    contractAddress: propertyData.tokenAddress,
    args: [address, propertyData.marketAddress],
  });

  const { writeAsync: approveToken } = useWriteContractHook({
    contractName: "KolektivaToken",
    functionName: "approve",
    contractAddress: propertyData.tokenAddress,
    args: [propertyData.marketAddress, formData.qtyToken],
  });

  const allowanceUsdt = useMemo(
    () => (allowanceUsdtData ? Number(allowanceUsdtData) : 0),
    [allowanceUsdtData]
  );

  const allowanceToken = useMemo(
    () => (allowanceTokenData ? Number(allowanceTokenData) : 0),
    [allowanceTokenData]
  );

  useEffect(() => {
    const updateButtonText = () => {
      switch (currentStep) {
        case 1:
          setButtonText("Preview order");
          break;
        case 2:
          if (isLoadingAllowanceToken || isLoadingAllowanceUsdt) {
            setButtonText("Loading...");
            setIsLoading(true);
          } else if (allowanceToken < formData.qtyToken) {
            setButtonText(`Approve ${formData.qtyToken} KolektivaToken`);
            setIsLoading(false);
          } else if (allowanceUsdt < formData.fee) {
            setButtonText(`Approve ${formatUSDTBalance(formData.fee)} USDT`);
            setIsLoading(false);
          } else {
            setButtonText("Submit Order");
            setIsLoading(false);
          }
          break;
        default:
          setButtonText("Unknown step");
      }
    };
    updateButtonText();
  }, [
    currentStep,
    allowanceToken,
    allowanceUsdt,
    isLoadingAllowanceToken,
    isLoadingAllowanceUsdt,
    formData.qtyToken,
    formData.fee,
  ]);

  const handleTransaction = async (
    txHashPromise: Promise<any>,
    successCallback: () => void
  ) => {
    try {
      const txHash = await txHashPromise;
      if (txHash) {
        const txInfo = await getTransactionInfo(chain, txHash);
        console.log("tx sell", txInfo);
        setTxInfo(txInfo);
        onTxUpdate(txInfo);
        successCallback();
      }
    } catch (error) {
      console.error("Transaction failed", error);
    }
  };

  const handleButtonSubmitClick = async () => {
    console.log("formData", formData);

    try {
      switch (currentStep) {
        case 1:
          onSubmitButtonClick(formData);
          break;
        case 2:
          setIsLoading(true);
          if (allowanceToken < formData.qtyToken) {
            await handleTransaction(approveToken(), async () => {
              await refetchAllowanceToken();
            });
          } else if (allowanceUsdt < formData.fee) {
            await handleTransaction(approveUsdt(), async () => {
              await refetchAllowanceUsdt();
            });
          } else {
            const formDataType = (formData as SellOrderData).type;
            if (formDataType === "market") {
              await handleTransaction(marketSell(), () =>
                onSubmitButtonClick(formData)
              );
            } else {
              await handleTransaction(limitSell(), () =>
                onSubmitButtonClick(formData)
              );
            }
          }
          break;
        default:
          console.warn("Unknown step");
      }
    } catch (error) {
      console.error("Transaction failed", error);
    }
  };

  return (
    <>
      <TxFailureToast txInfo={txInfo} />
      <ModalBody>
        <div className="wizard-container relative">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute w-full"
            >
              {steps[currentStep - 1].component({
                formData,
                propertyData,
                onDataChange: (data: SellOrderData) => {
                  setFormData((prev) => ({ ...prev, ...data }));
                },
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="flex flex-col w-full gap-6">
          <Divider className="border-zinc-200 !m-0" />
          <div className="flex justify-between items-center">
            <p className="text-sm text-zinc-500">
              {formData.type === "market"
                ? "Estimated total sell price"
                : "Total sell price"}
            </p>
            <p className="text-xl font-bold text-teal-600">
              {formatUSDTBalance(formData.totalProceeds)} USDT
            </p>
          </div>
          <Button
            colorScheme="teal"
            bgColor="teal.600"
            w="full"
            rounded="full"
            fontWeight="medium"
            onClick={handleButtonSubmitClick}
            disabled={isLoading}
            fontSize="sm"
          >
            <>{isLoading ? <Spinner /> : <>{buttonText}</>}</>
          </Button>
        </div>
      </ModalFooter>
    </>
  );
};

export default SellFormWizard;
