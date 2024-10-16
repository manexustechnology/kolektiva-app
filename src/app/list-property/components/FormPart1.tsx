'use client';

import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

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
interface FormPart1Props {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const FormPart1: React.FC<FormPart1Props> = ({ formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value === '' ? 0 : Number(value);

    setFormData((prevData) => ({
      ...prevData,
      [name]: numericValue,
    }));
  };

  const [errorEmail, setErrorEmail] = useState('');
  const [errorMap, setErrorMap] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormData((prevData) => ({
        ...prevData,
        validEmail: false,
      }));
      setErrorEmail('Please enter a valid email address.');
    } else {
      setFormData((prevData) => ({
        ...prevData,
        validEmail: true,
      }));
      setErrorEmail('');
    }
  };

  const validateMapLink = (link: string) => {
    const urlRegex =
      /^(https?:\/\/)?(www\.)?(google\.com\/maps\/|maps\.app\.goo\.gl\/).+/;
    if (!urlRegex.test(link)) {
      setFormData((prevData) => ({
        ...prevData,
        validMap: false,
      }));
      setErrorMap('Please enter a valid Google Maps URL.');
    } else {
      setFormData((prevData) => ({
        ...prevData,
        validMap: true,
      }));
      setErrorMap('');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prevData) => ({ ...prevData, contactEm: value }));
    validateEmail(value);
  };

  const handleMapLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prevData) => ({ ...prevData, mapLink: value }));
    validateMapLink(value);
  };
  const handlePhoneChange = (phone: string) => {
    setFormData((prevData) => ({
      ...prevData,
      contactPh: phone,
    }));
  };
  return (
    <>
      {/* Heading */}
      <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-[756px]">
        <div className="text-xl font-medium text-[#042F2E]">
          Personal Detail & Property Summary
        </div>
        <div className="text-base font-regular text-[#3F3F46]">
          Enter your information to proceed with your property listing request
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex flex-row items-start p-0 gap-1.5 w-full h-[6px]">
        <div className="w-1/2  h-[6px] bg-[#0D9488] rounded-full flex-none order-0 flex-grow">
          {/* Rectangle 1 */}
        </div>
        <div className="w-1/2 h-[6px] bg-[#D4D4D8] rounded-full flex-none order-1 flex-grow">
          {/* Rectangle 2 */}
        </div>
      </div>

      {/* Name */}
      <div className="flex flex-col items-start p-0 gap-1.5">
        <div className="flex flex-row items-center p-0 gap-0.75">
          <p className="text-sm font-normal text-zinc-700">
            Name <span className="text-zinc-400">*</span>
          </p>
          {formData.errmsg && formData.name === '' && (
            <span className="text-red-500 text-xs">Required Field</span>
          )}
        </div>
        <div className="flex flex-col items-start p-0 gap-1 w-full">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full p-2"
            placeholder="Enter your name"
          />
        </div>
      </div>

      {/* Phone/ E-Mail */}
      <div className="flex flex-col md:flex-row items-start p-0 gap-1.5  ">
        {/* Phone */}
        <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
          <div className="flex flex-row items-center p-0 gap-0.75">
            <p className="text-sm font-normal text-zinc-700">
              Phone <span className="text-zinc-400">*</span>
            </p>
            {formData.errmsg && formData.contactPh === '' && (
              <span className="text-red-500 text-xs">Required Field</span>
            )}
          </div>
          <div className="flex flex-col items-start p-0 gap-1 w-full h-64px">
            {/* <input
              type="text"
              name="contactPh"
              value={formData.contactPh}
              onChange={handleNumberChange}
              className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full p-2"
              placeholder="Enter your Phone number"
            /> */}
            <PhoneInput
              country={'us'}
              value={formData.contactPh}
              onChange={handlePhoneChange}
              containerStyle={{
                backgroundColor: '#F4F4F5',
                borderRadius: '9999px',
              }}
              inputStyle={{
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '9999px',
              }}
              buttonStyle={{
                border: 'none',
              }}
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
          <div className="flex flex-row items-center p-0 gap-0.75">
            <p className="text-sm font-normal text-zinc-700">
              Email <span className="text-zinc-400">*</span>
            </p>
            {formData.errmsg && formData.contactEm === '' && (
              <span className="text-red-500 text-xs">Required Field</span>
            )}
          </div>
          <div className="flex flex-col items-start p-0 gap-1 w-full">
            <input
              type="text"
              name="contactEm"
              value={formData.contactEm}
              onChange={handleEmailChange}
              className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full p-2"
              placeholder="Enter your Email"
            />
            {errorEmail && <p className="text-red-500 text-xs">{errorEmail}</p>}
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="flex flex-col items-start p-0 gap-1.5 ">
        <div className="flex flex-row items-center p-0 gap-0.75">
          <p className="text-sm font-normal text-zinc-700">
            Property address <span className="text-zinc-400">*</span>
          </p>
          {formData.errmsg && formData.address === '' && (
            <span className="text-red-500 text-xs">Required Field</span>
          )}
        </div>
        <div className="flex flex-col items-start p-0 gap-1 w-full">
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full p-2"
            placeholder="Enter property address"
          />
        </div>
      </div>

      {/* Google Map Url */}
      <div className="flex flex-col items-start p-0 gap-1.5 ">
        <div className="flex flex-row items-center p-0 gap-0.75">
          <p className="text-sm font-normal text-zinc-700">
            Google Maps URL <span className="text-zinc-400">*</span>
          </p>
          {formData.errmsg && formData.mapLink === '' && (
            <span className="text-red-500 text-xs">Required Field</span>
          )}
        </div>
        <div className="flex flex-col items-start p-0 gap-1 w-full">
          <input
            type="text"
            name="mapLink"
            value={formData.mapLink}
            onChange={handleMapLinkChange}
            className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full p-2"
            placeholder="Enter Google Maps URL"
          />
          {errorMap && <p className="text-xs text-red-500">{errorMap}</p>}
        </div>
      </div>

      {/* Land / Building Area */}
      <div className="flex flex-col md:flex-row items-start p-0 gap-1.5  md:h-[66px]">
        {/* Land */}
        <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2 h-[66px]">
          <div className="flex flex-row items-center p-0 gap-0.75">
            <p className="text-sm font-normal text-zinc-700">
              Land area <span className="text-zinc-400">*</span>
            </p>
            {formData.errmsg && formData.landArea === 0 && (
              <span className="text-red-500 text-xs">Required Field</span>
            )}
            {formData.landArea < 0 && (
              <span className="text-red-500 text-xs">
                Enter a number Greater than 0
              </span>
            )}
          </div>
          <div className="flex flex-col items-start p-0 gap-1 w-full">
            <div className="flex items-center bg-[#F4F4F5] border-none rounded-full h-[40px] w-full relative">
              <input
                type="number"
                name="landArea"
                value={formData.landArea}
                onChange={handleNumberChange}
                className="flex-grow h-full bg-transparent border-none rounded-full pl-3 md:pr-10 focus:outline-none focus:ring-0 focus:border-none"
              />
              <span className="text-sm text-[#3F3F46] pr-3">m²</span>
            </div>
          </div>
        </div>

        {/* Building */}
        <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2 h-[66px]">
          <div className="flex flex-row items-center p-0 gap-0.75">
            <p className="text-sm font-normal text-zinc-700">
              Building area <span className="text-zinc-400">*</span>
            </p>
            {formData.errmsg && formData.buildingArea === 0 && (
              <span className="text-red-500 text-xs">Required Field</span>
            )}
            {formData.buildingArea < 0 && (
              <span className="text-red-500 text-xs">
                Enter a number Greater than 0
              </span>
            )}
          </div>
          <div className="flex flex-col items-start p-0 gap-1 w-full">
            <div className="flex items-center bg-[#F4F4F5] border-none rounded-full h-[40px] w-full relative">
              <input
                type="number"
                name="buildingArea"
                value={formData.buildingArea}
                onChange={handleNumberChange}
                className="flex-grow h-full bg-transparent border-none rounded-full pl-3 md:pr-10 focus:outline-none focus:ring-0 focus:border-none"
              />
              <span className="text-sm text-[#3F3F46] pr-3">m²</span>
            </div>
          </div>
        </div>
      </div>

      {/* Price Estim */}
      <div className="flex flex-row items-start p-0 gap-1.5  h-[66px]">
        {/* Land */}
        <div className="flex flex-col items-start p-0 gap-1.5 w-full h-[66px]">
          <div className="flex flex-row items-center p-0 gap-0.75">
            <p className="text-sm font-normal text-zinc-700">
              Property price estimation <span className="text-zinc-400">*</span>
            </p>
            {formData.errmsg &&
              (formData.priceEstimation === 0 ||
                isNaN(formData.priceEstimation)) && (
                <span className="text-red-500 text-xs">Required Field</span>
              )}
            {formData.priceEstimation < 0 && (
              <span className="text-red-500 text-xs">
                Enter a number Greater than 0
              </span>
            )}
          </div>
          <div className="flex flex-col items-start p-0 gap-1 w-full">
            <div className="flex items-center bg-[#F4F4F5] border-none rounded-full h-[40px] w-full relative">
              <input
                type="number"
                name="priceEstimation"
                value={formData.priceEstimation}
                onChange={handleNumberChange}
                className="flex-grow h-full bg-transparent border-none rounded-full pl-3 md:pr-10 focus:outline-none focus:ring-0 focus:border-none"
              />
              <span className="text-sm text-[#3F3F46] pr-3">USD</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormPart1;
