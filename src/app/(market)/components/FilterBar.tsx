'use client';

import { useEffect, useMemo, useState } from 'react';
import { CaretDown } from '@phosphor-icons/react/dist/ssr';
import {
  Box,
  Select,
  Tab,
  TabList,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react';
import { IMarketFilter } from '@/types/filter';
import { findPropertyLocations } from '@/app/api/property.api';

interface FilterBarProps {
  locations: string[];
  propertyTypes: string[];
  sortOptions: string[];
  onFilterApply: (newFilters: any) => void;
  filters: IMarketFilter;
}

const phaseStringToIndex = (value: string): number => {
  switch (value) {
    case 'upcoming':
      return 1;
    case 'initial-offering':
      return 2;
    case 'aftermarket':
      return 3;
    default:
      return 0;
  }
};

const phaseIndexToString = (value: number): string => {
  switch (value) {
    case 1:
      return 'upcoming';
    case 2:
      return 'initial-offering';
    case 3:
      return 'aftermarket';
    default:
      return '';
  }
};

const FilterBar: React.FC<FilterBarProps> = ({
  propertyTypes,
  sortOptions,
  onFilterApply,
  filters,
}) => {
  const [locations, setLocations] = useState<string[]>([]); // State for locations
  const [phaseTabIndex, setPhaseTabIndex] = useState(
    phaseStringToIndex(filters.phase),
  );

  useEffect(() => {
    setPhaseTabIndex(phaseStringToIndex(filters.phase));
  }, [filters]);

  const handleFilterChange = (key: string, value: any) => {
    const updatedFilters = { ...filters, [key]: value };
    onFilterApply(updatedFilters);
  };

  const handleTabChange = (index: number) => {
    setPhaseTabIndex(index);
    const updatedFilters = { ...filters, phase: phaseIndexToString(index) };
    onFilterApply(updatedFilters);
  };

  useEffect(() => {
    const fetchPropertyLocations = async () => {
      try {
        const response = await findPropertyLocations({
          city: true,
          location: true,
          state: true,
          country: true,
        });

        if (response && response.city) {
          setLocations(response.city);
        }

        console.log('Property Locations:', response);
      } catch (error) {
        console.error('Error fetching property locations:', error);
      }
    };

    fetchPropertyLocations();
  }, []);

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
          id="sort"
          placeholder="Default Sort"
          backgroundColor="#F4F4F5"
          _hover={{
            backgroundColor: '#CCFBF1',
          }}
          _focus={{
            backgroundColor: '#CCFBF1',
          }}
          icon={<CaretDown weight="fill" />}
          width="200px"
          marginRight={5}
          rounded={100}
          onChange={(e) => handleFilterChange('sort', e.target.value)}
        >
          {sortOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </Select>

        <Select
          id="location"
          placeholder="All Location"
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
          placeholder="All Property Type"
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

        <div className="absolute right-0">
          {/*Tabs*/}
          <Tabs
            variant="soft-rounded"
            colorScheme="teal"
            index={phaseTabIndex}
            onChange={handleTabChange}
          >
            <TabList
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              backgroundColor="#F4F4F5"
              borderRadius="full"
              padding="4px 6px"
            >
              <Tab
                _selected={{
                  bg: 'white',
                  color: '#0D9488',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  transform: 'scale(1.05)',
                  transition: 'all 0.3s ease-in-out',
                }}
                _hover={{
                  transform: 'scale(1.02)',
                  transition: 'transform 0.2s ease-in-out',
                }}
                fontSize="14px"
                fontWeight="500"
                paddingLeft="16px"
                paddingRight="16px"
                borderRadius="full"
                transition="all 0.3s ease-in-out"
                value="All Phase"
              >
                All Phase
              </Tab>
              <Tab
                _selected={{
                  bg: 'white',
                  color: '#0D9488',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  transform: 'scale(1.05)',
                  transition: 'all 0.3s ease-in-out',
                }}
                _hover={{
                  transform: 'scale(1.02)',
                  transition: 'transform 0.2s ease-in-out',
                }}
                fontSize="14px"
                fontWeight="500"
                paddingLeft="16px"
                paddingRight="16px"
                borderRadius="full"
                transition="all 0.3s ease-in-out"
                value="Upcoming"
              >
                Upcoming
              </Tab>
              <Tab
                _selected={{
                  bg: 'white',
                  color: '#0D9488',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  transform: 'scale(1.05)',
                  transition: 'all 0.3s ease-in-out',
                }}
                _hover={{
                  transform: 'scale(1.02)',
                  transition: 'transform 0.2s ease-in-out',
                }}
                fontSize="14px"
                fontWeight="500"
                paddingLeft="16px"
                paddingRight="16px"
                borderRadius="full"
                transition="all 0.3s ease-in-out"
                value="Initial Offering"
              >
                Initial Offering
              </Tab>
              <Tab
                _selected={{
                  bg: 'white',
                  color: '#0D9488',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  transform: 'scale(1.05)',
                  transition: 'all 0.3s ease-in-out',
                }}
                _hover={{
                  transform: 'scale(1.02)',
                  transition: 'transform 0.2s ease-in-out',
                }}
                fontSize="14px"
                fontWeight="500"
                paddingLeft="16px"
                paddingRight="16px"
                borderRadius="full"
                transition="all 0.3s ease-in-out"
                value="Aftermarket"
              >
                Aftermarket
              </Tab>
            </TabList>
          </Tabs>
        </div>
      </div>
    </Box>
  );
};

export default FilterBar;
