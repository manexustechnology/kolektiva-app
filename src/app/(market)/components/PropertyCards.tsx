'use client';

import { Box, Grid, Button, Flex, Skeleton } from '@chakra-ui/react';
import PropertyCard from './PropertyCard';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import {
  CaretDoubleLeft,
  CaretLeft,
  CaretRight,
  CaretLineLeft,
  CaretLineRight,
  FileMagnifyingGlass,
} from '@phosphor-icons/react/dist/ssr';

interface PropertyCardData {
  marketAddress: string;
  tokenAddress: string;
  chainId: number;
  name: string;
  slug: string;
  location: string;
  img: string;
  price: string;
  tokenName: string;
  tokenSymbol: string;
  phase: string;
  isFeatured: boolean;
  isAftermarket: boolean;
  isUpcoming: boolean;
}

interface PropertyCardsProps {
  filters: {
    location: string;
    propertyType: string;
    sort: string;
    phase: string;
    priceRange: number[];
  };
}

const PropertyCards: React.FC<PropertyCardsProps> = ({ filters }) => {
  const router = useRouter();
  const [propertyData, setPropertyData] = useState<PropertyCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filtersRef = useRef(filters);

  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        const currentFilters = filtersRef.current;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_HOST}/property?${new URLSearchParams(
            currentFilters as any,
          ).toString()}`,
        );
        const data = await response.json();

        let mappedData = data.map((property: any) => ({
          name: property.address,
          slug: property.id,
          location: `${property.city}, ${property.state}, ${property.country}`,
          img:
            property.images?.[0]?.image ||
            'https://messagetech.com/wp-content/themes/ml_mti/images/no-image.jpg',
          price: property.price || '-',
          marketAddress: property.marketAddress,
          tokenAddress: property.tokenAddress,
          chaind: property.chainId,
          isFeatured: property.isFeatured,
          isUpcoming: property.isUpcoming,
          isAfatermarket: property.isAfatermarket,
          phase: property.phase,
          tokenName: property.tokenName,
          tokenSymbol: property.tokenSymbol,
        }));

        if (currentFilters.phase && currentFilters.phase == 'upcoming') {
          mappedData = mappedData.filter((item: any) => item.isUpcoming);
        }

        setPropertyData(mappedData);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [filters]);

  const totalPages = Math.ceil(propertyData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCards = propertyData.slice(startIndex, endIndex);

  const handleButtonClick = (slug: string) => {
    router.push(`/detail/${slug}`);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showAdjacent = 2;

    if (currentPage > 1) pages.push(1);

    if (currentPage > showAdjacent + 2) {
      pages.push('...');
    }

    for (
      let i = Math.max(2, currentPage - showAdjacent);
      i <= Math.min(totalPages - 1, currentPage + showAdjacent);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - showAdjacent - 1) {
      pages.push('...');
    }

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <Box width={1238} pl={0} py={4}>
      {isLoading ? (
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          }}
          gap={4}
        >
          {Array(itemsPerPage)
            .fill(0)
            .map((_, index) => (
              <Box key={index}>
                <Skeleton height="321px" width="394px" borderRadius="lg" />
              </Box>
            ))}
        </Grid>
      ) : propertyData.length === 0 ? (
        <div className="flex flex-col justify-center items-center p-12 gap-1 w-[1214px] h-[204px]">
          <div className="flex flex-row items-center p-3 gap-2 w-14 h-14 bg-zinc-100 rounded-full">
            <div className="relative flex items-center justify-center">
              <FileMagnifyingGlass size={32} weight="fill" color="#A1A1AA" />
            </div>
          </div>
          <p>No Result Found</p>
          <p>Please try another filter combination</p>
        </div>
      ) : (
        <>
          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            }}
            gap={4}
          >
            {currentCards.map((card, index) => (
              <PropertyCard
                marketAddress={card.marketAddress}
                tokenAddress={card.tokenAddress}
                key={index}
                slug={card.slug}
                name={card.name}
                location={card.location}
                img={card.img}
                price={card.price}
                tokenName={card.tokenName}
                tokenSymbol={card.tokenSymbol}
                phase={card.phase}
                isFeatured={card.isFeatured}
                isUpcoming={card.isUpcoming}
                isAftermarket={card.isAftermarket}
                onButtonClick={() => handleButtonClick(card.slug)}
              />
            ))}
          </Grid>

          {/* Pagination UI */}
          <Flex
            mt={4}
            justifyContent="center"
            alignItems="center"
            gap={3}
            width="1214px"
            height="40px"
          >
            <Button
              onClick={() => setCurrentPage(1)}
              bg="#CCFBF1"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={2}
              w={10}
              h={10}
              isDisabled={currentPage === 1}
              _disabled={{
                bg: 'gray.300',
                cursor: 'not-allowed',
                opacity: 0.4,
              }}
            >
              <CaretLineLeft size={16} weight="fill" color="#0F766E" />
            </Button>

            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              bg="#CCFBF1"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={2}
              w={10}
              h={10}
              isDisabled={currentPage === 1}
              _disabled={{
                bg: 'gray.300',
                cursor: 'not-allowed',
                opacity: 0.4,
              }}
            >
              <CaretLeft size={16} weight="fill" color="#0F766E" />
            </Button>

            {getPageNumbers().map((page, index) =>
              typeof page === 'number' ? (
                <Button
                  key={index}
                  onClick={() => handlePageChange(page)}
                  bg={page === currentPage ? '#0F766E' : '#CCFBF1'}
                  color={page === currentPage ? 'white' : 'black'}
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  p={2}
                  w={10}
                  h={10}
                >
                  {page}
                </Button>
              ) : (
                <Button
                  key={index}
                  bg="#CCFBF1"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  p={2}
                  w={10}
                  h={10}
                  isDisabled
                >
                  {page}
                </Button>
              ),
            )}

            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              bg="#CCFBF1"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={2}
              w={10}
              h={10}
              isDisabled={currentPage === totalPages}
              _disabled={{
                bg: 'gray.300',
                cursor: 'not-allowed',
                opacity: 0.4,
              }}
            >
              <CaretRight size={16} weight="fill" color="#0F766E" />
            </Button>

            <Button
              onClick={() => setCurrentPage(totalPages)}
              bg="#CCFBF1"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={2}
              w={10}
              h={10}
              isDisabled={currentPage === totalPages}
              _disabled={{
                bg: 'gray.300',
                cursor: 'not-allowed',
                opacity: 0.4,
              }}
            >
              <CaretLineRight size={16} weight="fill" color="#0F766E" />
            </Button>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default PropertyCards;
