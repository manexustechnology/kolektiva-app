"use client";

import { Box } from "@chakra-ui/react";
import PropertyCards from "./PropertyCards";
import FilterBar from "./FilterBar";
import { useState } from "react";

interface FilterBarProps {
  locations: string[];
  propertyTypes: string[];
  sortOptions: string[];
  onFilterApply: (newFilters: any) => void;
  onFilterReset: () => void;
  initialSliderValue1?: number;
  initialSliderValue2?: number;
}

const PropertyListings: React.FC = () => {
  const [filters, setFilters] = useState({
    location: "",
    propertyType: "",
    sortOption: "",
    priceRange: [0, 1000],
  });

  const handleFilterApply = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleFilterReset = () => {
    setFilters({
      location: "",
      propertyType: "",
      sortOption: "",
      priceRange: [0, 1000],
    });
  };

  const filterBarProps: FilterBarProps = {
    locations: ["Location 1", "Location 2", "Location 3"],
    propertyTypes: ["Property Type 1", "Property Type 2", "Property Type 3"],
    sortOptions: ["Featured", "Newest", "Oldest"],
    onFilterApply: handleFilterApply,
    onFilterReset: handleFilterReset,
    initialSliderValue1: filters.priceRange[0],
    initialSliderValue2: filters.priceRange[1],
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
      <PropertyCards filters={filters} />
    </Box>
  );
};

export default PropertyListings;
