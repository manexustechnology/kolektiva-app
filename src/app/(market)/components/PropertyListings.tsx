"use client";

import { Box } from "@chakra-ui/react";
import PropertyCards from "./PropertyCards";
import FilterBar from "./FilterBar";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { IMarketFilter } from "@/types/filter";

interface FilterBarProps {
  locations: string[];
  propertyTypes: string[];
  sortOptions: string[];
  onFilterApply: (newFilters: any) => void;
  onFilterReset: () => void;
  filters: IMarketFilter;
}

const PropertyListings: React.FC = () => {
  const [filters, setFilters] = useState<IMarketFilter>({
    location: "",
    propertyType: "",
    status: "",
    sortOption: "",
    priceRange: [0, 1000],
  });

  const searchParams = useSearchParams();

  useEffect(() => {
    const filterLocation = searchParams.get('location') || '';
    const filterPropertyType = searchParams.get('propertyType') || '';
    const filterStatus = searchParams.get('status') || '';

    setFilters((prev) => ({
      ...prev,
      location: filterLocation,
      propertyType: filterPropertyType,
      status: filterStatus,
    }))
  }, []);

  const handleFilterApply = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleFilterReset = () => {
    setFilters({
      location: "",
      propertyType: "",
      status: "",
      sortOption: "",
      priceRange: [0, 1000],
    });
  };

  const filterBarProps: FilterBarProps = {
    locations: ["DKI Jakarta", "Surabaya", "Denpasar", "Bandung"],
    propertyTypes: ["House", "Apartment"],
    sortOptions: ["Featured", "Newest", "Oldest"],
    onFilterApply: handleFilterApply,
    onFilterReset: handleFilterReset,
    filters,
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
