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
  SliderMark,
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
              <Box p={1} gap={4}>
                <Box mt={2} marginBottom={10}>
                  Projected Rental Yield
                </Box>
                <div className="flex gap-3 justify-between items-center">
                  <p className="text-xs text-zinc-500 w-full max-w-5">0%</p>
                  <Slider
                    aria-label="slider-1"
                    min={0}
                    max={100}
                    defaultValue={sliderValue1}
                    onChange={(value) => setSliderValue1(value)}
                  >
                    <SliderMark
                      value={sliderValue1}
                      textAlign="center"
                      bg="white"
                      color="black"
                      shadow="md"
                      rounded="lg"
                      fontSize="xs"
                      fontWeight="bold"
                      py={1}
                      px={2}
                      transform="translate(-50%, -45px)"
                    >
                      {sliderValue1}
                    </SliderMark>
                    <SliderTrack h={3} rounded="full">
                      <SliderFilledTrack bgColor="teal.600" />
                    </SliderTrack>
                    <SliderThumb h={5} w={5} bgColor="teal.500" />
                  </Slider>
                  <p className="text-xs text-zinc-500 w-full max-w-10">100%</p>
                </div>

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

                <Box mt={2} marginBottom={10}>
                  Projected Annual Return{" "}
                </Box>
                <div className="flex gap-3 justify-between items-center">
                  <p className="text-xs text-zinc-500 w-full max-w-5">0%</p>
                  <Slider
                    aria-label="slider-2"
                    min={0}
                    max={100}
                    defaultValue={sliderValue2}
                    onChange={(value) => setSliderValue2(value)}
                  >
                    <SliderMark
                      value={sliderValue2}
                      textAlign="center"
                      bg="white"
                      color="black"
                      shadow="md"
                      rounded="lg"
                      fontSize="xs"
                      fontWeight="bold"
                      py={1}
                      px={2}
                      transform="translate(-50%, -45px)"
                    >
                      {sliderValue2}
                    </SliderMark>
                    <SliderTrack h={3} rounded="full">
                      <SliderFilledTrack bgColor="teal.600" />
                    </SliderTrack>
                    <SliderThumb h={5} w={5} bgColor="teal.500" />
                  </Slider>
                  <p className="text-xs text-zinc-500 w-full max-w-10">100%</p>
                </div>
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
