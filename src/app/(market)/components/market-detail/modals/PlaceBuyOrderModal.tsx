import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
} from "@chakra-ui/react";
import { ArrowLeft, X } from "@phosphor-icons/react/dist/ssr";
import { Divider } from "antd";
import BuyFormWizard from "../form-wizard/BuyFormWizard";
import { BuyOrderData } from "@/types/order";

interface PlaceBuyOrderModalProps {
  onTxUpdate: (tx: any) => void;
  isOpen: boolean;
  onClose: () => void;
  isAfterMarketTrading: boolean;
  onSuccess: (formData: BuyOrderData) => void;
}

const PlaceBuyOrderModal: React.FC<PlaceBuyOrderModalProps> = ({
  onTxUpdate,
  isOpen,
  onClose,
  isAfterMarketTrading,
  onSuccess,
}) => {
  const [step, setStep] = useState<number>(1);
  const maxStep: number = isAfterMarketTrading ? 2 : 3;

  const resetData = () => {
    setStep(1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleNext = (formData: BuyOrderData) => {
    if (step < maxStep) {
      setStep((prev) => prev + 1);
    } else {
      const result = formData;
      onClose();
      onSuccess(result);
      setStep(1);
    }
  };

  const handleClose = () => {
    resetData();
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        motionPreset="slideInRight"
        size="lg"
        scrollBehavior="inside"
      >
        <ModalOverlay className="!bg-teal-950 !opacity-50" />
        <ModalContent className="!h-screen !absolute !bottom-1 !right-1 !top-1 !m-0 !rounded-2xl !max-h-none">
          <ModalHeader>
            <div className="flex flex-col gap-3">
              <div className="w-full flex justify-between items-center">
                <div>
                  {step > 1 && (
                    <button
                      className="bg-zinc-100 px-6 py-2.5 rounded-[100px] flex gap-2 items-center"
                      onClick={handleBack}
                    >
                      <ArrowLeft
                        weight="fill"
                        size={16}
                        className="text-zinc-700"
                      />
                      <p className="text-sm font-medium text-zinc-700">Back</p>
                    </button>
                  )}
                </div>
                <button
                  className="bg-zinc-100 p-3 rounded-full cursor-pointer"
                  onClick={handleClose}
                >
                  <X size={16} />
                </button>
              </div>
              <div className="flex justify-stretch gap-2">
                {[...Array(maxStep)].map((_, i) => (
                  <Progress
                    key={i}
                    colorScheme="green"
                    size="sm"
                    value={i < step ? 100 : 0}
                    w="full"
                    rounded="full"
                  />
                ))}
              </div>
            </div>
          </ModalHeader>
          <BuyFormWizard
            onTxUpdate={onTxUpdate}
            currentStep={step}
            isAfterMarketTrading={isAfterMarketTrading}
            onSubmitButtonClick={handleNext}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default PlaceBuyOrderModal;
