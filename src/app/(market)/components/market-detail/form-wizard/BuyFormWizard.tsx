'use client';

import { AnimatePresence, motion } from 'framer-motion';
import BuyStep1 from './BuyStep1';
import BuyStep2 from './BuyStep2';
import BuyStep3 from './BuyStep3';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Button,
  Checkbox,
  ModalBody,
  ModalFooter,
  Spinner,
} from '@chakra-ui/react';
import { Divider } from 'antd';
import { AfterMarketBuyOrderData, BuyOrderData } from '@/types/order';
import { Warning, WarningCircle } from '@phosphor-icons/react/dist/ssr';
import { useReadContractHook, useWriteContractHook } from '@/utils/hooks';
import { useActiveAccount, useActiveWalletChain } from 'thirdweb/react';
import { PropertyData } from '@/types/property';
import { formatUSDTBalance, parseUSDTBalance } from '@/utils/formatter';
import { getTransactionInfo } from '@/app/api/tx-info';
import { TxInfoData } from '@/types/tx-info';
import TxFailureToast from '../modals/TxFailureToast';
import axios from 'axios';

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
    type: 'market',
    qtyToken: 1,
    pricePerToken: 100,
    orderExpiration: 0,
    totalCost: 1000,
    fee: 0,
  });
  const [txInfo, setTxInfo] = useState<TxInfoData>({
    txHash: '',
    status: '',
    txUrl: '',
    isSuccess: false,
  });
  const [buttonText, setButtonText] = useState('Loading...');
  const [isLoading, setIsLoading] = useState(false);

  const activeAccount = useActiveAccount();
  const chain = useActiveWalletChain()!;

  const address = activeAccount?.address;
  const prevStep = useRef(currentStep);
  const direction = currentStep > prevStep.current ? 1 : -1;

  const { writeAsync: initialOfferingBuy } = useWriteContractHook({
    contractName: 'KolektivaMarket',
    functionName: 'initialOfferingBuy',
    contractAddress: propertyData.marketAddress,
    args: [formData.qtyToken],
  });

  const { writeAsync: marketBuy } = useWriteContractHook({
    contractName: 'KolektivaMarket',
    functionName: 'instantBuy',
    contractAddress: propertyData.marketAddress,
    args: [formData.qtyToken],
  });

  const { writeAsync: limitBuy } = useWriteContractHook({
    contractName: 'KolektivaMarket',
    functionName: 'placeBuyOrder',
    contractAddress: propertyData.marketAddress,
    args: [formData.qtyToken, formData.pricePerToken],
  });

  const {
    data: allowanceData,
    isLoading: isLoadingAllowance,
    refetch: refetchAllowance,
  } = useReadContractHook({
    contractName: 'MockUSDT',
    functionName: 'allowance',
    args: [address, propertyData.marketAddress],
  });

  const { writeAsync: approveUsdt } = useWriteContractHook({
    contractName: 'MockUSDT',
    functionName: 'approve',
    args: [propertyData.marketAddress, formData.totalCost],
  });

  const allowance = useMemo(() => {
    console.log(allowanceData, 'check allowance');
    return allowanceData ? Number(allowanceData) : 0;
  }, [allowanceData]);

  const sendUserPropertyData = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/user-property/`,
        {
          walletAddress: address,
          propertyId: propertyData.id,
        },
      );

      if (response.status !== 200) {
        throw new Error(response.data?.message || 'Something went wrong!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const updateButtonText = () => {
      switch (currentStep) {
        case 1:
          setButtonText('Preview order');
          break;
        case 2:
          if (isLoadingAllowance) {
            setButtonText('Loading...');
            setIsLoading(true);
          } else if (allowance < formData.totalCost) {
            setButtonText(
              `Approve ${formatUSDTBalance(formData.totalCost)} USDT`,
            );
            setIsLoading(false);
          } else {
            setButtonText('Submit Order');
            setIsLoading(false);
          }
          break;
        case 3:
          setButtonText('Agree');
          setIsLoading(false);
          break;
        default:
          setButtonText('Unknown step');
      }
    };
    updateButtonText();
  }, [currentStep, isLoadingAllowance, allowance, formData.totalCost]);

  const handleTransaction = async (
    txHashPromise: Promise<any>,
    successCallback: () => void,
  ) => {
    try {
      const txHash = await txHashPromise;
      if (txHash) {
        const txInfo = await getTransactionInfo(chain, txHash);
        console.log('tx buy', txInfo);
        setTxInfo(txInfo);
        onTxUpdate(txInfo);
        successCallback();
      }
    } catch (error) {
      console.error('Transaction failed', error);
    }
  };

  const handleButtonSubmitClick = async () => {
    console.log('formData', formData);

    const executeTransactionAndSendPropertyData = async (
      transactionType: Promise<any>,
    ) => {
      await handleTransaction(transactionType, () =>
        onSubmitButtonClick(formData),
      );
      await sendUserPropertyData();
    };

    try {
      switch (currentStep) {
        case 1:
          onSubmitButtonClick(formData);
          break;
        case 2:
          if (allowance < formData.totalCost) {
            setIsLoading(true);
            await handleTransaction(approveUsdt(), async () => {
              await refetchAllowance();
            });
          }
          if (!isAfterMarketTrading) {
            onSubmitButtonClick(formData);
          } else if (isAfterMarketTrading) {
            setIsLoading(true);

            const formDataType = (formData as AfterMarketBuyOrderData).type;
            if (formDataType === 'market') {
              await executeTransactionAndSendPropertyData(marketBuy());
            } else if (formDataType === 'limit') {
              await executeTransactionAndSendPropertyData(limitBuy());
            }
          } else {
            console.warn(
              'Initial offering buy should not be processed in this step.',
            );
          }
          break;
        case 3:
          setIsLoading(true);

          if (!isAfterMarketTrading) {
            await executeTransactionAndSendPropertyData(initialOfferingBuy());
          } else {
            console.warn(
              'Market trading operations should not be processed in this step.',
            );
          }
          break;
        default:
          console.warn('Unknown step');
      }
    } catch (error) {
      console.error('Transaction failed', error);
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
                x: { type: 'spring', stiffness: 300, damping: 30 },
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
              disabled={isLoading}
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
