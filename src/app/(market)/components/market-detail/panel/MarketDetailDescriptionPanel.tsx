"use client";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import {
  Bathtub,
  Bed,
  Blueprint,
  Buildings,
  Car,
  CaretDown,
  CaretUp,
  Drop,
  Files,
  HouseLine,
  Plant,
  SwimmingPool,
} from "@phosphor-icons/react/dist/ssr";
import { Divider } from "antd";
import Link from "next/link";
import MapEmbed from "../../MapEmbed";
import { Property, Facility } from "@/types/property";

interface MarketDetailDescriptionPanelProps {
  property: Property;
}

const MarketDetailDescriptionPanel: React.FC<
  MarketDetailDescriptionPanelProps
> = ({ property }) => {
  const renderFacilityIcon = (type: string) => {
    switch (type) {
      case "LAND_AREA":
        return <Blueprint weight="fill" size={24} className="text-teal-600" />;
      case "FLOORS":
        return <Buildings weight="fill" size={24} className="text-teal-600" />;
      case "BUILDING_AREA":
        return <HouseLine weight="fill" size={24} className="text-teal-600" />;
      case "WATER_SUPPLY":
        return <Drop weight="fill" size={24} className="text-teal-600" />;
      case "CERTIFICATE":
        return <Files weight="fill" size={24} className="text-teal-600" />;
      case "PARKING":
        return <Car weight="fill" size={24} className="text-teal-600" />;
      case "BEDROOMS":
        return <Bed weight="fill" size={24} className="text-teal-600" />;
      case "GARDEN":
        return <Plant weight="fill" size={24} className="text-teal-600" />;
      case "BATHROOMS":
        return <Bathtub weight="fill" size={24} className="text-teal-600" />;
      case "POOL":
        return (
          <SwimmingPool weight="fill" size={24} className="text-teal-600" />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex flex-col gap-4 bg-teal-50 text-zinc-700 p-4 rounded-2xl">
        <div className="grid grid-cols-2 gap-4">
          {property.facilities
            .filter((facility) => facility.isHighlight)
            .map((facility) => (
              <div key={facility.id} className="flex gap-4 items-center">
                {renderFacilityIcon(facility.type)}
                <p className="text-sm font-medium">{facility.facility}</p>
              </div>
            ))}
        </div>
        <Accordion border="none" defaultIndex={[0]} allowMultiple>
          <AccordionItem border="none" bgColor="teal.100" rounded="lg">
            {({ isExpanded }) => (
              <>
                <h2>
                  <AccordionButton>
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      className="!text-md !font-medium !text-teal-600"
                    >
                      Other Facilities
                    </Box>
                    {isExpanded ? (
                      <CaretUp
                        size={18}
                        weight="fill"
                        className="text-teal-600"
                      />
                    ) : (
                      <CaretDown
                        size={18}
                        weight="fill"
                        className="text-teal-600"
                      />
                    )}
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <ul className="grid grid-cols-2 list-disc list-inside px-2">
                    {property.facilities
                      .filter((facility) => !facility.isHighlight)
                      .map((facility) => (
                        <li key={facility.id} className="text-sm font-medium">
                          {facility.facility}
                        </li>
                      ))}
                  </ul>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        </Accordion>
      </div>
      <Divider className="border-zinc-200 !m-0" />
      {/* <MapEmbed
        latitude={property.location.latitude}
        longitude={property.location.longitude}
        width="100%"
        height="350px"
        className="rounded-2xl"
      /> */}
      <Divider className="border-zinc-200 !m-0" />
      <div className="flex flex-col gap-3">
        <h2 className="text-black text-base font-medium">About the Property</h2>
        <p className="text-sm font-medium text-zinc-500">
          {property.description}
          <br />
          <br />
          <Link href="#" className="text-teal-600">
            Click here
          </Link>{" "}
          to learn more about how third parties sell their properties on the
          Kolektiva Marketplace.
        </p>
      </div>
      <Divider className="border-zinc-200 !m-0" />
      <div className="ckeditor-content leading-3">
        <h2>Strip Mall with McDonalds & Dominos Pizza in Quad Cities, Iowa</h2>
        <br />
        <p>
          Located in the Quad Cities Metro area, this is a 4-unit retail
          building built in 2010. The tenants include McDonalds, Domino&apos;s,
          US Cellular, and a Real Estate Office. All tenants are on multi-year
          triple-net leases (NNN). This means that the tenants pay all the
          expenses of the property including real estate taxes, building
          insurance, and maintenance.
        </p>
        <br />
        <ul>
          <li>
            McDonalds has been a tenant since 2010 and extended its lease to
            2026
          </li>
          <li>
            Dominos recently moved in and invested 250K USDT in renovations.
            Their 10-yr lease expires in 2031
          </li>
          <li>
            US Cellular has been a tenant since 2012 and extended its lease to
            2024
          </li>
          <li>
            A Real Estate Office recently moved in and signed a 3-yr lease
          </li>
        </ul>
        <br />
        <br />
        <h2>Near new Amazon project</h2>
        <br />
        <p>
          Amazon is building a 2.9M square foot robotics fulfillment center just
          a 12 minute drive from this strip mall. The warehouse is expected to
          open summer of 2024 and create a minimum annual economic impact of
          148M USDT to the region.
        </p>
        <br />
        <br />
        <h2>Big Anchor Tenants</h2>
        <br />
        <p>
          3 of the 4 current tenants are big-name brands who have recently moved
          in or renewed their leases at higher rental rates. Other recognizable
          businesses nearby include Subway, Dollar General and Snap Fitness.
        </p>
        <br />
        <br />
        <h2>1 min from major highway</h2>
        <br />
        <p>
          Located on an entrance/exit of a major U.S highway, it takes drivers
          just 1 minute to reach the mall. Route 61 passes through 3 US states
          (New Orleans, Iowa and Mississippi).
        </p>
        <br />
        <p>
          Refer to the &apos;Documents&apos; tab above to view the following
          information:
        </p>
        <br />
        <ul>
          <li>Rent Roll & Lease Terms</li>
          <li>Inspection Report</li>
          <li>Purchase Contract</li>
          <li>Operating Expenses</li>
          <li>Comparable Properties</li>
          <li>Building Improvements</li>
          <li>Pest Report</li>
        </ul>
      </div>
    </div>
  );
};

export default MarketDetailDescriptionPanel;
