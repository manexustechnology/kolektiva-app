"use client";

import { Box } from "@chakra-ui/react";
import PropertyCards from "./PropertyCards";
import FilterBar from "./FilterBar";

const PropertyListings: React.FC = () => {
  return (
    <Box
      width={1238}
      overflow="hidden"
      maxWidth="1238px"
      margin="0 auto"
      alignItems="center"
    >
      <FilterBar />
      <PropertyCards />
    </Box>
  );
};

export default PropertyListings;
