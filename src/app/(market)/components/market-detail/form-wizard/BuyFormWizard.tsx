"use client";

import { AnimatePresence, motion } from "framer-motion";
import BuyStep1 from "./BuyStep1";
import BuyStep2 from "./BuyStep2";
import BuyStep3 from "./BuyStep3";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  ModalBody,
  ModalFooter,
  Spinner,
} from "@chakra-ui/react";
import { Divider } from "antd";
import { AfterMarketBuyOrderData, BuyOrderData } from "@/types/order";
import { Warning, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { useReadContractHook, useWriteContractHook } from "@/utils/hooks";
import { useActiveAccount, useActiveWalletChain } from "thirdweb/react";
import { PropertyData } from "@/types/property";
import { formatUSDTBalance, parseUSDTBalance } from "@/utils/formatter";
import { getTransactionInfo } from "@/app/api/tx-info";
import { TxInfoData } from "@/types/tx-info";
import TxFailureToast from "../modals/TxFailureToast";

interface BuyFormWizardProps {
  propertyData: PropertyData;
  onTxUpdate: (tx: TxInfoData) => void;
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
  propertyData,
  onTxUpdate,
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

  const { writeAsync: initialOfferingBuy } = useWriteContractHook({
    contractName: "KolektivaMarket",
    functionName: "initialOfferingBuy",
    contractAddress: propertyData.marketAddress,
    args: [formData.qtyToken],
  });

  const { writeAsync: marketBuy } = useWriteContractHook({
    contractName: "KolektivaMarket",
    functionName: "instantBuy",
    contractAddress: propertyData.marketAddress,
    args: [formData.qtyToken],
  });

  const { writeAsync: limitBuy } = useWriteContractHook({
    contractName: "KolektivaMarket",
    functionName: "placeBuyOrder",
    contractAddress: propertyData.marketAddress,
    args: [formData.qtyToken, formData.pricePerToken],
  });

  // const buttonLabel = () => {
  //   console.log("price per token ", formData.pricePerToken);
  //   console.log("validate ", formData.pricePerToken === 0);
  //   switch (currentStep) {
  //     case 1:
  //       return "Preview order";
  //     case 2:
  //       return "Submit order";
  //     case 3:
  //       return "Agree";
  //   }
  // };

  const {
    data: allowanceData,
    isLoading: isLoadingAllowance,
    refetch: refetchAllowance,
  } = useReadContractHook({
    contractName: "MockUSDT",
    functionName: "allowance",
    args: [address, propertyData.marketAddress],
  });

  const { writeAsync: approveUsdt } = useWriteContractHook({
    contractName: "MockUSDT",
    functionName: "approve",
    args: [propertyData.marketAddress, formData.totalCost],
  });

  const allowance = useMemo(() => {
    console.log(allowanceData, "chek allowance");

    return allowanceData ? Number(allowanceData) : 0;
  }, [allowanceData]);

  useEffect(() => {
    switch (currentStep) {
      case 1:
        setButtonText("Preview order");
        break;
      case 2:
        if (isLoadingAllowance) {
          setButtonText("Loading...");
          setIsLoading(true);
        } else if (allowance < formData.totalCost) {
          setButtonText(
            `Approve ${formatUSDTBalance(formData.totalCost)} USDT`
          );
          setIsLoading(false);
        } else {
          setButtonText("Submit Order");
          setIsLoading(false);
        }
        break;
      case 3:
        setButtonText("Agree");
        break;
      default:
        setButtonText("Unknown step");
    }
  }, [currentStep, isLoadingAllowance, allowance, formData.totalCost]);

  const handleButtonSubmitClick = async () => {
    console.log("formData", formData);

    try {
      switch (currentStep) {
        case 1:
          // Handle preview logic if necessary
          onSubmitButtonClick(formData);

          break;
        case 2:
          if (allowance < formData.totalCost) {
            setIsLoading(true);
            try {
              const txHash = await approveUsdt();
              console.log("Approve USDT", txHash);
              // const status = await getTransactionInfo(chain, txHash as `0x${string}`);
              // console.log("status", status);
              if (txHash) {
                const txInfo = await getTransactionInfo(
                  chain,
                  txHash as `0x${string}`
                );
                console.log("tx buy", txInfo);
                onTxUpdate(txInfo);
              }

              const ref = await refetchAllowance();
              console.log("refetch res", ref);
            } catch (error) {
              console.error("Approval failed", error);
            }
            break;
          } else {
            let formDataType = (formData as AfterMarketBuyOrderData).type;
            if (isAfterMarketTrading) {
              if (formDataType === "market") {
                const txHash = await marketBuy();
                console.log("market txHash", txHash);

                if (txHash) {
                  const txInfo = await getTransactionInfo(
                    chain,
                    txHash as `0x${string}`
                  );
                  console.log("market buy", txInfo);
                  setTxInfo(txInfo);
                  onTxUpdate(txInfo);
                }
              } else if (formDataType === "limit") {
                const txHash = await limitBuy();
                console.log("limit txHash", txHash);

                if (txHash) {
                  const txInfo = await getTransactionInfo(
                    chain,
                    txHash as `0x${string}`
                  );
                  console.log("limit buy", txInfo);
                  setTxInfo(txInfo);
                  onTxUpdate(txInfo);
                }
              }
              onSubmitButtonClick(formData);
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
            const txHash = await initialOfferingBuy();
            if (txHash) {
              const txInfo = await getTransactionInfo(
                chain,
                txHash as `0x${string}`
              );
              console.log("tx buy", txInfo);
              onTxUpdate(txInfo);
            }
            onSubmitButtonClick(formData);
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
      // onSubmitButtonClick(formData);
    } catch (error) {
      console.error("Transaction failed", error);
    }
  };

  return (
    <>
      {/* {!txInfo.isSuccess && txInfo.txHash.length > 0 && ( */}
      <TxFailureToast
        txInfo={txInfo}
        // conditionMet={!txInfo.isSuccess && txInfo.txHash.length > 0}
      />
      {/* )} */}
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
                propertyData,
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
                  {formatUSDTBalance(formData.totalCost)} USDT
                </p>
              </div>
            </>
          )}
          {formData.pricePerToken === 0 ? (
            <Button
              colorScheme="teal"
              bgColor="teal.600"
              w="full"
              rounded="full"
              fontWeight="medium"
              fontSize="sm"
              isDisabled={true}
            >
              Empty Sale Order book
            </Button>
          ) : (
            <Button
              colorScheme="teal"
              bgColor="teal.600"
              w="full"
              rounded="full"
              fontWeight="medium"
              onClick={handleButtonSubmitClick}
              fontSize="sm"
              isLoading={isLoading}
            >
              <>{isLoading ? <Spinner /> : <>{buttonText}</>}</>
            </Button>
          )}
        </div>
      </ModalFooter>
    </>
  );
};

export default BuyFormWizard;
