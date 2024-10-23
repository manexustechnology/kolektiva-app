'use client';

import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import FormPart1 from './components/FormPart1';
import FormPart2 from './components/FormPart2';
import RequestSentModal from './modals/RequestSentModal';
import axios from 'axios';
import { PropertyDataForm } from '@/types/property-data-form';

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
  occupancyStatus: string;
  propertyManager: string;
  furniture: string;
  propertyIssues: string[];
  includedFurniture: string;
  errmsg: boolean;
  validEmail: boolean;
  validMap: boolean;
}

const ListProperty: React.FC = () => {
  const router = useRouter();
  const [isRequestSentModalOpen, setIsRequestSentModal] =
    useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    contactPh: '',
    contactEm: '',
    address: '',
    mapLink: '',
    landArea: 0,
    buildingArea: 0,
    priceEstimation: 0,
    planToSell: '',
    propertyType: '',
    ownershipStatus: '',
    propertyCondition: '',
    occupancyStatus: '',
    propertyManager: '',
    furniture: '',
    propertyIssues: [],
    includedFurniture: '',
    errmsg: false,
    validEmail: false,
    validMap: false,
  });
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [submitErrorMsg, setSubmitErrorMsg] = useState<string>('');

  const [step, setStep] = useState(1);

  const onClose = () => {
    setIsRequestSentModal(false);
    router.push('/');
  };

  const nextStep = () => {
    console.log(formData);
    const allFieldsFilled =
      formData.name &&
      formData.contactPh &&
      formData.contactEm &&
      formData.address &&
      formData.mapLink &&
      formData.landArea > 0 &&
      formData.buildingArea > 0 &&
      formData.priceEstimation > 0;

    const isValidEmail = formData.validEmail;
    const isValidMap = formData.validMap;

    if (allFieldsFilled && isValidEmail && isValidMap) {
      setFormData((prevData) => ({
        ...prevData,
        errmsg: false,
      }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setStep(step + 1);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        errmsg: true,
      }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sendFormData = async () => {
    setLoadingSubmit(true);
    try {
      const propertyData: PropertyDataForm = {
        propertyDetails: {
          propertyStatus: {
            phase: 'draft',
            status: 'hidden',
            rentalStatus: '',
          },
          issuerDetails: {
            issuedBy: '',
            name: formData.name,
            phoneNum: formData.contactPh,
            email: formData.contactEm,
          },
          propertySummary: {
            title: '',
            googleMapUrl: formData.mapLink,
            country: '',
            state: '',
            city: '',
            district: '',
            address: formData.address,
            landArea: formData.landArea,
            buildingArea: formData.buildingArea,
            priceEstimation: formData.priceEstimation,
          },
          propertyImages: {
            primary: '',
            others: [],
          },
          propertyDetails: {
            planToSell: formData.planToSell || 'Not Specified',
            propertyType: formData.propertyType || 'Residential',
            ownershipStatus: formData.ownershipStatus || 'Not Specified',
            propertyCondition: formData.propertyCondition || 'Not Specified',
            occupancyStatus: formData.occupancyStatus || 'Vacant',
            propertyManager: formData.propertyManager || 'Self',
            furnish: formData.furniture || 'Unfurnished',
            furniture: [],
            propertyIssues: formData.propertyIssues,
          },
          propertySpecifications: {
            propertyCertificate: '',
            floors: 0,
            waterSupply: '',
            bedrooms: 0,
            bathrooms: 0,
            garage: '',
            garden: '',
            swimPool: '',
          },
          description: '',
        },
        chain: {
          chainName: '',
          chainId: 0,
        },
        financials: {
          token: {
            tokenPrice: 0,
            tokenSupply: 0,
            tokenValue: 0,
          },
          propertyFinancials: {
            furnitureValueEstimation: 0,
            legalAdminCost: 0,
            platformListingFee: 0,
            marketingMangementCost: 0,
            propertyTaxes: 0,
            rentalTaxes: 0,
            rentalYeild: 0,
          },
        },
        documents: {
          documents: [],
        },
        markets: {
          markets: '',
        },
        errmsg: false,
        validEmail: formData.validEmail,
        validMap: formData.validMap,
      };
      const request = {
        name: formData.name,
        phone: formData.contactPh,
        email: formData.contactEm,
        address: formData.address,
        priceEstimation: formData.priceEstimation.toString(),
        propertyData,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/property-listing-request/submit`,
        request,
      );

      if (response.status !== 200 && response.status !== 201) {
        throw new Error(response.data?.message || 'Something went wrong!');
      }

      setIsRequestSentModal(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleSubmit = () => {
    const allFieldsFilled =
      formData.name &&
      formData.contactPh &&
      formData.contactEm &&
      formData.address &&
      formData.mapLink &&
      formData.landArea > 0 &&
      formData.buildingArea > 0 &&
      formData.priceEstimation > 0 &&
      formData.planToSell &&
      formData.propertyType &&
      formData.ownershipStatus &&
      formData.propertyCondition &&
      formData.occupancyStatus &&
      formData.propertyManager &&
      formData.furniture &&
      formData.propertyIssues.length > 0;

    const isValidEmail = formData.validEmail;
    const isValidMap = formData.validMap;

    if (allFieldsFilled && isValidEmail && isValidMap) {
      setFormData((prevData) => ({
        ...prevData,
        errmsg: false,
      }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      sendFormData();
    } else {
      setFormData((prevData) => ({
        ...prevData,
        errmsg: true,
      }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
            <FormPart2
              formData={formData}
              setFormData={setFormData}
              isLoading={loadingSubmit}
            />
          )}
          <div className="flex flex-col mt-4 gap-2">
            {submitErrorMsg && (
              <p className="text-sm text-rose-500 w-full text-center">
                {submitErrorMsg}
              </p>
            )}
            <div className="flex flex-row">
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
                      '0px 2px 4px rgba(16, 24, 40, 0.12), 0px 2px 6px rgba(16, 24, 40, 0.15)',
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
                  onClick={handleSubmit}
                  isLoading={loadingSubmit}
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
    </div>
  );
};

export default ListProperty;
