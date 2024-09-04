"use client";

import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import FormPart1 from "./components/FormPart1";
import FormPart2 from "./components/FormPart2";
import RequestSentModal from "./modals/RequestSentModal";

interface FormData {
  name: string;
  contactPh: string;
  contactEm: string;
  address: string;
  mapLink: string;
  landArea: number;
  buildingArea: number;
  priceEstimation: number;
  planToSell: string;
  propertyType: string;
  ownershipStatus: string;
  propertyCondition: string;
  planToSellPercentage: string;
  occupancyStatus: string;
  propertyManager: string;
  furniture: string;
  propertyIssues: string[];
  includedFurniture: string;
}

const ListProperty: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    contactPh: "",
    contactEm: "",
    address: "",
    mapLink: "",
    landArea: 0,
    buildingArea: 0,
    priceEstimation: 0,
    planToSell: "",
    propertyType: "",
    ownershipStatus: "",
    propertyCondition: "",
    planToSellPercentage: "",
    occupancyStatus: "",
    propertyManager: "",
    furniture: "",
    propertyIssues: [],
    includedFurniture: "",
  });

  const [step, setStep] = useState(1);

  const onClose = () => {
    setIsRequestSentModal(false);
    router.push("/");
  };

  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [isRequestSentModalOpen, setIsRequestSentModal] =
    useState<boolean>(false);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-start p-6 pb-16 gap-6 w-full md:w-[828px] md:h-[1167px]">
        <h2 className="text-2xl font-bold text-[#042F2E] leading-[28px]">
          Property Listing Request
        </h2>
        <div className="flex flex-col p-6 gap-6 bg-white shadow-md rounded-lg w-full pr-6">
          {step === 1 && (
            <FormPart1 formData={formData} setFormData={setFormData} />
          )}
          {step === 2 && (
            <FormPart2 formData={formData} setFormData={setFormData} />
          )}
          <div className="flex flex-row mt-4">
            {step > 1 && (
              <Button
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                padding="12px 16px"
                gap="6px"
                width="165px"
                height="40px"
                background="#FFFFFF"
                boxShadow="0px 1px 2px rgba(16, 24, 40, 0.06), 0px 1px 3px rgba(16, 24, 40, 0.1)"
                borderRadius="100px"
                _hover={{
                  boxShadow:
                    "0px 2px 4px rgba(16, 24, 40, 0.12), 0px 2px 6px rgba(16, 24, 40, 0.15)",
                }}
                onClick={prevStep}
              >
                Back
              </Button>
            )}
            {step < 2 ? (
              <Button
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                padding="12px 16px"
                gap="6px"
                width="756px"
                height="40px"
                backgroundColor="#0D9488"
                borderRadius="100px"
                order={8}
                alignSelf="stretch"
                flexGrow={0}
                textColor="white"
                onClick={nextStep}
              >
                Continue
              </Button>
            ) : (
              <Button
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                padding="12px 16px"
                gap="6px"
                width="575px"
                height="40px"
                backgroundColor="#0D9488"
                borderRadius="100px"
                order={8}
                alignSelf="stretch"
                flexGrow={0}
                textColor="white"
                ml="12px"
                onClick={() => setIsRequestSentModal(true)}
              >
                Submit
              </Button>
            )}
            <RequestSentModal
              isOpen={isRequestSentModalOpen}
              onClose={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProperty;
