'use client';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
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
} from '@phosphor-icons/react/dist/ssr';
import { Divider } from 'antd';
import Link from 'next/link';
import MapEmbed from '../../MapEmbed';
import { PropertyData } from '@/types/property';
import '../../../../../styles/quill-custom-styles.css';

interface MarketDetailDescriptionPanelProps {
  property: PropertyData;
}

const MarketDetailDescriptionPanel: React.FC<
  MarketDetailDescriptionPanelProps
> = ({ property }) => {
  const renderFacilityIcon = (type: string) => {
    switch (type) {
      case 'LAND_AREA':
        return (
          <>
            <Blueprint weight="fill" size={24} className="text-teal-600" />{' '}
            <p>Land Area :</p>
          </>
        );
      case 'FLOORS':
        return (
          <>
            <Buildings weight="fill" size={24} className="text-teal-600" />{' '}
            <p>Floors :</p>
          </>
        );
      case 'BUILDING_AREA':
        return (
          <>
            <HouseLine weight="fill" size={24} className="text-teal-600" />{' '}
            <p>Building Area :</p>
          </>
        );
      case 'WATER_SUPPLY':
        return (
          <>
            <Drop weight="fill" size={24} className="text-teal-600" />{' '}
            <p>Water Supply :</p>
          </>
        );
      case 'CERTIFICATE':
        return (
          <>
            <Files weight="fill" size={24} className="text-teal-600" />{' '}
            <p>Certificate :</p>
          </>
        );
      case 'GARAGE':
        return (
          <>
            <Car weight="fill" size={24} className="text-teal-600" />{' '}
            <p>Garage :</p>
          </>
        );
      case 'BEDROOMS':
        return (
          <>
            <Bed weight="fill" size={24} className="text-teal-600" />{' '}
            <p>Bedrooms :</p>
          </>
        );
      case 'GARDEN':
        return (
          <>
            <Plant weight="fill" size={24} className="text-teal-600" />{' '}
            <p>Garden :</p>
          </>
        );
      case 'BATHROOMS':
        return (
          <>
            <Bathtub weight="fill" size={24} className="text-teal-600" />{' '}
            <p>Bathrooms :</p>
          </>
        );
      case 'POOL':
        return (
          <>
            <SwimmingPool weight="fill" size={24} className="text-teal-600" />{' '}
            <p>Pool :</p>
          </>
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
              <div key={facility.id} className="flex gap-2 items-center">
                {renderFacilityIcon(facility.type)}
                <span>{facility.facility}</span>{' '}
                {(facility.type === 'LAND_AREA' ||
                  facility.type === 'BUILDING_AREA') && <span>m²</span>}
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
        latitude={property.latitude}
        longitude={property.longitude}
        width="100%"
        height="350px"
        className="rounded-2xl"
      /> */}

      {/* <iframe
        width="100%"
        height="350px"
        className="rounded-2xl"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={property.mapUrl}
      /> */}

      <Divider className="border-zinc-200 !m-0" />
      <div className="flex flex-col gap-3">
        <h2 className="text-black text-base font-medium">About the Property</h2>
        <div
          className="quill-wrapper"
          dangerouslySetInnerHTML={{ __html: property.description }}
        />
      </div>
      <Divider className="border-zinc-200 !m-0" />
    </div>
  );
};

export default MarketDetailDescriptionPanel;
