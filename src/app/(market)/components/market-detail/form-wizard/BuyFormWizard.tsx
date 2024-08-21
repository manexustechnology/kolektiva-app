"use client";

import { AnimatePresence, motion } from "framer-motion";
import BuyStep1 from "./BuyStep1";
import BuyStep2 from "./BuyStep2";
import BuyStep3 from "./BuyStep3";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Checkbox, ModalBody, ModalFooter } from "@chakra-ui/react";
import { Divider } from "antd";
import { AfterMarketBuyOrderData, BuyOrderData } from "@/types/order";
import { Warning, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { useReadContractHook, useWriteContractHook } from "@/utils/hooks";
import { useActiveAccount } from "thirdweb/react";

interface BuyFormWizardProps {
  currentStep: number;
  isAfterMarketTrading: boolean;
  onSubmitButtonClick: (formData: BuyOrderData) => void;
}

const steps = [
  { id: 1, component: (props: any) => <BuyStep1 {...props} /> },
  { id: 2, component: (props: any) => <BuyStep2 {...props} /> },
  { id: 3, component: (props: any) => <BuyStep3 {...props} /> },
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

const BuyFormWizard: React.FC<BuyFormWizardProps> = ({
  currentStep,
  isAfterMarketTrading,
  onSubmitButtonClick,
}) => {
  const [formData, setFormData] = useState<BuyOrderData>({
    type: "market",
    qtyToken: 1,
    pricePerToken: 100,
    orderExpiration: 0,
    totalCost: 1000,
    fee: 0,
  });
  const prevStep = useRef(currentStep);
  const direction = currentStep > prevStep.current ? 1 : -1;
  const marketContractAddress =
    process.env.NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS!;

  const { writeAsync: initialOfferingBuy } = useWriteContractHook({
    contractName: "KolektivaMarket",
    functionName: "initialOfferingBuy",
    contractAddress: marketContractAddress,
    args: [formData.qtyToken],
  });

  const { writeAsync: marketBuy } = useWriteContractHook({
    contractName: "KolektivaMarket",
    functionName: "instantBuy",
    contractAddress: marketContractAddress,
    args: [formData.qtyToken],
  });

  const { writeAsync: limitBuy } = useWriteContractHook({
    contractName: "KolektivaMarket",
    functionName: "placeBuyOrder",
    contractAddress: marketContractAddress,
    args: [formData.qtyToken, formData.pricePerToken],
  });

  useEffect(() => {
    prevStep.current = currentStep;
  }, [currentStep]);

  const buttonLabel = () => {
    switch (currentStep) {
      case 1:
        return "Preview order";
      case 2:
        return "Submit order";
      case 3:
        return "Agree";
    }
  };
  const activeAccount = useActiveAccount();
  const address = activeAccount?.address;

  const { data: allowanceData, isLoading: isLoadingAllowance } =
    useReadContractHook({
      contractName: "MockUSDT",
      functionName: "allowance",
      // args: [address, "_spender market address"],
      args: [address, marketContractAddress],
    });

  const { writeAsync: approveUsdt } = useWriteContractHook({
    contractName: "MockUSDT",
    functionName: "approve",
    // args: ["_spender market address", formData.totalCost],
    args: [marketContractAddress, formData.totalCost],
  });

  const allowance = useMemo(
    () => (allowanceData ? Number(allowanceData) : 0),
    [allowanceData]
  );

  const handleButtonSubmitClick = async () => {
    console.log(formData.qtyToken);
    console.log(formData.pricePerToken);

    try {
      switch (currentStep) {
        case 1:
          // Handle preview logic if necessary
          break;
        case 2:
          if (allowance < formData.totalCost) {
            try {
              await approveUsdt(); // Call approve function here
              console.log("Approve USDT");
            } catch (error) {
              console.error("Approval failed", error);
            }
          } else {
            let formDataType = (formData as AfterMarketBuyOrderData).type;
            if (isAfterMarketTrading) {
              if (formDataType === "market") {
                const tx = await marketBuy();
                console.log("market buy", tx);
              } else if (formDataType === "limit") {
                const tx = await limitBuy();
                console.log("limit buy", tx);
              }
            } else {
              console.warn(
                "Initial offering buy should not be processed in this step."
              );
            }
            console.log("Submit Order");
          }
          break;

        case 3:
          // Handle agree logic
          if (!isAfterMarketTrading) {
            await initialOfferingBuy();
          } else {
            console.warn(
              "Market trading operations should not be processed in this step."
            );
          }
          break;
        default:
          console.warn("Unknown step");
      }
      // Call the submit button click handler if needed
      onSubmitButtonClick(formData);
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
                isAfterMarketTrading,
                formData,
                onDataChange: (data: BuyOrderData) => {
                  setFormData((prev) => ({ ...prev, ...data }));
                },
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="flex flex-col w-full gap-6">
          {currentStep === 3 ? (
            <>
              <div className="flex items-center bg-teal-50 rounded-lg p-4 text-teal-600 gap-3">
                <Warning weight="fill" size={24} className="!w-12 !h-auto" />
                <div className="w-auto">
                  <p className="text-sm">
                    Please read the full terms of service and certify that you
                    agree to proceed
                  </p>
                </div>
              </div>
              <div>
                <Checkbox colorScheme="teal" display="flex" gap={2}>
                  <span className="text-sm text-zinc-700">
                    I certify that i have read Kolektiva’s Terms of Service in
                    full and agree that I am qualified to invest in this
                    offering
                  </span>
                </Checkbox>
              </div>
            </>
          ) : (
            <>
              {isAfterMarketTrading && (
                <div className="flex items-center bg-teal-50 rounded-lg p-4 text-teal-700 gap-3">
                  <WarningCircle
                    weight="fill"
                    size={24}
                    className="!w-12 !h-auto"
                  />
                  <div className="w-auto">
                    <p className="text-sm text-wrap w-auto">
                      The default slippage price is 0%. An order is successful
                      if the buy/sell price is the same as the estimated price.
                    </p>
                  </div>
                </div>
              )}
              <Divider className="border-zinc-200 !m-0" />
              <div className="flex justify-between items-center">
                <p className="text-sm text-zinc-500">Total</p>
                <p className="text-xl font-bold text-teal-600">
                  {formData.totalCost} USDT
                </p>
              </div>
            </>
          )}
          <Button
            colorScheme="teal"
            bgColor="teal.600"
            w="full"
            rounded="full"
            fontWeight="medium"
            onClick={handleButtonSubmitClick}
            fontSize="sm"
          >
            {buttonLabel()}
          </Button>
        </div>
      </ModalFooter>
    </>
  );
};

export default BuyFormWizard;
