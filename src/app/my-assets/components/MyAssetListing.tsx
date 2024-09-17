'use client';

import { Box } from '@chakra-ui/react';
import AssetCards from './AssetCards';

import FilterBar from './FilterBar';
import { IMarketFilter } from '@/types/filter';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useActiveWalletChain } from 'thirdweb/react';
import { validChainIds } from '@/commons/networks';

interface FilterBarProps {
  locations: string[];
  propertyTypes: string[];
  sortOptions: string[];
  onFilterApply: (newFilters: any) => void;
  onFilterReset: () => void;
  filters: IMarketFilter;

  //   initialSliderValue1?: number;
  //   initialSliderValue2?: number;
}

const MyAssetListing: React.FC = () => {
  const [filters, setFilters] = useState<IMarketFilter>({
    location: '',
    propertyType: '',
    status: '',
    sort: '',
    search: '',
    priceRange: [0, 1000],
  });

  const searchParams = useSearchParams();

  useEffect(() => {
    const filterLocation = searchParams.get('location') || '';
    const filterPropertyType = searchParams.get('propertyType') || '';
    const filterStatus = searchParams.get('status') || '';
    const filterSearch = searchParams.get('search') || '';

    setFilters((prev) => ({
      ...prev,
      location: filterLocation,
      propertyType: filterPropertyType,
      status: filterStatus,
      search: filterSearch,
    }));
  }, []);

  const handleFilterApply = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleFilterReset = () => {
    setFilters({
      location: '',
      propertyType: '',
      status: '',
      sort: '',
      search: '',
      priceRange: [0, 1000],
    });
  };

  const filterBarProps: FilterBarProps = {
    locations: ['DKI Jakarta', 'Surabaya', 'Denpasar', 'Bandung'],
    propertyTypes: ['House', 'Apartment'],
    sortOptions: ['Featured', 'Newest', 'Oldest'],
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
      {/* {/* {isCorrectNetwork === true ? (
      ) : ( */}
      <AssetCards filters={filters} />
      {/* activeChain && ( */}
      {/* <div className="flex justify-center items-center h-[60vh]">
        <p className="font-bold text-2xl leading-7 text-center text-teal-600">
          Connect to your wallet!
        </p>
      </div> */}
      {/* )
      )} */}
    </Box>
  );
};

export default MyAssetListing;
