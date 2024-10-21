'use client';

import { Box, Grid, Button, Flex, Skeleton } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  CaretDoubleLeft,
  CaretLeft,
  CaretRight,
  CaretLineLeft,
  CaretLineRight,
  FileMagnifyingGlass,
} from '@phosphor-icons/react/dist/ssr';
import AssetCard from './AssetCard';
import { useActiveAccount } from 'thirdweb/react';

interface PropertyCardData {
  walletAddress: string;
  marketAddress: string;
  tokenAddress: string;
  tokenName: string;
  tokenSymbol: string;
  name: string;
  slug: string;
  location: string;
  img: string;
  price: string;
  phase: string;
  chainId: string;
  isFeatured: boolean;
  isAftermarket: boolean;
  profitPercentage?: number;
  lossPercentage?: number;
}

interface AssetCardsProps {
  filters: {
    location: string;
    propertyType: string;
    sort: string;
    phase: string;
    priceRange: number[];
  };
}

const AssetCards: React.FC<AssetCardsProps> = ({ filters }) => {
  const router = useRouter();
  const activeAccount = useActiveAccount();
  const address = activeAccount?.address;

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
        if (!address) return;
        console.log('filters', filters);

        const currentFilters = filtersRef.current;
        const url = `${
          process.env.NEXT_PUBLIC_API_HOST
        }/user-property/${address}?${new URLSearchParams(
          currentFilters as any,
        ).toString()}`;
        console.log(url);

        const response = await fetch(url);

        const data = await response.json();

        const mappedData = data.map((data: any) => {
          const property = data.property;
          return {
            slug: property.id,
            name: property.address,
            location: `${property.city}, ${property.state}, ${property.country}`,
            img:
              property.images?.[0]?.image ||
              'https://messagetech.com/wp-content/themes/ml_mti/images/no-image.jpg',
            price: property.price || '-',
            marketAddress: property.marketAddress,
            tokenAddress: property.tokenAddress,
            isAftermarket: property.isAftermarket,
            walletAddress: data.walletAddress,
            phase: property.phase,
            chainId: property.chainId.toString(),
          };
        });

        setPropertyData(mappedData);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [filters]);

  const handleButtonClick = (slug: string) => {
    router.push('/detail/' + slug);
  };

  const totalPages = Math.ceil(propertyData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCards = propertyData.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showAdjacent = 2;

    if (currentPage > 0) pages.push(1);

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
                <Skeleton width="1224px" height="157px" borderRadius="lg" />
              </Box>
            ))}
        </Grid>
      ) : propertyData.length === 0 ? (
        <div className="flex flex-col justify-center items-center p-12 gap-1 w-[1214px] h-[404px] ">
          <div className="flex flex-row items-center p-3 gap-2 w-14 h-14 bg-zinc-100 rounded-full">
            <div className=" relative flex items-center justify-center">
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
              md: 'repeat(1, 1fr)',
              lg: 'repeat(1, 1fr)',
            }}
            gap={4}
          >
            {currentCards.map((card, index) => (
              <AssetCard
                walletAddress={card.walletAddress}
                marketAddress={card.marketAddress}
                tokenAddress={card.tokenAddress}
                key={index}
                name={card.name}
                location={card.location}
                img={card.img}
                price={card.price}
                phase={card.phase}
                chainId={card.chainId}
                isFeatured={card.isFeatured}
                isAftermarket={card.isAftermarket}
                profitPercentage={card.profitPercentage}
                lossPercentage={card.lossPercentage}
                onButtonClick={() => handleButtonClick(card.slug)}
              />
            ))}
          </Grid>

          {/*Pageation UI*/}
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

            {getPageNumbers().map((page, index) => (
              <Button
                key={index}
                onClick={() => {
                  if (typeof page === 'number') {
                    handlePageChange(page);
                  }
                }}
                bg={page === currentPage ? '#0D9488' : '#F4F4F5'}
                color={page === currentPage ? 'white' : 'black'}
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={2}
                w={10}
                h={10}
                isDisabled={page === '...'}
                _disabled={{
                  bg: 'gray.300',
                  cursor: 'not-allowed',
                  opacity: 0.4,
                }}
              >
                {page}
              </Button>
            ))}

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

export default AssetCards;
