"use client";

import { AnimatePresence, motion } from "framer-motion";
import BuyStep1 from "./BuyStep1";
import BuyStep2 from "./BuyStep2";
import BuyStep3 from "./BuyStep3";
import React, { useEffect, useRef, useState } from "react";
import { Button, Checkbox, ModalBody, ModalFooter } from "@chakra-ui/react";
import { Divider } from "antd";
import { AfterMarketBuyOrderData, BuyOrderData } from "@/types/order";
import { Warning, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { useWriteContractHook } from "@/utils/hooks";

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
    pricePerToken: 0,
    orderExpiration: 0,
    totalCost: 0,
    fee: 0,
  });
  const prevStep = useRef(currentStep);
  const direction = currentStep > prevStep.current ? 1 : -1;

  const { writeAsync: initialOfferingBuy } = useWriteContractHook({
    contractName: "KolektivaMarket",
    functionName: "initialOfferingBuy",
    contractAddress: "0xb57e0dbc847bdd098838bf67646c381d5500d8cf",
    args: [formData.qtyToken],
  });

  const { writeAsync: marketBuy } = useWriteContractHook({
    contractName: "KolektivaMarket",
    functionName: "instantBuy",
    contractAddress: "0xb57e0dbc847bdd098838bf67646c381d5500d8cf",
    args: [formData.qtyToken],
  });

  const { writeAsync: limitBuy } = useWriteContractHook({
    contractName: "KolektivaMarket",
    functionName: "placeBuyOrder",
    contractAddress: "0xb57e0dbc847bdd098838bf67646c381d5500d8cf",
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

  const handleButtonSubmitClick = async () => {
    console.log(formData.qtyToken);
    console.log(formData.pricePerToken);

    try {
      switch (currentStep) {
        case 1:
          // Handle preview logic if necessary
          break;
        case 2:
          // Handle submit order logic
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
                <p className="text-xl font-bold text-teal-600">5.11 USD</p>
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
