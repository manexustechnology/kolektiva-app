"use client";

import React, { useState } from "react";

interface FormData {
  name: string;
  contact: string;
  address: string;
  mapLink: string;
  landArea: string;
  buildingArea: string;
  priceEstimation: string;
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
  const [formData, setFormData] = useState<FormData>({
    name: "",
    contact: "",
    address: "",
    mapLink: "",
    landArea: "",
    buildingArea: "",
    priceEstimation: "",
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

  return (
    <div className="flex flex-col items-start gap-6 p-6">
      {/* Your content here */}
    </div>
  );
};

export default ListProperty;
