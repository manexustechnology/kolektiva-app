"use client";

import { useState } from "react";
import { CaretDown, CaretUp } from "@phosphor-icons/react/dist/ssr";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  useDisclosure,
} from "@chakra-ui/react";

const FilterBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sliderValue, setSliderValue] = useState(50);

  return (
    <Box p={4} bg="white" borderRadius="md">
      <div className="flex flex-row">
        <Select
          placeholder="Location"
          _hover={{
            backgroundColor: "#CCFBF1",
          }}
          _focus={{
            backgroundColor: "#CCFBF1",
          }}
          icon={<CaretDown weight="fill" />}
          rounded={100}
          width="200px"
          marginLeft={12}
          marginRight={5}
        >
          <option value="Location 1">Location 1</option>
          <option value="Location 2">Location 2</option>
          <option value="Location 3">Location 3</option>
        </Select>
        <Select
          placeholder="Property Type"
          _hover={{
            backgroundColor: "#CCFBF1",
          }}
          _focus={{
            backgroundColor: "#CCFBF1",
          }}
          icon={<CaretDown weight="fill" />}
          width="200px"
          rounded={100}
        >
          <option value="Property Type 1">Property Type 1</option>
          <option value="Property Type 2">Property Type 2</option>
          <option value="Property Type 3">Property Type 3</option>
        </Select>
        <div className="absolute right-20">
          <Menu isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
            <MenuButton as={Button} onClick={onOpen}>
              Open Dropdown
            </MenuButton>
            <MenuList maxH="300px" overflowY="auto" p={4}>
              <Box p={4}>
                <Slider
                  aria-label="slider-ex-1"
                  defaultValue={sliderValue}
                  min={0}
                  max={100}
                  onChange={(value) => setSliderValue(value)}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <Box mt={2}>Value: {sliderValue}</Box>
              </Box>
            </MenuList>
          </Menu>
        </div>
      </div>

      {/*Slider */}
    </Box>
  );
};

export default FilterBar;
