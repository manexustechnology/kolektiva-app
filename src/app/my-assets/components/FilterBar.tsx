"use client";

import { useState } from "react";
import {
  CaretDown,
  CaretUp,
  MagnifyingGlass,
  SlidersHorizontal,
  SortDescending,
} from "@phosphor-icons/react/dist/ssr";
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
} from "@chakra-ui/react";

interface FilterBarProps {
  locations: string[];
  propertyTypes: string[];
  sortOptions: string[];
  onFilterApply: () => void;
  onFilterReset: () => void;
  initialSliderValue1?: number;
  initialSliderValue2?: number;
}

const FilterBar: React.FC<FilterBarProps> = ({
  locations,
  propertyTypes,
  sortOptions,
  onFilterApply,
  onFilterReset,
  initialSliderValue1 = 50,
  initialSliderValue2 = 50,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sliderValue1, setSliderValue1] = useState(50);
  const [sliderValue2, setSliderValue2] = useState(50);

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
            backgroundColor: "#CCFBF1",
          }}
          _focus={{
            backgroundColor: "#CCFBF1",
          }}
          icon={<CaretDown weight="fill" />}
          rounded={100}
          width="200px"
          marginRight={5}
        >
          <option value="Location 1">Location 1</option>
          <option value="Location 2">Location 2</option>
          <option value="Location 3">Location 3</option>
        </Select>
        <Select
          id="propertytype"
          placeholder="Property Type"
          backgroundColor="#F4F4F5"
          _hover={{
            backgroundColor: "#CCFBF1",
          }}
          _focus={{
            backgroundColor: "#CCFBF1",
          }}
          icon={<CaretDown weight="fill" />}
          width="200px"
          rounded={100}
          marginRight={5}
        >
          <option value="Property Type 1">Property Type 1</option>
          <option value="Property Type 2">Property Type 2</option>
          <option value="Property Type 3">Property Type 3</option>
        </Select>

        <Flex direction="row" className="absolute right-0 gap-4">
          <Select
            id="sort"
            placeholder="Sort"
            backgroundColor="#F4F4F5"
            _hover={{
              backgroundColor: "#CCFBF1",
            }}
            _focus={{
              backgroundColor: "#CCFBF1",
            }}
            icon={<SortDescending />}
            width="200px"
            rounded="full"
          >
            <option value="Featured">Featured</option>
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
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
              backgroundColor: "#CCFBF1",
            }}
            _focus={{
              backgroundColor: "#CCFBF1",
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
              _placeholder={{ color: "#71717A" }}
            />
          </Flex>
        </Flex>
      </div>

      {/*Slider */}
    </Box>
  );
};

export default FilterBar;
