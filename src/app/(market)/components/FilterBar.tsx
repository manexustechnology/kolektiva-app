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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
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
          icon={<CaretDown weight="fill" />}
          width="200px"
          rounded={100}
        >
          <option value="Featured">Featured</option>
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
        </Select>
        <div className="absolute right-0">
          {/*Slider Filter if needed*/}
          {/* <Menu isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
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
          </Menu> */}

          {/*Tabs*/}
          <Tabs variant="soft-rounded" colorScheme="teal">
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
                  bg: "white",
                  color: "#0D9488",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  transform: "scale(1.05)",
                  transition: "all 0.3s ease-in-out",
                }}
                _hover={{
                  transform: "scale(1.02)",
                  transition: "transform 0.2s ease-in-out",
                }}
                fontSize="14px"
                fontWeight="500"
                padding="16px"
                borderRadius="full"
                transition="all 0.3s ease-in-out"
              >
                All
              </Tab>
              <Tab
                _selected={{
                  bg: "white",
                  color: "#0D9488",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  transform: "scale(1.05)",
                  transition: "all 0.3s ease-in-out",
                }}
                _hover={{
                  transform: "scale(1.02)",
                  transition: "transform 0.2s ease-in-out",
                }}
                fontSize="14px"
                fontWeight="500"
                padding="16px"
                borderRadius="full"
                transition="all 0.3s ease-in-out"
              >
                Upcoming
              </Tab>
              <Tab
                _selected={{
                  bg: "white",
                  color: "#0D9488",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  transform: "scale(1.05)",
                  transition: "all 0.3s ease-in-out",
                }}
                _hover={{
                  transform: "scale(1.02)",
                  transition: "transform 0.2s ease-in-out",
                }}
                fontSize="14px"
                fontWeight="500"
                padding="16px"
                borderRadius="full"
                transition="all 0.3s ease-in-out"
              >
                Initial Offering
              </Tab>
              <Tab
                _selected={{
                  bg: "white",
                  color: "#0D9488",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  transform: "scale(1.05)",
                  transition: "all 0.3s ease-in-out",
                }}
                _hover={{
                  transform: "scale(1.02)",
                  transition: "transform 0.2s ease-in-out",
                }}
                fontSize="14px"
                fontWeight="500"
                padding="16px"
                borderRadius="full"
                transition="all 0.3s ease-in-out"
              >
                Aftermarket Trading
              </Tab>
            </TabList>
          </Tabs>
        </div>
      </div>

      {/*Slider */}
    </Box>
  );
};

export default FilterBar;
