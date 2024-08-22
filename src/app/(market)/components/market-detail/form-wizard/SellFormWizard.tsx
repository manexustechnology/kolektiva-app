"use client";

import { AnimatePresence, motion } from "framer-motion";
import SellStep1 from "./SellStep1";
import SellStep2 from "./SellStep2";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Checkbox, ModalBody, ModalFooter } from "@chakra-ui/react";
import { Divider } from "antd";
import { SellOrderData } from "@/types/order";
import { useReadContractHook, useWriteContractHook } from "@/utils/hooks";
import { useActiveAccount } from "thirdweb/react";
import { getTransactionStatus } from "@/app/api/tx-hash";
import { PropertyData } from "@/types/property";
import { formatUSDTBalance, parseUSDTBalance } from "@/utils/formatter";

interface SellFormWizardProps {
  propertyData: PropertyData;
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
  const [buttonText, setButtonText] = useState("Loading...");
  const [isLoadingApproval, setIsLoadingApproval] = useState(false);

  const activeAccount = useActiveAccount();
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

  // const buttonLabel = () => {
  //   switch (currentStep) {
  //     case 1:
  //       return "Preview order";
  //     case 2:
  //       return "Submit order";
  //   }
  // };

  const { data: allowanceUsdtData, isLoading: isLoadingAllowanceUsdt } =
    useReadContractHook({
      contractName: "MockUSDT",
      functionName: "allowance",
      // args: [address, "_spender market address"],
      args: [address, propertyData.marketAddress],
    });

  const { writeAsync: approveUsdt } = useWriteContractHook({
    contractName: "MockUSDT",
    functionName: "approve",
    // args: ["_spender market address", formData.totalCost],
    args: [propertyData.marketAddress, formData.fee],
  });

  const { data: allowanceTokenData, isLoading: isLoadingAllowanceToken } =
    useReadContractHook({
      contractName: "KolektivaToken",
      functionName: "allowance",
      contractAddress: propertyData.tokenAddress,
      // args: [address, "_spender market address"],
      args: [address, propertyData.marketAddress],
    });

  const { writeAsync: approveToken } = useWriteContractHook({
    contractName: "KolektivaToken",
    functionName: "approve",
    contractAddress: propertyData.tokenAddress,
    // args: ["_spender market address", formData.totalCost],
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

  // useEffect(() => {
  //   if (isLoadingAllowanceToken || isLoadingAllowanceUsdt) {
  //     setButtonText("Loading...");
  //     setIsLoadingApproval(true);
  //   } else if (allowanceToken < formData.qtyToken) {
  //     setButtonText(`Approve ${formData.qtyToken} KolektivaToken`);
  //     setIsLoadingApproval(false);
  //   } else if (allowanceUsdt < formData.fee) {
  //     setButtonText(`Approve ${formatUSDTBalance(formData.fee)} USDT`);
  //     setIsLoadingApproval(false);
  //   } else {
  //     setButtonText("Submit Order");
  //     setIsLoadingApproval(false);
  //   }
  // }, [
  //   currentStep,
  //   allowanceToken,
  //   allowanceUsdt,
  //   isLoadingAllowanceToken,
  //   isLoadingAllowanceUsdt,
  //   formData.qtyToken,
  //   formData.fee,
  // ]);

  useEffect(() => {
    switch (currentStep) {
      case 1:
        setButtonText("Preview order");
        break;
      case 2:
        if (isLoadingAllowanceToken || isLoadingAllowanceUsdt) {
          setButtonText("Loading...");
          setIsLoadingApproval(true);
        } else if (allowanceToken < formData.qtyToken) {
          setButtonText(`Approve ${formData.qtyToken} KolektivaToken`);
          setIsLoadingApproval(false);
        } else if (allowanceUsdt < formData.fee) {
          setButtonText(`Approve ${formatUSDTBalance(formData.fee)} USDT`);
          setIsLoadingApproval(false);
        } else {
          setButtonText("Submit Order");
          setIsLoadingApproval(false);
        }
        break;
      case 3:
        setButtonText("Agree");
        break;
      default:
        setButtonText("Unknown step");
    }
  }, [
    currentStep,
    allowanceToken,
    allowanceUsdt,
    isLoadingAllowanceToken,
    isLoadingAllowanceUsdt,
    formData.qtyToken,
    formData.fee,
  ]);

  // const handleButtonSubmitClick = async () => {
  //   console.log("formData", formData);

  //   try {
  //     switch (currentStep) {
  //       case 1:
  //         // Handle preview logic if necessary
  //         break;
  //       case 2:
  //         try {
  //           if (allowanceToken < formData.qtyToken) {
  //             // If KolektivaToken allowance is insufficient, approve it first
  //             await approveToken();
  //             console.log("Approve KolektivaToken");
  //           } else if (allowanceUsdt < formData.fee) {
  //             // If USDT allowance is insufficient, approve it next
  //             await approveUsdt();
  //             console.log("Approve USDT");
  //           } else {
  //             // Both allowances are sufficient, proceed with order submission
  //             console.log("Submit Order");
  //             // Add your order submission logic here
  //             // Handle submit order logic
  //             let formDataType = (formData as SellOrderData).type;
  //             if (formDataType === "market") {
  //               const tx = await marketSell();
  //               console.log("tx", tx);
  //             } else {
  //               // if (formDataType === "limit") {
  //               const txHash = await limitSell();
  //               // const txStatus = await getTransactionStatus(txHash!);
  //               console.log("tx", txHash);
  //             }
  //           }
  //         } catch (error) {
  //           console.error("Action failed", error);
  //         }

  //         break;
  //       default:
  //         console.warn("Unknown step");
  //     }
  //     // Call the submit button click handler if needed
  //     onSubmitButtonClick(formData);
  //   } catch (error) {
  //     console.error("Transaction failed", error);
  //   }
  // };

  const handleButtonSubmitClick = async () => {
    try {
      if (allowanceToken < formData.qtyToken) {
        await approveToken();
        console.log("Approved KolektivaToken");
      } else if (allowanceUsdt < formData.fee) {
        await approveUsdt();
        console.log("Approved USDT");
      } else {
        if (formData.type === "market") {
          const tx = await marketSell();
          console.log("Market Sell tx", tx);
        } else {
          const txHash = await limitSell();
          const txStatus = await getTransactionStatus(txHash!);
          console.log("Limit Sell tx", txHash);
        }
        // Call the submit button click handler if needed
        onSubmitButtonClick(formData);
      }
    } catch (error) {
      console.error("Transaction failed", error);
    }
  };

  return (
    <>
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
            disabled={isLoadingApproval}
            fontSize="sm"
          >
            {buttonText}
          </Button>
        </div>
      </ModalFooter>
    </>
  );
};

export default SellFormWizard;
