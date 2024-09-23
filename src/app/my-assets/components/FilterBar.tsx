'use client';

import { useRef, useState } from 'react';
import {
  CaretDown,
  CaretUp,
  MagnifyingGlass,
  SlidersHorizontal,
  SortDescending,
} from '@phosphor-icons/react/dist/ssr';
import {
  Box,
  Button,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuList,
  Select,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { IMarketFilter } from '@/types/filter';

interface FilterBarProps {
  locations: string[];
  propertyTypes: string[];
  sortOptions: string[];
  onFilterApply: (newFilters: any) => void;
  onFilterReset: () => void;
  filters: IMarketFilter;
  // initialSliderValue1?: number;
  // initialSliderValue2?: number;
}

const FilterBar: React.FC<FilterBarProps> = ({
  locations,
  propertyTypes,
  sortOptions,
  onFilterApply,
  onFilterReset,
  filters,
  // initialSliderValue1 = 50,
  // initialSliderValue2 = 50,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = (key: string, value: any) => {
    const updatedFilters = { ...filters, [key]: value };
    onFilterApply(updatedFilters);
  };

  return (
    <Box
      pt={4}
      pb={4}
      position="relative"
      width={1238}
      bg="white"
      borderRadius="md"
    >
      <div className="flex flex-row">
        <Select
          id="location"
          placeholder="Location"
          backgroundColor="#F4F4F5"
          _hover={{
            backgroundColor: '#CCFBF1',
          }}
          _focus={{
            backgroundColor: '#CCFBF1',
          }}
          icon={<CaretDown weight="fill" />}
          rounded={100}
          width="200px"
          marginRight={5}
          onChange={(e) => handleFilterChange('location', e.target.value)}
        >
          {locations.map((location, index) => (
            <option
              key={index}
              value={location}
              selected={
                location.toLowerCase() === filters.location.toLowerCase()
              }
            >
              {location}
            </option>
          ))}
        </Select>
        <Select
          id="propertytype"
          placeholder="Property Type"
          backgroundColor="#F4F4F5"
          _hover={{
            backgroundColor: '#CCFBF1',
          }}
          _focus={{
            backgroundColor: '#CCFBF1',
          }}
          icon={<CaretDown weight="fill" />}
          width="200px"
          rounded={100}
          marginRight={5}
          onChange={(e) => handleFilterChange('propertyType', e.target.value)}
        >
          {propertyTypes.map((type, index) => (
            <option
              key={index}
              value={type}
              selected={
                type.toLowerCase() === filters.propertyType.toLowerCase()
              }
            >
              {type}
            </option>
          ))}
        </Select>

        <Flex direction="row" className="absolute right-0 gap-4">
          <Select
            id="sort"
            placeholder="Sort"
            backgroundColor="#F4F4F5"
            _hover={{
              backgroundColor: '#CCFBF1',
            }}
            _focus={{
              backgroundColor: '#CCFBF1',
            }}
            icon={<SortDescending />}
            width="200px"
            rounded="full"
            onChange={(e) => handleFilterChange('sort', e.target.value)}
          >
            {sortOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </Select>

          {/* Search Bar */}
          <Flex
            direction="row"
            alignItems="center"
            p="12px 16px"
            gap="6px"
            w="189px"
            h="40px"
            bg="#F4F4F5"
            borderRadius="full"
            _hover={{
              backgroundColor: '#CCFBF1',
            }}
            _focus={{
              backgroundColor: '#CCFBF1',
            }}
          >
            {/* Magnifying Glass Icon */}
            <Box as={MagnifyingGlass} size="16px" color="#3F3F46" />

            {/* Input Field */}
            <Input
              id="searchquery"
              placeholder="Search"
              variant="unstyled"
              fontSize="sm"
              fontWeight="medium"
              color="#71717A"
              _placeholder={{ color: '#71717A' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleFilterChange('search', searchQuery);
                }
              }}
            />
          </Flex>
        </Flex>
      </div>

      {/*Slider */}
    </Box>
  );
};

export default FilterBar;
