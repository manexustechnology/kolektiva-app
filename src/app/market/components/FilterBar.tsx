"use client";

import { useState } from "react";
import {
  CaretDown,
  CaretUp,
  SlidersHorizontal,
} from "@phosphor-icons/react/dist/ssr";
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
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";

const FilterBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sliderValue1, setSliderValue1] = useState(50);
  const [showTooltip1, setShowTooltip1] = useState(false);
  const [sliderValue2, setSliderValue2] = useState(50);
  const [showTooltip2, setShowTooltip2] = useState(false);

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
        >
          <option value="Property Type 1">Property Type 1</option>
          <option value="Property Type 2">Property Type 2</option>
          <option value="Property Type 3">Property Type 3</option>
        </Select>
        <div className="absolute right-0">
          <Menu isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
            <MenuButton
              as={Button}
              rounded={100}
              width="200px"
              onClick={onOpen}
              rightIcon={<SlidersHorizontal weight="fill" />}
              textAlign="start"
              _hover={{
                backgroundColor: "#CCFBF1",
              }}
              _focus={{
                backgroundColor: "#CCFBF1",
              }}
              backgroundColor="#F4F4F5"
            >
              Filter
            </MenuButton>
            <MenuList zIndex={1000} width={400} p={4}>
              {/*Sliders*/}
              <Box p={4} gap={4}>
                <Box mt={2}>Projected Rental Yield</Box>
                <Box display="flex" justifyContent="space-between" gap={4}>
                  <Box>0</Box>
                  <Slider
                    colorScheme="teal"
                    aria-label="slider-1"
                    defaultValue={sliderValue1}
                    min={0}
                    max={100}
                    onChange={(value) => setSliderValue1(value)}
                    onMouseEnter={() => setShowTooltip1(true)}
                    onMouseLeave={() => setShowTooltip1(false)}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <Tooltip
                      hasArrow
                      bg="gray.300"
                      color="black"
                      placement="top"
                      isOpen={showTooltip1}
                      label={`${sliderValue1}`}
                    >
                      <SliderThumb />
                    </Tooltip>
                  </Slider>
                  <Box>100</Box>
                </Box>

                {/* Dividing Line */}
                <Box
                  width="362px"
                  height="1px"
                  backgroundColor="#E4E4E7"
                  flex="none"
                  order={1}
                  alignSelf="stretch"
                  flexGrow={0}
                  my={4}
                />

                <Box mt={2}>Projected Annual Return </Box>
                <Box display="flex" justifyContent="space-between" gap={4}>
                  <Box>0</Box>
                  <Slider
                    colorScheme="teal"
                    aria-label="slider-2"
                    defaultValue={sliderValue2}
                    min={0}
                    max={100}
                    onChange={(value) => setSliderValue2(value)}
                    onMouseEnter={() => setShowTooltip2(true)}
                    onMouseLeave={() => setShowTooltip2(false)}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <Tooltip
                      hasArrow
                      bg="gray.300"
                      color="black"
                      placement="top"
                      isOpen={showTooltip2}
                      label={`${sliderValue2}`}
                    >
                      <SliderThumb />
                    </Tooltip>
                  </Slider>
                  <Box>100</Box>
                </Box>
              </Box>

              {/*Buttons*/}
              <Box mt={4} gap={4} display="flex" justifyContent="space-between">
                <Button
                  width="full"
                  rounded={100}
                  onClick={() => alert("Button A clicked")}
                  backgroundColor="teal.100"
                  color="teal.700"
                >
                  Reset
                </Button>
                <Button
                  width="full"
                  rounded={100}
                  onClick={() => alert("Button B clicked")}
                  backgroundColor="teal.600"
                  color="white"
                >
                  Apply
                </Button>
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
