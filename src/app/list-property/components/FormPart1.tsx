"use client";

import React from "react";

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
interface FormPart1Props {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const FormPart1: React.FC<FormPart1Props> = ({ formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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
      <div className="flex flex-col items-start p-0 gap-1.5 h-[66px]">
        <div className="flex flex-row items-center p-0 gap-0.75">
          <p className="text-sm font-normal text-zinc-700">
            Name <span className="text-zinc-400">*</span>
          </p>
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
      <div className="flex flex-col md:flex-row items-start p-0 gap-1.5  md:h-[66px]">
        {/* Phone */}
        <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2 h-[66px]">
          <div className="flex flex-row items-center p-0 gap-0.75">
            <p className="text-sm font-normal text-zinc-700">
              Phone <span className="text-zinc-400">*</span>
            </p>
          </div>
          <div className="flex flex-col items-start p-0 gap-1 w-full">
            <input
              type="text"
              name="contactPh"
              value={formData.contactPh}
              onChange={handleChange}
              className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full p-2"
              placeholder="Enter your Phone number"
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2 h-[66px]">
          <div className="flex flex-row items-center p-0 gap-0.75">
            <p className="text-sm font-normal text-zinc-700">
              Email <span className="text-zinc-400">*</span>
            </p>
          </div>
          <div className="flex flex-col items-start p-0 gap-1 w-full">
            <input
              type="text"
              name="contactEm"
              value={formData.contactEm}
              onChange={handleChange}
              className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full p-2"
              placeholder="Enter your Email"
            />
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="flex flex-col items-start p-0 gap-1.5  h-[66px]">
        <div className="flex flex-row items-center p-0 gap-0.75">
          <p className="text-sm font-normal text-zinc-700">
            Property address <span className="text-zinc-400">*</span>
          </p>
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
      <div className="flex flex-col items-start p-0 gap-1.5  h-[66px]">
        <div className="flex flex-row items-center p-0 gap-0.75">
          <p className="text-sm font-normal text-zinc-700">
            Google Maps URL <span className="text-zinc-400">*</span>
          </p>
        </div>
        <div className="flex flex-col items-start p-0 gap-1 w-full">
          <input
            type="text"
            name="mapLink"
            value={formData.mapLink}
            onChange={handleChange}
            className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full p-2"
            placeholder="Enter Google Maps URL"
          />
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
          </div>
          <div className="flex flex-col items-start p-0 gap-1 w-full">
            <div className="flex items-center bg-[#F4F4F5] border-none rounded-full h-[40px] w-full relative">
              <input
                type="number"
                name="landArea"
                value={formData.landArea}
                onChange={handleChange}
                className="flex-grow h-full bg-transparent border-none rounded-full pl-3 md:pr-10 focus:outline-none focus:ring-0 focus:border-none"
              />
              <span className="text-sm text-[#3F3F46] pr-3">m³</span>
            </div>
          </div>
        </div>

        {/* Building */}
        <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2 h-[66px]">
          <div className="flex flex-row items-center p-0 gap-0.75">
            <p className="text-sm font-normal text-zinc-700">
              Building area <span className="text-zinc-400">*</span>
            </p>
          </div>
          <div className="flex flex-col items-start p-0 gap-1 w-full">
            <div className="flex items-center bg-[#F4F4F5] border-none rounded-full h-[40px] w-full relative">
              <input
                type="number"
                name="buildingArea"
                value={formData.buildingArea}
                onChange={handleChange}
                className="flex-grow h-full bg-transparent border-none rounded-full pl-3 md:pr-10 focus:outline-none focus:ring-0 focus:border-none"
              />
              <span className="text-sm text-[#3F3F46] pr-3">m³</span>
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
          </div>
          <div className="flex flex-col items-start p-0 gap-1 w-full">
            <div className="flex items-center bg-[#F4F4F5] border-none rounded-full h-[40px] w-full relative">
              <input
                type="number"
                name="priceEstimation"
                value={formData.priceEstimation}
                onChange={handleChange}
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
