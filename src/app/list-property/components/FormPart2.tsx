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
  occupancyStatus: string;
  propertyManager: string;
  furniture: string;
  propertyIssues: string[];
  includedFurniture: string;
  errmsg: boolean;
  validEmail: boolean;
  validMap: boolean;
}

interface FormPart2Props {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const FormPart2: React.FC<FormPart2Props> = ({ formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      ownershipStatus: event.target.value,
    });
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prevData) => {
      const updatedIssues = checked
        ? [...prevData.propertyIssues, name]
        : prevData.propertyIssues.filter((issue) => issue !== name);
      return { ...prevData, propertyIssues: updatedIssues };
    });
  };

  return (
    <>
      {/* Heading */}
      <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-[756px]">
        <div className="text-xl font-medium text-[#042F2E]">
          Property Details
        </div>
        <div className="text-base font-regular text-[#3F3F46]">
          Tell us more about your property to create a comprehensive listing
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex flex-row items-start p-0 gap-1.5 w-full h-[6px]">
        <div className="w-1/2  h-[6px] bg-[#0D9488] rounded-full flex-none order-0 flex-grow">
          {/* Rectangle 1 */}
        </div>
        <div className="w-1/2 h-[6px] bg-[#0D9488] rounded-full flex-none order-1 flex-grow">
          {/* Rectangle 2 */}
        </div>
      </div>

      {/* Sell Plan / Property Type */}
      <div className="flex flex-col md:flex-row items-start p-0 gap-1.5 ">
        {/* Sell Plan */}
        <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
          <div className="flex flex-row items-center p-0 gap-0.75">
            <p className="text-sm font-normal text-zinc-700">
              When do you plan to sell the property?{" "}
              <span className="text-zinc-400">*</span>
            </p>
            {formData.errmsg && formData.planToSell === "" && (
              <span className="text-red-500 text-xs">Select an option</span>
            )}
          </div>
          <div className="flex flex-col items-start p-0 gap-1 w-full">
            <div className="relative w-full">
              <select
                name="planToSell"
                value={formData.planToSell}
                onChange={handleDropdownChange}
                className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full pl-4 pr-4"
              >
                <option value="" disabled>
                  Select Sell Plan
                </option>
                <option value="ASAP">ASAP</option>
                <option value="Slightly Looking Price">
                  Slightly Looking Price
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Property Type */}
        <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
          <div className="flex flex-row items-center p-0 gap-0.75">
            <p className="text-sm font-normal text-zinc-700">
              Property Type
              <span className="text-zinc-400">*</span>
            </p>
            {formData.errmsg && formData.propertyType === "" && (
              <span className="text-red-500 text-xs">Select an option</span>
            )}
          </div>
          <div className="flex flex-col items-start p-0 gap-1 w-full">
            <div className="relative w-full">
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleDropdownChange}
                className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full pl-4 pr-4"
              >
                <option value="" disabled>
                  Select Property Type
                </option>
                <option value="Apartments">Apartments</option>
                <option value="Villa">Villa</option>
                <option value="House">House</option>
                <option value="Commercial Buildings">
                  Commercial Buildings
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/*Ownership*/}
      <div className="flex flex-col items-start p-0 gap-1.5  md:h-[128px]">
        <div className="flex flex-row items-center p-0 gap-0.75">
          <p className="text-sm font-normal text-zinc-700">
            Does the property still have a loan, or is it fully owned?{" "}
            <span className="text-zinc-400">*</span>
          </p>
          {formData.errmsg && formData.ownershipStatus === "" && (
            <span className="text-red-500 text-xs">Select an option</span>
          )}
        </div>

        <div className="flex flex-col items-start p-0 gap-3 w-[756px] md:h-[66px]">
          <div className="flex flex-row items-center p-0 gap-3 w-[351px] h-[20px]">
            <input
              type="radio"
              id="fullOwnership"
              name="propertyOwnership"
              value="full"
              className="w-[24px] h-[24px] bg-red"
              checked={formData.ownershipStatus === "full"}
              onChange={handleOptionChange}
            />
            <label
              htmlFor="fullOwnership"
              className="text-sm font-normal text-zinc-700"
            >
              I own 100% of the property
            </label>
          </div>
          <div className="flex flex-row items-center p-0 gap-3 w-[351px] md:h-[20px]">
            <input
              type="radio"
              id="partialOwnership"
              name="propertyOwnership"
              value="partial"
              className="w-[24px] h-[24px]"
              checked={formData.ownershipStatus === "partial"}
              onChange={handleOptionChange}
            />
            <label
              htmlFor="partialOwnership"
              className="text-sm font-normal text-zinc-700"
            >
              I own partial ownership of the property
            </label>
          </div>
          <div className="flex flex-row items-center p-0 gap-3 w-[351px] md:h-[20px]">
            <input
              type="radio"
              id="onCredit"
              name="propertyOwnership"
              value="credit"
              className="w-[24px] h-[24px]"
              checked={formData.ownershipStatus === "credit"}
              onChange={handleOptionChange}
            />
            <label
              htmlFor="onCredit"
              className="text-sm font-normal text-zinc-700"
            >
              It is still on credit, not fully purchased
            </label>
          </div>
        </div>
      </div>

      {/* Property Condition */}
      <div className="flex flex-col items-start p-0 gap-1.5  h-[66px]">
        <div className="flex flex-row items-center p-0 gap-0.75">
          <p className="text-sm font-normal text-zinc-700">
            Property condition <span className="text-zinc-400">*</span>
          </p>
          {formData.errmsg && formData.propertyCondition === "" && (
            <span className="text-red-500 text-xs">Select an option</span>
          )}
        </div>
        <div className="flex flex-col items-start p-0 gap-1 w-full">
          <div className="relative w-full">
            <select
              name="propertyCondition"
              value={formData.propertyCondition}
              onChange={handleDropdownChange}
              className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full pl-4 pr-4"
            >
              <option value="" disabled>
                Select Property Condition
              </option>
              <option value="New">New</option>
              <option value="Well Maintained">Well Maintained</option>
              <option value="Inhabitable">Inhabitable</option>
            </select>
          </div>
        </div>
      </div>

      {/* Occupancy Status */}
      <div className="flex flex-col items-start p-0 gap-1.5 h-[66px]">
        <div className="flex flex-row items-center p-0 gap-0.75">
          <p className="text-sm font-normal text-zinc-700">
            Occupancy status <span className="text-zinc-400">*</span>
          </p>
          {formData.errmsg && formData.occupancyStatus === "" && (
            <span className="text-red-500 text-xs">Select an option</span>
          )}
        </div>
        <div className="flex flex-col items-start p-0 gap-1 w-full">
          <div className="relative w-full">
            <select
              name="occupancyStatus"
              value={formData.occupancyStatus}
              onChange={handleDropdownChange}
              className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full pl-4 pr-4"
            >
              <option value="" disabled>
                Select Occupancy Status
              </option>
              <option value="Vacant">Vacant</option>
              <option value="Rented">Rented</option>
              <option value="Owner occupied">Owner occupied</option>
            </select>
          </div>
        </div>
      </div>

      {/* Manager / Furniture */}
      <div className="flex flex-col md:flex-row items-start p-0 gap-1.5 md:h-[66px]">
        {/* Manager */}
        <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
          <div className="flex flex-row items-center p-0 gap-0.75">
            <p className="text-sm font-normal text-zinc-700">
              Is there’s a Property Manager for your property?{" "}
              <span className="text-zinc-400">*</span>
            </p>
            {formData.errmsg && formData.propertyManager === "" && (
              <span className="text-red-500 text-xs">Select an option</span>
            )}
          </div>
          <div className="flex flex-col items-start p-0 gap-1 w-full">
            <div className="relative w-full">
              <select
                name="propertyManager"
                value={formData.propertyManager}
                onChange={handleDropdownChange}
                className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full pl-4 pr-4"
              >
                <option value="" disabled>
                  Select Option
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </div>

        {/* Furniture */}
        <div className="flex flex-col items-start p-0 gap-1.5 w-full md:w-1/2">
          <div className="flex flex-row items-center p-0 gap-0.75">
            <p className="text-sm font-normal text-zinc-700">
              Furniture <span className="text-zinc-400">*</span>
            </p>
            {formData.errmsg && formData.furniture === "" && (
              <span className="text-red-500 text-xs">Select an option</span>
            )}
          </div>
          <div className="flex flex-col items-start p-0 gap-1 w-full">
            <div className="relative w-full">
              <select
                name="furniture"
                value={formData.furniture}
                onChange={handleDropdownChange}
                className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full pl-4 pr-4"
              >
                <option value="" disabled>
                  Select Option
                </option>
                <option value="Full furnish">Full furnish</option>
                <option value="Half furnish">Half furnish</option>
                <option value="Empty">Empty</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Property Issues */}
      <div className="flex flex-col items-start p-0 gap-3  h-[236px]">
        <div className="flex flex-row items-center p-0 gap-0.75 w-full">
          <p className="text-sm font-normal text-zinc-700">
            Does the property have any issues?{" "}
            <span className="text-zinc-400">*</span>
          </p>
          {formData.errmsg && formData.propertyIssues.length === 0 && (
            <span className="text-red-500 text-xs">Select atleast one</span>
          )}
        </div>

        {/* Checkboxes */}
        <div className="flex flex-col p-0 gap-3 w-full">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="foundation"
              name="Foundation"
              checked={formData.propertyIssues.includes("Foundation")}
              onChange={handleCheckboxChange}
              className="w-6 h-6"
            />
            <label
              htmlFor="foundation"
              className="ml-2 text-sm font-normal text-zinc-700"
            >
              Foundation
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="roof"
              name="Roof"
              checked={formData.propertyIssues.includes("Roof")}
              onChange={handleCheckboxChange}
              className="w-6 h-6"
            />
            <label
              htmlFor="roof"
              className="ml-2 text-sm font-normal text-zinc-700"
            >
              Roof
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="plumbing"
              name="Plumbing"
              checked={formData.propertyIssues.includes("Plumbing")}
              onChange={handleCheckboxChange}
              className="w-6 h-6"
            />
            <label
              htmlFor="plumbing"
              className="ml-2 text-sm font-normal text-zinc-700"
            >
              Plumbing
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="fireDamage"
              name="Fire Damage"
              checked={formData.propertyIssues.includes("Fire Damage")}
              onChange={handleCheckboxChange}
              className="w-6 h-6"
            />
            <label
              htmlFor="fireDamage"
              className="ml-2 text-sm font-normal text-zinc-700"
            >
              Fire Damage
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="paint"
              name="Paint"
              checked={formData.propertyIssues.includes("Paint")}
              onChange={handleCheckboxChange}
              className="w-6 h-6"
            />
            <label
              htmlFor="paint"
              className="ml-2 text-sm font-normal text-zinc-700"
            >
              Paint
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="noneOfTheAbove"
              name="None of the above"
              checked={formData.propertyIssues.includes("None of the above")}
              onChange={handleCheckboxChange}
              className="w-6 h-6"
            />
            <label
              htmlFor="noneOfTheAbove"
              className="ml-2 text-sm font-normal text-zinc-700"
            >
              None of the above
            </label>
          </div>
        </div>
      </div>

      {/* Furniture sale */}
      <div className="flex flex-col items-start p-0 gap-1.5 h-[66px]">
        <div className="flex flex-row items-center p-0 gap-0.75">
          <p className="text-sm font-normal text-zinc-700">
            Any furniture will be included on sale?{" "}
          </p>
        </div>
        <div className="flex flex-col items-start p-0 gap-1 w-full">
          <input
            type="text"
            name="includedFurniture"
            value={formData.includedFurniture}
            onChange={handleChange}
            className="w-full h-[40px] bg-[#F4F4F5] border-none rounded-full p-2"
            placeholder="Stove, dishwasher, furnace, etc."
          />
        </div>
      </div>
    </>
  );
};

export default FormPart2;
