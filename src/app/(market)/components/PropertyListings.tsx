"use client";

import { Box } from "@chakra-ui/react";
import PropertyCards from "./PropertyCards";
import FilterBar from "./FilterBar";

interface FilterBarProps {
  locations: string[];
  propertyTypes: string[];
  sortOptions: string[];
  onFilterApply: () => void;
  onFilterReset: () => void;
  initialSliderValue1?: number;
  initialSliderValue2?: number;
}

const PropertyListings: React.FC = () => {
  const filterBarProps: FilterBarProps = {
    locations: ["Location 1", "Location 2", "Location 3"],
    propertyTypes: ["Property Type 1", "Property Type 2", "Property Type 3"],
    sortOptions: ["Featured", "Newest", "Oldest"],
    onFilterApply: () => {
      alert("Filter applied");
    },
    onFilterReset: () => {
      alert("Filter reset");
    },
    initialSliderValue1: 50,
    initialSliderValue2: 50,
  };

  return (
    <Box
      width={1238}
      overflow="hidden"
      maxWidth="1238px"
      margin="0 auto"
      alignItems="center"
    >
      <FilterBar {...filterBarProps} />
      <PropertyCards />
    </Box>
  );
};

export default PropertyListings;
