"use client";

import { Box } from "@chakra-ui/react";
import PropertyCards from "./PropertyCards";
import FilterBar from "./FilterBar";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { IMarketFilter } from "@/types/filter";
import { useActiveWalletChain } from "thirdweb/react";
import { validChainIds } from "@/commons/networks";

interface FilterBarProps {
  locations: string[];
  propertyTypes: string[];
  sortOptions: string[];
  onFilterApply: (newFilters: any) => void;
  onFilterReset: () => void;
  filters: IMarketFilter;
}

const PropertyListings: React.FC = () => {
  const [isCorrectNetwork, setIsCorrectNetwork] = useState<boolean>(false);
  const activeChain = useActiveWalletChain()!;

  const [filters, setFilters] = useState<IMarketFilter>({
    location: "",
    propertyType: "",
    status: "",
    sortOption: "",
    priceRange: [0, 1000],
  });

  const searchParams = useSearchParams();

  useEffect(() => {
    const filterLocation = searchParams.get("location") || "";
    const filterPropertyType = searchParams.get("propertyType") || "";
    const filterStatus = searchParams.get("status") || "";

    setFilters((prev) => ({
      ...prev,
      location: filterLocation,
      propertyType: filterPropertyType,
      status: filterStatus,
    }));
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

  useEffect(() => {
    if (activeChain && validChainIds.includes(activeChain.id)) {
      setIsCorrectNetwork(true);
    }
  }, [activeChain]);

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
      {isCorrectNetwork === true ? (
        <PropertyCards filters={filters} />
      ) : (
        <div className="flex justify-center items-center h-[60vh]">
          <p className="font-bold text-2xl leading-7 text-center text-teal-600">
            No data found!
          </p>
        </div>
      )}
    </Box>
  );
};

export default PropertyListings;
