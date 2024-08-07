'use client';

import { AnimatePresence, motion } from "framer-motion";
import SellStep1 from "./SellStep1";
import SellStep2 from "./SellStep2";
import React, { useEffect, useRef, useState } from "react";
import { Button, Checkbox, ModalBody, ModalFooter } from "@chakra-ui/react";
import { Divider } from "antd";
import { SellOrderData } from "@/types/order";

interface SellFormWizardProps {
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

const SellFormWizard: React.FC<SellFormWizardProps> = ({ currentStep, onSubmitButtonClick }) => {
  const [formData, setFormData] = useState<SellOrderData>({
    type: 'market',
    qtyToken: 1,
    pricePerToken: 0,
    orderExpiration: 0,
  });
  const prevStep = useRef(currentStep);
  const direction = currentStep > prevStep.current ? 1 : -1;

  useEffect(() => {
    prevStep.current = currentStep;
  }, [currentStep]);

  const buttonLabel = () => {
    switch (currentStep) {
      case 1:
        return "Preview order";
      case 2:
        return "Submit order";
    }
  }

  const handleButtonSubmitClick = () => {
    onSubmitButtonClick(formData);
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
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute w-full"
            >
              {steps[currentStep - 1].component({ formData, onDataChange: (data: SellOrderData) => { setFormData(prev => ({ ...prev, ...data })) } })}
            </motion.div>
          </AnimatePresence>
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="flex flex-col w-full gap-6">
          <Divider className="border-zinc-200 !m-0" />
          <div className="flex justify-between items-center">
            <p className="text-sm text-zinc-500">{formData.type === 'market' ? 'Estimated total sell price' : 'Total sell price'}</p>
            <p className="text-xl font-bold text-teal-600">4.89 LSK</p>
          </div>
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

export default SellFormWizard;